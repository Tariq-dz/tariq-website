// prepare-images.mjs — called by prepare-media.sh. Image work with sharp; sources are read-only.
//
// Outputs
//   src/assets/terminal/*.png        renders cropped on their own slate (#3A3E44); astro:assets encodes WebP
//   src/assets/screens/*.png         terminal UI screens (copied)
//   src/assets/app/notifications.png, language.png   app screenshots, status/nav bars removed
//   src/assets/brand/mark.png        the high-res mark, transparent margins trimmed (pixels untouched)
//   src/data/terminal-face.json      where the display glass sits inside the cropped front render
//   public/favicon-32.png, favicon.ico, apple-touch-icon.png, icon-512.png, og.png
//   .shots/media-check/face.png      the front render with a real screen composited, for a visual check

import sharp from 'sharp';
import { mkdirSync, copyFileSync, writeFileSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = process.env.TARIQ_ROOT || join(homedir(), 'projects/Tariq-dz');
const TERM = join(ROOT, 'tariq-hardware/models/ourterminal');
const SHOTS = join(ROOT, 'tariq-app/design/screenshots/current');
const LOGO = join(ROOT, 'tariq-app/logo.png');

const SLATE = { r: 58, g: 62, b: 68 }; // measured on every render edge
const GRAPHITE = '#26282C';
for (const d of ['src/assets/terminal', 'src/assets/screens', 'src/assets/app', 'src/assets/brand', 'src/data', '.shots/media-check', 'public']) mkdirSync(d, { recursive: true });

// Bounding box of the terminal body: rows count only when more than 60 pixels differ from the slate, so
// the thin mounting pole (about 30 px wide) does not stretch the box to the frame edges.
async function productBox(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;
  const diff = (i) => Math.abs(data[i] - SLATE.r) + Math.abs(data[i + 1] - SLATE.g) + Math.abs(data[i + 2] - SLATE.b) > 24;
  let y0 = H, y1 = 0, x0 = W, x1 = 0;
  for (let y = 0; y < H; y++) {
    let n = 0, lo = W, hi = 0;
    for (let x = 0; x < W; x++) if (diff((y * W + x) * 3)) { n++; if (x < lo) lo = x; if (x > hi) hi = x; }
    if (n > 60) { if (y < y0) y0 = y; y1 = y; if (lo < x0) x0 = lo; if (hi > x1) x1 = hi; }
  }
  return { x0, y0, x1, y1, w: W, h: H };
}

function padBox(b, pad, aspect) {
  // grow the box by `pad` (fraction of its larger side) and to the requested aspect (w/h), clamped to the image
  let cx = (b.x0 + b.x1) / 2, cy = (b.y0 + b.y1) / 2;
  let w = b.x1 - b.x0, h = b.y1 - b.y0;
  const p = Math.max(w, h) * pad;
  w += 2 * p; h += 2 * p;
  if (aspect) { if (w / h < aspect) w = h * aspect; else h = w / aspect; }
  w = Math.min(Math.round(w), b.w); h = Math.min(Math.round(h), b.h);
  const left = Math.max(0, Math.min(b.w - w, Math.round(cx - w / 2)));
  const top = Math.max(0, Math.min(b.h - h, Math.round(cy - h / 2)));
  return { left, top, width: w, height: h };
}

// ---- terminal renders -------------------------------------------------------------------------
// Tight square crops around the terminal body (the pole is ignored when measuring) for the views the site shows.
const TIGHT = ['persp', 'reload'];
const boxes = {};
for (const n of [...TIGHT, 'front']) boxes[n] = await productBox(join(TERM, 'renders', `${n}.png`));
for (const n of TIGHT) {
  await sharp(join(TERM, 'renders', `${n}.png`)).removeAlpha().extract(padBox(boxes[n], 0.1, 1)).png().toFile(`src/assets/terminal/${n}-tight.png`);
}

// ---- terminal face: display glass inside front.png -----------------------------------------------
// Measured on front.png (1100x1100) by compositing dest.png: glass x 237..567, y 280..822, ratio 0.606
// (the screens are 1260x2079 = 0.606).
const GLASS = { left: 238, top: 280, width: 329, height: 543 };
const faceCrop = padBox(boxes.front, 0.03, null);
const face = {
  crop: faceCrop,
  // percentages of the tight front crop, used by the TerminalFace component
  glass: {
    left: ((GLASS.left - faceCrop.left) / faceCrop.width) * 100,
    top: ((GLASS.top - faceCrop.top) / faceCrop.height) * 100,
    width: (GLASS.width / faceCrop.width) * 100,
    height: (GLASS.height / faceCrop.height) * 100,
  },
};
await sharp(join(TERM, 'renders', 'front.png')).removeAlpha().extract(faceCrop).png().toFile('src/assets/terminal/face.png');

// ---- screens -----------------------------------------------------------------------------------
for (const n of ['idle', 'dest', 'pay', 'tap', 'ok', 'ticket40']) copyFileSync(join(TERM, 'screens', `${n}.png`), `src/assets/screens/${n}.png`);

// printer slot inside the face crop (for the ticket that rises out of it): measured on front.png,
// slot lip (grey paper exit) at x 640..825, y 450..470.
face.slot = { left: ((640 - faceCrop.left) / faceCrop.width) * 100, top: ((458 - faceCrop.top) / faceCrop.height) * 100, width: (185 / faceCrop.width) * 100 };
face.aspect = faceCrop.width / faceCrop.height;
writeFileSync('src/data/terminal-face.json', JSON.stringify(face, null, 2));

const glassPx = { left: GLASS.left - faceCrop.left, top: GLASS.top - faceCrop.top };
const dest = await sharp(`src/assets/screens/dest.png`).resize(GLASS.width, GLASS.height).toBuffer();
// sharp resizes before it composites, so composite into a buffer first, then scale the check image.
const faceCheck = await sharp('src/assets/terminal/face.png').composite([{ input: dest, left: glassPx.left, top: glassPx.top }]).png().toBuffer();
await sharp(faceCheck).resize({ width: 900 }).toFile('.shots/media-check/face.png');

// ---- app screenshots ---------------------------------------------------------------------------
// 1080x2400. Status bar rows 0..99 removed, app content kept to row 2130 (the 3-button nav bar
// starts below it), then padded with the screen's own background to the clips' 434:888 ratio so
// every phone frame has one shape.
async function phoneShot(src, out, top, bottom) {
  const w = 1080, h = bottom - top, targetH = Math.round(w / (434 / 888));
  const { data } = await sharp(src).extract({ left: 40, top: bottom - 4, width: 1, height: 1 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  await sharp(src).removeAlpha().extract({ left: 0, top, width: w, height: h })
    .extend({ bottom: Math.max(0, targetH - h), background: { r: data[0], g: data[1], b: data[2] } })
    .png().toFile(out);
}
await phoneShot(join(SHOTS, '06_notifications.png'), 'src/assets/app/notifications.png', 100, 2130);
// The app's real search field, in English with its Arabic placeholder (إلى أين؟). Cropped from the redacted home still,
// below the painted-out greeting and avatar (rows 0-54), so no personal data can enter the crop. Shown at no more than native size.
await sharp('src/assets/app/home.png').extract({ left: 10, top: 55, width: 414, height: 65 }).png().toFile('src/assets/app/search-field.png');

// ---- vehicles, logo ----------------------------------------------------------------------------
// transparent margins trimmed only; pixels untouched
await sharp(LOGO).trim().png().toFile('src/assets/brand/mark.png');

// Icons: the mark's compass arc is cream, so it sits on a graphite tile (never recoloured).
const markTrim = await sharp(LOGO).trim().toBuffer();
async function icon(size, out, radius) {
  const inner = Math.round(size * 0.78);
  const mark = await sharp(markTrim).resize({ width: inner, height: inner, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  const r = Math.round(size * radius);
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="${GRAPHITE}"/></svg>`);
  await sharp(bg).composite([{ input: mark, gravity: 'centre' }]).png().toFile(out);
}
await icon(32, 'public/favicon-32.png', 0.22);
await icon(48, '.shots/media-check/favicon-48.png', 0.22);
await icon(180, 'public/apple-touch-icon.png', 0);
await icon(512, 'public/icon-512.png', 0.22);
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', '.shots/media-check/favicon-48.png', 'public/favicon.ico']);

// OG image 1200x630: slate, the mark on the left, the perspective render on the right.
const og = { w: 1200, h: 630 };
const ogMark = await sharp(markTrim).resize({ width: 420 }).toBuffer();
const ogRender = await sharp(join(TERM, 'renders', 'persp.png')).removeAlpha().extract(padBox(boxes.persp, 0.08, 1)).resize(630, 630).toBuffer();
await sharp({ create: { width: og.w, height: og.h, channels: 3, background: SLATE } })
  .composite([{ input: ogRender, left: og.w - 630, top: 0 }, { input: ogMark, left: 90, top: Math.round((og.h - 188) / 2) }])
  .png().toFile('public/og.png');

console.log('   face', JSON.stringify(face.glass));
