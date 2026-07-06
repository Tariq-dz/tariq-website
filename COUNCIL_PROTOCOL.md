# DESIGN COUNCIL PROTOCOL — Tariq website redesign

Branch: `council-redesign` (main is untouched; everything here is reversible).
Server: `python3 -m http.server 8752` from repo root — restart it if down.

## Mission

Make the site read as ONE professional, high-value, luxury dark+gold experience.
The enemy is the **stitching feel**: the page was built as separate sections and
merged, and it shows — per-section backdrops, per-section header patterns, seam
slabs patching the gaps, motion grammar that changes personality at each border.

This council attacks the MACRO level only:
- Does the page feel like one continuous scene or a deck of slides?
- Is there one narrative arc (arrive → believe → desire → act)?
- Is there one design voice (type, space, light, motion) from hero to footer?
- Does every section EARN its place at the value level of the brand?

**Explicitly out of scope: pixel nitpicks.** No 2px-radius findings, no
single-word microcopy, no minor easing tweaks. Those were handled by a previous
loop (see COHERENCE_LOG.md). A council critique that returns only small details
is a failed critique.

## Freedom charter

The implementing agent MAY, without asking:
- Restructure, merge, reorder, or rebuild sections and their markup.
- Replace the per-section backdrop + seam-slab system with something unified
  (e.g., one continuous scene layer that evolves through the page).
- Rewrite any CSS/JS architecture, redesign any section's composition,
  change section heights, pinning behavior, and motion systems.
- Unify header/eyebrow/heading components into shared patterns.

The implementing agent MUST NOT:
- Touch the brand core: night `#050403`, the gold ramp, Cormorant Garamond +
  Outfit, the `tariq` wordmark and logo.
- Invent facts (cities, features, claims). Content truth is frozen.
- Flatten or minimalize richness and call it professional — restraint without
  ambition is failure.
- Leave the console with errors, or break mobile (390px) parity.

## One council cycle (= one /goal turn)

1. **SWEEP** — `OUT_DIR=screenshots/council-N node scripts/audit-shots.js`
   (server must be up). N increments each cycle; check `screenshots/` and
   COUNCIL_LOG.md for the last N.
2. **CONVENE** — spawn three critic subagents IN PARALLEL (Agent tool), each
   with the charter below, each told to read the screenshots in
   `screenshots/council-N/desktop` and `/mobile` (frames + sections) and this
   protocol's Mission. Models: Critic A on `opus`, Critic B on `sonnet`,
   Critic C on `opus`.
   - **Critic A — Brand Director** (opus): judges ambition and value. Does this
     look like a company worth believing in? Where does it feel cheap, empty,
     or template-like? Is the luxury dark+gold promise delivered everywhere?
   - **Critic B — Continuity Director** (sonnet): judges the single-scene test.
     Scrolls the frame sequence like a film reel: where do backdrop, light
     temperature, type system, or motion grammar visibly change personality?
     Names every remaining stitch point.
   - **Critic C — Cold Eyes** (opus): sees it as a first-time visitor/investor
     on both viewports. Where does attention die? What would make them close
     the tab? What's confusing, repetitive, or unconvincing at the page level?
   Each critic returns: max 5 findings, HIGH/MEDIUM only, each with
   (frame/section evidence) + (one-sentence direction). If a critic finds
   nothing at HIGH/MEDIUM, it must say "NO MACRO OFFENSE".
3. **RULE** — the chair (main agent) merges the three reports, dedupes, ranks,
   and picks the 1–3 highest-impact MACRO moves for this cycle. Log the full
   council output summary + chosen moves in COUNCIL_LOG.md.
4. **BUILD** — implement the chosen moves using the freedom charter. Big moves
   are allowed and expected; prefer rebuilding a system over patching it.
5. **VERIFY** — re-sweep changed areas (or full sweep if structural), zero
   console errors, mobile parity intact. Commit: `council N: <the move>`.
6. **LOG + VERDICT** — append to COUNCIL_LOG.md:
   - grades (composition · continuity · value · mobile),
   - findings summary per critic,
   - what was built,
   - `VERDICT: ITERATE` or `VERDICT: SHIP`.
   **SHIP requires all three critics reporting NO MACRO OFFENSE in the SAME
   cycle** (a fresh council convened on the post-fix sweep).

## Stop conditions

- `VERDICT: SHIP` — the /goal condition. Write a final founder summary first.
- Hard cap: 8 council cycles. If reached without SHIP, write `VERDICT: CAPPED`
  with an honest list of what remains, and stop.

## Notes

- Playwright is installed in this repo (`node scripts/audit-shots.js` just works).
- Screenshots are gitignored; the log is tracked.
- One full cycle per turn. Do not run two councils in one turn; do not skip
  the fresh council after fixes when close to SHIP.
