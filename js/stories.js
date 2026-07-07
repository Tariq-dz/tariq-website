/* ═══════════════════════════════════════════════════════════
   SECTION 2 — PASSENGER STORIES (from passenger-stories-v2.html)
   • All generic ids prefixed `sec-stories-`
   • ScrollTrigger scoped to #sec-stories-wrapper
   • IntersectionObserver toggles body.stories-active so fixed-position
     stories elements (backdrop, dock, scroll-hint, progress bar) are
     only visible while the section is in view.
═══════════════════════════════════════════════════════════ */
(function initStories() {
  const storiesSection = document.getElementById('s-stories');
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Without GSAP the 3-D scene cannot run: keep the intro, drop the
     empty scroll run so the page still reads as a whole. */
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    const w = document.getElementById('sec-stories-wrapper');
    if (w) w.style.height = '100vh';
    return;
  }

  /* Scroll to the top of the stories wrapper (not the top of the page) —
     used when the dock carousel resets the scene on a destination click. */
  function scrollToStoriesTop() {
    const wrap = document.getElementById('sec-stories-wrapper');
    const y = wrap ? wrap.getBoundingClientRect().top + window.scrollY : 0;
    window.scrollTo({ top: y, behavior: 'auto' });
  }

  /* Gate fixed-position stories elements (backdrop / dock / hint / progress)
     so they only show while the section is in view. */
  const storiesActiveObs = new IntersectionObserver(entries => {
    document.body.classList.toggle('stories-active', entries[0].isIntersecting);
  }, { threshold: 0.02 });
  storiesActiveObs.observe(storiesSection);

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════
   CONFIG — all magic numbers in one place
   Tune here; never write raw numbers in animation logic.
══════════════════════════════════════════════════════ */
const DEV_MODE = false; // set true to enable debug logging

const CONFIG = {
  /* Camera */
  CAM_MAX_Z   : 9000,    // px — travel ENDS ON the last beat and holds it (C4: no empty tail)
  Z_END       : 0.97,    // scroll % where Z-travel ends (void collapsed, C3)
  LERP_FACTOR : 0.04,    // base for frame-rate-independent lerp: 1-pow(factor,delta)

  /* Card opacity windows — APPROACH wide enough that adjacent card
     windows overlap; eliminates empty-viewport dead zones mid-travel */
  APPROACH_PX : 2600,    // px before card where it starts fading in
  EXIT_PX     : 900,     // px after camera passes card before it's invisible

  /* Section panels — RETIRED (council 2): they reprised beats 4–5's art
     and message, reading as the same Pivot shown three times. Windows
     pushed past 1.0 so they never fire; markup/build kept for rollback. */
  P1_IN  : 2.0, P1_OUT : 2.1,
  P2_IN  : 2.2, P2_OUT : 2.3,

  /* Dock */
  ICON    : 68,
  GAP     : 14,
  LABEL_W : 246,
  NUM     : 5,
  CTR     : 2,
  ANIM_MS : 460,
};

/* Small-screen tuning (evaluated once at boot):
   – compact dock so all five pills truly fit a 390px viewport
     (right edge = slotX(NUM-1) + ICON = 370px at these values)
   – narrower card opacity windows so adjacent beats' captions
     never pile up in the same small frame */
if (window.innerWidth <= 900) {
  CONFIG.APPROACH_PX = 2200; CONFIG.EXIT_PX = 800;
}
if (window.innerWidth <= 720) {
  CONFIG.ICON = 44; CONFIG.GAP = 8; CONFIG.LABEL_W = 118;
}

/* Derived dock geometry — computed once from CONFIG */
const STEP   = CONFIG.ICON + CONFIG.GAP;
const PILL_W = CONFIG.ICON + CONFIG.LABEL_W;
const ROW_W  = CONFIG.CTR * STEP + PILL_W + CONFIG.GAP + (CONFIG.NUM - CONFIG.CTR - 1) * STEP;

/* Destructure frequently-used values for brevity in hot paths */
const { CAM_MAX_Z, Z_END, APPROACH_PX, EXIT_PX, P1_IN, P1_OUT, P2_IN, P2_OUT } = CONFIG;

/* ══════════════════════════════════════════════════════
   DATA — 5 Destinations × 5 Story Cards + 2 Panels
══════════════════════════════════════════════════════ */
const DESTINATIONS = [
  {
    /* 0 — UNIVERSITY */
    id:0, emoji:'🎓', label:'University', color:'#c94444', bg:'#e8d4d4',
    cards:[
      { beat:'The Context / The Rush', num:'01',
        title:'8:47 AM. Gates close at 9:05.',
        body:'Amina\'s lecture starts in thirteen minutes. Missing the first ten is a disaster.',
        grad:`radial-gradient(ellipse 68% 58% at 42% 32%,rgba(220,60,60,.62),transparent 60%),
              radial-gradient(circle at 72% 75%,rgba(140,20,20,.45),transparent 44%),
              linear-gradient(165deg,#1c0404,#080202)`,
        accent:'#e05050',
        svg:`<svg viewBox="0 0 260 320" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <circle cx="130" cy="148" r="78" fill="none" stroke="rgba(220,80,80,.26)" stroke-width="2.2"/>
          <circle cx="130" cy="148" r="56" fill="none" stroke="rgba(220,80,80,.14)" stroke-width="1.4"/>
          <circle cx="130" cy="148" r="5"  fill="rgba(255,110,110,.9)"/>
          <line x1="130" y1="148" x2="130" y2="88"  stroke="rgba(255,130,130,.75)" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="130" y1="148" x2="164" y2="130" stroke="rgba(255,130,130,.55)" stroke-width="4.5" stroke-linecap="round"/>
          <line x1="130" y1="75"  x2="130" y2="84"  stroke="rgba(255,100,100,.42)" stroke-width="2.2"/>
          <line x1="130" y1="212" x2="130" y2="220" stroke="rgba(255,100,100,.28)" stroke-width="1.8"/>
          <line x1="57"  y1="148" x2="65"  y2="148" stroke="rgba(255,100,100,.28)" stroke-width="1.8"/>
          <line x1="195" y1="148" x2="203" y2="148" stroke="rgba(255,100,100,.28)" stroke-width="1.8"/>
          <ellipse cx="130" cy="148" rx="40" ry="40" fill="rgba(200,50,50,.07)"/>
        </svg>`,
        w:'clamp(190px,22vw,270px)', h:'clamp(248px,30vw,360px)',
        pos:'top:8vh;left:5vw' },
      { beat:'The Planning', num:'02',
        title:'Real-time. No guessing.',
        body:'Bus 14 in 3 min, metro in 8. She picks the metro — she\'s done this before.',
        grad:`repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(255,80,80,.04) 28px,rgba(255,80,80,.04) 29px),
              radial-gradient(ellipse 70% 56% at 50% 40%,rgba(200,50,50,.36),transparent 65%),
              linear-gradient(150deg,#180306,#06010a)`,
        accent:'#c94444',
        svg:`<svg viewBox="0 0 310 200" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <rect x="38" y="65" width="204" height="84" rx="13" fill="rgba(200,50,50,.18)" stroke="rgba(220,80,80,.3)" stroke-width="1.5"/>
          <rect x="52"  y="76" width="34" height="26" rx="4" fill="rgba(255,150,150,.14)"/>
          <rect x="95"  y="76" width="34" height="26" rx="4" fill="rgba(255,150,150,.14)"/>
          <rect x="138" y="76" width="34" height="26" rx="4" fill="rgba(255,150,150,.14)"/>
          <circle cx="76"  cy="157" r="14" fill="rgba(200,50,50,.3)" stroke="rgba(220,80,80,.4)" stroke-width="1.5"/>
          <circle cx="206" cy="157" r="14" fill="rgba(200,50,50,.3)" stroke="rgba(220,80,80,.4)" stroke-width="1.5"/>
          <line x1="16" y1="171" x2="280" y2="171" stroke="rgba(200,50,50,.2)" stroke-width="1.5" stroke-dasharray="6,4"/>
        </svg>`,
        w:'clamp(210px,26vw,320px)', h:'clamp(136px,16vw,210px)',
        pos:'top:10vh;right:4vw' },
      { beat:'The Journey Begins', num:'03',
        title:'On the metro. Moving.',
        body:'Live delay alert fires: Line B running 4 minutes late. The app is already thinking.',
        grad:`radial-gradient(ellipse 62% 62% at 46% 36%,rgba(220,60,60,.52),transparent 62%),
              radial-gradient(circle at 74% 70%,rgba(140,18,18,.44),transparent 46%),
              linear-gradient(166deg,#0e0202,#040101)`,
        accent:'#e05050',
        svg:`<svg viewBox="0 0 250 310" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <rect x="30" y="58" width="190" height="130" rx="10" fill="rgba(200,50,50,.14)" stroke="rgba(220,80,80,.28)" stroke-width="1.4"/>
          <rect x="44" y="72" width="62" height="100" rx="6" fill="rgba(200,50,50,.1)"/>
          <rect x="124" y="72" width="62" height="100" rx="6" fill="rgba(200,50,50,.1)"/>
          <line x1="72" y1="205" x2="72" y2="280" stroke="rgba(200,50,50,.2)" stroke-width="2"/>
          <line x1="178" y1="205" x2="178" y2="280" stroke="rgba(200,50,50,.2)" stroke-width="2"/>
          <line x1="54" y1="224" x2="196" y2="224" stroke="rgba(200,50,50,.12)" stroke-width="1.5"/>
          <line x1="54" y1="248" x2="196" y2="248" stroke="rgba(200,50,50,.12)" stroke-width="1.5"/>
        </svg>`,
        w:'clamp(186px,21vw,256px)', h:'clamp(238px,27vw,318px)',
        pos:'bottom:14vh;left:24vw' },
      { beat:'The Pivot / App Feature', num:'04',
        title:'Exit early. Walk 6 min.',
        body:'Exit one stop earlier, walk six minutes. Arrival time improves by two minutes.',
        grad:`radial-gradient(circle at 50% 40%,rgba(220,60,60,.64),rgba(150,14,14,.36) 42%,transparent 64%),
              linear-gradient(180deg,#1a0204,#060101)`,
        accent:'#c94444',
        svg:`<svg viewBox="0 0 270 320" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <path d="M135 60 C98 60 70 88 70 124 C70 168 135 226 135 226 C135 226 200 168 200 124 C200 88 172 60 135 60Z" fill="rgba(220,60,60,.26)" stroke="rgba(255,90,90,.46)" stroke-width="2"/>
          <circle cx="135" cy="122" r="24" fill="rgba(220,60,60,.52)" stroke="rgba(255,110,110,.62)" stroke-width="2"/>
          <circle cx="135" cy="122" r="11" fill="rgba(255,140,140,.8)"/>
          <circle cx="135" cy="122" r="36" fill="none" stroke="rgba(220,60,60,.2)"  stroke-width="1.5"/>
          <circle cx="135" cy="122" r="52" fill="none" stroke="rgba(220,60,60,.1)"  stroke-width="1"/>
        </svg>`,
        w:'clamp(198px,22vw,272px)', h:'clamp(252px,28vw,332px)',
        pos:'top:10vh;right:20vw' },
      { beat:'The Arrival', num:'05',
        title:'9:03 AM. Two minutes to spare.',
        body:'She slides into her seat. The lecturer is still pulling up the slides. She made it.',
        grad:`radial-gradient(ellipse 60% 55% at 44% 35%,rgba(255,90,90,.42),transparent 60%),
              radial-gradient(circle at 68% 72%,rgba(160,20,20,.38),transparent 45%),
              linear-gradient(160deg,#160304,#080102)`,
        accent:'#e05050',
        svg:`<svg viewBox="0 0 260 310" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <rect x="28" y="55" width="204" height="140" rx="12" fill="rgba(200,50,50,.14)" stroke="rgba(220,80,80,.28)" stroke-width="1.4"/>
          <line x1="28" y1="82"  x2="232" y2="82"  stroke="rgba(220,80,80,.15)" stroke-width="1"/>
          <rect x="42" y="94"  width="55" height="40" rx="5" fill="rgba(220,80,80,.12)"/>
          <rect x="108" y="94" width="55" height="40" rx="5" fill="rgba(220,80,80,.18)"/>
          <rect x="174" y="94" width="44" height="40" rx="5" fill="rgba(220,80,80,.1)"/>
          <rect x="42" y="145" width="55" height="38" rx="5" fill="rgba(220,80,80,.1)"/>
          <rect x="108" y="145" width="55" height="38" rx="5" fill="rgba(255,110,110,.22)" stroke="rgba(255,120,120,.4)" stroke-width="1"/>
          <polyline points="116,165 126,175 142,155" fill="none" stroke="rgba(255,150,150,.85)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        w:'clamp(196px,22vw,268px)', h:'clamp(244px,28vw,322px)',
        pos:'bottom:10vh;left:6vw' },
    ],
    panels:[
      { tag:'The Pivot', h:'Rerouted in<br><em>real time</em>',
        p:'A live delay alert changed her plan instantly. No fumbling, no guessing — just a better route.',
        icon:'📍',
        artBg:`radial-gradient(circle at 50% 40%,rgba(220,60,60,.66),rgba(150,14,14,.36) 42%,transparent 64%),linear-gradient(180deg,#1a0204,#060101)` },
      { tag:'The Arrival', h:'Two minutes<br><em>to spare</em>',
        p:'She made her exam. The app knew the way when she was too stressed to think.',
        icon:'🎓',
        artBg:`radial-gradient(ellipse 65% 58% at 42% 36%,rgba(255,90,90,.45),transparent 62%),linear-gradient(160deg,#160304,#080102)` },
    ],
  },

  {
    /* 1 — OFFICE */
    id:1, emoji:'💼', label:'Office', color:'#d4820a', bg:'#ecddd0',
    cards:[
      { beat:'The Context / The Rush', num:'01',
        title:'22 km every morning.',
        body:'Hassan\'s commute used to be the most stressful part of his day. Not anymore.',
        grad:`radial-gradient(ellipse 70% 55% at 50% 40%,rgba(220,130,20,.45),transparent 60%),
              radial-gradient(circle at 20% 70%,rgba(160,80,5,.4),transparent 46%),
              linear-gradient(160deg,#140a02,#080400)`,
        accent:'#d4820a',
        svg:`<svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <rect x="20" y="110" width="30" height="58" rx="2" fill="rgba(220,130,20,.14)"/>
          <rect x="57" y="82"  width="25" height="86" rx="2" fill="rgba(220,130,20,.18)"/>
          <rect x="90" y="97"  width="35" height="71" rx="2" fill="rgba(220,130,20,.14)"/>
          <rect x="133" y="70" width="28" height="98" rx="2" fill="rgba(220,130,20,.20)"/>
          <rect x="170" y="92" width="32" height="76" rx="2" fill="rgba(220,130,20,.16)"/>
          <rect x="212" y="77" width="25" height="91" rx="2" fill="rgba(220,130,20,.18)"/>
          <rect x="245" y="106" width="35" height="62" rx="2" fill="rgba(220,130,20,.13)"/>
          <rect x="62" y="89" width="7" height="5" rx="1" fill="rgba(255,200,80,.3)"/>
          <rect x="138" y="79" width="7" height="5" rx="1" fill="rgba(255,200,80,.34)"/>
          <rect x="178" y="100" width="7" height="5" rx="1" fill="rgba(255,200,80,.28)"/>
        </svg>`,
        w:'clamp(210px,26vw,318px)', h:'clamp(134px,16vw,206px)',
        pos:'top:10vh;right:4vw' },
      { beat:'The Planning', num:'02',
        title:'Coffee. One tap. Route set.',
        body:'He saves "Home → Work". Every morning: one tap, the app does the rest.',
        grad:`repeating-linear-gradient(0deg,transparent,transparent 22px,rgba(220,130,20,.04) 22px,rgba(220,130,20,.04) 23px),
              radial-gradient(ellipse 60% 56% at 50% 40%,rgba(200,110,15,.38),transparent 62%),
              linear-gradient(155deg,#120900,#06030a)`,
        accent:'#d4820a',
        svg:`<svg viewBox="0 0 252 322" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <rect x="40" y="58" width="172" height="132" rx="10" fill="rgba(200,110,15,.14)" stroke="rgba(220,140,30,.3)" stroke-width="1.5"/>
          <rect x="55" y="73" width="65" height="100" rx="6" fill="rgba(200,110,15,.1)"/>
          <rect x="130" y="73" width="65" height="100" rx="6" fill="rgba(200,110,15,.1)"/>
          <rect x="145" y="108" width="28" height="48" rx="4" fill="rgba(255,180,50,.12)" stroke="rgba(255,200,80,.3)" stroke-width="1"/>
          <line x1="78" y1="210" x2="78" y2="290" stroke="rgba(200,110,15,.2)" stroke-width="2"/>
          <line x1="174" y1="210" x2="174" y2="290" stroke="rgba(200,110,15,.2)" stroke-width="2"/>
          <line x1="58" y1="228" x2="194" y2="228" stroke="rgba(200,110,15,.12)" stroke-width="1.5"/>
          <line x1="58" y1="252" x2="194" y2="252" stroke="rgba(200,110,15,.12)" stroke-width="1.5"/>
        </svg>`,
        w:'clamp(184px,21vw,254px)', h:'clamp(238px,28vw,324px)',
        pos:'top:9vh;left:6vw' },
      { beat:'The Journey Begins', num:'03',
        title:'Express train. 70% capacity.',
        body:'The app flagged a calm car. He boarded and found an empty row waiting.',
        grad:`radial-gradient(ellipse 64% 58% at 48% 36%,rgba(220,130,20,.52),transparent 62%),
              radial-gradient(circle at 74% 70%,rgba(140,75,5,.44),transparent 46%),
              linear-gradient(168deg,#0e0802,#04030a)`,
        accent:'#F5A53A',
        svg:`<svg viewBox="0 0 310 192" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <rect x="30" y="58" width="252" height="90" rx="14" fill="rgba(220,130,20,.18)" stroke="rgba(220,140,30,.32)" stroke-width="1.4"/>
          <rect x="46" y="72" width="42" height="36" rx="5" fill="rgba(255,180,80,.14)"/>
          <rect x="96" y="72" width="42" height="36" rx="5" fill="rgba(255,180,80,.18)"/>
          <rect x="146" y="72" width="42" height="36" rx="5" fill="rgba(255,180,80,.14)"/>
          <rect x="240" y="66" width="32" height="82" rx="5" fill="rgba(220,130,20,.28)" stroke="rgba(255,180,80,.4)" stroke-width="1.5"/>
          <circle cx="80"  cy="156" r="15" fill="rgba(220,130,20,.3)" stroke="rgba(255,180,80,.4)" stroke-width="1.5"/>
          <circle cx="232" cy="156" r="15" fill="rgba(220,130,20,.3)" stroke="rgba(255,180,80,.4)" stroke-width="1.5"/>
          <line x1="10" y1="171" x2="302" y2="171" stroke="rgba(220,130,20,.2)" stroke-width="2"/>
        </svg>`,
        w:'clamp(206px,26vw,314px)', h:'clamp(134px,16vw,206px)',
        pos:'bottom:14vh;right:8vw' },
      { beat:'The Pivot / App Feature', num:'04',
        title:'Crowd prediction. Seat found.',
        body:'Mobile ticketing means no queue. He walks straight through. The gate beeps green.',
        grad:`radial-gradient(circle at 50% 40%,rgba(220,130,20,.62),rgba(150,75,5,.34) 42%,transparent 64%),
              linear-gradient(180deg,#160a00,#070300)`,
        accent:'#d4820a',
        svg:`<svg viewBox="0 0 268 318" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <rect x="44" y="90" width="180" height="100" rx="10" fill="rgba(220,130,20,.2)" stroke="rgba(240,160,40,.35)" stroke-width="1.5"/>
          <line x1="44" y1="140" x2="224" y2="140" stroke="rgba(240,160,40,.2)" stroke-width="1" stroke-dasharray="4,3"/>
          <rect x="60" y="150" width="3" height="28" rx="1" fill="rgba(240,160,40,.4)"/>
          <rect x="66" y="150" width="6" height="28" rx="1" fill="rgba(240,160,40,.35)"/>
          <rect x="75" y="150" width="2" height="28" rx="1" fill="rgba(240,160,40,.4)"/>
          <rect x="62" y="102" width="22" height="18" rx="3" fill="rgba(240,160,40,.2)"/>
          <rect x="90" y="102" width="22" height="18" rx="3" fill="rgba(240,160,40,.3)"/>
          <polyline points="93,112 97,116 104,108" fill="none" stroke="rgba(255,200,80,.85)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="80" y="215" width="108" height="68" rx="8" fill="rgba(220,130,20,.15)" stroke="rgba(240,160,40,.3)" stroke-width="1"/>
          <rect x="90" y="225" width="88" height="12" rx="3" fill="rgba(240,160,40,.2)"/>
        </svg>`,
        w:'clamp(196px,22vw,270px)', h:'clamp(246px,28vw,322px)',
        pos:'top:9vh;left:30vw' },
      { beat:'The Arrival', num:'05',
        title:'8 minutes early. Every time.',
        body:'The commute that used to beat him. Now it\'s the quietest part of his day.',
        grad:`radial-gradient(ellipse 64% 55% at 44% 36%,rgba(240,150,30,.44),transparent 60%),
              radial-gradient(circle at 70% 72%,rgba(160,90,5,.38),transparent 46%),
              linear-gradient(162deg,#140a02,#060300)`,
        accent:'#F5A53A',
        svg:`<svg viewBox="0 0 258 308" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <rect x="28" y="54" width="202" height="138" rx="12" fill="rgba(220,130,20,.14)" stroke="rgba(240,160,40,.28)" stroke-width="1.4"/>
          <rect x="42" y="90" width="55" height="40" rx="5" fill="rgba(220,130,20,.12)"/>
          <rect x="107" y="90" width="55" height="40" rx="5" fill="rgba(220,130,20,.18)"/>
          <rect x="172" y="90" width="44" height="40" rx="5" fill="rgba(220,130,20,.1)"/>
          <rect x="42" y="140" width="55" height="38" rx="5" fill="rgba(255,180,50,.22)" stroke="rgba(255,200,80,.4)" stroke-width="1"/>
          <polyline points="50,160 60,170 76,150" fill="none" stroke="rgba(255,220,100,.85)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        w:'clamp(196px,22vw,266px)', h:'clamp(244px,28vw,316px)',
        pos:'bottom:10vh;left:5vw' },
    ],
    panels:[
      { tag:'The Pivot', h:'Crowd levels,<br><em>predicted</em>',
        p:'The app found him an empty car before he even boarded. No squeezing, no standing.',
        icon:'🎫',
        artBg:`radial-gradient(circle at 50% 40%,rgba(220,130,20,.62),rgba(150,75,5,.34) 42%,transparent 64%),linear-gradient(180deg,#160a00,#070300)` },
      { tag:'The Arrival', h:'Gate green.<br><em>Every morning.</em>',
        p:'Mobile ticketing skipped the queue entirely. He arrives early enough to get coffee.',
        icon:'💼',
        artBg:`radial-gradient(ellipse 64% 55% at 44% 36%,rgba(240,150,30,.44),transparent 60%),linear-gradient(162deg,#140a02,#060300)` },
    ],
  },

  {
    /* 2 — CLINIC */
    id:2, emoji:'🏥', label:'Clinic', color:'#4A82D8', bg:'#d6dcea',
    cards:[
      { beat:'The Context / The Rush', num:'01',
        title:'Stairs are hard. Stops matter.',
        body:'Fatima\'s knee makes wrong turns painful. Missing her stop is not an option.',
        grad:`radial-gradient(ellipse 62% 62% at 46% 34%,rgba(74,130,216,.5),transparent 62%),
              radial-gradient(circle at 74% 72%,rgba(28,68,160,.44),transparent 46%),
              linear-gradient(168deg,#040a1c,#01040e)`,
        accent:'#4A82D8',
        svg:`<svg viewBox="0 0 256 342" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <polygon points="128,54 50,120 206,120" fill="rgba(74,130,216,.2)" stroke="rgba(100,160,240,.3)" stroke-width="1.5"/>
          <rect x="62" y="118" width="132" height="112" rx="4" fill="rgba(74,130,216,.16)" stroke="rgba(100,160,240,.24)" stroke-width="1.5"/>
          <rect x="78" y="134" width="30" height="28" rx="3" fill="rgba(120,180,255,.15)"/>
          <rect x="147" y="134" width="30" height="28" rx="3" fill="rgba(120,180,255,.2)"/>
          <rect x="113" y="180" width="30" height="50" rx="4" fill="rgba(74,130,216,.22)"/>
          <rect x="106" y="230" width="44" height="6" rx="2" fill="rgba(100,160,240,.2)"/>
          <rect x="100" y="236" width="56" height="6" rx="2" fill="rgba(100,160,240,.15)"/>
          <rect x="94" y="242" width="68" height="6" rx="2" fill="rgba(100,160,240,.12)"/>
        </svg>`,
        w:'clamp(186px,22vw,258px)', h:'clamp(248px,30vw,346px)',
        pos:'top:9vh;left:5vw' },
      { beat:'The Planning', num:'02',
        title:'Accessible routes only.',
        body:'The filter shows only level-boarding stops with lifts. Every time. No exceptions.',
        grad:`repeating-linear-gradient(175deg,transparent,transparent 7px,rgba(74,130,216,.05) 7px,rgba(74,130,216,.05) 8px),
              radial-gradient(ellipse 75% 56% at 50% 44%,rgba(60,110,200,.38),transparent 65%),
              linear-gradient(150deg,#030812,#01040a)`,
        accent:'#4A82D8',
        svg:`<svg viewBox="0 0 312 192" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <rect x="30" y="58" width="252" height="90" rx="14" fill="rgba(74,130,216,.18)" stroke="rgba(100,160,240,.32)" stroke-width="1.5"/>
          <rect x="46" y="72" width="42" height="36" rx="5" fill="rgba(120,180,255,.14)"/>
          <rect x="96" y="72" width="42" height="36" rx="5" fill="rgba(120,180,255,.18)"/>
          <rect x="146" y="72" width="42" height="36" rx="5" fill="rgba(120,180,255,.14)"/>
          <rect x="240" y="66" width="32" height="82" rx="5" fill="rgba(74,130,216,.28)" stroke="rgba(120,180,255,.4)" stroke-width="1.5"/>
          <circle cx="80" cy="156" r="15" fill="rgba(74,130,216,.3)" stroke="rgba(120,180,255,.4)" stroke-width="1.5"/>
          <circle cx="232" cy="156" r="15" fill="rgba(74,130,216,.3)" stroke="rgba(120,180,255,.4)" stroke-width="1.5"/>
          <line x1="10" y1="171" x2="302" y2="171" stroke="rgba(74,130,216,.2)" stroke-width="2"/>
        </svg>`,
        w:'clamp(210px,28vw,322px)', h:'clamp(136px,16vw,208px)',
        pos:'top:12vh;right:5vw' },
      { beat:'The Journey Begins', num:'03',
        title:'Tram glides in. No steps.',
        body:'Level boarding, priority seat. She settles in without a struggle.',
        grad:`radial-gradient(ellipse 60% 60% at 48% 36%,rgba(74,130,216,.52),transparent 62%),
              radial-gradient(circle at 72% 70%,rgba(28,65,160,.44),transparent 46%),
              linear-gradient(166deg,#040a1c,#010408)`,
        accent:'#4A82D8',
        svg:`<svg viewBox="0 0 270 318" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <polygon points="110,118 110,200 144,200 186,222 186,100 144,122" fill="rgba(74,130,216,.24)" stroke="rgba(100,160,240,.38)" stroke-width="1.5"/>
          <path d="M194 116 Q218 162 194 208" fill="none" stroke="rgba(100,160,240,.48)" stroke-width="2.8" stroke-linecap="round"/>
          <path d="M208 100 Q242 162 208 224" fill="none" stroke="rgba(100,160,240,.32)" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M222 84 Q264 162 222 240" fill="none" stroke="rgba(100,160,240,.18)" stroke-width="1.6" stroke-linecap="round"/>
          <rect x="50" y="256" width="10" height="22" rx="5" fill="rgba(100,160,240,.36)"/>
          <rect x="66" y="248" width="10" height="38" rx="5" fill="rgba(100,160,240,.42)"/>
          <rect x="82" y="242" width="10" height="50" rx="5" fill="rgba(100,160,240,.52)"/>
          <rect x="98" y="250" width="10" height="34" rx="5" fill="rgba(100,160,240,.38)"/>
          <rect x="114" y="258" width="10" height="18" rx="5" fill="rgba(100,160,240,.30)"/>
        </svg>`,
        w:'clamp(196px,22vw,272px)', h:'clamp(248px,28vw,322px)',
        pos:'bottom:14vh;left:28vw' },
      { beat:'The Pivot / App Feature', num:'04',
        title:'Audio: next stop is yours.',
        body:'"Saint-Claire Clinic is the next station. Doors open left." No anxiety. Just calm.',
        grad:`radial-gradient(circle at 50% 44%,rgba(74,130,216,.64),rgba(24,64,168,.36) 42%,transparent 64%),
              linear-gradient(180deg,#040a1e,#010409)`,
        accent:'#4A82D8',
        svg:`<svg viewBox="0 0 268 316" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <path d="M80 158 Q134 102 188 158" fill="none" stroke="rgba(100,160,240,.52)" stroke-width="3.2" stroke-linecap="round"/>
          <path d="M60 178 Q134 98 208 178" fill="none" stroke="rgba(100,160,240,.32)" stroke-width="2.6" stroke-linecap="round"/>
          <path d="M40 198 Q134 90 228 198" fill="none" stroke="rgba(100,160,240,.18)" stroke-width="2" stroke-linecap="round"/>
          <circle cx="134" cy="175" r="11" fill="rgba(100,160,240,.75)"/>
          <line x1="134" y1="205" x2="134" y2="246" stroke="rgba(100,160,240,.55)" stroke-width="3" stroke-linecap="round"/>
          <polyline points="117,233 134,250 151,233" fill="none" stroke="rgba(100,160,240,.55)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="82" y="260" width="104" height="26" rx="13" fill="rgba(74,130,216,.24)" stroke="rgba(100,160,240,.4)" stroke-width="1"/>
        </svg>`,
        w:'clamp(196px,22vw,272px)', h:'clamp(244px,28vw,320px)',
        pos:'top:10vh;right:20vw' },
      { beat:'The Arrival', num:'05',
        title:'4 minutes early. No pain.',
        body:'She walks in calmly. No missed stops, no retracing steps. Just an easy Tuesday.',
        grad:`radial-gradient(ellipse 62% 56% at 44% 36%,rgba(100,160,240,.44),transparent 60%),
              radial-gradient(circle at 70% 72%,rgba(30,68,160,.38),transparent 46%),
              linear-gradient(162deg,#040a1a,#01040a)`,
        accent:'#4A82D8',
        svg:`<svg viewBox="0 0 258 308" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <circle cx="130" cy="140" r="72" fill="none" stroke="rgba(100,160,240,.2)" stroke-width="1.8"/>
          <circle cx="130" cy="140" r="52" fill="none" stroke="rgba(100,160,240,.14)" stroke-width="1.2"/>
          <circle cx="130" cy="140" r="5" fill="rgba(120,180,255,.85)"/>
          <line x1="130" y1="140" x2="130" y2="90"  stroke="rgba(120,180,255,.72)" stroke-width="3.2" stroke-linecap="round"/>
          <line x1="130" y1="140" x2="160" y2="125" stroke="rgba(120,180,255,.52)" stroke-width="4.2" stroke-linecap="round"/>
          <polyline points="92,232 116,210 130,224 156,196" fill="none" stroke="rgba(100,160,240,.52)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="156" cy="196" r="6" fill="rgba(100,160,240,.7)"/>
        </svg>`,
        w:'clamp(194px,22vw,268px)', h:'clamp(244px,28vw,318px)',
        pos:'bottom:10vh;left:5vw' },
    ],
    panels:[
      { tag:'The Pivot', h:'Audio guided,<br><em>step by step</em>',
        p:'The app spoke her stop aloud, door side included. She never had to look up.',
        icon:'🔊',
        artBg:`radial-gradient(circle at 50% 44%,rgba(74,130,216,.64),rgba(24,64,168,.36) 42%,transparent 64%),linear-gradient(180deg,#040a1e,#010409)` },
      { tag:'The Arrival', h:'On time.<br><em>Every time.</em>',
        p:'Accessible routes, audio cues, priority seating. The journey is finally stress-free.',
        icon:'🏥',
        artBg:`radial-gradient(ellipse 62% 56% at 44% 36%,rgba(100,160,240,.44),transparent 60%),linear-gradient(162deg,#040a1a,#01040a)` },
    ],
  },

  {
    /* 3 — OLD TOWN */
    id:3, emoji:'🗺️', label:'Old Town', color:'#3BAA60', bg:'#d4ead8',
    cards:[
      { beat:'The Context / The Rush', num:'01',
        title:'No language. No data.',
        body:'Marcus crossed the border with a drained phone. He doesn\'t speak a word of it.',
        grad:`radial-gradient(ellipse 65% 56% at 48% 34%,rgba(59,170,96,.52),transparent 62%),
              radial-gradient(circle at 22% 72%,rgba(20,100,50,.45),transparent 46%),
              linear-gradient(162deg,#031008,#010604)`,
        accent:'#3BAA60',
        svg:`<svg viewBox="0 0 280 322" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <rect x="44" y="58" width="192" height="157" rx="8" fill="rgba(59,170,96,.14)" stroke="rgba(80,200,120,.28)" stroke-width="1.5"/>
          <line x1="44" y1="98"  x2="236" y2="98"  stroke="rgba(80,200,120,.1)" stroke-width="1"/>
          <line x1="44" y1="138" x2="236" y2="138" stroke="rgba(80,200,120,.1)" stroke-width="1"/>
          <line x1="44" y1="178" x2="236" y2="178" stroke="rgba(80,200,120,.1)" stroke-width="1"/>
          <line x1="90"  y1="58" x2="90"  y2="215" stroke="rgba(80,200,120,.1)" stroke-width="1"/>
          <line x1="140" y1="58" x2="140" y2="215" stroke="rgba(80,200,120,.1)" stroke-width="1"/>
          <line x1="190" y1="58" x2="190" y2="215" stroke="rgba(80,200,120,.1)" stroke-width="1"/>
          <polyline points="70,193 70,158 112,158 112,118 162,118 162,87 202,87" fill="none" stroke="rgba(80,200,120,.46)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="70"  cy="193" r="6" fill="rgba(80,200,120,.72)"/>
          <circle cx="202" cy="87"  r="8" fill="rgba(255,80,80,.62)" stroke="rgba(255,120,120,.5)" stroke-width="1.5"/>
        </svg>`,
        w:'clamp(196px,24vw,284px)', h:'clamp(240px,28vw,328px)',
        pos:'top:8vh;right:5vw' },
      { beat:'The Planning', num:'02',
        title:'Downloaded at the hotel.',
        body:'Full offline map. His native language. No signal needed. He was ready before he left.',
        grad:`repeating-linear-gradient(60deg,transparent,transparent 14px,rgba(59,170,96,.04) 14px,rgba(59,170,96,.04) 15px),
              radial-gradient(ellipse 62% 58% at 52% 38%,rgba(40,150,80,.4),transparent 62%),
              linear-gradient(153deg,#030e07,#010503)`,
        accent:'#3BAA60',
        svg:`<svg viewBox="0 0 256 316" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <line x1="28" y1="68" x2="228" y2="130" stroke="rgba(80,200,120,.3)" stroke-width="2"/>
          <rect x="100" y="84" width="70" height="50" rx="8" fill="rgba(59,170,96,.2)" stroke="rgba(80,200,120,.4)" stroke-width="1.5"/>
          <rect x="110" y="92" width="20" height="16" rx="3" fill="rgba(120,220,150,.15)"/>
          <rect x="137" y="92" width="20" height="16" rx="3" fill="rgba(120,220,150,.18)"/>
          <line x1="135" y1="70" x2="135" y2="85" stroke="rgba(80,200,120,.4)" stroke-width="2"/>
          <circle cx="135" cy="69" r="4" fill="rgba(80,200,120,.5)"/>
          <rect x="32" y="196" width="192" height="70" rx="10" fill="rgba(59,170,96,.16)" stroke="rgba(80,200,120,.28)" stroke-width="1.5"/>
          <rect x="45" y="207" width="35" height="25" rx="4" fill="rgba(120,220,150,.14)"/>
          <rect x="87" y="207" width="35" height="25" rx="4" fill="rgba(120,220,150,.18)"/>
          <circle cx="76"  cy="272" r="12" fill="rgba(59,170,96,.28)" stroke="rgba(80,200,120,.35)" stroke-width="1.5"/>
          <circle cx="186" cy="272" r="12" fill="rgba(59,170,96,.28)" stroke="rgba(80,200,120,.35)" stroke-width="1.5"/>
        </svg>`,
        w:'clamp(188px,22vw,260px)', h:'clamp(244px,28vw,320px)',
        pos:'top:11vh;left:6vw' },
      { beat:'The Journey Begins', num:'03',
        title:'Subway in his language.',
        body:'The map is localized. He taps the old town stop. Turn-by-turn, no data used.',
        grad:`radial-gradient(ellipse 64% 58% at 50% 36%,rgba(59,170,96,.52),transparent 62%),
              radial-gradient(circle at 72% 70%,rgba(20,100,50,.44),transparent 46%),
              linear-gradient(165deg,#041008,#010502)`,
        accent:'#3BAA60',
        svg:`<svg viewBox="0 0 268 318" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <path d="M80 158 Q134 102 188 158" fill="none" stroke="rgba(80,200,120,.52)" stroke-width="3.2" stroke-linecap="round"/>
          <path d="M60 178 Q134 98 208 178" fill="none" stroke="rgba(80,200,120,.32)" stroke-width="2.6" stroke-linecap="round"/>
          <path d="M40 198 Q134 90 228 198" fill="none" stroke="rgba(80,200,120,.18)" stroke-width="2" stroke-linecap="round"/>
          <circle cx="134" cy="175" r="11" fill="rgba(80,200,120,.75)"/>
          <line x1="134" y1="205" x2="134" y2="246" stroke="rgba(80,200,120,.55)" stroke-width="3" stroke-linecap="round"/>
          <polyline points="117,233 134,250 151,233" fill="none" stroke="rgba(80,200,120,.55)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="82" y="260" width="104" height="26" rx="13" fill="rgba(59,170,96,.24)" stroke="rgba(80,200,120,.42)" stroke-width="1"/>
        </svg>`,
        w:'clamp(196px,22vw,272px)', h:'clamp(244px,28vw,322px)',
        pos:'bottom:14vh;left:30vw' },
      { beat:'The Pivot / App Feature', num:'04',
        title:'Cable car. Auto-switched.',
        body:'The app detected the transit change and switched modes automatically. Zero friction.',
        grad:`radial-gradient(circle at 50% 42%,rgba(59,170,96,.64),rgba(18,100,45,.36) 42%,transparent 64%),
              linear-gradient(180deg,#041008,#010502)`,
        accent:'#3BAA60',
        svg:`<svg viewBox="0 0 280 320" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <polyline points="50,240 50,180 96,150 146,150 196,120 216,80" fill="none" stroke="rgba(255,80,80,.4)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6,3"/>
          <polyline points="50,240 66,200 108,174 158,174 192,140 216,80"  fill="none" stroke="rgba(80,220,150,.56)" stroke-width="3"   stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="158" cy="174" r="6" fill="rgba(80,220,150,.72)"/>
          <circle cx="50"  cy="240" r="8" fill="rgba(80,200,120,.72)"/>
          <circle cx="216" cy="80"  r="10" fill="rgba(80,200,120,.62)" stroke="rgba(100,220,140,.5)" stroke-width="1.5"/>
          <circle cx="146" cy="150" r="10" fill="rgba(255,80,80,.52)"/>
          <rect x="106" y="188" width="58" height="18" rx="9" fill="rgba(80,220,150,.2)" stroke="rgba(80,220,150,.42)" stroke-width="1"/>
        </svg>`,
        w:'clamp(200px,24vw,286px)', h:'clamp(252px,28vw,326px)',
        pos:'top:10vh;right:22vw' },
      { beat:'The Arrival', num:'05',
        title:'Zero data. Cobblestones.',
        body:'He steps out into the square. The whole journey cost him nothing but a download at check-in.',
        grad:`radial-gradient(ellipse 65% 56% at 44% 36%,rgba(80,200,120,.44),transparent 60%),
              radial-gradient(circle at 70% 72%,rgba(20,100,50,.38),transparent 46%),
              linear-gradient(162deg,#041008,#010503)`,
        accent:'#3BAA60',
        svg:`<svg viewBox="0 0 260 310" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <rect x="44" y="58" width="172" height="140" rx="10" fill="rgba(59,170,96,.14)" stroke="rgba(80,200,120,.28)" stroke-width="1.4"/>
          <line x1="44" y1="82"  x2="216" y2="82"  stroke="rgba(80,200,120,.1)" stroke-width="1"/>
          <line x1="44" y1="122" x2="216" y2="122" stroke="rgba(80,200,120,.1)" stroke-width="1"/>
          <line x1="44" y1="162" x2="216" y2="162" stroke="rgba(80,200,120,.1)" stroke-width="1"/>
          <line x1="90"  y1="58" x2="90"  y2="198" stroke="rgba(80,200,120,.1)" stroke-width="1"/>
          <line x1="140" y1="58" x2="140" y2="198" stroke="rgba(80,200,120,.1)" stroke-width="1"/>
          <circle cx="62"  cy="102" r="7" fill="rgba(80,200,120,.25)"/>
          <circle cx="112" cy="142" r="7" fill="rgba(80,200,120,.3)"/>
          <circle cx="162" cy="182" r="7" fill="rgba(80,200,120,.25)"/>
          <polyline points="62,102 112,142 162,182" fill="none" stroke="rgba(80,200,120,.4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        w:'clamp(196px,22vw,268px)', h:'clamp(244px,28vw,318px)',
        pos:'bottom:10vh;left:5vw' },
    ],
    panels:[
      { tag:'The Pivot', h:'Modes switch.<br><em>Automatically.</em>',
        p:'Subway to cable car — the app handled the transfer without him lifting a finger.',
        icon:'🚡',
        artBg:`radial-gradient(circle at 50% 42%,rgba(59,170,96,.64),rgba(18,100,45,.36) 42%,transparent 64%),linear-gradient(180deg,#041008,#010502)` },
      { tag:'The Arrival', h:'Explored like<br><em>a local</em>',
        p:'His language, their city, zero data. The old town felt navigable and completely safe.',
        icon:'🗺️',
        artBg:`radial-gradient(ellipse 65% 56% at 44% 36%,rgba(80,200,120,.44),transparent 60%),linear-gradient(162deg,#041008,#010503)` },
    ],
  },

  {
    /* 4 — SCHOOL */
    id:4, emoji:'🏫', label:'School', color:'#8B5CF6', bg:'#dcdce6',
    cards:[
      { beat:'The Context / The Rush', num:'01',
        title:'Two kids. A stroller. 8 AM.',
        body:'Yasmine\'s morning is organized chaos. The bus won\'t wait. Neither will the school gate.',
        grad:`radial-gradient(ellipse 66% 58% at 44% 34%,rgba(139,92,246,.54),transparent 62%),
              radial-gradient(circle at 74% 70%,rgba(68,28,160,.44),transparent 46%),
              linear-gradient(166deg,#0c0618,#040210)`,
        accent:'#8B5CF6',
        svg:`<svg viewBox="0 0 266 342" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <circle cx="110" cy="220" r="18" fill="rgba(139,92,246,.26)" stroke="rgba(170,130,255,.4)" stroke-width="1.5"/>
          <circle cx="158" cy="220" r="14" fill="rgba(139,92,246,.2)"  stroke="rgba(170,130,255,.34)" stroke-width="1.5"/>
          <path d="M110 202 L110 164 L155 144 L175 174 L158 206" fill="rgba(139,92,246,.18)" stroke="rgba(170,130,255,.3)" stroke-width="1.5"/>
          <line x1="110" y1="202" x2="90" y2="164" stroke="rgba(170,130,255,.36)" stroke-width="2" stroke-linecap="round"/>
          <circle cx="196" cy="94" r="28" fill="rgba(139,92,246,.16)" stroke="rgba(170,130,255,.28)" stroke-width="1.5"/>
          <line x1="196" y1="94" x2="196" y2="72" stroke="rgba(190,150,255,.55)" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="196" y1="94" x2="212" y2="94" stroke="rgba(190,150,255,.4)"  stroke-width="3" stroke-linecap="round"/>
        </svg>`,
        w:'clamp(188px,22vw,268px)', h:'clamp(252px,30vw,348px)',
        pos:'top:8vh;left:5vw' },
      { beat:'The Planning', num:'02',
        title:'Fare calculated. Night before.',
        body:'She checks the family fare at 10 PM. No surprises. No fumbling at the gate.',
        grad:`repeating-linear-gradient(32deg,transparent,transparent 16px,rgba(139,92,246,.04) 16px,rgba(139,92,246,.04) 17px),
              radial-gradient(ellipse 64% 60% at 50% 38%,rgba(100,65,200,.42),transparent 64%),
              linear-gradient(152deg,#080514,#030108)`,
        accent:'#8B5CF6',
        svg:`<svg viewBox="0 0 254 314" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <rect x="46" y="55" width="162" height="122" rx="10" fill="rgba(139,92,246,.18)" stroke="rgba(170,130,255,.32)" stroke-width="1.5"/>
          <rect x="58" y="65" width="138" height="36" rx="5" fill="rgba(139,92,246,.22)"/>
          <rect x="58" y="110" width="30" height="22" rx="4" fill="rgba(170,130,255,.2)"/>
          <rect x="95" y="110" width="30" height="22" rx="4" fill="rgba(170,130,255,.18)"/>
          <rect x="132" y="110" width="30" height="22" rx="4" fill="rgba(139,92,246,.3)" stroke="rgba(190,150,255,.4)" stroke-width="1"/>
          <circle cx="76"  cy="210" r="12" fill="rgba(170,130,255,.26)" stroke="rgba(190,150,255,.36)" stroke-width="1"/>
          <circle cx="104" cy="210" r="12" fill="rgba(170,130,255,.26)" stroke="rgba(190,150,255,.36)" stroke-width="1"/>
          <circle cx="132" cy="212" r="9"  fill="rgba(170,130,255,.2)"/>
          <circle cx="156" cy="214" r="7"  fill="rgba(170,130,255,.18)"/>
          <rect x="46" y="240" width="162" height="50" rx="8" fill="rgba(139,92,246,.14)" stroke="rgba(170,130,255,.26)" stroke-width="1"/>
        </svg>`,
        w:'clamp(186px,21vw,256px)', h:'clamp(242px,27vw,318px)',
        pos:'top:10vh;right:6vw' },
      { beat:'The Journey Begins', num:'03',
        title:'First bus is overcrowded.',
        body:'Live traffic: Bus 22 is at capacity. She switches to the alternate route before leaving.',
        grad:`radial-gradient(ellipse 64% 60% at 48% 36%,rgba(139,92,246,.52),transparent 62%),
              radial-gradient(circle at 72% 70%,rgba(70,28,160,.44),transparent 46%),
              linear-gradient(165deg,#0c0618,#040110)`,
        accent:'#8B5CF6',
        svg:`<svg viewBox="0 0 276 322" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <polyline points="55,240 55,180 100,150 150,150 200,120 220,80" fill="none" stroke="rgba(255,80,80,.42)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6,3"/>
          <polyline points="55,240 70,200 112,174 162,174 196,140 220,80" fill="none" stroke="rgba(170,130,255,.56)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="162" cy="174" r="6" fill="rgba(170,130,255,.72)"/>
          <circle cx="55"  cy="240" r="8" fill="rgba(139,92,246,.72)"/>
          <circle cx="220" cy="80"  r="10" fill="rgba(139,92,246,.62)" stroke="rgba(170,130,255,.5)" stroke-width="1.5"/>
          <circle cx="150" cy="150" r="10" fill="rgba(255,80,80,.52)"/>
          <rect x="110" y="188" width="58" height="18" rx="9" fill="rgba(170,130,255,.2)" stroke="rgba(170,130,255,.42)" stroke-width="1"/>
        </svg>`,
        w:'clamp(202px,24vw,284px)', h:'clamp(248px,28vw,326px)',
        pos:'bottom:14vh;right:24vw' },
      { beat:'The Pivot / App Feature', num:'04',
        title:'Low-floor bus. Stroller rolls on.',
        body:'The alternate has a low floor. No folding, no lifting. The kids think it\'s great.',
        grad:`radial-gradient(circle at 50% 40%,rgba(139,92,246,.64),rgba(65,28,160,.36) 42%,transparent 64%),
              linear-gradient(180deg,#0c0618,#040110)`,
        accent:'#8B5CF6',
        svg:`<svg viewBox="0 0 312 192" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <rect x="30" y="58" width="252" height="90" rx="14" fill="rgba(139,92,246,.18)" stroke="rgba(170,130,255,.32)" stroke-width="1.4"/>
          <rect x="46" y="72" width="42" height="36" rx="5" fill="rgba(170,130,255,.14)"/>
          <rect x="96" y="72" width="42" height="36" rx="5" fill="rgba(170,130,255,.18)"/>
          <rect x="146" y="72" width="42" height="36" rx="5" fill="rgba(170,130,255,.14)"/>
          <rect x="240" y="66" width="32" height="82" rx="5" fill="rgba(139,92,246,.28)" stroke="rgba(170,130,255,.4)" stroke-width="1.5"/>
          <circle cx="80"  cy="156" r="15" fill="rgba(139,92,246,.3)" stroke="rgba(170,130,255,.4)" stroke-width="1.5"/>
          <circle cx="232" cy="156" r="15" fill="rgba(139,92,246,.3)" stroke="rgba(170,130,255,.4)" stroke-width="1.5"/>
          <line x1="10" y1="171" x2="302" y2="171" stroke="rgba(139,92,246,.2)" stroke-width="2"/>
        </svg>`,
        w:'clamp(210px,28vw,322px)', h:'clamp(136px,16vw,208px)',
        pos:'top:10vh;left:28vw' },
      { beat:'The Arrival', num:'05',
        title:'8:30. Back on the bus.',
        body:'Drop-off done. She\'s already heading to work. The morning actually went well.',
        grad:`radial-gradient(ellipse 64% 56% at 44% 36%,rgba(170,130,255,.44),transparent 60%),
              radial-gradient(circle at 70% 72%,rgba(70,28,160,.38),transparent 46%),
              linear-gradient(162deg,#0c0618,#040110)`,
        accent:'#8B5CF6',
        svg:`<svg viewBox="0 0 268 316" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
          <circle cx="134" cy="140" r="70" fill="none" stroke="rgba(170,130,255,.2)"  stroke-width="1.8"/>
          <circle cx="134" cy="140" r="50" fill="none" stroke="rgba(170,130,255,.13)" stroke-width="1.2"/>
          <circle cx="134" cy="140" r="5" fill="rgba(190,150,255,.85)"/>
          <line x1="134" y1="140" x2="134" y2="92"  stroke="rgba(190,150,255,.72)" stroke-width="3.2" stroke-linecap="round"/>
          <line x1="134" y1="140" x2="162" y2="126" stroke="rgba(190,150,255,.52)" stroke-width="4.2" stroke-linecap="round"/>
          <polyline points="92,228 116,208 134,222 160,194" fill="none" stroke="rgba(170,130,255,.52)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="160" cy="194" r="6" fill="rgba(170,130,255,.7)"/>
        </svg>`,
        w:'clamp(196px,22vw,272px)', h:'clamp(244px,28vw,322px)',
        pos:'bottom:10vh;left:5vw' },
    ],
    panels:[
      { tag:'The Pivot', h:'Calmer route,<br><em>same time</em>',
        p:'The alternate bus was quieter, less crowded, and had a low floor for the stroller.',
        icon:'🧮',
        artBg:`radial-gradient(circle at 50% 40%,rgba(139,92,246,.64),rgba(65,28,160,.36) 42%,transparent 64%),linear-gradient(180deg,#0c0618,#040110)` },
      { tag:'The Arrival', h:'Calm morning.<br><em>Actually.</em>',
        p:'She arrives at work without the usual dread. The app planned it. She just followed.',
        icon:'🏫',
        artBg:`radial-gradient(ellipse 64% 56% at 44% 36%,rgba(170,130,255,.44),transparent 60%),linear-gradient(162deg,#0c0618,#040110)` },
    ],
  },
];

/* ══════════════════════════════════════════════════════
   DOCK CONSTANTS — verbatim from dream-machine (1).html
   Values now sourced from CONFIG; derived constants below.
══════════════════════════════════════════════════════ */
const ICON    = CONFIG.ICON;
const GAP     = CONFIG.GAP;
const NUM     = CONFIG.NUM;
const CTR     = CONFIG.CTR;
const ANIM_MS = CONFIG.ANIM_MS;
const EASE    = 'cubic-bezier(0.4,0,0.2,1)';
const DUR     = `${ANIM_MS}ms`;
const TR_ON   = `transform ${DUR} ${EASE}, width ${DUR} ${EASE}, background 0.38s ease, box-shadow 0.38s ease, opacity 0.3s ease`;
const TR_OFF  = 'opacity 0.4s ease';

/**
 * Returns the pixel X offset for a given slot index.
 * The center slot (CTR) is a wide pill; others are icon-only circles.
 */
function slotX(s) {
  return s <= CTR
    ? s * STEP
    : CTR * STEP + PILL_W + GAP + (s - CTR - 1) * STEP;
}

/* ── Dock state ── */
let slots     = [0,1,2,3,4];
let centerId  = 2;          // Clinic starts centered
let animating = false;
let dockAtTop = false;

/* ── Destination SVG icons (gold line, no fill) ── */
const DEST_ICONS = [
  /* 0 University — graduation cap */
  `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#c8a060" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="13,4 25,10 13,16 1,10"/><path d="M7 13v5c0 1.6 2.7 3.5 6 3.5s6-1.9 6-3.5v-5"/><line x1="25" y1="10" x2="25" y2="18"/></svg>`,
  /* 1 Office — briefcase */
  `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#c8a060" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="10" width="22" height="13" rx="2"/><path d="M9 10V7.5A1.5 1.5 0 0 1 10.5 6h5A1.5 1.5 0 0 1 17 7.5V10"/><line x1="2" y1="17" x2="24" y2="17"/></svg>`,
  /* 2 Clinic — medical cross in circle */
  `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#c8a060" stroke-width="1.3" stroke-linecap="round"><circle cx="13" cy="13" r="10"/><line x1="13" y1="8" x2="13" y2="18"/><line x1="8" y1="13" x2="18" y2="13"/></svg>`,
  /* 3 Old Town — map pin */
  `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#c8a060" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2C9 2 6 5.1 6 9c0 6 7 14 7 14s7-8 7-14c0-3.9-3-7-7-7z"/><circle cx="13" cy="9" r="2.2"/></svg>`,
  /* 4 School — building with roof */
  `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#c8a060" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="18" height="12" rx="1"/><path d="M2 11 L13 3 L24 11"/><rect x="10" y="16" width="6" height="7"/></svg>`,
];

/* ── Build pill elements ── */
const dockWrap = document.getElementById('sec-stories-dock-wrap');
const dockRow  = document.getElementById('sec-stories-dock-row');
dockRow.style.cssText = `position:relative;width:${ROW_W}px;height:${ICON}px;overflow:hidden;`;

/* Hover tooltip — names the destination under a non-center pill */
const dockTip = document.createElement('div');
dockTip.id = 'sec-stories-dock-tip';
dockWrap.appendChild(dockTip);

const pillEls = [];
DESTINATIONS.forEach(dest => {
  const pill = document.createElement('div');
  pill.setAttribute('role', 'button');
  pill.setAttribute('tabindex', '0');
  pill.setAttribute('aria-label', `Story: ${dest.label}`);
  pill.style.cssText = `position:absolute;top:0;left:0;height:${ICON}px;border-radius:${ICON/2}px;display:flex;align-items:center;overflow:hidden;cursor:pointer;opacity:0;`;
  pill.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleDockClick(dest.id); }
  });

  const ico = document.createElement('div');
  ico.style.cssText = `width:${ICON}px;height:${ICON}px;flex-shrink:0;display:flex;align-items:center;justify-content:center;`;
  ico.innerHTML = DEST_ICONS[dest.id] || '';

  const lbl = document.createElement('div');
  lbl.style.cssText = `padding-left:4px;padding-right:20px;color:#fff;font-size:15px;font-weight:400;white-space:nowrap;font-family:var(--font-sans);user-select:none;pointer-events:none;opacity:0;transition:opacity 0.15s ease;`;
  lbl.textContent = dest.label;

  pill.appendChild(ico);
  pill.appendChild(lbl);
  dockRow.appendChild(pill);
  pillEls.push({ pill, lbl, dest });
  pill.addEventListener('click', () => handleDockClick(dest.id));

  /* Spring hover micro-interaction — never on the active center pill */
  pill.addEventListener('mouseenter', () => {
    if (dest.id === centerId) return;
    gsap.to(pill, { scale:1.06, duration:0.35, ease:'elastic.out(1, 0.5)', overwrite:'auto' });
    dockTip.textContent = dest.label;
    dockTip.style.left  = `${slotX(slots[dest.id]) + CONFIG.ICON / 2}px`;
    dockTip.classList.add('show');
  });
  pill.addEventListener('mouseleave', () => {
    dockTip.classList.remove('show');
    if (dest.id === centerId) return;
    gsap.to(pill, { scale:1,    duration:0.4,  ease:'power3.out',          overwrite:'auto' });
  });
});

function applyPillStyles(withTrans) {
  pillEls.forEach(({ pill, lbl, dest }) => {
    const isC = dest.id === centerId;
    gsap.killTweensOf(pill);
    pill.style.transition = withTrans ? TR_ON : TR_OFF;
    gsap.set(pill, { x: slotX(slots[dest.id]), scaleX: 1, scaleY: 1 });
    pill.style.width      = (isC ? PILL_W : ICON) + 'px';
    pill.style.zIndex     = isC ? '5' : '2';
    pill.style.cursor     = isC ? 'default' : 'pointer';
    if (isC) {
      /* Gold glass — brand chrome stays gold; destination color lives
         only inside the story cards, never on UI controls */
      pill.style.background    = 'linear-gradient(135deg, rgba(var(--gold-rgb),0.30), rgba(var(--gold-rgb),0.14))';
      pill.style.backdropFilter = 'blur(14px) saturate(1.2)';
      pill.style.WebkitBackdropFilter = 'blur(14px) saturate(1.2)';
      pill.style.border        = '1px solid rgba(var(--gold-rgb),0.55)';
      /* Dual glow: ambient gold halo + contact shadow */
      pill.style.boxShadow     = '0 4px 24px rgba(var(--gold-rgb),0.30), 0 1px 4px rgba(0,0,0,0.30), inset 0 1px 0 rgba(var(--gold-bright-rgb),0.25)';
    } else {
      pill.style.background    = 'rgba(var(--gold-rgb),0.10)';
      pill.style.backdropFilter = 'blur(12px) saturate(1.2)';
      pill.style.WebkitBackdropFilter = 'blur(12px) saturate(1.2)';
      pill.style.border        = '1px solid rgba(var(--gold-rgb),0.32)';
      pill.style.boxShadow     = '0 2px 12px rgba(0,0,0,0.18), inset 0 1px 0 rgba(var(--gold-rgb),0.12)';
    }
    lbl.style.opacity    = isC ? '1' : '0';
    if (isC && withTrans) {
      /* Clip-path wipe: text reveals left-to-right after pill width settles */
      lbl.style.clipPath = 'inset(0 100% 0 0)';
      gsap.to(lbl, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.4,
        delay: 0.28,
        ease: 'power3.out',
        onStart() { lbl.style.opacity = '1'; },
        onComplete() { lbl.style.clipPath = 'none'; },
      });
    } else {
      lbl.style.clipPath   = 'none';
      lbl.style.transition = isC ? 'none' : 'opacity 0.08s ease 0s';
    }
  });
}

/* ── Dock vertical position ──
   Starts centered at 42% (matching dream-machine video).
   Slides to top: 28px on first scroll.
   NEVER re-set to center after moving to top — prevents bounce-back bug. */
/**
 * Sets the dock's vertical position.
 * CRITICAL: Only mutates `top` — never touches `transform`.
 * The translate3d(-50%,0,0) on #dock-wrap is load-bearing:
 * it creates a GPU compositing layer that keeps the dock
 * above preserve-3d children regardless of z-index context.
 */
function setDockPos(top, anim) {
  dockAtTop = top;
  dockWrap.style.transition = anim
    ? 'top 0.55s cubic-bezier(0.4,0,0.2,1)'
    : 'none';
  dockWrap.style.top = top
    ? '28px'
    : `calc(42% - ${ICON / 2}px)`;
}
/* Dock lives at the top from the start — the section intro owns the
   center of the stage now (centered dock collided with it on short
   viewports) */
setDockPos(true, false);

/**
 * handleDockClick — two-phase carousel shift from dream-machine.
 * Phase 1: shift slots visually with animated transitions.
 * Phase 2: after ANIM_MS, silently normalize slot indices
 *          (mod NUM) so the array never grows unboundedly.
 * CRITICAL: window.scrollTo(0,0) must be INSTANT (not smooth)
 * to prevent pr oscillating around 0.01 which bounces the dock.
 */
function handleDockClick(itemId) {
  if (itemId === centerId || animating) return;
  animating = true;

  const shift = CTR - slots[itemId];
  slots    = slots.map(s => s + shift);
  centerId = itemId;

  applyPillStyles(true);

  /* A destination switch jumps straight into the story — the section
     intro must never fight the first card for the stage again */
  DOM.intro.classList.add('suppressed');

  // Instant scroll reset — prevents the bounce-back bug that smooth scrolling causes
  scrollToStoriesTop();
  // Lock dock to top immediately so the pr<=0.01 condition can't slide it back
  dockAtTop = true;
  setDockPos(true, false);

  // Restart scene for the new destination (with scroll reset)
  initScrollScene(itemId, true);

  // Phase 2: normalize slots silently (off-screen, no visual change)
  setTimeout(() => {
    animating = false;
    slots = slots.map(s => ((s % NUM) + NUM) % NUM);
    applyPillStyles(false);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      pillEls.forEach(({ pill }) => { pill.style.transition = TR_ON; });
    }));
  }, ANIM_MS + 20);
}


