# POSITIONING AUDIT — the business plan against the shipped site

Phase 1 of `POSITIONING_PROMPT.md`. Sources read in full: business plan v2.3 (20 pp), the incubator
business case (FR), the filled incubator application (FR), the blank application + candidate guide +
`IA_Tour_Algerie_2026.md`, and `tariq-hub/docs/01-company-context.md` / `04-roadmap.md`.
Site read as **shipped copy in DOM order**, extracted from `dist/` — not from source — so this audit
grades what a visitor actually reads.

No site code was changed in this phase.

---

## 1 · The positioning spine

Recorded in full, then tiered. The audit is allowed to know more than the site will say (§3.1).

| Part | The plan's own statement | Tier |
|---|---|---|
| **Category** | "Algeria's network intelligence and operator accountability platform — the digital layer that makes public transit navigable, measurable, and accountable." A category no entity in Algeria is building. | **1** — it is what Tariq *is*, not a future feature |
| **Problem 1 · the accountability vacuum** | Every private bus and taxi fare is cash that "reaches no accounting system — no receipt for the passenger, no record for the operator, no audit trail for the wilaya". The gap is "not just unrecovered; it is unmeasurable". | **1** as a problem statement |
| **Problem 2 · passenger blindness** | "For any journey to an unfamiliar destination… the passenger cannot plan a public transit route without prior local knowledge." | **1** as a problem statement |
| **Problem 3 · operator incentives** | Public: no data, so no accountability. Private: departure refusal and overloading beyond legal capacity. | **3** — accusatory toward the operators the site is courting |
| **Problem 4 · the visitor** | No way to navigate public transit independently on day one. | **1** as one line, **not** as an audience |
| **Solution, in one sentence** | "The ticketing system digitises the fare. Tariq digitises the network." | **1** in shape; the first half needs a founder ruling (§5) |
| **Part 1 · passenger app** | Multi-modal routing, tracking/ETA, occupancy, proximity alerts, unified wallet + digital receipt. | **1** for what the demo shows; **2** for occupancy; ETA/tracking wording is **banned** |
| **Part 2 · IoT hardware** | NFC terminals, fixed and handheld. "The terminals are the data source." Open ISO/IEC 14443; local transaction queue, nothing lost offline. | **1** as concept renders w/ small print; standards + offline queue are **2** |
| **Part 3 · data & accountability** | Operator dashboard, complaint pipeline tied to a receipt, two-trigger compensation, government reporting API. | **2** (dashboard, complaints, refunds); API is **3** |
| **Part 4 · corporate module** | Fleet pooling, seat marketplace, digitised transport indemnity. | **3** — explicitly out of scope |
| **Differentiation** | The category requires hardware + routing + payments + operator relationships *simultaneously*; no single existing institution is structured to deliver it. | **1** as "one system", never as a competitor comparison |
| **Moat** | Proprietary network data; zero-cost hardware to the operator; full-stack depth; policy alignment; local manufacturing. | Data/zero-cost/depth → **2**; policy + manufacturing → **3** |

**The one-sentence spine the site should be able to deliver:** *Tariq is the digital layer that makes
Algeria's public transit navigable for riders and accountable for operators — a rider app, an on-board
terminal, and the record that connects them.*

---

## 2 · The §3 gap table, verified and corrected

§3 was a starting map. Every row below was re-checked against shipped copy. **Four rows were wrong and
are corrected in bold.**

