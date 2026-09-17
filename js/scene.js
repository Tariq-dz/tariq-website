/* ═══════════════════════════════════════════════════════════
   SCENE — the one continuous backdrop + chapter controller
   (DESIGN_DIRECTION.md). Loaded before the section scripts so they can
   call TariqScene.setAccent(); mounts its ScrollTriggers on
   DOMContentLoaded, AFTER every section has created its own pinned
   stage, so trigger positions include all pin spacing.

   Motion grammar owned here:
     • chapter light/tint/accent crossfade: --dur-scene, sine.inOut
     • rise: chapter heads + [data-reveal="rise"], expo.out, once
     • drift: stars parallax across the whole document, scrub
═══════════════════════════════════════════════════════════ */
(function initScene() {
  const scene = document.getElementById('scene');
  if (!scene) return;

  const REDUCED  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const HAS_GSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  const GOLD     = '#c8a060';

  /* Timing mirrors the tokens in css/tokens.css */
  const DUR_SCENE  = 1.2;   /* --dur-scene */
  const DUR_REVEAL = 1.1;   /* --dur-reveal */
  const STAGGER    = 0.12;  /* --stagger-reveal */

  const layer = {
    stars:   scene.querySelector('.scene-stars'),
    tint:    scene.querySelector('.scene-tint'),
    horizon: scene.querySelector('.scene-horizon'),
    rings:   scene.querySelector('.scene-rings'),
    dust:    scene.querySelector('.scene-dust'),
  };

  /* ── Chapter registry, read from markup ── */
  const chapters = {};
  const order = [];
  document.querySelectorAll('[data-chapter]').forEach((el) => {
    const id = el.dataset.chapter;
    chapters[id] = {
      el,
      light:  parseFloat(el.dataset.light) || 0,
      tint:   parseFloat(el.dataset.tint)  || 0,
      accent: el.dataset.accent || GOLD,
    };
    el.style.setProperty('--chapter-accent', chapters[id].accent);
    order.push(id);
  });
  let active = null;

  /* ── Paint the scene for a chapter ── */
  function paint(ch, instant) {
    const duration = instant || REDUCED ? 0 : DUR_SCENE;
    if (!HAS_GSAP) {
      layer.tint.style.opacity = ch.tint;
      layer.tint.style.setProperty('--scene-accent', ch.accent);
      layer.horizon.style.opacity = ch.light;
      layer.horizon.style.transform = `translateY(${(1 - ch.light) * 22}%)`;
      layer.rings.style.opacity = 0.3 + 0.7 * ch.light;
      return;
    }
    const base = { duration, ease: 'sine.inOut', overwrite: 'auto' };
    gsap.to(layer.tint,    { ...base, opacity: ch.tint, '--scene-accent': ch.accent });
    gsap.to(layer.horizon, { ...base, opacity: ch.light, yPercent: (1 - ch.light) * 22 });
    gsap.to(layer.rings,   { ...base, opacity: 0.3 + 0.7 * ch.light });
  }

  function activate(id) {
    if (active === id || !chapters[id]) return;
    active = id;
    paint(chapters[id]);
  }

  /* ── Public API: a chapter re-points its accent (rider switch, focused mode) ── */
  window.TariqScene = {
    setAccent(id, hex) {
      const ch = chapters[id];
      if (!ch || !hex || ch.accent === hex) return;
      ch.accent = hex;
      ch.el.style.setProperty('--chapter-accent', hex);
      if (active !== id) return;
      if (!HAS_GSAP || REDUCED) {
        layer.tint.style.setProperty('--scene-accent', hex);
        return;
      }
      gsap.to(layer.tint, {
        '--scene-accent': hex,
        duration: DUR_SCENE * 0.8, ease: 'sine.inOut', overwrite: 'auto',
      });
    },
  };

  /* ── Atmosphere: slow gold motes for the whole ride ── */
  if (!REDUCED && layer.dust) {
    const count = window.innerWidth <= 720 ? 14 : 24;
    for (let i = 0; i < count; i++) {
      const d = document.createElement('span');
      const s = (Math.random() * 1.8 + 1.2).toFixed(1);
      d.style.cssText =
        `left:${(Math.random() * 100).toFixed(1)}%;` +
        `top:${(55 + Math.random() * 45).toFixed(1)}%;` +
        `width:${s}px;height:${s}px;` +
        `animation-duration:${(16 + Math.random() * 20).toFixed(1)}s;` +
        `animation-delay:${(-Math.random() * 36).toFixed(1)}s;`;
      layer.dust.appendChild(d);
    }
  }

  /* ── Mount: after every section script has run ── */
  function mount() {
    if (!order.length) return;
    paint(chapters[order[0]], true);
    active = order[0];
    if (!HAS_GSAP) return;
    gsap.registerPlugin(ScrollTrigger);

    /* One chapter trigger each: the chapter owns the scene while it crosses
       the 55% line. Leaving never resets; the next chapter takes over. */
    order.forEach((id) => {
      const el = chapters[id].el;
      const spacer = el.parentElement && el.parentElement.classList.contains('pin-spacer')
        ? el.parentElement : el;
      ScrollTrigger.create({
        trigger: spacer,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter: () => activate(id),
        onEnterBack: () => activate(id),
      });
    });

    /* Drift: the sky moves slower than the ride, and the hairline follows progress */
    const hairline = document.getElementById('scroll-hairline');
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (hairline) hairline.style.transform = `scaleX(${self.progress.toFixed(4)})`;
      },
    });
    if (!REDUCED) {
      gsap.to(layer.stars, {
        y: () => -window.innerHeight * 0.4,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.6, invalidateOnRefresh: true },
      });
    }

    /* Rise: the one entrance for every chapter head and marked block */
    if (!REDUCED) {
      gsap.utils.toArray('.chapter-head, [data-reveal="rise"]').forEach((head) => {
        gsap.from(head.children, {
          y: 32,
          autoAlpha: 0,
          duration: DUR_REVEAL,
          stagger: STAGGER,
          ease: 'expo.out',
          scrollTrigger: { trigger: head, start: 'top 88%', once: true },
        });
      });
    }

    ScrollTrigger.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