/* ── DOM ref cache — queried once, reused every frame ── */
const wrapperEl = document.getElementById('sec-stories-wrapper');
const DOM = {
  silhouette : document.getElementById('sec-stories-silhouette'),
  scrollHint : document.getElementById('sec-stories-scroll-hint'),
  progWrap   : document.getElementById('sec-stories-prog-wrap'),
  progSegs   : document.getElementById('sec-stories-prog-segs'),
  beatLabel  : document.getElementById('sec-stories-beat-label'),
  tint       : document.getElementById('sec-stories-tint'),
  backdrop   : document.getElementById('sec-stories-backdrop'),
  spA        : document.getElementById('sp-a'),
  spB        : document.getElementById('sp-b'),
  intro      : document.getElementById('stories-intro'),
};

/* Build the 5 beat segments once; per-frame code scales their fills */
const segFills = [];
for (let i = 0; i < 5; i++) {
  const seg  = document.createElement('div');
  seg.className = 'beat-seg';
  const fill = document.createElement('div');
  fill.className = 'beat-seg-fill';
  seg.appendChild(fill);
  DOM.progSegs.appendChild(seg);
  segFills.push(fill);
}
let activeBeat = -1;

/* ── Mouse-driven camera sway — the whole 3D scene leans with the cursor ── */
let swayXT = 0, swayYT = 0, swayX = 0, swayY = 0;
if (!REDUCED) window.addEventListener('mousemove', e => {
  swayXT = (e.clientX / window.innerWidth  - 0.5) * 2;
  swayYT = (e.clientY / window.innerHeight - 0.5) * 2;
}, { passive: true });