| Business-plan statement | Status on the site today (verified) | Where it belongs |
|---|---|---|
| The category: network intelligence and operator accountability | **CORRECTED — not absent. The approved company line is already shipped, but only in the two lowest-attention places on the site:** the footer (`Public transit, navigable and accountable.`) and the home `<title>`. No visitor reading the page encounters it. | `/` — promote into the hero's reading path. This is a **hierarchy** fix, not new copy |
| "The ticketing system digitises the fare. Tariq digitises the network." | Absent. Confirmed. | `/` solution block — **founder ruling needed on the first half** (§5.2) |
| The accountability vacuum: cash reaching no accounting system, no receipt, no record | Confirmed. The site states the *answer* (`Every journey, accounted for.`) without ever stating the *question*. | `/` problem line above the ride; `/operators` above its hero answer |
| Overcrowding beyond legal capacity is invisible | Absent. Confirmed. | **Deliberately omitted** — unsourced safety claim, and an accusation against the operators the contact form is trying to win |
| Passenger blindness as a *problem* | Confirmed. `/app` opens on `One search, across modes.` — a feature label with no problem above it. Same on `/`. | `/app` above the modes strip; `/` in the solution block |
| Riders pay 800–2,000 DZD where transit costs 50–100 | Absent; figures unpublishable (§6.1). Confirmed. | **Deliberately omitted as figures.** The publishable core — a trip you don't already know is effectively unreachable — belongs in the problem line |
| The parts compound into one system | Confirmed: three surfaces, three separate stories. The ride sequence already *performs* the connection; nothing *says* it. | `/` — one connective line, reusing the existing ride section rather than adding one |
| Complaints tied to a specific receipt | **CORRECTED — present, and stronger than "thin" implies.** `/operators` already says complaints are "tied to the trip they took"; `/app` says "Every trip keeps its receipt." The tie exists but is buried as item 1 of a 3-item tools list. | `/operators` — promote; it is the cheapest proof of the accountability claim |
| Two-trigger compensation | Absent. `/operators` has only `Refunds. Designed to return a refund…`. | **Founder decision (§5.3).** Trigger 2 ends in "Tariq escalates to legal action" — unpublishable toward customer operators |
| Controller verification (handheld, every check logged) | Absent. Confirmed. | **Deliberately omitted** — tier 2, and no handheld render exists; the site only owns the pole-mounted terminal |
| Zero-cost hardware to the operator | **CORRECTED — half of it is already shipped.** "Installed and maintained by Tariq" appears on `/terminal` *and* `/operators`. What is absent is the commercial half: no upfront invoice, no capital outlay. | `/operators` — **founder ruling required before shipping** (§6.2 says so explicitly) |
| Open NFC standards (ISO/IEC 14443); offline queue, nothing lost | Absent. Confirmed. Both are safe: a standard number is not a performance claim, and the queue is describable as design intent. | `/terminal` details, under "On its face" and "Inside" |
| Tariq AI as "the first expert on the Algerian city", four domains | **CORRECTED — partly, and the plan's phrasing is unpublishable.** "First" as a market claim is banned (§6.1). The site's `Your Algiers guide` already covers *move* and gestures at *resolve* ("help filing a complaint"). | `/app` — widen the framing, drop "first", stay Algiers (§5.5) |
| Visitor / tourism value | Absent. Confirmed. | `/app`, **one line inside the AI block**. Not a section, not a third audience (§3.1) |

---

## 3 · Solution / product separation map

For each page: does a block state **what Tariq is and why it exists** *before* blocks that **demonstrate
what it does**?

| Page | Solution blocks (what it is / why) | Product blocks (what it does) | Verdict |
|---|---|---|---|
| `/` | **None above the fold.** The hero sublead — "Tariq is a rider app and an on-board terminal for public transit" — is a *product inventory*, not a solution. The ride head ("One ride, from the plan to the proof.") is the first idea-level line, and it arrives at section 3. | Hero products → app list → ride → modes → terminal → cities | **DEFECT.** Features before any statement of the problem or the category |
| `/app` | None. Opens `Plan it. Pay for it. Ride.` | 7 feature sections, every one a feature label | **DEFECT.** No problem above the feature stack |
| `/terminal` | Partial — "Meet the Tariq terminal… designed in Algeria" is object-level, not purpose-level | Reveal → step-through → details → film → service | **Acceptable.** A product page may lead with the product; it needs one line of *why* |
| `/operators` | **Yes — the only page that gets this right.** `Every journey, accounted for.` is a solution statement, and it sits above every proof. | Records → diagram → intent → tools → contact | **PASS** — and it is the page fewest visitors reach |
| `/404` | n/a | n/a | n/a |

