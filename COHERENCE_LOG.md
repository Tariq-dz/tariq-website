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

## Iteration 3 — 2026-07-06
**Grades** — type/eyebrow: B+ · spacing rhythm: B+ · gold usage: A · card language: A- ·
seams/transitions: A- (post-loop-2 repairs hold) · motion timing: B+ · composition: B+ ·
mobile parity: A-

**Top offenses found:**
1. MEDIUM — Stories eyebrow grammar breaks mid-story: z-beat captions say
   "—— DEST · BEAT" in the destination accent (fs-micro, ls-eyebrow), while panels
   A/B said a bare gold "BEAT" at a different type scale (fs-label). Two eyebrow
   languages inside one continuous narrative.
2. MEDIUM — Waitlist exit: ~170px of silent black between "We'll email you once…"
   and the app→cities seam — the longest dead stretch on the page, felt like a stall
   before the sand reveal.
3. LOW (carried) — Mobile vehicles mid-scrub composition still dim; needs a live pass.

**Fixes applied:** `.s-panel-tag` now speaks the z-caption grammar — rule +
"DEST · BEAT" in the destination accent (stories.js composes it, stories.css matches
the zcap-eyebrow spec; centered on mobile). Waitlist bottom padding trimmed to
clamp(56px, 9vh, 100px) — the 18vh seam supplies the exhale. Verified on both
viewports; zero console errors.

## Iteration 4 — 2026-07-06
**Grades** — type/eyebrow: A- (post-loop-3 unification holds) · spacing rhythm: A- ·
gold usage: A · card language: A- · seams/transitions: B+ · motion timing: B ·
composition: B+ · mobile parity: B+

**Top offenses found:**
1. MEDIUM — Vehicles rail handoff void: alphaFn dropped both cards to .45 at the
   midpoint (|d|=.5), scale .58 — over pure black the viewport went focal-less,
   worst on mobile where cards are smaller.
2. MEDIUM — Hero→stories and stories→vehicles seams hard-cut against the *fixed*,
   destination-tinted stories backdrop (warm rgb(10,8,6) → cool rgb(23,32,47) hue
   flip in one pixel row). Opaque seam edges can never match a fixed tinted layer.
3. CLEARED — "Télé|phérique" mid-word roman→italic split inspected at 4×: tight but
   legible, and it's the same deliberate device as Tram|way / Télé|cabine. Not a defect.

**Fixes applied:** alphaFn falloff 1.1 → 0.75 (handoff keeps a ~.63-alpha focal card,
neighbors gain rail depth); seam-hero-stories bottom and seam-stories-vehicles top now
fade to/from transparent so the fixed backdrop shows through gradually. Verified: seam
max adjacent-row delta 10–16 (noise) vs former 30+ hue step; handoff reads as two cards
in motion; the only remaining hard edge at seam 2 is the intentional gold hairline cue.
Zero console errors.

## Iteration 5 — 2026-07-06 — CLEAN PASS (1 of 2)
**Grades** — type/eyebrow: A- · spacing rhythm: A- · gold usage: A · card language: A- ·
seams/transitions: A- · motion timing: B+ · composition: A- · mobile parity: A-

**Findings: no high- or medium-severity offense.** Verified in natural flow: loop-4
seam fades hold at hero→stories and stories→vehicles; cities edge plates hold at both
boundaries; wordmark ink-swap correct over sand; vehicles rail keeps a focal card
through handoffs with depth neighbors; footer outro composed and balanced on both
viewports. Radius/badge audit: buttons 2px everywhere, cards on --r-card/--r-card-sm,
badges pill on both cities and vehicles.

**LOW (fixed):** .vc-badge hardcoded 999px → var(--r-pill) (token hygiene, zero visual delta).
**LOW (accepted):** app-rail chapter text dims mid-transition — a scrub state that reads
fine in motion; not worth risking the timing model.

Stop rule: this is clean iteration 1 of 2 consecutive required.

## Iteration 6 — 2026-07-06
**Grades** — type/eyebrow: A- · spacing rhythm: A- · gold usage: A · card language: A ·
seams/transitions: A- · motion timing: B+ · composition: A- · mobile parity: A-

**Top offenses found:**
1. MEDIUM — Stories chapter chrome contradicted the stage: the beat label used
   floor(beatF) over a uniform 5-way split, but the z-flight is nonuniform — at
   y3060 the caption read "CLINIC · THE PIVOT" while the chrome said
   "03 — THE JOURNEY BEGINS". Measured across the pin: the label mismatched the
   focal card for roughly half of every beat, and read "05 — The Arrival" while
   panel A was narrating the Pivot.
2. CLEARED — Mobile app chapters: the wallet phone under "03 · Ride" text is
   chapter 4's phone in the stacked [phone, text] rhythm, anchored by its own
   "04 · Pay" tag directly beneath. Correct as designed.

**Fixes applied:** beat label now follows the moment that actually holds the stage —
the card with max opacity when any is >.35, else panel A ⇒ beat 4, panel B ⇒ beat 5
(same signal the captions use). Verified at 13 scroll positions: label matches the
focal card at every step, including both panel reprises. Zero console errors.

Stop rule: MEDIUM found — clean streak resets to 0.

## Iteration 7 — 2026-07-06 — CLEAN PASS (1 of 2)
**Grades** — type/eyebrow: A · spacing rhythm: A- · gold usage: A · card language: A ·
seams/transitions: A- · motion timing: B+ · composition: A- · mobile parity: A-

**Findings: no high- or medium-severity offense.** Loop-6 chrome fix verified in the
wild on both viewports: desktop beat 4 now reads "04 — THE PIVOT" against the matching
caption; mobile beats 01/02/04 and panel A all agree with their chrome. Fresh frames
never inspected before (mobile panel A, mobile SNTF focal, desktop ETUSA focal, desktop
app chapter 5) are all composed: bright focal card + low-alpha depth neighbors, chrome
synced, eyebrow grammar consistent.

**LOW (accepted):** the 5-segment story bar fills on continuous scroll progress while
the label follows the focal moment, so mid-beat they can disagree — the bar signals
scroll depth, the label signals the chapter; leaving the continuous fill.
**LOW (accepted):** app chapter text sits dim for a moment while its phone is already
lit during the crossfade — motion state, reads fine live.

Stop rule: clean iteration 1 of 2 consecutive required.
