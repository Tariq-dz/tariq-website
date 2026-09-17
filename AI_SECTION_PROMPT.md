# MISSION — Rebuild the Tariq AI section on `/app` as one immersive scroll moment

You are a senior product designer and front-end engineer. Your working directory is
`~/projects/Tariq-dz/tariq-website/site-v2/`, a finished Astro marketing site the founder **likes**.
You are changing **one section on one page**. You are not redesigning the site.

Read this whole prompt. Then re-read **§3 Hard rules** and **§7 Skills**. Those are where this run fails if it fails.

---

## 1 · The idea, in the founder's words

> "I want to create an immersive experience. Keep the phone playing the video, but have the **full section change
> images** — when the video reaches Jardin d'Essai, the same place fills the background. The phone and the section
> show the same thing. That doubling makes the viewer live the experience. Same for the Martyr's Memorial, the
> Casbah, and the rush hour.
>
> Second, the **contextual immersion**: one continuous, engaging commercial story. Begin with something small that
> introduces Tariq AI as the expert on the city. Then find the context for rush hour. Then something like *you might
> want somewhere calm, like Jardin d'Essai*. Then **or** you might want… for the Martyr's Memorial. Then the day
> plan being built, then the finished day plan."

Two layers of immersion, then:

1. **Visual** — the phone and the full-bleed background show the *same place at the same moment*.
2. **Narrative** — one continuous story that offers alternatives the way the assistant itself does.

**It must stay ONE section.** The founder's explicit goal is that `/app` stays compact and the reader does not get
lost. More screens, not more page.

---

## 2 · What already exists (verified — do not re-derive)

### The structural pattern to reuse
`src/components/TerminalReveal.astro` + `src/scripts/terminal-reveal.ts` — the first section of `/terminal`.
A pinned slate stage crossfades three renders while three line-pairs step through, **scrubbed by scroll, no snap**.
It pins only at **≥1024 px with `prefers-reduced-motion: no-preference` and JS present**; otherwise it degrades to a
stacked line/image/line/image list via flex `order`. Read that file before writing anything. It is the proven
pattern in this codebase and your structural basis.

### The footage
`~/projects/Tariq-dz/TARIQ_AI_Demo_2min.mp4` — 540×960, 30 fps, 119.9 s. The site's existing app visuals are all cut
from it (see `HANDOFF.md` asset table). The AI material sits in **two runs**, not one:

| Window | Content |
|---|---|
| **0:36 – 0:39** | Rush-hour advice: warning callout, a departures table for Grande Poste, and a Metro-vs-Bus comparison card with time, cost and crowding |
| **0:42 – 0:51** | Place cards: Jardin d'Essai du Hamma and Martyr's Memorial, with rating, "best time to visit", shade advice, Navigate / Add to Day Plan |
| **0:54** | The AI welcome state, four chips. Already extracted as `src/assets/app/ai-welcome.png` |
| **1:09 – 1:27** | **NOT AI.** Wallet, Chargily checkout, trips list. **Contains real personal data on screen at 1:15–1:21 — an email address, a full name and a phone number. Never use frames from this window.** |
| **1:30 – 1:42** | The finished day plan: a timeline with times and modes, a map with five pins, a transport budget, four scheduled reminders. The existing `ai-dayplan` clip is cut from 1:38–1:41 |

Every new still or clip must be cut with `scripts/prepare-media.sh` conventions: the crop for app video is
**434×888 at x 53, y 30** of the 540×960 recording. Check every frame for personal data before shipping it.

### The photographs
The app's own AI knowledge base already supplies place photos — `tariq-app/backend/internal/ai/knowledge/places.go`.
**This is why the doubling is honest: the background and the phone show the same image because they are the same
asset the product itself uses.**

| Place | Source | Licence | Author |
|---|---|---|---|
| Jardin d'Essai du Hamma | Wikimedia Commons, original **4608×3456** | **CC BY-SA 4.0** | **Boumediene15** |
| Martyr's Memorial | Wikimedia Commons, original **4608×3456** | **CC BY-SA 3.0** | **Boumediene15** |
| Casbah of Algiers | `tariq-backend.fly.dev/images/casbah.jpg`, and a 1200×800 `tariq-app/La-casbah-dAlger.jpg` | **verify before use** | verify |
| Notre-Dame d'Afrique, Bardo Museum, Place 1er Mai | Wikimedia Commons | **verify each** | verify each |

