# POSITIONING PLAN — proposed structure and copy

Phase 2 of `POSITIONING_PROMPT.md`, following `POSITIONING_AUDIT.md`. Every change below is sourced to a
document and justified in one line. Nothing here is applied yet.

**Design read:** redesign — *preserve*. The visual language is frozen; this is an information-hierarchy
and copy pass. Dials match the existing site rather than any baseline.

## Governing constraints (re-read from §4 before writing this)

- No new colour, typeface, ornament, motion, section pattern or page. No new *design pattern* is
  introduced: the home block reuses `.frame*`, which is already in `index.astro` and currently dead (left
  behind when D-29 removed the section it styled). Small amounts of scoped CSS were still needed on `/app`
  and `/operators` — see "Deviations" at the foot of this file, which corrects an earlier claim here that
  no CSS at all would be added.
- `Every journey, accounted for.` stays unique to the `/operators` hero (cycle 7 decision).
- Net new "designed to" on `/operators`: **zero**.
- Zero em-dashes in shipped copy, matching the existing site.
- Home is the longest page (6,468 px desktop). D-29 cut the old framing section for **length**. The
  replacement is deliberately shorter: two short statements and one line, no visual, no CTA.

---

## Change 1 · Home hero sublead — the highest-leverage edit in the run

**Where:** `src/pages/index.astro`, `.hero__copy .lead`

| | |
|---|---|
| **Now** | "Tariq is a rider app and an <span>on-board</span> terminal for public transit, designed in Algeria." |
| **Proposed** | "Tariq is the digital layer that makes public transit navigable for riders and accountable for operators." |

**Why:** the stop condition is that a first-time reader can say what Tariq is in a sentence that is not
"a transit app". The current sublead literally answers "a rider app and an on-board terminal", so the
reader cannot give any other answer. The replacement is the **founder-approved company line**, verbatim in
its vocabulary, currently shipped only in the footer and the `<title>`.
**Source:** approved company line; business plan §1 category sentence.
**Cost control:** the hero *visual* already shows the phone and the terminal in one frame, so the words
stop duplicating the picture. "Designed in Algeria." is dropped from this line only — it is still in the
footer and in the `/terminal` reveal.
**Risk + check:** this lead runs ~3 lines at 38ch instead of 2. The hero must still fit the first screen
at 1440×900 and 390×844 with both CTAs visible (cycle 6 decision). **If the CTAs drop below the fold,
revert to the current sublead and carry the category in Change 2 alone.**

---

## Change 2 · Home — restore a framing block, shorter than the one D-29 cut

**Where:** `src/pages/index.astro`, new `<section class="frame">` between the hero and "Plan the trip. Pay the fare."

Markup uses the existing dead CSS: `.frame`, `.frame__grid`, `.frame__line`, `.frame__who`, `.frame__lead`.

```
For riders                      For operators
An unfamiliar trip takes        Cash fares leave no receipt
local knowledge the rider       for the rider and no record
may not have.                   for the operator.

Tariq is the digital layer that answers both: public transit
made navigable for riders, and accountable for operators.
```

**Why:** this is the defect named in the audit — the site demonstrates product surfaces with no problem
or category stated above them. Two statements plus one line is the smallest structure that states both
problems and the category.
**Sources:** rider line — plan §2.2 ("the passenger cannot plan a public transit route without prior local
knowledge"). Operator line — plan §2.1 ("no receipt for the passenger, no record for the operator").
Closing line — plan §1 category sentence + the approved company line.

**Deliberate wording choices:**
- "Cash fares leave no receipt **for the rider** and no record **for the operator**" frames the operator as
  someone who is *also missing something*, not as a culprit. `/operators` ends in a contact form; the page
  must not open by accusing its own prospects. The plan's harsher framing (fare leakage, overloading,
  departure refusal) is **deliberately omitted** for the same reason.
- No figures, no ride-hailing comparison, no "first", no competitor, per §6.1.
- "For riders" / "For operators" are sentence-case structural labels that say which audience each statement
  addresses. They are not decorative eyebrows, and they restate the two audiences the site already has.