/* ── Atmospheric dust — slow gold motes rising through the scene ── */
(function buildDust() {
  if (REDUCED) return;
  for (let i = 0; i < 24; i++) {
    const d = document.createElement('span');
    d.className = 'stories-dust';
    const s = (Math.random() * 1.8 + 1.2).toFixed(1);
    d.style.cssText =
      `left:${(Math.random() * 100).toFixed(1)}%;` +
      `top:${(55 + Math.random() * 45).toFixed(1)}%;` +
      `width:${s}px;height:${s}px;` +
      `animation-duration:${(16 + Math.random() * 20).toFixed(1)}s;` +
      `animation-delay:${(-Math.random() * 36).toFixed(1)}s;`;
    DOM.backdrop.appendChild(d);
  }
})();

/* ── quickSetters — bypass full GSAP tween on per-frame mutations ── */
const QS = {
  silOpacity   : gsap.quickSetter(DOM.silhouette,  'opacity'),
  hintOpacity  : gsap.quickSetter(DOM.scrollHint,  'opacity'),
  progWrapOp   : gsap.quickSetter(DOM.progWrap,    'opacity'),
};
/* Card quickSetters rebuilt per scene in buildCards() */
let cardOpSetters = [];

let gsapCtx    = null; /* gsap.context() — atomic cleanup for all tweens */
let stInst     = null;
let lerpRaf    = null;
let targetCamZ = 0;
let currentCamZ= 0;
let prevTime   = 0;    /* rAF timestamp for frame-rate-independent lerp */
let cardEls    = [];
let p1shown    = false;
let p2shown    = false;