**Every image's licence must be checked individually — they do not all match.** Attribution is mandatory: credit the
author, link the licence, and state that the image was cropped. The site has nowhere to put photo credit today, so
**you must design that** — a restrained credit line that does not break the composition. Precedent: the Algiers city
card is labelled "Illustration" in its alt text (D-90) because honesty about images is a site rule.

---

## 3 · Hard rules — what must not regress

1. **The design system is frozen**, with exactly one exception granted for this run (founder, 2026-09-16):
   **photographic grounds are permitted in this section only.** Everywhere else the three grounds stand — paper
   `#F7F4EF`, slate `#3A3E44`, graphite `#26282C`, with gold `#C8A060` as the only accent. **No new colour, no new
   typeface, no new radius, no new spacing step, no new ornament.** `src/styles/tokens.css` is not to be edited.
   Do not let photography leak into any other section or page.
2. **Generated imagery is banned.** No Higsfield, no Seedance, no image model, ever. Every visual on this site is a
   real product asset, and that is the honesty rule the whole site rests on. If you need an image you do not have,
   say so and stop.
3. **`scripts/claims-check.mjs` fails the build on a banned claim.** It is mechanical and it will catch you. Among
   others it bans **"real-time"**, **"live tracking"**, a future year, a mode count, and **"first"** as a market
   claim — so "the first expert on the Algerian city" cannot ship in any form. Run `npm run build` often.
4. **Budget for `/app`: ≤ 1.5 MB excluding lazy video** — the same ceiling home already holds, which is a genuine
   raise for this page (it currently carries 10 KB gzipped HTML and 136 KB of images). **JavaScript is not your
   problem:** GSAP and ScrollTrigger are *already* built into `dist` for the two existing scroll moments, so
   importing them on `/app` adds a desktop download but **no new bundle bytes**. Photographs are the entire budget
   question. Serve responsive WebP, lazy where below the fold, never upscaled beyond native.
5. **No regression in measured quality.** Lighthouse, LCP, CLS and TBT must not fall below the current numbers in
   `POSITIONING_RESULT.md`. Re-measure at the end and show both side by side.
6. **Accessibility does not move backwards.** Full `prefers-reduced-motion` support. Text over photographs must meet
   WCAG AA — use a scrim or tint, and prove the ratio rather than eyeballing it. The pinned stage must never trap
   scroll, and keyboard users must be able to pass through it.
7. **Every existing check must pass, unchanged:**
   ```bash
   npm run build          # includes claims-check — a red build is a blocker, never a thing to adjust the check for
   node scripts/shoot.mjs --out ai-N
   node .shots/tools/cards-layout.mjs desktop && node .shots/tools/cards-layout.mjs mobile
   node .shots/tools/probe-cities.mjs
   node .shots/tools/anchor-check.mjs
   ```
8. **Screenshot before and after, `/app` at 1440 and 390, normal and reduced motion.** If it looks worse, revert it.
9. **Nothing is committed. Stage nothing.** The founder reviews the working tree.

---

## 4 · The narrative

Write it yourself — this is the beat sheet, not the copy. One continuous story, in the site's voice.

| Beat | What the phone shows | What fills the section | The idea |
|---|---|---|---|
| **1 · Open small** | The welcome state, four chips | Restrained — slate, or the city at low contrast | Introduce Tariq AI as the one that knows the city. Small, confident, no boast |
| **2 · Rush hour** | Warning callout, departures, Metro-vs-Bus comparison | The city at rush hour | The practical hook. It knows *when* as well as *where* |
| **3 · Somewhere calm** | The Jardin d'Essai place card | **Jardin d'Essai, full bleed** | "You might want somewhere calm." The pivot from utility to discovery |
| **4 · Or** | The Martyr's Memorial place card | **Martyr's Memorial, full bleed** | **"Or…"** The alternative — this is the founder's key beat. It mirrors how the assistant offers options rather than one answer |
| **5 · Building the day** | The day plan being assembled, stops added | The Casbah, full bleed | It does not just answer, it builds |
| **6 · The finished plan** | Timeline, map with five pins, budget, reminders | Resolves back to the site's own ground | The payoff: a whole day, planned |

