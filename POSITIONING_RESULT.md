# POSITIONING RESULT

What changed, what was left alone, what you still need to decide, and the numbers side by side.
Reasoning in `POSITIONING_AUDIT.md`, copy in `POSITIONING_PLAN.md`, decisions in `BUILD_LOG.md` (D-91 to D-100).

**Nothing was staged and nothing was committed.** Eleven files changed, all inside `site-v2/`.

---

## This run had two halves

**First, the positioning fix.** Your approved company line was shipping only in the footer and the `<title>`, while the hero
answered "what is Tariq" with a product inventory. So the site could only ever read as "a nice app".

**Then, the correction you gave me.** My first pass fixed the hierarchy but wrote the copy in the business plan's *analytical*
register — problem statements aimed at an investor, not a company stating what it does. You were right, and the research
backs you: of five comparable sites read (Masabi, Littlepay, Optibus, Citymapper, Transit), **none carries disclaimers**, and
Optibus in particular *"assumes the reader already knows their pain."* Telling an operator that cash leaves no record is both
condescending and deck-shaped. They run the buses.

## What changed

| Where | Change |
|---|---|
| `/` hero | **"Tariq is the digital layer that makes public transit navigable for riders and accountable for operators."** The picture already shows both products, so the words now do work the picture cannot |
| `/` new block | **For riders** "Plan any trip across every mode, and pay for it from one balance." · **For operators** "See the service that ran, and show it to the city." Closing on "A rider app, an on-board terminal, and the record that connects them." |
| `/` meta | Leads with the category instead of the product list |
| `/app` hero | "The Tariq passenger app is in development, Android first" → **"Android first. Free to use, you pay only your fares."** |
| `/app` sections | **Left as they were, at your instruction.** My rewrite of that page's framing line was reverted |
| `/operators` | The problem line was **deleted, not rewritten** — the heading below it was already the outcome statement |
| `/operators` | Complaint triage names the proof: a complaint arrives **tied to the trip it is about**, "rather than an anonymous report" |
| `/operators` | **Your decision:** "Tariq installs the terminal and maintains it, **with no upfront invoice to the operator**" |
| `/operators` | Three tool cards moved from "designed to" into present tense, because the software behind them is built and deployed |
| `/terminal` | Adds **Open NFC standards (ISO/IEC 14443)** and an **Offline queue** item; the service line now matches `/operators` |
| `/` and `/app` | **Your decision:** the payment vendor is off the site — "Top up with EDAHABIA or CIB". The card schemes stay, because those are what a rider recognises; naming the processor is an implementation detail, and none of the five comparable sites names theirs |

**Disclaimer layer cut**, per your ruling: "App screens come from a demo recording" (three times), "Amounts shown come from a
demo account. Fares are illustrative.", "The film is a draft at 854 by 480." (a build spec that should never have been public),
and a stale caption in the screen-reader text.

**The build gate was changed deliberately.** `SMALL_PRINT` is now **"Renders of a design in development. Example fares."** in
both `src/config.ts` and `scripts/claims-check.mjs`. The build still fails if it is missing wherever terminal renders appear.

**Three redundancies found by reading the whole site end to end, all now cut:** `/operators` restated its own heading;
`/terminal` and `/operators` described the same service offer in two different registers (aligned); and `/app`'s lead and the
caption directly beneath it said the same thing twice — **caption cut at your instruction**, along with the CSS rule it
orphaned. The page's other two captions stay, because they add information rather than repeating their headings.

## What the code says, now that you've let me read it

- **Operator tooling is real.** `operator/handler.go` mounts role-gated routes for complaint triage, disruption create/list/delete
  and refunds crediting `wallet_ledger`; `backend/fly.toml` deploys `tariq-backend`; Session 22 logs a production deploy with the
  critical path device-verified. Three cards were understating built software.
- **The hardware is not built, and your business plan overstates it.** `tariq-hardware/docs/STATUS.md` (12 Sept): *"Nothing here
  is measured on hardware. It is a design, not a prototype."* **Your small print was right all along.**
- **"designed to" now survives only where that is true:** shipped totals are **home 0, `/app` 0, `/operators` 3** (two of which
  are the duplicated meta description) **and `/terminal` 1**. Nowhere a rider reads.