**The defect in one line:** the site's single solution block is parked on its least-visited page, and its
category sentence is in the footer. The words are right; the hierarchy is inverted — exactly the
incubator's note.

---

## 4 · Feature → value-proposition ladder

Every feature section now shipped, with the value proposition it serves, sourced. **A feature whose VP
cannot be sourced is a demotion candidate.**

| Shipped feature section | Value proposition it serves | Source | Verdict |
|---|---|---|---|
| `/` "Plan the trip. Pay the fare." | The network is unusable without prior local knowledge; the app supplies it | Plan §2.2 | VP absent from page — **add above** |
| `/` "One ride, from the plan to the proof." | Every tap becomes a record that both sides hold — the accountability claim, *performed* | Plan §3 Module 3 | **Strongest section on the site.** Keep untouched; only name what it proves |
| `/` "One search, every mode." | Physically integrated, digitally invisible: one trip across modes | Plan §1, §2 | VP absent — one line |
| `/` "Designed for the way Algeria moves." | Terminal as the data source | Plan §3 Module 2 | Weak VP; the line is atmosphere |
| `/app` "One search, across modes." | Passenger blindness (§2.2) | Plan §2.2 | VP absent — **add above** |
| `/app` "See departures near you." | You cannot know when anything is coming | Plan §2.2 | VP absent |
| `/app` "A wallet in dinars." | Cash reaches no accounting system; the wallet is the on-ramp | Plan §2.1, §9.1 | VP absent |
| `/app` "Trips, receipts, ratings and complaints." | **"The anonymous grievance disappears."** | Plan §3 Module 3 | **Highest-leverage rewrite on the site** — a real VP exists and is unused |
| `/app` "Trip alerts, disruptions, low balance." | Proximity alerts for unfamiliar journeys | Plan §3 Module 1 | Thin; VP is weaker than the feature |
| `/app` "Tariq AI. Your Algiers guide." | Knowledge without mobility is a list; mobility without knowledge is a map | Fiche + `IA_Tour` | VP exists and is excellent — **widen framing** |
| `/app` "In English and Arabic." | Language parity; no international product covers AR/darja for Algeria | Fiche §IV | Fine as is |
| `/terminal` details (7″, NFC, printer…) | Sealed and trustworthy because the record must stand as proof | Plan §7.3 | Good; **add standards + offline queue** |
| `/operators` "A record for every tap…" | The accountability vacuum | Plan §2.1 | Good — needs the problem above it |
| `/operators` "An empty bus is not a switched-off terminal." | Zero must be distinguishable from off, or the data is worthless | Plan §3 Module 3 | Strong, correctly "designed to" |
| `/operators` tools (triage / alerts / refunds) | Complaint tied to a receipt; compensation | Plan §3 Module 3 | VP sourced but **compressed**; "designed to" appears 9× on this page (a cycle-7 critic already flagged ~11×) |

**No section needs deleting.** Every shipped feature has a sourceable VP. The defect is uniformly that
the VP is missing from the page, not that the wrong features are shown — which is why this run is a
restructuring, not a rebuild.

---

## 5 · Founder decisions needed (§6.3 — not resolved here)

The documents disagree on maturity. **The site stays at the least advanced reading of each until ruled
on.** Nothing below has been applied.

