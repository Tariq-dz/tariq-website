// A4: with motion allowed, /terminal's "Step through a ride" is driven by scroll, in the home ride's grammar:
// the stage is sticky and each beat takes it when its top reaches 62% of the viewport (60% on one column, where the
// beats run under the full-height stage). Reduced motion keeps the click-through.
// GSAP and ScrollTrigger load on demand, only when the query matches.
const QUERY = '(prefers-reduced-motion: no-preference)';

async function start() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll<HTMLElement>('[data-sflow]').forEach((root) => {
    const beats = [...root.querySelectorAll<HTMLElement>('[data-sflow-beat]')];
    if (!beats.length) return;
    const mm = gsap.matchMedia();
    // re-runs when the layout crosses one column ↔ two (a phone rotating, a window resizing)
    mm.add({ narrow: `(max-width: 899px) and ${QUERY}`, wide: `(min-width: 900px) and ${QUERY}` }, (ctx) => {
      const activate = (i: number) => {
        beats.forEach((b, k) => b.classList.toggle('is-active', k === i));
        root.dispatchEvent(new CustomEvent('sflow:show', { detail: i }));
      };
      const line = ctx.conditions?.narrow ? '60%' : '62%';
      const triggers = beats.map((el, i) =>
        ScrollTrigger.create({ trigger: el, start: `top ${line}`, end: `bottom ${line}`, refreshPriority: -1, onToggle: (self) => { if (self.isActive) activate(i); } }),
      );
      ScrollTrigger.refresh();
      return () => { triggers.forEach((t) => t.kill()); activate(0); };
    });
  });
}

if (document.querySelector('[data-sflow-beat]')) {
  const mq = window.matchMedia(QUERY);
  if (mq.matches) start();
  else mq.addEventListener('change', (e) => { if (e.matches) start(); }, { once: true });
}

export {};
