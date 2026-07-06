/* Section 3 — VEHICLES: diagonal card rail with pointer tracking */
(function initVehicles() {
  const VEHICLES_CARDS = [
    { key:'metro',   tag:'Underground',      name:'Metro',   em:null,         badge:'Fastest',    w:476, h:357, bg:'linear-gradient(145deg,#090e1a 0%,#0d1528 45%,#060a14 100%)', accent:'rgba(80,120,220,.30)' },
    { key:'tram',    tag:'Street Level',     name:'Tram',    em:'way',        badge:'Electric',   w:520, h:390, bg:'linear-gradient(145deg,#0a1408 0%,#0f1e0a 45%,#070f06 100%)', accent:'rgba(80,180,80,.28)'  },
    { key:'etusa',   tag:'City Bus',         name:'ETUSA',   em:' Bus',       badge:'Network',    w:480, h:360, bg:'linear-gradient(145deg,#181006 0%,#231808 45%,#120c04 100%)', accent:'rgba(220,160,40,.28)' },
    { key:'privbus', tag:'Private Operator', name:'Private', em:' Bus',       badge:'Coverage',   w:446, h:335, bg:'linear-gradient(145deg,#0e1018 0%,#141620 45%,#0a0c14 100%)', accent:'rgba(160,160,200,.22)'},
    { key:'teleph',  tag:'Aerial',           name:'Télé',    em:'phérique',   badge:'Aerial',     w:400, h:300, bg:'linear-gradient(145deg,#071020 0%,#0a1830 45%,#050c18 100%)', accent:'rgba(60,160,240,.30)' },
    { key:'sntf',    tag:'Commuter Rail',    name:'SNTF',    em:' Train',     badge:'Long Range', w:520, h:390, bg:'linear-gradient(145deg,#1a0a08 0%,#281008 45%,#120606 100%)', accent:'rgba(200,60,40,.30)'  },
    { key:'taxi',    tag:'On Demand',        name:'Taxi',    em:null,         badge:'On Demand',  w:446, h:335, bg:'linear-gradient(145deg,#1a1008 0%,#261604 45%,#140c04 100%)', accent:'rgba(220,180,30,.30)' },
    { key:null,      tag:'Maritime',         name:'Navette', em:' Maritime',  badge:'Ferry',      w:476, h:357, bg:'linear-gradient(145deg,#040e1c 0%,#061422 45%,#030a16 100%)', accent:'rgba(40,120,220,.30)' },
    { key:null,      tag:'Gondola',          name:'Télé',    em:'cabine',     badge:'Cable Line',    w:416, h:312, bg:'linear-gradient(145deg,#071414 0%,#0a1c18 45%,#050e10 100%)', accent:'rgba(40,180,160,.26)' },
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
    el.className = 'vcard' + (d.key ? '' : ' vcard-typo');
    el.style.background = d.bg;

    if (!d.key) {
      /* Deliberate typographic card for modes without photography:
         the gold line glyph takes the stage over a ring motif */
      const rings = document.createElement('div');
      rings.className = 'vc-typo-rings';
      el.appendChild(rings);
    }

    const glow = document.createElement('div');
    glow.style.cssText = `position:absolute;top:0;left:0;right:0;height:55%;background:radial-gradient(ellipse 80% 120% at 50% 0%,${d.accent},transparent 80%);pointer-events:none;z-index:0;`;
    el.appendChild(glow);

    const ph = document.createElement('div');
    ph.className = 'vc-placeholder';
    ph.innerHTML = VEHICLE_GLYPHS[d.tag] || VEHICLE_GLYPHS['City Bus'];
    el.appendChild(ph);

    if (d.key) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'vc-img';
      const img = document.createElement('img');
      img.src = `assets/vehicles/${d.key}.webp`;
      img.alt = d.name;
      img.loading = 'lazy';
      img.addEventListener('load', () => { ph.style.display = 'none'; });
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
  function scaleFn(d) { return Math.exp(-d * d * 2.2); }
  function alphaFn(d) { return Math.max(0, 1 - Math.abs(d) * 1.1); }
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
      end: '+=380%',
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
    const sx = window.innerWidth * 0.36 * (0.4 + 0.6 * vScale);
    const sy = window.innerHeight * 0.22;
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
