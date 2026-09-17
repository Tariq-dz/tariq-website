# HANDOFF — Tariq site v2

A static Astro site: the rider app, the on-board terminal and the operator side of Tariq, in one product-led story.
Nothing is committed. Everything lives in `tariq-website/site-v2/`.

## Install, run, build, deploy
```bash
cd ~/projects/Tariq-dz/tariq-website/site-v2
npm install                     # Node 20.19+ (Astro 5). Node ≥ 22.12 allows moving to Astro 6 later.
npm run dev                     # http://127.0.0.1:4321
npm run build                   # astro build + scripts/claims-check.mjs (the build fails on a banned claim)
npm run preview                 # http://127.0.0.1:4322 serves dist/
bash scripts/prepare-media.sh   # rebuild every media file from the read-only sources (needs ffmpeg)
node scripts/shoot.mjs --cycle N   # screenshots, contact sheets and a health report for every page (preview must run)
```
**Deploy:** `dist/` is plain static files. On Cloudflare Pages use build command `npm run build` and output `dist`.
On GitHub Pages, publish `dist/` (for example with `actions/deploy-pages`). Set the real domain in
`astro.config.mjs` (`site`) and in `public/robots.txt` first.

## Pages
| Route | Purpose |
|---|---|
| `/` | Hero ("Plan in the app. Tap on board.", app and terminal in one frame) → the app → **the ride, end to end** (signature 1, ending on the record reaching the operator view) → the modes, set as type → terminal and film → waitlist with the three cities, and the operator entry ("Talk to us") |
| `/terminal` | **Terminal reveal** (signature 2: angle → front face → paper reload, pinned and scrubbed) → try the real screens → "Sealed. Secure. Built to be trusted." and the details → film → installed and maintained by Tariq |
| `/app` | Plan across modes → departures and map → DZD wallet → trips and alerts → Tariq AI → English and Arabic → waitlist |
| `/operators` | Signed records → the tap → record → operator diagram → the "designed to" intent → operator tools → contact form (with the service note) |
| `/404` | Not found, with links to every page |

## Key decisions (details in `DESIGN.md` and `BUILD_LOG.md`)
- **Two real surfaces, one system.** Paper `#F7F4EF` (sampled from the app) and slate `#3A3E44` (measured on the renders,
  so they sit on it with no cut-out), with gold `#C8A060` as the only accent. One type system (Mona Sans Variable +
  IBM Plex Sans Arabic), one spacing scale, one reveal pattern.
- **Hero direction A ("The stage")**, chosen by an independent critic over a paper-first alternative.
- **The route line** is the only ornament. It connects phone, terminal, record and operator, and carries the modes.
- **Honesty is enforced in code.** `scripts/claims-check.mjs` runs on every build; the small print sits beside every
  render and the film and in every footer; forms say plainly that nothing was sent while the endpoint is empty.
- **Privacy.** Every app clip and still was checked frame by frame: no phone, email, OTP, name or Chargily page. The
  home header's greeting and avatar are painted out. Place cards with star ratings or review counts are not used.
- **Motion.** Two signature moments only; everything else is one 0.6 s reveal. GSAP is imported on demand, only on wide
  screens with motion allowed. Full reduced-motion support (static stacked layouts, posters only). Clips play once per view and last at most 5 s
  (the WCAG 2.2.2 exemption), so no control sits on the devices.

## Asset table (every shipped media file)
Clip crop for all app video: 434×888 at x 53, y 30 of the 540×960 recording (removes the pillarbox, the status bar and the 3-button nav bar).

