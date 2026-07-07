/* Section 3 — VEHICLES: diagonal card rail with pointer tracking */
(function initVehicles() {
  /* Cinematic night-scene art for the two modes without photography —
     same production tier as the photo cards (council 6) */
  const NAVETTE_ART = `<svg viewBox="0 0 300 190" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
    <defs>
      <linearGradient id="nv-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0a1e34"/><stop offset=".62" stop-color="#071527"/><stop offset="1" stop-color="#04101e"/>
      </linearGradient>
      <linearGradient id="nv-sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0a1c30"/><stop offset="1" stop-color="#030a14"/>
      </linearGradient>
      <radialGradient id="nv-moon" cx=".78" cy=".2" r=".5">
        <stop offset="0" stop-color="rgba(232,224,200,.34)"/><stop offset=".35" stop-color="rgba(180,200,220,.1)"/><stop offset="1" stop-color="rgba(0,0,0,0)"/>
      </radialGradient>
      <linearGradient id="nv-hull" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1a2c40"/><stop offset="1" stop-color="#060d16"/>
      </linearGradient>
    </defs>
    <rect width="300" height="112" fill="url(#nv-sky)"/>
    <rect width="300" height="190" fill="url(#nv-moon)"/>
    <circle cx="234" cy="38" r="9" fill="#e8e4d4" opacity=".85"/>
    <circle cx="231" cy="35" r="9" fill="#0a1e34" opacity=".55"/>
    <g fill="white"><circle cx="30" cy="24" r="0.9" opacity=".5"/><circle cx="74" cy="48" r="0.7" opacity=".35"/><circle cx="132" cy="18" r="0.8" opacity=".45"/><circle cx="187" cy="56" r="0.6" opacity=".3"/><circle cx="268" cy="72" r="0.7" opacity=".35"/><circle cx="52" cy="76" r="0.6" opacity=".3"/></g>
    <rect y="112" width="300" height="78" fill="url(#nv-sea)"/>
    <g stroke="#7ab0e0" stroke-width="1">
      <line x1="18" y1="128" x2="66" y2="128" opacity=".28"/><line x1="210" y1="124" x2="288" y2="124" opacity=".38"/>
      <line x1="60" y1="146" x2="130" y2="146" opacity=".22"/><line x1="196" y1="160" x2="252" y2="160" opacity=".16"/>
      <line x1="24" y1="170" x2="90" y2="170" opacity=".12"/>
    </g>
    <g>
      <path d="M60 118 L240 118 L226 138 Q150 144 74 138 Z" fill="url(#nv-hull)"/>
      <path d="M60 118 L240 118 L237 122 L63 122 Z" fill="#2a4058" opacity=".8"/>
      <rect x="92" y="96" width="116" height="22" rx="4" fill="#0d1a2a"/>
      <rect x="92" y="96" width="116" height="3" rx="1.5" fill="#3a5a7a" opacity=".7"/>
      <g fill="#f0d488">
        <rect x="102" y="103" width="10" height="7" rx="2" opacity=".95"/><rect x="120" y="103" width="10" height="7" rx="2" opacity=".8"/>
        <rect x="138" y="103" width="10" height="7" rx="2" opacity=".95"/><rect x="156" y="103" width="10" height="7" rx="2" opacity=".7"/>
        <rect x="174" y="103" width="10" height="7" rx="2" opacity=".9"/><rect x="190" y="103" width="8" height="7" rx="2" opacity=".8"/>
      </g>
      <rect x="130" y="80" width="34" height="16" rx="3" fill="#122238"/>
      <rect x="134" y="84" width="12" height="7" rx="2" fill="#f0d488" opacity=".9"/>
      <line x1="170" y1="80" x2="170" y2="66" stroke="#2a4058" stroke-width="2"/>
      <circle cx="170" cy="64" r="2.4" fill="#ffd878" opacity=".95"/>
    </g>
    <g>
      <rect x="104" y="142" width="9" height="4" rx="2" fill="#c8a860" opacity=".4"/>
      <rect x="140" y="150" width="12" height="4" rx="2" fill="#c8a860" opacity=".3"/>
      <rect x="176" y="144" width="9" height="4" rx="2" fill="#c8a860" opacity=".35"/>
    </g>
    <path d="M50 138 Q40 132 30 138 M250 138 Q262 130 274 136" stroke="#5a86b0" stroke-width="1" fill="none" opacity=".4"/>
  </svg>`;
  const TELECABINE_ART = `<svg viewBox="0 0 300 190" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
    <defs>
      <linearGradient id="tc-sky2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0a2622"/><stop offset=".6" stop-color="#071a17"/><stop offset="1" stop-color="#04100e"/>
      </linearGradient>
      <linearGradient id="tc-cab" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1c3833"/><stop offset="1" stop-color="#081412"/>
      </linearGradient>
      <radialGradient id="tc-mist" cx=".5" cy=".82" r=".65">
        <stop offset="0" stop-color="rgba(120,200,180,.16)"/><stop offset=".55" stop-color="rgba(80,150,130,.06)"/><stop offset="1" stop-color="rgba(0,0,0,0)"/>
      </radialGradient>
    </defs>
    <rect width="300" height="190" fill="url(#tc-sky2)"/>
    <g fill="white"><circle cx="42" cy="30" r="0.8" opacity=".45"/><circle cx="108" cy="16" r="0.6" opacity=".3"/><circle cx="205" cy="26" r="0.9" opacity=".5"/><circle cx="262" cy="54" r="0.6" opacity=".3"/><circle cx="26" cy="72" r="0.7" opacity=".35"/><circle cx="286" cy="14" r="0.7" opacity=".4"/></g>
    <rect width="300" height="190" fill="url(#tc-mist)"/>
    <path d="M0 148 L46 122 L88 140 L132 118 L178 142 L216 126 L258 146 L300 130 L300 190 L0 190 Z" fill="#081613" opacity=".5"/>
    <path d="M0 162 L60 140 L110 156 L168 138 L224 158 L272 144 L300 154 L300 190 L0 190 Z" fill="#050f0d"/>
    <g fill="#f0d488">
      <rect x="52" y="150" width="2.6" height="2.6" rx="0.6" opacity=".8"/><rect x="84" y="158" width="2.2" height="2.2" rx="0.6" opacity=".55"/>
      <rect x="140" y="152" width="2.6" height="2.6" rx="0.6" opacity=".7"/><rect x="196" y="162" width="2.2" height="2.2" rx="0.6" opacity=".6"/>
      <rect x="236" y="154" width="2.6" height="2.6" rx="0.6" opacity=".75"/><rect x="118" y="166" width="2" height="2" rx="0.5" opacity=".45"/>
    </g>
    <line x1="-8" y1="86" x2="308" y2="34" stroke="#4a8a7a" stroke-width="1.4" opacity=".75"/>
    <g>
      <line x1="150" y1="63" x2="150" y2="76" stroke="#2c5248" stroke-width="3"/>
      <path d="M150 63 L142 70 L158 70 Z" fill="#2c5248"/>
      <rect x="126" y="76" width="48" height="38" rx="9" fill="url(#tc-cab)"/>
      <rect x="126" y="76" width="48" height="3.5" rx="1.75" fill="#4a8a7a" opacity=".9"/>
      <rect x="133" y="84" width="34" height="15" rx="4" fill="#f0d488" opacity=".9"/>
      <rect x="133" y="84" width="34" height="15" rx="4" fill="none" stroke="#0a1e1a" stroke-width="1" opacity=".6"/>
      <line x1="150" y1="84" x2="150" y2="99" stroke="#0a1e1a" stroke-width="1.4" opacity=".7"/>
      <rect x="126" y="108" width="48" height="6" rx="3" fill="#0a1a16"/>
    </g>
    <g opacity=".8">
      <line x1="236" y1="49" x2="236" y2="57" stroke="#2c5248" stroke-width="1.6"/>
      <rect x="226" y="57" width="20" height="16" rx="4" fill="#0c1c18"/>
      <rect x="229" y="60" width="14" height="6" rx="2" fill="#f0d488" opacity=".55"/>
    </g>
    <line x1="42" y1="79" x2="42" y2="146" stroke="#12312a" stroke-width="4" opacity=".9"/>
    <path d="M34 79 L50 79 L46 88 L38 88 Z" fill="#12312a" opacity=".9"/>
  </svg>`;

  const VEHICLES_CARDS = [
    { key:'metro',   tag:'Underground',      name:'Metro',   em:null,         badge:'Fastest',    w:476, h:357, bg:'linear-gradient(145deg,#090e1a 0%,#0d1528 45%,#060a14 100%)', accent:'rgba(80,120,220,.30)' },
    { key:'tram',    tag:'Street Level',     name:'Tram',    em:'way',        badge:'Electric',   w:520, h:390, bg:'linear-gradient(145deg,#0a1408 0%,#0f1e0a 45%,#070f06 100%)', accent:'rgba(80,180,80,.28)'  },
    { key:'etusa',   tag:'City Bus',         name:'ETUSA',   em:' Bus',       badge:'Network',    w:480, h:360, bg:'linear-gradient(145deg,#181006 0%,#231808 45%,#120c04 100%)', accent:'rgba(220,160,40,.28)' },
    { key:'privbus', tag:'Private Operator', name:'Private', em:' Bus',       badge:'Coverage',   w:446, h:335, bg:'linear-gradient(145deg,#0e1018 0%,#141620 45%,#0a0c14 100%)', accent:'rgba(160,160,200,.22)'},
    { key:'teleph',  tag:'Aerial',           name:'Télé',    em:'phérique',   badge:'Aerial',     w:400, h:300, bg:'linear-gradient(145deg,#071020 0%,#0a1830 45%,#050c18 100%)', accent:'rgba(60,160,240,.30)' },
    { key:'sntf',    tag:'Commuter Rail',    name:'SNTF',    em:' Train',     badge:'Long Range', w:520, h:390, bg:'linear-gradient(145deg,#1a0a08 0%,#281008 45%,#120606 100%)', accent:'rgba(200,60,40,.30)'  },
    { key:'taxi',    tag:'On Demand',        name:'Taxi',    em:null,         badge:'On Demand',  w:446, h:335, bg:'linear-gradient(145deg,#1a1008 0%,#261604 45%,#140c04 100%)', accent:'rgba(220,180,30,.30)' },
    { key:null,      tag:'Maritime',         name:'Navette', em:' Maritime',  badge:'Ferry',      w:476, h:357, bg:'linear-gradient(145deg,#040e1c 0%,#061422 45%,#030a16 100%)', accent:'rgba(40,120,220,.30)', art: NAVETTE_ART },
    { key:null,      tag:'Gondola',          name:'Télé',    em:'cabine',     badge:'Cable Line',    w:416, h:312, bg:'linear-gradient(145deg,#071414 0%,#0a1c18 45%,#050e10 100%)', accent:'rgba(40,180,160,.26)', art: TELECABINE_ART },
  ];

  /* Gold line glyphs (1.5px stroke register, no fill) — replaces the emoji
     placeholders per the design system's iconography rules */
  const G = `fill="none" stroke="#c8a060" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  const VEHICLE_GLYPHS = {
    'Underground': `<svg viewBox="0 0 96 96" ${G}>
      <rect x="26" y="14" width="44" height="56" rx="10"/>
      <path d="M32 38 H64"/>
      <rect x="34" y="22" width="28" height="12" rx="3"/>
      <circle cx="36" cy="56" r="3"/><circle cx="60" cy="56" r="3"/>
      <path d="M34 78 L28 88 M62 78 L68 88 M22 88 H74"/>
    </svg>`,
    'Street Level': `<svg viewBox="0 0 96 96" ${G}>
      <path d="M30 10 H66 M48 10 V20"/>
      <rect x="28" y="20" width="40" height="52" rx="8"/>
      <rect x="35" y="28" width="26" height="14" rx="3"/>
      <path d="M35 52 H61"/>
      <circle cx="38" cy="80" r="4"/><circle cx="58" cy="80" r="4"/>
    </svg>`,
    'City Bus': `<svg viewBox="0 0 96 96" ${G}>
      <rect x="18" y="22" width="60" height="48" rx="8"/>
      <path d="M18 50 H78"/>
      <rect x="26" y="30" width="44" height="12" rx="3"/>
      <circle cx="32" cy="78" r="5"/><circle cx="64" cy="78" r="5"/>
      <path d="M26 60 H30 M66 60 H70"/>
    </svg>`,
    'Private Operator': `<svg viewBox="0 0 96 96" ${G}>
      <path d="M20 64 V40 Q20 30 30 30 H60 Q70 30 74 40 L78 52 V64 Z"/>
      <path d="M28 38 H46 V50 H24 M54 38 H64 L70 50 H54 Z"/>
      <circle cx="32" cy="68" r="5"/><circle cx="64" cy="68" r="5"/>
    </svg>`,
    'Aerial': `<svg viewBox="0 0 96 96" ${G}>
      <path d="M6 22 L90 12"/>
      <path d="M48 17 V34"/>
      <rect x="30" y="34" width="36" height="34" rx="8"/>
      <path d="M30 50 H66"/>
      <rect x="40" y="40" width="16" height="10" rx="2"/>
    </svg>`,
    'Commuter Rail': `<svg viewBox="0 0 96 96" ${G}>
      <path d="M30 14 H58 Q72 14 72 32 V70 H30 Q24 70 24 60 V20 Q24 14 30 14 Z"/>
      <path d="M32 24 H58 Q64 24 64 32 V38 H32 Z"/>
      <circle cx="38" cy="56" r="3"/><circle cx="56" cy="56" r="3"/>
      <path d="M10 82 H86 M16 76 H40"/>
    </svg>`,
    'On Demand': `<svg viewBox="0 0 96 96" ${G}>
      <rect x="40" y="22" width="16" height="8" rx="2"/>
      <path d="M18 62 V52 Q18 46 26 46 L34 34 H62 L70 46 Q78 46 78 52 V62 Z"/>
      <path d="M38 36 L32 46 H64 L58 36"/>
      <circle cx="30" cy="66" r="5"/><circle cx="66" cy="66" r="5"/>
    </svg>`,
    'Maritime': `<svg viewBox="0 0 96 96" ${G}>
      <path d="M14 56 H82 L72 72 H24 Z"/>
      <rect x="30" y="40" width="36" height="16" rx="3"/>
      <path d="M44 40 V30 H58 V40"/>
      <circle cx="38" cy="48" r="2"/><circle cx="48" cy="48" r="2"/><circle cx="58" cy="48" r="2"/>
      <path d="M14 82 Q22 76 30 82 Q38 88 46 82 Q54 76 62 82 Q70 88 78 82"/>
    </svg>`,
    'Gondola': `<svg viewBox="0 0 96 96" ${G}>
      <path d="M6 18 H90"/>
      <path d="M48 18 V32"/>
      <path d="M34 32 H62 L58 64 H38 Z"/>
      <path d="M36 46 H60"/>
    </svg>`,
  };

  const stage = document.getElementById('v-stage');
  const stripName  = document.getElementById('v-strip-name');
  const stripCount = document.getElementById('v-strip-count');
  const progFill   = document.getElementById('v-prog-fill');

  const vCardEls = VEHICLES_CARDS.map((d) => {
    const el = document.createElement('div');
    el.className = 'vcard' + (d.key || d.art ? '' : ' vcard-typo');
    el.style.background = d.bg;

    if (!d.key && !d.art) {
      /* Deliberate typographic card for modes without photography:
         lit gold emblem over a ring field and horizon line */
      const rings = document.createElement('div');
      rings.className = 'vc-typo-rings';
      el.appendChild(rings);
      const horizon = document.createElement('div');
      horizon.className = 'vc-typo-horizon';
      el.appendChild(horizon);
    }

    const glow = document.createElement('div');
    glow.style.cssText = `position:absolute;top:0;left:0;right:0;height:55%;background:radial-gradient(ellipse 80% 120% at 50% 0%,${d.accent},transparent 80%);pointer-events:none;z-index:0;`;
    el.appendChild(glow);

    let ph = null;
    if (d.art) {
      const art = document.createElement('div');
      art.className = 'vc-art';
      art.innerHTML = d.art;
      el.appendChild(art);
    } else {
      ph = document.createElement('div');
      ph.className = 'vc-placeholder';
      ph.innerHTML = VEHICLE_GLYPHS[d.tag] || VEHICLE_GLYPHS['City Bus'];
      el.appendChild(ph);
    }

    if (d.key) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'vc-img';
      const img = document.createElement('img');
      img.src = `assets/vehicles/${d.key}.webp`;
      img.alt = d.name;
      img.loading = 'lazy';
      img.addEventListener('load', () => { if (ph) ph.style.display = 'none'; });
      imgWrap.appendChild(img);
      el.appendChild(imgWrap);
    }

    const ov = document.createElement('div'); ov.className = 'vc-overlay'; el.appendChild(ov);
    const ini = document.createElement('div'); ini.className = 'vc-initial'; ini.textContent = d.name[0]; el.appendChild(ini);
    const tl = document.createElement('div'); tl.className = 'vc-topline'; el.appendChild(tl);
    const body = document.createElement('div'); body.className = 'vc-body';
    body.innerHTML = `<div class="vc-badge-wrap"><span class="vc-badge">${d.badge}</span></div><div class="vc-rule"></div><div class="vc-name">${d.name}${d.em ? `<em>${d.em}</em>` : ''}</div><div class="vc-tag">${d.tag}</div>`;
    el.appendChild(body);
    stage.appendChild(el);
    return el;
  });

  let vmx = 0.5, vmy = 0.5, coastVel = 0, fingerDown = false, prevDiag = 0, tiltSmooth = 0;
  let progress = 0.0, progTarget = 0.0;
  const n = VEHICLES_CARDS.length;
  const DEAD_ZONE = 0.08, MAX_SPEED = 0.017, COAST_DECAY = 0.72;
  const MAX_CARD_H = Math.max(...VEHICLES_CARDS.map(d => d.h));

  /* Responsive card scale: fit width on phones, clear the headline on
     short viewports. Applied to card boxes; recomputed on resize. */
  const centerText = document.getElementById('v-center-text');
  let vScale = 1, ctBottom = 300, scySmooth = 0;
  function applySizes() {
    ctBottom = centerText.getBoundingClientRect().bottom + window.scrollY -
               (document.getElementById('s-vehicles').getBoundingClientRect().top + window.scrollY);
    if (!(ctBottom > 0 && ctBottom < innerHeight)) ctBottom = innerHeight * 0.38;
    vScale = Math.min(1,
      (innerWidth - 48) / 560,
      (innerHeight - ctBottom - 70) / MAX_CARD_H);
    vScale = Math.max(vScale, 0.55);
    vCardEls.forEach((el, i) => {
      el.style.width  = VEHICLES_CARDS[i].w * vScale + 'px';
      el.style.height = VEHICLES_CARDS[i].h * vScale + 'px';
    });
  }
  applySizes();
  window.addEventListener('resize', applySizes);
  /* re-measure once fonts have settled */
  setTimeout(applySizes, 600);

  function getDiag() { return ((vmx - 0.5) * 2 - (vmy - 0.5) * 2) / 2; }
  function getTilt() { return (vmx - 0.5) + (vmy - 0.5); }
  /* Narrow viewports: fewer co-present cards, spaced wider, so the rail
     reads as a clean sequence instead of an overlapping pile (C3). */
  const NARROW_RAIL = window.innerWidth <= 720;
  const SCALE_K   = NARROW_RAIL ? 0.85 : 0.42;
  const ALPHA_K   = NARROW_RAIL ? 0.55 : 0.34;
  const SX_FACTOR = NARROW_RAIL ? 0.52 : 0.30;
  function scaleFn(d) { return Math.exp(-d * d * SCALE_K); }
  /* Gentler falloff so the handoff moment (|d|=.5 on both cards) keeps a
     focal card at ~.63 alpha instead of a dead .45/.45 void. */
  function alphaFn(d) { return Math.max(0, 1 - Math.abs(d) * ALPHA_K); }
  function lerp(a,b,t) { return a + (b-a)*t; }
  function vclamp(v) { return Math.min(1, Math.max(0, v)); }

  let vehiclesActive = false;
  let scrubMode = false;
  const section = document.getElementById('s-vehicles');

  /* Scroll-scrubbed rail: the section pins and the 9 cards advance with
     scroll — the one gesture everyone already knows, on every device.
     Pointer position is demoted to tilt garnish. */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    scrubMode = true;
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=170%',
      pin: true,
      scrub: true,
      onUpdate(self) {
        progTarget = self.progress;
        /* Headline hands the stage to the rail as scrubbing begins */
        const fade = self.progress < 0.04 ? 1 : Math.max(0, 1 - (self.progress - 0.04) / 0.08);
        centerText.style.opacity = fade;
      },
    });
  }
  const vObs = new IntersectionObserver(entries => {
    vehiclesActive = entries[0].isIntersecting;
    document.body.classList.toggle('cursor-expanded', vehiclesActive);
  }, { threshold: 0.3 });
  vObs.observe(section);

  // Scope pointer events to the section so they don't interfere with other sections
  section.addEventListener('pointermove', e => {
    if (!vehiclesActive) return;
    vmx = e.clientX / window.innerWidth;
    vmy = e.clientY / window.innerHeight;
  });
  section.addEventListener('pointerdown', e => {
    if (scrubMode || !vehiclesActive || e.pointerType === 'mouse') return;
    fingerDown = true; coastVel = 0;
    vmx = e.clientX / window.innerWidth; vmy = e.clientY / window.innerHeight;
    prevDiag = getDiag();
  });
  section.addEventListener('pointerup', e => {
    if (scrubMode || !vehiclesActive || e.pointerType === 'mouse') return;
    coastVel = getDiag() - prevDiag; fingerDown = false;
  });
  section.addEventListener('pointercancel', e => {
    if (e.pointerType !== 'mouse') { coastVel = 0; fingerDown = false; }
  });

  function vRender() {
    requestAnimationFrame(vRender);
    if (!vehiclesActive) return;

    if (!scrubMode) {
      /* Fallback (no ScrollTrigger): pointer-driven rail */
      let speed = 0;
      if (fingerDown) {
        const d = getDiag(), sign = Math.sign(d);
        const mag = Math.max(0, Math.abs(d) - DEAD_ZONE) / (1 - DEAD_ZONE);
        speed = sign * mag * MAX_SPEED; prevDiag = d;
      } else if (Math.abs(coastVel) > 0.0001) {
        speed = coastVel * MAX_SPEED * 6; coastVel *= COAST_DECAY;
      } else {
        const d = getDiag(), sign = Math.sign(d);
        const mag = Math.max(0, Math.abs(d) - DEAD_ZONE) / (1 - DEAD_ZONE);
        speed = sign * mag * MAX_SPEED;
      }
      progTarget = vclamp(progTarget + speed);
    }
    progress = lerp(progress, progTarget, fingerDown ? 0.18 : 0.1);
    tiltSmooth = lerp(tiltSmooth, getTilt(), 0.09);

    const focus = progress * (n - 1);
    const idx = Math.max(0, Math.min(n-1, Math.round(focus)));
    const d = VEHICLES_CARDS[idx];
    stripName.textContent = d.name + (d.em || '');
    stripCount.textContent = `${String(idx+1).padStart(2,'0')} / ${String(n).padStart(2,'0')}`;
    progFill.style.width = (progress * 100) + '%';

    const scx = window.innerWidth / 2;
    /* Stage center: below the headline while it shows, then the cards
       drift up to own the frame as it fades */
    const scyIdle   = Math.min(window.innerHeight * 0.65,
                               (ctBottom + window.innerHeight - 30) / 2 + MAX_CARD_H * vScale * 0.5 * 0.2);
    const scyActive = window.innerHeight * 0.54;
    const scyTarget = progress > 0.06 ? scyActive : scyIdle;
    scySmooth = scySmooth ? lerp(scySmooth, scyTarget, 0.08) : scyTarget;
    const scy = scySmooth;
    const sx = window.innerWidth * SX_FACTOR * (0.4 + 0.6 * vScale);
    const sy = window.innerHeight * 0.16;
    const MAX_TILT = 42;
    const rotX =  tiltSmooth * MAX_TILT;
    const rotY = -tiltSmooth * MAX_TILT;

    vCardEls.forEach((el, i) => {
      const dist  = i - focus;
      const scale = scaleFn(dist);
      const alpha = alphaFn(dist);
      if (alpha < 0.01) { el.style.visibility = 'hidden'; return; }
      el.style.visibility = 'visible';
      el.style.opacity    = alpha;
      el.style.zIndex     = Math.round(scale * 10);
      const ox = dist * sx, oy = dist * (-sy);
      const tiltFade = Math.max(0, 1 - Math.abs(dist) * 2.5);
      el.style.transform = `translate(calc(${scx+ox}px - 50%), calc(${scy+oy}px - 50%)) scale(${scale}) rotateX(${rotX*tiltFade}deg) rotateY(${rotY*tiltFade}deg)`;
      el.classList.toggle('focused', Math.abs(dist) < 0.35);
    });
  }
  vRender();
})();
