#!/usr/bin/env node
// shoot — screenshots + health report for every page (SITE_V2_PROMPT §11).
//
//   node scripts/shoot.mjs --cycle 3                       # all pages, both viewports, preview server
//   node scripts/shoot.mjs --cycle 3 --pages /,/terminal   # subset
//   node scripts/shoot.mjs --out lab --base http://127.0.0.1:4321 --pages /lab/hero-a
//
// Output: .shots/<cycle-N|out>/<page>/<viewport>/{full.png, sweep-XX.png, reduced-full.png}
//         .shots/<…>/<page>-<viewport>-sheet.png (contact sheet), report.json
// Exit code 1 on any console error, page error, failed request, HTTP >= 400, horizontal overflow,
// image without alt or intrinsic size, or missing title/description.

import { chromium } from 'playwright-core';
import sharp from 'sharp';
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => (a.startsWith('--') ? [...acc, [a.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]] : acc), []),
);
const BASE = (args.base || 'http://127.0.0.1:4322').replace(/\/$/, '');
const ALL_PAGES = ['/', '/terminal', '/app', '/operators', '/404'];
const PAGES = args.pages ? String(args.pages).split(',') : ALL_PAGES;
const OUT = join('.shots', args.out || `cycle-${args.cycle ?? 0}`);
const VIEWPORTS = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const SWEEP = !args['no-sweep'];
// --viewport desktop|mobile and --motion normal|reduced narrow a run to one context per process (low-memory machines)
const VIEWPORT_FILTER = args.viewport ? String(args.viewport).split(',') : null;
const MOTION_FILTER = args.motion ? String(args.motion).split(',').map((m) => m === 'reduced') : null;
sharp.cache(false);
sharp.concurrency(1);

function findChromium() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  for (const v of ['1228', '1217']) {
    const p = join(homedir(), `.cache/ms-playwright/chromium-${v}/chrome-linux64/chrome`);
    if (existsSync(p)) return p;
  }
  return undefined;
}

