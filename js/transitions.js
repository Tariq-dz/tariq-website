/* ═══════════════════════════════════════════════════════════
   SEAM TRANSITIONS — one ScrollTrigger per seam
   • Seam 1 (hero → stories): CSS gradient does the heavy lift;
     ScrollTrigger gates the hero CTA fade-out so it doesn't linger.
   • Seam 2 (stories → vehicles): pure CSS fade — same grammar as all seams.
   • Seam 3 (vehicles → cities): last vehicle card scale-out cue.
   • Seam 4 (cities → footer): footer content rises in.
═══════════════════════════════════════════════════════════ */
(function initTransitions() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[transitions] GSAP/ScrollTrigger not loaded; seam transitions disabled.');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* ── Seam 1: Hero → Stories ──
     Fade the hero CTA away as we leave the hero so it doesn't ghost into
     the stories section. The CSS gradient handles the visual crossfade. */
  const heroCta = document.getElementById('hero-cta');
  if (heroCta) {
    ScrollTrigger.create({
      trigger: '#s-hero',
      start: 'bottom 80%',
      end:   'bottom 20%',
      scrub: true,
      animation: gsap.to(heroCta, { opacity: 0, y: -20, ease: 'none' }),
    });
  }

  /* ── Seam 1 gold thread: grows downward as user scrolls through the seam ── */
  const seam1Thread = document.querySelector('.seam-hero-stories .seam-thread');
  if (seam1Thread) {
    gsap.set(seam1Thread, { scaleY: 0, transformOrigin: 'top center' });
    ScrollTrigger.create({
      trigger: '.seam-hero-stories',
      start: 'top 95%',
      end:   'bottom 10%',
      scrub: true,
      animation: gsap.to(seam1Thread, { scaleY: 1, ease: 'none' }),
    });
  }

  /* (Seam 3 center-text fade removed — the vehicles scrub owns the
     headline handoff since the rail became scroll-driven.) */

  /* ── Seam 4: Cities → Footer ──
     Footer inner rises in as the seam enters the viewport. Uses a single
     `fromTo` so the entry is smooth and reversible on scroll-up. */
  const footerInner = document.querySelector('.footer-inner');
  if (footerInner) {
    gsap.set(footerInner, { y: 48, opacity: 0 });
    ScrollTrigger.create({
      trigger: '#s-footer',
      start: 'top 92%',
      end:   'top 55%',
      scrub: true,
      animation: gsap.to(footerInner, { y: 0, opacity: 1, ease: 'none' }),
    });
  }
})();
