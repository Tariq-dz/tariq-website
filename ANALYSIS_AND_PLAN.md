# Tariq — Unification Analysis & Deep Plan

**Goal.** The merged page runs, every source animation survives, but the user
experience is still "four sections glued together" — not "one continuous
landing page." This document analyzes *why* and proposes a phased rebuild of
the connective tissue, plus concrete section-size targets and open questions
that block implementation.

**Method.** A headless Chrome (via puppeteer) drove the page to 12 scroll
positions spanning every section and seam. Shots live in `docs/shots/`. This
plan references them directly.

> The WebGL starfield doesn't render in headless Chrome (no GPU fallback), so
> the hero in the screenshots shows a white page instead of the night sky.
> That's a capture artifact, not a runtime bug — but it does reveal a real
> production gap: **the hero has no non-WebGL fallback**, so browsers that
> can't run the shader see a blank page. Addressed below (P1-F).

---

## 1. Executive diagnosis

The build correctly preserves every source animation. What it lacks is
**cross-section gesture continuity** — the design vocabulary changes abruptly
at every seam because:

1. **Stories breaks the brand's dark/gold register.** Hero, Vehicles, and
   Footer are all dark + gold serif; Stories is a pale-gray sand canvas with
   dark text and Material-blue/red/green emoji pills. The eye reads it as a
   different site. This is the single biggest rupture.

2. **No shared UI element travels with the user.** No progress indicator, no
   persistent wordmark, no continuous cursor behavior. Each section is its
   own island with its own rules.

3. **Stories has no entry headline.** Vehicles opens with "03 — Modes of
   transit / Your city, every line." Cities opens with "04 — Cities / We're
   in your city. Are you on board?" Stories just… starts. No "02 — Passenger
   Stories" eyebrow, no serif intro. The reader is dropped into a dock.

4. **Cities is sized like a hero, not a strip.** 79vh with generous padding
   makes it feel like a fifth flagship section instead of the compact card
   carousel typical of marketing sites.

5. **Seams are *gradient bars* instead of *gestures*.** The current
   implementation is a colored slab between sections — it announces the
   boundary rather than hiding it. The plan called for gesture continuity
   (element handoff), which isn't built.

6. **Emoji placeholders undercut the cinematic tone.** 🎓 💼 🏥 🗺️ 🏫 on the
   dock and 🚇 🚊 🚌 on vehicles read as playful; the serif display type
   reads as cinematic. The two don't agree.

---

## 2. Screenshot-by-screenshot evidence

| # | Shot | What it reveals | Problem severity |
|---|---|---|---|
| 00 | `00-hero-top.png` | Hero with logo + "Tariq" + CTA. WebGL is blank (headless limitation). In real browsers the starfield shows. | P1 — need fallback for non-GPU clients. |
| 01 | `01-hero-bottom.png` | Hero's bottom 15% + seam gradient + top of stories. The seam reads as a **dark horizontal bar** separating two totally different surfaces — night above, sand-gray below. No bridging element. | **P0 — largest visual rupture.** |
| 02 | `02-seam1-hero-stories.png` | Same region, one frame later. Dock + silhouette already painted; the jump is instant once `body.stories-active` fires at 2%. | **P0.** |
| 03 | `03-stories-intro.png` | First story card (University `Stairs are hard, balance matters.`) fades in next to the Clinic pill. **No section intro** ("02 — Passenger Stories" / serif headline). Background is pale `#e4e6e9`. Feels like a different app. | **P0 — missing intro + brand mismatch.** |
| 04 | `04-stories-mid.png` | At pr=0.40, the viewport is a sea of empty pale gray with the fixed dock at top and the silhouette off-frame. **Dead zone between cards** — the camera is between card 3 and card 4 with neither in the opacity window. | P1 — scroll pacing issue. |
| 05 | `05-stories-panels.png` | Panel B for Clinic: "THE ARRIVAL / On time.Every time." with a blue art card + hospital emoji. Note the **missing space** ("On time.Every time.") — a CSS `em` line-break rendering bug. The emoji at bottom-right is jarring against the serif. | P1. |
| 06 | `06-seam2-stories-vehicles.png` | Exits stories into pure-black vehicles. A faint gold hairline is visible across the seam — this seam **works** and is the closest to the brief. | ✅ keep pattern. |
| 07 | `07-vehicles.png` | Vehicles landing — Metro card centered, serif "Your city, every line.", ghost "Modes / Transit" words, bottom strip "Metro / 01 / 09". **This is the reference look** other sections should echo. | ✅. |
| 08 | `08-seam3-vehicles-cities.png` | Black lifts to warm sand with a gold hairline; cities cards already peeking. This seam **also works**. | ✅. |
| 09 | `09-cities.png` | Cities header + card strip. The section is 714px (~79vh) but still feels over-tall because padding is generous and the card strip is compact. **Needs to collapse to ~55vh.** | **P0 — explicit user ask.** |
| 10 | `10-cities-bottom.png` | Same view, slightly earlier — cards still sliding in. Cities marquee does its job. | ✅. |
| 11 | `11-footer.png` | Dark outro with serif headline + gold CTA. Clean. | ✅. |

