# TARIQ WEBSITE — PHASE A AUDIT
2026-07-06 · Site served from repo root (static, `python3 -m http.server`) · Screenshots: `screenshots/audit/{desktop,mobile}/` (1440×900 and 390×844, full scroll-through + per-section anchors) · Console log: `screenshots/audit/console-log.txt`

**Console status: zero JS errors, zero 404s** — in headless Playwright *and* real Chrome. The only warnings are headless-GPU WebGL artifacts (see Hero).

---

## Section 1 — HERO

**Keep (this is the strongest section):**
- The WebGL sunrise-horizon shader: starfield, breathing rim glow, cursor-proximity light bloom, CTA-hover sunrise surge. Verified in real Chrome — it's genuinely premium.
- Logo glow interaction tied to cursor proximity.
- Entrance choreography (staggered fade-ups, 1.4s expo-family easing).

**Breaks coherence:**
- Hero gold is its own palette (`#c9921a`, `#e8c96a`, `#f5e199`) while the rest of the site runs `rgba(200,160,80,*)` (`#c8a060`). Two different golds within one scroll.
- CTA is the only bordered-pill button style until the footer, where the same pattern reappears with slightly different metrics.

**Broken / unprofessional:**
- **No WebGL failure handling.** In headless Chromium the context was lost and the hero rendered as a white void with a broken-canvas glyph — proof of what any user with blocked/failed WebGL sees. Needs a graceful static fallback (dark gradient + logo) and a `webglcontextlost` handler.
- Shader compile/link status never checked; `gl` never null-checked — if WebGL is unavailable, `hero.js` throws and the whole IIFE dies (logo interaction included).
- `logo.png` is 476KB — by far the heaviest asset on the site, for a ~300px image.
- Mobile: "EXPLORE TARIQ" wraps to two lines (border box looks like a misrendered button).

---

## Section 2 — PASSENGER STORIES (the 3-D scroll epic)

**Keep:**
- The concept and craft ambition: destination dock, per-destination color tint, Z-travel camera with parallax layers, beat progress segments, blur-reveal captions. Nothing else on the site says "one month of work" like this section.
- Beat cards 1–3 (art-directed line-art scenes: house, bus, speaker) read well on desktop.

**Breaks coherence:**
- Introduces a 4th and 5th font context: `DM Sans` body + `Playfair Display` italics exist *only* here. Elsewhere body text is Outfit.
- Dock pills, tooltips, beat labels each carry their own micro type sizes (9/10/11/13/15px — five sizes inside one section).

**Broken / unprofessional:**
- **Scale: the section is 1000vh — roughly 60% of the entire page** — and tells *one* story unless the user discovers the dock ("Try click"). Beats 4 ("The Pivot") and the exit stretch contain **fully empty viewports** (desktop frames 007, 012): nothing on screen for multiple scroll-lengths.
- **Panel cards A/B are empty colored rectangles.** `applyPanel` blanks the icon (`innerHTML=''`, CSS `display:none`) and paints a flat gradient — the two biggest cards in the section look like unloaded placeholders (frames 009–011).
- Intro overlap: "SCROLL" hint sits on top of the intro sub-line; during entry the intro text overlaps beat-1's card (verified live in Chrome).
- Mobile: dock overflows the viewport — outer pills clipped at both edges, and the fixed `tariq` wordmark collides with the dock. Panel A/B text columns collapse (~100px wide, hyphen-wrapped, right-edge crammed). Beat text overlaps its card.
- The dock hint says "Try click" — grammatically off; and dock pills are `<div>`s: not keyboard-focusable, no focus state, invisible to screen readers.

---

## Section 3 — VEHICLES

**Keep:**
- Card design language (badge, rule, serif name, ghost initial, gold topline on focus) — the most "designed" card system on the site.
- The 7 real webp cutouts (20–36KB each, well-optimized, correct colors — ETUSA blue/white).
- Ghost words "Modes"/"Transit" backdrop.

**Breaks coherence:**
- Another one-off body/label micro-type set (7–10px labels — the 7px badge text is below legibility).
- Card corner radius 16px vs stories 18/20px vs cities' own radii — three radius languages in three sections.

