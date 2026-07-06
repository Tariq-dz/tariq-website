const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://127.0.0.1:8752/index.html';
const OUT = process.env.OUT_DIR || '/home/ayoub/projects/tariq_website/screenshots/audit';
const SECTIONS = ['s-hero', 's-stories', 's-vehicles', 's-app', 'app-waitlist', 's-cities', 's-footer'];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

(async () => {
  const browser = await chromium.launch();
  const logLines = [];

  for (const vp of VIEWPORTS) {
    const dir = path.join(OUT, vp.name);
    fs.mkdirSync(dir, { recursive: true });
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();

    page.on('console', (msg) => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        logLines.push(`[${vp.name}] console.${msg.type()}: ${msg.text()}`);
      }
    });
    page.on('pageerror', (err) => logLines.push(`[${vp.name}] pageerror: ${err.message}`));
    page.on('requestfailed', (req) =>
      logLines.push(`[${vp.name}] requestfailed: ${req.url()} — ${req.failure()?.errorText}`)
    );
    page.on('response', (res) => {
      if (res.status() >= 400) logLines.push(`[${vp.name}] http ${res.status()}: ${res.url()}`);
    });

    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);

    // Disable CSS smooth scrolling so programmatic scrolls are instant
    await page.addStyleTag({ content: 'html, body { scroll-behavior: auto !important; }' });

    // Frame sweep: step = 85% of viewport height through full scroll range
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const step = Math.round(vp.height * 0.85);
    let i = 0;
    for (let y = 0; y < scrollHeight - vp.height + step; y += step) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(700);
      await page.screenshot({ path: path.join(dir, `frame-${String(i).padStart(3, '0')}-y${y}.png`) });
      i++;
    }
    logLines.push(`[${vp.name}] scrollHeight=${scrollHeight}px, frames=${i}`);

    // Section shots: scroll each section's top to viewport top
    for (const id of SECTIONS) {
      const found = await page.evaluate((sid) => {
        const el = document.getElementById(sid);
        if (!el) return false;
        window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
        return true;
      }, id);
      if (!found) { logLines.push(`[${vp.name}] section #${id} not found`); continue; }
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(dir, `section-${id}.png`) });
    }

    await ctx.close();
  }

  await browser.close();
  fs.writeFileSync(path.join(OUT, 'console-log.txt'), logLines.join('\n') + '\n');
  console.log(logLines.filter((l) => l.includes('scrollHeight') || l.includes('error')).join('\n'));
})();
