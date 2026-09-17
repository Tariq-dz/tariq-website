# MISSION — Align the Tariq site with the business plan's positioning, without losing the design

You are a senior product designer, copy strategist and front-end engineer. Your working
directory is `~/projects/Tariq-dz/tariq-website/site-v2/`, an existing, finished Astro site
that the founder **likes**. You are not rebuilding it.

Read this whole prompt before doing anything. Then re-read **§4 Hard rules — what must not
regress** and **§6 Translation discipline**. Those two sections are where this run will fail
if it fails.

---

## 1 · The problem you are solving

The site was built from the product itself: an app demo recording, terminal renders, a film.
It shows **what Tariq does**, surface by surface, and it does that well.

It was **never** built from the business plan. The founder has since had the positioning
reviewed by an incubator, and the review raised two structural notes:

1. **Solution vs. product are blurred.** The *solution* is the approach — a network
   intelligence and operator accountability layer for Algerian public transit, a category
   that does not exist yet. The *product* is the concrete thing shipped — a rider app, an
   on-board terminal, an operator data layer. The site presents product surfaces and leaves
   the viewer to infer the solution. A reader who does not already understand Algerian
   transit leaves knowing Tariq has a nice app, not what Tariq *is*.
2. **Features are standing in for the value proposition.** The site's sections are feature
   labels — "One search, across modes", "A wallet in dinars", "See departures near you",
   "Trip alerts, disruptions, low balance". The plan's value propositions — why any of this
   matters, what changes, and for whom — are mostly absent from the page.

The founder's own words: *"a lot of statements in the business plan and the pitch deck, I
did not find them in the website."* He also said he loves the current design and is afraid
of misleading you by describing things himself. **So stop asking him to explain the
business. Read the documents. They are the source of truth for this run.**

### The good news, already verified — read this before you plan anything drastic

The site's approved company line is:

> Tariq Technologies. Algeria. The digital layer that makes public transit navigable for
> riders and accountable for operators.

The business plan's category line is:

> Tariq is Algeria's network intelligence and operator accountability platform — the digital
> layer that makes public transit navigable, measurable, and accountable for the first time.

**These are the same positioning.** The words are already right. What is wrong is the
**hierarchy**: the homepage opens on convenience ("Plan the trip. Pay the fare.") and the
accountability story — the part that makes Tariq a category rather than an app — is parked
on `/operators`, a page most visitors never reach.

This run is therefore **a restructuring of emphasis and a small amount of new connective
copy**. It is not a redesign, not a re-skin, and not a rewrite. If your plan involves new
colours, new type, a new hero concept or a new motion system, your plan is wrong — go back
to §4.

---

## 2 · Source documents (read all of them, in this order)

The previous prompt (`SITE_V2_PROMPT.md` §3) forbade reading `tariq-hub/` and the business
documents, and called them confidential. **The founder lifted that restriction on
2026-09-16, for reading only: "yes you can access the tariq hub".** These paths are now
authorised sources, and §3 of that older prompt is superseded on this point alone — every
other rule in it still stands.

| Document | Path | What to take from it |
|---|---|---|
| Business plan v2.3 (20 pp, May 2026) | `~/projects/Tariq-dz/tariq-hub/tariq_business_plan_v2_3 (1).pdf` | The spine: category, problem, the platform's parts, differentiation, moat. It describes more than the site will say — tier everything per §3.1 |
| Incubator business case (FR) | `~/projects/Tariq-dz/BUSINESS_CASE_IA_Tour_2026.md` | The economic argument; how Tariq AI is positioned for tourism |
| Incubator application, filled (FR) | `~/projects/Tariq-dz/Fiche_Candidature_IA_Tour_2026_REMPLIE.docx` | The sharpest short-form value proposition Tariq has ever written |
| Incubator application, blank + guide | `Fiche_Candidature_IA_Tour_2026.docx`, `guide_candidat_fr.md`, `IA_Tour_Algerie_2026.md` | Context for the review you are responding to |
| Company context & roadmap | `~/projects/Tariq-dz/tariq-hub/docs/01-company-context.md`, `04-roadmap.md` | Current phase; what is real today |

Reading recipes (all verified to work on this machine):

