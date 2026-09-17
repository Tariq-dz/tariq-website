// Drives the ride sequence's sticky stage. Only runs where the staged layout is shown (see RideSequence.astro).
// GSAP is loaded on demand, only when the query below matches, so phones and reduced-motion visitors never download it.
const QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

// after the tap the terminal returns to idle for the next rider; the printed ticket stays out
const SCREEN_FOR: Record<string, string> = { plan: 'idle', dest: 'dest', tap: 'tap', ok: 'ok', record: 'idle', operator: 'idle' };
const PRINTED = new Set(['ok', 'record', 'operator']);

async function start() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll<HTMLElement>('[data-ride]').forEach((root) => {
  const stage = root.querySelector<HTMLElement>('[data-ride-stage]');
  const steps = [...root.querySelectorAll<HTMLElement>('[data-step]')];
  const rail = root.querySelector<HTMLElement>('[data-ride-rail]');
  if (!stage || !steps.length) return;
  const face = stage.querySelector<HTMLElement>('.tface');
  const video = stage.querySelector<HTMLVideoElement>('video');
  const mm = gsap.matchMedia();

  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    let current = '';
    let stageVisible = false;

    const setState = (id: string) => {
      if (id === current) return;
      current = id;
      stage.dataset.state = id;
      steps.forEach((s) => s.classList.toggle('is-active', s.dataset.step === id));
      face?.querySelectorAll<HTMLElement>('[data-screen]').forEach((img) => img.classList.toggle('is-active', img.dataset.screen === SCREEN_FOR[id]));
      face?.classList.toggle('is-printed', PRINTED.has(id));
      syncVideo();
    };
    const syncVideo = () => {
      if (!video) return;
      if (current === 'plan' && stageVisible) video.play().catch(() => {});
      else video.pause();
    };

    setState('plan');

    const triggers = steps.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        // a step takes the stage a little before its title reaches the centre, so step 6 gets a full beat before the stage unsticks
        start: 'top 62%',
        end: 'bottom 62%',
        onToggle: (self) => { if (self.isActive) setState(el.dataset.step!); },
      }),
    );
    const visibility = ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => { stageVisible = self.isActive; syncVideo(); },
    });
    // When the layout's bottom reaches the stage's bottom, the sticky stage starts scrolling away.
    const leaving = ScrollTrigger.create({
      trigger: root.querySelector('.ride__layout'),
      start: () => `bottom top+=${parseFloat(getComputedStyle(stage).top) + stage.offsetHeight + 40}`,
      onEnter: () => stage.classList.add('is-leaving'),
      onLeaveBack: () => stage.classList.remove('is-leaving'),
      invalidateOnRefresh: true,
    });
    const railTween = rail
      ? gsap.fromTo(rail, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: root.querySelector('.ride__steps'), start: 'top center', end: 'bottom center', scrub: true } })
      : null;

    return () => {
      triggers.forEach((t) => t.kill());
      visibility.kill();
      leaving.kill();
      stage.classList.remove('is-leaving');
      railTween?.scrollTrigger?.kill();
      railTween?.kill();
      video?.pause();
      steps.forEach((s) => s.classList.remove('is-active'));
    };
  });
});
}

if (document.querySelector('[data-ride]')) {
  const mq = window.matchMedia(QUERY);
  if (mq.matches) start();
  else mq.addEventListener('change', (e) => { if (e.matches) start(); }, { once: true });
}

export {};