/** Clamps value to [0,1]. Used in every opacity calculation. */
function clamp01(v) { return Math.max(0, Math.min(1, v)); }

/**
 * Word-splits a panel headline for the stagger entrance while
 * PRESERVING <br> line breaks and <em> italic styling.
 * (The old textContent-based split dropped both, rendering
 * "On time.Every time." with no space and no italics.)
 */
function splitHeadline(el) {
  /* Always split from the pristine source (set by applyPanel) — re-splitting
     already-wrapped markup would lose the <em> information. */
  const src = el.dataset.src || el.innerHTML;
  const lines = src.split(/<br\s*\/?>/i).map(line => {
    const tmp = document.createElement('div');
    tmp.innerHTML = line;
    const words = [];
    tmp.childNodes.forEach(node => {
      const isEm = node.nodeType === 1 && node.tagName === 'EM';
      (node.textContent || '').trim().split(/\s+/).filter(Boolean)
        .forEach(w => words.push({ w, isEm }));
    });
    return words.map(({ w, isEm }) =>
      `<span style="display:inline-block;overflow:hidden"><span class="wrd">${isEm ? `<em>${w}</em>` : w}</span></span>`
    ).join(' ');
  });
  el.innerHTML = lines.join('<br>');
}

function buildCards(destId) {
  const camera = document.getElementById('sec-stories-camera');
  camera.innerHTML = '';
  cardEls = [];

  const dest = DESTINATIONS[destId];
  dest.cards.forEach((card, i) => {
    /* A "moment" = cinematic scene card (gradient + line-art vignette that
       evokes the app without showing it) + editorial caption BESIDE it.
       Scene, caption and a ghost numeral sit at different z offsets inside
       the moment, so the camera fly-through produces real parallax. */
    const el = document.createElement('div');
    el.className = 'zmoment' + (/right\s*:/.test(card.pos) ? ' flip' : '');

    const zDepths = [-500, -2000, -4000, -6500, -9000];
    el.style.cssText = `${card.pos};transform:translateZ(${zDepths[i]}px);`;
    el.style.setProperty('--dest-glow', hexToRgba(dest.color, 0.20));
    el.style.setProperty('--dest-accent', dest.color);

    /* Ghost numeral — floats BEHIND the scene card */
    const ghost = document.createElement('div');
    ghost.className = 'zghost-num';
    ghost.textContent = card.num;

    /* Scene card — the original art-directed gradient + SVG vignette */
    const scene = document.createElement('div');
    scene.className = 'zscene';
    scene.style.width  = card.w;
    scene.style.height = card.h;
    scene.style.background = card.grad;
    scene.innerHTML = card.svg;

    /* Caption — slightly toward the viewer; revealed line by line.
       The title's closing sentence drops to a gold italic fragment. */
    const sentences = card.title.match(/[^.!?]+[.!?]*\s*/g) || [card.title];
    const titleHtml = sentences.length > 1
      ? sentences.slice(0, -1).join('') + `<em>${sentences[sentences.length - 1].trim()}</em>`
      : card.title;
    const cap = document.createElement('div');
    cap.className = 'zcaption';
    cap.innerHTML = `
      <div class="zcap-line zcap-eyebrow"><span class="zcap-rule"></span>${dest.label} · ${card.beat.split('/')[0].trim()}</div>
      <div class="zcap-line zcap-title">${titleHtml}</div>
      <div class="zcap-line zcap-body">${card.body}</div>`;

    el.appendChild(ghost);
    el.appendChild(scene);
    el.appendChild(cap);
    camera.appendChild(el);
    cardEls.push(el);
    el._hasAnimated = false; // guard for one-shot scale pulse
    el._capShown    = false; // guard for one-shot caption reveal

    /* Trajectory direction — edge-anchored moments drift toward the
       center of the frame as the camera approaches, alternating a
       vertical bias per beat. Drives the per-frame glide in onUpdate. */
    el._dirX = /right\s*:/.test(card.pos) ? -1 : 1;
    el._dirY = i % 2 ? 1 : -1;
  });
  /* ── Depth field — the space BETWEEN beats must feel travelled.
        Concentric gates you fly through + glowing motes that whoosh past
        give the camera constant motion cues, killing the dead stretches. ── */
  const tint = dest.color;

  /* 4 elliptical gates at the midpoints between cards */
  [-1200, -3200, -5300, -7700].forEach((z, i) => {
    const ring = document.createElement('div');
    ring.className = 'zfield-ring';
    ring.style.borderColor = hexToRgba(tint, i % 2 ? 0.16 : 0.26);
    ring.style.transform = `translate(-50%,-50%) translateZ(${z}px)`;
    camera.appendChild(ring);
  });

  /* 18 motes scattered through the whole tunnel */
  for (let i = 0; i < 18; i++) {
    const dot = document.createElement('div');
    dot.className = 'zfield-dot';
    const s = (Math.random() * 4 + 3).toFixed(1);
    const z = -(300 + Math.random() * 9300).toFixed(0);
    dot.style.cssText =
      `left:${(8 + Math.random() * 84).toFixed(1)}%;` +
      `top:${(12 + Math.random() * 76).toFixed(1)}%;` +
      `width:${s}px;height:${s}px;` +
      `background:${hexToRgba(tint, 0.65)};` +
      `box-shadow:0 0 ${s * 4}px ${hexToRgba(tint, 0.45)};` +
      `transform:translateZ(${z}px);`;
    camera.appendChild(dot);
  }

  /* Rebuild quickSetters for the new card set */
  cardOpSetters = cardEls.map(el => gsap.quickSetter(el, 'opacity'));
}

