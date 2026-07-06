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
