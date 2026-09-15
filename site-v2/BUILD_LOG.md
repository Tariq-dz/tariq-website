# BUILD_LOG — Tariq site v2

Decisions (D-n) and cycles, newest at the bottom of each section.

## Phase 0 · Setup (2026-09-13)

- Folder: `~/projects/Tariq-dz/tariq-website/site-v2` (was empty). Parent `git status --short` recorded
  before any work (19 entries, all pre-existing edits to `../css`, `../js`, `../index.html`), saved in the
  session scratchpad and reproduced in `HANDOFF.md` at the end.
- Folder `.gitignore` re-includes `package.json`, `package-lock.json`, `*.md`; ignores `node_modules/`,
  `dist/`, `.shots/`, `.astro/`.

### Decisions
- **D-1 Astro 5, not latest.** `astro@latest` (v6) refuses Node 20.19.6 ("requires >=22.12.0") and there is
  no newer Node on the machine. Astro 5.18 supports Node 20, so the stack stays Astro (no Vite fallback needed).
- **D-2 Playwright.** Node `playwright-core@1.63` with `executablePath` pointing at the cached
  `~/.cache/ms-playwright/chromium-1228` build (no browser download).
- **D-3 Skill names mapped.** The prompt's `design-taste-frontend`, `high-end-visual-design`,
  `redesign-existing-projects` and `full-output-enforcement` are installed here as `taste-skill`,
  `soft-skill`, `redesign-skill` and `output-skill`. Same content, different names; used those.
- **D-4 Machine limits.** 4 cores, 3 GB RAM: screenshots run one browser at a time.

### Asset verdicts (looked at every file; contact sheets in scratchpad)
| Asset | Verdict | Notes |
|---|---|---|
| `tariq-app/logo.png` 1888×843 | ✅ | Gold arrow + **cream** compass arc. The cream arc disappears on a cream page, so the mark is always shown on a graphite ground (never recoloured). → D-7 |
| Renders background | ✅ | Measured **rgb(58,62,68) = `#3A3E44`** on every edge (a few pixels are 59,63,68). The stage colour is `#3A3E44`, not `#3B3F44`. |
| `renders/persp, front, side, reload, bottom` | ✅ | Strong. Product fills only ~45% of the 1100 px frame, so crops are made in `prepare-media.sh`. |
| `renders/rear` | ✅ | Back panel with the **sealed bay** cover and no mount. The prompt's names are swapped: `rear` = sealed bay. |
| `renders/service` | ✅ | Back panel **with the pole-mount adapter** on top of the bay. |
| `renders/open` | ❌ skip | Exploded flat-lay with orange strips; reads as a CAD diagram, not premium. |
| `renders/scale` | ❌ skip | Tiny terminal beside a brown board; weak. |
| `renders/joint` | ❌ skip | Empty back shell. |
| `screens/idle, dest, tap, ok, ticket, ticket40` | ✅ | Real terminal UI. `idle` says "The path · Algiers transit". `pay.png` (card or phone) is also real and usable. |
| App screenshots | partly | `01_onboarding.png` prints **"One app. Six modes."** (a mode count) → not used. All have Android status + nav bars. `09_search.png` is really home. Mostly zero states → video stills preferred. |
| Demo video 0:00–0:11 | ❌ | Phone number, email, OTP notification (confirmed). |
| Demo video **0:13–0:18 and 1:58–1:59** | ⚠ redact | Home header shows **"BONJOUR, AYOUB"** and an "A" avatar. Not in the prompt's forbidden list. Any home clip gets the greeting and avatar removed (`delogo`) and is re-checked on a contact sheet of the encoded file. |
| Demo video 0:32–0:37 and **0:56** | ❌ | Profile with phone and display name; the profile reappears at 0:56 (display-name field). |
| Demo video 0:57–1:08 | ❌ | Top-up amount → Chargily page with name, email, phone. Safe again from the "top-up confirmed" screen. |
| Demo video 0:38–0:40 (rush hour) | ❌ skip | Shows a green "LIVE" badge; §4 forbids implying live data. |
| Demo video 0:44–0:54, 1:30–1:43 | ✅ | Tariq AI places near me, place cards, day plan, budget, reminders. |
| Demo video 1:17–1:29 | ❌ skip | New-plan form with the keyboard up. |
| Demo video 1:44–1:57 | ✅ | Route results (Fastest / Fewest transfers / Cheapest), map route, steps, trip complete, rating. |
| Demo video bars | measured | Status bar rows 0–27; system nav bar from ~y 922 (the app tab bar sits just above it). |
| Terminal film 854×480 | ✅ | Captions burned in; closes on the lockup + small print. Shown ≤ native width in a lightbox. |
| Vehicles (7 cut-outs) | ✅ | Good at ≤ 300 px. No ferry. |

- **D-5 Clip trims after checking every encoded clip's sheet.** Dropped the map pan (it zooms onto
  business names such as Caterpillar and SOFTAL that could read as partners). `route` starts at 1:47.4 (a keyboard
  frame before it), and `trip` starts at 1:54.0 (a transition frame). `ai-places` starts at 0:42.2, after the "LIVE" badge.
- **D-6 Pipeline bugs found and fixed.** ffmpeg inside `while read` ate stdin, so `-nostdin` was added. sharp resizes before
  it composites, so the face check image is now built in two steps. The union crop of the reveal renders was the full
  frame (the pole touches both edges), so the reveal uses a fixed 900 px square around the body.
- **D-7 Logo on dark only.** The mark's compass arc is cream (≈#F2EADB) and vanishes on paper. The header is
  graphite, and the icons put the mark on a graphite tile. It is trimmed of transparent margins, never recoloured.
- **D-8 Video autoplay attribute omitted.** Clips carry `muted loop playsinline preload="none"` and a poster;
  `site.ts` plays them through IntersectionObserver. Without `autoplay`, reduced-motion visitors truly get the
  poster only and nothing downloads off-screen.
- **D-9 Honest form state.** While `FORM_ENDPOINT` is empty, a valid submission says "Thank you. Nothing was sent
  yet." and explains that this preview is not connected. When an endpoint is set, it posts JSON and confirms, or
  shows a retry error.
- **D-10 claims-check scope.** It scans visible text plus alt/title/aria-label/placeholder/content/value, not CSS
  or class names (so "300ms" in CSS cannot trip the latency rule). Emails, `+213`, `mailto:` and `tel:` are also checked on
  the raw markup. Terminal media are detected by `data-terminal-media` or by render/screen file names.

## Phase 1 · Direction

- Skills used: `frontend-design:frontend-design`, `taste-skill`, `soft-skill`, `ui-ux-pro-max` (6 queries +
  2 extra font queries), and `redesign-skill` (audit only). `DESIGN.md` holds the result.
- **D-11 What was taken from ui-ux-pro-max:** the scroll-storytelling pattern's rules (the narrative must read without
  scroll effects, a static final state under reduced motion, pin at most 1–2 sections), the waitlist pattern's
  "no fabricated scarcity or counts", and the Astro "zero JS by default" guidance. **Rejected:** its palette (warm grey
  #78716C with amber CTA) and its Rubik/Nunito pairing, because §5's brand core wins, and its Arabic font picks (Qahiri
  is display-only 400; Almarai/Harmattan have no Latin sibling in the chosen system).
- **D-12 Type.** Mona Sans Variable (wdth 75–125) for Latin, IBM Plex Sans Arabic for Arabic. The reasons are in `DESIGN.md`.
- **D-14 Hero: direction A ("The stage")**, chosen by an independent `general-purpose` critic from 1440/390
  screenshots of `/lab/hero-a` and `/lab/hero-b` (`.shots/lab/`). Its three changes were applied; two suggestions were
  declined with reasons. Full text in `DESIGN.md` → Hero decision.
- **D-15 Lab bugs found before the comparison.** Astro 5 scopes styles with an attribute by default, so classes passed to
  child components did not match; set `scopedStyleStrategy: 'class'`. `.surface-slate` only set variables; surfaces
  now paint their own background. `html { scroll-behavior: smooth }` made the screenshot sweeps capture mid-scroll;
  `shoot.mjs` now scrolls with `behavior: 'instant'`.
- **D-16 Sticky stage for the ride, pin only for the terminal reveal.** The ride uses CSS `position: sticky` with
  per-step ScrollTriggers (no pin spacer and no scroll-jacking; the copy scrolls normally). The terminal reveal is the one
  GSAP `pin` + `scrub` moment (snap was removed in cycle 1). Which layout applies is decided in CSS (`.js` + ≥1024 px + no reduced motion),
  so switching layouts causes no layout shift.
- **D-17 Phase 2–3 built.** Tokens (`src/styles/tokens.css`, primitive → semantic → component) and base CSS;
  components: SiteHeader, SiteFooter, PhoneFrame, TerminalFace, SignedRecord, RecordFlow, RideSequence,
  TerminalReveal, ScreenFlow, ModesStrip, LeadForm, FilmLightbox. Pages: `/`, `/terminal`, `/app`, `/operators`,
  `/404`. The first production build passed, and claims-check passed on 7 pages (labs included).
- **D-18 Film poster** is a plain sized `<img>` from `public/media/film/`, not imported through astro:assets
  (importing from `public/` is unsupported). The ride's progress rail was moved out of the `<ol>` (invalid child).
- **D-19 Phase 3 fixes after the first full shoot.** `[hidden]` lost to `.btn { display }`; a white bento cell overrode
  its graphite surface (invisible text); a bare `figure` selector shrank nested phones; the film poster had a burned
  caption behind the play button (poster moved to 0:08.5); weak stills (a mostly-sea map, an empty AI welcome) were replaced.
- **D-13 Soft-skill rules not adopted.** Its "double-bezel on every card", eyebrow pills and "blur fade-up on every
  element" contradict frontend-design and taste-skill (eyebrow restraint, one reveal) and the prompt's motion
  grammar. Its motion-physics guidance is kept (custom easing, press feedback).

## Phase 4 · Cycles

### Cycle 1 (screens: `.shots/cycle-1/`)
- **SEE.** Build and claims-check passed. `shoot.mjs`: 20/20 runs clean (0 console errors, 0 failed requests, 0 overflow
  at 390). I scrolled home and /terminal live in Chrome at 1300 px: no console errors; the ride stage and the pinned
  reveal work. My own findings: at short laptop heights (593 px) the home headline ran to 5 lines with the CTAs below
  the fold, and the reveal's render overlapped its line.
- **CRITIQUE** (fresh `general-purpose` critic, sheets only):

  | Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
  |---|---|---|---|---|---|---|---|---|
  | 7 | 6 | 5 | 7 | 5 | 5 | 6 | 6 | 6 |

  Top problems: (1) the Ferry tile read as a placeholder, and reveal captures were mid-fade; (2) /terminal pinned frames showed
  a small object in a void, repeated a headline, and the header looked detached; (3) the renders don't look premium (flat grey
  label plate, white slab); (4) the ride pacing left panels 70% empty, faded steps stayed on screen for a whole viewport, and the operator timeline was thin;
  (5) Tariq AI place cards showed star ratings and review counts. Copy: a "service running today" tone ("keeps it working",
  "records reach"), a dated example record, and repeated lines.
