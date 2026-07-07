# COUNCIL LOG — design council redesign loop
Protocol: COUNCIL_PROTOCOL.md · Branch: council-redesign · Started 2026-07-06

(Entries appended per cycle. The /goal condition is a latest entry containing
"VERDICT: SHIP".)

---

## Cycle 1 — 2026-07-06

### Council reports (sweep: screenshots/council-1, 23 frames/viewport)

**Critic A — Brand Director (opus):**
- [HIGH] Cities section inverts palette to daylight cream — night scene shatters mid-page.
- [HIGH] Gold-monochrome promise fractures into per-section/per-card rainbow (blue stories glow, jewel-tone vehicle & city cards).
- [MED] Mixed media languages (photo cutouts vs vector-glow illustrations) in one card system.
- [MED] Modes of Transit carousel reads empty/under-built — lonely card in a void.

**Critic B — Continuity Director (sonnet):**
- [HIGH] Cities opens on inverted light backdrop — literal seam slab, light-temperature inversion (frames 020–021).
- [HIGH] The App punches light-mode UI screenshots into the night scene (frames 013–019).
- [MED] Four unrelated "show-a-module" grammars stacked back to back (Stories/Transit/App/Cities each invent their own card system).
- [MED] Transit carries a one-off HUD apparatus (ghost words, 0x/09 counter, caption) echoed nowhere else.

**Critic C — Cold Eyes (opus):**
- [HIGH] Modes of Transit is dead air — 7+ screens of near-black void, one small card at a time; attention flatlines.
- [HIGH] Cities breaks the all-night spell right before the ask (both viewports).
- [MED] Two numbering systems collide ("05 · TOP UP" vs "05 — CITIES", identical styling).
- [MED] Redundant double waitlist close dilutes the finish.
- [MED] Mid-scroll transition states read broken (frame 002 overlap; 016/018 half-ghosted headlines).

### Ruling — chosen moves
1. **ONE NIGHT** (A-HIGH×2 + B-HIGH×2 + C-HIGH): kill every light inversion and bind color to the gold ramp — rebuild Cities on the #050403 night base, dark-grade the app phone screens, convert all jewel-tone card glows to gold-ramp variants.
2. **TRANSIT PRESENCE** (C-HIGH + A-MED): rebuild Modes of Transit from a 7-screen void into a tight, populated composition; cut its scroll cost by ~2/3 and give the lineup real presence.

Deferred to next cycle: card-grammar unification, HUD one-off, numbering collision, double waitlist, mid-scroll scrub states.

