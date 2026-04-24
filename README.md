# Tariq — Smart Transit · Design System

Tariq is a smart urban transit payment app for African and MENA cities: one
tap, every line, every city. The landing page and supporting surfaces are
cinematic — dark gold, serif-led, and built around purposeful motion that
reveals content rather than ornamenting it.

This design system is the single source of truth for that aesthetic. Use it
when building production code, throwaway prototypes, marketing site sections,
or presentation material on behalf of the brand.

---

## Sources

| Source | Path / URL | Notes |
|---|---|---|
| Landing-page codebase | `tariq-unified-build/` (mounted) | The actively-redesigned marketing site — hero, stories, vehicles, cities. Every color, font, animation and copy pattern in this system is extracted from here. |
| Section checkpoints | `tariq-unified-build/section{1..4}-*.html` | Approved baselines for each redesign phase. |
| Progress ledger | `tariq-unified-build/tariq_progress.json` | Phase tracker. |
| Hero shader ref | `tariq-hero-v10.html` (working) / v6 baseline | Custom GLSL scene referenced by the index.html hero. |
| Logo | `assets/logo.png` | Primary mark — 1888×843, transparent PNG. |

The codebase is read-only via File System Access. Nothing in this system
assumes the reader has that access — every value, specimen and component is
captured here.

---

## Products

Tariq is a single product across two surfaces. The design system currently
covers one; others are placeholders until source material exists.

- **Tariq landing page** (`ui_kits/tariq_site/`) — marketing site. Hero →
  Passenger Stories → Modes of Transit → Cities. Recreated here.
- **Tariq mobile app** — referenced throughout the marketing copy but no
  codebase or design context supplied. Intentionally omitted.

---

## Index

```
colors_and_type.css     Canonical tokens — colors, type, space, motion
README.md               This file
SKILL.md                Agent-invocable summary (cross-compatible with Claude Code skills)

assets/                 Logos and raw visual material
  logo.png              Primary gold mark
  logo-icon.svg         Icon-only recreation of the tariq glyph
  logo-mono-dark.svg    Monochrome mark for dark backgrounds
  logo-mono-light.svg   Monochrome mark for sand / light backgrounds

preview/                Design system cards (registered for review)
  type-*.html           Typography specimens
  color-*.html          Palette + usage cards
  space-*.html          Radii, shadows, motion
  component-*.html      Components: CTA, badges, cards, dock, NFC card
  brand-*.html          Logo, visual motifs, copy voice

ui_kits/
  tariq_site/
    README.md           Kit overview
    index.html          Interactive recreation (click-through)
    *.jsx               React components (Hero, PassengerStory, VehicleCard,
                        CityCard, NfcCard, Dock, Eyebrow, CTA, …)
```

---

## Content fundamentals

Tariq's voice is **cinematic but grounded**. Copy is short, confident, and
usually uses real people's names or times to make the abstract concrete.
It never over-explains, and it never sells. It observes.

**Tone**
- Aspirational, not promotional. "Real rides. Real people." not "The best
  transit app in Africa."
- Observational. Sentences describe what happens, not what the product does.
  "She never misses the 6:42." reads cinematically; "Our app syncs with
  schedules" would not.
- Direct. Never self-congratulatory. No marketing adjectives ("seamless",
  "revolutionary", "best-in-class").

**Grammar & casing**
- Headlines: sentence case with an **italic serif em** for emphasis.
  "Your city, *every line.*" / "We're in your city. Are you *on board?*"
- Eyebrows and labels: UPPERCASE with heavy letter-spacing (`0.28em`) and a
  leading number ("`02 — Passenger Stories`", "`03 — Modes of transit`").
- Body copy: sentence case. No Oxford comma preference either way — just
  write tight sentences.
- Times, numbers and places appear verbatim: "06:42", "Line 3", "4 minutes
  late", "22 km". Specificity is the hook.

**Pronoun stance**
- Third-person narratives for the passenger stories — Amina, Hassan,
  Fatima. The city is an ensemble of named people, not "users".