| Shipped file | Source | Range / crop | Notes |
|---|---|---|---|
| `public/media/clips/home.{mp4,webm,webp}` | `TARIQ_AI_Demo_2min.mp4` | 0:14.2–0:18.8 | greeting "Bonjour, <name>" and avatar painted `#2E2E2E` before cropping |
| `public/media/clips/ai-dayplan.*` | same | 1:38.1–1:41.1 | no place-card ratings in range |
| `public/media/clips/route.*` | same | 1:48.9–1:52.9 | opens on the route card, not the sea-only map top; poster at +1.2 s (step list); plays once per view |
| `public/media/clips/trip.*` | same | 1:55.9–1:58.5 (poster at +1.4 s, five stars) | the rating screen only (the receipt showed a demo "Duration 1 min"); ends before the home greeting returns (1:59) |
| `public/media/film/tariq-terminal-film.mp4` | `tariq-hardware/models/ourterminal/film/tariq-terminal-film.mp4` | full 1:24, 854×480 | re-encoded (CRF 24, faststart), never upscaled, shown in a lightbox |
| `public/media/film/tariq-terminal-film.webp` | same | frame at 1:03 | a front view with no burned caption |
| `src/assets/app/home.png` | demo video | 0:16.0 | greeting and avatar painted out |
| `src/assets/app/map.png` | demo video | 0:20.4 | |
| `src/assets/app/ai-welcome.png` | demo video | 0:36.6 | |
| `public/media/clips/ai-story.{mp4,webm,webp}` | the seven `ai-*` clips below, joined | 26.1 s total | **What the Tariq AI section actually plays.** One continuous flow; the section's background becomes the place on the phone at 5.7 s (Jardin), 10.7 s (Maqam Echahid) and 17.5 s (the Casbah). A single unbroken cut of the source was impossible — it would cross the Chargily window (email, full name) — so the segments are joined instead. Carries a pause control: at 26 s it is past the 5-second WCAG 2.2.2 exemption |
| `public/media/clips/ai-open.{mp4,webm,webp}` | demo video | 0:35.5 +1.5 | input to `ai-story`: the assistant opens, four chips, "Rush hour now?" tapped. **Starts at 35.5 because the profile screen — display name and wallet balance — is on screen through 35.3 and clean only from 35.4** |
| `public/media/clips/ai-rush.*` | same | 0:37.0 +4.2 | beat 2: avoid buses 1, 22 and 26 · departures · Metro M1 beside Bus 26 |
| `public/media/clips/ai-jardin.*` | same | 0:44.4 +5.0 | beat 3: Jardin d'Essai, **Overview → Tips → Getting There tapped** |
| `public/media/clips/ai-martyrs.*` | same | 0:50.4 +4.4 | beat 4: Maqam Echahid, **Overview → Tips → Getting There tapped**. Ends at 54.8, before the assistant returns to its welcome |
| `public/media/clips/ai-day.*` | same | 1:31.0 +2.4 | beat 5: the ask, the Your Day timeline, the budget, four reminders |
| `public/media/clips/ai-casbah.*` | same | 1:33.3 +3.6 | beat 6: the Casbah, **Overview → Tips → Getting There tapped** |
| `public/media/clips/ai-nav.*` | same | 1:47.4 +5.0 | beat 7: the route on the map, every stop, alight at Place des Martyrs, the fare |
| `src/assets/app/places/jardin.jpg` | Wikimedia Commons, `Botanical_Garden_of_Hamma._Algiers,_Algeria.jpg` (4608×3456) | 16:9 crop, master 2400×1350 | **CC BY-SA 4.0, Boumediene15**, cropped. Credited on the page. The same asset `places.go` uses, which is what makes the doubling honest |
| `src/assets/app/places/martyrs.jpg` | Wikimedia Commons, `Martyrs_Memorial._Algiers,_Algeria.jpg` (4608×3456) | 16:9 crop, master 2400×1350 | **CC BY-SA 3.0, Boumediene15**, cropped. Credited on the page |
| `src/assets/app/places/casbah.jpg` | `tariq-app/La-casbah-dAlger.jpg` (1200×800) | 16:9 crop, 1200×675 (native cap) | **No licence record — founder ruling to ship and settle later (D-102).** Exif stripped, no author, matches no Commons file. Uncredited because there is nobody to credit. Also the only photograph below native at desktop width |
| `src/assets/app/topup.png` | demo video | 1:10.6 | top-up confirmed; the wallet screens after it show an "Unlock higher limits … 50,000 DA" banner and are not used |
| `src/assets/app/notifications.png` | `tariq-app/design/screenshots/current/06_notifications.png` | rows 100–2130 | padded to 434:888 with the screen's own background |
| `src/assets/app/search-field.png` | `src/assets/app/home.png` (the redacted home still) | 414×65 at 10,55 | the real search field with its Arabic placeholder, below the painted-out greeting and avatar; shown at no more than native size |
| `src/assets/terminal/face.png` | `ourterminal/renders/front.png` | 767×703 at 166,198 | real screens placed on the glass (238,280, 329×543) in CSS |
| `src/assets/terminal/persp-tight.png`, `reload-tight.png` | `renders/persp, reload` | terminal body box + 10%, square | pole ignored in the box; shown at no more than native size |
| `src/assets/screens/{idle,dest,pay,tap,ok,ticket40}.png` | `ourterminal/screens/` | copied | fares illustrative |
| `src/assets/brand/mark.png` | `tariq-app/logo.png` | transparent margins trimmed | never recoloured |
| `public/favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` | `tariq-app/logo.png` | mark on a graphite tile | the cream arc needs a dark ground |
| `public/og.png` | `logo.png` + `renders/persp.png` | 1200×630 on `#3A3E44` | |

