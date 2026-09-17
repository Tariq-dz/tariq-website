/* Section 3 — VEHICLES: diagonal card rail with pointer tracking */
(function initVehicles() {
  /* Cinematic night-scene art for the two modes without photography —
     same production tier as the photo cards (council 6) */
  const NAVETTE_ART = `<svg viewBox="0 0 300 190" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
    <defs>
      <linearGradient id="nv-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0b2038"/><stop offset=".55" stop-color="#08172a"/><stop offset="1" stop-color="#050f1c"/>
      </linearGradient>
      <linearGradient id="nv-sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0b1e33"/><stop offset="1" stop-color="#03090f"/>
      </linearGradient>
      <linearGradient id="nv-hullg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#16283c"/><stop offset=".18" stop-color="#0b1826"/><stop offset="1" stop-color="#04090f"/>
      </linearGradient>
      <radialGradient id="nv-moonhalo" cx=".76" cy=".16" r=".42">
        <stop offset="0" stop-color="rgba(226,232,238,.5)"/><stop offset=".2" stop-color="rgba(190,208,224,.16)"/><stop offset="1" stop-color="rgba(0,0,0,0)"/>
      </radialGradient>
      <linearGradient id="nv-glade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="rgba(216,226,236,.4)"/><stop offset=".6" stop-color="rgba(190,205,220,.12)"/><stop offset="1" stop-color="rgba(0,0,0,0)"/>
      </linearGradient>
      <filter id="nv-soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.2"/></filter>
      <filter id="nv-soft4" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4.5"/></filter>
      <filter id="nv-soft1" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="0.9"/></filter>
    </defs>
    <rect width="300" height="110" fill="url(#nv-sky)"/>
    <rect width="300" height="190" fill="url(#nv-moonhalo)"/>
    <circle cx="228" cy="32" r="7.5" fill="#e6ecf2" filter="url(#nv-soft1)"/>
    <g fill="white"><circle cx="34" cy="22" r="0.8" opacity=".4"/><circle cx="86" cy="44" r="0.6" opacity=".28"/><circle cx="140" cy="16" r="0.7" opacity=".35"/><circle cx="190" cy="58" r="0.5" opacity=".22"/><circle cx="272" cy="70" r="0.6" opacity=".3"/></g>
    <path d="M0 104 L48 96 L92 102 L120 94 L150 100 L300 92 L300 112 L0 112 Z" fill="#071322" filter="url(#nv-soft)"/>
    <g fill="#e8c060" filter="url(#nv-soft1)" opacity=".8">
      <circle cx="22" cy="100" r="1.1"/><circle cx="56" cy="97" r="0.9"/><circle cx="104" cy="99" r="1"/><circle cx="128" cy="95" r="0.8"/><circle cx="284" cy="93" r="1"/>
    </g>
    <rect y="110" width="300" height="80" fill="url(#nv-sea)"/>
    <path d="M212 112 L244 112 L238 176 L218 176 Z" fill="url(#nv-glade)" filter="url(#nv-soft4)"/>
    <g stroke="#8fb4d8" filter="url(#nv-soft1)">
      <line x1="20" y1="126" x2="72" y2="126" stroke-width="1.1" opacity=".22"/>
      <line x1="196" y1="122" x2="290" y2="122" stroke-width="1.2" opacity=".3"/>
      <line x1="56" y1="144" x2="128" y2="144" stroke-width="1" opacity=".16"/>
      <line x1="184" y1="158" x2="262" y2="158" stroke-width="1" opacity=".12"/>
      <line x1="30" y1="170" x2="96" y2="170" stroke-width="1" opacity=".09"/>
    </g>
    <g>
      <path d="M58 116 Q60 112 66 112 L112 112 L118 100 Q120 96 126 96 L182 96 Q198 96 214 104 L236 114 Q244 117 240 122 L228 136 Q224 141 214 142 Q150 148 84 141 Q72 140 66 132 Z" fill="url(#nv-hullg)"/>
      <path d="M58 116 Q60 112 66 112 L112 112 L118 100 Q120 96 126 96 L182 96 Q198 96 214 104 L236 114" fill="none" stroke="#4a7096" stroke-width="1" opacity=".5" filter="url(#nv-soft1)"/>
      <g filter="url(#nv-soft1)">
        <rect x="128" y="102" width="7" height="5" rx="2" fill="#f2d488" opacity=".9"/>
        <rect x="141" y="102" width="7" height="5" rx="2" fill="#f2d488" opacity=".75"/>
        <rect x="154" y="102" width="7" height="5" rx="2" fill="#f2d488" opacity=".9"/>
        <rect x="167" y="102" width="7" height="5" rx="2" fill="#f2d488" opacity=".65"/>
        <rect x="180" y="102" width="7" height="5" rx="2" fill="#f2d488" opacity=".85"/>
        <rect x="90" y="118" width="6" height="4" rx="2" fill="#e8c878" opacity=".55"/>
        <rect x="104" y="118" width="6" height="4" rx="2" fill="#e8c878" opacity=".7"/>
        <rect x="118" y="118" width="6" height="4" rx="2" fill="#e8c878" opacity=".5"/>
        <rect x="132" y="118" width="6" height="4" rx="2" fill="#e8c878" opacity=".68"/>
      </g>
      <circle cx="124" cy="90" r="1.8" fill="#ffd878" filter="url(#nv-soft1)"/>
      <line x1="124" y1="90" x2="124" y2="96" stroke="#1a2c40" stroke-width="1.4"/>
      <path d="M84 148 Q150 156 216 148 L212 158 Q150 165 88 158 Z" fill="#e8c878" opacity=".08" filter="url(#nv-soft4)"/>
    </g>
    <path d="M46 132 Q34 126 22 132 M252 128 Q266 121 280 127" stroke="#5a86b0" stroke-width="1" fill="none" opacity=".3" filter="url(#nv-soft1)"/>
  </svg>`;
  const TELECABINE_ART = `<svg viewBox="0 0 300 190" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;display:block">
    <defs>
      <linearGradient id="tc-sky3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0c2e27"/><stop offset=".5" stop-color="#08201b"/><stop offset="1" stop-color="#04110e"/>
      </linearGradient>
      <linearGradient id="tc-cabg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#22443b"/><stop offset=".2" stop-color="#112821"/><stop offset="1" stop-color="#07110d"/>
      </linearGradient>
      <radialGradient id="tc-cityglow" cx=".5" cy="1" r=".85">
        <stop offset="0" stop-color="rgba(240,200,110,.3)"/><stop offset=".4" stop-color="rgba(200,160,80,.1)"/><stop offset="1" stop-color="rgba(0,0,0,0)"/>
      </radialGradient>
      <radialGradient id="tc-cabhalo" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="rgba(242,212,136,.22)"/><stop offset=".6" stop-color="rgba(242,212,136,.06)"/><stop offset="1" stop-color="rgba(0,0,0,0)"/>
      </radialGradient>
      <filter id="tc-soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.2"/></filter>
      <filter id="tc-soft1" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="0.9"/></filter>
      <filter id="tc-soft4" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="5"/></filter>
    </defs>
    <rect width="300" height="190" fill="url(#tc-sky3)"/>
    <g fill="white"><circle cx="46" cy="26" r="0.7" opacity=".4"/><circle cx="112" cy="14" r="0.5" opacity=".26"/><circle cx="208" cy="20" r="0.8" opacity=".45"/><circle cx="266" cy="46" r="0.5" opacity=".26"/><circle cx="28" cy="64" r="0.6" opacity=".3"/><circle cx="180" cy="38" r="0.5" opacity=".24"/></g>
    <path d="M0 118 L44 100 L84 114 L128 96 L176 118 L224 102 L262 120 L300 108 L300 190 L0 190 Z" fill="#0c1f19" filter="url(#tc-soft)"/>
    <path d="M0 138 L52 116 L96 132 L146 112 L198 134 L242 120 L300 140 L300 190 L0 190 Z" fill="#081712" filter="url(#tc-soft1)"/>
    <path d="M0 160 L64 138 L116 154 L172 136 L230 156 L278 144 L300 152 L300 190 L0 190 Z" fill="#040d0a"/>
    <rect y="104" width="300" height="86" fill="url(#tc-cityglow)"/>
    <g fill="#f0c878" filter="url(#tc-soft1)">
      <circle cx="38" cy="128" r="1" opacity=".6"/><circle cx="54" cy="146" r="1.3" opacity=".9"/><circle cx="72" cy="138" r="0.9" opacity=".5"/>
      <circle cx="88" cy="156" r="1" opacity=".6"/><circle cx="106" cy="146" r="0.9" opacity=".55"/><circle cx="122" cy="160" r="1" opacity=".5"/>
      <circle cx="142" cy="148" r="1.2" opacity=".75"/><circle cx="158" cy="162" r="0.9" opacity=".5"/><circle cx="176" cy="152" r="1" opacity=".6"/>
      <circle cx="198" cy="158" r="1" opacity=".65"/><circle cx="216" cy="146" r="0.9" opacity=".55"/><circle cx="238" cy="150" r="1.3" opacity=".85"/>
      <circle cx="258" cy="162" r="0.9" opacity=".5"/><circle cx="276" cy="150" r="1" opacity=".6"/><circle cx="288" cy="166" r="0.8" opacity=".45"/>
    </g>
    <path d="M-8 78 Q150 44 308 24" stroke="#63a08c" stroke-width="1.2" fill="none" opacity=".7" filter="url(#tc-soft1)"/>
    <path d="M-8 82 Q150 48 308 28" stroke="#2c5548" stroke-width="0.8" fill="none" opacity=".5" filter="url(#tc-soft1)"/>
    <circle cx="150" cy="92" r="52" fill="url(#tc-cabhalo)"/>
    <g>
      <path d="M150 56 L150 70" stroke="#1a3d33" stroke-width="3"/>
      <path d="M141 61 L159 61 L150 53 Z" fill="#1a3d33"/>
      <path d="M122 70 Q122 67 127 67 L173 67 Q178 67 178 70 L176 108 Q176 116 166 117.5 Q150 120 134 117.5 Q124 116 124 108 Z" fill="url(#tc-cabg)"/>
      <path d="M122 70 Q122 67 127 67 L173 67 Q178 67 178 70" fill="none" stroke="#5aa88e" stroke-width="1.2" opacity=".75" filter="url(#tc-soft1)"/>
      <rect x="130" y="76" width="40" height="17" rx="3.5" fill="#f2d488" opacity=".92" filter="url(#tc-soft1)"/>
      <line x1="150" y1="76" x2="150" y2="93" stroke="#0a1e18" stroke-width="1.6" opacity=".65"/>
      <line x1="130" y1="98" x2="170" y2="98" stroke="#5aa88e" stroke-width="0.8" opacity=".4"/>
      <rect x="136" y="103" width="28" height="6" rx="3" fill="#0a1a15"/>
      <ellipse cx="150" cy="126" rx="30" ry="8" fill="#f0c878" opacity=".12" filter="url(#tc-soft4)"/>
    </g>
    <g opacity=".85" filter="url(#tc-soft1)">
      <line x1="240" y1="40" x2="240" y2="49" stroke="#1a3d33" stroke-width="1.6"/>
      <path d="M229 49 Q229 47.5 232 47.5 L248 47.5 Q251 47.5 251 49 L250 66 Q250 70 245 70.5 Q240 71.5 235 70.5 Q230 70 230 66 Z" fill="#0d211b"/>
      <rect x="234" y="53" width="12" height="6" rx="2.5" fill="#f2d488" opacity=".6"/>
    </g>
    <g opacity=".6" filter="url(#tc-soft1)">
      <line x1="62" y1="70" x2="62" y2="77" stroke="#1a3d33" stroke-width="1.2"/>
      <path d="M54 77 Q54 76 56 76 L68 76 Q70 76 70 77 L69.5 90 Q69.5 93 66 93.5 Q62 94.3 58 93.5 Q54.5 93 54.5 90 Z" fill="#0c1e18"/>
      <rect x="57" y="80" width="9" height="4.5" rx="2" fill="#f2d488" opacity=".45"/>
    </g>
    <path d="M96 88 L96 136" stroke="#102a22" stroke-width="5" opacity=".95"/>
    <path d="M88 88 L104 88 L100 98 L92 98 Z" fill="#102a22"/>
    <rect width="300" height="190" fill="url(#tc-cityglow)" opacity=".22"/>
  </svg>`;

  const VEHICLES_CARDS = [
    { key:'metro',   tag:'Underground',      name:'Metro',   em:null,         badge:'Fastest',    w:476, h:357, bg:'linear-gradient(145deg,#090e1a 0%,#0d1528 45%,#060a14 100%)', accent:'rgba(80,120,220,.30)', hue:'#5078dc' },
    { key:'tram',    tag:'Street Level',     name:'Tram',    em:'way',        badge:'Electric',   w:520, h:390, bg:'linear-gradient(145deg,#0a1408 0%,#0f1e0a 45%,#070f06 100%)', accent:'rgba(80,180,80,.28)', hue:'#50b450'  },
    { key:'etusa',   tag:'City Bus',         name:'ETUSA',   em:' Bus',       badge:'Network',    w:480, h:360, bg:'linear-gradient(145deg,#181006 0%,#231808 45%,#120c04 100%)', accent:'rgba(220,160,40,.28)', hue:'#dca028' },
    { key:'privbus', tag:'Private Operator', name:'Private', em:' Bus',       badge:'Coverage',   w:446, h:335, bg:'linear-gradient(145deg,#0e1018 0%,#141620 45%,#0a0c14 100%)', accent:'rgba(160,160,200,.22)', hue:'#a0a0c8'},
    { key:'teleph',  tag:'Aerial',           name:'Télé',    em:'phérique',   badge:'Aerial',     w:400, h:300, bg:'linear-gradient(145deg,#071020 0%,#0a1830 45%,#050c18 100%)', accent:'rgba(60,160,240,.30)', hue:'#3ca0f0' },
    { key:'sntf',    tag:'Commuter Rail',    name:'SNTF',    em:' Train',     badge:'Long Range', w:520, h:390, bg:'linear-gradient(145deg,#1a0a08 0%,#281008 45%,#120606 100%)', accent:'rgba(200,60,40,.30)', hue:'#c83c28'  },
    { key:'taxi',    tag:'On Demand',        name:'Taxi',    em:null,         badge:'On Demand',  w:446, h:335, bg:'linear-gradient(145deg,#1a1008 0%,#261604 45%,#140c04 100%)', accent:'rgba(220,180,30,.30)', hue:'#dcb41e' },
    { key:null,      tag:'Maritime',         name:'Navette', em:' Maritime',  badge:'Ferry',      w:476, h:357, bg:'linear-gradient(145deg,#040e1c 0%,#061422 45%,#030a16 100%)', accent:'rgba(40,120,220,.30)', hue:'#2878dc', art: NAVETTE_ART },
    { key:null,      tag:'Gondola',          name:'Télé',    em:'cabine',     badge:'Cable Line',    w:416, h:312, bg:'linear-gradient(145deg,#071414 0%,#0a1c18 45%,#050e10 100%)', accent:'rgba(40,180,160,.26)', hue:'#28b4a0', art: TELECABINE_ART },
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
  const beatLabel = document.getElementById('v-beat-label');
  const beatSegs  = document.getElementById('v-beat-segs');

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

  const segFills = VEHICLES_CARDS.map(() => {
    const seg = document.createElement('div');
    seg.className = 'wf-seg';
    const fill = document.createElement('span');
    fill.className = 'wf-fill';
    seg.appendChild(fill);
    beatSegs.appendChild(seg);
    return fill;
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
      (innerHeight - ctBottom - 120) / MAX_CARD_H);
    vScale = Math.max(vScale, window.innerWidth <= 720 ? 0.64 : 0.55);
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
  let focusIdx = -1;
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
        centerText.style.transform = `translateY(${-40 * (1 - fade)}px)`; /* recede */
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
    if (idx !== focusIdx) {
      focusIdx = idx;
      beatLabel.textContent = `${d.name}${d.em || ''}`;
      /* The focused mode's own colour tints the one scene layer */
      if (window.TariqScene) TariqScene.setAccent('vehicles', d.hue);
    }
    const beatF = progress * n;
    segFills.forEach((f, i) => {
      f.style.transform = `scaleX(${Math.min(1, Math.max(0, beatF - i))})`;
    });

    const scx = window.innerWidth / 2;
    /* Stage center: below the headline while it shows, then the cards
       drift up to own the frame as it fades */
    /* Idle: the focused card sits fully below the shared chapter head */
    const cardHalf  = MAX_CARD_H * vScale * 0.5;
    const scyIdle   = Math.min(window.innerHeight - cardHalf - 64, ctBottom + cardHalf + 28);
    const scyActive = window.innerHeight * (window.innerWidth <= 720 ? 0.5 : 0.54);
    const scyTarget = progress > 0.1 ? scyActive : scyIdle; /* after the head has receded */
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