### Built
1. **ONE NIGHT** — Cities rebuilt on the #050403 night base (gold horizon bloom instead
   of the cream inversion; header type back on dark-surface tokens; city cards, NFC
   mini-cards and status badges rebound to the gold ramp — differentiation by warmth/
   intensity, not hue). App→Cities and Cities→Footer seams now hold night. App phone
   screens night-graded (warm sepia grade + edge vignette) so the light-mode captures
   read as glowing devices. Stories: all 5 destination accents moved onto the gold ramp
   (#c9921a / #d4820a / #e8c96a / #c8a060 / #b08048), cool panel backgrounds warmed, and
   a gold grade layer (sepia filter) binds every scene/panel art to the brand family.
   Vehicle cards: all 9 jewel-tone glows/backdrops replaced with gold-ramp variants.
2. **TRANSIT PRESENCE** — Modes of Transit pin cut from +380% to +170% scroll
   (page: 17048px → 15068px); gentler scale/alpha falloff + tighter rail spacing put
   ~3 cards co-present in frame; a gold guide rail anchors the diagonal composition.

### Verify
- Full re-sweep: screenshots/council-1-post (desktop 20 frames, mobile 21).
- Console errors: 0 desktop, 0 mobile (full-page scripted scroll on both viewports).
- Mobile parity: cities night rebuild, gold stories grade and app screen grade all
  reproduce on 390px; no layout breaks observed.

### Grades (chair, post-build)
composition B · continuity B+ · value B · mobile B+

### Verdict
Both macro moves landed; the two unanimous HIGHs (light inversions) are gone and the
color system is one gold family end to end. Deferred MEDIUMs remain (card grammars,
transit HUD one-off, numbering collision, double waitlist, mid-scroll scrub states)
and the post-fix state has not yet faced a fresh council.

VERDICT: ITERATE

---

## Cycle 1 — FOUNDER OVERRIDE (2026-07-06)

The founder reviewed the council-1 build and rejected the color ruling: the
multi-color accent system (per-story, per-mode, per-city hues) is intentional
brand language — it expresses the diversity of people, emotions, and cities
Tariq serves, and it read as premium. Collapsing everything into black+gold
was a WRONG council decision.

Reverted: stories destination accents (red/amber/blue/green/purple restored),
stories gold grade filters removed, vehicle card hues restored, city card /
NFC mini-card / badge colors restored.
Kept (not objected to): Cities on the night backdrop instead of the cream
inversion, night-holding seams, app screen night grade, transit pin cut +
co-presence + gold rail.

Protocol amended: new MUST NOT in the freedom charter — no future council may
de-color the site; color-reduction findings are invalid. Critic charters will
carry this directive from cycle 2 on.

---

## Cycle 2 — 2026-07-06

### Council reports (sweep: screenshots/council-2; charters carry the founder color directive)

**Critic A — Brand Director (opus):**
- [HIGH] Cities proof-section is mostly empty placeholder cards — only Algiers has real imagery; 5 cities are hollow gradients.
- [HIGH] The emotional Stories section uses the cheapest-looking visuals on the page (wireframe vector sketches) while Transit/App look premium.
- [MED] The close fires twice (waitlist before Cities, repeat CTA in footer).
- [MED] Stories under-filled and over-long (thin band + empty lower half, 5 pinned steps for one persona).
- [MED] Stories persona toolbar reads as bolted-on app chrome in an editorial page.

**Critic B — Continuity Director (sonnet):**
- [HIGH] Transit carousel mixes finished photography with two bare icon-only cards (Navette, Télécabine) — one component, two finish levels.
- [HIGH] Inconsistent connective grammar: Stories→Modes gets a hard gold rule; every other boundary cross-fades.
- [MED] One-off giant watermark words ("Modes"/"Transit") used in exactly one chapter.
- [MED] Mobile Ride phone balloons near-full-bleed with a bright map — one light-temperature spike.

**Critic C — Cold Eyes (opus):**
- [HIGH] Stories too long, same beat repeated (~6 screens, Pivot shown 3 near-identical times) — attention dies.
- [HIGH] Signup asked before the footprint is shown, then an identical second ask closes the page; Cities orphaned between two endings.
- [HIGH] Transit reads near-empty; off-focus cards nearly invisible (worst mobile) so "all nine modes" never lands.
- [MED] Hero sells mood but never states the proposition.

### Ruling — chosen moves
1. **ONE CLOSE** (C-HIGH + A-MED + C-MED): reorder App → Cities → Waitlist → Footer; waitlist becomes the single conversion moment, footer demoted to outro; add one concrete proposition line at the hero.
2. **STORIES TIGHTEN** (C-HIGH + A-MED): remove the two post-travel panels that reprise beats 4–5 (the tripled Pivot), shorten the pinned scroll accordingly.
3. **ONE GRAMMAR + TRANSIT PRESENCE II** (B-HIGH + C-HIGH): delete the one-off gold hairline at Stories→Modes so every boundary shares the fade grammar; raise off-focus transit card alpha/scale so the 9-mode lineup registers, desktop and mobile.

Deferred to cycle 3 (art-direction effort): city-card imagery richness (A-HIGH), story illustration upgrade (A-HIGH), watermark motif decision, dock chrome restyle, Ride mobile vignette.

### Built
1. **ONE CLOSE** — the waitlist band moved out of #s-app into a standalone
   #s-close section AFTER Cities: the arc is now hero → stories → modes → app →
   cities (proof) → one conversion moment → footer outro. The footer's duplicate
   "Join the waitlist" button removed; footer is a sign-off, not a second ask.
   Hero gained one concrete proposition line ("Nine modes of transit in Algiers —
   plan, ride and pay in one free app" — facts from the frozen meta copy).
2. **STORIES TIGHTEN** — the two post-travel panels (which reprised beats 4–5's
   art and message, C's "Pivot shown three times") retired via CONFIG windows;
   Z-travel now spans the whole scroll (Z_END .78→.94) and the wrapper shrank
   640vh→440vh. Each beat appears exactly once.
3. **ONE GRAMMAR + TRANSIT PRESENCE II** — the one-off gold hairline sweep at
   Stories→Modes removed (CSS+JS); every boundary now shares the fade-through-
   night grammar. Transit falloffs relaxed again (scale exp -0.42d², alpha
   1−.34|d|): 4 cards co-present on desktop AND mobile, lineup finally reads.
   Page: 15068px → 13331px (desktop).

### Verify
- Full re-sweep: screenshots/council-2-post (18 frames per viewport).
- Console errors: 0 desktop, 0 mobile (scripted full-page scroll).
- Checked: hero prop line renders; cities (colors intact per founder directive)
  precedes the single close; footer has no CTA; transit shows 4 cards both
  viewports; stories ends without panel reprises.

### Grades (chair, post-build)
composition B+ · continuity B+ · value B · mobile B+

### Verdict
Narrative arc and connective grammar are fixed; transit finally shows its
breadth. Remaining for cycle 3: the two art-quality HIGHs (5 placeholder city
cards, wireframe story art), watermark motif decision, dock chrome, Ride
mobile vignette — and a fresh council on the post-fix state.

VERDICT: ITERATE

---

## Cycle 3 — 2026-07-06

### Council reports (sweep: screenshots/council-3; first convening aborted by API session limit, re-convened successfully)

**Critic A — Brand Director (opus):**
- [HIGH] The app is sold on empty-state screens ("No trips yet", "0 DA", no departures) — flagship proof reads as an unfinished demo.
- [HIGH] Stories section mostly void — sparse small cards in an enormous dark canvas; restraint tipped into under-built.
- [MED] Only Algiers looks real; other city cards are flat gradient placeholders (color variety is right — depth/texture is missing).
- [MED] Flanking app phones dimmed into murky smudges.

**Critic B — Continuity Director (sonnet):**
- [HIGH] App screens ignite to raw daylight white at scroll focus — five times in a row — despite the at-rest night grade.
- [MED] App step counter uses "NN · LABEL" while the whole page uses "NN — LABEL".
- [MED] App section drops the page's orbit-ring/connector motif — reads as a separate module.

**Critic C — Cold Eyes (opus):**
- [HIGH] ~2 viewports of dead void between the last story and transit intro — exactly where a cold visitor leaves.
- [HIGH] Pinned "Pick a story" selector reads as leftover/broken app UI; desktop story body copy nearly invisible.
- [MED] App undersells the product (dim props + empty lead screen).
- [MED] Three consecutive big gold closers (cities → waitlist → footer) after the hero already said the same line.
- [MED] Mobile transit cards overlap into a cluttered pile.

### Ruling — chosen moves
1. **APP ALIVE** (A-HIGH + B-HIGH + C-MED + A-MED + B-MED×2): permanent night-tint layer over screen content independent of focus opacity; swap empty-state screenshots for populated ones; raise ghost-phone presence; make the ring motif visible in the app backdrop; unify step labels to "NN — LABEL".
2. **STORIES STAGE** (A-HIGH + C-HIGH): collapse the post-travel void (shorter wrapper + later Z_END), larger scene presence, editorial framing + affordance for the story picker, desktop caption contrast to mobile's level.
3. **QUIET OUTRO + MOBILE RAIL** (C-MED×2): footer demoted to a typographic whisper (waitlist is the one loud close); mobile transit spacing/falloff tuned so modes read cleanly.

Deferred: city-card depth treatment (A-MED; needs dedicated art direction cycle).

### Built
1. **APP ALIVE** — chapters remapped to the strongest real screens: Plan now shows
   the populated Algiers map (search bar + mode chips), Ride shows live trip
   alerts, Pay keeps the dark-mode wallet; the fifth chapter (a duplicate of the
   wallet screen) is cut — which also removes the "05 · TOP UP"/"05 — CITIES"
   numbering collision. Ghost props are now the dark branded splash + profile
   screens, lifted from smudge to deliberate staging (opacity .34→.52,
   brightness .6→.78). Screen content carries a permanent night tint +
   stronger vignette independent of focus opacity (no more daylight flash).
   Backdrop ring motif raised to visible. Step labels unified to "NN — LABEL".
   App pin: 420vh → 340vh.
2. **STORIES STAGE** — wrapper 440vh → 360vh with Z_END .94 → .97: the
   post-travel void is gone. Scene cards scaled 1.22 → 1.32; desktop caption
   body raised to .74 white (mobile-level legibility); the picker hint became
   an editorial serif line ("Five riders — tap one, follow their day").
3. **QUIET OUTRO + MOBILE RAIL** — footer demoted to a whisper (~28px muted
   head, 38vh, dimmed gold em) so the waitlist is the single loud close;
   narrow viewports get their own rail tuning (steeper falloff + wider
   spacing) so modes pass cleanly instead of piling.
   Page: 13331px → 11693px (desktop).

### Verify
- Full re-sweep: screenshots/council-3-post (16 frames per viewport).
- Console errors: 0 desktop, 0 mobile (scripted full-page scroll).
- Checked: app chapter trio reads as staged cluster (dark splash/profile
  props, graded focus screen, visible rings); mobile transit shows clean
  card separation; stories captions legible; ~1 transient inter-beat frame
  remains as travel grammar (was 2 static void screens).

### Grades (chair, post-build)
composition A- · continuity B+ · value B+ · mobile A-

### Verdict
All five HIGHs addressed. Remaining known MEDIUM: city-card depth treatment
(needs an art-direction pass). SHIP requires a fresh council returning
NO MACRO OFFENSE on this state.

VERDICT: ITERATE

---

## Cycle 4 — 2026-07-07

### Council reports (sweep: screenshots/council-4)

**Critic A — Brand Director (opus):** hero/transit/app/cities/footer now read premium; the break is Stories.
- [HIGH] Stories is the emptiest, most template-like moment — idle state is headline + chips + ghost silhouette in a void; delivers nothing until a visitor guesses to tap.
- [MED] Story beats render dim/low-contrast with overlapping cross-fade panels.
- [MED] Flanking prop phones read as static reused filler, not staging.

**Critic B — Continuity Director (sonnet):** reel otherwise holds as one scene — single stitch:
- [HIGH] Light-source phone captures (home, map, notifications) still read daylight-bright against the night frame while splash/wallet sit correctly; grade must be source-aware.

**Critic C — Cold Eyes (opus):**
- [HIGH] Stories has blank dead-scroll zones early on the critical path (frame lands on empty black + picker chrome) — highest bounce risk on the page.
- [MED] "One tap. Every line. Every city." family repeats ~4×; mid-page repeats read as padding.
- [MED] Desktop app opener lands flat — flanking phones dimmed to black rectangles.

### Ruling — chosen moves
1. **STORIES ALWAYS-ON** (A-HIGH + C-HIGH + A-MED): widen beat visibility windows and advance the presence curve so every scroll position holds a visible story beat, including under the intro.
2. **SCREEN REGISTER** (B-HIGH + C-MED + A-MED): source-aware night grade — heavier tint on light captures (home/map/notifications); flanking phones brighter but softly blurred = deliberate depth-of-field staging, not filler.
3. **SECTION-TRUE SUBLINES** (C-MED): keep the hero↔footer slogan bookend; replace the Modes and Cities repeats with section-specific factual lines.

### Built
1. **STORIES ALWAYS-ON** — beat visibility rebuilt so no scroll position is ever
   empty: APPROACH 3200→4200px (mobile 2000→3400), EXIT 900→1200px (mobile
   700→1000), presence curve power1.inOut→sine.out (early presence), intro gate
   floored at .35 so beat 1 glows behind the intro from the first pixel, camera
   travel now ENDS ON the final beat and holds it (CAM_MAX 11000→9000 — the
   empty post-arrival tail is gone), glide drift 240→180px to soften caption
   collisions.
2. **SCREEN REGISTER** — source-aware night grade: light-mode captures
   (home/map/notifications) get a heavier tint (brightness .48/sepia .44) so
   every screen sits at splash/wallet's low-light level; flanking prop phones
   raised (opacity .62, brightness .88) and softly blurred (2.5px) — deliberate
   depth of field, not reused filler.
3. **SECTION-TRUE SUBLINES** — mid-page slogan repeats replaced: Modes now says
   "Nine modes. One network. One app.", Cities says "Algiers live today — more
   cities on the way"; the hero↔footer bookend stands alone.

### Verify
- Full re-sweep: screenshots/council-4-post (16 frames per viewport).
- Console errors: 0 desktop, 0 mobile (scripted full-page scroll, re-run after
  the camera change).
- Checked: former void frames now hold beats (intro shows beat 1; the tail
  holds "The Arrival"); app home screen graded to cream (no daylight flash);
  ghost phones read as staged DoF props.

### Grades (chair, post-build)
composition A- · continuity A- · value A- · mobile A-

### Verdict
All cycle-4 HIGHs and MEDIUMs addressed; every known macro offense from four
councils is now fixed. SHIP requires a fresh council returning NO MACRO
OFFENSE in the same cycle — convening cycle 5 on this state.

VERDICT: ITERATE

---

## Cycle 5 — 2026-07-07 (SHIP test)

### Council reports (sweep: screenshots/council-5) — NOT SHIP

**Critic A — Brand Director (opus):** hero/transit/cities premium.
- [HIGH] Stories renders as a collapsed collision: intro composited over beat 1 + cards + silhouette — the "believe" beat reads broken.
- [MED] The conversion finale deflates: small form + ghost button in a near-black void.
- [MED] Télécabine & Navette are flat line-icon cards beside 7 photographic ones (3rd cycle flagged).

**Critic B — Continuity Director (sonnet):**
- [HIGH] Story-beat text collision at the pinned transition — two beats legible-fighting simultaneously (motion-grammar break).
- [MED] Hero's starfield texture vanishes after Stories — night sky absent for ~70% of the reel (absence-based stitch).

**Critic C — Cold Eyes (opus):**
- [HIGH] Stories reads broken/cluttered mid-scroll — intro over beat 1, tiny text stacked on headings.
- [MED] Emotional narrative before comprehension; picker pills don't read as controls.

Chair's note: cycle 4's "always-on" windows (sine.out + wide APPROACH + intro floor
.35) overcorrected the void into co-visibility. The three HIGHs are one defect.

### Ruling — chosen moves
1. **ONE BEAT ON STAGE** (A/B/C-HIGH + C-MED): rebuild beat grammar — intro alone at rest
   (silhouette removed), snappy intro exit, then strict handoffs (APPROACH 2600/2200px,
   EXIT 900/800px, pow-1.5 presence curve) so one beat dominates every position with a
   brief crossfade dip, never a pile, never a void; intro sub becomes a concrete
   comprehension line; picker pills get visible control affordance.
2. **FINALE WEIGHT + MODE PARITY** (A-MED×2): gold-filled primary CTA + composed closing
   scene (rings/glow, tighter void); elevate the two typographic mode cards into
   deliberate layered art (glow glyph, ring field, grain) at the photo cards' value level.
3. **PERSISTENT NIGHT SKY** (B-MED): a faint shared starfield layer carried through
   Modes, App, Cities, Close, and Footer.

### Built
1. **ONE BEAT ON STAGE** — beat grammar rebuilt: APPROACH 4200→2600px (mobile
   2200), EXIT 1200→900px (mobile 800), presence curve pow(t,1.5); intro gate
   back to 0 with a fast ramp (alone at rest, beats enter the moment it exits);
   silhouette removed; picker pills carry a visible ring + fill (controls, not
   icons); intro sub is now the comprehension line "Tariq plans the route,
   guides the ride live, and pays the fare. Here is what that feels like."
   Verified: one beat fully legible per position, next beat only a faint depth
   echo; rest state is the intro alone.
2. **FINALE WEIGHT + MODE PARITY** — the waitlist button is now a gold-filled
   primary (gradient fill, dark text, bloom) — the heaviest element on the
   page; #s-close gained a returning gold horizon + orbit arc; padding
   tightened. Télécabine/Navette rebuilt as lit gold emblems over ring fields
   with a horizon line on their own color grades — designed art, not missing
   images.
3. **PERSISTENT NIGHT SKY** — a --starfield token (sparse white+gold 420px SVG
   tile) layered into Modes, App, Close, Cities, and Footer; the hero's sky now
   runs the full reel.

### Verify
- Full re-sweep: screenshots/council-5-post; console errors: 0/0.
- Checked: no text collisions at former frame-002; intro clean at rest; gold
  CTA reads as the conversion moment; typo mode cards read premium; stars
  visible through all sections.

### Grades (chair, post-build)
composition A- · continuity A- · value A- · mobile A-

### Verdict
The unanimous stories HIGH and all MEDIUMs are addressed. Cycle 6 convenes a
fresh council (SHIP test) on this state.

VERDICT: ITERATE

---

## Cycle 6 — 2026-07-07 (SHIP test #2)

### Council reports (sweep: screenshots/council-6) — NOT SHIP

**Critic A — Brand Director (opus):** site holds strongly at macro level, but:
- [HIGH] Navette Maritime & Télécabine read as flat line-icon placeholders inside a photographic carousel (4th cycle flagged).
- [MED] App reveal promises "real screens" but flanking phones are near-black at entry; payoff arrives frames later.
- [MED] Connective intro beats (Stories, App) are thin text islands in empty black.

**Critic B — Continuity Director (sonnet):** everything holds except one stitch:
- [HIGH] Light-mode captures (Home/Map) puncture the night scene on MOBILE where the mockup nears full-bleed; splash/notifications/wallet sit correctly.

**Critic C — Cold Eyes (opus):** hero/vehicles/cities/waitlist confident; 4 MEDs:
- [MED] Rider selector illegible to a passive visitor — unlabeled icons, rider never named.
- [MED] Desktop app-proof hides the product in near-darkness (mirrors A-MED).
- [MED] Near-empty black viewport between hero and stories reads as dead air.
- [MED, low-confidence] Pivot headline may overlap the card (likely a transition frame — verify settled state).

### Ruling — chosen moves
1. **MODE ART TIER** (A-HIGH): author cinematic layered SVG night-scene art for
   Navette Maritime (moonlit harbor ferry) and Télécabine (cable cabin over the
   heights) in their own accent hues — full-card scenes at the photographic
   cards' production tier, replacing the emblem treatment.
2. **PRODUCT IN THE LIGHT** (B-HIGH + A-MED + C-MED): verify/fix the mobile
   light-capture grade; raise desktop intro phone luminance so a legible screen
   anchors "real screens" at entry.
3. **CONNECTIVE PRESENCE** (A-MED + C-MED×2): name the riders (picker labels +
   beat eyebrows), anchor the intro beats with a light form, tighten the
   hero→stories dead air.

### Built
1. **MODE ART TIER** — authored cinematic layered SVG night scenes for the two
   modes without photography: Navette Maritime (moonlit harbor, lit ferry
   windows, sea glints, quay lights) and Télécabine (cable spanning the frame,
   lit cabin + distant second cabin, hillside homes, mist) — full-card scenes
   in each mode's own hue at the photo cards' production tier. (Fixed a ph
   scoping regression this introduced — caught by the console check, 7 errors
   → 0.)
2. **PRODUCT IN THE LIGHT** — mobile: deeper night register for light captures
   at near-full-bleed (brightness .4, sepia .5 + stronger warm scrim/vignette
   under 900px); desktop: prop phones raised to legible (opacity .78,
   brightness 1, blur 1.5px) so a readable screen anchors "real screens" at
   the reveal.
3. **CONNECTIVE PRESENCE** — riders are now named end to end: picker center
   pill/tooltip/aria say "Fatima — Clinic" etc., beat eyebrows read
   "Fatima — Clinic · The Context"; the stories intro is anchored by a warm
   gold horizon form; hero→stories seam tightened 15vh→8vh.

### Verify
- Full re-sweep: screenshots/council-6-post; console errors: 0 desktop,
  0 mobile (after fixing the ph regression).
- Checked: both scene-art cards read art-directed night scenes; mobile map
  sits in deep amber night register; named picker + anchored intro confirmed.
- C's low-confidence pivot-overlap: settled states are clean (strict handoff
  from C5); the flagged frame was a transition moment.

### Grades (chair, post-build)
composition A · continuity A- · value A- · mobile A-

### Verdict
Both HIGHs and all MEDIUMs addressed. Cycle 7 convenes a fresh council
(SHIP test #3) on this state. Hard cap after cycle 8.

VERDICT: ITERATE

---

## Cycle 7 — 2026-07-07 (SHIP test #3)

### Council reports (sweep: screenshots/council-7) — NOT SHIP

**Critic A — Brand Director (opus):** page holds at macro level; hero/cities/waitlist premium.
- [HIGH] Navette & Télécabine scene art reads as flat vector cartoons beside photographic renders (5th cycle flagged).
- [MED] Light app screens (Home/Notifications/Profile) read as a different, cheaper product vs the dark wallet.
- [MED] Desktop story beats under-filled — bottom ~55% of each frame is void.

**Critic B — Continuity Director (sonnet):**
- [HIGH] Hard seam Stories→Modes: the blue ambient wash stops dead against flat black (both viewports).
- [MED] Three consecutive scrollytelling sections use three wayfinding languages; Modes' ghost-words + x/09 counter is a one-off module.

**Critic C — Cold Eyes (opus):**
- [HIGH] The middle third plateaus: four app chapters repeat one identical template beat; desire stalls before the CTA.
- [MED] Hero→stories band still reads as dead/loading space (intro marooned low).
- [MED] Pinned-scroll transition states expose overlap bleed-through.

### Ruling — chosen moves
1. **ONE WAYFINDING + SOFT SEAM** (B-HIGH + B-MED): dissolve the Stories→Modes
   boundary (opaque-earlier, taller seam gradient); unify all pinned sections on
   the label + dash-segment idiom — Modes drops the ghost words and x/09 counter
   for a 9-segment bar.
2. **ARC MOMENTUM** (C-HIGH + A-MED + C-MED): app walkthrough 4→3 chapters with a
   differentiated dual-phone "Plan & Ride" beat and the dark wallet as climax;
   story scenes scaled to command the desktop frame; stories intro lifted into
   the first viewport after the hero.
3. **MODE ART, PAINTERLY PASS** (A-HIGH): rebuild the two scenes in silhouette +
   atmosphere language (SVG blur/glow, no outlined shapes). CHAIR'S NOTE: true
   photographic-tier parity for Navette/Télécabine requires commissioned renders
   — no such assets exist in the repo and fabricating photos is out of scope;
   same applies to A's light-screen MED (needs real dark-mode app captures).
   Both go on the founder asset list; this pass is the attainable ceiling.

### Built
1. **ONE WAYFINDING + SOFT SEAM** — Stories→Modes boundary now dissolves through
   a taller, opaque-earlier gradient band (20vh); the Modes ghost-words
   ("Modes"/"Transit") and x/09 strip/progress bar are retired for the shared
   idiom: centered "NN — MODE" label + 9 dash segments, matching Stories and
   The App exactly.
2. **ARC MOMENTUM** — app walkthrough compressed 4→3 with a differentiated
   dual-phone "02 — Plan & Ride" beat (map + live alerts staged as a pair) and
   the dark wallet as the climax; wrapper 340vh→280vh; story scenes scale 1.45
   on desktop (command the frame), backdrop horizon strengthened, intro lifted
   18vh so it enters the first viewport after the hero.
3. **MODE ART, PAINTERLY PASS** — both scenes rebuilt in silhouette + atmosphere
   language (feGaussianBlur glows, moon halo + sea glade, hull/cabin as dark
   masses with lit windows, city-glow floors; no outlined shapes). Reads
   night-cinematic rather than vector-toy.
   ASSET LIST FOR FOUNDER: (a) commissioned photo-tier renders for Navette
   Maritime + Télécabine; (b) dark-mode captures of Home/Map/Notifications/
   Profile from the real app — these two items are the remaining ceiling on
   A's value findings and cannot be closed from the repo's assets.

### Verify
- Full re-sweep: screenshots/council-7-post (page 11081px desktop / 10588px
  mobile); console errors: 0 desktop, 0 mobile.
- Checked: seam dissolves (no hard cut at frame-005); modes wayfinding matches
  the shared idiom; dual-phone beat + wallet climax read differentiated;
  painterly scenes read cinematic; story arrival beat fills the upper frame.

### Grades (chair, post-build)
composition A · continuity A · value A- · mobile A-

### Verdict
All three cycle-7 HIGHs addressed within available assets. Cycle 8 is the
final council under the hard cap: SHIP if all three critics return NO MACRO
OFFENSE; otherwise CAPPED with the honest remainder list.

VERDICT: ITERATE
