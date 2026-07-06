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