```bash
pdftotext -layout "$HOME/projects/Tariq-dz/tariq-hub/tariq_business_plan_v2_3 (1).pdf" - | less
unzip -p "$HOME/projects/Tariq-dz/Fiche_Candidature_IA_Tour_2026_REMPLIE.docx" word/document.xml \
  | sed -e 's/<[^>]*>/\n/g' | grep -v '^\s*$'
```

**There is no pitch deck, and none is needed.** A search of every repo for `*pitch*`,
`*deck*`, `*slide*`, `*.pptx` and `*.key` found nothing, and the founder confirmed on
2026-09-16: *"if you read the business plan no need for the pitch deck."* The business plan
above is the authoritative statement of Tariq's positioning. Do not ask for a deck, do not
wait for one, and do not treat any summary of the plan as a substitute for reading it in
full.

**Read-only, always.** Never write to `tariq-hub/`, `tariq-app/`, `tariq-hardware/`,
`tariq-social/` or the root of `Tariq-dz/`. Every file you create or modify lives inside
`site-v2/`.

---

## 3 · What the business plan says that the site currently does not

This is a **starting map, not your finished audit.** It was assembled by reading the plan
against the shipped pages. Verify every line yourself, correct it where it is wrong, and
extend it — the real audit is Phase 1.

| Business-plan statement | Status on the site today |
|---|---|
| The category: "network intelligence and operator accountability", a category no one in Algeria is building | Absent as a stated idea. Implied by `/operators` only. |
| "The ticketing system digitises the fare. Tariq digitises the network." | Absent. This is the single clearest solution-vs-product sentence in the plan. |
| The accountability vacuum: cash fares that reach no accounting system; no receipt, no record, no audit trail | Absent from `/`. Partly on `/operators` as "Every journey, accounted for". |
| Overcrowding beyond legal capacity is invisible until an incident | Absent. |
| Passenger blindness: an unfamiliar trip is impossible without prior local knowledge | Absent as a *problem*; the site only shows the feature that answers it. |
| Riders pay 800–2,000 DZD for ride-hailing where transit costs 50–100 | Absent (and the figures are not publishable — see §6). |
| The platform is a system whose parts compound — app, terminal, operator layer | The three surfaces are all on the site, but as three separate stories rather than one system. |
| Complaints tied to a specific receipt — "the anonymous grievance disappears" | Present but thin. One of the strongest proofs of the accountability claim. |
| Two-trigger compensation: automatic refund on logged cancellation; evidenced claim otherwise | Absent. Distinctive, and hard for anyone else to copy. |
| Controller verification (handheld, tap or QR, every check logged) | Absent. |
| Zero-cost hardware to the operator — recovered through transaction fees, no upfront invoice | Absent. The single strongest operator-facing value proposition in the plan. |
| Open NFC standards (ISO/IEC 14443), works with existing cards; offline queue, nothing lost | Absent. Credibility-building and safe to say. |
| Tariq AI as "the first expert on the Algerian city" — four domains: move, discover, live, resolve | Reduced to one feature strip ("Your Algiers guide"). The incubator docs treat this as a flagship. |
| Visitor / tourism value: independent navigation from day one | Absent. |

Note the shape of this table: **almost everything missing is a value proposition or a
problem statement, and almost everything present is a feature.** That is the incubator's
note, reproduced exactly. Your fix follows from it.

### 3.1 · Scope — the site covers what is built, nothing further

Founder instruction, 2026-09-16: *"skip the corporate module question for now, this is in
the future — for now we just work on what we build."*

The business plan is a multi-phase document. Most of it describes a company that does not
exist yet. The website describes the one that does. Sort every row of the table above, and
everything else you pull from the documents, into exactly one of three tiers before you
plan a single section:

1. **Built today — may be shown as product.** The rider app features that exist in the
   build, the terminal as concept renders with the required small print, the operator
   surfaces already on `/operators`. This is the only tier that gets feature treatment,
   screenshots, or demonstration.
2. **Designed, not built — design intent only.** Use the site's existing approved pattern:
   the words "designed to", no numbers, no implication that it runs today. Occupancy
   awareness, controller verification and the compensation triggers belong here unless you
   can verify them in the app build or the hardware repo. When in doubt, this tier.