Astro encodes the `src/assets` images to responsive WebP at build.

## Founder TODOs
1. **Form endpoint.** Set `FORM_ENDPOINT` in `src/config.ts` (waitlist and operator contact both POST JSON). Until then, the
   forms validate and say "Nothing was sent yet."
2. **Domain.** Replace `https://tariq.example` in `astro.config.mjs` and `public/robots.txt`.
3. **Analytics.** None is installed. Add a privacy-respecting one and update the privacy wording if needed.
4. **Full-resolution terminal film.** The shipped film is the 854×480 draft.
5. **Final-quality terminal renders.** The back and bottom renders show an untextured label plate and a white slab, and the
   side view reads dark on dark, so none of them is used; the site shows the angle, front and paper-reload views only. The
   finish reads soft next to real product photography.
6. **Real, licensed city photography** for Algiers, Oran and Constantine (none is used today).
7. **FR and AR translations.** Pages take `lang`/`dir` through `BaseLayout`; IBM Plex Sans Arabic is already loaded.
8. **A consistent photographed set of the modes, including a ferry.** The vehicle cut-outs differ in angle, light and edge quality, and no
   ferry image exists, so the modes line uses one icon set instead.
9. **A clean demo recording.** The current video needs redaction (name, phone, email, OTP) and its place cards show
   demo star ratings, which limits which Tariq AI screens can be shown. It is also English only, so the site cannot yet show the
   Arabic interface it mentions: an Arabic capture is needed.

### Cities marquee (home `#waitlist`, adapted from the founder's reference `community-section (10).html`)
- **City photos (the cards show a city-tint treatment until these exist; one line per city in `src/config.ts` → `CITY_SCENES[].photo`).** Landscape, at least 1600 px wide,
  the landmark seen **from inside the vehicle**, no faces, no readable plates, licensed to publish. The reference's AI-generated Algiers image (Gemini watermark) is not used.
  1. ✓ Algiers: done (D-90) with the founder-supplied illustration of Maqam Echahid from a bus. It is AI-generated (Gemini): the card crop leaves its corner mark out of frame and the alt text calls it an illustration. Replace it with a licensed photo if you want "real photos only" back.
  2. Oran: Santa Cruz fort and chapel on Murdjadjo, from the tram or the seafront road.
  3. Constantine: the Sidi M'Cid bridge from the cable car over the Rhumel gorge.
  4. Cairo: the Nile corniche or a metro platform, from a bus or the metro.
  5. Lagos: the lagoon from a ferry, or a BRT lane from the bus.
  6. Kinshasa: Boulevard du 30 Juin from a bus or minibus.
  7. Luanda: the Marginal and the bay from a bus or ferry.
