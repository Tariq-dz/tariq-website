# COHERENCE LOG — design-director loop

## Iteration 1 — 2026-07-06
**Grades** — type/eyebrow: A- · spacing rhythm: B+ · gold usage: A · card language: A- ·
seams/transitions: C · motion timing: B+ · composition: B+ · mobile parity: A-

**Top offenses found:**
1. HIGH — Vehicles cards visible as a raw untransformed pile at the stories→vehicles
   seam (cards only get positioned once the section is 30% visible). Looks broken.
2. HIGH — Cities `background-attachment: fixed` anchors the sand gradient to the
   viewport: hard horizontal cuts where the section meets both seams.
3. MEDIUM — Stories exit: panel B leaves at pr .94, chrome at .965, leaving a dead
   tail before a 20vh seam — the longest silent stretch on the page.

**Fixes applied:** .vcard hidden until first positioning pass; cities gradient scrolls
with the section; panel B holds to pr .96 and the stories→vehicles seam trimmed to 14vh.

## Iteration 2 — 2026-07-06
**Grades** — type/eyebrow: A- · spacing rhythm: B+ · gold usage: A · card language: A- ·
seams/transitions: B- · motion timing: B+ · composition: B+ · mobile parity: A-

**Top offenses found:**
1. HIGH — Cities section body gradient runs at 170deg, so its top/bottom edges never
   land on the colors the adjacent seams expect: hard horizontal cut at cities→footer
   (rgb 78,64,43 → 30,22,8 on the left edge) and a lesser one at app→cities on the right.
2. MEDIUM — Gold `tariq` wordmark sits at ~0.15 contrast over the light sand of the
   cities section: effectively invisible for a full viewport of scroll.
3. LOW (deferred) — Mobile vehicles mid-scrub composition is dim with large dead space;
   static captures of a scrub state, needs a live pass to judge fairly.

**Fixes applied:** `#s-cities::before/::after` edge plates pin the section's top edge to
--sand-light and bottom edge to --sand-deep (content lifted to z-index 1); wordmark gets
an `.on-light` ink swap (rgba 26,18,6,.8) via a thin-strip IntersectionObserver over
#s-cities, transitioning at .45s. Verified: boundary max adjacent-row delta dropped from
145 to background-noise levels on both viewports; mark swaps to ink over sand and back to
gold above; zero console errors.