**Broken / unprofessional:**
- **Interaction model is undiscoverable.** The rail advances by *parking the pointer off-center diagonally* — there is no affordance, no arrows, no wheel/scroll/drag on desktop, and nothing moves for a centered cursor. In live testing the rail crawled imperceptibly. Users will scroll past having seen only Metro (01/09).
- **Mobile scroll trap: `touch-action:none` on a 100vh section.** Swipes over the section perform neither page-scroll nor obvious card control (advance requires *holding* a finger off-center). A phone user can be stuck at the vehicles screen or, at best, confused. This is the most severe usability defect on the site.
- **Cards have fixed pixel sizes (400–520px wide)** — on a 390px viewport the focused card overflows and the name/badge are clipped off-screen (mobile frames 013–014).
- Navette Maritime and Télécabine have no photos (`key:null`) — they show line glyphs, visibly poorer than the 7 photo cards. (Only 7 cutouts exist in assets.)
- Section header collides with the focused card at shorter viewport heights (verified at 1300×649 in Chrome).
- `#v-center-text` uses `white-space:nowrap` — fragile at mid widths.

---

## Section 4 — CITIES

**Keep:**
- Marquee with pointer-speed control and touch flick physics — feels good.
- The ticket-card (`tc-*`) motif — the NFC transit-card mini-cards are a lovely brand element.
- Algiers card with real photo + Live badge.

**Breaks coherence:**
- Header spacing/eyebrow style matches stories/vehicles, but badges introduce three new pill styles (Live/Coming soon/Planned) with their own greens/purples not used anywhere else.

**Broken / unprofessional:**
- **Factual conflict with ground truth: Oran is badged "Live".** Per product facts, only Algiers is live; Oran and Constantine are "coming soon." Also Algiers modes line reads "Metro · Tram · Bus · Taxi" (product has 9 modes) — undersells the flagship city.
- **Cairo, Lagos, Kinshasa, Luanda cards are not in the product facts** — founder decision needed: keep as explicit "vision" cards or cut. Their descriptions ("The city that never sleeps", "Africa's largest city") are unverified marketing claims about scope.
- Every non-Algiers card has a flat gradient instead of imagery — six near-black rectangles next to one photo card reads unfinished.
- "Explore" / "Notify me" / "Stay tuned" hover buttons go nowhere (dead affordances).
- Marquee cards clip mid-card at viewport edges on load (frame 015: header "TAP ONCE · RIDE EVERYWHERE" also collides with the wordmark zone on desktop).

---

## Section 5 — FOOTER / OUTRO

**Keep:** Typographic outro style matches the hero bookend nicely.

**Broken / unprofessional:**
- **The site has no conversion action.** The single CTA the brief demands — join the waitlist — does not exist anywhere. The footer's only action is "Back to top."
- No footer substance: no nav, no contact, no social, no legal line beyond © — reads as a placeholder.
- Huge dead black gap between the cities marquee and footer content (seam overshoot).

---

## SITE-WIDE

### Missing content (biggest gap of all)
- **The app is never shown.** 13 real app screenshots sit unused in `assets/app/`. There is no app showcase, no features/tickets/wallet/payment story (DZD, CCP, Carte Dahabia — none mentioned), no "free app" line, no waitlist. The site is an atmosphere reel that never introduces the product.

### Typography
- 4 Google font families (Cormorant Garamond, DM Sans, Outfit, Playfair Display) with 15 weights requested. DM Sans and Playfair exist only inside stories.
- ~30 distinct font-size values; micro-labels alone use 7, 8, 8.5, 9, 10, 11, 13, 15px. No scale.
- Eyebrow pattern (`01 — ...`) is consistent in spirit but re-implemented per section with different sizes/colors/rule widths.

### Color / gold usage
- 10 gold variants in play: `rgba(200,160,80)` (53 uses) vs `#c8a060` (12) vs hero's `#c9921a`/`#e8c96a`/`#f5e199` vs chrome's `#8a6840` vs sand `rgb(240,232,216)`. Needs one gold ramp with named roles (accent, accent-dim, chrome, highlight, sand).
- Per-destination and per-vehicle accent colors are fine as *data*, but they bypass any system.

### Animation timing
- ~20 distinct duration/easing pairs in CSS alone, plus GSAP eases (`expo.out`, `power2/3/4.out`, `elastic.out`, `sine.inOut`) chosen ad hoc per element. No shared timing tokens.
- **`prefers-reduced-motion`: zero support anywhere.** With a cursor-hijacking dot, scroll-driven 3-D camera, and constant rAF loops, this is an accessibility failure, not a nicety.