- Second-person ("you", "your city") appears only in section headlines and
  the product's promises.
- First-person plural ("we") is rare and used carefully — "We're in your
  city." Never for feature claims.

**Rhythm & length**
- Three-beat sentences land hardest: "One tap. Every line. Every city."
  "Tap once. Ride everywhere."
- Pair a declarative sentence with a poetic fragment:
  "Alert fires. 4 minutes late." / "She switches without stopping."
- Keep paragraphs under 25 words when they appear on the hero or card
  faces. Narrative paragraphs in Stories may go to 35.

**Emoji**
- None in marketing copy. The codebase uses transit emoji (🚇 🚊 🚌 🚆 🚕
  🚠 ⛴) **as placeholders** for vehicle artwork and for panel icons. Treat
  them as placeholders: replace with illustration or photography when
  available. Never use decorative emoji in headlines or buttons.

**Signature patterns**
- `"{noun}. {noun}. {noun}."` triplets.
- `"{Scene title}, {emphasised italic}."` — splits the thought across a
  line break so the italic serif drops to its own line.
- Named beats above a card title: `"06:42 — Metro Line 1"` then headline.

---

## Visual foundations

**Surfaces** — Two primary canvases. Never mix.
- **Night** (`#050403`) — hero, vehicles, stories dock. Text is white with
  graded opacity (88 / 60 / 45 / 28). Gold is the only chromatic accent.
- **Sand** (`#e8e0d0 → #1e1608`) — cities, stories intro. Text is deep
  cocoa (`#1a1206`), gold-brown accents (`#7a5020`, `#8a6840`). Uses a
  170° five-stop gradient with `background-attachment: fixed` to create a
  luminous horizon that darkens toward the page fold.

**Color**
- The palette is deliberately narrow: gold, two neutrals (night + sand),
  and three semantic statuses (live / soon / planned) used **only on city
  badges**. Never invent another accent.
- Gold ranges from `#f5e199` (hover shine) to `#5a4020` (deep border) across
  the `--gold-*` scale. Mid-gold `#c8a060` is the workhorse — strokes,
  cursor, rules, italic ems on dark.
- City cards get a color-coded NFC card (Algiers gold, Oran blue,
  Constantine violet, Cairo amber, Lagos green, Kinshasa ember,
  Luanda cobalt). These are **city identities**, not brand colors, and are
  only used inside those cards.

**Type**
- Three families, zero substitution:
  - **Cormorant Garamond** — display + section headlines. Serif with a
    strong italic cut; use 300 for hero, 600 for section H2s.
  - **Playfair Display Italic** — reserved for card-level poetic pulls
    ("She never misses the 6:42"). Lower hierarchy, purely decorative.
  - **Outfit** — UI, body, eyebrows, labels, CTAs. Weights 300–600.
- Italic ems inside headlines get a darker gold and a lighter weight (400
  italic) than the surrounding upright text — they're the rhythmic lift,
  not a decoration.

**Layout**
- Fluid `clamp()` type at every level — display type never hard-snaps.
- Vertical rhythm is generous: section heroes use `padding: 100px 0` on
  desktop and section headers are separated from content by `64px`.
- Sections are typically full-viewport (`100vh`). Transitions between
  surfaces use a 120px linear gradient bridge — never a hard cut.
- Fixed elements: the global cursor (z:99999), the dock (9999) on stories,
  the scroll hint + progress bar (500). Everything else scrolls.

**Backgrounds**
- No photography in the landing page — backgrounds are composed from:
  - WebGL horizon (hero) — pitch-black night sky with a gaussian-bumped
    horizon, anamorphic lens flare, cursor-proximity bloom.
  - Radial gradient vignettes inside cards (60–70% ellipse, warm core,
    transparent-to-dark edges).
  - Fixed sand gradient on Cities.
  - SVG rings (concentric ellipses) + silhouette (bust) on the Stories
    backdrop — pattern-as-portrait.
  - SVG fractal noise grain as an `overlay` texture at 4–6% opacity on
    card faces (see `--grad-card-overlay`).