const slug = (p) => (p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '_'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function settle(page) {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.evaluate(() => document.fonts.ready);
}

// Walk the page once so lazy media and ScrollTrigger states load, then return to top.
async function sweep(page, dir, prefix, vp) {
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.round(vp.height * 0.85);
  const frames = [];
  let i = 0;
  for (let y = 0; y < total; y += step) {
    await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y);
    await sleep(600);
    if (SWEEP) {
      const f = join(dir, `${prefix}sweep-${String(i).padStart(2, '0')}.png`);
      await page.screenshot({ path: f });
      frames.push(f);
    }
    i++;
    if (i > 60) break;
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await sleep(400);
  return frames;
}

async function contactSheet(frames, out, vp) {
  if (!frames.length) return;
  const cols = vp.width > 800 ? 4 : 8;
  const tw = vp.width > 800 ? 480 : 240;
  const th = Math.round((tw / vp.width) * vp.height);
  const rows = Math.ceil(frames.length / cols);
  const gap = 8;
  // one frame at a time: decoding every sweep frame at once was the memory peak that got runs killed
  const tiles = [];
  for (const f of frames) tiles.push(await sharp(f).resize(tw, th).png().toBuffer());
  await sharp({ create: { width: cols * (tw + gap) + gap, height: rows * (th + gap) + gap, channels: 3, background: '#bbbbbb' } })
    .composite(tiles.map((input, k) => ({ input, left: gap + (k % cols) * (tw + gap), top: gap + Math.floor(k / cols) * (th + gap) })))
    .png()
    .toFile(out);
}

const browser = await chromium.launch({
  executablePath: findChromium(),
  args: ['--autoplay-policy=no-user-gesture-required', '--disable-dev-shm-usage', '--disable-gpu', '--renderer-process-limit=1', '--js-flags=--max-old-space-size=256'],
});
const REPORT = join(OUT, 'report.json');
const report = existsSync(REPORT) ? JSON.parse(readFileSync(REPORT, 'utf8')) : { base: BASE, pages: [] };
report.when = new Date().toISOString();
// replace only the entries this run produces (page × viewport × motion), so filtered runs keep the rest
const produces = (e) => PAGES.includes(e.page) && (!VIEWPORT_FILTER || VIEWPORT_FILTER.includes(e.viewport)) && (!MOTION_FILTER || MOTION_FILTER.includes(e.reducedMotion));
report.pages = report.pages.filter((e) => !produces(e));
let bad = 0;

for (const path of PAGES) {
  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    if (VIEWPORT_FILTER && !VIEWPORT_FILTER.includes(vpName)) continue;
    for (const reduced of [false, true]) {
      if (MOTION_FILTER && !MOTION_FILTER.includes(reduced)) continue;
      const dir = join(OUT, slug(path), vpName);
      mkdirSync(dir, { recursive: true });
      const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, reducedMotion: reduced ? 'reduce' : 'no-preference', isMobile: vpName === 'mobile', hasTouch: vpName === 'mobile' });
      const page = await ctx.newPage();
      const entry = { page: path, viewport: vpName, reducedMotion: reduced, console: [], pageErrors: [], failedRequests: [], httpErrors: [] };
      page.on('console', (m) => {
        if (m.type() === 'error' || m.type() === 'warning') entry.console.push(`${m.type()}: ${m.text()}`);
      });
      page.on('pageerror', (e) => entry.pageErrors.push(String(e)));
      page.on('requestfailed', (r) => {
        const why = r.failure()?.errorText || '';
        // Media elements abort range requests when paused/replaced; that is not a failure.
        if (/ERR_ABORTED/.test(why) && /\.(mp4|webm)(\?|$)/.test(r.url())) return;
        entry.failedRequests.push(`${r.url()} ${why}`);
      });
      page.on('response', (r) => {
        if (r.status() >= 400 && !(path === '/404' && r.url() === BASE + path)) entry.httpErrors.push(`${r.status()} ${r.url()}`);
      });

      const res = await page.goto(BASE + path, { waitUntil: 'domcontentloaded' });
      entry.status = res?.status();
      await settle(page);
      const prefix = reduced ? 'reduced-' : '';
      const frames = await sweep(page, dir, prefix, vp);
      await settle(page);
      await page.screenshot({ path: join(dir, `${prefix}full.png`), fullPage: true });

      Object.assign(
        entry,
        await page.evaluate((VW) => {
          const imgs = [...document.images];
          const offenders = [];
          for (const el of document.querySelectorAll('body *')) {
            const b = el.getBoundingClientRect();
            if (!b.width || b.right <= VW + 0.5) continue;
            const p = el.parentElement && el.parentElement.getBoundingClientRect();
            if (p && p.right > VW + 0.5) continue;
            // not an offender if a clipping ancestor (overflow-x other than visible, e.g. a carousel track or a masked window) ends inside the viewport:
            // the element is hidden by that ancestor and cannot widen the page (a real page overflow still fails via scrollWidth above)
            let clipped = false;
            for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
              if (getComputedStyle(a).overflowX !== 'visible' && a.getBoundingClientRect().right <= VW + 0.5) { clipped = true; break; }
            }
            if (clipped) continue;
            offenders.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} right=${Math.round(b.right)}`);
          }
          return {
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.content || '',
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth,
            height: document.documentElement.scrollHeight,
            imgsMissingAlt: imgs.filter((i) => !i.hasAttribute('alt')).map((i) => i.currentSrc || i.src),
            imgsNoSize: imgs.filter((i) => !(i.getAttribute('width') && i.getAttribute('height'))).map((i) => i.currentSrc || i.src),
            overflowOffenders: offenders.slice(0, 8),
          };
        }, vp.width),
      );
      entry.overflow = entry.scrollWidth > vp.width || entry.innerWidth > vp.width || entry.overflowOffenders.length > 0;
      const problems =
        entry.console.filter((c) => c.startsWith('error')).length + entry.pageErrors.length + entry.failedRequests.length +
        entry.httpErrors.length + (entry.overflow ? 1 : 0) + entry.imgsMissingAlt.length + entry.imgsNoSize.length +
        (entry.title ? 0 : 1) + (entry.description ? 0 : 1);
      entry.problems = problems;
      bad += problems;
      if (!reduced) await contactSheet(frames, join(OUT, `${slug(path)}-${vpName}-sheet.png`), vp);
      report.pages.push(entry);
      console.log(`${problems ? '✗' : '✓'} ${path} ${vpName}${reduced ? ' (reduced)' : ''} h=${entry.height} sw=${entry.scrollWidth}/${entry.innerWidth}/${vp.width} console=${entry.console.length} errs=${entry.pageErrors.length} failed=${entry.failedRequests.length} http=${entry.httpErrors.length}`);
      if (problems) console.log('   ', JSON.stringify({ c: entry.console, e: entry.pageErrors, f: entry.failedRequests, h: entry.httpErrors, alt: entry.imgsMissingAlt, size: entry.imgsNoSize, overflow: entry.overflowOffenders, title: entry.title, desc: !!entry.description }));
      await ctx.close();
    }
  }
}

await browser.close();
writeFileSync(REPORT, JSON.stringify(report, null, 2));
console.log(`\n${bad ? 'FAIL' : 'OK'}: ${bad} problem(s). Report: ${REPORT}`);
process.exit(bad ? 1 : 0);
