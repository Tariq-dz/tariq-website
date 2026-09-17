#!/usr/bin/env node
// claims-check — fails the build when rendered pages in dist/ say something Tariq may not say publicly
// (SITE_V2_PROMPT §4). Runs on every build via `npm run build`.
//
// What is scanned, per HTML file:
//   • visible text (tags, <style>, <script> and comments removed)
//   • human-readable attributes: alt, title, aria-label, placeholder, content (meta), value
// Class names, asset hashes and CSS are not scanned: they are not claims, and CSS durations such
// as "300ms" would otherwise trip the latency pattern.
// Email and +213 patterns are also run against the raw HTML (minus <style>/<script>) so a
// mailto: or tel: link cannot hide in an href.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

const BANNED = [
  // cities section: the founder chose the reference's seven cities and status badges (BUILD_LOG D-88, 2026-09-15), so "Live",
  // "Coming soon", "Planned" and those cities are allowed; the transit card still must not read as a payment card
  [/live today/i, '"live today"'],
  [/nine modes/i, '"nine modes"'],
  [/card number/i, '"card number" (the pass is not a payment card)'],
  [/\bcredit\b/i, '"credit" (the pass is not a payment card)'],
  [/\bdebit\b/i, '"debit" (the pass is not a payment card)'],
  [/\bEMV\b/, 'EMV (the pass has no chip)'],
  [/•{4}/, 'a masked card number'],
  [/made in algeria/i, '"Made in Algeria" (country of assembly undecided; use "Designed in Algeria")'],
  [/live in algiers/i, '"live in Algiers"'],
  [/nine modes/i, '"nine modes" (no mode count)'],
  [/six modes/i, '"six modes" (no mode count)'],
  [/\b(seven|eight|five|four)\s+(transit\s+)?modes\b/i, 'a mode count'],
  [/\b\d+\s+(transit\s+)?modes\b/i, 'a mode count'],
  [/only for buses/i, '"only for buses"'],
  [/app store/i, 'App Store'],
  [/google play/i, 'Google Play'],
  [/download now/i, '"Download now"'],
  [/available now/i, '"available now"'],
  [/\bP18\b/, 'P18 (reference device)'],
  [/ministry/i, 'Ministry'],
  [/\binvestors?\b/i, 'investor'],
  [/funding/i, 'funding'],
  [/\bseed\b/i, 'seed (round)'],
  [/\bdecree|décret/i, 'decree / regulation'],
  [/\btrusted by\b/i, '"trusted by"'],
  [/\bmade in\b/i, '"made in"'],
  [/\b\d+(\.\d+)?\s?(ms|mah|milliseconds)\b/i, 'a latency / battery number'],
  [/\d+(\.\d+)?\s?%\s?uptime/i, 'an uptime percentage'],
  [/\b(faster|cheaper) than\b/i, '"faster/cheaper than"'],
  [/\blive tracking\b/i, '"live tracking"'],
  [/\breal[- ]time\b/i, '"real-time" (demo data only)'],
  [/\b(buy|order) (now|the terminal|a terminal)\b/i, 'buy / order'],
  [/\b20(2[7-9]|3\d)\b/, 'a future year (no launch dates)'],
];
const RAW_BANNED = [
  [/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, 'an email address'],
  [/\+\s?213/, 'a +213 phone number'],
  [/mailto:/i, 'a mailto: link'],
  [/\btel:\+?\d/i, 'a tel: link'],
];

const SMALL_PRINT = 'Renders of a design in development. Example fares.';
// Anything that shows a terminal render, terminal screen or the film.
const TERMINAL_MEDIA = /(\/terminal\/|\/screens\/|terminal-film|data-terminal-media|\/(persp|front|side|rear|service|reload|bottom|face|idle|dest|pay|tap|ok|ticket|ticket40)(-tight)?\.[\w-]+\.(webp|avif|png|jpe?g))/;

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });
}

const decode = (s) =>
  s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d));

let files;
try {
  files = walk(DIST);
} catch {
  console.error('claims-check: dist/ not found. Run `astro build` first.');
  process.exit(2);
}

let failures = 0;
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const noCode = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ');
  const attrs = [...noCode.matchAll(/\s(?:alt|title|aria-label|placeholder|content|value)="([^"]*)"/gi)].map((m) => m[1]);
  const text = decode(noCode.replace(/<[^>]+>/g, ' ') + ' ' + attrs.join(' ')).replace(/\s+/g, ' ');
  const rel = relative(DIST, file);
  const problems = [];

  for (const [re, why] of BANNED) {
    const m = text.match(re);
    if (m) problems.push(`${why}: "…${text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40)}…"`);
  }
  for (const [re, why] of RAW_BANNED) {
    const m = noCode.match(re);
    if (m) problems.push(`${why}: "${m[0]}"`);
  }
  if (TERMINAL_MEDIA.test(noCode) && !text.includes(SMALL_PRINT)) {
    problems.push(`shows terminal renders / screens / film but lacks the small print "${SMALL_PRINT}"`);
  }
  if (problems.length) {
    failures += problems.length;
    console.error(`✗ ${rel}`);
    for (const p of problems) console.error(`    ${p}`);
  } else {
    console.log(`✓ ${rel}`);
  }
}

if (failures) {
  console.error(`\nclaims-check FAILED: ${failures} problem(s) in ${files.length} page(s).`);
  process.exit(1);
}
console.log(`\nclaims-check passed: ${files.length} page(s).`);