- Gradients are always directional and narrative: `170deg` sand sky,
  `to top` card overlays, `90deg` gold rules. No default 45° gradients.

**Animation**
- **House ease**: `cubic-bezier(0.16, 1, 0.3, 1)` (GSAP `expo.out`). Used
  for every entry, every hover, every panel swap.
- Entrances: fade-up 28px over 1.4s with 0.2s staggers. Hero divider and
  CTA stagger from 0.3 → 1.0s.
- Card hovers: 0.4–0.6s label lift, image `scale(1.05)` on slower
  `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
- Interactive controls: pointer-driven 3D carousels use smooth lerp
  (`factor 0.05–0.09`) — never raw input. Scroll scenes run a dedicated
  RAF lerp loop; ScrollTrigger only feeds targets.
- Z-depth scrollytelling: each card sits at its own `translateZ` (between
  `-500px` and `-9000px`). The camera pulls toward `z = 11000` over ~78%
  of scroll. **Each card owns a scroll moment — never cluster them.**
- No bounces, no springs, no kinetic emoji. Motion is always either a
  reveal (fade / slide / blur-in) or a physical metaphor (3D camera).

**Hover states**
- Buttons: background fills to `gold-a-08`, border to `gold-100`, text to
  `gold-100`, plus a `0 0 30px` gold glow.
- Cards (city): image scales to 1.05 (0.6s), the label lifts 54px,
  description fades in, an NFC transit card tilts in from the right at
  `10deg` with a 14px drop shadow.
- Links: never underline; change color (white → `gold-100`) with a 0.3s
  transition.

**Press states**
- Subtle. No shrink, no darken. Touch events coast — on the vehicles and
  cities marquees, release velocity is preserved and decayed.

**Borders**
- Borders are almost always `1px`. Color is either `rgba(255,255,255,0.06)`
  (hairline on night) or `rgba(200,160,80,0.22)` (gold hairline).
- Focused states add a **second border via `box-shadow: 0 0 0 1px`** in
  gold-a-12, stacked on top of the existing deep shadow.

**Shadows & elevation**
- Shadows are layered, long and black. Three-tier stack:
  `0 4/8/16 6/32/36px + 14/16/40 6/20/72/80 + 40 24`.
  See `--shadow-deep` and `--shadow-focused` in `colors_and_type.css`.
- **Glows** (gold) are separate from elevation and only used on hero
  wordmark, hover CTA, and the focused vehicle card.

**Transparency & blur**
- `backdrop-filter: blur(8px)` only on city badges and floating glass
  chips. Never on large surfaces.
- Dark-on-dark overlays use 70–98% opacity over the card; light-on-sand
  uses a 180° gradient from `rgba(20,12,0,0)` → `rgba(20,12,0,0.82)`.
- Gold rules use a triple-stop linear gradient `transparent → gold-a-60 →
  transparent` to hint presence without drawing a hard line.

**Corner radii**
- CTA button: **2px** — sharp, typewritten. (Not pill — that would
  undercut the cinematic tone.)
- Small glass chips / chip indicators: 4px.
- City NFC card: 13px.
- City image card: 14px.
- Vehicle card: 16px.
- Z-card (stories): 18px.
- Story panel card: 20px.
- Badges, hover CTAs: 999px pill.

**Cards**
Two card archetypes. **Never mix archetypes.**
1. **Night card** — `#0c0a08` base, `1px solid white-a-06` hairline,
   focused state adds `gold-a-35` border + the focused shadow stack + a
   top gold rule. Uses a bottom-to-top overlay gradient to anchor text on
   any artwork.
2. **Sand card** — soft `#e8d4d4` or `#ecddd0` tint bg, carries a fully
   art-directed gradient face (radial warm core over a dark linear base),
   overlay text sits on a radial vignette at the bottom.