- **"Live" on Algiers is your decision (D-88).** The app hasn't launched, so the badge is a public claim; each city's `status` in `src/config.ts` is one word
  (`live`, `soon`, `planned`) if you want to change it before launch.
- **The transit card** keeps the reference's look without a chip or card number (founder decision), so it can't read as a bank card.
- **Form endpoint.** The sign-up panel uses the same `FORM_ENDPOINT`; until it is set, submitting says plainly that nothing was sent.

## Known issues
- **Not deployable as-is:** `FORM_ENDPOINT` is empty, so both forms say plainly that nothing is sent. The `site` domain is a placeholder
  (`tariq.example`) in `astro.config.mjs` and `public/robots.txt`. See founder TODOs 1–2.
- **Astro 5, not the latest.** This machine has Node 20.19, and Astro 6 needs Node ≥ 22.12. Moving to Astro 6 later needs a Node upgrade and a
  rebuild check.
- **Terminal visuals are limited by the source renders.** The back and bottom renders show an untextured label plate and a white slab, and the side view
  reads dark on dark, so only the angle, front and paper-reload views are used. The film is the 854×480 draft, shown no larger than native.
- **App visuals come from one English-only demo recording.** It needed redaction, its place cards show demo star ratings, and it has no Arabic interface.
  The bilingual claim is shown through the real search field's Arabic placeholder only.
- **Home LCP headroom is thin.** Median 2,425 ms on the seven-city build (earlier: 2,489 and 2,392 ms) against the 2.5 s budget after the post-handoff fixes (A/B against the pre-fix build: identical
  2,392 ms medians); single runs on this machine swing from 2,276 to 2,742 ms, so judge it on a median of at least 3 runs. The remaining cost is render delay
  (style and layout of the long page). /app, /terminal and /operators have more headroom.
- **/404 SEO score is 69 by design** (`noindex`); every indexable page scores 100.
- **Rendering on low-memory machines:** on this 3.8 GB machine, build + screenshot + Lighthouse runs were killed for low memory five times while other
  applications were open. `scripts/shoot.mjs` runs one page per process and waits when memory is low; run Lighthouse on its own.
- **Critique scores varied between reviewers.** The independent critic scored each category between 5 and 9 across cycles, often reversing an earlier
  critic's request. See `BUILD_LOG.md` for every finding, what was fixed, and what was declined with reasons.

## Final rubric scores
Independent critic, fresh for each cycle, scoring 1–10. Cycles 1–7 used Opus; from cycle 8 the critic ran on Sonnet at the founder's request (D-34), with the same rubric.

| Cycle | Clarity | Distinct | Visuals | Type | Rhythm | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 7 | 6 | 5 | 7 | 5 | 5 | 6 | 6 | 6 |
| 5 | 6 | 5 | 6 | 7 | 5 | 6 | 6 | 7 | 6 |
| 10 | 7 | 5 | 7 | 8 | 6 | 7 | 8 | 9 | 8 |
| 13 | 7 | 8 | 7 | 8 | 6 | 6 | 8 | 9 | 8 |
| 14 | 8 | 7 | 7 | 8 | 6 | 6 | 8 | 9 | 8 |
| **15 (cap)** | **8** | **7** | **8** | **8** | **8** | **7** | **8** | **9** | **8** |
| **Post-fix** | **8** | **6** | **8** | **8** | **7** | **7** | **8** | **10** | **9** |
| **Round 2 (best)** | **9** | **8** | **8** | **8** | **8** | **7** | **8** | **10** | **9** |
| **Round 3 A** | **9** | **7** | **6** | **8** | **8** | **7** | **8** | **10** | **9** |
| **Round 4 A (latest)** | **8** | **6** | **6** | **8** | **8** | **7** | **8** | **10** | **9** |

