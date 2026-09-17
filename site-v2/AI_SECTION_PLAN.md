# AI SECTION PLAN — one immersive scroll moment on `/app`

Phase 2 of `AI_SECTION_PROMPT.md`. Structure, copy and treatment, decided before any code is written.
Measurements in this file are from Phase 0/1 and are reproducible; nothing here is estimated by eye.

---

## 1 · What this replaces

The `<section class="ai …>` block in `src/pages/app.astro` (heading, lead, four chips, one `ai-dayplan` clip).
Everything else on `/app` is untouched. The page keeps its order; this section keeps its slot.

## 2 · The shape of it

**One section. Six beats. The phone never leaves the frame.**

At ≥ 1024 px with motion allowed and JS present, the section pins and a **single scroll-scrubbed GSAP timeline**
drives three layers at once:

| layer | what changes |
|---|---|
| ground | the full-bleed photograph (or the site's own graphite) |
| phone | the app screen for that beat, inside one fixed phone frame |
| line | the title and its one line |

**One timeline is the whole point.** Two independent triggers would drift, and a ground that lags the phone by a
frame destroys the doubling (`AI_SECTION_PROMPT` §5). Every layer is a tween on the same timeline, so they cannot
separate: the phone and the place change on the same scroll pixel.

Below 1024 px, with reduced motion, or without JS, it degrades — see §7.

## 2a · Final shape (founder, 2026-09-17): the video tells it, not the scroll

**Superseding §2b and §3–§7 below.** Coupling a scrubbed scroll timeline to video playback was the hardest and
least robust part of this section, so the scroll telling is gone. The phone plays the recording straight through
as one continuous 26.1 s flow, and **the section behind it becomes whatever place is on the phone** — the Jardin
d'Essai card appears and the garden fills the section; Maqam Echahid and the Casbah the same.

**The video's clock is the only source of truth.** The ground, the line and the credit are all read from
`currentTime`, so the place filling the section cannot drift from the place on the phone: there is nothing to keep
in sync, only one number to read. A `requestAnimationFrame` loop reads it while playing — `timeupdate` fires about
four times a second and would let the background lag the phone by up to 250 ms, which is exactly the drift that
kills the effect.

| at | ground | line |
|---|---|---|
| 0.0 s | graphite | It knows Algiers. |
| 1.5 s | graphite | When, not just where. |
| **5.7 s** | **Jardin d'Essai** | You might want somewhere calm. |
| **10.7 s** | **Maqam Echahid** | Or somewhere that explains the city. |
| 15.1 s | graphite | Then ask for the whole day. |
| **17.5 s** | **the Casbah** | Every stop, checked the same way. |
| 21.1 s | graphite | Then go. |

**What this removed:** the pin, the scrub, the mobile strip fallback, and GSAP from `/app` entirely. Desktop and
reduced motion are now the same layout. `/app` went from **10,555 px to 7,015 px** — 346 px over the pre-existing
baseline, where the pinned version added nearly 4,000.

**A single continuous cut of the source was not possible**: the span from the AI opening to navigation crosses the
Chargily window (email and full name) and the wallet/manual-plan material. So the seven segments are joined into
one file (`public/media/clips/ai-story.*`) that plays through without stopping — the same viewing experience, no
personal data. The seven per-segment clips remain in `prepare-media.sh` as its inputs.

**It carries a pause control.** At 26.1 s the clip is well past the 5-second WCAG 2.2.2 exemption the site's other
clips rely on (D-31), so this one has a real Pause / Play / Replay button. Under reduced motion nothing autoplays;
the poster stands and the control offers Play.

**Without JavaScript** every line is visible in order as a stacked list and the poster stands in for the video.

**Shape: the wallet section (founder, 2026-09-17).** The phone is exactly `.feat__phone` — `width: min(360px, 80%)`,
**no height cap and no mask**. Capping and fading it, to force the section into one screen, collapsed the phone to
330 px at the founder's 1366×768 window: small and visibly cut. The section is an ordinary `.section` on
`.feat__grid`'s two columns, heading and changing text together in the copy column the way `.feat__copy` holds its
h2 and lead, control and credit overlaid rather than stacked.

**Measured: 858 px — identical to the wallet section**, same padding, same 707 px row, same 360 × 707 phone. The
full-bleed ground that becomes the place on the phone is the only thing that differs.

**The copy column is h2 + lead + body, exactly like `.feat__copy`.** A real sentence-case heading at the site's own
60 px — **"Tariq AI. Your Algiers guide."** — then the changing beat text as lead (26 px) and body. An earlier pass
demoted the heading to a 15 px `Tariq AI · your Algiers guide` label, which `DESIGN.md` rules out, no other section
uses, and which left a lone label stranded above a void. One heading, not two competing.

**The beat blocks need `pointer-events`, not just opacity.** All seven share one grid cell; hiding the inactive six
with `opacity: 0` left them in the hit-testing layer, so invisible blocks sat on top of the visible words and the
text could not be selected at all. `pointer-events: none` on inactive lines, `auto` on `.is-on`.
`.shots/tools/select-aim.mjs` hit-tests the real pixels to guard it.

**Sizes sit clear of the WCAG large-text threshold.** The lead once rendered at 23.998 px — a thousandth under
24 px — so it was graded at 3:1 when 4.5:1 applied. It is 26 px, and the probe grades anything within a pixel of
the threshold strictly.

**"Fits one screen" was my target, not the founder's, and it is retired.** The wallet section does not fit one
screen either — it overflows by 26 px at 1440×900 and 271 px at 1366×648. Matching the reference matters more than
the constraint I invented. Readability follows from the shape rather than driving it: ~76 % of native (9.9 px) at
1440, 59 % on a phone, explicitly deprioritised by the founder.

**Scrim:** one gradient in `--c-graphite`, 0.76 → 0.70 → 0.72 → 0.82. The mid-band carries the body line and was
too light at 0.58–0.62 (Maqam Echahid 3.61:1, the Casbah 3.66:1). Measured now: **12/12 clear AA** — titles
5.10–5.32, bodies 5.09–6.33 at 1440; 6.13–7.98 at 390.

---

## 2b · Superseded: live video driven by scroll, seven pinned beats

**The phone plays video, not stills.** The founder asked to see the interaction — in particular each place card's
**Overview / Tips / Getting There** tabs being tapped — and for the story to follow the recording, "from opening
Tariq AI to navigation after the Casbah". Seven beats, cut from the demo in the order it happens:

| beat | clip | source | what the phone shows |
|---|---|---|---|
| 1 | `ai-open` | 35.5 s +1.5 | Tariq AI opens, four chips, "Rush hour now?" tapped |
| 2 | `ai-rush` | 37.0 s +4.2 | the answer: avoid buses 1, 22, 26 · departures · Metro M1 beside Bus 26 |
| 3 | `ai-jardin` | 44.4 s +5.0 | Jardin d'Essai: **Overview → Tips → Getting There** |
| 4 | `ai-martyrs` | 50.4 s +4.4 | Maqam Echahid: **Overview → Tips → Getting There** |
| 5 | `ai-day` | 91.0 s +2.4 | the ask, the Your Day timeline, the budget, four reminders |
| 6 | `ai-casbah` | 93.3 s +3.6 | the Casbah: **Overview → Tips → Getting There** |
| 7 | `ai-nav` | 107.4 s +5.0 | the route on the map, every stop, the fare, Complete Trip |

**Why video does not break the doubling.** Clips cannot be scroll-scrubbed reliably, so the ground and the phone
still crossfade on the one scroll-linked timeline — that lockstep is unchanged — and each beat's clip simply plays
once when its beat becomes active, the way `ride.ts` already drives its video. Every clip is ≤ 5.0 s, so it plays
once per view with no control (WCAG 2.2.2, D-31), and reduced motion shows posters only.

**Two cuts were wrong and were fixed before shipping.** `ai-open` originally started at 35.2 s, which opens on the
**Profile screen showing a display name and wallet balance** — verified frame by frame: personal data is on screen
through 35.3 and clean from 35.4. And `ai-open` originally ran into `ai-rush`, so beat 1 ended holding the same
answer beat 2 opened on and the phone looked static across the crossfade; they now split at 37.0, so beat 1 ends on
the tap and beat 2 opens on the reply arriving. `ai-martyrs` ends at 54.8, before the assistant returns to its
welcome. The Chargily window (63.5–72.5, email and full name) is nowhere near any range.

**Copy for the seven beats:**

| beat | title | line |
|---|---|---|
| 1 | **It knows Algiers.** | Open it and ask — a place, a stop, or the hour to go. |
| 2 | **When, not just where.** | In the evening peak it points you at the metro, and names the buses to skip. |
| 3 | **You might want somewhere calm.** | Jardin d'Essai du Hamma: when to come, whether there is shade, and the tram that gets you there. |
| 4 | **Or somewhere that explains the city.** | Maqam Echahid, on the hill above the garden. Morning, before the haze — and no shade at all. |
| 5 | **Then ask for the whole day.** | Stops in order, the transport budget, and reminders before you need to leave. |
| 6 | **Every stop, checked the same way.** | The Casbah: open from 08:00, free, twelve minutes from Grande Poste. |
| 7 | **Then go.** | The route on the map, every stop to the door, and the fare before you board. |

Beats 3, 4 and 6 carry their photographs; 1, 2, 5 and 7 stay on graphite — the same arc as before, and still no
rush-hour or navigation photograph is invented.

## 3 · The arc: where the photographs are, and where they are not

| beat | phone shows | ground | why |
|---|---|---|---|
| 1 · It knows Algiers | the welcome state, four chips | **graphite** | open small, on the site's own ground |
| 2 · When, not just where | rush-hour advice, Metro vs Bus | **graphite** | utility, still on the site's ground |
| 3 · Somewhere calm | the Jardin d'Essai card | **Jardin d'Essai, full bleed** | the pivot: the photograph arrives |
| 4 · Or | the Maqam Echahid card | **Maqam Echahid, full bleed** | the founder's key beat |
| 5 · The day, laid out | the Your Day timeline | **the Casbah, full bleed** | it does not just answer, it plans |
| 6 · A whole day | map, budget, reminders | **graphite** | resolves back to the site's ground |

**There is no rush-hour photograph and none was invented** (`AI_SECTION_PROMPT` §3.2). The founder's own beat sheet
already asks for beat 1 "restrained" and beat 6 "back to the site's own ground", so the photographic run is beats
3–5. This is better than photography throughout: the images **bloom in the middle** and the section opens and closes
on the surface the rest of the page lives on. It also means the section needs exactly the three photographs that
exist and are usable.

## 4 · Copy

Sentence case. One idea per beat. No eyebrow, no disclaimer, no pitch-deck register (D-100). Times and fares are
tabular figures. **The assistant answers; it never acts** — nothing below says it pays, books or navigates.

**Section heading** (kept from the shipped page — it is the product's own words, and already approved):
> ## Tariq AI. Your Algiers guide.
> Built into the app. Ask it about a place, a stop, or the time to go.

*(the shipped lead's "file a complaint for you" is dropped: it is the one clause that claims the assistant acts.)*

| beat | title | line |
|---|---|---|
| 1 | **It knows Algiers.** | Ask it about a place, a stop, or the hour to go. |
| 2 | **When, not just where.** | In the evening peak it will point you at the metro, and tell you which buses to skip. |
| 3 | **You might want somewhere calm.** | Jardin d'Essai du Hamma. Shaded, three minutes from the tram at El Hamma. |
| 4 | **Or somewhere that explains the city.** | Maqam Echahid, on the hill above the garden. Morning, before the haze. |
| 5 | **Then it lays out the day.** | Stops in order, with the metro and bus legs between them. |
| 6 | **A whole day, planned.** | Five stops, the transport budget, and reminders before you need to leave. |

**Why beat 4's line is worth its place:** the Jardin d'Essai photograph *shows Maqam Echahid on the hill behind the
garden*. "On the hill above the garden" is not a figure of speech — the reader can see it in the previous beat. The
two places, and the two beats, are physically joined in one frame.

Every fact above comes off the product's own screens: "El Hamma (Tram T1) · ~3 min walk from here", "Now — shaded",
"Morning offers the best conditions and fewer crowds", "5 places · ~14 km round trip", "Schedule 4 reminders".

## 5 · Ground treatment (measured, not eyeballed)

Photographs are treated as a ground, one way for all three (`AI_SECTION_PROMPT` §5).

- **Crop:** 16:9 from the native original, never upscaled.
  Jardin `4608×2592` → master 2400×1350 · Maqam Echahid `4608×2592` → master 2400×1350 · Casbah `1200×675` (native cap).
- **Scrim:** a gradient in **`--c-graphite` (#26282C)** — an existing ground, so no new colour enters the system —
  **anchored to wherever the text actually sits**. The two layouts put it in opposite places, so there are two:
  the strip is strongest at the top (0.82 → 0.64), the pinned stage strongest at the bottom (0.30 → 0.80).
  Either way the far end of the frame stays open, so the sky and the monument still read.
- **Text colour:** `--c-cream` for both the title and the line. The line would normally be muted `--c-mist`, but
  measured over these photographs mist lands at 4.07–4.48:1 — just under AA. The two honest fixes are a heavier
  scrim or lighter text; a heavier scrim buries the photograph, so the text got lighter. No new token.
- **The offline solve, per photograph** (worst-case brightest pixel, modelled scrim):

  | photograph | scrim for body AA 4.5:1 | scrim for large text 3:1 |
  |---|---|---|
  | Jardin d'Essai | 0.61 → 4.60:1 | 0.44 |
  | Maqam Echahid | 0.67 → 4.53:1 | 0.53 |
  | Casbah | 0.66 → 4.63:1 | 0.51 |

  The figures converge, which is why one treatment can serve every beat instead of three hand-tuned fixes.

- **What the solve did not catch, and the browser did.** Modelling assumed the text sat in the *bottom* band,
  which is true of the pinned stage and false of the strip, where the card stacks text at the top. Shipping on the
  model alone would have shipped an AA failure on every phone. `.shots/tools/contrast-aim.mjs` now measures the
  real thing: it records each text block's box, **hides the text**, screenshots the untouched ground, and samples
  the brightest pixel behind it. (Sampling *without* hiding the text measures the glyphs — for cream that returns
  ~1.00:1, which is how the first version of this probe produced nonsense.)

  **Final, measured in-browser, 12/12 pass:**

  | layout | title | line |
  |---|---|---|
  | 390 strip, beats 3–5 | 6.92 · 7.56 · 7.16 (need 4.5) | 6.55 · 7.08 · 6.83 (need 4.5) |
  | 1440 stage, beats 3–5 | 4.25 · 3.56 · 4.46 (need 3, large) | 5.46 · 5.16 · 5.72 (need 4.5) |

- **Motion:** opacity only on the grounds (no parallax on text, no Ken Burns). Transform/opacity throughout.

## 6 · Photo credit

Required, and the site has nowhere to put it today, so it is designed here: a `.fine` line at the foot of the stage,
inside the 0.70 band so it meets AA as small text.

> Jardin d'Essai and Maqam Echahid photographed by Boumediene15, CC BY-SA 4.0 and CC BY-SA 3.0, cropped.

Licences verified individually against the Commons API (Phase 1), both `AttributionRequired: true`. The crop is an
adaptation, so the licence and the fact of cropping are both stated.

**Open, and recorded rather than papered over:** the Casbah image (`tariq-app/.../casbah.jpg`) has **no licence
record** — its Exif is stripped to a stub, it names no author, and it matches no file on Commons. The founder's
ruling (2026-09-17) is to ship it and settle provenance later. It therefore appears in **no** credit line, because
there is nobody to credit and inventing one would be worse than the gap. A licensed replacement is ready
(`Alger Kasbah02.jpg`, CC BY-SA 3.0, Paebi, 3382×2174) and the swap is one import. See BUILD_LOG.

## 7 · Below 1024 px, reduced motion, no JS

**A stacked fallback is the wrong answer here.** Stacking six beats makes the section *longer* on a phone, which is
the opposite of what the founder asked for ("/app stays compact… more screens, not more page").

**Mobile is a horizontal scroll-snap strip:** one card per beat, six cards, at roughly the height of a single card.
Each card carries its beat's photograph as its own ground (inline, `--r-panel`, not full bleed), the phone screen,
and the same title and line. Native CSS scroll-snap, no JS, unaffected by reduced motion, and the same pattern the
cities marquee already ships for touch. The section ends up **shorter than the block it replaces**, not longer.

Two things the strip needs that the pinned stage does not:

- **It must be in the tab order.** The cards hold nothing focusable, so without `tabindex="0"` a keyboard user
  reaches beat 1 and cannot get to the rest. Chrome's keyboard-focusable scroll containers would have hidden this;
  Firefox and Safari would not. It carries `aria-label="Tariq AI, six screens"` so the stop is named.
- **The beats without a photograph need their own ground.** Graphite is the colour of the section behind them, so
  they stopped reading as cards; in the strip they use `--c-slate-deep`, the existing recessed-panel tone.

**Reduced motion at any width** gets the same strip: no pin, no scrub, no crossfade, every beat reachable.

The pinned stage never traps scroll, and every beat's text is in the DOM in order, so keyboard and screen-reader
users pass straight through.

## 8 · Assets

**Phone stills** — cut with the site's standard app crop, `434×888 at (53,30)`, via `scripts/prepare-media.sh`
conventions. Every timestamp is outside the personal-data windows (34 s and 55–56 s profile; 64–72 s Chargily
checkout with an email and a full name), verified frame by frame at native resolution.

| beat | file | source time |
|---|---|---|
| 1 | `ai1-welcome.png` | 35.5 s |
| 2 | `ai2-compare.png` | 39.3 s |
| 3 | `ai3-jardin.png` | 45.4 s |
| 4 | `ai4-martyrs.png` | 52.6 s |
| 5 | `ai5-dayplan.png` | 91.53 s |
| 6 | `ai6-plan.png` | 99.6 s |

**Founder ruling (2026-09-17): the demo-data claims stay visible** — the star ratings, the departures panel's LIVE
badge and "about 3× faster right now". They are pixels in a screenshot, so `claims-check` does not see them; this
is recorded as a deliberate departure from `HANDOFF.md`'s "place cards with star ratings are not used".
**No copy or alt text in this section repeats any of those claims.**

**Photographs** → `src/assets/app/places/{jardin,martyrs,casbah}.jpg`, encoded by `astro:assets` to responsive WebP.

## 9 · Budget

`/app` Phase 0 baseline: **392.5 KB excluding video**, against a **1,536 KB** ceiling — about 1.14 MB of headroom.
Three photographs serve responsive WebP, lazy below the fold, capped at native. GSAP and ScrollTrigger are already
in `dist` for the two existing signature moments, so importing them here costs a desktop download but **no new
bundle bytes**.

## 10 · What must not regress

`/app` Phase 0, median of 3: **98 / 100 / 100 / 100**, LCP **1,767 ms**, CLS **0.000**, TBT **0 ms**.
Page height desktop **6,669**, mobile **7,756**. Shoot `ai-0`: 4/4 clean.

A pinned stage adds real scroll length on desktop by design — that is what "more screens, not more page" means —
and the final height will be reported honestly against these numbers rather than hidden.

## 11 · Build order

1. `AiImmersion.astro` — markup, mobile strip, stage CSS, scrim, credit.
2. `src/scripts/ai-immersion.ts` — the pinned, scrubbed timeline, gated on
   `(min-width: 1024px) and (prefers-reduced-motion: no-preference)` and loaded on demand, following
   `terminal-reveal.ts`.
3. Swap it into `src/pages/app.astro`, delete the old `.ai` block and its orphaned CSS
   (`.ai__*`, and `.chips--dark`, whose only caller was the deleted block).
4. `npm run build` at every step.

**`PhoneFrame.astro` is not modified.** The first draft of this plan called for adding a `<slot name="screen" />`
so one phone could hold six stacked screens. It turned out to be unnecessary: if each beat is a self-contained card
carrying its own `PhoneFrame`, the six cards stack into one grid cell on desktop and lay out as a row on mobile, so
**one DOM serves both layouts**. Only the ground, the line and the screen image inside each card are animated —
never the card, never the bezel — so the phone is constant *by construction* rather than by timing. Styling a
`PhoneFrame` through a passed class is the existing pattern on this page (`.feat__phone`, `.bento__phone`).

**Beat 5's frame was hard to find, and the method matters.** The "Your Day" timeline is on screen for about two
frames (91.53–91.60 s) before the app auto-scrolls to the bottom of a long reply. Contact sheets built with
ffmpeg's `fps` filter drift their drawn labels off true source time in both directions, which sent two earlier
attempts to the wrong frame. The reliable method, used for the shipped still, is to decode and select on real
timestamps — `select='gte(t,91.52)'` with `-vsync 0` — never `-ss` input seeking plus `fps`.