/* Dark warm tints per destination — replaces original sand bg values */
const DEST_PANEL_BG = ['#201408','#28180a','#041828','#082010','#0a0a28'];

/** '#c94444' + 0.2 → 'rgba(201,68,68,0.2)' */
function hexToRgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function buildPanels(destId) {
  const dest   = DESTINATIONS[destId];
  const panelBg = DEST_PANEL_BG[destId] || '#0a0806';
  /* Backdrop stays warm night (#0a0806 from CSS) for every destination —
     it must blend with hero black above and vehicles black below.
     Destination tint applies to the panel cards only. */

  const applyPanel = (prefix, pan, card) => {
    const art = document.getElementById(`${prefix}art`);
    art.style.background = pan.artBg;
    /* The panel reprises its beat's line-art scene — no more empty card */
    art.innerHTML        = card ? card.svg : '';
    document.getElementById(`${prefix}icon`).innerHTML        = '';
    /* Same eyebrow grammar as the z-beat captions: rule + DEST · BEAT */
    const tagEl = document.getElementById(`${prefix}tag`);
    tagEl.innerHTML = `<span class="s-panel-rule"></span>${dest.label} · ${pan.tag}`;
    tagEl.style.setProperty('--dest-accent', dest.color);
    const hEl = document.getElementById(`${prefix}h`);
    hEl.innerHTML   = pan.h;
    hEl.dataset.src = pan.h;
    document.getElementById(`${prefix}p`).textContent         = pan.p;
    const cardEl = document.getElementById(`${prefix.replace('-','')}-card`);
    cardEl.style.background = panelBg;
    cardEl.style.setProperty('--dest-glow', hexToRgba(dest.color, 0.22));
  };

  /* Panels A/B narrate beats 4 and 5 — reuse those beats' artwork */
  applyPanel('spa-', dest.panels[0], dest.cards[3]);
  applyPanel('spb-', dest.panels[1], dest.cards[4]);

  gsap.set('#sp-a', { opacity:0, pointerEvents:'none' });
  gsap.set('#sp-b', { opacity:0, pointerEvents:'none' });
}