**The stop condition was not met.** It required two consecutive critiques with every category ≥ 8 and honesty at 10. The run stopped at the hard cap of
15 cycles. Every row is in `BUILD_LOG.md`.
After the post-handoff fixes, a critique ran ("Post-fix" row): honesty 10, but distinctiveness 6. Round 2 then redrew the signed-record card (D-45), kept the green
success screen for the steps where it is the subject (D-46), and branded the form controls (D-47). The round 2 critique scored every category **8 or higher except
motion (7)**, with honesty 10. That is the best score of the run, but it still falls short of the stop condition (two consecutive critiques, all ≥ 8).
Round 3 signposted /terminal's step-through (D-48), made the mobile step chips even (D-49) and cut the stacked asks at the end of home (D-50). Its critique (A) scored
visuals 6 and distinctiveness 7 on assets that did not change since round 2 (visuals 8 there), so critique B was not run and **the stop condition is still not met**.
The lowest scores now come from the source assets, not the code: the real app screens (from one demo recording) and only three usable terminal renders. Founder TODOs 5 and 9
(final renders, a clean branded recording) are what close them; re-skinning real app screens is ruled out by §4. Round 4 made "Next step" a secondary outline button (D-51) and composed /404 as two columns (D-52). Critique A still did not qualify (distinctiveness 6, visuals 6,
motion 7), so the stop condition is not met. **Remaining, in order of leverage** (details under "Round 4 · CRITIQUE A" in `BUILD_LOG.md`):
1. Final terminal renders with proper lighting (founder TODO 5). Every critic's visuals score is capped by the current renders.
2. A clean, branded recording of the real app (founder TODO 9).
3. ✓ Done this session (founder authority): /terminal's step-through follows scroll on desktop and stays a click-through on phones and with reduced motion (D-61).
4. ✓ Done: warm mist subheads (D-58), 2-up /terminal mobile specs (D-59), a centred film section and a full-bleed Arabic band on /app (D-60).
5. ✓ Done: the cities section was rebuilt as the founder's marquee (D-67 onward); see "Cities marquee" below.

**Measured (not judged):** claims-check passes on every page; 0 console errors, 0 failed requests, 0 HTTP errors and 0 horizontal overflow at 390 px on every
page (normal and reduced motion); behaviour verifier 7/7; Lighthouse medians of 3 runs: home 98/100/100/100 (LCP 2,338 ms), /terminal 99/100/100/100, /app
100/100/100/100, /operators 100/100/100/100, /404 100/100/100/69 (noindex); first-load JS < 1 KB gzip per page, with GSAP (44 KB) loaded on demand on desktop only.

### What fell short at the cap, and what was done after handoff
Items 1–5 were fixed after the 15-cycle loop, each verified by a scripted probe and a clean screenshot pass (see `BUILD_LOG.md`, "Post-handoff fixes").
No new critique round was run, so the scores above are still the cycle-15 scores.
1. **Fixed: waitlist identical on home and /app.** /app now has its own slate band with a gold rule, "Be first on the app." and
   "We’ll write once, when the Android app is ready to install." Home keeps the white panel with cities and the operators aside.
2. **Fixed: "Operator view" label under the header.** The label fades as the stage starts to unstick (`is-leaving`, set in `ride.ts`). Steps now take the
   stage at 62% of the viewport, and the last step's padding is 48vh, so the operator state holds for about 300 px of scroll. Probed at 1440×900,
   1280×800 and 1024×768 in 50 px steps: 0 samples with the label under the header.
3. **Fixed: form label.** The label is now "Organisation", with a matching error message.
4. **Fixed: ride card small print.** It sits 28 px from the card's top edge, and the stage visuals are centred 14 px lower. The face is capped by stage height (`cqh`).
5. **Fixed: ride steps without body copy.** Every step keeps its line: muted when inactive, full ink when active.
6. **Open, needs the founder: honesty 9.** Step 6 now reads "The operator sees the same record the rider holds." in place of "Where the service that
   ran becomes proof." A copy review with the founder is still the way to close the last point.