- **FIX** (system level where possible):
  1. Modes are now **stops on the route line** (the site's one ornament); the ferry is the typographic terminus. I kept
     that instead of adding a picture, because no ferry image exists and stock is forbidden (founder TODO: a ferry photo).
  2. Ride: devices enlarged (face 66→80%, phone 25→29%); step height 58vh→40vh; inactive steps at 0.4; the operator
     state is now a full panel (flow with text) and the record moves up.
  3. Terminal reveal cut to **4 distinct beats** (persp, side, mount, connector) with tight crops. **Snap removed**: it
     moved the page after the user stopped (mild scroll-jacking) and caused the "detached header" in headless captures.
     Lines and frames are laid out from viewport height, so they never collide.
  4. Renders can't be re-rendered here (hard rule 2: no Blender/scripts in tariq-hardware). Mitigation: detail crops
     that frame the mount, the sealed bay and the connector without the grey label plate or the white slab. Logged as a
     founder TODO (final-quality renders).
  5. Ratings removed from every app visual: the day-plan clip is re-cut to 1:38.1–1:41.1 (3.0 s, shorter than the 4 s guide
     because the Casbah card with its rating returns at 1:41), the places clip is no longer used, and the casbah still was replaced by the day-plan still.
  6. Copy: "designed to be delivered as a service", "records are designed to reach the operator", "Example" tag on
     the signed record with no date, footer tagline no longer repeats "Every journey, accounted for.", the framing
     line enlarged and made concrete, the duplicate waitlist promise removed. Kept as-is: "Designed for the way Algeria moves." and
     "Sealed. Secure. Built to be trusted.". Both are founder-approved film lines (§4), so the critic's "generic" note is overruled.
  7. Reveal pattern shortened (0.9 s → 0.6 s, 16 px, starts at 94%) so content is never caught half-faded; small print 14→15 px;
     hero type sized with `min(vw, vh)`.

### Audit · web-design-guidelines (cycle 2, run on source + dist)
```
src/components/LeadForm.astro:81 - outline: none on the status focus target → focus-visible outline
src/components/LeadForm.astro:29 - email input missing spellcheck="false"
src/scripts/site.ts:95 - "Sending" → "Sending…"
src/styles/global.css - no touch-action: manipulation / -webkit-tap-highlight-color / color-scheme
src/components/FilmLightbox.astro:25 - dialog missing overscroll-behavior: contain
src/components/SiteHeader.astro:15, SiteFooter.astro:12, SignedRecord.astro:24 - brand/ID strings missing translate="no"
src/components/PhoneFrame.astro:23 - looping autoplay clips (>5 s total) had no pause control → added a 40 px toggle
✓ pass: transition-all, images without size, icon buttons without labels, labels on inputs, aria-live on errors,
  focus first error, reduced motion, heading order, skip link, theme-color, preload of the display font
Not applied, deliberately: Title Case headings and numerals-for-counts. The brand voice is sentence case, and the approved
film lines ("One tap.") are fixed copy. safe-area insets are not needed without viewport-fit=cover.
```
All fixed in source. They reach the build in cycle 3 (the cycle 2 shoot was already running on the previous build).

### Cycle 2 (screens: `.shots/cycle-2/`)
- **SEE.** Build and claims-check passed; `shoot.mjs` 20/20 clean. In live Chrome, the hero now fits a 593 px-tall viewport, the pause
  toggles work, and the modes route renders; no console errors. **Lighthouse (mobile, preview):** home **54** perf / 97 a11y /
  100 BP / 100 SEO (LCP 3.5 s, TBT 2,420 ms, CLS 0, 396 KB); /terminal **98**/100/100/100 (LCP 2.2 s, TBT 0).
- **CRITIQUE:**

  | Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
  |---|---|---|---|---|---|---|---|---|
  | 7 | 6 | 5 | 7 | 5 | 5 | 7 | 8 | 6 |

  Top problems: (1) renders presented badly: the terminal was small in the /terminal hero, a visible box sat around the renders, and the detail crops were blown up;
  (2) the film poster caption collided with the Play button (already fixed in the build the critic didn't see: poster at 1:03);
  (3) modes: cut-out sizes mismatched, the line broke during the per-stop reveal, and "Ferry" was printed twice; (4) dead bands, 4 background
  tones, and faded ride steps at ~2:1 contrast; (5) home hero: the phone still clipped the fare list. Copy: present-tense guarantees ("signs
  it", "see the service"), "rail" instead of the app's "train", "Alerts that matter.", and repetition of "Every journey, accounted for." and
  "Installed and maintained by Tariq.".
- **FIX:**
  1. **Render seam.** The renders are baked on `#3A3E44`, but lossy WebP shifts the flat background slightly, so a box showed.
     Added `.render-fade` (radial edge mask) and `.render-fade-rect` for the wide connector view: no seam at any encoding.
     Reveal frames are now ~116% of the stage area (the object is about 2× larger); the detail crop is capped at 460 px (≈ native).
  2. **Hero overlap: root cause was CSS specificity.** A component's own `width: 100%` and the page's `width: 69%` tied,
     and load order let the component win. Component base sizing now sits in `:where()` (zero specificity) in PhoneFrame,
     TerminalFace and SignedRecord. The hero is recomposed as two objects with no overlap (the phone plans, the terminal takes the tap).
  3. **Rhythm and contrast, system level.** `--section-pad` 88–168 → 64–120 px; the alternate paper tone `#EFEAE1` was removed
     (paper, slate, graphite only); inactive ride steps now change colour (6.6:1) instead of opacity; dark-form field borders
     rise from 30% to 55%. The framing section is now two statements side by side ("For riders" / "For operators").
  4. **Modes.** The whole route reveals as one piece (no broken line); the terminus shows "Ferry" once (screen readers
     still get the name); per-vehicle scale evens out the cut-outs (ETUSA ×1.45).
  5. **Copy.** "designed to sign", "designed to turn every tap into a signed record", trains instead of rail everywhere,
     "Trip alerts, disruptions, low balance.", "Plan the trip. Pay the fare.", "Nobody boarded, or the terminal was off?",
     "Delivered as a service." (so "Installed and maintained by Tariq." now appears once as a heading, on /terminal), ride step 6
     "On the operator's side.", mobile ride uses the full flow diagram, AI phones sit beside the copy.
  6. **Performance.** Home's cost was style and layout (4.4 s), plus repeated ScrollTrigger refreshes: ~40 batch reveal triggers,
     an extra refresh on `fonts.ready`, and `text-wrap: pretty` on every paragraph. **D-20:** the one reveal pattern is now an
     IntersectionObserver plus a CSS transition (same 0.6 s / 16 px / 60 ms stagger), so GSAP loads only where a signature moment
     lives (home ride, terminal reveal). `pretty` was dropped from body copy (headings keep `balance`), and the hero face image gets
     `fetchpriority="high"`.
  7. **Measured after fix 6:** Lighthouse home (mobile) **94** perf / 97 / 100 / 100. TBT 2,420 → **100 ms**, main-thread style and layout
     4.4 s → 1.0 s, CLS 0. LCP was still **3.0 s** (element: the hero terminal face), so the page now preloads that image's
     exact responsive variants (`getImage` with the same widths, `imagesrcset`/`imagesizes`, `fetchpriority="high"`). The build checks
     that the preload `imagesrcset` equals the rendered `<img srcset>`.
- **D-21 Memory limit hit.** The combined "Lighthouse → shoot" background run was killed by the system for low memory (3.8 GB
  total; the user's Chrome holds ~0.9 GB). The Astro dev server was stopped (not needed; the preview serves `dist/`), and
  heavy steps now run strictly one at a time: build, then shoot, then Lighthouse.
- **D-22 Pipeline pruned.** `prepare-images.mjs` now writes only what ships (tight persp/side/reload, three detail
  crops, face, six screens, mark, icons, OG). A re-run reproduced every shipped file byte for byte (md5).
- **D-23 The overflow check was fooled; real overflow found.** Under Playwright's `isMobile: true`, Chrome widens the layout
  viewport to fit overflowing content, so `scrollWidth === innerWidth` (e.g. 413/413) passed pages that overflowed 390 px.
  Every earlier "0 overflow at 390" result is therefore **withdrawn**. `shoot.mjs` now compares against the configured
  viewport width (390), also fails when `innerWidth` exceeds it, and names the outermost offending elements. A probe on the
  cycle 2 build found **/terminal overflowing by 22 px**: the stacked reveal frame was set to `min(112%, 600px)` with
  `max-width: none` in cycle 2. Fixed to `min(100%, 600px)`. Home showed 395 px in the killed cycle 3 run only after the sweep
  had scrolled; that is still open and gets named by the fixed shoot.
- **D-24 Shoot runs one page per process** (`--pages` per invocation, results merged into one `report.json`) with
  low-memory Chromium flags (`--disable-dev-shm-usage --disable-gpu --renderer-process-limit=1`), after two runs were
  killed by the system for low memory.

### Cycle 3 · SEE (screens: `.shots/cycle-3/`)
- Build and claims-check passed. With the corrected overflow check, `shoot.mjs` (one page per process) passed 18/20 runs: 0 console
  errors, 0 failed requests, 0 HTTP errors, and no missing alt/size on every page. /terminal is now 390/390/390 (the D-23 fix holds).
- **The corrected check named a real overflow on home at 390 px:** `img.stop__img` right edge at 395 px. On the mobile
  (vertical) route the cut-out is right-aligned, but its per-vehicle scale (ETUSA ×1.45) grew from bottom-centre, so
  half the growth went past the edge. It appears only once the lazy image has loaded during the sweep, so the no-scroll probe
  missed it. Fix: on mobile, `transform-origin: bottom right` (growth goes left, inside the art box). Home was re-shot.
- **My own read of the final cycle 3 sheets (terminal, app, operators), before the critic:**
  - Cycle 2 fixes landed: no render box, the reveal object about twice as large, AI phones beside the copy, operator sections tight.
  - **New defect from fix 1 of cycle 2:** the radial `.render-fade` turns the two detail crops (mount, sealed bay) into a
    soft dark disc on the slate. Those crops are product edge to edge, with no slate margin to fade into. They are now rounded
    close-up tiles (`.render-tile`); the fade stays only on renders with slate margin (persp, side, and the wide connector view).
  - **Leftover widow:** the /operators hero broke as "accounted / for." because of an 11ch cap; raised to 14ch.
  - Both are edited in source and ship with the cycle 3 fixes.
- **Cycle 3 SEE closed.** Home was re-shot after the mobile cut-out fix: `/` is 390/390/390, 0 problems. `.shots/cycle-3/report.json`
  now holds **20/20 clean runs** (5 pages × desktop/mobile × normal/reduced motion) under the corrected overflow check: 0 console errors,
  0 page errors, 0 failed requests, 0 HTTP ≥ 400, 0 overflow at 390 px, no images missing alt or intrinsic size, and every page has a title and a description.
  Sent to a fresh critic; Lighthouse was re-run on home for the LCP preload.
- **Lighthouse home (mobile) after the LCP preload:** **91** perf / 97 a11y / 100 BP / 100 SEO; TBT 40 ms, CLS 0, FCP 1.7 s, 391 KB.
  **LCP 3.3 s: still over the 2.5 s budget.** The preload did not move it (3.0 s before; the difference is within throttling noise). The LCP
  element is still the hero terminal face. Under the simulated slow 4G it competes with other early downloads: the eager
  screen image on its glass, the ticket, the phone poster, and three font files (Mona Sans, plus two Arabic weights that load
  because the cities section contains Arabic text). This is carried into the cycle 3 FIX step.
- **The cycle 3 critic's first run failed** (session rate limit, HTTP 429), so it returned no scores. It was retried on the same
  unchanged `.shots/cycle-3/` after the limit reset.
- **D-25 LCP diagnosis: render delay, not download.** From the Lighthouse network timeline and LCP phases: the hero face image
  is 14 KB, High priority, starts at 38 ms (the preload works; the "prioritize LCP image" audit passes), and loads in 458 ms, while
  **Render Delay is 2,403 ms**. The image waits for the first style and layout pass over the whole ~10,000 px page (the mobile ride's static
  visuals, the route, cities, forms, footer), plus ~470 ms of two render-blocking stylesheets. Fixes:
  (1) `build.inlineStylesheets: 'always'`, so no stylesheet request blocks the first paint;
  (2) a `.cv` utility (`content-visibility: auto` + `contain-intrinsic-size: auto <estimate>`) on home's modes, cities and join
  sections and on the footer of every page, plus the ride below 1024 px and under reduced motion. Deliberately **not** on anything
  GSAP measures (the desktop ride, the terminal reveal) or above them (trigger positions depend on it), and not on the film section,
  which owns a modal `<dialog>`. Verified on separate shots (`.shots/verify-3/`) so the critic's cycle 3 input stays unchanged.

### Cycle 3 · CRITIQUE (retried critic, `.shots/cycle-3/`)

| Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 7 | 6 | 6 | 8 | 6 | 6 | 6 | 8 | 7 |

Top problems: (1) modes: the cut-out photos differ in angle, light and scale, the cable car has jagged edges, and the ferry still reads as a missing image;
(2) /terminal: the back-view close-up under a vignette and a flat grey connector disc read as CAD placeholders; (3) the ride stage was out of step with
reading position (step 1 paired with the terminal) and had dead space between steps; (4) home too long, and the operator timeline repeated /operators;
(5) /app wallet: the headline was detached from its copy and devices were cropped mid-screen. Copy/honesty: the app's "Unlock higher limits … 50,000 DA" banner was
visible in the wallet visuals; the green check on the example record looked verified; "Non-touch. The rider chooses on screen" contradicted itself;
the GNSS gloss edged toward a tracking claim; operator tools were in present tense; "when Tariq opens in your city" implied a launch.

### Cycle 3 · FIX
- **Measured first (performance):** LCP fixes from D-25 → Lighthouse home **96** / 97 / 100 / 100, **LCP 3.3 → 2.7 s**, TBT 30 ms,
  CLS 0, FCP 1.2 s; render delay 2,403 → 1,965 ms. Still 0.2 s over budget, so diagnosis continues from the trace.
1. **Modes → one icon set (D-26).** All eight modes are drawn in one line-icon style (Lucide, ISC licence, inlined at build, no runtime JS) on
   the gold route line, in one row with one baseline. This finally handles the missing ferry photo honestly: nothing is photographic, so nothing
   is missing. The vehicle cut-outs are retired from the site (founder TODO: a consistent photographed set, including a ferry).
2. **Terminal reveal rebuilt from the three strongest renders:** angle view, front face and side profile. The back-view close-up and the flat
   connector disc are out of the reveal. "One connection. Nothing exposed." now lives in the details list. The details heading became "The details." so
   "Everything it needs. Nothing it doesn't." is used once. More space above stacked frames on mobile (the pole ran up behind the subhead).
3. **Ride timing:** each step owns the stage while its centre is past the viewport centre (`top center` → `bottom center`, was 55%).
   Step spacing is 28vh/6vh (was 38vh/9vh), with extra room after the last step so the operator state can be read.
4. **Home length:** cities merged into the waitlist block. **Declined with reasons:** cutting "Plan the trip. Pay the fare." and the ride's
   record → operator ending. The brief requires the app section with real clips and a ride that ends with "the signed record reaches the operator".
5. **App wallet:** one whole device beside its copy; bento phones shown whole (no mid-screen crop).
6. **Honesty/copy:** the wallet still and the top-up clip (limits banner) are retired, and only the top-up-confirmed screen (1:10.6) is used. The record's
   green check is removed ("Signed by the terminal" stays, in muted text, under the "Example" tag). "Non-touch. Destinations and the fare are shown
   before the tap." "Mobile network and satellite positioning, built in." Operator tools say "Designed to…". "One email when the app is ready."
   The framing lead is now concrete. Ride step 3: "A card or a phone, at the gold ring." The menu icon stroke went from 1.5 to 2 px.
   **Kept, with reasons:** the hero line (the brief asks for what Tariq is in one line); the /terminal reveal stays centred (Apple product-page
   staging, the one centred signature moment); the film stays ≤ 854 px (native-width rule); small print measures 6.6:1 on paper and 6.1:1 on slate.
- **D-27 LCP diagnosis, round 2 (Lighthouse home v4 trace).** After D-25, script evaluation was the largest main-thread item
  (431 ms simulated), and the 45 KB (gzip) GSAP + ScrollTrigger chunk was requested at High priority 121 ms into the load. On a phone
  none of it runs, because both signature moments are gated to ≥ 1024 px with motion allowed. Every clip poster and the lightbox's
  film poster also loaded immediately (a `<video poster>` cannot lazy-load), competing with the hero on the simulated network. Fixes:
  (1) `ride.ts` and `terminal-reveal.ts` import GSAP **on demand**, only when that same media query matches (and again if it starts
  matching later); (2) each clip poster is now a native `loading="lazy"` `<img>` behind its video. A video with no data paints
  nothing, so the image shows through, and once playing, the video's frames cover it. This works without JS and under reduced motion. The film
  poster is set only when the lightbox opens. (3) The sequence scripts gained `export {}` so they are type-checked as
  modules. Added a behaviour verifier (scratchpad `verify.mjs`) to the pipeline run: on mobile, GSAP must never be requested, 8
  mode icons must render, and the clip posters must load once scrolled to; on desktop, GSAP must load and the ride stage must step
  plan → dest → tap → ok → record → operator in order; and the /terminal reveal must pin.
- **D-28 Retired assets.** The vehicle cut-outs (replaced by the icon set), the service/bottom detail crops (reveal rebuilt), the top-up clip and
  the wallet still (limits banner) were all removed, along with their pipeline steps. The top-up-confirmed still (1:10.6) was added.

### Cycle 4 · SEE (screens: `.shots/cycle-4/`)
- Media regenerated (retired assets removed), build and claims-check passed. **Behaviour verifier: 5/6.** On mobile, home never requested GSAP,
  and all 8 mode icons rendered. On desktop, GSAP loaded on demand, the ride stage stepped plan → dest → tap → ok → record → operator in order, and the
  /terminal reveal pinned. **The one failure:** on mobile home, only 3 of 4 clip posters had loaded after a full scroll. The cause is under investigation (suspected: the
  desktop ride-stage phone, which is `display: none` on mobile, so its lazy image never loads).
- **Correction:** the pipeline run used `set -e`, but the shoot still ran after the verifier's failure. The verifier's exit code does not gate
  the shoot as intended, and its failure was only visible in the output.
- `shoot.mjs` (one page per process): **20/20 clean runs**. 0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow at 390 px,
  no images missing alt or size. Home is shorter: desktop 8,307 → 6,799 px, mobile 10,753 → 9,920 px.
- **The poster "failure" was a verifier bug.** The one unloaded poster is the desktop ride stage's phone, hidden by `.ride__stage { display: none }`
  on mobile. A lazy image in a hidden container is never fetched, which is the intended behaviour. All 3 rendered posters loaded. The
  verifier now counts only posters with no `display: none` ancestor.
- **Why `set -e` did not gate the shoot:** the tool runs each command inside a wrapping `&&` list, and bash ignores errexit within such
  lists. Pipeline chains now gate explicitly (`|| exit 1`) instead of relying on `set -e`.
- **Lighthouse home (mobile) after D-27: 99 performance / 97 accessibility / 100 best practices / 100 SEO.** LCP **2.1 s** (budget 2.5 s), TBT 70 ms, CLS 0,
  FCP 1.1 s, total weight 391 → **265 KB**; script evaluation 431 → 122 ms; render delay 1,965 → 1,307 ms. **Every home budget is now met.**
  The remaining pages are measured next, because the budgets must hold everywhere.
- **Home's only accessibility failure (Lighthouse 97):** `color-contrast` on the signed record's "Example" tag, gold-deep `#8A6A36`
  on gold tint `#EFE5D3` = 4.0:1 at 13 px (needs 4.5:1). The /terminal screen-flow step numbers use the same pairing. Fixed at token level:
  new primitive `--c-gold-ink #6F5428` (5.7:1 on the tint) for gold text on gold tints, used in both places. Ships with the cycle 4 fixes.

### Cycle 4 · CRITIQUE (`.shots/cycle-4/`)

| Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 7 | 6 | 5 | 7 | 6 | 5 | 6 | 8 | 6 |

Fresh critics vary by about ±1 per category between cycles (cycle 3 gave type 8 and a11y 7 on a very similar build), so one-point dips are
noise. **Product visuals (5) is the persistent problem.** Top problems: (1) ride steps 4–6 share one frame and the record never visibly *reaches*
the operator; (2) the hero has two small objects, the phone is ~180 px with unreadable UI, the H1 names no product, and the pause button sits on the device;
(3) renders look soft and upscaled, the side view is dark on dark, the sealed bay is a black square; (4) /app: near-blank AI screen, cards
mostly empty, devices cropped; (5) dead space, and home repeats /app and /operators (mobile ~30 screens). Copy: negative framing lines;
limp or passive record lines; "made for buses…" implies deployment; "puts every tap on the record" reads as installed; the footer
link reads like a form label; the metro and train icons read as faces.

### Cycle 4 · FIX
1. **Ride ending:** in the operator state the record card travels down the gold line and lands on the "Operator view" node
   (`translate` + `scale`, transforms only). That node lights gold. No invented operator dashboard: the brief forbids fake dashboards and
   this shows the flow honestly. The small print moved inside the sticky stage, so it no longer strands below the steps.
2. **Hero:** H1 is "The rider app and the on-board terminal for public transit." (names both products and says what Tariq is). The sub says
   "designed to go on the record". The phone is 26.5 → 31% of the frame and the terminal 69 → 64%, with no overlap. **Declined:** "one object, move
   the phone out". The brief requires the app and the terminal together in the hero. The pause control is now 34 px and 60% opacity,
   inside the bezel corner. It stays per clip because WCAG 2.2.2 needs a pause mechanism for loops longer than 5 s.
3. **Renders:** every render is capped at its native pixel size (`max-width`/`max-height` from the image metadata), which removes the upscaling
   softness. Frames that don't read at a glance were cut: the side view (dark on dark) and the sealed-bay close-up (black square). The reveal is now
   angle → front face → paper reload, which also removes the separate reload section. "Sealed. Secure. Built to be trusted." heads the details
   list with its line underneath.
4. **Home length (D-29, site plan refinement; §9 is a "starting proposal"):** the separate problem-framing section is removed (its two
   negative lines go with it; the ride head "One ride, from the plan to the proof." frames the story). **Declined:** removing the app section
   and the ride's record → operator ending. Both are brief requirements. /operators folds "Delivered as a service" into the contact column.
5. **/app:** the AI section shows one phone (the day-plan clip); the near-blank welcome still only appears behind the hero phone; bento phones
   are larger with tighter cards; "Amounts shown come from a demo account. Fares are illustrative." sits beside the wallet.
6. **Copy:** "Designed to reach the operator, as proof of the service that ran." "The terminal is designed to sign each record, so it
   can stand as proof." "So a count of zero can be told apart from a terminal that was off." (the brief's own wording). "designed for buses,
   trams, the metro, trains and ferries". Footer: "Contact for operators and cities". Screen-flow step numbers are 32 px.
   **Declined:** "See departures near you" → "designed to show". §4 gives exactly that phrasing as the correct way to describe
   app features. Inactive ride steps at "~40%" would undo the cycle 2 contrast fix (they are 6.6:1 by colour). "~12 px small print" is
   mismeasured: it is 15 px, and mist on graphite is about 10:1.
7. **Pipeline:** side-tight, rear-detail and the day-plan still are no longer produced.
- **Lighthouse (mobile) on the remaining pages, cycle 4 build:**

  | Page | Perf | A11y | BP | SEO | LCP | CLS | TBT | Weight |
  |---|---|---|---|---|---|---|---|---|
  | / | 99 | 97 | 100 | 100 | 2.1 s | 0 | 70 ms | 265 KB |
  | /terminal | 99 | 100 | 100 | 100 | 2.0 s | 0 | 30 ms | 208 KB |
  | /app | 98 | 100 | 100 | 100 | 2.3 s | 0 | 0 ms | 396 KB |
  | /operators | 100 | 97 | 100 | 100 | 1.7 s | 0 | 30 ms | 148 KB |
  | /404 | 100 | 100 | 100 | 69 | 1.7 s | 0 | 0 ms | 158 KB |

  - **/operators 97:** the same `color-contrast` failure as home, the "Example" tag on the signed record (4.0:1). The `--c-gold-ink` fix is in
    source and is confirmed in the cycle 5 build.
  - **/404 SEO 69 is an intended exception (D-30).** Its only failing SEO audit is `is-crawlable`, because the page carries
    `<meta name="robots" content="noindex">`. A not-found page must not be indexed. The HTTP status audit and every other SEO audit pass.
    The SEO ≥ 95 budget is met on every indexable page (all 100), and the 404 keeps `noindex` on purpose.

### Cycle 5 · SEE (screens: `.shots/cycle-5/`)
- Chain with explicit stop gates (no reliance on `set -e`): pruned media pipeline ✓; no page references a removed asset ✓; build ✓;
  claims-check 7/7 ✓. **Behaviour verifier 6/6:** mobile home never requests GSAP, 8 mode icons, 3/3 visible clip posters loaded; desktop GSAP loads
  on demand; ride states plan → dest → tap → ok → record → operator; /terminal reveal pinned.
- `shoot.mjs` **20/20 clean** (0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow at 390 px, no images missing alt or size).
  Shorter pages: home desktop 6,799 → 6,257 px and mobile 9,920 → 9,448 px; /terminal desktop 7,179 → 5,875 px; /operators desktop 4,105 → 3,568 px.
- **Lighthouse (mobile):** /operators **100/100/100/100** (the `--c-gold-ink` contrast fix is confirmed), LCP 1.7 s; home **98/100/100/100**,
  LCP 2.3 s, CLS 0, TBT 40 ms. With the cycle 4 numbers for /terminal (99/100/100/100), /app (98/100/100/100) and /404 (100/100/100/69, intended
  `noindex`, D-30), every budget holds on every indexable page.
- **web-design-guidelines audit:** it was due in cycle 4 and was missed there, so it was re-run in cycle 5 over the code added since cycle 2 (the results follow in this log).
- The cycle 5 critic's prompt now quotes two brief rules verbatim: the hero must show the app and the terminal together, and features are phrased
  as what the app does ("See departures near you"). The cycle 4 critic had demanded changes that contradicted both.
- **Audit · web-design-guidelines (catch-up for cycle 4, run in cycle 5 over source and `dist/`):**
  ```
  ✓ pass: no `transition: all`; no `outline: none`; every <img> has width and height (0 missing on 5 pages); icon-only buttons
    carry screen-reader text (pause toggle, menu, lightbox close); decorative SVGs aria-hidden (Lucide icons via icon());
    keyframes only inside motion-allowed media queries (ride ring, lightbox entry); email input autocomplete="email" and
    spellcheck="false"; heading order valid on every page; skip link, lang="en", theme-color, color-scheme present
  ✓ false positives, checked: "1 <img> without alt per page" is the header mark, rendered by Astro as a bare `alt`
    attribute (= empty alt, decorative; the link carries aria-label="Tariq home"), and `shoot.mjs`'s DOM check also passes.
    "color-scheme missing" was a grep for "color-scheme: light"; the inlined, minified CSS has color-scheme:light.
  ```
- **My own read of the cycle 5 sheets:** the hero now names both products and the phone is larger; the ride's step 1 correctly pairs with the
  phone; modes use distinct icons (van, side-view train); /app has one phone per card, the demo-amounts note and the AI phone beside its
  copy. **Two defects, fixed in source, shipping with the cycle 5 fixes:** (1) the hero headline broke as "on- / board", so "on-board" is now
  kept together (`.nowrap`); (2) in the ride's operator state the landed record card sat **under** the flow panel (z-index 2 vs 3),
  so the "record reaches the operator" moment was invisible. The card now rises above it (z-index 5) when it lands.

### Cycle 5 · CRITIQUE (`.shots/cycle-5/`)

| Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 6 | 5 | 6 | 7 | 5 | 6 | 6 | 7 | 6 |

Five cycles in, the scores oscillate between 5 and 8 instead of climbing. Each fresh critic re-weighs the same trade-offs, sometimes in
opposite directions (cycle 2 wanted the phone away from the terminal; cycle 5 wants them overlapping). This cycle therefore targets complaints
that **recur across critics** and fixes them at system level. Top problems: (1) the hero's app and terminal "not in one frame",
illegible phone, phone below the fold on mobile; (2) clips too small, pause buttons on the devices look buggy, near-blank AI screen, cropped phones;
(3) the ride ending doesn't land, repeats the /operators diagram, and frames are caught mid-fade; (4) dead space above "Sealed" and before the modes, a heading
off the grid, uneven spec rows; (5) forms imply a reply or email while nothing is sent. Copy: flat H1, "tap" twice, "Line 12, bus", a demo
"Duration 1 min", the Arabic claim not matching its visual, tram and train icons alike, "Meet the Tariq terminal." used twice, and "a minute and a half" (the film is 1:24).

### Cycle 5 · FIX
1. **D-31 Clips play once (≤ 5 s) per view; no loop, no pause buttons.** Pause buttons on the devices were flagged in cycles 4 and 5.
   They only existed because the clips looped (WCAG 2.2.2). The same criterion exempts automatically started motion that lasts ≤ 5 s,
   so every clip is trimmed to ≤ 5 s (route 5.8 → 5.0 s; trip re-cut to the rating screen, 3.0 s) and plays once when it scrolls into
   view, replaying only after leaving and returning. It stops on its last frame. **Deviation from the brief's `loop`, logged here:** looping would
   require an on-device control that two critics read as a defect.
2. **D-32 Modes are a typographic line diagram.** Icons were flagged three times (hooded faces; tram, train and bus alike). There is still
   no ferry photo. Each mode is now a named station on the gold route line, which is honest, consistent and on-concept ("the path"). `lucide-static` is removed.
3. **Hero:** H1 "Plan in the app. Tap on board."; the subline defines Tariq ("a passenger app and an on-board terminal for public transit, designed in
   Algeria to put every journey on the record"). One composed frame: the phone overlaps only the terminal's left bezel (never the screen), with a shared
   floor shadow (the render's slate edge is masked so the shadow shows no seam). On mobile, both objects sit above the fold. **Declined:** a
   phone large enough to read in the hero, because the brief's composed app-and-terminal frame caps its size. Legible UI is on the app section
   (front phone 38 → 46%) and on /app (phones up to 360 px).
4. **Ride ending:** the repeated diagram is gone from home. The record card flies into an "Operator view" destination on the stage.
   Mobile step 6 shows the same destination. Stage transitions went from 0.9 s to 0.5 s so a frame 600 ms after a scroll is settled. The last step's extra
   bottom padding went from 30vh to 12vh (it caused the gap before the modes).
5. **Rhythm:** "Installed and maintained by Tariq." is back on the grid (a `max-width` on the container itself was centring it); the specs
   are one tighter two-column list; the details section follows the screen flow with no second top padding.
6. **/app:** the map still replaces the near-blank AI welcome behind the hero phone; one phone per section (the departures section has the home still at
   up to 360 px); bento cards show whole devices; "Choose English or العربية on the first screen." matches the visual.
7. **Honesty/copy:** while `FORM_ENDPOINT` is empty, every form says beside its button: "Preview: this form is not connected yet, so
   nothing you enter is sent." (built from the same constant, so it disappears once connected). "Service: Bus, line 12". "So you can
   tell an empty route from a switched-off terminal." "Designed to warn riders about line suspensions, delays and service changes."
   The home terminal section uses "Designed for the way Algeria moves." so "Meet the Tariq terminal." stays unique to /terminal.
   "A short film" replaces "a minute and a half". Small print weight is 460.
   **Declined:** present-tense app features ("Home shows what leaves close by…"), which follow §4's own example.
- **Clip re-cuts for D-31, before any shots:** route 1:47.4–1:52.4 (5.0 s, 171 KB mp4); trip 1:55.9–1:58.5 (2.6 s, 42 KB). The trip clip
  was first set to end at 1:58.9, then pulled back to **1:58.5**, inside frames already confirmed clean, because the account greeting returns on the
  home screen at ~1:59.5 and nothing between 1:58.1 and 1:59.5 had been inspected. Both encoded clips' check sheets were viewed
  before the build (`.shots/media-check/clip-{trip,route}.png`). `lucide-static` was uninstalled (no references remain).

### Cycle 6 · SEE (screens: `.shots/cycle-6/`)
- Gated chain: verifier updated ✓; every clip ≤ 5 s (ai-dayplan 3.0, home 4.6, route 5.0, trip 2.6) ✓; build ✓; claims-check 7/7 ✓;
  the form preview note appears on home, app and operators ✓; no leftover icon or pause-toggle markup ✓. **Behaviour verifier 7/7:** on mobile, GSAP is never
  requested, there are 8 typographic mode stops and 0 icons, 0 pause buttons and 0 looping videos, and 3/3 visible posters loaded; on desktop, GSAP loads on demand, the ride
  steps plan → dest → tap → ok → record → operator, and /terminal pins.
- `shoot.mjs` **20/20 clean** (0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow at 390 px). Home: desktop 6,257 → 6,144 px,
  mobile 9,448 → 8,800 px.
- **The run was killed for low memory a third time**, during the final Lighthouse step and after every shot had been written (`report.json`
  says "OK: 0 problem(s)"). Nothing had to be redone except Lighthouse, which was re-run alone. With about 1.1 GB free while the user's
  browser and other sessions are open, Lighthouse now always runs as its own step.
- **My own read of cycle 6 at full size:** the hero is right on both viewports (desktop: the phone overlaps only the terminal's left bezel,
  on a shared floor shadow; mobile: both objects sit above the fold, and the phone stays clear of the screen). The modes line diagram and the form
  preview note render as intended. **One defect:** in the ride's operator state the landed record card sat over the "Operator view"
  label (card centred 230 px below the stage centre; the pill's top is ~618 px of a 720 px stage), and the terminal was pushed up under the
  header. Fixed in source: the card lands 150 px below centre (clear above the pill), and the terminal holds at −58% / 0.62. This ships with
  the cycle 6 fixes.
- **Lighthouse home (mobile), cycle 6 build:** 97 / 100 / 100 / 100, CLS 0, TBT 100 ms, but **LCP 2,489 ms** (budget < 2.5 s: passed by
  11 ms) and weight 265 → 396 KB. **Cause, from comparing the network timelines of cycle 4 and cycle 6:** cycle 5 moved the mobile hero
  phone above the fold, so its clip is now in view at load. The IntersectionObserver starts it immediately, and `home.webm` (99 KB) is
  fetched at 366 ms, in the middle of the LCP window. Render delay rose 1,307 → 1,571 ms, and the poster image became High priority. The fonts
  (141 KB) did not change. **Fix (D-33):** clips are only observed after the window `load` event plus one idle callback (≤ 1.5 s), so no clip
  video can compete with the hero image. The first play happens a moment later, with its poster showing until then. Ships with the cycle 6 fixes and is
  re-measured in cycle 7.

### Cycle 6 · CRITIQUE (`.shots/cycle-6/`)

| Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 8 | 6 | 7 | 7 | 6 | 6 | 7 | 8 | 6 |

The best cycle so far: clarity and honesty reach 8 for the first time, and product visuals and mobile reach 7. Top problems: (1) the ride ending was
broken (the card sat on the "Operator view" label, and the mobile panel held only a line and a pill); (2) /app pacing: dead bands, clips caught on empty
frames, splash screen used for the language claim; (3) /operators: the record card covered the gold tap ring, and the tools were text only; (4) the desktop
hero headline wrapped as "Plan in the / app. Tap / on board." and the hero ended above the fold; (5) /terminal seams: a widowed
"Algeria.", small print floating on cream under the dark card, different greys for the film and install sections; on home, "Bus" appeared twice. Copy: the
repeated modes list read as a deployment claim; "put every journey on the record" sounded like surveillance to riders; clumsy record lines;
"Home shows"; "Preview:" looked like a staging banner; four names for the operator CTA; no demo caption on app frames.

### Cycle 6 · FIX
1. **Ride ending:** in the operator state the terminal dims and steps back. The full-size record card lands under an "Operator view" label,
   joined by a gold line, so no label overlaps. Mobile step 6 shows label → line → card. Step 6 body: "Every journey, accounted for."
   (approved line). **Declined:** a typeset list of example records. The brief forbids fake dashboard screenshots, and invented records would be one.
2. **/app:** section spacing is 70% of the site default on this page; the trip clip's poster is taken at 1.4 s (five stars) instead of
   0.8 s (empty stars); the Arabic display word is smaller; "Nearby departures, your wallet and your recent trips, on one screen."; hero caption "App
   screens come from a demo recording." **Declined:** the language-choice screen. Its only source (`01_onboarding.png`) prints "Six modes", a
   mode count that §4 forbids.
3. **/operators:** the terminal is 62% of the frame and the record card 40%, beside it and clear of the gold ring. **Declined:** tools linked to record IDs
   (the same fake-data concern as in item 1).
4. **Desktop hero:** the headline breaks exactly as "Plan in the app." / "Tap on board." (two block lines, no wrap); the grid is 6/6; the hero fills
   the first screen (min-height 100svh − header, capped at 900 px). The subline ends at "designed in Algeria."
5. **/terminal:** the reveal subtitles are balanced; the screen flow's small print sits inside its slate card; the install section uses the same slate
   as the film section. Home modes: one stop, "Bus · ETUSA and private lines" (7 stops).
6. **Copy:** the modes lists were removed from the home terminal section, the /terminal close and the /operators contact intro; the details lead uses "Every tap, on the record.";
   one label for operator contact links, "Talk to us" (the form's submit stays "Send message", which names its action); the form note is "This form doesn't
   send anything yet."; "App screens come from a demo recording." on the home hero, the home app section and the /app hero.
   **Kept, with reasons:** one reveal pattern on content blocks (the brief's motion grammar mandates it); the centred /terminal reveal
   headlines (Apple-style staging for the one pinned moment, logged in cycle 3).

### Cycle 7 · SEE (screens: `.shots/cycle-7/`)
- Gated chain: clips re-encoded (the trip poster at +1.4 s), every clip ≤ 5 s ✓; build ✓; claims-check 7/7 ✓; the form note ("send anything yet") on home,
  app and operators ✓; no leftover modes lists ✓; demo caption on home ✓. **Behaviour verifier 7/7** (now 7 typographic mode stops).
- `shoot.mjs` **20/20 clean** (0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow at 390 px). /operators desktop 3,601 → 3,427 px
  (the card now sits beside the terminal). Home desktop grows 6,144 → 6,266 px because the hero fills the first screen.
- Lighthouse was run alone on this build (results follow), and the cycle 7 critic was started on these shots.
- **Lighthouse home (mobile), cycle 7 build:** **98 / 100 / 100 / 100**, **LCP 2,420 ms** (was 2,489 ms), CLS 0, TBT 60 ms, 363 KB.
  With D-33 the hero clip is still fetched, but only after load, so it no longer extends the LCP render delay. The home budget is met.
- **My own full-size check of cycle 7:** the desktop hero is right ("Plan in the app." / "Tap on board." on two lines, filling the first screen).
  **Defect in the ride ending (`home/desktop/sweep-04`):** at step 6 the stage is correctly in its operator state (step 6's text is
  active and the terminal has dimmed and stepped back), but the stage has already scrolled out of its sticky range. The "Operator view" label,
  anchored at 8% from the stage top, is above the viewport. **Cause:** cycle 5 cut the last step's bottom padding from 30vh to 12vh, which ends the
  sticky range before step 6 is read. **Fix (in source, ships with the cycle 7 fixes):** the label is anchored to the landed card
  (`top: calc(50% − 250px)`, just above the card) instead of the stage top, and the last step's padding is 24vh, a middle value so the label shows without
  bringing back the gap the cycle 5 critic flagged.
- **The ride-ending fix was measured, and the first attempt failed.** A targeted Playwright check scrolls step 6 to the viewport centre and
  measures the label, the card and the stage. At 1440×900: state `operator` ✓, card 141–490 px ✓ (in view, below the header), label 26–77 px ✗ (under
  the 68 px header). At 1280×720 the label was at −26–26 px ✗. Anchoring the label to the card worked (no overlap; the label sits directly above the card).
  **The real cause is the sticky range:** when step 6 is centred, the whole stage has already scrolled up (at 900 px its top is 84 px above the viewport).
  The stage is 720 px (900 viewport) or 588 px (720 viewport) tall and sticks at header + 32 px, so the ride column must extend about 30–32 vh below
  step 6's centre to keep it pinned, and 24 vh was too short. Fix: 34 vh, re-measured at 1440×900, 1280×720 and 1024×768. The check
  now also requires the stage's bottom to be inside the viewport.

### Cycle 7 · CRITIQUE (`.shots/cycle-7/`)

| Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 7 | 5 | 6 | 7 | 6 | 6 | 7 | 8 | 6 |

After seven cycles every category sits between 5 and 8 across critics, and no two consecutive critiques come close to the stop rule (all ≥ 8).
Top problems: (1) desktop home hero: the product pair takes ~37% of the width, graphite on slate lacks separation, and the H1 (~56 px) is smaller than on other pages;
(2) the route clip's first frame reads as a flat blue rectangle (the sea at the top of the map); (3) the desktop ride's step 6 shows the same frame as step 5
(already diagnosed as the sticky-range defect and being fixed); (4) visible halos around renders (/terminal hero, home terminal section); (5) dead gaps
(home app → ride, /terminal film section, /operators under the hero) and phones blank below their content on /app cards. Copy: "Try the screen." on a
non-touch display; "designed to" appears ~11 times on /operators; clumsy "Nobody boarded, or the terminal was off?"; approved lines reused on several pages;
"Nothing else on the back."; bracketed footer label; the home subline has no operator idea; Tariq AI chips look tappable.

### Cycle 7 · FIX
- **Ride ending, measured again:** with 34 vh padding, 1440×900 passed (label 71–122 px, card 186–535 px), but 1280×720 (label 10–62 px) and 1024×768
  (label 34–85 px) failed: the stage still sits ~34 px above its sticky position when step 6 is centred. Instead of more padding (fragile), the operator
  composition moves down inside the stage: the label is 165 px above centre, and the card lands 110 px below centre at 92% scale (checked against all three
  measured stages). The chain re-measures all three viewports and stops before shots if any fails. Step 6 body is "Where the service that ran can be seen, and
  shown." ("Every journey, accounted for." stays unique to the /operators hero).
- **Halos:** measured, not guessed. WebP encoding shifts the render background by ≤ 2 levels (`#3A4045` against `#3A3E44`), which can't be seen. The halo came from the
  cycle 2 radial mask, which cuts the pole (it runs to the frame edge) into a disc. `.render-fade` is now a 12% rectangular feather.
- **Route clip:** 1:48.9–1:52.9, poster at +1.2 s, so it opens on the route card and not the sea-only top of the map (range checked in cycle 1).
- **Desktop hero:** top-aligned (no centred empty band), H1 up to 3.9rem, the product frame extends into the right gutter with a soft light behind the
  graphite body, and the subline adds the operator side ("…designed in Algeria to give operators a signed record of every ride.").
- **Gaps:** the ride section's top padding is halved (home app → ride); the /terminal install section has no top padding (it follows the film on the same slate).
- **Copy:** "Step through a ride." / "…in the order a rider sees them." / "Next step" (non-touch display); /operators drops two "designed to" lines where
  the sentence describes what a record is; "An empty bus, or a switched-off terminal?"; the disruption tool is tied to the operator; "Mounts to the pole.
  Nothing else on the back."; footer "For operators and cities"; the /terminal details lead no longer repeats "Every tap, on the record."; the Tariq AI
  prompts are set as italic quotes, not pill chips.
- **Declined:** cropping phones on the /app cards (cycle 4's critic flagged cropped devices as a defect, so the two critiques conflict and whole devices stay); a darker
  or warmer hero ground (the renders are baked on `#3A3E44`, and any other ground shows their edge).

### Cycle 8 · SEE (screens: `.shots/cycle-8/`)
- Gated chain: 25 validated edits applied ✓; clips ≤ 5 s ✓; build ✓; claims-check 7/7 ✓; form note and demo caption ✓.
- **Ride-ending measurement, all three viewports ✓** (label below the 68 px header, above the card and clear of it; card inside the stage):
  1440×900 label 170–222 / card 270–592 / stage bottom 695; 1280×720 label 108–160 / card 209–530 / stage bottom 567; 1024×768 label
  132–184 / card 208–575 / stage bottom 615. At 1280×720 the full-size frame reads correctly: the terminal steps back, then the "Operator view" label, the
  gold line and the card.
- **Behaviour verifier 7/7.** `shoot.mjs` **20/20 clean** (0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow at 390 px).
  /terminal desktop 5,755 → 5,613 px (no top padding on the install section).
- Lighthouse was run alone on this build (results follow); the cycle 8 critic was started on these shots.
- **Lighthouse home (mobile), cycle 8 build:** **98 / 100 / 100 / 100**, **LCP 2,271 ms**, CLS 0, TBT 50 ms, 363 KB. Every home budget is met with the
  most LCP headroom since cycle 4. The route clip now starts 1.5 s later, and the hero no longer has a centred minimum height.
- **Audit · web-design-guidelines (due in cycles 6 and 8; run on the cycle 8 build):**
  ```
  ✓ source: no `transition: all`, no `outline: none`
  ✓ dist, all 5 pages: every <img> has width, height and an alt attribute (55 images); every <button> has text or aria-label (19);
    every form control has a <label for> (9); valid heading order; skip link, lang, theme-color, color-scheme, touch-action,
    tap-highlight and translate="no" present
  ✓ video: 0 real `loop` and 0 real `autoplay` attributes; all 7 clips with the `data-autoplay` hook are `muted` (the first grep counted the
    `data-autoplay` hook as autoplay; a stricter attribute check cleared it)
  ✓ keyframes only inside motion-allowed media queries (ride ring, lightbox entry)
  ```
- **The cycle 8 critic failed** (session rate limit, HTTP 429), so it returned no scores.
- **D-34 Critic model changed (user request: lower token use without losing quality).** From the cycle 8 retry on, the independent critic runs on
  **Sonnet**, not Opus. Prompt, brief extract, rubric and output format are unchanged. It is asked to judge from the 10 contact sheets and the 10
  sweep-00 frames and to open at most 8 extra full-size frames (earlier critics opened 28–43 images). Scores from cycle 8 on come from a
  different model, so a step change against cycles 1–7 may reflect the model and not the site.

### Cycle 8 · CRITIQUE (Sonnet critic, D-34; `.shots/cycle-8/`)

| Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 8 | 7 | 8 | 7 | 6 | 5 | 6 | 9 | 6 |

Clarity 8, visuals 8 and honesty 9 reach the bar; rhythm, motion, mobile and a11y don't (the model change may account for part of any shift, D-34).
Top problems: (1) /terminal: the required small print is left in its own dark card at the reveal → screen-flow boundary, on desktop and mobile; (2) the
click-through "Step through a ride" stepper was read as a third motion pattern; (3) small print looks low-contrast and too small; (4) the mobile step
pills look under 44 px; (5) the hero subline and the /terminal reveal subline read as spec lines, not ad lines. No compliance violations were found.

### Cycle 8 · FIX
- **Checked before deciding:** the "orphaned caption card" (`terminal/desktop/sweep-04`, `terminal/mobile/sweep-03`) is the bottom of the screen-flow's own
  slate card, with the terminal just above the edge of that sweep frame. The small print sits inside its card as placed in cycle 6. **Declined (misread).**
- **Declined:** the stepper as a "third motion pattern". It is a click-through (user-initiated state change), not scroll-driven motion, so the brief's cap on
  signature scroll moments does not apply. The /terminal reveal subline is kept: "A vehicle-mounted NFC terminal, designed in Algeria." is the founder-approved
  supporting line from the film.
- **Small print (system level):** it already passes contrast (mist on slate 6.1:1, ink-muted on paper 6.6:1), but it was flagged by four consecutive critics
  (cycles 5–8). It now uses the surface's full foreground colour at 85% (`color-mix`), weight 480, on every surface.
- **Step pills:** 44 → 48 px minimum height (flagged in cycles 5 and 8).
- **Hero subline:** short sentences, one idea each: "An app for riders. An on-board terminal designed to give operators a signed record of every ride.
  Designed in Algeria."
- **The cycle 8 chain stopped at the new small-print contrast gate (ratios 1.4–1.8), and this was a checker bug, not a site defect.** The raw
  computed colours showed that Chromium serialises `color-mix()` as `color(srgb 0.957 0.945 0.918 / 0.85)` (channels 0–1). The checker parsed only
  `rgb()` values (0–255), so it read cream as near-black. The only value that measured correctly (6.4) was the ride stage's own `rgb(197, 200, 205)` mist
  override. The checker now parses both formats and fails on any colour it cannot parse. No shots had been taken; build and claims-check had already
  passed on the current source, so the re-run starts from the contrast gate on the existing `dist/`.

### Cycle 9 · SEE (screens: `.shots/cycle-9/`)
- Build (cycle 8 fixes) ✓, claims-check 7/7 ✓. **Small-print contrast gate, with the parser fixed, ✓ on every page:** home 7.4 / 6.4 / 8.5 / 7.4 / 9.9 / 9.9;
  /terminal 7.4 / 7.4 / 7.4 / 9.9 / 9.9; /app 9.9; /operators 7.4 / 9.9 (minimum 6.4:1; it was 6.1:1 before the cycle 8 change).
- **Ride ending ✓** at 1440×900, 1280×720 and 1024×768. **Behaviour verifier 7/7.** `shoot.mjs` **20/20 clean** (0 console errors, 0 failed
  requests, 0 HTTP errors, 0 overflow at 390 px).
- **D-35 Critic prompt hardening (from cycle 9).** Two cycle 8 findings were misreads of the evidence, not opinions: a section edge cropped by the sweep frame
  was reported as an "orphaned card", and a click-through component was reported as a third scroll moment. The prompt now asks the critic
  to rule out cropped section edges before calling a layout defect. It states that click-driven components are not scroll motion. It gives measured facts
  (small-print contrast 6.4–9.9:1, controls ≥ 48 px) so the critic does not have to estimate them from thumbnails. Rubric, image budget and
  output format are unchanged.
- Lighthouse was run alone on this build (results follow).
- **Lighthouse home (mobile), cycle 9 build, single run:** 97 / 100 / 100 / 100, CLS 0, TBT 50 ms, 363 KB, but **LCP 2,503 ms**, 3 ms over the
  budget. Cycle 8 measured 2,271 ms at identical page weight, and the only changes since (one CSS colour rule, a shorter hero subline)
  touch neither the LCP image nor its loading. Lighthouse's simulated throttling varies by a few hundred ms between runs, so one run cannot tell
  noise from a regression. **D-36:** from now on a budget verdict uses the median of three sequential runs. The re-measure is pending; the verdict will be logged
  with the median.
- **LCP verdict (D-36, median of 3 sequential runs, cycle 9 build):** runs 2,106 / 2,199 / 2,489 ms (performance 99 / 99 / 97) → **median LCP 2,199 ms,
  performance 99, TBT 31 ms, CLS 0. The budget is met.** The single 2,503 ms run was noise: the slowest run's render delay was 795 ms against
  398–457 ms for the other two, on the same build.

### Cycle 9 · CRITIQUE (Sonnet, hardened prompt D-35; `.shots/cycle-9/`)

| Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 8 | 5 | 6 | 8 | 7 | 7 | 8 | 9 | 7 |

Five categories are at or above 8 (clarity, type, mobile, honesty, and honesty at 9). Cycles 8 and 9 do not satisfy the stop rule. Top problems: (1) app screens look
flat next to the terminal and sit in generic black bezels; (2) the same dot timeline is used for three unrelated jobs (ride, modes, operator flow);
(3) "Run a network, or a city?" is unclear; (4) inactive nav links look low-contrast on the header; (5) the phone mockup chrome looks like a stock kit next to the
lit 3D terminal. Copy: "What the records show" is a vague link label. No compliance violations.

### Cycle 9 · FIX
- **Device frame (items 1 and 5):** the phone bezel is thinner (3.2 → 2.4%), with a graphite-metal gradient in the terminal's own finish and a crisp inner edge
  highlight, so the two objects share one level of finish. **Declined:** restyling the app screens (custom status bar, recoloured map). They are the
  real demo capture, and altering them would misrepresent the product.
- **Timeline reuse (item 2):** the modes are no longer a dot-and-line diagram. They are set as large type divided by thin gold rules (7 across on desktop, 2 columns on mobile).
  The dot-and-line form now appears only in the tap → signed record → operator story. **Declined:** mode icons (tried in cycles 3–5, flagged three
  times as indistinct).
- **Copy:** "For operators and cities." replaces "Run a network, or a city?"; "See what the records prove" replaces "What the records show".
- **Nav:** inactive links move from mist to cream at 88% on the graphite header.

### Cycle 10 · SEE (screens: `.shots/cycle-10/`)
- Gated chain: cycle 9 edits applied, ModesStrip rewritten, DESIGN/HANDOFF updated ✓; build ✓; claims-check 7/7 ✓; modes render with no dots ✓.
- **Ride ending ✓** at 1440×900, 1280×720 and 1024×768. **Behaviour verifier 7/7** (7 mode entries, 0 icons, 0 pause buttons, 0 loops, GSAP only on
  desktop, ride states in order, /terminal pinned).
- `shoot.mjs` **20/20 clean** (0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow at 390 px). Home mobile 9,183 → 9,176 px
  (modes as a two-column type grid on mobile).
- The cycle 10 critic (Sonnet, hardened prompt D-35) has started. Its prompt now also states that the app visuals are a real recording that must not be
  restyled, and that mode icons were already tried and rejected, so the critic doesn't re-propose either. Lighthouse home: median of three runs (D-36), pending.
- **Lighthouse home, cycle 10 build (median of 3, D-36): LCP budget MISSED.** Runs: LCP 2,644 / 2,638 / 2,343 ms, performance 96 / 96 / 98,
  TBT 119 / 104 / 51 ms → **median LCP 2,638 ms**, performance 96, TBT 104 ms. Accessibility, best practices and SEO are 100, CLS 0. The cycle 9 median was
  LCP 2,199 ms and TBT 31 ms. Cycle 9's changes (bezel gradient, nav `color-mix`, modes rewrite below the fold, copy) are not expected to
  move LCP by ~440 ms, and TBT rose alongside it, which suggests CPU contention during the runs. **Unresolved:** LCP phases, the Lighthouse CPU
  benchmark index and live machine load are being compared before deciding between a fix and a re-measure.
- **LCP diagnosis (cycle 9 vs cycle 10, all six runs):** the LCP element is **the hero phone's poster image** (`.phone__screen > img.phone__media`), not
  the terminal face as in cycles 2–4. It became the largest element when cycle 5 enlarged the phone. The poster was `loading="lazy"`, so in every run its
  **load delay is 1,044–1,307 ms** before the request even starts. That is the dominant, fixable cost, present in cycle 9's passing median as well. Machine
  load widens the spread: Lighthouse's CPU benchmark index fell from 996–1,084 (cycle 9) to 893–1,006 (cycle 10), style/layout rose from ~440 to ~560 ms, and render
  delay from 398–795 to 701–721 ms. **D-37 fix:** a `PhoneFrame` marked `eager` now loads its poster eagerly with `fetchpriority="high"`. The hero phones
  on home and /app are marked `eager`, every other poster stays lazy, and the build gate checks the attribute. Re-measured with the median of three.
- **LCP verdict after D-37 (median of 3, cycle 10 build + eager hero poster):** runs 2,190 / 2,264 / 2,339 ms (performance 99 / 98 / 98), load delay
  0 / 277 / 462 ms (was 1,044–1,307 ms) → **median LCP 2,264 ms, performance 98, accessibility 100, best practices 100, SEO 100, TBT 50 ms, CLS 0. The budget is met.**
  The CPU benchmark index was back to 1,003–1,071 for these runs, so the win comes from the load-delay fix, not a quieter machine. The remaining
  cost is render delay (~1.15–1.29 s), with style and layout for the long home page as the next lever if the budget tightens.

### Cycle 10 · CRITIQUE (Sonnet; `.shots/cycle-10/`)

| Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 7 | 5 | 7 | 8 | 6 | 7 | 8 | 9 | 8 |

Stop rule not met in cycles 9 or 10. Distinctiveness has stayed at 5–7 across every critic. Top problems: (1) every page runs the same macro rhythm
(hero → triad → split → CTA → footer); (2) the unbranded map basemap is a large visual on the /app hero; (3) the same example record appears on home and
/operators; (4) /operators has two image-free sections in a row; (5) the /operators hero repeats home's operator moment (terminal face + record card).
Copy: "Talk to us." is flat; the modes heading is just a list.

### Cycle 10 · FIX
- **/operators restructured (items 1, 4, 5):** the hero now leads with the angled terminal render on slate (a composition used nowhere else), not the
  face + record card that home already shows. The signed-record card moves beside "A record for every tap, signed where it happened." so that text-only
  stretch has its visual, and the card appears once per page. The hero render loads eagerly with high priority (it is the page's LCP candidate).
- **Declined (item 3):** a second, different example record. The one shown mirrors the terminal's own printed ticket (`screens/ticket40.png`),
  and inventing another route would be invented operator data, which the brief forbids. Home uses it in the ride and /operators once.
- **/app hero (item 2):** the back phone shows the top-up confirmation, not the map still. **Declined for home:** its hero phone shows the app's home
  screen, not the map.
- **Copy:** "Bring Tariq to your network." replaces "Talk to us."; the modes heading is "One search, every mode.", with the list moved into the lead.

### Cycle 11 · SEE (screens: `.shots/cycle-11/`)
- Gated chain: 12 validated edits applied ✓; build ✓; claims-check 7/7 ✓; record card present on /operators ✓; "Bring Tariq to your network." shipped ✓.
- **Behaviour verifier 7/7.** `shoot.mjs` **20/20 clean** (0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow at 390 px).
  /operators desktop 3,427 → 4,012 px and mobile 5,004 → 5,119 px: the record card now sits beside "A record for every tap".
- The cycle 11 critic has started (Sonnet, hardened prompt, which now states that the single example record is deliberate). Lighthouse medians for home and
  /operators (whose hero image changed) are pending.
- **Lighthouse medians (D-36), cycle 11 build:** home runs LCP 2,340 / 2,111 / 2,268 ms → **median 98 / 100 / 100 / 100, LCP 2,268 ms**, TBT 89 ms, CLS 0;
  /operators runs 1,585 / 1,431 / 1,585 ms → **median 100 / 100 / 100 / 100, LCP 1,585 ms**, TBT 12 ms, CLS 0. **Budgets are met on both.** The
  new angled hero render on /operators loads faster than the previous face + record card composition, and neither page has accessibility failures.

### Cycle 11 · CRITIQUE (Sonnet; `.shots/cycle-11/`)

| Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 8 | 8 | 9 | 7 | 6 | — | 7 | 9 | 8 |

The best cycle yet: distinctiveness reaches 8 and product visuals 9 for the first time. Stop rule not met: type 7, rhythm 6, mobile 7, and motion was not scored
("cannot judge from stills"). Top problems: (1) the mobile home hero crops the app+terminal pairing at the fold; (2) the /operators small print sits alone in
its own band; (3) desktop ride steps compete (several numbered steps at similar weight; also raised in cycles 5 and 6); (4) the modes list reads as a flat
bordered table; (5) /app runs three cream sections in a row. Copy: "Tools for the operator side." is flat. No compliance violations.

### Cycle 11 · FIX
- **Mobile hero:** tighter stacking (grid and copy gap 24 → 16 px, lead 20 → 17 px). A new gate measures the hero visual at 390×844 and stops the chain
  unless its bottom is inside the viewport.
- **/operators small print:** moved directly under the hero render it qualifies (it was a separate band after the card left the hero in cycle 10).
- **Ride steps:** in the desktop staged view only the active step shows its body text (opacity, no layout shift, still in the accessibility tree);
  inactive steps keep their number and muted title, so the sequence stays legible without competing.
- **Rhythm:** the modes section moves onto slate, forming one continuous dark chapter with the terminal section after it (same slate, no seam between two greys);
  the first /app feature section ("One search, across modes.") is on slate, so /app alternates cream and dark from the hero.
- **Copy:** "Built for the people who run the network." replaces "Tools for the operator side."

### Cycle 12 · SEE (screens: `.shots/cycle-12/`)
- Gated chain: 10 validated edits applied ✓; build ✓; claims-check 7/7 ✓.
- **New mobile-hero gate ✓:** at 390×844 the hero visual spans 382–662 px, ending inside the viewport (before, the critic saw it cropped at the fold); at 375×667
  235 of 268 px are visible (≥ half required).
- **Behaviour verifier 7/7.** `shoot.mjs` **20/20 clean** (0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow at 390 px). Home mobile
  9,205 → 9,139 px (tighter hero).
- The cycle 12 critic has started. Its prompt now explains how to score motion from frame evidence (distinct settled stage states per step, clean pinned
  beats, nothing caught mid-transition, complete static fallbacks) and requires a number for every category, because cycle 11 left motion blank. Lighthouse medians
  for home and /app are pending.
- **Lighthouse medians (D-36), cycle 12 build:** home runs LCP 2,340 / 2,336 / 2,270 ms → **median 98 / 100 / 100 / 100, LCP 2,336 ms**, TBT 75 ms, CLS 0;
  /app runs 2,414 / 2,412 / 2,415 ms → **median 97 / 100 / 100 / 100, LCP 2,414 ms**, TBT 0 ms, CLS 0. **Both meet the budget.** /app's headroom is thin (86 ms),
  and its three runs agree to within 3 ms, so this is a real, stable load cost, not noise. Its LCP element and phase split are being checked so that any
  future /app change starts from measured data.
- **/app LCP diagnosis (cycle 12 runs):** the LCP element is the hero's back phone, the top-up still (`topup.webp`, 9 KB, High priority, request
  36–61 ms, load time 89–155 ms). The cost is **render delay, 1,784–1,867 ms**: style and layout for the whole long page. Unlike home (D-25, cycle 3), /app never
  got `content-visibility`. **D-38 fix (in source; builds with the cycle 12 fixes):** the `.cv` utility (`content-visibility: auto` +
  `contain-intrinsic-size: auto <estimate>`) on /app's six below-the-fold sections (departures 900, wallet 800, trips/alerts 900, Tariq AI 900, languages 700,
  waitlist 600). The hero and the first feature section keep full rendering. Re-measured with the median of three after the next build.

### Cycle 12 · CRITIQUE (Sonnet, motion-scoring guidance; `.shots/cycle-12/`)

| Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 8 | 7 | 8 | 7 | 7 | 7 | 8 | 9 | 8 |

For the first time every category is ≥ 7; stop rule not met (distinctiveness, type, rhythm and motion at 7). The critic confirmed from frames that every ride and
reveal beat is settled and distinct, with no mid-transition catches. Top problems: (1) /terminal's eight specs are one dense datasheet list; (2) the same angled terminal
render appears on home and /terminal (and /operators); (3) the bilingual claim on /app is backed only by a splash screen; (4) the 404 page has no product imagery;
(5) the ride step numerals are too small to read as progress. Copy: "seen, and shown" is redundant. No compliance violations.

### Cycle 12 · FIX
- **Specs:** regrouped into three labelled columns (On its face / Inside / On the vehicle), each item a large name with a one-line note.
- **Render reuse:** the home terminal section now shows the terminal face on the green OK screen with the printed ticket out (the product in use), not the
  angled render that /terminal and /operators also lead with.
- **404:** the terminal's idle screen on slate, with the required small print (enforced by claims-check).
- **Ride numerals:** 15 px → 24 px at display weight (still muted when inactive, gold when active).
- **Copy:** "Where the service that ran becomes proof."
- **Declined:** an Arabic app screen on /app. No Arabic capture exists, and composing one would misrepresent the product. Added to the founder TODOs
  (an Arabic recording).
- This build also carries D-38 (`content-visibility` on /app's below-the-fold sections).

### Cycle 13 · SEE (screens: `.shots/cycle-13/`)
- Gated chain: 11 validated edits applied ✓; build ✓ (with D-38); claims-check 7/7 ✓ (the 404 now carries terminal media and its small print); `/app`
  `content-visibility` and the grouped /terminal specs confirmed in `dist/` ✓. **Behaviour verifier 7/7.**
- `shoot.mjs` **20/20 clean** (0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow at 390 px; `report.json` 0 problems). /404 desktop
  1,110 → 1,630 px (idle screen added); /terminal desktop 5,613 → 5,563 px (grouped specs are shorter).
- **The chain was killed for low memory a fourth time, during the Lighthouse step after all shots were written** (about 450 MB free with the user's
  browser and other sessions open). Nothing needed redoing except Lighthouse, which was re-run as its own background job, /app first (to confirm D-38),
  then home. The cycle 13 critic (Sonnet) started on the intact shots. Its prompt now also states that the recording is English only, so the critic
  won't ask for an Arabic app screen again.
- **Lighthouse medians (D-36), cycle 13 build, confirming D-38:** /app runs LCP 1,732 / 1,738 / 1,810 ms, render delay 1,212 / 1,124 / 1,319 ms → **median
  100 / 100 / 100 / 100, LCP 1,738 ms** (was 2,414 ms), render delay 1,212 ms (was ~1,830 ms), TBT 38 ms, CLS 0. Home runs 2,334 / 2,260 / 2,273 ms → **median
  98 / 100 / 100 / 100, LCP 2,273 ms**, TBT 17 ms, CLS 0. **Both meet the budget.** `content-visibility` on /app's below-the-fold sections cut LCP by 676 ms
  and gave /app the most headroom of any page.

### Cycle 13 · CRITIQUE (Sonnet; `.shots/cycle-13/`)

| Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 7 | 8 | 7 | 8 | 6 | 6 | 8 | 9 | 8 |

Stop rule not met. After 13 cycles every category sits between 6 and 9, and critics keep reversing each other by about a point (the hero H1 was
"flat identity" in cycle 5 and is "a tagline, not an identity" in cycle 13; the centred /terminal hero was praised as staging in cycle 3 and is called off-grid now).
Top problems as reported, checked against evidence:
1. "Step 6 label overlaps the header" (`home/desktop/sweep-04`): **not a defect.** That sweep frame catches the section scrolling out under the sticky
   header, which is normal scroll behaviour. The measured gate shows the label below the header, above the card and inside the stage at 1440×900, 1280×720 and
   1024×768 while step 6 is being read.
2. "Centred /terminal hero breaks the grid": **declined**, the same staging decision logged in cycle 3 (the one centred, pinned signature moment).
3. "Only 3 visuals for 6 steps": **misread.** The behaviour verifier measures six distinct stage states in order (plan → dest → tap → ok → record →
   operator). The 85% sweep steps do not land on every one.
4. "The hero doesn't say what Tariq *is* in one line": accepted as an identity-first subline.
5. "The 'In English and Arabic' visual is thin" (also raised in cycles 6 and 12): accepted, **if** a real screen proves it. The app's search field shows an Arabic
   placeholder, which is being checked on the stills.

### Cycle 13 · FIX
- **Hero subline (item 4):** one identity sentence: "Tariq is a rider app and an on-board terminal for public transit, designed in Algeria." The H1
  "Plan in the app. Tap on board." stays: it was chosen in cycle 5, after an identity-style H1 was called flat. The operator side is carried by the "For operators" CTA
  beside it.
- **Bilingual proof (item 5; raised in cycles 6, 12 and 13):** the language section on /app no longer shows the splash screen. It shows a native-size close-up of the
  app's **real search field**, "Where are you going?" with its Arabic placeholder إلى أين؟. The field is cropped (414×65 at 10,55) from the already-redacted home still,
  below the painted-out greeting and avatar, and the crop was checked at 2× before use. It is genuine app UI, nothing composed, and a visual used nowhere else.
  Caption: "The app's own search field, from the demo recording." The unused splash still was dropped from the pipeline.
- **Declined, with evidence:** items 1–3 above.

### Cycle 14 · SEE (screens: `.shots/cycle-14/`)
- Gated chain: 6 validated edits applied ✓; build ✓; claims-check 7/7 ✓; search-field crop and hero subline confirmed in `dist/` ✓; **behaviour verifier 7/7**.
- **Killed for low memory a fifth time, during the first page of the shoot** (home). Only `home-desktop-sheet.png` had been written, then Chromium was killed mid-navigation.
  About 1.2 GB was available; the user's own Chrome and three other Claude sessions hold the rest, and none of them are this build's to stop.
  **Recovery:** `dist/` was already the verified cycle 13 build, so the shoot alone was re-run from a clean `.shots/cycle-14/`, one page per process, waiting 20 s before
  any page that starts with less than 700 MB available. Nothing else is started while it runs.
- **Shoot re-run completed:** `shoot.mjs` **20/20 clean** (0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow at 390 px), all 10 contact sheets
  written, no page needed the low-memory wait. /app desktop 7,021 → 6,735 px and mobile 8,550 → 8,154 px (the splash phone replaced by the search-field close-up).
- The cycle 14 critic has started (Sonnet). Its prompt now also rules out "content scrolling out under the sticky header" as a defect, marks the centred /terminal
  reveal as deliberate, and states the measured six-state ride sequence and 6.6:1 inactive step titles, so the critic doesn't repeat the three misreads from cycle 13.
  Lighthouse medians for home and /app are running as their own background job.
- **Lighthouse medians (D-36), cycle 14 build:** home runs LCP 2,419 / 2,414 / 2,338 ms → **median 98 / 100 / 100 / 100, LCP 2,414 ms**, TBT 13 ms, CLS 0;
  /app runs 1,815 / 1,734 / 1,736 ms → **median 100 / 100 / 100 / 100, LCP 1,736 ms**, TBT 29 ms, CLS 0. **Both meet the budget.** Home's headroom is thin
  (86 ms; cycle 13 median 2,273 ms). The only change on home was one line of subline copy, and the runs agree within 81 ms, so this is logged as
  thin headroom, not a regression. The next lever, if needed, is the home render delay (style and layout of the long page), as noted in D-37.

### Cycle 14 · CRITIQUE (Sonnet; `.shots/cycle-14/`)

| Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 8 | 7 | 7 | 8 | 6 | 6 | 8 | 9 | 8 |

Stop rule not met; cycle 15 is the last before the hard cap. All five findings were concrete, and none reversed an earlier decision: (1) the footer lists both "For
operators" and "For operators and cities"; (2) the /app trip and notification cards show phones with large blank areas below their content; (3) ride step 1
pairs the phone with a half-faded terminal sliver at the stage edge, unlike the clean frontal states that follow; (4) "See what the records prove" over-promises;
(5) "An empty bus, or a switched-off terminal?" is a question where the site's voice is declarative.

### Cycle 14 · FIX
- **Footer:** one operators link (the duplicate `/operators#contact` entry removed; the page and its contact form are one click apart).
- **/app cards:** the phones are cropped on purpose at 380 px with a bottom fade, so each card shows only the part of the screen with content.
- **Ride step 1:** the terminal is fully hidden in the plan state, and the phone stands alone, centred on the stage. It steps out when the terminal takes over at
  step 2, so all six states now share one framing system.
- **Copy:** "See the signed record" (linked to `/operators#see-title`, where the record card sits); "An empty bus is not a switched-off terminal."

### Cycle 15 · SEE (final cycle; screens: `.shots/cycle-15/`)
- Gated chain: 7 validated edits applied ✓; build ✓; claims-check 7/7 ✓; one operators link in the footer ✓; **behaviour verifier 7/7** (ride states still in order
  with the centred phone in the plan state).
- `shoot.mjs` **20/20 clean** (0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow at 390 px), all 10 contact sheets written. /app desktop
  6,735 → 6,489 px and mobile 8,154 → 7,912 px (cropped card phones).
- The final (cycle 15) critic has started on these shots. The final Lighthouse medians (all five pages, 3 runs each) and the per-page JS budget
  run as their own background job.
- **`/lab` removed from source** (`src/pages/lab/hero-a.astro`, `hero-b.astro`; no remaining references). `dist/` is rebuilt without it
  once the final Lighthouse runs, which read the current `dist/`, have finished. The shots and measurements above do not include the lab pages.
- **Final Lighthouse medians (D-36, 3 runs per page, cycle 15 build, mobile emulation):**

  | Page | Perf | A11y | BP | SEO | LCP (median) | TBT | CLS | Transfer |
  |---|---|---|---|---|---|---|---|---|
  | / | 98 | 100 | 100 | 100 | 2,338 ms | 63 ms | 0 | 383 KB |
  | /terminal | 99 | 100 | 100 | 100 | 1,969 ms | 0 ms | 0 | 210 KB |
  | /app | 100 | 100 | 100 | 100 | 1,813 ms | 25 ms | 0 | 273 KB |
  | /operators | 100 | 100 | 100 | 100 | 1,582 ms | 12 ms | 0 | 121 KB |
  | /404 | 100 | 100 | 100 | 69 (noindex, D-30) | 1,892 ms | 0 ms | 0 | 177 KB |

  **Every budget is met:** LCP < 2.5 s and CLS < 0.05 on every page; performance ≥ 90 and a11y/BP/SEO ≥ 95 on every indexable page; home initial
  load 383 KB (budget 1.5 MB, excluding lazy videos). **JS:** first-load scripts are under 1 KB gzip per page (the inline site script);
  GSAP + ScrollTrigger (44 KB gzip) load on demand only on desktop with motion allowed, so the heaviest case is ~45 KB against the 120 KB budget. No
  accessibility failures on any page.
- **Final build:** rebuilt from a clean `dist/` without `/lab`, then claims-check, the behaviour verifier and a full shoot (`.shots/final/`) re-run on it.

## Finish
- **Parent repo unchanged outside this folder (§3.1, §12.3):** `git -C .. status --short` excluding `site-v2/` is **identical** to the Phase 0 baseline
  (the same 19 pre-existing entries under `../css`, `../js`, `../index.html`); `site-v2/` is the only new, untracked item. No commit, push, reset, stash or clean was run.
- **Other repos:** `tariq-hardware` has 0 changed entries. `tariq-app` has 10 changed entries, and no baseline was recorded for it in Phase 0 (a gap in the
  Phase 0 procedure). This run only read from it (logo, screenshots, Colors.kt). Checked by modification time: none of its 10 changed entries was modified after this session started (2026-09-13 22:21); every newest mtime predates the run, so they are the founder's own pending work, not this build's.

### Cycle 15 · CRITIQUE (final; Sonnet; `.shots/cycle-15/`)

| Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 8 | 7 | 8 | 8 | 8 | 7 | 8 | 9 | 8 |

The highest total of the run (71/90; cycle 1 was 53). Rhythm reached 8 for the first time. **Hard cap reached (15 cycles): the loop stops here without meeting the stop
condition** (two consecutive critiques all ≥ 8 with honesty 10; distinctiveness and motion are 7, honesty 9). As §10 requires, the remaining findings
are not fixed unreviewed. They are listed as shortfalls in `HANDOFF.md` → "What still falls short": identical waitlist block on home and /app; the ride's operator label
under the sticky header during scroll-out; the "Operator, city or organisation" label beside the City dropdown; small print tight to the ride card's top edge;
uneven body copy across ride steps; honesty held at 9 for wording, not violations.
- **Final build verified (clean `dist/`, no `/lab`):** claims-check **5/5 pages** ✓; no `/lab` in `dist/` or the sitemap ✓; behaviour verifier **7/7** ✓;
  `shoot.mjs --out final` **20/20 clean** (0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow at 390 px, normal and reduced motion), with
  10 contact sheets in `.shots/final/`. This is the build handed off.
- **GIFs (Chrome gif_creator, 1440×900 window, preview build):** `~/Downloads/tariq_site_v2_home.gif` (10 frames, 1.3 MB; hero → app → ride states → modes → terminal → join → footer) and
  `~/Downloads/tariq_site_v2_terminal.gif` (11 frames, 1.3 MB; reveal persp → face → reload → screen flow → details → film → install → footer). No private data in any frame.
- **Servers stopped:** astro preview (4322) killed; nothing listening on 4321/4322. Nothing committed.

## Post-handoff fixes (founder asked to continue the open items)
- **D-39 · /app waitlist gets its own framing.** It is a slate band with a gold top rule and copy specific to the app ("Be first on the app."), with no white panel
  and no city row. Why: the final critique scored distinctiveness 7 because the block was identical to home's. Home keeps the panel, cities and operators aside.
- **D-40 · Ride operator label leaves before the stage unsticks.** A ScrollTrigger on `.ride__layout` adds `is-leaving` (onEnter/onLeaveBack) 40 px
  before the sticky stage starts to move, and the label fades. Step triggers moved from `top center` to `top 62%`, and the last step's padding went from 34vh to 48vh.
  Why: the first probe showed that the operator state held for only about 100 px before unsticking, and that a toggle-based class came off again after the layout had passed.
  Probe (`.shots/tools/probe-fixes.mjs`, 50 px steps with a 520 ms settle): 0 bad samples at 1440×900, 1280×800 and 1024×768; label fully shown in 5–6 samples each.
- **D-41 · Form label "Organisation".** The City dropdown already covers cities.
- **D-42 · Stage small print gets 28 px of top space.** Visuals are centred at `50% + 14px`, and the face width is `min(80%, 78cqh × 1.09)` (stage is `container-type: size`), so
  short viewports don't crowd the small print.
- **D-43 · Step bodies always shown.** Inactive bodies are ink-muted (6.6:1) instead of opacity 0; active bodies are graphite.
- **D-44 · Step 6 copy.** It now reads "The operator sees the same record the rider holds." Why: the final critic withheld the honesty point over "becomes proof". Still for founder review.
- **Verification:** build ✓; claims-check 5/5 ✓; verify.mjs 7/7 ✓; probe 13/13 ✓ after one failed first run (fixed by D-40's second half);
  `shoot.mjs --out fixes` for /, /app and /operators: 12/12 clean (0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow at 390 px).
  No critique round was run (to save tokens, as the founder asked), so rubric scores are unchanged from cycle 15.
- **Lighthouse after the fixes:** a first home median of 3 read 2,644 ms (runs 2,742 / 2,644 / 2,436), over budget. An interleaved A/B was run to separate noise
  from regression: the pre-fix build (edits reverted in `.shots/ab-base`) against the fixed build, 4 alternating runs each. Base LCP 2,654 / 2,430 / 2,354 / 2,339 → **median 2,392 ms**;
  fixed 2,431 / 2,276 / 2,430 / 2,353 → **median 2,392 ms** (render delay 1,614 vs 1,534 ms; perf 98 both). No regression: the 2,644 ms reading was machine noise.
  /app median of 3: 100/100/100/100, LCP 1,744 ms, CLS 0. (The npx `--headless=new` flag failed to connect to Chrome on this machine; `--headless --no-sandbox` works.)

### Post-fix · SEE (screens: `.shots/post/`)
- Build ✓; claims-check 5/5 ✓. `shoot.mjs --out post`, one page per process: **20/20 clean** (0 console errors, 0 failed requests, 0 HTTP errors,
  0 overflow at 390 px, normal and reduced motion), with all 10 contact sheets written. Home desktop is 6,165 → 6,319 px (last ride step padding 34vh → 48vh) and /app
  desktop is 6,489 → 6,479 px (waitlist band).
- One independent critique (Sonnet, fresh context, same rubric and image budget as cycle 15) was run on these shots at the founder's request.

### Post-fix · CRITIQUE (Sonnet, fresh context; `.shots/post/`)

| Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 8 | 6 | 8 | 8 | 7 | 7 | 8 | **10** | 9 |

This is the first honesty 10 of the run (no §4 violation found). Distinctiveness fell 7 → 6 and rhythm 8 → 7; perf/a11y rose 8 → 9. The stop condition is still not met.
Each finding was checked against the screenshots (`home/desktop/sweep-00.png` was re-opened):
1. **Hero "two phones and a terminal, three heroes": misread.** sweep-00 shows one phone overlapping the terminal bezel, the composition chosen in DESIGN.md's
   hero decision. The frame has no second phone. Not changed.
2. **The green "Have a good trip / 40 DA" screen repeats: partly valid.** It is **not** in the hero (the hero shows the app home screen and the terminal's destination list).
   It is on the stage in three desktop ride states (ok, and dimmed behind the card in record and operator, by `SCREEN_FOR`), and again in /terminal's step-through. A candidate
   fix: show the ticket rather than the success screen behind the card in record and operator.
3. **"Next step" click stepper on /terminal should be scroll-driven: declined again,** for the same reason as cycle 9 (a user-initiated click-through is not scroll motion,
   and a second scroll-pinned sequence on that page would crowd the reveal).
4. **The signed-record card looks like a generic invoice: valid, new.** It is plain label/value rows on white; the brand's proof artefact gets less craft than the renders.
   Candidate: a gold rule, a "signed by the terminal" seal row and tabular figures, as a component-level change in `SignedRecord.astro`.
5. **Forms: partly valid.** The note "This form doesn't send anything yet" stays visible before submit: §3 allows the empty endpoint only if the form is honest about it,
   and hiding the note until after submit would let people fill in a form that silently does nothing. Declined. The claim that the inputs sit "inside premium dark sections"
   is wrong for home (a white panel). Restyling the select and focus states to the brand is a fair polish item.
No fixes were applied in this round; the founder asked for the critique only.

## Round 2 fixes (founder: "do that", from the post-fix critique)
- **D-45 · Signed record redrawn as a proof artefact** (`SignedRecord.astro`, one component for home ride, mobile steps and /operators). It is ticket paper
  with a gold cap (inset rule) and a perforation with side notches. The notches are a CSS mask, so they cut through to any surface, and the shadow is a `drop-shadow` filter so it follows the notches. A gold
  seal carries the Tariq mark, and the fare is the large tabular figure. Copy is unchanged apart from row order (from, to, service, paid with, time; fare in the footer), so no new claims.
  The height stays close to the old card (label anchor in the ride assumes about 340 px; the probe asserts 300–380).
  Why: the critic's highest-leverage item was that the key trust visual "looks like an invoice template" next to the renders.
- **D-46 · The green success screen appears only where it is the step.** In the ride's record and operator states the terminal returns to idle and the printed ticket stays out
  (`SCREEN_FOR` in `ride.ts`). The home terminal teaser uses idle plus the ticket instead of the success screen. It remains in ride step 4 ("On your way.") and
  in /terminal's step-through, where it is the subject. Why: the critic saw it as the dominant repeated visual, making the product "look like it has one screen".
- **D-47 · Branded form controls.** The select is wrapped with a masked chevron in the surface's accent (gold-deep on light, gold on slate); focus is a 1 px accent ring plus a
  5 px gold halo, replacing the graphite outline. The paper `--focus` token moves from graphite to gold-deep, so every focus ring on light surfaces is now in the brand
  accent. Input borders move from `rgb(38 40 44 / .28)` (about 1.7:1, below WCAG 1.4.11) to `#86888c`. The honest note "This form doesn't send anything yet" stays
  visible before submit (declined in the post-fix critique, reason logged there).
  Contrast (computed): field border 3.55:1 on white / 3.24:1 on paper; slate field border 4.55:1 against slate-deep / 3.91:1 against slate; focus gold-deep 5.01:1 on white /
  4.56:1 on paper; gold 4.43:1 on slate / 5.16:1 on slate-deep; card muted text 7.13:1; Example tag 5.65:1.
- Build ✓; claims-check 5/5 ✓.
- **Round 2 verification:** verify.mjs 7/7 ✓. Probe all ✓: ride ok → success screen, record and operator → idle with the ticket printed; teaser idle; record card 371 px tall
  (the operator label's gold line still meets the card, checked in `r2-ride-operator-1440.png`); select chevron rendered; home email focus shows a gold-deep border (#8a6a36) plus halo; label never
  under the header at 1440, 1280 and 1024. The first probe run failed that focus check only because it read styles before the 150 ms border transition finished; a 450 ms settle was added, not a
  code change. `shoot.mjs --out post2` **20/20 clean** (0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow at 390 px), 10 sheets. Lighthouse
  accessibility 100 and best practices 100 on / and /operators (no failing audits). Screens: `.shots/post2/`, close-ups in `.shots/tools/fix/r2-*.png`.

### Round 2 · CRITIQUE (Sonnet, fresh context; `.shots/post2/`)

| Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| **9** | **8** | 8 | 8 | **8** | 7 | 8 | **10** | 9 |

Best result of the run (75/90). Distinctiveness went from 6 to 8 and rhythm from 7 to 8 after D-45–D-47; honesty held at 10 (no §4 violation; the critic quoted the approved terminal lines as compliant).
**Stop condition still not met:** motion is 7, and a qualifying pair needs two consecutive critiques with every category at 8 or above and honesty at 10.
Each finding was checked against the frames (`home/desktop/sweep-05`, `terminal/mobile/sweep-03`, `operators/desktop/sweep-02` re-opened):
1. **/terminal "Step through a ride" is click-driven, not scroll-scrubbed: declined for the third time on substance** (a click-through is not scroll motion, and a second pinned
   scroll sequence would crowd the reveal on the same page). The critic's alternative is fair and cheap, though: *clearly signpost it as click-driven* (for example "Step 1 of 5" and
   a visible progress rail on the stepper). This is the likeliest lever on motion 7. Not applied; the founder asked for the three fixes plus a critique.
2. **Three calls to action stack at the end of home (terminal teaser, waitlist, operators aside): judgement, partly valid.** The teaser is a product section with a film button, not a
   closing CTA block, but the end of the page does carry three asks in a row. Candidate: keep the teaser's film button and drop its "See the terminal" link, or
   shorten the operators aside to a text link.
3. **"One search, every mode" right two-thirds empty for a full scroll step: misread.** sweep-05 shows the headline, lead and the full seven-mode strip across the
   whole width. The render at the bottom edge is the next section (teaser), not an overflowing visual.
4. **/terminal mobile step chips wrap unevenly (2/2/1): valid, minor.** Candidate: a 2-column chip grid, or one horizontally scrollable row at ≤ 480 px.
5. **/operators record card "cut off with almost no gap" before the rail: capture artefact.** The cut is the 85% sweep edge; the frame shows about 100 px between the
   card's bottom and the rail.
No fixes applied after this critique.

## Round 3 fixes (founder: "do that", from the round 2 critique)
- **D-48 · /terminal step-through signposted as click-driven.** A "Step 1 of 5 · Waiting" counter and a five-segment gold progress rail sit above the chips, and both update on
  every step (Next, chip or Start again). The lead adds "Click through them at your own pace." It stays a click-through, not scroll-scrubbed (declined three times; see Round 2),
  but its interaction is now explicit. Why: the critic named it the single change most likely to lift motion from 7, and it "leaves the interaction genuinely ambiguous".
- **D-49 · Even step chips on narrow screens.** At ≤ 560 px the chips are five equal number buttons in one row (52 px tall), and each label stays in the button for screen
  readers (visually hidden) while the active label shows in the counter. Why: the chips wrapped 2/2/1 at 390 px.
- **D-50 · Fewer asks at the end of home.** The terminal teaser keeps one action (Watch the film; "See the terminal" is already in the nav). The operators aside's
  button became a text link ("Talk to us →"), so the waitlist is the only filled button at the close. Why: the critic saw three calls to action stacked before the footer.
- Build ✓; claims-check 5/5 ✓.
- **Round 3, first verification run:** verify.mjs 7/7 ✓. The step-through checks passed ("Step 1 of 5 · Waiting" → two Next → "Step 3 of 5 · Payment", 3 segments →
  jump to "Step 5 of 5", 5 segments; mobile chips in one row at 64 px each, inside the gutter, ≥ 48 px tall, accessible names kept). One check failed on the probe itself:
  its `.term a, .term button` selector also matched the film dialog's hidden "Close the film" button, which sits inside `.term`. The selector is now scoped to
  `.term__copy`; no site change. Close-ups: `.shots/tools/fix/r3-*.png`. Results of the re-run and the full shoot follow.
- **Round 3 verification (re-run):** probe all ✓, including "home end: teaser actions [Watch the film], operators aside buttons 0, link /operators#contact".
  `shoot.mjs --out post3` **20/20 clean** (0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow at 390 px, normal and reduced motion), 10 sheets.
  Home mobile 9,114 → 9,048 px and /terminal mobile 5,663 → 5,654 px (no link row in the teaser; one chip row). Screens: `.shots/post3/`.
  Critique A (Sonnet, fresh context, identical brief to round 2) started on these shots. Critique B runs on the same build only if A has every category ≥ 8 and honesty 10.

### Round 3 · CRITIQUE A (Sonnet, fresh context, identical brief; `.shots/post3/`)

| Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 9 | 7 | **6** | 8 | 8 | 7 | 8 | 10 | 9 |

**Does not qualify** (distinctiveness 7, visuals 6, motion 7), so critique B was not run. Round 3 did not change the app screens or any render, yet visuals fell from 8 to 6
compared with round 2. The drop comes from reviewer variance on unchanged assets, not a regression. Findings checked against the frames (`404-desktop-sheet`, `app/desktop/sweep-00` re-opened):
1. **App screens look like a stock template ("plain cards, default icons, generic blue map"): partly misread, and declined on honesty.** /app's first frame shows the real
   top-up confirmation and home screens; no map is in it. These are genuine screens from the founder's demo recording, marked "App screens come from a demo recording".
   Re-skinning them to look more on-brand would present a UI the product doesn't have (§4). The way to close this is founder TODO 9 (a clean, branded recording of the real app).
2. **The same terminal render is reused everywhere: partly valid.** /terminal's reveal uses three different renders (angle, face, reload), so that part is a misread. But the front
   face does appear on the home hero, ride, teaser, /terminal stepper and 404. Only three source renders are usable (Known issues); founder TODO 5 (final renders) closes it.
   A cheap step: drop the render from 404.
3. **404 desktop is visually thin: valid.** The render card sits small and bottom-left under the links, leaving the right half empty. Candidate: a two-column 404 (message left,
   face right), or no render.
4. **In-app toggles look like default iOS controls: declined on honesty** (the real app's notification settings screen; same reason as 1).
5. **"Next step" uses the same solid gold pill as "Join the waitlist": valid, cheap.** Candidate: an outline button with an arrow, so in-component navigation reads as secondary.
No fixes applied after this critique.

## Round 4 fixes (founder: "do them", from round 3 critique A)
- **D-51 · "Next step" is a secondary control.** It uses the outline `.btn` with an arrow instead of the solid gold primary, so the only solid gold pills on the site are real
  calls to action (the waitlist). Why: the critic read in-component navigation as a second marketing CTA.
- **D-52 · /404 is composed as two columns on desktop.** At ≥ 900 px the message and links sit on the left (7fr) and the idle terminal face on the right (5fr, up to 460 px), vertically centred;
  below 900 px it stacks. The small print stays with the render. Why: the render sat small and bottom-left with the right half of the page empty.
- Build ✓; claims-check 5/5 ✓. Probe adds: "Next step" not primary, arrow present, not gold; /404 art beside the message at 1440, below it at 390 with no overflow.

## Cities section: prompt for a new session (founder request; nothing built)
- The founder disliked the home cities row and asked for a prompt, **not a build**, for a new session. The brief: sliding city cards inspired by the old site's
  `#s-cities` (landmark seen from transit, for example Maqam Echahid from the bus) and a card that slides out with the waitlist option. Written to
  **`CITIES_SECTION_PROMPT.md`** (not shipped; claims-check only scans `dist/`).
- Decisions baked into the prompt, with reasons:
  - **The "credit card" becomes a "Tariq pass".** It is a transit-card form that carries the waitlist, with no card numbers, chip, bank logos or "credit/debit". Why: Tariq issues no payment card; riders tap their own card or phone (§1/§4).
  - **Imagery ladder.** Real photos first; generated art only if an image MCP exists, labelled "Illustration", non-photographic, with the prompt log; otherwise
    SVG vehicle-frame scenes shipped at full quality, plus a photo shot list as a founder TODO. `algiers.webp` stays banned (Gemini mark). Why: the founder lifted the real-places
    image ban for this section, but a generated image must never pass as a photograph.
  - **The old section's banned copy is named explicitly** (Live, Coming soon or Planned badges; Cairo, Lagos, Kinshasa, Luanda; "nine modes"; per-city mode lists), and the prompt tells the new
    session to add these to claims-check.
  - **Skills** are mapped to the installed names from the founder's reference video: `frontend-design:frontend-design`, `ui-ux-pro-max`,
    `design-taste-frontend`, the GSAP skills, `imagegen-frontend-web` (only with an image tool), `design-system`, `web-design-guidelines`, `webapp-testing`.
    shadcn, dashboard, mobile-native and stacked style presets are excluded, with reasons.
  - **Loop:** Sonnet critics with an image budget, verify-before-fix, a stop rule requiring two consecutive critiques with no fixes between them, cap 6.
- **Round 4 close-ups checked by eye:** `.shots/tools/fix/r4-404-desktop.png` shows the headline, lead and links on the left and the idle terminal face in its slate
  panel (460 px) on the right, vertically centred with the small print under the render, and no empty half-page. `r4-stepper-nav.png` shows "Next step →" as an outline
  button under the step copy, visibly secondary to the gold header CTA. Probe: all ✓ (verify 7/7; "Next step" background transparent, arrow present; /404 side by side at 1440,
  stacked at 390 with scrollWidth 390).
- **Round 4 verification:** `shoot.mjs --out post4` **20/20 clean** (0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow at 390 px, normal and reduced motion), 10 sheets.
  /404 desktop 1,586 → 1,221 px (two columns) and mobile 1,690 → 1,682 px. Screens: `.shots/post4/`. Critique A (Sonnet, fresh context, identical brief to rounds 2–3)
  started on these shots; critique B runs on the same build, with no changes between, only if A has every category ≥ 8 and honesty 10.

### Round 4 · CRITIQUE A (Sonnet, fresh context, identical brief; `.shots/post4/`)

| Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 8 | **6** | **6** | 8 | 8 | 7 | 8 | 10 | 9 |

**Does not qualify**, so critique B was not run. Across rounds 2–4 on largely unchanged visuals, distinctiveness went 8 → 7 → 6 and visuals 8 → 6 → 6.
Verdicts:
1. **/terminal hero render is flat, "plasticky" lighting: valid about the asset, not fixable in code.** These are the source renders from `tariq-hardware/models/ourterminal`, and
   running Blender or scripts there is forbidden (it writes into that repo). Closed by founder TODO 5 (final renders with key, rim and environment lighting).
2. **"Step through a ride" should be scroll-scrubbed, not click-through: a recurring finding (4th critic).** Signposting it in round 3 (D-48) did not lift motion (7 in rounds 3 and 4).
   The earlier reason to decline (a second pinned scroll sequence on /terminal) still holds technically, but four independent critics now read it as off-language. **Left to the founder**
   as a product decision: convert it to a scroll-scrubbed sequence (and shorten the reveal above it), or keep the click-through as a deliberate interactive beat.
3. **One section formula repeated (headline, paragraph, product on the right): partly valid.** Home already varies (sticky ride stage, full-width modes strip, teaser
   with the product on the left), but /app and /terminal lean on the split. Candidate: one full-bleed or horizontal section each on /app and /terminal.
4. **Subheads on dark surfaces read flat (cool `--c-mist` #c5c8cd under warm cream headlines): valid, cheap.** Candidate: a warm mist (for example a cream-tinted grey at ≥ 4.5:1 on slate).
5. **/terminal mobile specs collapse into one long list: valid, minor.** Candidate: a 2-up grid for the short items at 390 px.
No fixes applied after this critique.

## Session plan (founder: "do all what you need, full authority", plus the cities prompt added to the task list)
**A · Open site items from the round 4 critique**
- [ ] A1 Warm the mist subhead token on dark surfaces (≥ 4.5:1 on slate and graphite).
- [ ] A2 /terminal mobile specs: a 2-up grid for the short items at 390 px.
- [ ] A3 One full-bleed section each on /app and /terminal, to break the repeated split formula.
- [ ] A4 **Decision (founder authority delegated):** /terminal "Step through a ride" becomes scroll-driven on desktop with motion allowed (sticky stage, steps scroll, in the
      home ride's grammar), and stays click-through on mobile and with reduced motion. Why: four independent critics read the click-through as off-language, and signposting (D-48) did not lift motion.
**B · Cities section: execute `CITIES_SECTION_PROMPT.md` in this session** (phases 0–3 and finish; cap 6 cycles; its stop rule).
Order: A1–A4 and the cities build share one critique loop, so each cycle's critics see the whole site. Critics use the cities rubric for the section, plus the site rubric.
- **Cities §6 imagery check (2026-09-15):** `src/assets/cities/originals/` does not exist (no founder photos). `claude mcp list` shows only Google Drive, Gmail and Calendar (no image or video
  generation MCP; Higgsfield absent). **→ Rung 3:** scenes built in code (SVG vehicle frame, graded sky in the city tint, simplified landmark silhouette). The component takes a real photo per
  city through `src/config.ts`, and the photo shot list goes into `HANDOFF.md` as a founder TODO. `imagegen-frontend-web` is skipped (no image tool), as §7 allows.

## Cities · Phase 0 (baseline)
- `git -C .. status --short` outside `site-v2`: **19 entries** (the Phase 0 baseline of the whole run, unchanged). `git status --short -- .`: `?? ./`.
- `shoot.mjs --out cities-0 --pages /` ✓ (clean). "Before" crops of the current `#waitlist` section: `.shots/cities-0/section/desktop.png` and `mobile.png`
  (tool: `.shots/tools/crop-section.mjs <selector> <outdir> [path]`).
- Imagery rung 3 (logged above). Skills loaded: `frontend-design:frontend-design`, `ui-ux-pro-max` (carousel/keyboard and chip semantics: native buttons with pressed state,
  named icon buttons, full keyboard path; GSAP card reveal 400–600 ms `power2.out`), `design-taste-frontend` (pre-flight), `gsap-plugins` (Draggable + InertiaPlugin, both in the
  installed gsap 3.15.0).

## Cities · Phase 1 (direction) and session items A1–A4
- **D-53 · Cities direction: "the window seat"** (written in `DESIGN.md` → "Cities section" before any code). Each slide is a real kind of vehicle window with the city's landmark outside:
  Maqam Echahid from a bus, Santa Cruz from the tram, the Sidi M'Cid bridge from the cable car. Why: the brief asks for landmarks "seen from transit". The window frame makes that literal
  and ties the city to Tariq's world. The frontend-design second pass replaced the default card carousel (dots, overlay pills, hover button) with named city stops, captions
  outside the image, and a pass that is handed out.
- **D-54 · "Tariq pass", not a credit card** (decided in the prompt). ISO 1.586 transit-card form: mark, "Waitlist pass", city EN + AR, gold tap arcs, "Join the waitlist"; no number,
  chip, bank or scheme marks, and no "credit/debit". Why: Tariq issues no payment card, so a card that looks like one would claim a product that does not exist (§1/§4). Claims-check now fails on
  those terms, on per-city status words, on other cities and on "nine modes".
- **D-55 · Honest success stamp.** The pass stamps "Preview" while `FORM_ENDPOINT` is empty (the status says nothing was sent) and "On the list" only when the POST succeeds.
  `site.ts` emits `lead:done` with `{ sent }`; `LeadForm` gains `variant="pass"` (email only, the city is a hidden input set by the slider) instead of a fork.
- **D-56 · Slider mechanics.** A native scroll-snap track, so touch swipes and inertia need no JS; city stops (`aria-pressed`) as the position indicator; named prev/next
  buttons; arrow keys and Home/End; a live region that stays silent until the first user action; no autoplay. GSAP Draggable plus InertiaPlugin (mouse drag, snap to slides)
  loads only at ≥ 1024 px with a fine pointer and motion allowed, when the section is within 400 px. The travel parallax uses CSS scroll-driven animations (`view(inline)`), so
  no scroll listeners. Reduced motion: no parallax, tilt, flip or drag; faces cross-fade and slide changes are instant. The prompt suggested cross-fading slides; an
  instant snap moves nothing, so it satisfies the reduced-motion intent with less code.
- **D-57 · No-JS fallback.** The track still scrolls and the pass shows Algiers; the form posts nothing without JS (as before). Logged, not built further.
- **Lab variants:** `/lab/cities-a` (carriage) and `/lab/cities-b` (one seat), from the same `CitySlider.astro` (`variant` prop), noindex and filtered out of the sitemap.
- **D-58 · A1 warm mist.** `--c-mist` #c5c8cd → #d3cbbd (6.7:1 on slate, 9.2:1 on graphite): subheads on dark surfaces now sit in the cream family instead of a cool grey.
- **D-59 · A2 /terminal mobile specs.** Two per row at ≤ 899 px, with names at 1.125rem, so the list reads as a set.
- **D-60 · A3 layout variety.** /terminal's film section is a centred stack (copy, then the poster at its native ≤ 854 px; a full-bleed poster would upscale the 480p draft).
  /app's language section is a full-bleed typographic band: "إلى أين؟" set across the width in faint gold (a CSS pseudo-element, so it is decorative and not read twice), with the
  copy and the real search field centred over it.
- **D-61 · A4 /terminal step-through follows scroll on desktop** (founder authority delegated). At ≥ 1024 px with motion allowed, the chips, text and Next button give way to five
  beats that scroll past a sticky stage (ScrollTrigger at `top 62%`, the home ride's grammar), with a sticky "Step n of 5" counter and rail. Phones and reduced motion keep the
  click-through. Why: four critics read the click-through as off-language, and signposting (D-48) did not lift motion. The pinned reveal above stays; the stepper uses sticky, not a pin.
- Build ✓; claims-check 7/7 (two lab pages included) ✓. The existing probe's desktop stepper checks now run under reduced motion (the click-through path), and a new check covers the scroll mode.
  New `.shots/tools/probe-cities.mjs` covers every Phase 2 assertion in the prompt, plus drag, validation and the honest stamp.
- **Lab run 1 failed, and why:** in `/lab/cities-a` the three windows stacked vertically. Live computed styles showed `display: grid; grid-auto-flow: column` but only one
  resolved column (1040 px), with every slide placed into it. With all slides fully visible, the observer made the last city active, "Next" was disabled, and the scripted click timed out.
  **D-62 · The track is a flex row** (`flex: 0 0 100%` per slide; carriage `flex-basis: min(100% - 120px, 1120px)` against the track's inner width). A flex row cannot stack without
  wrap, and grid placement rules cannot apply to its items, so this failure class is gone rather than patched. The same pass gave the Algiers monument wider fronds (80 u base) and
  a heavier crown band, and moved the bus's sliding-pane bar from y 250 to y 190 so it no longer cuts through the fronds.
- **Lab run 2 failed the same way; the root cause.** The built HTML was correct (a stdlib HTML parse showed the three `<figure>`s as direct children of the track), and the track computed
  `display: flex; flex-direction: row; flex-wrap: nowrap`. But the live DOM showed the track with **one child: an unclassed `<div>`** holding all three slides. GSAP **Draggable with
  `type: 'scrollLeft'` wraps the scroller's contents in its own div**, and it loads only on desktop with a fine pointer and motion allowed, near the section. That is exactly where the stacking
  appeared, and it also explains run 1 under the grid layout. D-62 (flex) was therefore not the fix, though it stays because it is simpler.
  **D-63 · Draggable drives a hidden proxy, never the track.** `Draggable.create(proxy, { type: 'x', trigger: track, inertia: true })` maps the proxy's x to `track.scrollLeft` on drag and
  throw. Bounds are the scroll range, a throw snaps to the nearest slide (clamped to the max scroll), and a slow release hands back to native scroll-snap. The track's DOM is never
  touched. Debug tools kept in `.shots/tools/dbg-track*.mjs`.
- **My slip, caught before shipping:** the D-63 edit left a duplicate `});` in `city-slider.ts` (the replacement kept the original closing line), so that background build could not
  pass. It was removed before the next build, and that chain also type-checks the file with `tsc --noEmit` before building.
- **Probe housekeeping for the home change:** the checks that used the home waitlist panel (a light-surface focus ring and the dropdown chevron) moved to /operators' contact form, the only
  remaining form with a select (slate surface, so the ring is gold). The "end of home" check reads the cities section's operators link (`.cities__ops`).
- **A broken gate in my own tooling:** the D-63 chain "exited 0" although its build failed (esbuild syntax error). The gate `npm run build 2>&1 | grep -E "error|Error|…" || STOP` succeeds
  whenever the build *prints* an error, so it never stopped. The preview then served stale output (404 on /lab) and the lab script timed out. **From here, every build gates on the command's own
  exit status** (`npm run build > log 2>&1 || { tail log; exit 1; }`), and results are read from logs, not exit codes.

## Cities · lab decision and Phase 2 (build)
- **Lab run 3 ✓** (after D-63): the track has three direct children, Next moves to Oran with the pass and hidden city input following, focus lands in the email field after the flip,
  scrollWidth is 1440/390 for both variants, and there are no console errors. Screens: `.shots/cities-lab/`.
- **D-64 · Variant B "One seat" ships.** Why:
  1. **One bold thing.** A single window with the frame held still reads as "your seat", and the cities become stops on a gold route line, the same language as the modes strip.
  2. **The pass never hides content.** In A the pass covered the active slide's caption ("Santa Cruz, from the tram." was hidden in `a-desktop-2.png`), and the previous window's
     peek took about a third of the row.
  3. **Less template.** A reads closer to a card carousel; B has no row of cards at all.
  Fixes applied from the lab frames: the three-line heading break ("Pick your / city. Join / the waitlist.") becomes h2 "Pick your city." with the lead "Then join the waitlist. One email
  when the app is ready. Nothing else."; the mobile stops, which wrapped 2 + 1 with the Arabic off-baseline, become three equal cells with Arabic under English.
- **D-65 · Home integration.** `<CitySlider variant="seat" id="waitlist" />` replaces the white waitlist panel, the city row and the graphite operators aside (now a subordinate
  "Operator or city? Talk to us →" link in the controls row). The header's "Join the waitlist" still points to `#waitlist`. The section gets `.cv` (content-visibility, 900 px intrinsic)
  so its inline SVG costs nothing before it nears the viewport, protecting home LCP. Unused `LeadForm`/`CITIES` imports and the `.join*` CSS were removed. **`/lab` was deleted**
  (sitemap filter kept, harmless).
- Also seen in the lab frames: the /terminal scroll-driven step-through ("Step 5 of 5 · On your way" sticky counter, the stage following), the centred film, the 2-up mobile specs and the
  /app full-bleed Arabic band all render as intended. The /app desktop crop showed the band without its heading, likely a reveal-timing capture edge; the full shoot will confirm.
- **Cycle 1 SEE, first run (killed for low memory during the shoot).** Build ✓ (claims-check 5/5, `/lab` gone from dist); verify.mjs 7/7 ✓. Findings:
  - probe-cities, 20 of 23 ✓: labelled carousel and slide semantics; alt text and reserved height (441 px); arrow keys, End, prev/next, stops and the live region ("Oran, 2 of 3");
    no autoplay after 8 s; validation plus the honest "Preview" stamp; reduced motion (no parallax, tilt, flip transform or Draggable); 390 px with one slide and scrollWidth 390; 0 console errors.
  - ✗ **mouse drag jumped two cities** (Algiers → Constantine on a fast 660 px drag: inertia plus nearest-snap follows momentum). **D-66 · a throw moves exactly one city in its direction**
    (under 40 px it settles back), which is what a carousel should do. The "pass opens on Enter" ✗ was only the expected city after that drag (the flip, focus and inert state all passed).
  - ✗ **two phone targets under 44 px**: the pass's "Join the waitlist" (40 px, `btn--sm`) and "Talk to us" (42 px). Both now have a 44 px minimum height.
  - ✗ probe-fixes A4: the check read the Next button's own `display` (still `inline-flex`) while its parent row is hidden, so the probe was wrong (count, screen and beat were right). It now checks
    `.sflow__nav`, `.sflow__steps` and `.sflow__text`.
  - The shoot was killed during home. The next run goes one step per process, waiting for free memory between steps.
- **Cycle 1 SEE, second run (also killed for low memory, this time during the /terminal shoot).** Rebuild ✓ (claims-check 5/5). **probe-fixes: all ✓** (including the corrected A4 check).
  **probe-cities: all ✓**, including the three earlier failures: a mouse drag now moves exactly one city (Algiers → Oran), the pass opens on Enter with focus in the email field and
  the city "Oran", and every 390 px target is ≥ 44 px. Home shoot: 0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow in all four runs, but each is marked ✗ for another reason (read
  from `report.json` next). Most of the machine's memory is held by processes outside this run (two other Claude sessions and the founder's Chrome), so the remaining shoots run one page per background job.
- **Home shoot ✗ was a false positive in `shoot.mjs`, not overflow.** `report.json`: scrollWidth 1440 = innerWidth, 0 console errors, 0 failed requests, 0 HTTP errors, no missing alt or size;
  `overflowOffenders` = the Oran and Constantine slides (right = 2124 and 2908) inside the slider's own clipped scroll track, and the SVG world group (right = 1491) inside a window with
  `overflow: hidden`. The heuristic flags any element whose right edge passes the viewport, without asking whether a clipping ancestor hides it. **Tool fix:** ignore an element
  when an ancestor with `overflow-x` other than `visible` clips it and that ancestor is inside the viewport; a real page overflow (scrollWidth > viewport) still fails.
- **`shoot.mjs` fix (tooling):** the overflow-offender scan now skips an element when a clipping ancestor (`overflow-x` other than `visible`) ends inside the viewport. A slide
  off-screen inside the carousel track, or an SVG layer inside a masked window, can't widen the page; a real page overflow still fails through `scrollWidth > viewport`.
- **/terminal shoot (own job): 4/4 ✓.** Desktop and mobile, normal and reduced motion: 0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow. The desktop (motion) page is 7,289 px tall
  (the scroll-driven step-through, D-61) against 6,589 px with reduced motion (the click-through). Home, /app, /operators, /404, the section crops and home Lighthouse run next as one memory-gated job.
- **Home shoot with the fixed tool: 4/4 ✓** (desktop 6,613 px, reduced 8,821 px, mobile 9,192 px; 0 console errors, 0 failed requests, 0 HTTP errors, 0 overflow). /app desktop ✓. The job was then
  killed for memory again, during /app. Kills now come from Chromium peaks mid-run while about 1.6 GB is held outside this run, so each remaining page, the crops and Lighthouse run as
  separate jobs gated at 1,100 MB available, strictly one at a time.
- **/app shoot killed again, even alone** (desktop and desktop reduced ✓ first). A killed job's `shoot.mjs` and Chromium kept running as orphans and held memory; they are stopped. One `shoot.mjs`
  process still peaks too high on this machine: four contexts in one browser, full-page captures of tall pages, then every sweep frame decoded at once for the contact sheet (`Promise.all` over
  sharp). **Next:** `shoot.mjs` gains `--viewport` and `--motion` filters (one context per process) and builds sheets sequentially with sharp's cache off.
- **`shoot.mjs` (tooling), for the low-memory machine:** `--viewport desktop|mobile` and `--motion normal|reduced` narrow a run to one browser context per process. Contact-sheet tiles are
  decoded one at a time (sharp cache off, concurrency 1). **A latent merge bug is fixed too:** a run dropped *every* earlier report entry for its pages, so a filtered run would have erased that
  page's other viewport and motion results. It now replaces only the page × viewport × motion entries it produces. Also a tooling slip of mine: `pgrep -f "scripts/shoot.mjs"` matched its own
  shell and killed it (exit 144). Process matches now use bracket patterns (`sh[o]ot.mjs`).
- **Second self-kill (exit 144), same class:** the bracket pattern protected only the kill line, but the same background script later runs `node scripts/shoot.mjs` and sets
  `…/ms-playwright/chromium-1228`, so its own shell still matched. **Process matching now filters on the process name** (`ps -eo pid,comm,args`, requiring `comm` to be `node` or `chrome`), and
  it never runs inside a script that names those processes. A shell's `comm` is always `bash`, and the founder's own Chrome (`/opt/google`) is excluded by the `ms-playwright` match.

## Cities · Cycle 1
### SEE (screens: `.shots/cities-1/`, section crops in `.shots/cities-1/section/`)
- Build ✓ (claims-check 5/5, with the cities bans); `/lab` gone from source and dist. verify.mjs 7/7 ✓; probe-fixes all ✓; **probe-cities all ✓** (every Phase 2 assertion, plus drag,
  validation and the honest stamp).
- `shoot.mjs --out cities-1`, run as memory-gated units: **20/20 ✓** (report.json: 20 entries, 0 with problems), 10 contact sheets. Page heights: home desktop 6,613 px, reduced 8,821 px, mobile 9,192 px;
  /terminal desktop 7,289 px; /app mobile 7,841 px; /operators 3,977 / 5,085 px; /404 1,221 / 1,682 px.
- **Home Lighthouse (mobile, 3 runs):** LCP 2,051 / 2,142 / 2,428 ms → **median 98/100/100/100, LCP 2,142 ms, CLS 0, no a11y failures.** Median LCP improved from 2,392 ms, so `.cv` on the
  SVG-heavy section more than paid for it.
- Critique A (Sonnet, fresh context, cities rubric, ≤ 20 images) started. Home is scrolled live in Chrome at desktop width this cycle.
- **My own look at the cycle 1 crops (before the critic's result):** desktop heading breaks as "Pick / your city." (the `.cities__head .h2 { max-width: 16ch }` cap at h2 size in the 4fr
  column), and the lead leaves "else." alone on its last line. Both are queued for the cycle 1 fix pass with the critique's findings (not changed mid-critique, so critic and build match). Mobile reads
  cleanly (three even stop cells, window, caption, full-width pass); the sticky header over the arrows in `mobile.png` is an element-screenshot artefact.

## Cities · course correction (founder)
- **The founder rejected the window-slider build.** "You totally missed the cities section … the correct implementation … `~/Downloads/tariq website/community-section (10).html` …
  not the mess you built." **My mistake:** I read "the cities section in our previous website" as the old repo's `#s-cities` and built my own reading (a single window slider) instead
  of finding and confirming the exact reference. Critique A for cycle 1 (Join 6, Distinct 8, Images+pass 6, Type 8, Consistency 6, Motion 8, Mobile 7, Honesty 10, Perf/a11y 10) scored
  that superseded build and is not acted on.
- **What the reference actually is** (read in full; image data truncated for reading): a centred header over a **drifting infinite marquee** of small photo cards (320×210, radius 14, dark
  bottom gradient). The mouse position over the strip steers speed and direction, and touch drag throws it with momentum (cards cloned ×3). On hover a card's image scales 1.05, its label rises to
  reveal a short description, a gold "Get your card ↗" pill appears, and a **small tilted transit card** (130 px wide, 1.586, rotate 10°, spring ease) pops out past the card's bottom-right corner:
  city-tint dark gradient, grain, light leak, accent line, EMV chip, NFC arcs, big italic initial, masked number, and the city plus "Tariq" footer. Its Algiers image (embedded 1280×698 JPEG: Maqam
  Echahid from a bus window, wooden seats) is **AI-generated with the Gemini watermark visible**. The other cards are gradients. It also shows status badges, mode lists and four other cities.
- **Founder decisions (asked, answered):** (1) **real photos only**: every card gets a photo slot and a shot list, and until then a designed city-tint treatment, never a fake photo (the
  AI image is not used and its watermark is not removed); (2) **the card's look without chip or number**, so it can't read as a bank card; (3) **drift plus pause**: the strip drifts
  and steers by mouse, and stops on hover, keyboard focus and a visible pause button (WCAG 2.2.2), static under reduced motion.
- Honesty rules still in force for the adaptation: no status badges, no cities beyond Algiers, Oran and Constantine, no mode lists that read as coverage, no "we're in your city" (live-service claim).
- **D-67 · The cities section is now `CityMarquee.astro`, adapted from the founder's reference**, replacing the window slider (CitySlider, CityView, CityPass and `city-slider.ts` are deleted).
  Kept from the reference: the warm light-to-dark ground; the centred header (eyebrow with side rules, a two-line title with the second line in gold); the 320×210 photo cards
  (radius 14, dark bottom gradient); the hover state (image 1.05, label rises 54 px to reveal a line, gold pill, and the tilted transit card springing out past the corner with the same eases);
  the drifting, mouse-steered marquee with cloned sets.
  Changed, and why:
  - **Copy.** "We're in your city" became "Algiers, Oran, Constantine. Are you on board?" because "we're in your city" claims a live service (§4). Badges and mode lists are gone. The revealed line is the landmark ("Maqam Echahid, from the bus."), which also names each photo to shoot.
  - **Type.** The site's Mona Sans and IBM Plex Sans Arabic replace Cormorant/Outfit, which keeps the system; the reference's italic accent becomes the gold second line.
  - **The card.** `TransitCard.astro` keeps the gradient, grain, leak, accent line, NFC arcs, big initial and footer, with the Tariq mark in place of the italic wordmark. **No chip, no number** (founder).
  - **Images.** A photo slot per city (`CITY_SCENES[].photo`); until then a city-tint treatment with a ghost Arabic city name drawn as a pseudo-element (**real photos only**, founder). The reference's AI Algiers image is not used.
  - **Accessibility.** The drift runs only with a fine pointer and motion allowed, and stops on hover, keyboard focus, an open panel, off-screen, and a **Pause/Play button** (`aria-pressed`, founder). Clones are `inert` and `aria-hidden` with ids stripped. A focused card is brought fully into view. Touch and reduced motion get a native swipe strip (a first tap opens a card, "Join the waitlist" opens the panel). Escape closes the panel and returns focus.
  - **Sign-up.** "Join the waitlist" (or a click on a card) opens a panel under the strip: that city's large card plus `LeadForm variant="pass"` (email only, the city preset), and "Choose another city". A later city starts a fresh form. The honest note and preview state are unchanged.
- **Probe:** `.shots/tools/probe-cities.mjs` rewritten for the marquee (clones, drift, pause, hover, keyboard focus, the panel with its city and focus, validation, preview, Escape, a fresh form for the next city,
  reduced motion, and 390 touch with tap-to-open, targets and overflow). `--only desktop|reduced|mobile` lets it run in low-memory pieces.
- **Marquee, first verification.** Build ✓ (claims-check 5/5); home shoot **4/4 ✓** (desktop 6,555 px, reduced 8,763 px, mobile 8,802 px; 0 console errors, 0 failed requests, 0 overflow).
  probe-cities: **reduced 1/1 ✓**, **mobile 5/5 ✓** (no drift, scrollWidth 390, a first tap opens the card, the CTA opens the Algiers panel, targets ≥ 44 px, no overflow with the panel open), desktop 10/12:
  clones inert, drift, hover state, keyboard focus in view, panel city/focus/validation/preview/Escape and a fresh form all ✓.
  - ✗ pause and ✗ hover left the strip coasting (0.1 px and 40 px): speed eased toward zero at 6 %/frame. **D-68 · stop fast, start gently:** 20 %/frame toward zero, snapping below 0.05 px.
  - Visual review of `.shots/cities-2/section/*` and `.shots/cities-probe/*`: the section reads like the reference (warm ground, centred header, the strip of tinted cards with ghost Arabic names). **Bug:
    the transit card rendered as a rounded blob** (hover pop-out and panel): its `border-radius: 9cqi` sat on the element that declares `container-type`, and `cqi` resolves against an ancestor
    container (the viewport here), so the radius was about 130 px. **D-69 · px radii** (13 px pop, 22 px large); inner lengths stay in `cqi`. The label lift goes from 54 to 60 px to clear the 44 px pill. The half-faded hover shot
    was the probe's element screenshot scrolling off the hover; it now uses a page-level clip.
- **Marquee recheck ✓.** Build ✓ (claims-check 5/5). probe-cities: **desktop all ✓** (pause now freezes the strip: −1105.7 = −1105.7; hovering holds it: −1105.8 → −1105.8), **reduced all ✓**,
  **mobile all ✓**; home desktop shoot ✓. Visual check (`.shots/cities-probe/desktop-hover.png`, `desktop-panel.png`): the hovered card now matches the reference: label up with the
  landmark line, gold "Join the waitlist ↗" pill, and a real tilted transit card (13 px radius) springing past the corner. The panel shows the city's large card (22 px radius) and the honest preview message.
  The earlier home shoots (desktop reduced, mobile, mobile reduced on the first marquee build) were 3/3 ✓; the later edits were a card radius, a label lift and the JS stop decay.

## Cities marquee · critique loop (founder: "run the critique loop and record the GIFs")
Rules (from the cities prompt, applied to the marquee):
- **Each cycle:** SEE (build, probes, shoots, section crops, a live Chrome look) → an independent Sonnet critic (fresh context, ≤ 20 images, the cities rubric) → VERIFY each finding against the frames → FIX the 1–3
  highest-impact valid ones → LOG.
- **Stop:** two consecutive critiques with **no fixes between them**, every category ≥ 8 and honesty 10, with all checks passing; hard cap 6 cycles.
- **Finish:** GIFs of the final state (`tariq_cities_section.gif` desktop; `tariq_cities_section_mobile.gif` at 390 px if the window can be resized).
Other pages have not changed since `.shots/cities-1/` (20/20 ✓). Home is re-shot into `.shots/cities-2/` on the marquee build.
### Marquee cycle 1 · SEE
- Home shoot on the marquee build: **4/4 ✓** (desktop 6,555 px, reduced 8,763 px, mobile 8,802 px; 0 console errors, 0 failed requests, 0 overflow). verify.mjs **7/7 ✓**. Section crops: `.shots/cities-2/section/`.
- probe-fixes: one ✗, which is a stale probe, not a site bug: the "home end" check still read the old slider's `.cities__ops a` (so `link undefined`). It now reads the marquee's `.cmq__ops`; a re-run is queued after Lighthouse.
- Critique (Sonnet, fresh context, ≤ 20 images, told the marquee is the founder's chosen pattern and photos are deliberately absent) started on `.shots/cities-2/` and `.shots/cities-probe/`.
- **Home Lighthouse on the marquee build (mobile, 3 runs):** LCP 2,269 / 2,436 / 2,210 ms → **median 96/100/100/100, LCP 2,269 ms, CLS 0.001, no a11y failures.** Within budget (LCP ≤ 2.5 s,
  CLS < 0.05). Performance is 2 points below the window-slider build (98, LCP 2,142 ms): the marquee's cards and inline styles sit just below the fold under `.cv`. Watched, not acted on.
### Marquee cycle 1 · CRITIQUE (Sonnet, fresh context)

| Join | Distinct | Cards | Type | Consistency | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 7 | 7 | 7 | 8 | 8 | 8 | **6** | 10 | 9 |

Verdicts (checked against `.shots/cities-2/section/*` and the probe frames):
1. **"Mobile: the heading fills the first screen, no card in view":** mostly misread. In `section/mobile.png` the first card sits at about 330–520 px, inside an 844 px screen. The sheet splits frames at
   85 % steps. Partly valid on pacing, so the phone heading block is tightened (smaller top padding and gap to the strip).
2. **"Resting cards carry no information":** **valid, top fix.** The reference shows a second line on every card at rest (its modes list); ours hid the landmark line until hover, so a touch
   user saw blank tiles. **D-70:** the landmark line is visible at rest (small, muted); hover, focus or tap adds the lift, the pill and the transit card.
3. **"Three cities looping reads as a rerun":** declined. The founder chose the drifting marquee ("Drift + pause"); removing the loop would undo that decision.
4. **"The panel is a flat dark cut":** **valid, cheap. D-71:** the panel takes the selected city's hue (a tint glow from the card side and a tinted border).
5. **"Mobile heading breaks mid-list":** minor, declined. It breaks after "Algiers, Oran," at a list comma.
**My own finding in the live Chrome check (D-72):** the header's "Join the waitlist" (`#waitlist`) lands 75 px past the section top, under the 68 px sticky header (measured: `top: -75` after the click).
A fresh-tab load of `/#waitlist` also overshot, because the jump happens before content above has its final height. Fix: `scroll-margin-top: header + 16 px` on every `[id]` (this also keeps focused
elements out from under the sticky header, WCAG 2.4.11), plus one re-scroll to the hash target after `load`.
- probe-fixes re-run with the marquee selector: **all ✓** ("home end: teaser actions [Watch the film], operators aside buttons 0, link /operators#contact").
- Cycle 1 fixes (D-70 landmark line at rest, D-71 panel tint, D-72 anchor scroll margin + load re-scroll, tighter mobile heading block) applied; rebuild, probes, home shoot into `.shots/cities-3/` and crops running.
### Marquee cycle 2 · SEE (screens: `.shots/cities-3/`)
- Build with the cycle 1 fixes ✓ (claims-check 5/5). probe-cities **desktop, reduced and mobile: all ✓**. Home shoot **4/4 ✓** (mobile 8,802 → 8,762 px from the tighter heading block). Crops in `.shots/cities-3/section/`.
- Live Chrome, fresh tab: the resting cards now show the landmark line; an open card with its transit card renders as intended. **Header "Join the waitlist" click:** the section top stops at 168 px
  (header bottom 68 px; eyebrow at 285 px), so the heading is visible. **Direct load of `/?fresh=2#waitlist`:** still overshot (section top −389 px). The after-load re-scroll used
  `behavior: 'auto'`, which follows the CSS `scroll-behavior: smooth` and was interrupted by later layout. **D-73:** the hash re-scroll is instant, checks again 700 ms later (corrects if more than 24 px off)
  and stops if the reader scrolls, taps or presses a key. Rebuilt; a direct-load retest follows.
- Cycle 2 critique (Sonnet) started on `.shots/cities-3/`, plus the `web-design-guidelines` audit (even cycle).
- **Direct-load retest after D-73:** `/?fresh=3#waitlist` now lands with the section top at 168 px and the heading visible (it was −389 px). But 168 = 2 × 84: `html` already has
  `scroll-padding-top: header + --s-4` (global.css:4), and D-72's `:where([id]) scroll-margin-top` adds the same offset again. Queued fix: delete D-72's rule, and have the settle check read `html`'s scroll padding.
- **`web-design-guidelines` audit (cycle 2; guidelines fetched fresh from vercel-labs/web-interface-guidelines):**
  - global.css:53 double anchor offset (above); site.ts:166 settle check reads the wrong property.
  - CityMarquee.astro:22 heading lacks `text-wrap: balance` (the mobile break the cycle 1 critic noted); :170 `.cmq__panel-title:focus { outline: none }` has no replacement (use
    `:focus:not(:focus-visible)`); :172 `.cmq__close` has no hover state; card CTA and pause button lack `touch-action: manipulation`; :30 the article click is a pointer shortcut, and the keyboard path is the CTA button (pass).
  - city-marquee.ts:128 `getBoundingClientRect()` on every mousemove (cache the rect); panel state not in the URL (skipped, low value).
  - TransitCard.astro ✓; LeadForm.astro ✓ (labels, autocomplete, type/inputmode, spellcheck off, inline errors plus first-error focus, "Sending…", `aria-live` status, explicit select colours).
  These are batched with the cycle 2 critique fixes into one rebuild.
### Marquee cycle 2 · CRITIQUE (Sonnet, fresh context; `.shots/cities-3/`)

| Join | Distinct | Cards | Type | Consistency | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 7 | 7 | 7 | 8 | 7 | 7 | **8** (was 6) | 10 | 9 |

Does not qualify (Join, Distinct, Cards, Consistency and Motion at 7). Verdicts:
1. **"The cream-to-black gradient reads as an accidental vignette":** partly valid. The gradient is the founder's reference ground, so it stays, but **D-74** makes it deliberate: cream holds to 340 px
   (below the subhead), then turns quickly to warm dark (340 → 580 px) behind the strip. The subhead stays on cream (contrast kept).
2. **"The hover pop-out crowds the next card":** partly valid. It overhung the card by 18 px, as in the reference. **D-75:** 8 px.
3. **"The gold tap ring reads as a grey disc on the small card":** misread, since the transit card has NFC arcs and no ring. The "disc" is the ghost initial (an "O" for Oran). It does read as a flat disc, so **D-75** also
   makes the initial lighter (weight 560, width 112 %, 3.5 % opacity).
4. **"About 120 px of dead air above the eyebrow":** valid. **D-76:** top padding `clamp(64px, 6.5vw, 96px)`.
5. **"Mobile list breaks as 'Algiers, Oran,' / 'Constantine.'":** it can't fit one line at a readable title size at 390 px. `text-wrap: balance` is added (audit), and the break stays at the list comma.
Also in this batch, from the audit: the doubled anchor offset removed (html scroll padding stays), the settle check reads `scroll-padding-top`, the panel title uses `:focus:not(:focus-visible)`, "Choose another city" gets a hover state,
the card CTA, pause and close buttons get `touch-action: manipulation`, and the marquee caches the viewport x-extent on enter and resize instead of reading it on every mousemove.
### Marquee cycle 3 · SEE (screens: `.shots/cities-4/`)
- Build with the cycle 2 fixes ✓ (claims-check 5/5). probe-cities **desktop, reduced and mobile: all ✓**. Home shoot **4/4 ✓** (desktop 6,555 → 6,528 px from the tighter top padding). Crops, hover and panel frames in `.shots/cities-4/section/`.
- Live Chrome, fresh tab: **a direct `#waitlist` load lands the section top at exactly 84 px** (= `html` scroll padding; the doubled 168 px is gone). The live-tab header-click reading (4,855 px, a blank frame) came from a
  throttled background tab (smooth scroll runs on animation frames), so the click path is re-measured headless with `.shots/tools/anchor-check.mjs`.
- Resting desktop crop: cream holds under the header copy, then turns deliberately to warm dark behind the strip; the top padding is 96 px.
- Cycle 3 critique (Sonnet) started.
- **Anchor check, headless (`.shots/tools/anchor-check.mjs`):** direct `#waitlist` load ✓ (85 px desktop, 84 px mobile). **Header click ✗ on desktop:** the section top landed at −63 px
  (147 px past the 84 px padding, heading under the header). Mobile click ✓ (80 px). A smooth scroll computes its end at click time, and content above changes height while it scrolls (desktop-only scripts and
  content-visibility). **D-77:** same-page `#` links use one settle routine with the hash load. It scrolls (smooth, or instant under reduced motion), then on `scrollend`
  (fallback timer) corrects once if the target is more than 24 px off `html`'s scroll padding, unless the reader has scrolled, tapped or pressed a key. The URL hash is kept (`pushState`).
- **D-77 verified (headless):** header click lands the section top at **84 px** at 1440 (was −63) and **80 px** at 390; direct `#waitlist` load at 85 / 84 px. ✓
- **Regression caught in review:** cancelling the native anchor jump no longer moves the sequential focus point, so a keyboard skip link would send the next Tab back to the header. **D-78:** in-page
  link clicks move focus to their target (`tabindex="-1"` if needed, `preventScroll`). Containers focused this way draw no region-wide ring. Checks: rebuild, anchor-check, a new skip-link check
  (`.shots/tools/skip-check.mjs`), verify.mjs, probe-fixes, probe-cities desktop.
### Marquee cycle 3 · CRITIQUE (Sonnet, fresh context; `.shots/cities-4/`)

| Join | Distinct | Cards | Type | Consistency | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 6 | 6 | 6 | 8 | 8 | 6 | 7 | 10 | 9 |

Lower than cycle 2 on largely improved frames (reviewer variance again). Does not qualify. Verdicts:
1. **"Hover: the popped card collides with its own landmark line and the next card":** **valid, the one real bug.** Once the landmark line showed at rest (D-70), the 60 px lift left the label under
   the 150 px card. **D-79:** the open label lifts about 110 px, above the popped card (label top-left, pill bottom-left, card bottom-right), and the card sits `right: 6px`, so its tilted corner stays in the gap.
2. **"Resting cards are thin":** partly valid. **D-80:** the tint gets the transit card's fine grain and a soft light. The critic's "skyline linework" is rejected: it would be invented city geometry (banned).
3. **"No stated reason to join":** valid in spirit, but the suggested "when your city goes live" breaks §4 (no launch or live claims). **D-81:** the subhead uses the site's approved promise: "Choose your city. One email
   when the app is ready, nothing else."
4. **"Mobile peek too thin":** valid. **D-82:** mobile cards are 260 px wide (from 280), so the next card clearly peeks.
5. **"No visible close in the panel":** valid and cheap. **D-83:** a labelled × close in the panel corner (44 px), besides "Choose another city" and Escape.
These are applied after the D-78 regression build finishes, so the two builds don't race.
- **D-78 regression checks (so far):** rebuild ✓ (claims-check 5/5); anchor-check ✓ (click 84 / 80 px, direct 85 / 84 px); **skip-link check ✓** (after "Skip to content", the next Tab lands in `main` on
  "Join the waitlist", not the header); verify.mjs **7/7 ✓**. probe-fixes and probe-cities desktop are still running against this build.
- Cycle 3 fixes (D-79 to D-83) are written to source; the rebuild waits for those probes so the served build doesn't change mid-run.
- **D-78 regression checks complete:** probe-fixes **all ✓**, probe-cities desktop **all ✓** (with anchor-check ✓, skip-link check ✓ and verify.mjs 7/7 ✓ above). The focus handoff for in-page links broke nothing.
### Marquee cycle 4 · SEE (running)
- Rebuild with the cycle 3 fixes (D-79 to D-83), probe-cities (desktop, reduced, mobile), anchor-check, home shoot into `.shots/cities-5/`, section crops and probe frames.
- **Cycle 4 SEE results:** build ✓ (claims-check 5/5); probe-cities **desktop, reduced and mobile: all ✓**; anchor-check ✓ (click 84 / 80 px, direct 85 / 84 px); home shoot **4/4 ✓** (mobile 8,762 → 8,793 px
  with the longer subhead). Visual check of `.shots/cities-5/section/`: **hover overlap fixed** (label at the top, pill bottom-left, transit card bottom-right inside the card edge);
  resting cards have grain and soft light; the mobile next-card peek is clearly visible; the panel has the × close and the city tint. Cycle 4 critique (Sonnet) started.
### Marquee cycle 4 · CRITIQUE (Sonnet, fresh context; `.shots/cities-5/`)

| Join | Distinct | Cards | Type | Consistency | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 6 | **5** | 7 | 8 | 6 | 8 | 8 | 10 | 9 |

Motion and mobile rose (8/8); distinctiveness fell on near-identical frames. Scores across cycles 1–4 keep swinging ±1–2. Does not qualify. Verdicts:
1. **"Blue Oran and plum Constantine are off-brand":** declined. The per-city hues come from the founder's reference (blue Oran, purple Constantine), and DESIGN.md allows city tints as secondary accents.
2. **"Resting cards are inert; the grain isn't visible":** **valid, top fix.** D-80's grain is below visibility (overlay at 8 % noise). **D-84:** a stronger grain (soft-light) plus a **thin gold route line with three
   stop dots** on each tint card. That's the site's own route-line language (modes strip, ride), not a map, so there's no invented city geometry.
3. **"Two Algiers cards on screen at once":** declined (as in cycle 1). Three cities in a drifting strip at 1440 px always repeat; it's the founder's chosen marquee.
4. **"The hover transit card is cramped in the corner":** valid, cheap. **D-85:** the pop-out card scales to 0.92 and is inset 14 px from the right and 18 px from the bottom.
5. **"The panel is a bare modal":** partly valid, cheap. **D-86:** the panel background gets the same grain (soft-light) under the city tint.
### Marquee cycle 5 · SEE (screens: `.shots/cities-6/`)
- Build with the cycle 4 fixes ✓ (claims-check 5/5). probe-cities **desktop, reduced and mobile: all ✓**. anchor-check ✓ (click 84 / 80 px, direct 85 / 84 px). Home shoot **4/4 ✓**.
- Visual check (`desktop-hover.png`): each resting card shows the gold three-stop route line and visible grain; the open label sits under the route line; the pop-out card (0.92, inset) stays inside the card corner.
- Cycle 5 critique (Sonnet) started. The cap is 6 cycles.
### Marquee cycle 5 · CRITIQUE (Sonnet, fresh context; `.shots/cities-6/`)

| Join | Distinct | Cards | Type | Consistency | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 6 | 6 | **5** | 6 | 8 | 7 | 6 | 10 | 9 |

Does not qualify. **No valid code finding this cycle:**
1. **"Resting cards read as placeholders; show a static transit card at rest":** this is the deliberate no-photo state (the brief told the critic not to score it), and a permanent card would undo the
   reference's pop-out-on-hover interaction the founder asked for. Declined; closed by the founder's photos.
2. **"Mobile: Oran is a ~15 px sliver with no cue":** misread. `mobile.png` shows about 90 px of Oran with its name visible (D-82).
3. **"The mobile headline break looks broken":** the same finding as cycles 1–3. It breaks at a list comma, and the one-line list can't fit at a readable title size. Declined.
4. **"Two card templates (letterform vs no letterform)":** misread. It's one template; the faint initial shows more on the lighter Algiers gold than on dark Oran.
5. **"The good design is gated behind hover":** the same as 1 (the founder's reference interaction). Declined.
**Cycle 6 therefore runs on the same build with no fixes in between**, which is the stop rule's clean test. The build is final, so the GIFs are recorded in parallel.
Across cycles 1–5 the scores moved within ±2 on near-identical frames, and the recurring weakest categories (Cards, Join, Distinct) all rest on the missing city photographs.
### Marquee cycle 6 · CRITIQUE (Sonnet, fresh context; same build and frames as cycle 5, no fixes between)

| Join | Distinct | Cards | Type | Consistency | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|
| 6 | **5** | 6 | 8 | 6 | 8 | 7 | 10 | 9 |

**Hard cap reached (6 cycles). The loop stops without meeting the stop rule** (two consecutive critiques with every category ≥ 8 and honesty 10). Cycles 5 and 6 judged the identical build and
still differ by up to 2 points per category (Type 6 → 8, Motion 7 → 8, Cards 5 → 6, Consistency 8 → 6), which is reviewer variance, not change. Honesty was 10 in every cycle and Perf/a11y 9.
Cycle 6 findings, for the record (not applied, cap reached):
1. **"Repeats read as colour swatches":** the three-city repeat is the founder's pattern; the suggestion to vary stops or route angle per city is noted as a possible next step.
2. **"Two watermark systems":** misread (same as cycle 5 #4); one template, and the initial's visibility varies with tint.
3. **"Mobile headline stack pushes the strip low":** partly valid; further H1 tightening at 390 px is a possible next step.
4. **"Flat cards next to the dimensional renders":** partly valid; mostly the no-photo state (founder TODO), plus a possible light/bevel pass on the cards.
5. **"Make the gold route line the card's structural spine, animating into the transit card":** a promising idea for the next iteration (it would also answer #1).
Across the loop: Mobile 6 → 8 at peak, Motion 7 → 8, Type 8, Honesty 10, Perf/a11y 9; Cards, Join and Distinct stayed at 5–7, capped mainly by the missing city photographs and the founder's
chosen hover-reveal and repeating-marquee pattern.
- **GIF, first take (`tariq_cities_section.gif`, 11 frames):** rejected on review. Extension hover and click moved the strip, but no frame shows the pop-out card, and the panel opened below the 593 px-tall visible
  area. It is re-recorded with in-page state (pause, keyboard focus opens the card through `:focus-within`, panel scrolled into view before its frame).

### GIFs and D-87 (after the loop)
- **D-87 · The panel close button sits above the pass; on phones the pass gets room below it.** The re-recorded mobile frames showed the large, tilted pass covering the panel's × at 390 px: the
  card drew over the button, which you could only find by its edge. Fix: `.cmq__x { z-index: 2 }` and, under 768 px, `.cmq__panel-card { padding-top: 48px }`. Checked by
  `.shots/tools/close-x-check.mjs`: the × wins the hit test at its centre and the visible card's box no longer overlaps it at 390 or 1440 px. probe-cities mobile and desktop passed again after the rebuild.
- **GIFs re-recorded headlessly** with `.shots/tools/gif-cities.mjs`: real-time frames with measured durations, assembled by ffmpeg with a generated palette. The Chrome extension take kept only 3 frames and the
  background tab stalled the drift. No email was typed, so no address appears in any frame.
  - `~/Downloads/tariq_cities_section.gif`: 1440×900 → 960 px, 15.5 s. Heading, drift, pointer onto Oran (strip stops, card opens, pass pops), "Join the waitlist", Oran panel, close, drift resumes, Pause.
  - `~/Downloads/tariq_cities_section_mobile.gif`: 390×844 → 390 px, 11.5 s. Heading, native swipe along the snap strip, first tap opens Algiers, tap "Join the waitlist", Algiers panel (× now clear).

## D-88 · Cities section: the reference's seven cities and card anatomy, projected into the site (founder direction, 2026-09-15)
**Founder feedback:** the section limited Tariq to "Algiers, Oran, Constantine"; the cards didn't look like the reference (the Arabic word in the tile background); and the reference had to be
projected into the site's UI and UX, not pasted in ("stitching").
**Founder decisions (AskUserQuestion):** all seven reference cities (Algiers, Oran, Constantine, Cairo, Lagos, Kinshasa, Luanda); the reference's badges exactly (Algiers "Live", Oran and
Constantine "Coming soon", the other four "Planned"); the transit card stays without chip or number. I flagged before building that "Live" on Algiers is a public claim the app doesn't meet yet;
the founder chose it. This replaces SITE_V2_PROMPT §4's "no other cities / no status labels" for this section; `claims-check` now allows those words and cities and still bans
payment-card language, "live today" and "live in Algiers".
**What changed**
- **Data-driven cities** (`src/config.ts`): `CITY_SCENES` has status, modes, description, accent, tile and pass gradients; `CITY_STATUS` holds each status's badge, card action
  ("Join the waitlist", "Notify me", "Stay tuned"), accessible name and panel title. `CITIES` (the /app form's select) is derived from it, so the form lists all seven.
- **Card = the reference's anatomy in the site's system:** tile gradient with the site's grain and top-right light; badge top-right; name, modes line; description revealed on hover, focus or tap
  (label rises 58 px); primary gold action pill (44 px target); the transit card springs out past the card's right edge (−18 px, rotated 10°) with the open card lifted above its neighbour.
  Removed: the Arabic background word, the route line, the inline Arabic name (Arabic stays on the large pass in the panel). Type is Mona Sans (not the reference's Cormorant), radius `--r-sm`, focus rings gold.
- **Heading** from the reference: eyebrow "Your city, your card", "We’re in your city." / "Are you on board?", sub "Tap once. Ride everywhere." The home meta description no longer lists three cities.
- **Panel** follows the city: title per status ("Stay tuned for Lagos"), the city's accent as its tint, the city's large pass.
- **No seams:** the ground has a second layer anchored to the bottom so the section always ends on the footer's graphite (it ended on warm brown before: an 18-level seam on phones).
**Checks added:** `.shots/tools/cards-layout.mjs` opens every card at 1440 and 390 px: the raised label stays ≥ 6 px inside the tile, the name's glyphs never touch the badge, the label clears the
action, ≤ 6 % of the description sits under the transit card; samples the section/footer edge. It caught two mobile defects, both fixed: Constantine's name hit "COMING SOON" (phone card: name
1.3125rem, tighter badge) and the brown/graphite seam (bottom layer). Final: all layout checks pass at both widths (edge difference 0 desktop, 1 mobile); probe-cities (updated for seven cities and badges)
passes desktop, reduced motion and mobile.

## D-89 · Cities marquee: no controls row, every card clickable, pointer steering like the reference (founder feedback, 2026-09-15)
**Founder feedback:** remove the Pause button and "Operator or city? Talk to us"; clicking a card sometimes did nothing (e.g. Algiers); steering speed and direction was a struggle,
especially on the left over cards, making it hard to reverse or speed up.
**Causes found**
- **Dead clicks:** the loop's cloned cards were `inert`. Whenever the card under the pointer was a clone (most of the time after the first pass, and always for some cities at some
  offsets), inert blocked hover and click, so nothing happened. Algiers is first in the set, so its visible copy was often a clone.
- **Steering:** hovering any card stopped the strip (`hovering` state). Cards cover most of the strip, so steering only worked from the gaps; on the left you were always over a card.
  Top speed was also low (3.2 px/frame) with a ±12 % dead zone.
**Fix**
- Clones are live copies: `aria-hidden` and every control `tabindex="-1"` (out of the accessibility tree and tab order), no `inert`. A click on any copy opens that city's panel; focus
  returns to the original's action only for keyboard closes (Escape, or Enter/Space on ×); a pointer close doesn't pull focus into the strip.
- Steering as in the reference, tuned: a centre zone (±22 % of the half-width) holds the strip so a card can be picked; outside it, speed rises with the square of the distance to
  7 px/frame at the edge, in the pointer's direction; crossing reverses smoothly (frame-rate-independent easing, 0.12 speeding up, 0.22 stopping). Hover no longer stops the strip;
  keyboard focus, an open panel and off-screen still do. Leaving the strip resumes the idle drift in the last direction.
- Removed the controls row (Pause, "Talk to us") and its CSS; operators stay in the header nav. The WCAG 2.2.2 pause mechanism is now the pointer's centre zone and keyboard focus;
  reduced-motion users get a static swipe strip.
**Checks:** probe-cities rewritten for this behaviour and passing: clones hidden and untabbable; no controls; centre 0 px/s; edges −350 / +403 px/s with reversal; sides 125 / −133 px/s
while over a card; a click on a visible copy of every city opens its panel (Algiers, Oran, Constantine clicked as loop copies); keyboard, Escape, fresh form; reduced and mobile pass.
cards-layout (both widths), probe-fixes (row gone, operators in header), anchor-check pass.

## D-90 · Algiers card image (founder-supplied, 2026-09-15)
**Source:** the founder pasted the Algiers image (1280×698 PNG with an unused alpha channel, 1.0 MB): Maqam Echahid at dusk through a bus window. It is AI-generated (a Gemini ✦ mark sits in the
bottom-right corner); the repo's older `../assets/cities/algiers.webp` is the same kind of image at a lower 800×436, so the pasted one is the source.
**Transformations:** cropped to the card's 320:210 aspect around the window and monument (x 300–1220, y 0–604 → 920×604; no upscaling), alpha dropped, sRGB, WebP q90 master
(`src/assets/cities/algiers-bus.webp`, 59 KB). The crop leaves the corner mark out of frame (the source is kept unmodified outside the repo). Astro builds 320/480/640/900 w WebP at q72
(6.7 / 10.8 / 15.6 / 23.5 KB) with `sizes="336px"` (object-fit: cover draws the image 320 px wide on every card, 1.05× when open; a first "272px, 320px" hint picked a file one step
too small and looked soft): 1× screens load the 480 w file, 2× and 3× the 900 w file; lazy and async; `object-position: 72% 50%` keeps the monument in frame on the narrower phone card; the city
tint sits behind it while it loads; photo cards get a light top shade so the badge reads over the sky, and when a photo card opens a dark veil fades in under the text (the raised modes line and description
sat over the bright middle of the image and read poorly on phones). Alt text: "Illustration: Maqam Echahid above Algiers at dusk, seen through a bus window".
**Honesty note:** SITE_V2_PROMPT and D-67 said "real photos only"; this is the founder's call to use an illustration, so it is described as one rather than passed off as a photo.
**Checks:** cards-layout (both widths), probe-cities (desktop, reduced, mobile) and anchor-check pass with the image. Home Lighthouse 96/100/100/100, LCP 2,517 ms, CLS 0: the LCP
element is the hero phone image (81 % render delay) and the two image-sizing flags are hero phone screens, both unrelated to this lazy, below-the-fold card image.