3. **Future phases and commercial roadmap — out of scope for this run.** Say nothing.
   The corporate transport module (fleet pooling, seat marketplace, digitised transport
   indemnity), camera-based occupancy verification, the government reporting API, local
   manufacturing, national or international expansion, and anything the plan marks Phase 2
   or later. **Do not add a `/corporate` page. Do not add a third audience.** Do not write a
   "what's next" or "roadmap" section as a way of smuggling this tier back in.

Tier 3 material may still inform *how you frame* tier 1 — knowing Tariq is a platform is why
the three surfaces should read as one system — but none of it appears on the page.

---

## 4 · Hard rules — what must not regress

The founder's instruction, verbatim: *"be very careful in editing, because we actually like
the current design. I want something better, but do not fall under the level we reached."*

Treat the following as frozen. Changing any of it is a failure of this run, not a judgement
call:

1. **The design system is frozen.** `src/styles/tokens.css` and the system documented in
   `DESIGN.md` — the paper `#F7F4EF` / slate `#3A3E44` / graphite `#26282C` grounds, gold
   `#C8A060` as the only accent, Mona Sans Variable + IBM Plex Sans Arabic, the 4-based
   spacing scale, the radii rule, the one gold route line as the only ornament. **No new
   colour, no new typeface, no new ornament.** If a skill proposes a palette or a font
   pairing, ignore that part of its output (see §7).
2. **The motion grammar is frozen.** One reveal pattern (opacity + 16 px rise, 0.6 s, once,
   0.06 s stagger) and **two signature moments only** (the ride sequence on `/`, the
   terminal reveal on `/terminal`). GSAP stays imported on demand at ≥1024 px with motion
   allowed. No new pinning, no scroll-jacking, no parallax on text, no cursor effects.
3. **Every existing check must still pass**, unchanged:
   ```bash
   npm run build          # includes scripts/claims-check.mjs — the build FAILS on a banned claim
   node scripts/shoot.mjs --cycle N
   node .shots/tools/cards-layout.mjs
   ```
   plus `probe-cities` and `anchor-check`. A red check is a blocker, never a thing to adjust
   the check for. If you believe a check itself is wrong, log it and ask — do not edit it to
   pass.
4. **No regression in measured quality.** Home Lighthouse is currently 96/100/100/100 with
   LCP ≈ 2.5 s and CLS 0. Budgets: home ≤ 1.5 MB excluding lazy video, JS ≤ 120 KB gzipped.
   Re-measure at the end and put both numbers side by side in the log.
5. **Accessibility does not move backwards.** Contrast ratios stay at the documented values
   (gold on graphite 7:1, cream on slate 9.6:1, gold-deep on paper 4.8:1, gold-ink on
   gold-tint 5.7:1). Full `prefers-reduced-motion` support stays. Required small print stays
   beside every render and the film.
6. **Screenshot before and after, every page, desktop and mobile.** Put the pairs side by
   side in the log. If a section looks worse after your change, revert it — "the copy is more
   accurate now" does not buy a uglier page.
7. **Nothing is committed.** Stage nothing, commit nothing. The founder reviews the working
   tree. (`site-v2/` is the only path he has ever authorised for staging, and not on this
   run.)

---

## 5 · Phases

### Phase 0 · Baseline
Install, build, run preview, and shoot every page at 1440 and 390 px **before touching
anything**. Record Lighthouse. This is your "do not fall below this" reference.

### Phase 1 · Read and audit (no site code yet)
Read every document in §2 end to end. Then produce `POSITIONING_AUDIT.md` containing:

- **The positioning spine**, in one page: the category, the problem in its own words, the
  solution, the platform's parts, the differentiation, the moat. Record the plan's full
  structure accurately here — the audit is allowed to know more than the site says — then
  mark each part with its §3.1 tier.
- **The corrected and extended version of the §3 table**, with a third column: *where on the
  site this belongs* (page + section), or *deliberately omitted, because…*.
- **A solution/product separation map.** For each page: which blocks state the solution
  (what Tariq is and why it exists) and which demonstrate the product (what it does). If a
  page has no solution block above its feature blocks, that is the defect to fix.
- **A features → value-proposition ladder.** For every feature section now on the site,
  write the value proposition it serves, sourced from the documents. Any feature whose value
  proposition you cannot source is a candidate for demotion, not promotion.