Summary: **hero→stories is the worst seam. Stories itself is the worst
section (wrong brand, no intro, dead scroll zones, emoji overload). Cities
is too tall. Vehicles + footer + the vehicles→cities seam are templates for
the rest.**

---

## 3. Root-cause analysis — why it still feels stitched

### 3.1 Stories inverts the brand palette

The landing page's brand (from `README.md` and every other section) is
**night-gold**: `#050403` background, gold accents, serif display. The v2
passenger-stories file was designed as a standalone immersive experience on
a **sand-gray** canvas — different palette, different typeface (DM Sans),
different energy.

Dropping v2 in wholesale means stories suddenly looks like a **different
product's page**. No amount of seam-gradient smoothing fixes this; the
audience has to re-acclimate to a new visual language for 10,800px of
scrolling and then re-acclimate back to night-gold for vehicles.

**Fix options (need user decision):**
- **A.** Re-skin stories to night-gold: dark backdrop, gold text, white
  pills — preserve camera/dock/panel mechanics 1:1. *Strongest unification.*
- **B.** Keep stories light but extend the bridge: hero gradually lifts to
  sand over 30vh; stories gradually darkens to night over 30vh.
  *Lower risk, weaker unification.*
- **C.** Keep stories as-is but frame it as a "journal" interlude — add an
  intro card that names the pivot ("A passenger's view. Turn the page.").
  *Preserves v2 intent, leans into the contrast.*

Recommendation: **A.** It's more work but removes the root cause.

### 3.2 No shared thread across sections

A unified landing page has at least one element the user keeps seeing as
they scroll — a nav, a progress bar, a persistent logo, a cursor that
*remembers*. Tariq has none of these after hero. Every section rebuilds its
own world from scratch.

**Fix:** add three shared elements, rendered outside the sections:

- **(a) Persistent mark.** Top-left `tariq` wordmark (small, gold, serif)
  that fades in after hero CTA exits the viewport. Anchored top-left, fixed.
- **(b) Section progress strip.** Top-right or bottom-center, 4 small dots
  (01 02 03 04) with the active one filled gold, connected by a thin rule.
  Fixed. Click-to-jump.
- **(c) Scroll progress hairline.** 1px gold line pinned to top of viewport
  (z above everything), width = scroll progress × 100%. Ultra-subtle but
  reads as "this is one continuous journey."

Cost: ~120 lines of CSS + JS. Impact: **huge** — the whole page reads as
one interface.

### 3.3 Stories has no entry headline

Every other content section opens with:

```
NN — Section Name        (eyebrow, uppercase, hairline rules)
Headline text.           (serif, mix of upright + italic em)
<em>Italic emphasis.</em>
TAP ONCE. RIDE EVERYWHERE (subcopy, uppercase)
```

Stories drops the reader straight into a dock. **Add a matching intro** that
appears before the z-travel begins. Sits in the top 100vh of the stories
wrapper so it reads as an opener, then fades as the camera starts moving.

### 3.4 Cities is sized like a hero

Current cities: `padding: 100px 0 100px 0`, header block ≈ 180px, card strip
210px, bottom padding 100px → total ~79vh. The design brief and user both
say this should be a **compact marquee** (~55vh).

**Fix:** trim header padding + card height + remove the large vertical gaps.
Target 52–58vh.

### 3.5 Seam philosophy is wrong

The current seams are gradient dividers. The plan specified **element
handoff** — something physically carrying across the boundary. Current state:

| Seam | What plan called for | What's built |
|---|---|---|
| Hero → Stories | WebGL flare fades UP, ring backdrop fades IN from below (crossfade over ~15vh) | Static gradient strip; hero CTA scrub fade-out only |
| Stories → Vehicles | Sand gradient bleeds into vehicles black, gold hairline travels across seam | Gold hairline sweep ✅, gradient strip |
| Vehicles → Cities | Last vehicle card shrinks INTO a city card position | Gradient strip + vehicles center-text scrub fade-out only |
| Cities → Footer | City cards parallax down, footer rises | Gradient strip + footer rise ✅ |

**Fix:** re-implement seams as gestures that move existing elements, not
gradient bars that sit between sections. Detail in §5.

### 3.6 Emoji tax

Dock pills 🎓💼🏥🗺️🏫, vehicle placeholders 🚇🚊🚌🚕🚆🚠⛴, panel icons
📍🎓🏥🔄🎫 are noted as placeholders in the bundle README, and the design
system explicitly says to replace them with 1.25–1.5px gold line drawings.
Until they're replaced, the page looks prototype-y.

