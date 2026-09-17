# DESIGN — Tariq site v2

**Design read.** A product launch site for Algerian riders and the operators who run their buses,
trams and trains. It uses an Apple product-page language on two real surfaces: the app's paper and
the terminal's slate, joined by one gold line.

## Concept: *the path*
"Tariq" means *the path*. The site's single ornament is **one gold line**, the route. It runs from the
phone to the terminal to the record, because that is literally what Tariq connects: a rider's plan, a
tap on board, and a signed record an operator can show. The line is never a map and never pretends
to show real line geometry. It appears in two places only: the ride sequence and the operator diagram (tap → signed record →
operator view). Since cycle 9 no other list borrows its dot-and-line form. Everything else is product: real app clips, real terminal renders, real terminal UI.

## Surfaces and colour (primitive → semantic)
| Primitive | Hex | Source | Semantic use |
|---|---|---|---|
| `paper` | `#F7F4EF` | sampled from the app background | rider story surface |
| `white` | `#FFFFFF` | app cards | cards, form fields on paper |
| `slate` | `#3A3E44` | measured render background | terminal and operator story surface (renders sit on it with no cut-out) |
| `graphite` | `#26282C` | darker slate, same hue | text on paper; header chip for the logo; footer |
| `gold` | `#C8A060` | app `Colors.kt` | the one accent: primary buttons (graphite text, 7:1), the route line, focus ring and select chevron on slate (gold-deep plays that role on paper and white: 4.6–5.0:1) |
| `gold-deep` | `#8A6A36` | darkened `#A6824A` to reach AA | gold text on paper (4.8:1) |
| `gold-tint` | `#EFE5D3` | gold mixed into paper | small tags and step numbers |
| `gold-ink` | `#6F5428` | darker still, added in cycle 4 | gold text on the gold tint (5.7:1; gold-deep there was only 4.0:1) |
| `ok` | `#327A43` | terminal OK screen | only in the ride sequence, for "On your way" |

Only three grounds exist: paper, slate and graphite (an alternate paper tone was removed in cycle 2), with **one
exception granted by the founder (2026-09-17): photographic grounds in the Tariq AI section on `/app`, and nowhere
else** (D-102). They are treated as grounds, not decoration: 16:9 crops never taken above native, one graphite scrim
anchored to wherever the text sits, and every text block measured against the real ground rather than judged by eye.
Renders that
sit on slate with margin (the angle view, the paper reload, the front face) use rectangular edge feathers (`.render-fade`, 12%;
`.render-fade-rect`, 5%). A radial mask was used until cycle 7 and removed: it cut the pole, which runs to the frame edge, into a
visible disc. Measured: WebP encoding moves the render background by at most 2 levels, so encoding was never the cause.
Close-up crops that are product edge to edge (the mount, the sealed bay) were tried as rounded tiles in cycle 3 and cut in
cycle 4, because at a glance they read as dark shapes, not product. Every render is capped at its native pixel size, so none is upscaled.

Rules: gold is never body text on paper. Paper and slate sections switch with a hard edge on the
same grid, the way Apple product pages cut from white to black; there are no gradients between them.
No section is "mostly empty darkness": slate is mid-grey (cream text is 9.6:1 on it) and every slate
section carries a render.

The logo's compass arc is cream and vanishes on paper. The mark is therefore always placed on a
graphite or slate ground (the header chip, the slate sections, the footer). It is never recoloured.

## Voice: the product is not about one city (D-103)
The company starts in Algerian cities and intends to expand, and the cities section already says so with its
Live / Coming soon / Planned badges. So **framing copy names no city and no currency**: "your city guide", "one
balance, every fare", "top up with your bank card", "designed for the way cities move". Capabilities are stated as
outcomes rather than widened — generalising "a wallet in dinars" into "your local currency" would promise
multi-currency support the app does not have, and `claims-check` would not catch it.

**Two things stay specific on purpose.** *Alt text* keeps describing exactly what is on a screen, place names and
fares included: the clips show "Casbah of Algiers · 40 DA", and a description that denied it would hand a
screen-reader user a different page from a sighted one. And *"Designed in Algeria"* stays — that is where the
company builds, not a limit on where it runs.