- **A conflicts list** (see §6.3). Do not resolve these yourself.

**Stop here and re-read §4 before Phase 2.**

### Phase 2 · Plan the copy and the structure
Write `POSITIONING_PLAN.md`: the proposed section order per page, the new or rewritten copy
in full, and for each change a one-line justification citing the document it comes from.
Copy is written to the site's existing voice — short lines, sentence case, one idea per
section, no all-caps eyebrows, tabular figures for fares and times. Match the register of
the founder-approved terminal lines already in `DESIGN.md`.

Bias the plan toward **restructuring and connective tissue** over new sections. A new
problem statement above an existing feature strip is worth more than a new page. The
audiences stay as they are — riders and operators — and the page count stays as it is
unless you can show restructuring cannot carry the fix (§3.1).

### Phase 3 · Edit
Apply the plan. Small commits of work, one section at a time, screenshot after each. Run
`npm run build` often — claims-check will catch you fast and that is the point.

### Phase 4 · Verify and critique
- Every check in §4.3, green.
- Before/after screenshot pairs for every page, both widths.
- Lighthouse re-measured against the Phase 0 baseline.
- **An independent critic pass.** Do not grade your own work: open the built site in Chrome,
  scroll it as a first-time visitor, and answer in writing — *after ten seconds on the
  homepage, what is Tariq?* If the answer is still "a transit app", the run has not
  succeeded. Then check the incubator's two notes directly: can a reader now separate the
  solution from the product, and does every feature sit under a value proposition?
- Log everything in `BUILD_LOG.md` in the existing `D-NN` decision style, continuing the
  numbering.

---

## 6 · Translation discipline — the highest-risk part of this run

The business plan is an internal, confidential, investor- and government-facing document.
The website is public and is held to a stricter standard than the plan is. **You are reading
the plan for its positioning, not for its claims.** Most of its sentences may not be
published, and `scripts/claims-check.mjs` will fail the build if you try.

### 6.1 Never publish, no matter how well it reads in the plan
Funding, the seed round, any DZD figure, unit costs, revenue per terminal, payback periods,
transaction fees, projections, market sizing, terminal counts, the Ministry, the Presidential
mandate, decrees or regulations, "cashless 2028" or any future year, team members or their
schools, competitors by name (Yassir, inDrive, Temtem, Google Maps), partners, ETUSA
ridership figures or any other sourced statistic, the incubator, and the word "first" used as
a market claim.

### 6.2 Translate, do not paste
| The plan says | The site may say |
|---|---|
| "Live tracking and real-time ETA" | "See departures near you." **Never** "real-time" or "live tracking" — both are banned, and the demo uses demo data. |
| "Live occupancy awareness" | Design intent only, on `/operators` or `/terminal`, in the "designed to" form with no numbers. It is not a shipping app feature. |
| "Hardware recovers in ≈3.3 months at 10,000 DZD/terminal" | The operator-facing *shape* of it, with no numbers: the terminal is installed and maintained by Tariq, with no upfront invoice to the operator. Confirm this framing with the founder before shipping it. |
| "Every tap generates structured, traceable data" | ✅ Already the site's language: "Every tap, on the record." Strengthen its placement rather than rephrasing it. |
| "No entity in Algeria is building this" | Say what Tariq is, not what others are not. Never name or gesture at a competitor. |
| "Ministry approval, Presidential mandate" | Nothing. Cut entirely. |
| "One functional hardware prototype" | The existing, required small print stands: *"Concept renders of a design in development. Fares are illustrative."* |

### 6.3 Where documents disagree, the site takes the most conservative reading
The documents do not agree on maturity. The business plan says "one functional hardware
prototype"; the incubator application says the terminal is "spécifié et prototypé" and that
the Android app is "complète… il ne s'agit pas d'une maquette"; the site says renders of a
design in development, with app screens from a demo recording.

**Rule: the website states the least advanced claim of the set, always.** Collect every such
conflict in `POSITIONING_AUDIT.md` under "Founder decisions needed", with the exact quotes
and paths, and leave the site conservative until he rules. Never resolve a maturity conflict
by picking the more impressive version. The founder's stated fear is misleading people —
honour it in code, not in intention.