**Length check:** adds roughly 250 px to a 6,468 px page (~4%). If the after-shots read long, the fix is to
drop the two labels and set the block as one line plus the closing sentence, **not** to cut it.

---

## Change 3 · Home meta description — category before product

**Where:** `src/pages/index.astro`, `BaseLayout description`

| | |
|---|---|
| **Now** | "Tariq is a passenger app to plan and pay for public transit, and an on-board terminal that puts every tap on the record. Designed in Algeria." |
| **Proposed** | "Tariq is the digital layer that makes public transit in Algeria navigable for riders and accountable for operators: a rider app, an on-board terminal, and a signed record of every tap." |

**Why:** same inversion as the hero — the description leads with the product inventory. The `<title>`
already carries the category line and stays unchanged.
**Source:** approved company line; plan §1.

---

## Change 4 · `/app` — one problem line above the feature stack

**Where:** `src/pages/app.astro`, a narrow paper band between the hero and "One search, across modes."

> Getting somewhere new should not take local knowledge. That is the job this app does.

**Why:** `/app` is seven feature sections with no value proposition above any of them; it opens on a
feature label. One sentence, written from the rider's perspective, frames every section beneath it.
**Source:** plan §2.2, the passenger-blindness problem.
**Scope control:** this replaces rewriting seven section leads. Rewriting each one risks the failure the
prompt warns about, where copy gets more accurate and the page gets worse. One line, one band, no visual.
`/app` is 6,503 px desktop, so it carries the addition comfortably.

---

## Change 5 · `/operators` — state the vacuum before answering it

**Where:** `src/pages/operators.astro`, a compact paper band between the hero and "A record for every tap…"

> Today a cash fare leaves no receipt for the rider, no record for the operator, and nothing for the city to audit.

