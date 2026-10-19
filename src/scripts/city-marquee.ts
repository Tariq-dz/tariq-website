// Cities marquee (adapted from the founder's reference). Drifts whenever motion is allowed, on touch too. The pointer steers it like the
// reference: a centre zone holds the strip still so a card can be picked, and the closer the pointer gets to either edge, the faster the strip
// runs that way (up to MAX_SPEED); crossing to the other side reverses it smoothly. It also stops for keyboard focus, an open sign-up panel
// and when off-screen. On touch a finger drags the strip and flings it, then the drift picks up again; an opened card holds it still.
// Reduced motion keeps the native swipe strip.
// Cloned cards (the loop) are live copies: hovering or clicking one acts on its city exactly like the original, but clones stay out of the
// accessibility tree and the tab order (aria-hidden, tabindex -1). The card's action ("Join the waitlist", "Notify me" or "Stay tuned",
// or a click anywhere on a card; a first tap on touch opens the card) opens the panel for that city, tinted with its accent.
type Scene = { id: string; en: string; accent: string; title: string };

const DRIFT_QUERY = '(prefers-reduced-motion: no-preference)';
const IDLE_SPEED = 0.55; // px per 60 Hz frame while the pointer is away from the strip
const MAX_SPEED = 7;     // px per 60 Hz frame with the pointer at the very edge
const DEAD_ZONE = 0.22;  // share of the half-width around the centre that holds the strip still

