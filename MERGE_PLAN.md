# Tariq Merge Plan — Preserving Every Animation

**Goal:** Merge four source files into a single cinematic landing page, without losing a single animation or interaction, and with seamless (non-stitched) transitions between sections.

## Source files

| # | File | Role | Owns |
|---|---|---|---|
| 1 | `uploads/section1-hero.html` | Hero | WebGL horizon shader, flare, cursor bloom, wordmark entrance |
| 2 | `uploads/passenger-stories-v2.html` | Passenger Stories (v2, the approved one) | 3D camera Z-travel, dock carousel, ring backdrop, silhouette parallax, section panels with word-split/blur-in |
| 3 | `uploads/section3-vehicles.html` | Modes of Transit | Horizontal rail, vehicle cards, focus state |
| 4 | `uploads/section4-cities.html` | Cities | City cards, NFC flip |

Plus `uploads/section2-stories.html` is the **older** stories variant — kept only for reference; v2 wins.

## Golden rules (non-negotiable)

1. **Never drop an animation.** Every `@keyframes`, GSAP tween, ScrollTrigger, rAF loop, canvas/WebGL pass from the sources must survive into the merged file.
2. **Never edit section markup beyond what's required** to scope scripts and fix id collisions.
3. **Copy CSS verbatim** into namespaced blocks (e.g. wrap rules under `.sec-hero { … }` not just reuse global selectors).
4. **IDs must be unique across all four files.** Rename collisions (`#wrapper`, `#sticky`, `#backdrop`, `#scene`, `#camera`, `#rings`, etc.) with a section prefix.
5. **Scope ScrollTrigger instances.** Each section's ScrollTrigger uses its own `trigger:` element, not `window`, so they don't fight each other.
6. **Preserve per-section libraries.** The stories file uses GSAP + ScrollTrigger. Hero uses raw WebGL. Vehicles/Cities may use plain JS or GSAP. All load once in `<head>`, scripts run in order.

## Section sizing (the "don't stretch things" rule)

| Section | Height | Why |
|---|---|---|
| Hero | `100vh` | Full-bleed cinematic entrance — the pitch |
| Passenger Stories | `1200vh` (native) | The camera needs room to travel. Non-negotiable — it's the source. |
| Modes of Transit | ~`100vh` (not `500vh`) | A horizontal rail is compact — show it in one frame |
| Cities | ~`90vh` | Typical marketing card-slider — not a hero-sized panel |
| Footer / CTA | ~`60vh` | Short outro |

Cities was too tall in v1. Vehicles rail was given too much scroll. Both are **compact strips**, not stages.

## Seamless transition strategy

Not about shared colors — about **gesture continuity**. Each handoff needs an animation that carries motion across the seam:

1. **Hero → Stories** — as the hero scroll progress approaches 1, the WebGL flare fades UP while the stories ring backdrop fades IN from below (cross-fade). The silhouette starts tall, small — feels like zooming out of the hero into the ring space.
2. **Stories → Vehicles** — last story panel dissolves. As we exit, the dark sand gradient at the bottom of stories bleeds directly into the Vehicles `#050403` black. A single gold hairline travels across the seam (one-shot GSAP tween on scroll-enter Vehicles).
3. **Vehicles → Cities** — vehicle rail momentum cue: the last visible vehicle card shrinks into a city card position. Background lifts from pure black to the cities sand/night gradient over ~40vh.
4. **Cities → Footer** — city cards parallax down, footer rises in. No hard cut.

Implementation: a single `ScrollTrigger` per seam, tied to an overlap region (~15vh) that owns both the fade-out of the leaving section and the fade-in of the incoming one.

## File layout (target)

```
ui_kits/tariq_site/
  index.html            — merged single-page site
  site.css              — global tokens + shared cursor + shared type
  /sections/
    hero.css            — scoped rules from section1
    hero.js             — shader, cursor bloom, wordmark entrance
    stories.css         — scoped rules from v2 (prefixed .sec-stories)
    stories.js          — GSAP Z-camera, dock, panels (all IDs prefixed)
    vehicles.css        — scoped rail + card styles
    vehicles.js         — rail focus / snap logic
    cities.css          — scoped card grid + flip
    cities.js           — flip interactions
    transitions.css     — seam overlap styles
    transitions.js      — per-seam ScrollTrigger crossfades
  passenger-stories.html — kept as standalone reference
```

## Step-by-step execution (resumable)

When context is tight and we have to resume, pick up at the next unchecked box.

- [ ] **1. Read all 4 source files end-to-end.** Record every `@keyframes` name, every GSAP tween, every ScrollTrigger trigger element, every id/class, every global variable, every init function. Put inventory in `sections/INVENTORY.md`.
- [ ] **2. Id collision map.** List ids that appear in more than one file. Assign prefixes: `sec-hero-*`, `sec-stories-*`, `sec-veh-*`, `sec-cit-*`.
- [ ] **3. Extract CSS per section** into `sections/*.css`, wrap every rule under a section-scope class.
- [ ] **4. Extract JS per section** into `sections/*.js`, namespace globals inside IIFEs. Each section's init function must be idempotent and scoped to its own DOM subtree.
- [ ] **5. Build `index.html`** as a flat scroll of four `<section>` elements plus transitions markup.
- [ ] **6. Wire transitions** in `transitions.js` — one ScrollTrigger per seam.
- [ ] **7. Test each section in isolation first**, then together.
- [ ] **8. Verify no console errors**, no animation dropped, scroll feel is continuous.

## What killed the previous attempt

- Replaced the v2 stories file with a **static React component** — lost the camera, the dock carousel, the panels, everything. The iframe embed later was a band-aid that still broke seamless transition.
- Shortened vehicles and cities into generic React components — lost the horizontal rail momentum and the NFC flip animations.
- Didn't scope ScrollTriggers, didn't rename ids, didn't preserve keyframes.

## What we will NOT do

- Rewrite animations "cleaner". Copy them literally.
- Replace GSAP with CSS. The sources chose GSAP for a reason.
- Split the result into iframes. Everything in one page, one scroll.
- Make cities or vehicles full-bleed panels. They are compact strips.
