// Dedicated seam close-ups: capture the exact boundary zone between adjacent
// sections so the transition-focused council can judge each stitch point.
// For every seam it produces two images per viewport:
//   - context: full viewport with the seam centered vertically
//   - closeup: a tight band clipped around the seam line
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://127.0.0.1:8752/index.html';
const OUT = process.env.OUT_DIR || '/home/ayoub/projects/tariq_website/screenshots/seams';

// DOM order of sections; each adjacent pair is a seam the visitor scrolls across.
const ORDER = ['s-hero', 's-stories', 's-vehicles', 's-app', 's-cities', 's-close', 's-footer'];
const LABEL = {
  's-hero': 'hero', 's-stories': 'stories', 's-vehicles': 'modes',
  's-app': 'app', 's-cities': 'cities', 's-close': 'close', 's-footer': 'footer',
};
const SEAMS = [];
for (let i = 0; i < ORDER.length - 1; i++) SEAMS.push([ORDER[i], ORDER[i + 1]]);

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, band: 560 },
  { name: 'mobile', width: 390, height: 844, band: 500 },
];

(async () => {
  const browser = await chromium.launch();
  const logLines = [];

  for (const vp of VIEWPORTS) {
    const dir = path.join(OUT, vp.name);
    fs.mkdirSync(dir, { recursive: true });
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();

    page.on('console', (m) => {
      if (m.type() === 'error' || m.type() === 'warning') logLines.push(`[${vp.name}] console.${m.type()}: ${m.text()}`);
    });
    page.on('pageerror', (e) => logLines.push(`[${vp.name}] pageerror: ${e.message}`));

    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);
    await page.addStyleTag({ content: 'html, body { scroll-behavior: auto !important; }' });

    let n = 1;
    for (const [above, below] of SEAMS) {
      const boundary = await page.evaluate((bid) => {
        const el = document.getElementById(bid);
        if (!el) return null;
        return el.getBoundingClientRect().top + window.scrollY; // top of the lower section, in doc coords
      }, below);
      const name = `seam-${n}-${LABEL[above]}-${LABEL[below]}`;
      if (boundary == null) { logLines.push(`[${vp.name}] ${name}: #${below} not found`); n++; continue; }

      // Center the seam line in the viewport, clamped to the scroll range.
      const maxScroll = await page.evaluate((h) => document.documentElement.scrollHeight - h, vp.height);
      const target = Math.max(0, Math.min(maxScroll, Math.round(boundary - vp.height / 2)));
      await page.evaluate((y) => window.scrollTo(0, y), target);
      await page.waitForTimeout(900);

      // Where the seam actually lands on screen after clamping.
      const seamOnScreen = boundary - target; // px from viewport top
      await page.screenshot({ path: path.join(dir, `${name}-context.png`) });

      const half = vp.band / 2;
      const clipY = Math.max(0, Math.min(vp.height - vp.band, Math.round(seamOnScreen - half)));
      await page.screenshot({
        path: path.join(dir, `${name}-closeup.png`),
        clip: { x: 0, y: clipY, width: vp.width, height: vp.band },
      });
      logLines.push(`[${vp.name}] ${name}: boundary=${Math.round(boundary)} scroll=${target} seamOnScreen=${Math.round(seamOnScreen)}`);
      n++;
    }

    await ctx.close();
  }

  await browser.close();
  fs.writeFileSync(path.join(OUT, 'seam-log.txt'), logLines.join('\n') + '\n');
  console.log(logLines.join('\n'));
})();