**Why:** `/operators` is the only page whose hero is already a solution statement, but it answers a question
the page never asks. This puts the problem directly above the existing answer, giving a clean
problem-then-proof adjacency.
**Source:** plan §2.1 ("no receipt for the passenger, no record for the operator, no audit trail for the
wilaya"). "The city" is the site's existing vocabulary for this ("share it with the city"); *wilaya* and
*Treasury* are avoided as governmental references.
**Length:** `/operators` is the shortest page at 3,977 px desktop, so it has the most room on the site.
**"designed to" count:** unchanged — this is a statement about today, not about the product.

---

## Change 6 · `/operators` — promote the complaint proof inside the existing card

**Where:** `src/pages/operators.astro`, `tools[0]`

| | |
|---|---|
| **Now** | "Designed so riders file complaints from the app, tied to the trip they took, and operators triage them in one place." |
| **Proposed** | "Designed so a complaint arrives tied to the record of the trip it is about, and reaches the operator as a specific, checkable event rather than an anonymous report." |

**Why:** the audit found this is the site's cheapest proof of the accountability claim and the plan's
sharpest line about it ("The anonymous grievance disappears"), currently compressed into item 1 of 3.
**Source:** plan §3, Module 3, Complaint Pipeline.
**"designed to" count:** still one "Designed so" in this card. **Net new: zero**, which was the constraint.

---

## Change 7 · `/terminal` — two credibility details

**Where:** `src/pages/terminal.astro`, the `details` array

| Group | Change |
|---|---|
| On its face | `Contactless NFC` note becomes: "A card or a phone, at the gold ring. Open NFC standards (ISO/IEC 14443)." |
| Inside | New item — `Offline queue` / "Designed to hold every tap when the network drops, and send them when it returns." |

**Why:** both are named in the audit as absent, credibility-building and safe to say. A published standard
number is not a performance claim, and the queue is stated as design intent.
**Source:** plan §3 Module 2 (Standards, Connectivity) and §7.3.
**Note:** adds one "designed to" on `/terminal`, where the count was never flagged. `/operators` is untouched.

---

## Explicitly not doing

| Not doing | Because |
|---|---|
| "The ticketing system digitises the fare. Tariq digitises the network." | Its first half points at a government programme; §6.1 bans the Ministry and the mandate. **Founder ruling 5.2.** Shipping only the second half would be jargon without the contrast |
| Zero-cost / no upfront invoice | §6.2 requires founder confirmation before it ships. **Founder ruling 5.4** |
| Two-trigger compensation | Trigger 2 ends in legal escalation against operators. **Founder ruling 5.3** |
| Controller verification, occupancy numbers, overcrowding | Tier 2 or 3; no asset exists for the handheld, and overcrowding is an unsourced accusation |
| A `/corporate` page, a third audience, a roadmap section | §3.1 forbids all three |
| Rewriting the ride sequence | It is the strongest section on the site and already *performs* the accountability claim. Untouched |
| Touching tokens, motion, or the cities marquee | Frozen (§4.1, §4.2) and founder-decided (D-88, D-89) |

---

## Order of work (Phase 3), smallest blast radius first

1. Change 7 (`/terminal` data array) — lowest risk, build + claims-check.
2. Change 6 (`/operators` card text) — text only.
3. Change 5 (`/operators` band) — shortest page, most room.
4. Change 4 (`/app` band).
5. Change 3 (home meta).
6. Change 2 (home framing block) — reuses dead CSS.
7. Change 1 (home hero sublead) — **last, because it is the one with a measurable layout risk**, and it is
   the easiest to revert on its own if the hero stops fitting the first screen.

Screenshot after each. `npm run build` after each, so claims-check catches a banned phrase immediately.

## Copy self-audit (run against every new string above)

- Zero em-dashes. ✓
- Sentence case, no all-caps labels. ✓
- No banned claim words: no `real-time`, `live tracking`, `Ministry`, `funding`, `investor`, `seed`,
  `decree`, future year, mode count, `first` as a market claim, no DZD figure, no competitor. ✓
- Every sentence is plain and says what a thing is or does, with no filler verbs. ✓
- Every new claim about the product is either tier 1 (shipped) or written as design intent. ✓

---

## Deviations applied during Phase 3

Recorded here rather than by quietly rewriting the plan above, so the two documents can be read against
each other.

**1 · Change 2 type scale (design).** The dead `.frame__line` rule set each statement at `--fs-h2`
(32→60 px). Restoring the block at that scale would have recreated the exact page-length problem D-29 cut
it for, on the site's longest page. Applied instead: statements at `--fs-lead`, and the closing line
promoted to `--fs-h2`. The weight now lands on the payload line rather than on the two problems.

**2 · Change 2 closing line (copy).** The planned closing line — "Tariq is the digital layer that answers
both: public transit made navigable for riders, and accountable for operators." — repeated Change 1's new
hero sublead almost word for word, two screens apart. Shipping both would have been bad writing. Applied
instead: **"A rider app, an on-board terminal, and the record that connects them."**
This does a different job: it is the "three surfaces are one system" line from gap-table row 7, which was
otherwise unaddressed. *Source:* plan §3, the modules "generate compounding network effects when combined".
Net effect on the page: the hero states the **category**, the frame states the **two problems** and the
**one system**. Each line has one job and none repeats another.

**3 · Change 5 placement.** Planned as a band between the hero and "A record for every tap…". Applied
*inside* that section, directly above its `h2`, which gives the same problem-then-answer adjacency while
adding no second set of section padding. Change 4 stayed a section of its own, because `/app`'s hero is
followed by a slate section and a paper band preserves the surface rhythm.

**4 · CSS actually added.** Four scoped rules plus two media queries: `.see__problem` on `/operators`,
`.aframe` / `.aframe__line` on `/app`, and adjusted values (not new rules) on `.frame__line` and
`.frame__lead` on home. No token, no new colour, no new radius, no new motion.

**Still outstanding at the end of Phase 3:** the frame block sits between two paper surfaces, so the home
page may now show a dead band between the frame's closing line and "Plan the trip. Pay the fare." This was
deliberately left for the after-screenshots to judge rather than pre-emptively patched. The site's existing
idiom for consecutive same-surface sections is `padding-top: 0` on the second (`/terminal`'s `.details` and
`.close`); that is the fix if the frames show the gap.