/**
 * initScrollScene — orchestrates a full scene restart for destId.
 * Calls buildCards → buildPanels → mountScrollEngine in sequence.
 * Uses gsap.context() for atomic cleanup of all tweens on next call.
 * @param {number} destId
 * @param {boolean} [resetScroll=false] — only true when called from handleDockClick
 */
function initScrollScene(destId, resetScroll) {
  /* ── Atomic GSAP cleanup: kills ALL tweens, ScrollTriggers, and
        rAF loops spawned inside the previous context in one call. ── */
  if (gsapCtx)  { gsapCtx.revert(); gsapCtx = null; }
  if (lerpRaf)  { cancelAnimationFrame(lerpRaf); lerpRaf = null; }

  if (resetScroll) scrollToStoriesTop();
  targetCamZ = 0; currentCamZ = 0; prevTime = 0;
  p1shown = false; p2shown = false;
  activeBeat = -1; /* forces the beat label to repopulate for the new destination */

  gsap.set('#sec-stories-camera', { z:0 });
  QS.silOpacity(1);
  gsap.set([DOM.spA, DOM.spB], { opacity:0, pointerEvents:'none' });

  buildCards(destId);
  buildPanels(destId);

  /* ── Color sweep: the destination's hue washes over the night backdrop,
        blooming from the horizon when a new destination takes the stage ── */
  const c = DESTINATIONS[destId].color;
  DOM.tint.style.background = `
    radial-gradient(ellipse 95% 75% at 50% 30%, ${hexToRgba(c, 0.20)}, ${hexToRgba(c, 0.06)} 48%, transparent 74%)`;
  gsap.fromTo(DOM.tint,
    { opacity: 0, scale: 1.25, transformOrigin: '50% 100%' },
    { opacity: 1, scale: 1, duration: 1.6, ease: 'expo.out', overwrite: 'auto' });

  /* Ring atmosphere — slow breathing pulse (Pillar 3) */
  if (!REDUCED) gsap.utils.toArray('#sec-stories-rings ellipse').forEach((el, i) => {
    gsap.to(el, {
      opacity: 0.07,
      duration: 6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: i * 0.8,
    });
  });

  /* ── ScrollTrigger — one instance drives everything ── */
  stInst = ScrollTrigger.create({
    trigger: '#sec-stories-wrapper',
    start:   'top top',
    end:     'bottom bottom',
    onUpdate(self) {
      const pr = self.progress;

      /* Non-linear camera mapping ─────────────────────────
         Eases the first 15% and last 10% of Z-travel.
         Cards don't pop immediately; final card decelerates.
         gsap.parseEase applies power2.inOut to the [0,1] range. */
      const rawFrac  = clamp01(pr / Z_END);
      const easedFrac = gsap.parseEase('power2.inOut')(rawFrac);
      targetCamZ = easedFrac * CAM_MAX_Z;

      /* ─ Per-card opacity windowing ─────────────────────
         Eased approach (power2.inOut) for smooth perceptual
         fade-in; linear exit (snappy feel after passing).
         cardOpSetters[i] = gsap.quickSetter — 2-4× faster
         than el.style.opacity = value per frame.           */
      const zDepths = [500, 2000, 4000, 6500, 9000];
      const easeIn  = (t) => Math.pow(t, 1.5); /* one dominant beat; handoffs dip to ~.5, never pile, never void */
      /* Cards hold back until the intro has left the stage (unless a dock
         click suppressed the intro) — fixes intro/caption text collision */
      /* Intro owns the stage alone at rest (C5: no compositing); beats
         ramp in immediately as the intro exits so no void follows */
      const introGate = DOM.intro.classList.contains('suppressed')
        ? 1 : clamp01((pr - 0.02) / 0.03);
      let focalIdx = -1, focalOp = 0;
      cardEls.forEach((el, i) => {
        const dist = zDepths[i] - targetCamZ;
        let raw;
        if      (dist >  APPROACH_PX) raw = 0;
        else if (dist >  0)           raw = easeIn(1 - dist / APPROACH_PX);
        else if (dist > -EXIT_PX)     raw = 1 + dist / EXIT_PX;
        else                          raw = 0;
        const op = clamp01(raw) * introGate;
        if (cardOpSetters[i]) cardOpSetters[i](op);
        if (op > focalOp) { focalOp = op; focalIdx = i; }

        /* ─ Trajectory: the moment GLIDES through the frame while the
           camera flies — sideways toward center, a vertical drift, and
           a physical turn, all driven by its journey j ∈ [0,1] from
           first appearance to passing the lens ─ */
        const j = clamp01((APPROACH_PX - dist) / (APPROACH_PX + EXIT_PX));
        gsap.set(el, {
          x:  (j - 0.5) * 180 * el._dirX,
          y:  (j - 0.5) *  90 * el._dirY,
          rotationY: (0.5 - j) * 9 * el._dirX,
          rotationX: (j - 0.5) * 4 * el._dirY,
        });

        /* One-shot scale pulse on full entry */
        if (op > 0.85 && !el._hasAnimated) {
          el._hasAnimated = true;
          gsap.fromTo(el, { scale: 0.96 }, {
            scale: 1, duration: 0.7, ease: 'expo.out', overwrite: 'auto',
          });
        }

        /* Caption reveal — film-credit blur-in, line by line, as the
           moment takes the stage; re-arms when the moment fully exits */
        if (op > 0.28 && !el._capShown) {
          el._capShown = true;
          gsap.to(el.querySelectorAll('.zcap-line'), {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 1.0, stagger: 0.14, ease: 'expo.out', overwrite: 'auto',
          });
        } else if (op < 0.04 && el._capShown) {
          el._capShown = false;
          gsap.set(el.querySelectorAll('.zcap-line'), { opacity: 0, y: 26, filter: 'blur(8px)' });
        }
      });

      /* ─ Silhouette: parallax + opacity ─ */
      const silOp = pr < 0.02 ? 1 : clamp01(1 - (pr - 0.02) / 0.06);
      QS.silOpacity(silOp);
      /* Subtle upward parallax: silhouette drifts -18px as camera travels */
      DOM.silhouette.style.setProperty('--sil-y', `${pr * -18}px`);

      /* ─ Scroll hint opacity — only once the sticky stage is engaged,
         so the hint never floats over the intro during section entry ─ */
      const engaged = wrapperEl.getBoundingClientRect().top <= 4;
      QS.hintOpacity(engaged ? (pr < 0.03 ? 1 : clamp01(1 - (pr - 0.03) / 0.04)) : 0);

      /* ─ Beat progress: 5 segments fill one per story moment ─ */
      QS.progWrapOp(pr > 0.03 ? 1 : 0);
      const beatF = clamp01(pr / Z_END) * 5;
      for (let i = 0; i < 5; i++) {
        segFills[i].style.transform = `scaleX(${clamp01(beatF - i)})`;
      }
      /* Beat label follows whichever moment actually holds the stage —
         the z-flight is nonuniform, so beatF alone lags or leads the
         visible caption. Panels A/B reprise beats 4 and 5 after it. */
      let beatIdx = activeBeat < 0 ? 0 : activeBeat;
      if (focalOp > 0.35)   beatIdx = focalIdx;
      else if (pr >= P2_IN) beatIdx = 4;
      else if (pr >= P1_IN) beatIdx = 3;
      if (beatIdx !== activeBeat) {
        activeBeat = beatIdx;
        const card = DESTINATIONS[centerId].cards[beatIdx];
        DOM.beatLabel.textContent = `${card.num} — ${card.beat.split('/')[0].trim()}`;
        gsap.fromTo(DOM.beatLabel, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
      }

      /* ─ Stories intro: fade out as scroll begins ─ */
      if (DOM.intro) DOM.intro.style.opacity = String(clamp01(1 - pr / 0.05));

      /* ─ Dock: center → top (never back) ─ */
      if (pr > 0.01 && !dockAtTop) setDockPos(true, true);

      /* ─ Section panels fade in/out ─ */
      if (pr >= P1_IN && pr < P1_OUT) {
        const t = clamp01((pr - P1_IN) / 0.04);
        gsap.set('#sp-a', { opacity: t, pointerEvents: t > 0.5 ? 'auto' : 'none' });
        if (!p1shown && t > 0.1) {
          p1shown = true;
          /* Panel card: scale from 0.88 + drift */
          gsap.fromTo('#spa-card', { scale:0.88, y:30 }, { scale:1, y:0, duration:0.9, ease:'expo.out' });
          /* Heading: word-split stagger (keeps <br> + <em>) */
          splitHeadline(document.getElementById('spa-h'));
          gsap.from('#spa-h .wrd', { y:40, opacity:0, stagger:0.06, ease:'power4.out', duration:0.9 });
          /* Body: blur-to-sharp */
          gsap.from('#spa-p', { filter:'blur(6px)', opacity:0, duration:0.8, delay:0.3, ease:'power3.out' });
        }
      } else {
        const out = pr >= P1_OUT ? clamp01(1 - (pr - P1_OUT) / 0.03) : 0;
        gsap.set('#sp-a', { opacity: pr >= P1_IN ? out : 0, pointerEvents:'none' });
        if (pr < P1_IN) p1shown = false;
      }
      if (pr >= P2_IN && pr < P2_OUT) {
        const t = clamp01((pr - P2_IN) / 0.04);
        gsap.set('#sp-b', { opacity: t, y: 0, scale: 1, pointerEvents: t > 0.5 ? 'auto' : 'none' });
        if (!p2shown && t > 0.1) {
          p2shown = true;
          gsap.fromTo('#spb-card', { scale:0.88, y:30 }, { scale:1, y:0, duration:0.9, ease:'expo.out' });
          splitHeadline(document.getElementById('spb-h'));
          gsap.from('#spb-h .wrd', { y:40, opacity:0, stagger:0.06, ease:'power4.out', duration:0.9 });
          gsap.from('#spb-p', { filter:'blur(6px)', opacity:0, duration:0.8, delay:0.3, ease:'power3.out' });
        }
      } else {
        /* Seam gesture (stories → vehicles): the last panel recedes upward
           and shrinks as it dissolves into the coming blackness */
        const out = pr >= P2_OUT ? clamp01(1 - (pr - P2_OUT) / 0.05) : 0;
        gsap.set('#sp-b', {
          opacity: pr >= P2_IN ? out : 0,
          y: pr >= P2_OUT ? (1 - out) * -90 : 0,
          scale: pr >= P2_OUT ? 1 - (1 - out) * 0.06 : 1,
          pointerEvents: 'none',
        });
        if (pr < P2_IN) p2shown = false;
      }

      /* ─ Exit: fade the fixed chrome (dock / hint / progress) before the
         vehicles seam so nothing from stories ghosts over the next section ─ */
      document.body.classList.toggle('stories-exiting', pr > 0.965);
    }
  });

  /* ── Frame-rate-independent lerp loop ──────────────────
     Uses delta time so 60Hz and 120Hz feel identical.
     factor = 1 - pow(0.04, delta): at 60fps ≈ 0.1/frame;
     at 120fps ≈ 0.055/frame — same perceived inertia.    */
  (function lerp(ts) {
    if (prevTime) {
      const delta = Math.min((ts - prevTime) / 1000, 0.1); // cap at 100ms
      const factor = 1 - Math.pow(CONFIG.LERP_FACTOR, delta);
      currentCamZ += (targetCamZ - currentCamZ) * factor;
      swayX += (swayXT - swayX) * factor;
      swayY += (swayYT - swayY) * factor;
    }
    prevTime = ts;
    /* Single transform writer: Z travel + subtle cursor-led sway */
    gsap.set('#sec-stories-camera', {
      z: currentCamZ,
      rotationY: swayX * 1.6,
      rotationX: -swayY * 1.2,
    });
    lerpRaf = requestAnimationFrame(lerp);
  })(performance.now());

  /* ScrollTrigger must remeasure after scroll reset + DOM rebuild */
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

/* ══════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════ */
(function init() {
  /* Show pills */
  setTimeout(() => {
    pillEls.forEach(({ pill }) => { pill.style.opacity = '1'; });
    applyPillStyles(false);
  }, 80);
  setTimeout(() => applyPillStyles(false), 250);

  /* Boot with default destination (Clinic, id=2) */
  initScrollScene(centerId);
})();

})();