**5.1 · App and backend maturity — the largest gap**
- Filled application (FR): *"application Android complète (tous écrans, i18n AR/FR/EN, accessibilité), backend de production opérationnel, tableau de bord opérateur livré… Il ne s'agit pas d'une maquette."* — `Fiche_Candidature_IA_Tour_2026_REMPLIE.docx`
- Business plan: *"Working app demo across all six modes (static station data)"* — v2.3 §8, Phase 1
- Site today: *"in development, Android first"*, *"App screens come from a demo recording"*, and every operator tool in "designed to" form.
- **Held at:** the site's current wording. If the operator dashboard is genuinely *livré*, `/operators` understates — but §3.1 says tier 2 when in doubt, and verifying would require reading `tariq-app`, which this repo's `CLAUDE.md` forbids without your say-so.
- **Decision:** may I read `tariq-app` / `tariq-hardware` to tier these accurately, or do we stay conservative?

**5.2 · May the site gesture at the ticketing programme?**
- The plan's sharpest solution sentence is *"The ticketing system digitises the fare. Tariq digitises the network."*
- Its first half points at a government programme. §6.1 bans the Ministry, the Presidential mandate and decrees.
- **Held at:** Tariq's half only, stated positively, with no reference to ticketing.
- **Decision:** confirm the positive-only form, or authorise a neutral reference to fare payment generally.

**5.3 · Two-trigger compensation**
- Trigger 1 (automatic credit on an operator-logged cancellation) is publishable as design intent.
- Trigger 2 ends in *"Tariq escalates to legal action… every refusal builds a documented legal file"* — unpublishable on a page whose purpose is winning those operators.
- **Held at:** omitted entirely.
- **Decision:** publish trigger 1 in "designed to" form, or keep both out?

**5.4 · Zero-cost hardware framing** *(§6.2 requires your confirmation before this ships)*
- Plan: hardware absorbed by Tariq and recovered through transaction fees; "Operators receive the terminal… at no capital outlay."
- Site already says "installed and maintained by Tariq". The missing half is **no upfront invoice**.
- **Held at:** service framing only, no commercial claim.
- **Decision:** may `/operators` say the terminal arrives with no upfront invoice to the operator?

**5.5 · Tariq AI scope**
- Incubator docs: national coverage, four domains (move / discover / live / resolve), AR/FR/EN/darja, and it *acts* (pays, navigates, files).
- Site: "Your Algiers guide", English screens only (the demo recording is English-only — HANDOFF known issue).
- **Held at:** Algiers, and only what the demo clips show.
- **Decision:** widen to the four domains, or stay with what is recorded?

**5.6 · Pre-existing, noted not introduced**
The `Live` badge on Algiers (D-88, your call) is a public launch claim the app does not yet meet. It sits
awkwardly beside this run's added emphasis on honest maturity. Flagged only; unchanged.

---

## 6 · Constraints this run inherits (checked before planning)

- **D-29:** home already had a problem-framing section; it was cut for **page length**, not because framing
  was wrong. Its dead `.frame` CSS is still in `index.astro`. A restored framing block must be *shorter*
  than the one that was cut, or it repeats a known failure.
- **Cycle 7:** `Every journey, accounted for.` was deliberately reserved as unique to the `/operators`
  hero. Promoting accountability to `/` must **not** reuse that line.
- **Cycle 7:** "designed to" was already flagged as over-repeated on `/operators`. Net new "designed to"
  sentences there should be zero.
- **Cycles 1–6:** invented operator dashboards, typeset fake records and invented city geometry were all
  declined as dishonest. Any new accountability visual must reuse `SignedRecord` / `RecordFlow`.
- `claims-check` bans, relevant here: `real-time`, `live tracking`, `investor`, `funding`, `seed`,
  `Ministry`, `decree`, future years, and any `N modes` count.

---

## 7 · Conclusion going into Phase 2

The words are already right; the **order** is wrong. The fix is:

1. One solution block on `/`, above the features, carrying the category line that currently hides in the footer.
2. One problem line above the feature stacks on `/` and `/app`.
3. Promote the complaint-tied-to-a-receipt proof on `/operators`; add standards + offline queue on `/terminal`.
4. One connective line making the three surfaces read as one system.

No new page. No new audience. No new section on `/app` or `/terminal`. Page count unchanged.

**Next:** re-read §4, then write `POSITIONING_PLAN.md`.
