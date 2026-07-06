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