### Interaction / accessibility
- `cursor:none` + custom dot globally (desktop); `user-select:none` on **everything** — users cannot select/copy any text on the site.
- Zero `:focus` styles; dock pills and city hover buttons are non-focusable `<div>`s; keyboard users can reach only 3 links.
- Content unreachable without JS: stories/vehicles/cities are 100% JS-built (empty containers in HTML). No-JS = hero text + footer only. (Brief requires content reachable without JS.)
- 3 rAF loops run permanently (hero gates itself; vehicles/cities gate on visibility — good — but hero's `requestAnimationFrame` still fires every frame while off-screen, just returning early).

### Head / meta
- No `meta description`, no OpenGraph/Twitter tags, no canonical, generic favicon. Sharing this site produces a bare link.

### Repo hygiene
- Junk in root: `filename/` (9 untracked "Untitled" PNGs, 13MB), `ssh_key_to_add.txt`, dead `colors_and_type.css` (unreferenced), plus legacy `preview/`, `ui_kits/`, `uploads/`, `sections/` inventories.
- `.gitignore` ignores `*.md` — AUDIT.md and future phase docs need an exception at the gate commit.

---

# RANKED ENHANCEMENT PLAN (impact-first)

> Phase B builds the token system; Phase C batches below are ordered by visual/business impact. Effort: S ≈ half-day, M ≈ 1–2 days, L ≈ 3+ days of focused work.

**B. Foundation pass (M)** — Extract `tokens.css` (one gold ramp, one type scale, spacing rhythm, radii, shadows, duration/easing set); refit all five sections onto it without changing character; consolidate fonts to Cormorant Garamond + Outfit (+keep Playfair *or* fold into Cormorant italics — proposal at Phase B); kill dead CSS; fix `.gitignore`; junk-file cleanup.

**C1. App Showcase — new flagship section + waitlist (L)**
The product finally appears: device-framed screenshots (real phone frame, glow/tilt/parallax depth, Apple-grade composition), the 9-modes/tickets/wallet story told with the 13 real screens, DZD/CCP/Dahabia mentioned naturally, "free app" line — capped by the **waitlist email capture** (form UI now, backend marked TODO) which also replaces the footer's dead-end CTA. Proposed placement: between Vehicles and Cities (brand → people → modes → *the app* → cities → join). Footer gets real substance at the same time.

**C2. Stories tightening (L)**
Cut dead scroll (1000vh → ~600vh with no empty viewports), design real artwork for panel cards A/B, fix intro/hint overlaps, make the dock responsive + keyboard-accessible, fix mobile card/text layout, surface the 5 destinations so the other 4 stories actually get seen.

**C3. Vehicles rescue (M)**
Scroll-scrub or drag rail with visible affordance (and keep pointer-tilt as garnish); **remove the mobile scroll trap**; responsive card sizing; header collision fix; consistent treatment for the 2 photo-less modes (need founder input: do Télécabine/Navette photos exist?).

**C4. Cities truth + polish (M)**
Oran → "Coming soon" (fact fix); founder decision on Cairo/Lagos/Kinshasa/Luanda; imagery or a designed non-photo treatment for non-Algiers cards; kill dead hover buttons or wire them to the waitlist; edge-clip fixes.

**D. Motion, a11y & performance pass (M)**
Timing unification on tokens; `prefers-reduced-motion` everywhere; focus states + keyboard path; restore text selection; WebGL fallback for hero; compress `logo.png`; meta/OG tags; no-JS content fallback; 60fps verification; final zero-console sweep.

---

## Founder questions (blocking C1/C3/C4 details, not Phase B)
1. **Extra cities** (Cairo, Lagos, Kinshasa, Luanda): keep as explicit "Planned" vision cards, or cut to Algiers/Oran/Constantine?
2. **Vehicle photos**: do cutouts for Télécabine and Navette Maritime exist anywhere, or should I design a deliberate non-photo treatment for those two?
3. **Stories destinations**: OK to keep all 5 (University/Office/Clinic/Old Town/School) with tightened pacing, or trim?

**STOP — awaiting approval of this plan before Phase B.**