**Fix:** draw inline SVG line icons for the 5 destinations and the 9
vehicles, replace emoji with them. Panel icons can be dropped entirely
(they don't carry meaning).

---

## 4. Section size targets

| Section | Current | Target | Rationale |
|---|---|---|---|
| Hero | 100vh | 100vh | Cinematic opener. Don't change. |
| Stories | 1200vh | 1200vh | Camera needs the room. Intrinsic. |
| Vehicles | 100vh | 100vh | Reference size — works as-is. |
| **Cities** | **79vh** | **55vh** | **Strip, not panel. Reduce top/bottom padding, tighten header.** |
| Footer | 60vh | 60vh | Works. |

Total page: ~14,456px today → ~14,100px after cities trim. Negligible.

---

## 5. Proposed fixes, ordered by impact

### Priority 0 — These are the reasons the page feels stitched

**P0-1. Re-skin stories to night-gold** (or bridge it, per §3.1 user pick).
- File: `css/stories.css`
- Change `#sec-stories-backdrop` bg to `#0a0806`
- Change `.zcard-face` shadows + text colors (invert: white text on dark
  stays white, but the panel cards need dark bg → change `.s-panel-h`
  color from `#111` to `rgba(255,255,255,.92)`, tag from `rgba(0,0,0,.4)`
  to `rgba(200,160,80,.7)`, body from `rgba(0,0,0,.52)` to
  `rgba(255,255,255,.55)`)
- Change ring stroke from `rgba(0,0,0,.04)` to `rgba(200,160,80,.10)`
- Silhouette from `#1a1a1a` to `rgba(200,160,80,.08)`
- Dock pills: glass-gold instead of glass-white; text white with gold edge
- Data `bg` field (`#e8d4d4`, `#ecddd0`, etc.) becomes the panel backing —
  convert to dark warm tints (`#201408`, `#28180a`, `#041828`, `#082010`,
  `#0a0a28`)

**P0-2. Add stories section intro.**
- File: `css/stories.css` + `index.html`
- New block `#stories-intro` rendered over top of `#sec-stories-sticky`,
  fades out as `pr > 0.05` via the stories.js ScrollTrigger onUpdate (add 3
  lines to the existing onUpdate).
- Copy: `02 — Passenger Stories` / `Real rides.<br><em>Real people.</em>` /
  `One tap, and hear the city through the people who move it.`

**P0-3. Compact cities from 79vh → 55vh.**
- File: `css/cities.css`
- `#s-cities { padding: 56px 0 48px; }` (was 100px 0)
- `.cities-header { margin-bottom: 36px; gap: 14px; }` (was 64, 20)
- `.cities-h2 { font-size: clamp(28px, 3.6vw, 48px); }` (was 40, 5, 64)
- `.city-card-image { height: 180px; }` (was 210)

**P0-4. Persistent brand mark + section progress strip + scroll hairline.**
- New files: `css/global-nav.css`, `js/global-nav.js`
- Mark `tariq` top-left, fade in after hero
- Dot progress top-right, fixed, click-to-jump
- 1px gold scroll indicator at top of viewport, width = progress%

### Priority 1 — Noticeable polish

**P1-A. Real gesture seams** (replace gradient bars with handoffs):
- *Hero → stories:* add a gold scroll line that extends downward from
  the hero CTA and terminates at the stories intro headline. Scroll-linked.
- *Stories → vehicles:* keep hairline sweep. Also: last panel card
  `translate3d(0, -40vh, 0)` scale-down and fade as pr >0.97, so it
  "recedes" into the coming blackness.
- *Vehicles → cities:* the focused vehicle card `rotateX` and shrink as
  pr approaches 1; a clone city-card-shaped silhouette appears top-right
  of cities as it enters (reads as the vehicle "became" a city card).
- *Cities → footer:* cards continue their marquee during the seam —
  actively moving, not still — so the handoff feels alive.

**P1-B. Replace emoji icons with gold line SVGs.**
- 5 destination glyphs (graduation cap, briefcase, medical cross, map pin,
  school pennant) as 24px inline SVG, stroke `#c8a060`, 1.25px, no fill.
- 9 vehicle glyphs (metro, tram, bus, aerial car, rail, taxi, ferry,
  gondola) at 80px, same treatment.
- Remove panel icons entirely (they're decorative, not load-bearing).

**P1-C. Stories dead-zone density.**
- Currently cards at z: 500, 2000, 4000, 6500, 9000. Gaps of 1500–2500px
  mean there are frames with no visible card. Either:
  - (a) Add overlap by widening APPROACH_PX from 1800 → 2600, OR
  - (b) Re-space z depths evenly: 500, 1700, 2900, 4100, 5300 (compressed
        scene, camera still ends at 11000) — density stays constant.

**P1-D. Fix "On time.Every time." missing-space bug.**
- Panel headline SVG renders `On time.<em>Every time.</em>` without space.
  Root: the `.s-panel-h em` styling collapses whitespace around the break.
  Fix in data: `'On time.<br><em>Every time.</em>'` (add `<br>` or a
  leading space inside the em).

**P1-E. Make cursor behavior cross-section coherent.**
- Today: cursor is gold dot everywhere, turns white over hero
  (`cursor-light`), expands over vehicles (`cursor-expanded`). Stories and
  cities leave it as gold dot.
- Add: `cursor-dark-bg` class toggled over light-bg sections (stories
  intro, cities header) so the dot inverts to dark for legibility.

**P1-F. Hero WebGL fallback.**
- `#hero-canvas { background: radial-gradient(...) }` — a static gradient
  that mimics the horizon flare — applied beneath the canvas. If WebGL
  fails, the gradient shows and the page still looks branded.

### Priority 2 — Delightful extras (defer until P0/P1 lands)

- **P2-A.** Magnetic hero CTA — the CTA subtly pulls toward the cursor.
- **P2-B.** City card tilt-on-parallax using the existing mousemove.
- **P2-C.** Stories "scene change" flourish when the dock re-routes —
  screen-wipe gold rectangle from left to right as the new scene rebuilds.
- **P2-D.** Footer gets a tiny looped metro-line SVG animation.

---

## 6. Implementation phases (ready to execute)

### Phase 1 — Brand unification (one sitting, high impact)
Ship: **P0-1 P0-2 P0-3 P0-4, P1-D, P1-F.** No new JS libraries; ≤ 400 lines
net change. Result after phase 1: the page reads as one site.

### Phase 2 — Seam rebuild
Ship: **P1-A.** ~80 lines of JS, 60 of CSS. Result: seams feel like gestures.

### Phase 3 — Icon replacement
Ship: **P1-B, P1-C, P1-E.** ~200 lines (mostly SVG definitions). Result:
production-grade polish.

### Phase 4 — Delights
Ship whichever of **P2-A…D** survive user review.

---

## 7. Open questions (answers will unblock Phase 1)

Please pick one option per question — or reply "you choose" and I'll pick
the one I recommend.

> **Q1. Stories palette.** Re-skin stories to dark/gold to match the brand
> (§3.1 option A, recommended), OR keep stories light and build a longer
> bridge (option B), OR keep light and lean into the contrast with a
> framing device (option C)?

> **Q2. Stories intro copy.** Use `02 — Passenger Stories / Real rides.
> Real people. / One tap, and hear the city through the people who move
> it.` — or do you want different copy?

> **Q3. Persistent brand mark.** Small `tariq` wordmark top-left, fixed,
> fades in after hero (recommended). Or: no persistent mark. Or: both
> mark + a "Menu" button linking to section anchors.

> **Q4. Section progress indicator.** Where does it live?
>  a) Top-right 4-dot progress (recommended)
>  b) Centered at top, a thin bar with section labels below
>  c) Right edge, vertical 4-dot
>  d) None — leave it off.

