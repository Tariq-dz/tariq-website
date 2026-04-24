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
    { key:null,      tag:'Gondola',          name:'Télé',    em:'cabine',     badge:'Gondola',    w:416, h:312, bg:'linear-gradient(145deg,#071414 0%,#0a1c18 45%,#050e10 100%)', accent:'rgba(40,180,160,.26)' },
  ];

  const stage = document.getElementById('v-stage');
  const stripName  = document.getElementById('v-strip-name');
  const stripCount = document.getElementById('v-strip-count');
  const progFill   = document.getElementById('v-prog-fill');

  const vCardEls = VEHICLES_CARDS.map((d) => {
    const el = document.createElement('div');
    el.className = 'vcard';
    el.style.width      = d.w + 'px';
    el.style.height     = d.h + 'px';
    el.style.background = d.bg;

    const glow = document.createElement('div');
    glow.style.cssText = `position:absolute;top:0;left:0;right:0;height:55%;background:radial-gradient(ellipse 80% 120% at 50% 0%,${d.accent},transparent 80%);pointer-events:none;z-index:0;`;
    el.appendChild(glow);

    const ph = document.createElement('div');
    ph.className = 'vc-placeholder';
    ph.textContent = d.tag === 'Maritime' ? '⛴' : d.tag === 'Gondola' ? '🚠' : d.tag === 'Underground' ? '🚇' : d.tag === 'Street Level' ? '🚊' : d.tag === 'Aerial' ? '🚡' : d.tag === 'Commuter Rail' ? '🚆' : d.tag === 'On Demand' ? '🚕' : '🚌';
    el.appendChild(ph);

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

  function getDiag() { return ((vmx - 0.5) * 2 - (vmy - 0.5) * 2) / 2; }
  function getTilt() { return (vmx - 0.5) + (vmy - 0.5); }
  function scaleFn(d) { return Math.exp(-d * d * 2.2); }
  function alphaFn(d) { return Math.max(0, 1 - Math.abs(d) * 1.1); }
  function lerp(a,b,t) { return a + (b-a)*t; }
  function vclamp(v) { return Math.min(1, Math.max(0, v)); }

  let vehiclesActive = false;
  const section = document.getElementById('s-vehicles');
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
    if (!vehiclesActive || e.pointerType === 'mouse') return;
    fingerDown = true; coastVel = 0;
    vmx = e.clientX / window.innerWidth; vmy = e.clientY / window.innerHeight;
    prevDiag = getDiag();
  });
  section.addEventListener('pointerup', e => {
    if (!vehiclesActive || e.pointerType === 'mouse') return;
    coastVel = getDiag() - prevDiag; fingerDown = false;
  });
  section.addEventListener('pointercancel', e => {
    if (e.pointerType !== 'mouse') { coastVel = 0; fingerDown = false; }
  });

  function vRender() {
    requestAnimationFrame(vRender);
    if (!vehiclesActive) return;

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
    progress = lerp(progress, progTarget, fingerDown ? 0.18 : 0.07);
    tiltSmooth = lerp(tiltSmooth, getTilt(), 0.09);

    const focus = progress * (n - 1);
    const idx = Math.max(0, Math.min(n-1, Math.round(focus)));
    const d = VEHICLES_CARDS[idx];
    stripName.textContent = d.name + (d.em || '');
    stripCount.textContent = `${String(idx+1).padStart(2,'0')} / ${String(n).padStart(2,'0')}`;
    progFill.style.width = (progress * 100) + '%';

    const scx = window.innerWidth / 2;
    const scy = window.innerHeight * 0.65;
    const sx = window.innerWidth * 0.36;
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
