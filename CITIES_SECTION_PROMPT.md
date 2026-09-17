# MISSION: Design and build Tariq's "Cities" section (site v2) with a build → see → critique loop

You are a senior product designer and front-end engineer, working in a **fresh session with no prior context**.
Everything you need is in this file and the files it points to. **The founder gives you full creative
authority over this section.** Decide, write the decision and its reason in `BUILD_LOG.md`, and keep going.
Don't ask the founder questions. The one exception is §6.4, which lists what to leave as founder TODOs.

Working folder: `/home/ayoub/projects/Tariq-dz/tariq-website/site-v2` (Astro 5, static output, vanilla CSS, GSAP loaded
on demand). The site is built, and its handoff is in `HANDOFF.md`.

---

## 1 · What the founder asked for (their words, cleaned up)

> "I did not like this cities section" (on the home page: the white "Join the waitlist." panel with a plain
> row of *Algiers الجزائر · Oran وهران · Constantine قسنطينة* above the form).
> "Get inspired by the cities section in our previous website: the **sliding cards with images**, amazing images
> that show **a famous thing in the city, seen from transit**. For Algiers, **Maqam Echahid seen from the bus**.
> And **the card that shows up, with the option to fill in the waitlist**."

What you are building: a **city slider** where each slide is a cinematic view of the city's landmark **from
inside a transit vehicle**, and a **Tariq pass card** that slides out of the selected city and carries the
waitlist sign-up for that city. It replaces the current cities row and waitlist panel on the home page. The
section must feel like the rest of the site's bar: *"a commercial ad like iPhone"*, one idea, the product as the hero, nothing that reads as a template.

---

## 2 · Read first (read-only), in this order

1. `site-v2/DESIGN.md`: the design system. Surfaces are paper, slate and graphite; gold `#C8A060` is the one accent; type is Mona Sans + IBM Plex Sans Arabic;
   the motion grammar is set there too. **This section extends the system; it does not start a new brand.**
2. `site-v2/HANDOFF.md` ("Known issues", "Founder TODOs", and the rubric scores) and the last ~150 lines of `site-v2/BUILD_LOG.md`.
3. The current section: `src/pages/index.astro` (section "8 · Waitlist + operators entry", `#waitlist`),
   `src/components/LeadForm.astro`, `src/config.ts` (`CITIES`, `FORM_ENDPOINT`, `SMALL_PRINT`), `src/styles/tokens.css`,
   `src/styles/global.css`, `src/scripts/site.ts` (form handling, reveal, clips).
   Note that `/app` has its **own** waitlist band (D-39). Keep it distinct from home.
4. **Inspiration only** (the previous website, same repo, one folder up; never copy its copy):
   `../index.html` lines 222–350 (section `#s-cities`), `../css/cities.css` (the marquee, `.city-card`, and the `.tc` transit card
   with chip, NFC arcs, masked number and city name), `../js/cities.js` (the infinite marquee and drag). Look at what made it feel alive: the
   depth of the image card, the pass sliding out on hover with a slight rotation, the city-tinted light leak.
5. The claims rules: `../SITE_V2_PROMPT.md` **lines 12–37 (§1)** and **lines 88–167 (§4)**. They still apply in full.

Never read `~/projects/Tariq-dz/tariq-hub/`, or any `.xlsx`, `.docx`, `.pdf` or business-case file in `~/projects/Tariq-dz/`.

---

## 3 · Hard rules

- Create and modify files **only inside `site-v2/`**. Never write to another repo or to `../` (the old site).
- Git: never `commit`, `push`, `reset`, `stash`, `checkout -- .` or `clean`. Leave everything uncommitted.
- Keep what already passes: `npm run build` (includes `scripts/claims-check.mjs`), **0 console errors, 0 failed requests,
  0 horizontal overflow at 390 px** on every page, CLS 0, and Lighthouse accessibility 100 on home.
- **No placeholders in shipped pages.** The only exception is the empty `FORM_ENDPOINT`, and the form must keep saying so honestly.
- Privacy: no phone number, email, personal name or OTP in any frame, image or screenshot.
- Machine: 3.8 GB RAM. Run `scripts/shoot.mjs` one page per process (`--pages /`), and run Lighthouse on its own with
  `--chrome-flags="--headless --no-sandbox --disable-dev-shm-usage --disable-gpu"` and
  `CHROME_PATH=$HOME/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`. `--headless=new` fails to connect on this machine.
  Judge performance on the **median of 3 runs**: single home runs swing from 2.3 to 2.7 s.

---

## 4 · Honesty rules specific to this section (the old section broke most of these; don't carry them over)