---

## 7 · Skills (exact installed names — the older prompt's names are stale)

Invoke with the Skill tool. Names verified against `~/.claude/skills/` on 2026-09-16.

| When | Skill | Use |
|---|---|---|
| Phase 1 | `redesign-skill` | **Audit only.** Point it at the built site to grade the current pages. Ignore any instruction it gives to rebuild or re-skin. |
| Phase 1–2 | `frontend-design:frontend-design` | Hold one intentional direction; check that the restructured pages still read as designed, not assembled. |
| Phase 1–2 | `taste-skill` | Anti-slop discipline and the pre-flight check. Its audit-first mode fits this run exactly. |
| Phase 2 | `ui-ux-pro-max` | **Information architecture, hierarchy, landing-page patterns, a11y and typographic reasoning only.** Its palette and font-pairing output is overridden by the frozen system in §4.1 — do not apply it. |
| Phase 2 | `soft-skill` | The single taste preset for this brand. **Do not stack** `minimalist-skill` or `brutalist-skill`. |
| Phase 3 | `design-system` | Only if a new component is genuinely needed; extend the existing three-layer tokens, never introduce a parallel scale. |
| Phase 3 | `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-performance` | Only if an existing signature moment must be adjusted. The default answer for new motion is no (§4.2). |
| Every edit | `output-skill` | No truncated files, no "rest unchanged" stubs. |
| Phase 4 | `web-design-guidelines` | Audit the rebuilt pages against the Web Interface Guidelines. |
| Phase 4 | `webapp-testing` | Node Playwright for mobile widths. Python Playwright is not installed. |
| Phase 4 | `claude-in-chrome` | Look at the real page and scroll it. Load all Chrome tools in one ToolSearch call. Known limit: the Chrome window will not go narrower than ~921 px — do mobile checks with Playwright. |

`ui-ux-pro-max` queries for this run:
```bash
S=~/.claude/skills/ui-ux-pro-max/scripts/search.py
python3 $S "B2B2C infrastructure platform landing page: stating a category and a problem before product features" --domain landing
python3 $S "information hierarchy for a page with two audiences, riders and operators" --domain ux
python3 $S "value proposition above feature list, marketing site structure" --domain landing
```

**Not applicable here** — do not install, invoke or plan around them: ShadCN and its MCP,
Material 3, the SwiftUI skills, the Expo skill, the dashboard skill (this is a static
marketing site, not an app or a dashboard), `imagegen-frontend-web` and any image or video
generator such as Higsfield or Seedance. **Every visual on this site is a real product
asset** — real app recordings, real terminal renders, the real film. Generated imagery would
break the honesty rule that the whole site is built on. The one existing illustration
(the Algiers card) is labelled as an illustration in its alt text, and that is the standard.

---

## 8 · Deliverables

1. `POSITIONING_AUDIT.md` — the spine, the corrected gap table, the solution/product map, the
   feature→value ladder, and the founder-decisions list.
2. `POSITIONING_PLAN.md` — proposed structure and full copy, each change sourced.
3. The edited site, all checks green.
4. Before/after screenshots, both widths, every page.
5. `BUILD_LOG.md` entries in the existing `D-NN` style.
6. A short `POSITIONING_RESULT.md`: what changed, what was deliberately left alone, what the
   founder must decide, and the Phase 0 vs Phase 4 quality numbers side by side.

## 9 · Stop conditions

Stop and hand back when all of these hold:

- Every check in §4.3 passes and no quality number is below the Phase 0 baseline.
- The homepage states the problem and the category **before** it demonstrates features, and a
  first-time reader can say what Tariq is in one sentence that is not "a transit app".
- Every feature section on the site sits under a value proposition traceable to a document.
- Every unpublishable claim stayed out, and every maturity conflict is listed for the founder
  rather than silently resolved.
- The design is recognisably the same site the founder approved — same palette, same type,
  same ornament, same two signature moments — and looks at least as good in the before/after
  pairs.

Stop early and ask the founder if: a change would require breaking a rule in §4; the plan and
the incubator documents conflict in a way §6.3 cannot settle conservatively; or you conclude
the fix needs a new page or a new audience rather than a restructuring.