> **Q5. Cities target height.** 55vh (recommended), 50vh, or keep 79vh?

> **Q6. Emoji replacement.** Replace with gold line SVGs now
> (recommended) or defer?

> **Q7. WebGL fallback.** Use a static gold-horizon gradient if WebGL
> fails (recommended), or leave blank on unsupported clients?

> **Q8. Shared scroll hairline (1px at top of viewport).** Yes
> (recommended), no, or subtle gold dot that moves instead of a line?

> **Q9. Seam rebuild scope.** All four seams this round, or just
> hero→stories (the worst one) first?

---

## 8. Appendix — code-touch map for Phase 1

Phase 1 touches these files:

```
css/stories.css           ~120 lines changed (palette invert + intro block)
css/cities.css            ~20 lines (sizing)
css/global-nav.css        new ~80 lines (mark + dots + hairline)
css/hero.css              ~10 lines (fallback gradient)
js/stories.js             ~30 lines (intro fade in onUpdate, panel data bg
                             colors inverted, headline space fix)
js/global-nav.js          new ~90 lines (IntersectionObserver per section +
                             scroll listener for hairline)
index.html                ~25 lines (intro markup inside stories, nav
                             markup at body root, footer unchanged)
```

No new libraries. GSAP/ScrollTrigger already loaded. All changes
additive / localised.

---

## 9. What I will NOT touch in Phase 1

- The z-depth scroll mechanic in stories (works, don't break)
- The diagonal vehicle rail (works)
- The cities marquee (works)
- The hero shader (only add fallback, not modify)
- ScrollTrigger scopes (already correct)
- ID-naming (already collision-free)