The old cities section is **inspiration for form and motion only**. These parts of it are banned:
- ❌ Status badges per city ("Live", "Coming soon", "Planned") and "Algiers live today". §4 bans launch dates and live-service claims.
  "Soon" is the most you may say, and never per city.
- ❌ Any city other than **Algiers, Oran, Constantine** (the old site had Cairo, Lagos, Kinshasa and Luanda).
- ❌ "All nine modes", mode counts, or per-city mode lists that read as coverage ("Tram · Bus · Taxi"). You may name a
  vehicle *in the scene* ("seen from a bus") because that describes the image, not a service claim.
- ❌ Taglines that invent facts ("the city of a million moves"). City copy is **atmosphere plus the landmark's plain name**,
  in English with the Arabic city name. Example: "Algiers · الجزائر: Maqam Echahid, from the bus."
- ✅ "Designed for Algiers, Oran and Constantine" is approved (§1).

**The card.** The founder said "credit card". Tariq **does not issue a payment card**: riders tap *their own* bank card or phone,
and the wallet tops up via Chargily Pay with EDAHABIA or CIB. A Tariq-branded card that looks like a bank card would therefore claim a product that doesn't exist.
**Decision (already made for you): build it as a "Tariq pass", a contactless transit-card form that is the waitlist pass.**
- Keep: ISO card ratio 1.586, a graphite body with city-tinted light, the gold tap-ring arcs (they echo the terminal's NFC ring), the
  Tariq mark (`src/assets/brand/mark.png`, never redrawn or recoloured), the city in English and Arabic, and the label "Waitlist pass".
- Never: card numbers (not even masked `••••`), an EMV chip, bank or scheme logos (CIB, EDAHABIA, Visa, Mastercard), or the words
  "credit", "debit" or "card number". Nothing that could be mistaken for a real payment card.
- The pass is the **call to action**: it carries "Join the waitlist" for that city, and the form opens from it with the city preselected.
- Log this in `BUILD_LOG.md` as a decision with the reason above.

---

## 5 · The experience to design (you choose the exact form; these are the requirements)

**Story in one line:** *pick your city → see it from your seat → your pass slides out → one field and you're on the list.*

1. **Slides.** Three city slides, each a wide cinematic frame of the landmark **seen from inside a vehicle**, with the vehicle's window
   or windscreen as the frame device (for example the window pillar, the rail, the reflection). Suggested views:
   - **Algiers:** Maqam Echahid (the Martyrs' Memorial) seen from a bus on the Riadh El Feth approach.
   - **Oran:** Santa Cruz fort and chapel on Mount Murdjadjo, seen from the tram or the seafront road.
   - **Constantine:** the Sidi M'Cid bridge over the Rhumel gorge, seen from the cable car.
2. **The pass.** Selecting a city (click, tap, Enter/Space, or reaching the slide by swiping) slides and tilts the pass out of that
   slide, in the spirit of the old `.tc-wrap` but deliberate. Choose the choreography with the GSAP skills (§7), using transform and
   opacity only. On the pass: "Waitlist pass · Algiers · الجزائر" and a primary button, "Join the waitlist".
3. **Sign-up.** The button reveals the waitlist form attached to the pass (flip, expand or drawer; your call), with email
   only and the city preselected from the slide. Reuse `LeadForm.astro` logic (validation, the honest note while `FORM_ENDPOINT` is empty,
   the fetch POST when it's set); extend it rather than fork it. The success state "stamps" the pass for that city. It must stay honest:
   nothing is sent while the endpoint is empty, and the page says so.
4. **Slider mechanics.**
   - Drag or swipe with inertia on desktop and touch, plus visible previous/next buttons and a position indicator. Keyboard: arrow keys move between slides and Tab reaches the pass.
   - **No autoplaying marquee.** Anything that moves on its own for more than 5 s needs a pause control (WCAG 2.2.2), so don't autoplay.
   - Use the carousel pattern: a region with `aria-roledescription="carousel"`, slides with `aria-roledescription="slide"` and
     "1 of 3" labels, and an `aria-live="polite"` announcement on change. The hover effect can't be the only way to reveal anything.
   - Reduced motion: no inertia and no tilt; slides and the pass cross-fade.
   - Phones at 390 px: one slide at a time, the pass below the frame, and 44 px+ targets. **No page-level horizontal overflow.** The slider
     track may scroll inside its own clipped container, but the document must never be wider than the viewport.
5. **Home layout.** This section replaces the cities row and the white waitlist panel. Keep an entry for operators (today it is the graphite aside
   "For operators and cities." with a "Talk to us →" link) but make it subordinate. The only solid gold buttons on home stay the real waitlist actions (D-51).
6. **Performance.** The section is below the fold: lazy images with `sizes`, AVIF/WebP via `astro:assets`, reserved aspect
   ratio (CLS 0), and no new render-blocking JS. Keep the slider script tiny, or load GSAP plugins on demand the way `src/scripts/ride.ts` does. **Don't regress
   home LCP** (median 2,392 ms today, budget 2.5 s).

---

## 6 · Imagery: the founder has lifted the "no images of real places" rule for this section, with these conditions

The v2 build banned AI "photos" of real places, and `assets/cities/algiers.webp` is still banned (it is AI-generated with a visible Gemini mark). Don't use it
and don't remove the mark. Source images in this order, and log which rung you used:

1. **Real photography (best).** Look for founder-supplied photos in `site-v2/src/assets/cities/originals/`. If present, use them.
   Crop, grade and frame them in code or with sharp.
2. **Generated imagery (allowed if a tool exists).** Check `claude mcp list` and the available tools for an image or video generation MCP
   (for example Higgsfield). None was connected on 2026-09-15. If one exists:
   - Generate **clearly art-directed, non-photographic illustrations**: painterly or graphic, the site's graphite and gold grade, the
     vehicle interior as the frame. Never a photoreal image passed off as a photo.
   - No readable signage, no operator liveries or logos (ETUSA, SNTF, Métro d'Alger), no people's faces, no watermarks.
   - Put a visible label on every generated image: "Illustration".
   - Save the prompt, model and seed for each image in `BUILD_LOG.md`.
   - `imagegen-frontend-web` may be used first to produce a **section design comp** (one horizontal image for this section) as a reference.
3. **No tool and no photos (fallback that must still ship at full quality).** Build each scene in code: the vehicle frame (window pillar,
   rail, glass reflection) over a graded sky in the city's tint, with the landmark as a **simplified, recognisable silhouette** drawn in SVG from
   public-domain shape knowledge (an abstract silhouette, not a map and not line geometry). It must look intentional and premium, not like a stand-in.
   - The founder's photo shot list goes into `HANDOFF.md` as a TODO (the three views in §5.1, landscape, 2400 px+, shot from inside the vehicle, no faces).
   - The component must accept real photos with a one-line change, per city, in `src/config.ts`.
4. **Founder TODOs** (write them in `HANDOFF.md`, don't ask): the city photos (shot list above), confirmation of the pass design, and the form endpoint.

---

## 7 · Skills: use the ones that help this job, and name them exactly (invoke with the Skill tool)

The approach: one strong design direction committed *before* code, real component and UX rules, professional motion, then review.
**Don't stack style presets.** The direction already exists in `DESIGN.md`.

| Step | Skill (exact name) | Use it for |
|---|---|---|
| Direction | `frontend-design:frontend-design` | Commit to this section's direction inside the existing system: the frame device, the depth, the pass choreography. Write it in `DESIGN.md` before any code. |
| Design intelligence | `ui-ux-pro-max` | Run its searches for carousel and slider UX, card patterns, the GSAP presets and accessibility rules. Use its answers to settle layout, touch targets and the carousel semantics. |
| Anti-slop pre-flight | `design-taste-frontend` | The design read and pre-flight check before building, and again before each critique. |
| Motion | `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-utils`, `gsap-performance` | The drag and inertia slider (`Draggable` + `InertiaPlugin`, or `Observer`), the pass slide-out timeline, `gsap.matchMedia()` for reduced motion, transform and opacity only, cleanup. |
| Image comps (only if an image tool exists) | `imagegen-frontend-web` | One comp image for this section before building (§6.2). |
| System | `design-system` | Add any new tokens (city tints, pass surface) at the semantic and component layers, never raw hex in components. |
| Audit | `web-design-guidelines` | Audit the built section (`dist/index.html`, the new component, CSS, scripts) every second cycle. |
| Testing | `webapp-testing` | Playwright checks of keyboard, swipe, focus, form states and the reduced-motion path. |
| Live look | `claude-in-chrome` tools | Scroll the section live, and record the final GIF. |

Not relevant here: shadcn, dashboard, Material 3, SwiftUI and Expo skills (this is a static Astro marketing page with no React), and the
`minimalist-ui`, `industrial-brutalist-ui` and `high-end-visual-design` presets (the direction is already set).
If a named skill is missing, note it in `BUILD_LOG.md` and continue without it.

---

## 8 · Phases

### Phase 0 · Baseline (no code)
- Record `git -C .. status --short` (outside `site-v2`) and `git status --short -- .` in `BUILD_LOG.md`.
- Start `npm run preview` (port 4322) and shoot the current home with `node scripts/shoot.mjs --out cities-0 --pages /`.
  Crop the current section (desktop 1440 and mobile 390) as the "before".
- Run the §6 imagery check and record which rung applies.

### Phase 1 · Direction (no production code)
- Run `frontend-design:frontend-design`, `ui-ux-pro-max` and `design-taste-frontend`, then write "Cities section" in `DESIGN.md`:
  the concept, the frame device, the pass spec, motion beats (with durations and eases), the mobile layout, a11y semantics, and the imagery rung.
- Build **two** lab variants as pages under `src/pages/lab/cities-a.astro` and `cities-b.astro` (noindex; excluded from the sitemap and claims
  check while they exist). Shoot both at 1440 and 390, pick one, and log why. **Delete `/lab` before finishing.**

### Phase 2 · Build
- Create a component (for example `src/components/CitySlider.astro`, plus `src/scripts/city-slider.ts` loaded on demand) and replace the home
  section. Extend `LeadForm` for the pass variant without breaking `/app` or `/operators` forms.
- Extend `scripts/claims-check.mjs` to fail on: `Live`, `Coming soon`, `Planned`, `live today`, `Cairo|Lagos|Kinshasa|Luanda`,
  `nine modes`, `card number`, `credit`, `debit`, `EMV`, and masked-number patterns `•{4}`, in the built HTML.
- Extend `.shots/tools/probe-fixes.mjs` (or write `.shots/tools/probe-cities.mjs`) to assert:
  - arrow keys change the slide and the live region announces it
  - the prev/next buttons work
  - the pass opens on click and on keyboard, and the form's city matches the slide
  - the reduced-motion path uses no transforms
  - 390 px: one slide in view, `document.documentElement.scrollWidth === 390`, targets ≥ 44 px
  - images have alt text and reserved size
  - no autoplay (the slide index is unchanged after 8 s idle)

### Phase 3 · Loop (cycles N = 1, 2, 3 …; hard cap 6)
1. **SEE:** `npm run build`, then `node .shots/tools/verify.mjs`, the probe, and `shoot.mjs --out cities-N` for **every page** (one per process).
   Crop the section frames. Also scroll home live in Chrome at desktop width once per cycle.
2. **CRITIQUE:** spawn a **fresh `general-purpose` subagent with `model: "sonnet"`** (to save tokens). Give it no conversation context, only:
   - the paths of the section crops, the home contact sheets and the sweep frames
   - `../SITE_V2_PROMPT.md` lines 12–37 and 88–167, plus §4 of this file
   - an image budget of at most 20 images
   - the brief: "a harsh creative director who sees it for the first time; frames scroll in 85% steps, so an edge cut is a capture artefact"
   - the rubric below
   It returns the scores and the top 5 problems (page, section, viewport, file, fix).
   **Rubric (1–10):**
   1. Does the section make you want to join, in 5 seconds?
   2. Distinctiveness: not a template carousel.
   3. Image and pass quality (premium, believable, on-brand).
   4. Typography and hierarchy (EN + AR).
   5. Consistency with the rest of the site.
   6. Motion: purposeful, smooth, never in the way.
   7. Mobile at 390 px.
   8. Honesty against §4 and this file's §4 (must be **10**).
   9. Performance and accessibility.
3. **VERIFY the critique.** Check each finding against the frames before acting. Critics misread capture edges and have swung ±2 on
   unchanged assets. Log each as valid, partly valid or misread, with the evidence.
4. **FIX** the 1–3 highest-impact valid problems at system or component level. **AUDIT** with `web-design-guidelines` on even cycles.
5. **LOG** the cycle (scores table, verdicts, fixes, before/after paths) in `BUILD_LOG.md`.

**Stop when all of these hold:** at least 3 cycles; **two consecutive critiques with no fixes between them**, every category ≥ 8 and honesty = 10;
build and claims-check pass; the probe passes; 0 console errors, 0 failed requests and 0 overflow at 390 on every page; home Lighthouse
median LCP ≤ 2.5 s, CLS 0 and accessibility 100; `/lab` removed. At the cap, stop and list what falls short in `HANDOFF.md`.

---

## 9 · Finish
- Record GIFs with Chrome `gif_creator` (extra frames before and after each action):
  - `tariq_cities_section.gif`: desktop; scroll to the section, swipe or drag through the three cities, open the pass, show the form.
  - `tariq_cities_section_mobile.gif`: 390 px, if the window can be resized.
- Update `HANDOFF.md` with the section, its decisions, the image sources and licence status, founder TODOs (photos, pass confirmation,
  endpoint), known issues and the final rubric scores. Update `DESIGN.md` and `BUILD_LOG.md`.
- Show that `git -C .. status --short` outside `site-v2` is unchanged from Phase 0.
- Stop every server you started. Print `git status --short -- .` and a 10-line summary: what shipped, the imagery rung used, scores,
  and what still falls short.
- **Do not commit.**
