// The Tariq AI section on /app. The phone plays the recording straight through and the section behind it
// becomes whatever place is on the phone.
//
// The video's own clock is the only source of truth (founder, 2026-09-17). The ground, the line and the credit
// are all read from `currentTime`, so the place filling the section cannot drift from the place on the phone —
// there is nothing to keep in sync, only one number to read. No scroll coupling, no GSAP.
//
// `timeupdate` is deliberately not used to drive the switch: it fires about four times a second, which would let
// the background lag the phone by up to 250 ms. A rAF loop while playing costs nothing and lands on the frame.

type Beat = { at: number; ground: string | null; el: HTMLElement };

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');

function setup(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-aim-stage]');
  const video = root.querySelector<HTMLVideoElement>('.aim__phone video');
  const toggle = root.querySelector<HTMLButtonElement>('[data-aim-toggle]');
  const toggleText = root.querySelector<HTMLElement>('[data-aim-toggle-text]');
  const credit = root.querySelector<HTMLElement>('[data-aim-credit]');
  if (!stage || !video) return;

  const grounds = new Map<string, HTMLElement>();
  root.querySelectorAll<HTMLElement>('[data-ground]').forEach((g) => grounds.set(g.dataset.ground!, g));

  const beats: Beat[] = [...root.querySelectorAll<HTMLElement>('[data-line]')].map((el) => ({
    at: parseFloat(el.dataset.at || '0'),
    ground: null,
    el,
  }));
  if (!beats.length) return;

  // the ground for each beat is whichever photo the markup declares, matched by order of appearance
  const groundOrder = ['plain', 'plain', 'jardin', 'martyrs', 'plain', 'casbah', 'plain'];
  beats.forEach((b, i) => { b.ground = groundOrder[i] ?? 'plain'; });

  let shown = -1;
  const show = (i: number) => {
    if (i === shown || i < 0 || i >= beats.length) return;
    shown = i;
    beats.forEach((b, n) => b.el.classList.toggle('is-on', n === i));
    const want = beats[i].ground || 'plain';
    grounds.forEach((el, id) => el.classList.toggle('is-on', id === want));
    // the credit names two photographers; with no photograph on screen it credits nothing
    credit?.classList.toggle('is-on', want !== 'plain');
  };

  const beatAt = (t: number) => {
    let i = 0;
    for (let n = 0; n < beats.length; n++) if (t >= beats[n].at - 0.001) i = n;
    return i;
  };

  let raf = 0;
  const tick = () => {
    show(beatAt(video.currentTime));
    raf = video.paused || video.ended ? 0 : requestAnimationFrame(tick);
  };
  const startLoop = () => { if (!raf) raf = requestAnimationFrame(tick); };
  const stopLoop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; };

  show(0);

  /* ---------- the control. The clip runs 26 s, well past the 5-second WCAG 2.2.2 exemption the site's other
     clips rely on, so it gets a real pause control rather than none. ---------- */
  const setLabel = () => {
    if (!toggle || !toggleText) return;
    const ended = video.ended;
    const label = ended ? 'Replay' : video.paused ? 'Play' : 'Pause';
    toggleText.textContent = label;
    toggle.setAttribute('aria-label', `${label} the Tariq AI walkthrough`);
  };
  toggle?.addEventListener('click', () => {
    if (video.ended) { video.currentTime = 0; void video.play().catch(() => {}); }
    else if (video.paused) void video.play().catch(() => {});
    else video.pause();
  });
  video.addEventListener('play', () => { startLoop(); setLabel(); });
  video.addEventListener('pause', () => { stopLoop(); setLabel(); });
  video.addEventListener('ended', () => { stopLoop(); setLabel(); });
  video.addEventListener('seeked', () => show(beatAt(video.currentTime)));
  setLabel();

  /* ---------- start it when the section is actually being looked at, once ---------- */
  if (REDUCED.matches || !('IntersectionObserver' in window)) return; // poster stands, the control offers Play
  let played = false;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !played) {
          played = true;
          void video.play().catch(() => { /* blocked autoplay just leaves the poster and a Play button */ });
        } else if (!e.isIntersecting && !video.paused) {
          video.pause();
        }
      }
    },
    { threshold: 0.4 },
  );
  // observe once the page is quiet, so the clip never competes with the page's own first paint (D-33)
  const begin = () => io.observe(stage);
  if (document.readyState === 'complete') idle(begin);
  else window.addEventListener('load', () => idle(begin), { once: true });
}

function idle(fn: () => void) {
  if ('requestIdleCallback' in window) (window as any).requestIdleCallback(fn, { timeout: 1500 });
  else setTimeout(fn, 300);
}

document.querySelectorAll<HTMLElement>('[data-aim]').forEach(setup);

export {};