**When cutting a geographic qualifier, replace it, never delete it.** Several lines are laid out in pairs
(`ModesStrip`'s name + sub, the mode chips), and emptying half leaves a visible hole: "ETUSA and private lines"
became "public and private lines", "SNTF" became "national rail", both of similar weight.

## Type
- **Mona Sans Variable** (wght 200–900, wdth 75–125) for everything Latin. Headlines use width 112 and
  weight 620 with -0.02em tracking: wide and calm, like the tracked TARIQ wordmark on the terminal's idle
  screen and like road signage. Body copy uses width 100, weight 420, 18 px (17 px under 600 px), line-height 1.55,
  and a 62ch measure. Fares and times use tabular figures.
  *Why:* one variable family gives one type system with real range (the width axis does the display work
  that a second face would do). It is a neo-grotesk close to the app's Inter, so real app screens feel native
  on the page, but it has more character than Inter. It isn't a template default, and it isn't the old site's Cormorant + Outfit.
- **IBM Plex Sans Arabic** (400/500/600) is the Arabic companion: طريق in the lockup, the Arabic city names,
  and future AR pages. Its humanist construction and x-height match Mona Sans at weight 500, and it is built for
  long-form reading, which the RTL pages will need.
- Scale (fluid, clamp between 390 and 1440): display 44→96, h2 32→60, h3 22→30, lead 20→24,
  body 17→18, small 15, fine print 14. The required small print is 15 px, weight 480, in the surface's
  foreground colour at 85% (cycle 8), so the text that must be read is never the faintest on the page. Sentence case everywhere. **No all-caps eyebrows.** The only
  tracked caps are the TARIQ wordmark itself.

## Grid, spacing, radii
- 12 columns, content max 1240 px, side gutter `clamp(20px, 5vw, 64px)`, column gap 24 px.
- Spacing scale (4-based): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 176. Section padding
  `clamp(64px, 7.5vw, 120px)` block.
- Radii rule: controls are pills (999). Device frames use their own radius (phone 13%/6.4%). Panels
  and media are 24. Inputs, cards inside a stage (the signed record) and small tags are 12. Nothing else.

## Motion grammar
- Easing: `out` = `power3.out` (CSS `cubic-bezier(.22,.8,.2,1)`), `inOut` = `power2.inOut`, `scrub` = `none`.
- Durations: 0.2 (hover and press), 0.5 (UI state changes and the ride's stage transitions), 0.6 (reveals).
- **One reveal pattern.** Opacity 0→1 and y 16→0 at 0.6 s `out`, once, 0.06 s stagger for items entering together,
  via one IntersectionObserver + a CSS transition (cheaper than per-element ScrollTriggers; GSAP loads only where a
  signature moment lives). Content is visible without JS.
- **Three signature moments** (below). GSAP and ScrollTrigger are imported on demand, only when the ≥1024 px, motion-allowed query
  matches, so phones and reduced-motion visitors never download them. Nothing else pins. No ScrollSmoother, no scroll-jacking, no cursor
  effects, no parallax on text.
- Transforms and opacity only. Each clip is at most 5 s and plays once when it scrolls into view (D-31: WCAG 2.2.2 exempts
  motion of 5 s or less, so no control sits on the devices). Clips are observed only after the page's `load` event and
  an idle moment (D-33), so no clip video competes with the hero image. A clip's poster is a native lazy image behind the
  video, so off-screen posters never load early.
- `prefers-reduced-motion`: reveals are off, sequences render as a stacked static layout, and videos
  show their posters.

## Components (built once)
SiteHeader (graphite bar, mark + wordmark, nav, "Join the waitlist" pill always visible) · SiteFooter · button and
link-arrow styles · PhoneFrame (a play-once clip of at most 5 s with a lazy poster image, or a still) · TerminalFace (front render with
the real screens placed on the measured glass, and the printed ticket rising from the slot) · SignedRecord (an example record drawn as ticket paper: gold cap, perforation with masked side notches, a gold seal with the mark, fare as the large tabular figure;
tagged "Example") · RecordFlow (tap → signed record → operator view) · RideSequence (signature 1) · TerminalReveal
(signature 2) · ScreenFlow (click through the real screens) · ModesStrip (typographic stations on the route line) · LeadForm
(waitlist / contact: labels above, inline errors, honest success state, `FORM_ENDPOINT`) · FilmLightbox (native `<dialog>`,
film at ≤ native width).

## Page outlines (one purpose per section)
**Home `/`**
1. Hero: "Plan in the app." / "Tap on board." on two fixed lines, top-aligned, with the company line as the subline ("Tariq is the digital layer that makes public transit navigable for riders and accountable for operators.") and the small print beneath it. The product frame extends into the right gutter. App and terminal in one composed frame on a shared floor: the phone overlaps only the terminal's left bezel, never its screen. Two CTAs (waitlist, for operators).
2. The app: show the real app (a clip and a still) and three things it does, then link to /app.
3. **The ride** *(signature 1)*: plan → destination → fare → one tap → OK → ticket → signed record → operator. It ends with the full-size record card landing under an "Operator view" label, joined by the gold line (on mobile: label → line → card).
4. Modes: the ways the app plans across, named and ordered as the app names them, set as large type divided by thin gold rules on slate, forming one continuous dark chapter with the terminal section that follows (no dots; the dot-and-line form belongs to the tap-to-proof story), with one bus entry for ETUSA and private lines. There are no pictures, so the missing ferry photograph leaves no mode as the odd one out.
5. Terminal: the terminal face in use (green OK screen, printed ticket out; the angled render is kept for /terminal and /operators), play the film, then link to /terminal.
6. Waitlist with the three cities (Latin and Arabic script), plus the entry point for operators and cities.

(D-29: the separate problem-framing section was removed in cycle 4 for page length, and the ride's head, "One ride, from the
plan to the proof.", framed the story instead. **D-92 restored it**, smaller, as a block between 1 and 2: two audience
statements under "For riders" / "For operators" over a rule, closing on "A rider app, an on-board terminal, and the record
that connects them." **D-100 rewrote those two statements from problems into outcomes** — stating the reader's pain back to
them read like a pitch deck rather than a company site. The cities merged into the waitlist block in cycle 3.)

**Terminal `/terminal`**: reveal *(signature 2)* → step through a ride (click-through) → "Sealed. Secure. Built to be trusted." with
the details in three labelled groups (On its face / Inside / On the vehicle) → film → installed and maintained by Tariq → for operators.

**App `/app`**: hero clip → plan across modes → departures and map → DZD wallet → trips, receipts,
rating, complaints → notifications → **Tariq AI (signature 3: six beats, the phone constant, the city filling the section)** → English and Arabic (a native-size close-up of the app's real
search field with its Arabic placeholder) → waitlist.

**Operators `/operators`**: hero led by the angled terminal render on slate, with its small print directly beneath it (a composition used nowhere else; home owns the face + record
card) → what the records let you see and prove, with the example signed-record card beside the text → the diagram (tap → signed record → operator view) →
designed to report even when nobody boards → operator tools (designed-to language) → contact form, with the service note
("designed to be installed and maintained by Tariq") in its intro.

**404**: a short message, links to every page, and the terminal's idle screen on slate with the required small print.

## The three signature moments
1. **The ride** (home). A sticky two-column scene at ≥ 1024 px: in the plan state the phone stands alone, centred,
   playing the route-results clip (the terminal is fully hidden). From step 2 the phone steps out and the terminal face swaps
   its real screens (dest → tap → ok) while a ticket rises from the printer slot. One framing system across all six states. Then the terminal steps back and the full-size signed-record card lands under an
   "Operator view" label, joined to it by the gold line; the label fades out as soon as the stage starts to unstick, so it never slides under the header. The approved film lines change in step. Below 1024 px and with reduced motion, it becomes
   a stacked list of the same frames, with the same order and copy. In the staged view every step keeps its body line;
   inactive steps are muted (ink-muted, 6.6:1) and the active step is in full ink (colour only, so no layout shift). A step takes the stage when its
   top reaches 62% of the viewport, and the last step has 48vh of bottom padding, so the operator state holds for about 300 px of scroll.
2. **The terminal reveal** (/terminal). A pinned slate stage crossfades the three strongest renders (angle → front face →
   paper reload) while the approved lines step through. It is scrubbed, with no snap: the page never moves on its own.
3. **Tariq AI** (/app), added by founder decision (D-102). Six beats on one pinned stage: the ground, the phone's screen
   and the line are crossfaded by a single scrubbed timeline, so the place filling the section and the place on the phone
   change on the same scroll pixel — two triggers would drift, one timeline cannot. The photographs (Jardin d'Essai,
   Maqam Echahid, the Casbah) are the same assets the app's own knowledge base serves, which is what makes the doubling
   honest; beats 1, 2 and 6 stay on graphite, because no rush-hour photograph exists and none was invented. Below
   1024 px, with reduced motion, or without JS it becomes a horizontal scroll-snap strip — one card per beat, no pin —
   which keeps the section about one card tall instead of six screens long.

## Don't repeat (audit of `../index.html`, 9 council cycles + one-site run)
1. A near-black night sky, stars and horizon glows as the backdrop for everything, with 12–14 px gold text on black.
2. Consumer-only story: no terminal, no operator.
3. A serif display with an italic gold accent word in every headline ("Real rides. *Real people.*").
4. Tracked all-caps eyebrow with twin rules above every section.
5. House and clock icon illustrations standing in for product; CSS-built phone mockups.
6. 175 KB of JS/CSS for scroll choreography: three pinned stories, a 3-D rail, a custom cursor.
7. Claims: "nine modes", "Algiers live today", a Cairo card, an AI-generated city photo with a Gemini mark.
8. City cards with "coming soon" status pills.
9. Horizontal overflow that was masked by `overflow-x: hidden`.
10. Self-graded PASS scorecards. Here, an independent critic scores the work.

## Hero decision
Two directions were built as `/lab/hero-a` ("The stage": the product on the slate stage, with the phone overlapping the
terminal) and `/lab/hero-b` ("Two surfaces": a paper page and a split window of app and terminal, with a ticket across the
seam). Screenshots at 1440 and 390 went to a fresh critic along with the brief. **The critic picked A.** A shows the headline, both products and both CTAs in the first
1440×900 viewport. The terminal's real screen explains the product before you read anything, and it keeps one composed
frame at 390. The critic's changes, applied: the phone now overlaps only the terminal's left bezel (on mobile, it sits below the tap
ring), so the screen is never covered. The phone plays the home clip rather than the mostly-blue map. The copy column is wider, so the
headline sits on three lines. The page turns to paper right after the hero. Taken from B: the angled terminal-on-pole render,
used for the home terminal section. **Not taken:** "warm the grey". The renders are baked onto `#3A3E44`, so any other
stage colour shows a rectangle. "Pull the ticket out to overlap the phone" was also not taken: it would detach the ticket from the printer slot it
physically leaves.

## Form controls (round 2)
Inputs are boxed, with a boundary of at least 3:1 (`--field-border` #86888c on light, cream at 55% on slate). Focus is a 1 px accent ring plus a 5 px gold halo
(`--focus`, `--focus-halo`; gold-deep on light surfaces, gold on slate and graphite). Selects are wrapped in `.select` with a masked chevron in the same accent.
The note "This form doesn't send anything yet" stays visible before submit while `FORM_ENDPOINT` is empty.

## Terminal screen after the tap (round 2)
The green success screen appears only where it is the step (ride step 4, /terminal's step-through). Anywhere else after a tap, the terminal is back on idle
with the printed ticket still out: in the ride's record and operator states and in the home teaser.

## Step-through and page close (round 3)
/terminal's step-through is a click-through, and it says so: a "Step n of 5 · label" counter and a five-segment gold rail above the chips; at ≤ 560 px the chips are five
equal number buttons in one row, with labels kept for screen readers. Home closes with one filled button (the waitlist); the terminal teaser offers only the film, and
the operators aside uses a text link.

## Buttons and the 404 (round 4)
Solid gold pills are reserved for real calls to action (the waitlist, "Send message"). In-component navigation such as the step-through's "Next step →" uses the
outline `.btn` with an arrow. The 404 is one composed frame on desktop (≥ 900 px): message and page links on the left (7fr), the idle terminal face in its slate panel
with the small print on the right (5fr, up to 460 px), vertically centred. It stacks below 900 px.


## Cities section (Phase 1 direction, cities prompt)
**Design read:** home-page conversion section for riders in Algiers, Oran and Constantine, in the site's premium-consumer "commercial ad" language, built in native CSS
inside the existing token system. Dials: variance 7, motion 6, density 3.

**Concept: the window seat.** Each city is what you see from your seat. A slide is a window of a real kind of vehicle, with the city's landmark outside:
Maqam Echahid through a bus window (pillar, sliding pane, stanchion, seat back), Santa Cruz through a tram window (wide glass, mullion, handrail, the overhead
wire crossing the sky), and the Sidi M'Cid bridge through a cable-car cabin (curved glass, three panes, another cabin on the cable). The frame is the product's world (transit),
and the landmark is the city's. **The one bold thing is the window;** everything around it stays quiet (paper surface, the site's type, gold only on the pass and the stops).

**Plan review against the brief (frontend-design second pass).** The default for this brief is a card carousel: rounded photo cards, dots, overlay pills ("Live"),
a hover button. Changed: the dots become city-name stop buttons (the position indicator carries the city name, not "1/3"); no pill or label sits on an image; the
card-with-hover-button becomes a pass that is handed out; slide motion carries meaning (near objects pass faster than the landmark, as from a moving vehicle).

**Imagery (rung 3).** SVG worlds at 1600×900 in layers: sky gradient in the city tint, a sun or haze glow, far (sea or plateau), mid (hill or cliff plus landmark
silhouette), near (lamp post, overhead wire, cable). The vehicle frame is a separate layer, so variant B can hold it still. Palette per city: dusk amber
`--city-algiers`, sea teal `--city-oran`, stone rose `--city-constantine`, used as light, never as text. A real photo per city replaces the world through
`CITY_SCENES[].photo`. The section's small print says the scenes are illustrations.

**The Tariq pass.** ISO ratio 1.586 (the front is the minimum height), graphite body, a city-tint light leak from the top-left, a gold hairline border, the mark
plus wordmark, the label "Waitlist pass", the city in English with Arabic below in gold, three gold tap arcs (the terminal ring), and a primary "Join the waitlist" button. No
number, chip, bank or scheme mark. The back holds `LeadForm variant="pass"` (email only; the city comes from the slide), a "Back" control and the honest note.
Success stamps a gold ring on the back: "On the list" when sent, "Preview" while `FORM_ENDPOINT` is empty (nothing was sent, and the status says so).

**Motion beats** (grammar: `out` = `power3.out`, 0.2 / 0.5 / 0.6 s):
1. City change: the pass is handed out again (WAAPI on `.cpass`: y 28 → 0, rotate −9° → −3°, opacity 0 → 1, 0.6 s `out`). Reduced motion: opacity only, 0.3 s, no tilt.
2. Choosing "Join the waitlist" flips the pass (rotateY 180°, 0.7 s `out`) and focus moves to the email field. Reduced motion: faces cross-fade.
3. Travel parallax: while a slide moves across the track, the near layer shifts ±160 user units and the mid layer ±50 (CSS scroll-driven `view(inline)`,
   transform only, off under reduced motion or without support).
4. Drag: GSAP Draggable (`scrollLeft`, inertia, snap to slides) loads only at ≥ 1024 px with a fine pointer and motion allowed, when the section is near. Touch uses
   native scroll-snap swipes. No autoplay, ever.

**Two lab variants** (same data, component and script): **A · Carriage**, a row of windows along the vehicle side with the next window peeking in and the pass
overlapping the active window's lower edge from below; **B · One seat**, one fixed window frame (it cross-fades between vehicle types), the world sliding behind
the glass, cities as stops on a gold line at the left, and the pass rising over the frame's bottom edge.

**Mobile (≤ 767 px).** One window at a time at full width (16:9, so the frame device stays whole), stops as a three-button row, 48 px arrow buttons, and the pass below
at full width with no tilt. The track scrolls inside its own clipped container; the document never scrolls sideways.

**A11y semantics.** The section is `aria-roledescription="carousel"` labelled by its heading. Each slide is `role="group"` with `aria-roledescription="slide"` and
"Oran, 2 of 3". Stops are native buttons with `aria-pressed`, and prev/next are named buttons that are disabled at the ends. The track is focusable, arrow keys and Home/End move
between cities, and a polite live region announces changes after the first user action. The pass faces use `inert` so only the visible face is in the tab order.

**Shipped variant (D-64): B · One seat.** On desktop, the left column holds "Pick your city." with its lead and the three stops on a gold line (the active stop's dot filled). The right column holds the
16:9 window (the world slides, and the frame cross-fades between bus, tram and cable car), the caption below it, and the pass overlapping the window's lower-right edge. The controls row below holds the arrows, the
illustration note and the operators link. On mobile everything stacks: heading, three equal stop cells (English over Arabic), window, caption, full-width pass and controls.

> **Superseded (founder, cities course correction):** the "window seat" slider above (D-53 to D-66) is replaced by a marquee adapted from the founder's reference
> `~/Downloads/tariq website/community-section (10).html`. The new direction is written in "Cities marquee" below once built.

## Cities marquee (shipped; the founder's reference projected into the site, D-88)
**Source:** `~/Downloads/tariq website/community-section (10).html`. Its content and interaction are kept; its look is re-expressed in this system (Mona Sans instead of Cormorant,
`--r-sm` radius, the gold primary pill, gold focus rings, the site's grain and top-right light). **Content:** the reference's seven cities (Algiers, Oran, Constantine, Cairo, Lagos,
Kinshasa, Luanda) with its badges (Algiers Live, Oran and Constantine Coming soon, the rest Planned), all founder decisions; data lives in `CITY_SCENES` / `CITY_STATUS` (`src/config.ts`).
**Ground:** warm cream to dark, two layers: a top ramp in px (the heading always sits on cream) and a bottom layer that always ends on `--c-graphite`, so the section runs into the
footer with no seam at any height. **Header:** eyebrow "Your city, your card" with side rules; "We’re in your city." / gold "Are you on board?"; "Tap once. Ride everywhere."
**Card (320×210; 272 wide on phones):** city tint, or the city's image when it has one (Algiers: an illustration, cropped to the card at 920×604 and served at 320/480/640/900 w WebP, lazy, with the tint behind it while it loads and a light top shade so the badge stays readable), bottom scrim, badge top-right (Live green, Coming soon gold, Planned neutral; uppercase, 11 px, blurred glass),
city name, modes line ("Bus · Tram"). No Arabic on the tile; Arabic stays on the large pass. **Open state** (hover, keyboard focus, or a first tap on touch): image 1.05; label rises 58 px and the
description expands (max 188 px wide, 3 lines); the action pill appears ("Join the waitlist" / "Notify me" / "Stay tuned" per status, 44 px); the `TransitCard` (136 px; 108 on phones)
springs out past the right edge, rotated 10°, and the open card is lifted above its neighbour. `.shots/tools/cards-layout.mjs` guards this geometry for every card at 1440 and 390 px.
**TransitCard:** 1.586, the city's `pass` gradient and `accent`, grain, light leak, accent line, NFC arcs, big initial, footer with the city and the Tariq mark. No chip and no number.
**Motion (D-89):** idle drift at 0.55 px/frame. The pointer steers it like the reference: a centre zone (±22 % of the half-width) holds the strip so a card can be picked; outside it, speed rises with the square of the distance to 7 px/frame at the edge, in the pointer's direction, and crossing reverses smoothly. Hover alone doesn't stop it; keyboard focus, an open panel and off-screen do. No controls row (no Pause, no "Talk to us"; operators are in the header). Loop copies are live (hover and click work) but aria-hidden and out of the tab order. Fine pointer plus motion
allowed only; touch and reduced motion get a native snap strip.
**Sign-up panel:** a graphite panel under the strip, tinted with the city's accent, showing that city's large card (−4°), a title per status ("Stay tuned for Lagos") and a one-field form;
"Choose another city", × or Escape closes it and returns focus to the card's action.