## Cities marquee (shipped)
The home `#waitlist` section is a drifting marquee adapted from the founder's reference (`~/Downloads/tariq website/community-section (10).html`). Seven city cards (the reference's cities), each with a status badge, the city's transit modes and, on open, one line of description;
hover, focus or tap lifts the label, shows "Join the waitlist" and springs out the city's transit card. The button opens a city-tinted sign-up panel under the strip. The pointer steers the drift (centre holds, edges run fast, D-89); it
stops for keyboard focus and an open panel, and touch and reduced motion get a swipe strip. No Pause or "Talk to us" row (founder request). Founder decisions (D-88): the reference's seven cities and its badges; still no chip or card number; real photos only. The critique-loop table below scored the earlier three-city version. `CITIES_SECTION_PROMPT.md` (the superseded window-slider brief) is kept for history only.

**Marquee critique loop** (independent Sonnet critic, fresh each cycle; full notes in `BUILD_LOG.md`):

| Cycle | Join | Distinct | Cards | Type | Consistency | Motion | Mobile | Honesty | Perf/a11y |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 7 | 7 | 7 | 8 | 8 | 8 | 6 | 10 | 9 |
| 2 | 7 | 7 | 7 | 8 | 7 | 7 | 8 | 10 | 9 |
| 3 | 6 | 6 | 6 | 8 | 8 | 6 | 7 | 10 | 9 |
| 4 | 6 | 5 | 7 | 8 | 6 | 8 | 8 | 10 | 9 |
| 5 | 6 | 6 | 5 | 6 | 8 | 7 | 6 | 10 | 9 |
| 6 (same build as 5) | 6 | 5 | 6 | 8 | 6 | 8 | 7 | 10 | 9 |

**The stop condition was not met** (two consecutive critiques, every category ≥ 8, honesty 10); the loop stopped at its cap of 6 cycles. Cycles 5 and 6 judged the identical
build and differ by up to 2 points, so part of the spread is reviewer variance. Join, Distinct and Cards stay at 5–7 mainly because the cards have no city photographs yet
(founder TODO above) and because the hover-reveal, repeating marquee is the founder's chosen pattern. Ideas for a next pass: make the gold route line run into the transit card
as its spine (and vary it per city so repeats don't read as swatches), tighten the phone headline so the strip sits higher, add light and bevel to the cards.
After the loop, the re-recorded mobile frames caught the panel's × hidden under the tilted pass at 390 px; fixed (D-87) and hit-tested at 390 and 1440 px.
**Final build, measured:** claims-check 5/5, probe-cities desktop/reduced/mobile all pass, home Lighthouse median of 3: 97/100/100/100, LCP 2,489 ms, CLS 0, TBT 110 ms. After D-88 (seven cities): layout checks, probe-cities, anchor, skip, verify, probe-fixes and every page × viewport × motion shoot pass; home Lighthouse 97/100/100/100, LCP 2,425 ms, CLS 0, TBT 71 ms. After D-89 (steering, live loop copies, no controls row): all cities checks pass; home Lighthouse 96/100/100/100, LCP 2,508 ms (8 ms over the 2.5 s budget on this median; single runs here swing by ±250 ms), CLS 0, TBT 95 ms.

## Recordings
- `~/Downloads/tariq_cities_section.gif`: seven-city marquee at 1440 px (drift; pointer at the right edge runs it left, at the left edge reverses it; centre holds and opens a card; its panel; close), 20 s, 5.4 MB.
- `~/Downloads/tariq_cities_section_mobile.gif`: seven-city marquee at 390 px (swipe, first tap opens Algiers, its panel), 12 s, 0.7 MB.
- `~/Downloads/tariq_site_v2_home.gif`: home, top to bottom (10 frames, 1.3 MB).
- `~/Downloads/tariq_site_v2_terminal.gif`: /terminal, top to bottom (11 frames, 1.3 MB).
Both were recorded in Chrome from the production preview build at 1440×900.
