// Pinned, scrubbed crossfade through the terminal's angles with the film's approved lines.
// GSAP is loaded on demand, only when the query below matches, so phones and reduced-motion visitors never download it.
const QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

async function start() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll<HTMLElement>('[data-treveal]').forEach((root) => {
  const pin = root.querySelector<HTMLElement>('[data-treveal-pin]');
  const frames = gsap.utils.toArray<HTMLElement>('[data-frame]', root);
  const lines = gsap.utils.toArray<HTMLElement>('[data-line]', root);
  if (!pin || frames.length < 2) return;

  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 68;
    gsap.set(frames, { xPercent: -50, yPercent: -50, x: 0, y: 0 });
    gsap.set(frames.slice(1), { opacity: 0, scale: 1.04 });
    gsap.set(lines.slice(1), { opacity: 0, y: 28 });

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: pin,
        start: `top ${header}px`,
        end: () => `+=${(frames.length - 1) * window.innerHeight * 0.85}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });

    tl.addLabel('a0').to({}, { duration: 0.35 });
    for (let i = 1; i < frames.length; i++) {
      tl.to(lines[i - 1], { opacity: 0, y: -28, duration: 0.45 })
        .to(frames[i - 1], { opacity: 0, scale: 0.97, duration: 0.7 }, '<')
        .to(frames[i], { opacity: 1, scale: 1, duration: 0.7 }, '<0.15')
        .to(lines[i], { opacity: 1, y: 0, duration: 0.45 }, '<0.25')
        .addLabel(`a${i}`)
        .to({}, { duration: 0.35 });
    }

    return () => {
      gsap.set([...frames, ...lines], { clearProps: 'all' });
    };
  });
});
}

if (document.querySelector('[data-treveal]')) {
  const mq = window.matchMedia(QUERY);
  if (mq.matches) start();
  else mq.addEventListener('change', (e) => { if (e.matches) start(); }, { once: true });
}

export {};