**Voice.** Short lines, sentence case, one idea per beat, no all-caps eyebrows, tabular figures for times and fares.
Match `DESIGN.md` and the existing approved lines. **Write like a company, not like a pitch deck** — the founder
rejected an earlier pass for exactly that (see `BUILD_LOG.md` D-100). Reference sites read for tone: Masabi,
Littlepay, Optibus, Citymapper, Transit. The finding that matters: *they state outcomes and assume the reader
already knows their pain*, and **none of them carries disclaimers**.

**Do not claim the assistant acts.** It answers; it does not pay a fare or drive navigation. Do not claim Arabic or
French replies, and do not claim coverage beyond Algiers.

---

## 5 · Craft — what makes this good rather than gimmicky

- **The crossfade is the whole trick. Get it right.** Image and phone must change *together*, driven by one
  scroll-linked timeline, not two independent triggers that drift apart. A background that lags the phone by 200 ms
  destroys the effect entirely.
- **Photographs are a ground, not a decoration.** Treat them the way the site treats slate: something text sits on
  with intent. Tint, scrim, deliberate crop, a consistent treatment across all of them. Six photos in six different
  styles will look like a mood board.
- **Do not animate what does not need to move.** The site has one reveal pattern (opacity + 16 px rise, 0.6 s, once)
  and two signature moments. This becomes a third, at the founder's explicit decision — earn it.
- **The phone is the constant.** It is the one thing that never leaves the frame, and it is what makes the section
  feel like one moment rather than six slides.
- **Mobile.** The pin only runs at ≥1024 px. Below that it becomes a stacked sequence, which makes the section
  *longer* on phones — the opposite of the founder's goal. Design that fallback deliberately: it may need fewer
  beats, or the photographs may need to become smaller inline images rather than full-bleed grounds.

---

## 6 · Phases

- **Phase 0 · Baseline.** Build, preview, shoot `/app` at both widths and both motion settings, record Lighthouse.
- **Phase 1 · Assets.** Inventory the AI footage. Cut the stills and clips you need, checking every frame for
  personal data. Fetch the photographs at full resolution, verify each licence, process to responsive WebP.
  **If the licences do not permit use, stop and report — do not substitute a generated image.**
- **Phase 2 · Plan.** Write the section structure and the full copy, with each beat's image, before building.
- **Phase 3 · Build.** One beat at a time. `npm run build` often.
- **Phase 4 · Verify.** Every check in §3.7 green. Before/after screenshots. Lighthouse re-measured. Then an
  independent critic pass: open it in Chrome, scroll it as a first-time visitor, and answer in writing — *does the
  doubling actually land, or does it read as a slideshow?* Log everything in `BUILD_LOG.md` in the existing `D-NN`
  style, continuing from D-101.

---

## 7 · Skills — use these, ignore those

**Use:**
- `gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-performance` — the real fit. The site already uses GSAP
  and ScrollTrigger for both existing scroll moments; follow those conventions rather than inventing new ones.
- `frontend-design:frontend-design` — as a **discipline check** that the result still reads as designed, **not** as
  a licence to choose a new direction. The direction exists and the founder likes it.
- `output-skill` — no truncated files, no "rest unchanged" stubs.
- `web-design-guidelines`, `webapp-testing` (Node Playwright; Python is not installed), `claude-in-chrome` (load all
  Chrome tools in one ToolSearch call; the window will not go narrower than ~921 px, so do mobile with Playwright).

**Ignore — these will damage this site:**
- **ShadCN skill and MCP** — React component registry. This is Astro with native CSS and no component library.
- **Higsfield, Seedance, any image or video generator** — banned outright by §3.2.
- **Material 3, SwiftUI, Expo, mobile-UI skills** — this is not a mobile app.
- **The dashboard skill** — this is not a dashboard.
- **Style presets** (minimalist / brutalist / premium) — the site has a committed direction. A preset will fight it.
- **`ui-ux-pro-max` palette and font-pairing output** — overridden by the frozen system. Its landing-page patterns
  were already tried on this site and added nothing.

---

## 8 · Stop and ask the founder if

- The photographs' licences do not permit the use, or attribution cannot be placed without wrecking the composition.
- The footage does not contain a state you need, and the only alternative is generating or faking one.
- Making the doubling work would require breaking a rule in §3.
- The mobile fallback cannot be made to serve the founder's goal of a *compact* section.

**The test this must pass:** a first-time visitor scrolls the section once and comes away feeling they were shown
the city, not shown a product feature list. If it reads as a carousel of screenshots with photos behind them, it has
failed, however smooth the animation is.
