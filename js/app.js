/* Section 4 — THE APP: sticky chapter stage + waitlist form */
(function initApp() {
  const CHAPTER_LABELS = ['Home', 'Plan', 'Ride', 'Pay', 'Top up'];

  /* ── Waitlist form (works regardless of GSAP/motion) ── */
  const form = document.getElementById('waitlist-form');
  if (form) {
    const band  = document.getElementById('app-waitlist');
    const email = document.getElementById('waitlist-email');
    const err   = document.getElementById('waitlist-error');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        err.textContent = 'That doesn’t look like an email — mind checking it?';
        email.focus();
        return;
      }
      err.textContent = '';
      /* TODO(backend): POST { email: v } to the waitlist endpoint when it exists.
         Until then we only confirm locally — no data leaves the page. */
      band.classList.add('done');
    });
  }

  /* ── Sticky chapter stage (desktop, motion allowed) ── */
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow  = window.matchMedia('(max-width: 900px)').matches;
  if (reduced || narrow) return;              /* CSS static flow handles these */
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    /* No GSAP: leave chapter 1 visible as a static hero shot */
    const first = document.querySelector('.app-chapter');
    if (first) first.style.opacity = 1;
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  const wrapper  = document.getElementById('app-wrapper');
  const intro    = document.getElementById('app-intro');
  const chapters = Array.from(document.querySelectorAll('.app-chapter'));
  const prog     = document.getElementById('app-prog');
  const progLbl  = document.getElementById('app-prog-label');
  const segsWrap = document.getElementById('app-prog-segs');
  const ghostL   = document.getElementById('app-ghost-l');
  const ghostR   = document.getElementById('app-ghost-r');

  const segFills = CHAPTER_LABELS.map(() => {
    const seg = document.createElement('div');
    seg.className = 'app-seg';
    const fill = document.createElement('span');
    fill.className = 'app-seg-fill';
    seg.appendChild(fill);
    segsWrap.appendChild(seg);
    return fill;
  });

  const n = chapters.length;                   /* 5 */
  const INTRO_END = 0.12;                      /* intro owns the first 12% */
  const span = (1 - INTRO_END) / n;            /* scroll share per chapter */
  const FADE = 0.22;                           /* fraction of a span spent fading */

  /* Scroll offset (px past wrapper top) for a 0–1 stage fraction */
  const off = (f) => f * (wrapper.offsetHeight - innerHeight);

  /* Intro: visible on arrival, dissolves as chapter 1 rises */
  gsap.fromTo(intro, { opacity: 1 }, {
    opacity: 0, y: -40, ease: 'none',
    scrollTrigger: {
      trigger: wrapper,
      start: 'top top',
      end: () => `top+=${off(INTRO_END)} top`,
      scrub: true,
    },
  });

  /* Ghost phones: slow counter-drift through the whole stage */
  [[ghostL, 60], [ghostR, -70]].forEach(([el, dy]) => {
    gsap.to(el, {
      y: dy, ease: 'none',
      scrollTrigger: { trigger: wrapper, start: 'top top', end: 'bottom bottom', scrub: true },
    });
  });

  /* Chapters: enter / hold / exit, scrub-linked */
  chapters.forEach((ch, i) => {
    const phone = ch.querySelector('.phone');
    const text  = ch.querySelector('.app-chapter-text');
    const flip  = ch.classList.contains('flip');
    const a = INTRO_END + i * span;            /* chapter start (progress 0–1) */
    const enterEnd = a + span * FADE;
    const exitBeg  = a + span * (1 - FADE);
    const last = i === n - 1;

    const seg = (from, to) => ({
      trigger: wrapper,
      start: () => `top+=${off(from)} top`,
      end:   () => `top+=${off(to)} top`,
      scrub: true,
    });

    /* enter */
    gsap.fromTo(ch, { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: seg(a, enterEnd) });
    gsap.fromTo(phone,
      { y: 90, rotateY: flip ? 14 : -14, scale: .94 },
      { y: 0, rotateY: 0, scale: 1, ease: 'none', scrollTrigger: seg(a, enterEnd) });
    gsap.fromTo(text,
      { y: 46, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none', scrollTrigger: seg(a + span * 0.06, enterEnd + span * 0.06) });

    /* exit (the last chapter stays for the handoff to the waitlist) */
    if (!last) {
      gsap.fromTo(ch, { opacity: 1 }, {
        opacity: 0, ease: 'none',
        scrollTrigger: seg(exitBeg, a + span),
        immediateRender: false,
      });
      gsap.fromTo(phone, { y: 0 }, {
        y: -70, ease: 'none',
        scrollTrigger: seg(exitBeg, a + span),
        immediateRender: false,
      });
    }
  });

  /* Progress label + segment fills */
  ScrollTrigger.create({
    trigger: wrapper,
    start: () => `top+=${off(INTRO_END)} top`,
    end: 'bottom bottom',
    onToggle: (self) => prog.classList.toggle('on', self.isActive),
    onUpdate: (self) => {
      const local = self.progress;
      const idx = Math.min(n - 1, Math.floor(local * n));
      progLbl.textContent = `0${idx + 1} — ${CHAPTER_LABELS[idx]}`;
      segFills.forEach((f, i) => {
        const t = Math.min(1, Math.max(0, local * n - i));
        f.style.transform = `scaleX(${t})`;
      });
    },
  });
})();