function init(root: HTMLElement) {
  const viewport = root.querySelector<HTMLElement>('[data-cmq-viewport]');
  const track = root.querySelector<HTMLElement>('[data-cmq-track]');
  const panel = root.querySelector<HTMLElement>('[data-cmq-panel]');
  if (!viewport || !track) return;
  const scenes = JSON.parse(root.querySelector('[data-cmq-data]')?.textContent || '[]') as Scene[];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = window.matchMedia('(hover: none), (pointer: coarse)');

  const state = { focused: false, panelOpen: false, visible: true, dragging: false };
  let lastTrigger: HTMLElement | null = null;
  let onStateChange = () => {};

  // the original card's action for a city (a clone's action hands focus back to its original)
  const originalJoin = (cityId: string) =>
    track.querySelector<HTMLElement>(`.cmq__item:not([aria-hidden]) [data-ccard][data-city="${cityId}"] [data-ccard-join]`);

  // ---------- sign-up panel ----------
  const openPanel = (cityId: string, trigger: HTMLElement | null) => {
    const s = scenes.find((x) => x.id === cityId);
    if (!panel || !s) return;
    lastTrigger = trigger;
    const form = panel.querySelector<HTMLFormElement>('form[data-lead-form]');
    const status = panel.querySelector<HTMLElement>('[data-form-status]');
    if (form && status && form.hidden) {
      // a new city after a finished sign-up starts a fresh form
      form.hidden = false;
      status.hidden = true;
      form.reset();
      const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (submit) { submit.disabled = false; if (submit.dataset.label) submit.textContent = submit.dataset.label; }
    }
    panel.dataset.city = s.id;
    panel.style.setProperty('--panel-tint', s.accent);
    panel.querySelectorAll<HTMLElement>('[data-pass]').forEach((p) => { p.hidden = p.dataset.pass !== s.id; });
    panel.querySelectorAll('[data-cmq-title]').forEach((n) => { n.textContent = s.title; });
    panel.querySelectorAll('[data-cmq-city]').forEach((n) => { n.textContent = s.en; });
    const input = panel.querySelector<HTMLInputElement>('[data-city-input]');
    if (input) input.value = s.en;
    panel.hidden = false;
    state.panelOpen = true;
    panel.scrollIntoView({ block: 'nearest', behavior: reduce.matches ? 'auto' : 'smooth' });
    (panel.querySelector<HTMLInputElement>('input[type="email"]') || panel.querySelector<HTMLElement>('[tabindex="-1"]'))?.focus({ preventScroll: true });
    onStateChange();
  };
  // keyboard closes (Escape, or Enter/Space on a close button) return focus to the card's action; a pointer close doesn't pull focus into the strip
  const closePanel = (returnFocus: boolean) => {
    if (!panel || panel.hidden) return;
    const active = document.activeElement as HTMLElement | null;
    panel.hidden = true;
    state.panelOpen = false;
    if (returnFocus) lastTrigger?.focus({ preventScroll: true });
    else if (active && panel.contains(active)) active.blur();
    onStateChange();
  };
  panel?.querySelectorAll('[data-cmq-close]').forEach((b) => b.addEventListener('click', (e) => closePanel((e as MouseEvent).detail === 0)));
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && state.panelOpen) closePanel(true); });

  track.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const card = target.closest<HTMLElement>('[data-ccard]');
    if (!card) return;
    const city = card.dataset.city!;
    if (coarse.matches && !card.classList.contains('is-open') && !target.closest('[data-ccard-join]')) {
      track.querySelectorAll('.ccard.is-open').forEach((c) => c.classList.remove('is-open'));
      card.classList.add('is-open');
      return;
    }
    openPanel(city, originalJoin(city) || card.querySelector<HTMLElement>('[data-ccard-join]'));
  });

  // ---------- drift (motion allowed) ----------
  if (!window.matchMedia(DRIFT_QUERY).matches) return;

  const originals = [...track.children] as HTMLElement[];
  const cloneSet = () => {
    const frag = document.createDocumentFragment();
    originals.forEach((li) => {
      const c = li.cloneNode(true) as HTMLElement;
      c.setAttribute('aria-hidden', 'true');
      c.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
      c.querySelectorAll('[aria-labelledby]').forEach((n) => n.removeAttribute('aria-labelledby'));
      c.querySelectorAll('button, a, input, [tabindex]').forEach((n) => n.setAttribute('tabindex', '-1'));
      frag.appendChild(c);
    });
    return frag;
  };
  root.classList.add('is-drifting');
  track.prepend(cloneSet());                       // one set before the originals, so a focused original can always sit in view
  let setWidth = 0;
  const measure = () => { setWidth = originals[0].offsetLeft - (track.children[0] as HTMLElement).offsetLeft; };
  measure();
  const needed = Math.max(2, Math.ceil((viewport.clientWidth + setWidth) / Math.max(setWidth, 1)));
  for (let k = 0; k < needed; k++) track.appendChild(cloneSet());

  let offset = -setWidth;
  let speed = 0;
  let target = -IDLE_SPEED;
  let running = false;
  let last = 0;
  const apply = () => { track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`; };
  apply();

  const wrap = () => {
    const before = offset;
    while (offset <= -setWidth * 2) offset += setWidth;
    while (offset > -setWidth) offset -= setWidth;
    return offset - before;
  };
  // a card opened by a first tap on touch holds the strip so it can be read
  const stopped = () => state.focused || state.panelOpen || (coarse.matches && !!track.querySelector('.ccard.is-open'));
  const tick = (now: number) => {
    if (state.dragging) { running = false; last = 0; return; }
    const dt = last ? Math.min(3, (now - last) / 16.667) : 1; // frame-rate independent
    last = now;
    const goal = stopped() ? 0 : target;
    // quick, even response in both directions; stopping is a little firmer than speeding up
    const k = 1 - Math.pow(1 - (goal === 0 ? 0.22 : 0.12), dt);
    speed += (goal - speed) * k;
    if (goal === 0 && Math.abs(speed) < 0.03) speed = 0;
    offset += speed * dt;
    if (!state.focused) wrap();
    apply();
    if (state.visible && (speed !== 0 || goal !== 0)) requestAnimationFrame(tick);
    else { running = false; last = 0; }
  };
  const kick = () => { if (!running && state.visible) { running = true; last = 0; requestAnimationFrame(tick); } };
  onStateChange = kick;

  // steering: the viewport's x-extent doesn't change with vertical scrolling, so read it on enter and on resize
  let vpLeft = 0;
  let vpWidth = 1;
  const readRect = () => { const r = viewport.getBoundingClientRect(); vpLeft = r.left; vpWidth = r.width || 1; };
  readRect();
  const steer = (clientX: number) => {
    const norm = Math.max(-1, Math.min(1, (clientX - vpLeft - vpWidth / 2) / (vpWidth / 2)));
    const a = Math.abs(norm);
    if (a < DEAD_ZONE) target = 0;
    else {
      const t = (a - DEAD_ZONE) / (1 - DEAD_ZONE);
      // pointer right → cards run left (bring in what's to the right); pointer left → cards run right
      target = -Math.sign(norm) * (IDLE_SPEED + (MAX_SPEED - IDLE_SPEED) * t * t);
    }
    kick();
  };
  viewport.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { readRect(); steer(e.clientX); } });
  viewport.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') steer(e.clientX); });
  viewport.addEventListener('pointerleave', (e) => {
    if (e.pointerType !== 'mouse') return;
    target = speed > 0.05 ? IDLE_SPEED : -IDLE_SPEED; // keep drifting the way it was last steered
    kick();
  });

  // touch: the finger moves the strip; vertical swipes stay with the page (touch-action: pan-y)
  let startX = 0, startY = 0, startOffset = 0, lastX = 0, lastT = 0, fling = 0, suppressClick = false;
  let pointerId = -1;
  viewport.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    pointerId = e.pointerId;
    startX = lastX = e.clientX;
    startY = e.clientY;
    startOffset = offset;
    lastT = e.timeStamp;
    fling = 0;
  });
  viewport.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'mouse' || e.pointerId !== pointerId) return;
    const dx = e.clientX - startX;
    if (!state.dragging) {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(e.clientY - startY)) return;
      state.dragging = true;
      speed = 0;
      startOffset = offset - dx;
      track.querySelectorAll('.ccard.is-open').forEach((c) => c.classList.remove('is-open'));
      viewport.setPointerCapture(e.pointerId);
    }
    offset = startOffset + dx;
    startOffset += wrap();
    apply();
    const dt = Math.max(1, e.timeStamp - lastT);
    fling = fling * 0.4 + ((e.clientX - lastX) / dt) * 16.667 * 0.6; // px per 60 Hz frame, smoothed
    lastX = e.clientX;
    lastT = e.timeStamp;
  });
  const release = (e: PointerEvent) => {
    if (e.pointerId !== pointerId) return;
    pointerId = -1;
    if (!state.dragging) return;
    state.dragging = false;
    suppressClick = true;
    window.setTimeout(() => { suppressClick = false; }, 0);
    // a stale finger (held still before lifting) doesn't fling
    if (e.timeStamp - lastT > 80) fling = 0;
    speed = Math.max(-40, Math.min(40, fling));
    target = speed > 0.05 ? IDLE_SPEED : -IDLE_SPEED;
    kick();
  };
  viewport.addEventListener('pointerup', release);
  viewport.addEventListener('pointercancel', release);
  // a tap outside the strip closes an opened card and lets the drift resume
  document.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' || viewport.contains(e.target as Node)) return;
    const open = track.querySelectorAll('.ccard.is-open');
    if (!open.length) return;
    open.forEach((c) => c.classList.remove('is-open'));
    kick();
  });
  // the click that ends a drag doesn't open a card
  viewport.addEventListener('click', (e) => { if (suppressClick) { e.preventDefault(); e.stopPropagation(); suppressClick = false; } }, true);

  // keyboard: stop, and bring the focused original fully into view
  track.addEventListener('focusin', (e) => {
    state.focused = true;
    const item = (e.target as HTMLElement).closest<HTMLElement>('.cmq__item');
    if (item && !item.hasAttribute('aria-hidden')) {
      const left = offset + item.offsetLeft;
      if (left < 16 || left + item.offsetWidth > viewport.clientWidth - 16) {
        offset = Math.min(0, 64 - item.offsetLeft);
        speed = 0;
        apply();
      }
    }
  });
  track.addEventListener('focusout', (e) => {
    if (!track.contains(e.relatedTarget as Node)) { state.focused = false; kick(); }
  });

  const io = new IntersectionObserver((entries) => {
    state.visible = entries.some((en) => en.isIntersecting) && !document.hidden;
    kick();
  });
  io.observe(root);
  document.addEventListener('visibilitychange', () => { state.visible = !document.hidden; kick(); });

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => { measure(); readRect(); offset = -setWidth; apply(); }, 200);
  });

  kick();
}

document.querySelectorAll<HTMLElement>('[data-cmq]').forEach(init);

export {};