**The cursor**
- Replaces the system cursor on desktop: 7px gold dot with a 10px/4px
  gold glow. Turns white-hot (`#fff8d0`) over the hero, expands to 44px
  at 40% opacity over the vehicles carousel. Hidden on coarse pointers.
- This is a signature element — do not drop it in production.

---

## Iconography

Tariq currently has **no proprietary icon set** and **no icon font**.

- **Logo** — `assets/logo.png` is the only first-party brand asset. It is a
  gold compass/arrow glyph with a cometary tail. Used once, large, on the
  hero. Never repeated in nav, never inverted, never tinted.
- **Vehicle icons** — currently transit emoji (🚇 🚊 🚌 🚆 🚕 🚠 ⛴). These
  are acknowledged placeholders in the codebase. When asked for higher
  fidelity, substitute with custom single-stroke gold line drawings (1.5px
  stroke, no fill) matching the serif/thin-line register of the brand.
  Do **not** swap in heroicons, tabler, material — the stroke weight is
  wrong. If a library must be used, prefer **Lucide** thin variant at
  1.25px stroke with gold-400 color. Flag the substitution.
- **Panel icons** (🎓 💼 🏥 🔄 🎫) — emoji placeholders. Same guidance.
- **NFC glyph** — custom SVG: three stacked arcs (7/11/15px tall, 1.5px
  gold stroke, right-facing curve, 2.5px gap). Drawn inline. This is a
  *real* Tariq icon and reads as the visual shorthand for "tap to pay".
- **Chip glyph** — custom SVG: 28×20 rounded-rect with a radial gold
  gradient (`#e0c870 → #b89030 → #a07820`), horizontal pinstripes at 3px
  rhythm, vertical split line. Also real. Lives on NFC transit cards.
- **Arrow affordances** — literal unicode `↗` on hover CTAs. Unicode
  `•` for masked PAN digits (`•••• •••• •••• ••••`).
- **Star glyph** — five-point star in the hero shader + two
  `★`/`✦`-adjacent glyphs floating next to the wordmark (see logo).

Summary: **iconography is bespoke where it exists (NFC, chip, logo),
absent where it hasn't been designed yet (vehicles, panels), and never
outsourced to a general-purpose library**. When in doubt, draw a line
illustration in gold at 1.25–1.5px stroke and flag it for review.

---

## Caveats & substitutions

- **Fonts are served from Google Fonts** — Cormorant Garamond, Playfair
  Display, and Outfit all ship as exact matches. No local font files are
  needed and no substitutions have been applied.
- **Icon placeholders** — vehicle and panel icons are transit emoji in the
  source codebase. They are flagged as placeholders in this system.
- **Mobile app** — no design context exists for the native Tariq app.
  Not attempted; should be added once source material arrives.
- **Logo marks** — the `logo-icon.svg`, `logo-mono-dark.svg`, and
  `logo-mono-light.svg` in this system are my interpretations based on
  the photographic-style PNG. Treat them as stand-ins until Ayoub
  supplies vector source.

---

## Manifest

- `README.md` — this file. Read first.
- `SKILL.md` — agent-invocable wrapper (works as a Claude Code skill too).
- `colors_and_type.css` — canonical tokens. Link or inline; never override.
- `assets/logo.png` — primary mark.
- `preview/` — 26 design-system cards (type, colors, spacing, components, brand).
- `ui_kits/tariq_site/` — interactive landing-page recreation. Entry:
  `ui_kits/tariq_site/index.html`. Components: `Atoms.jsx`, `Hero.jsx`,
  `PassengerStories.jsx`, `Vehicles.jsx`, `Cities.jsx` + `site.css`.

## Agent usage

If you are Claude generating assets on behalf of Tariq: read `SKILL.md`
first, then this README, then `colors_and_type.css`. Always copy the logo
and colors — never redraw them. Prefer existing UI kit components in
`ui_kits/tariq_site/` over inventing new layouts.