- **One nuance:** the operator *endpoints* are deployed, but `dashboard/` has no deploy config and its API rewrite defaults to
  `localhost:8080`. The operator **UI** is a local tool. The copy claims capability only, never a hosted dashboard or any
  install base.

## What you still need to decide

1. **Two-trigger compensation.** Trigger 1 (automatic credit on a logged cancellation) is publishable as design intent; trigger 2
   ends in legal escalation against operators. Both currently omitted.
2. **DESIGN.md's contrast figures are wrong** (pre-existing): gold on graphite is **6.08:1**, not 7:1; gold-deep on paper
   **4.56:1**, not 4.8:1. Both pass AA; gold-deep by 0.06.
3. **`FORM_ENDPOINT` is still empty**, so both forms print "This form doesn't send anything yet." That is the last line on the
   site that reads like a staging note, and it disappears by itself the moment you set a real endpoint.
4. **Noted, not introduced:** the `Live` badge on Algiers is a public launch claim the app does not meet (your call, D-88).

*(The `/app` duplicate caption that stood here has been cut.)*

## The numbers, Phase 0 against final

| metric | before | after |
|---|---|---|
| Home Lighthouse, median of 3 | 97 / 100 / 100 / 100 | **96** / 100 / 100 / 100 |
| LCP | 2,218 ms | 2,352 ms (budget 2,500) |
| CLS | 0 | 0 |
| TBT | 156 ms | 123 ms |
| JS, gzipped | 55,013 B | **55,013 B** (identical) |
| claims-check | 5/5 | **5/5** with the new gate string |
| shoot, 20 combinations | 0 problems | **0 problems** |
| cards-layout / probe-cities / anchor-check | pass | **pass** |

**Read the 96 honestly.** It is one point below baseline, and the three runs were 96, 91 and 97 — the 91 carrying the worst LCP
of the night at 2,738 ms. I do not believe it is a real regression: this run added **no JavaScript** (byte-identical), changed no
asset, and the LCP element is the same preloaded hero image; home is *shorter* than when the same page measured 98 earlier
tonight. This 3.8 GB machine produced 77, 89 and 91 on builds that also scored 98 and 99. Say the word and I will re-measure
with more samples, but I would be chasing noise.

### Page height: the cuts paid for the additions

| page | desktop | mobile |
|---|---|---|
| `/operators` | 3,977 → **3,949 (−28)** | 5,085 → **5,035 (−50)** |
| `/app` | 6,503 → 6,669 (+166) | 7,841 → **7,756 (−85)** |
| `/terminal` | 7,289 → **7,289 (0)** | 5,573 → 5,715 (+142) |
| `/` | 6,468 → 6,885 (+417, +6.4%) | 8,683 → 9,052 (+369) |
| `/404` | unchanged | unchanged |

**`/operators` and `/app` both finish smaller than before this run began**, and `/terminal` desktop is unchanged — the copy the
tone pass cut more than paid for the copy the positioning pass added. Home is the only page carrying real growth, and all of it
is the framing block that states the category and the two audiences. If that bothers you, the cheapest reduction is dropping the
two "For riders / For operators" labels.

## Screenshots

Before `.shots/pos-before/` · after `.shots/pos-final/` — every page, 1440 and 390, normal and reduced motion. I reviewed every
changed page at both widths; nothing looked worse, so nothing was reverted.

## Mistakes I made, and what they cost

1. **Pitch-deck copy.** I read the business plan for positioning and reproduced its register on public pages. Corrected above.
2. **Gold running text** on `/operators`, breaking DESIGN.md's rule that gold on paper is for small labels. Reset to graphite.
3. **A dead band on home** where two paper sections stacked their padding. Fixed.
4. **Two tooling bugs.** `pkill -f "astro preview"` matched its own shell and killed a chain at exit 144 after its checks had
   passed; and a trailing `&` backgrounded an entire `&&` list, so a build ran in the background while the shoot read the
   *previous* preview's stale output. That produced a scary-looking 47-failure report — 23 failed requests including
   `/favicon-32.png` — which was two servers fighting over port 4322, not the site. Diagnosed, discarded, re-run clean.

## Does it pass the test in the brief?

**After ten seconds on the homepage, what is Tariq?** *The digital layer that makes public transit navigable for riders and
accountable for operators.* Not "a transit app". Verified live in Chrome on the built site.
