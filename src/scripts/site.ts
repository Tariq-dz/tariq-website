// Site-wide behaviour: menu, the one reveal pattern, clip playback, the film lightbox, forms.
import { FORM_ENDPOINT } from '../config';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- mobile menu ---------- */
const menuBtn = document.querySelector<HTMLButtonElement>('[data-menu-btn]');
const nav = document.querySelector<HTMLElement>('[data-nav]');
if (menuBtn && nav) {
  const setOpen = (open: boolean) => {
    menuBtn.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };
  menuBtn.addEventListener('click', () => setOpen(menuBtn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); menuBtn.focus(); }
  });
  nav.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) setOpen(false); });
}

/* ---------- reveal: opacity + 16px rise, once; items entering together are staggered 60 ms ---------- */
const revealables = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (!reduced.matches && 'IntersectionObserver' in window) {
  const ro = new IntersectionObserver(
    (entries) => {
      let i = 0;
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        el.style.setProperty('--reveal-delay', `${Math.min(i++, 6) * 0.06}s`);
        el.classList.add('is-in');
        ro.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -6% 0px' },
  );
  revealables.forEach((el) => ro.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('is-in'));
}

/* ---------- clips: each plays once (≤ 5 s) when it scrolls into view, and again only after leaving and returning ---------- */
/* WCAG 2.2.2: automatically started motion lasting no more than 5 seconds needs no pause control. Never with reduced motion. */
const clips = document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]');
if (clips.length && !reduced.matches && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        const v = target as HTMLVideoElement;
        if (isIntersecting) {
          if (v.dataset.played) continue;
          v.dataset.played = '1';
          if (v.currentTime > 0) v.currentTime = 0;
          v.play().catch(() => {});
        } else {
          v.pause();
          delete v.dataset.played;
        }
      }
    },
    { threshold: 0.35 },
  );
  // Start observing only after the page has loaded and gone idle, so a clip that is already in view (the hero phone on
  // mobile) never downloads its video while the hero image, the LCP element, is still being rendered.
  const startClips = () => clips.forEach((v) => io.observe(v));
  const whenIdle = () => ('requestIdleCallback' in window ? requestIdleCallback(startClips, { timeout: 1500 }) : setTimeout(startClips, 300));
  if (document.readyState === 'complete') whenIdle();
  else window.addEventListener('load', whenIdle, { once: true });
  reduced.addEventListener('change', (e) => { if (e.matches) clips.forEach((v) => { io.unobserve(v); v.pause(); }); });
}

/* ---------- lightbox (native <dialog>) ---------- */
document.querySelectorAll<HTMLElement>('[data-lightbox-open]').forEach((btn) => {
  const dialog = document.getElementById(btn.dataset.lightboxOpen!) as HTMLDialogElement | null;
  if (!dialog) return;
  const video = dialog.querySelector('video');
  btn.addEventListener('click', () => {
    if (video && !video.getAttribute('poster') && video.dataset.poster) video.setAttribute('poster', video.dataset.poster);
    if (video && !video.getAttribute('src') && video.dataset.src) video.setAttribute('src', video.dataset.src);
    dialog.showModal();
    video?.play().catch(() => {});
  });
  dialog.addEventListener('close', () => { video?.pause(); btn.focus(); });
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  dialog.querySelector('[data-lightbox-close]')?.addEventListener('click', () => dialog.close());
});

/* ---------- forms ---------- */
document.querySelectorAll<HTMLFormElement>('form[data-lead-form]').forEach((form) => {
  const status = form.parentElement!.querySelector<HTMLElement>('[data-form-status]')!;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;

  const showError = (field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
    const err = form.querySelector<HTMLElement>(`[data-error-for="${field.name}"]`);
    if (!err) return;
    let msg = '';
    if (field.validity.valueMissing) msg = field.dataset.required || 'Please fill this in.';
    else if (field.validity.typeMismatch) msg = 'Enter an email address like name@domain.dz.';
    err.textContent = msg;
    field.setAttribute('aria-invalid', msg ? 'true' : 'false');
  };
  form.querySelectorAll<HTMLInputElement>('input, textarea, select').forEach((f) => {
    f.addEventListener('blur', () => { if (f.value) showError(f); });
    f.addEventListener('input', () => { if (f.getAttribute('aria-invalid') === 'true') showError(f); });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll<HTMLInputElement>('input, textarea, select')];
    fields.forEach(showError);
    const firstBad = fields.find((f) => !f.checkValidity());
    if (firstBad) { firstBad.focus(); return; }

    const data = Object.fromEntries(new FormData(form).entries());
    submit.disabled = true;
    submit.dataset.label ??= submit.textContent || '';
    submit.textContent = 'Sending…';

    let sent = false;
    let failed = false;
    if (FORM_ENDPOINT) {
      try {
        const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        sent = res.ok;
        failed = !res.ok;
      } catch {
        failed = true;
      }
    }

    if (failed) {
      status.dataset.state = 'error';
      status.querySelector('[data-status-title]')!.textContent = 'That did not go through.';
      status.querySelector('[data-status-body]')!.textContent = 'Check your connection and send it again.';
      submit.disabled = false;
      submit.textContent = submit.dataset.label;
      status.hidden = false;
      return;
    }
    const kind = form.dataset.leadForm;
    status.dataset.state = sent ? 'sent' : 'preview';
    status.querySelector('[data-status-title]')!.textContent = sent
      ? kind === 'contact' ? 'Message sent.' : 'You are on the list.'
      : 'Thank you. Nothing was sent yet.';
    status.querySelector('[data-status-body]')!.textContent = sent
      ? kind === 'contact' ? 'We will reply to the email you gave us.' : 'We will write once, when the app is ready.'
      : 'This preview of the site is not connected to our inbox, so your details stayed in your browser. Sign-ups open soon.';
    form.hidden = true;
    status.hidden = false;
    form.dispatchEvent(new CustomEvent('lead:done', { bubbles: true, detail: { sent } }));
    status.focus();
  });
});

/* ---------- in-page anchors (header "Join the waitlist" → #waitlist, and hash on load) ----------
   A jump to #target can be computed before content above (content-visibility sections, media, desktop-only scripts) has its final
   height, so it lands off-target (measured: the desktop header click overshot by 147 px). Scroll, then when scrolling ends check
   the target against html's scroll-padding-top and correct once, unless the reader has already scrolled, tapped or pressed a key. */
const anchorPad = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
const settleOn = (target: HTMLElement, smooth: boolean) => {
  let userMoved = false;
  const markMoved = () => { userMoved = true; };
  const inputs = ['wheel', 'touchstart', 'keydown'] as const;
  inputs.forEach((type) => window.addEventListener(type, markMoved, { passive: true }));
  const correct = () => {
    inputs.forEach((type) => window.removeEventListener(type, markMoved));
    if (!userMoved && Math.abs(target.getBoundingClientRect().top - anchorPad()) > 24) {
      target.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
    }
  };
  target.scrollIntoView({ block: 'start', behavior: (smooth ? 'smooth' : 'instant') as ScrollBehavior });
  let done = false;
  const finish = () => { if (!done) { done = true; correct(); } };
  window.addEventListener('scrollend', finish, { once: true });
  window.setTimeout(finish, smooth ? 1400 : 250);
};

document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
  if (!link) return;
  const url = new URL(link.href, location.href);
  if (url.pathname !== location.pathname || url.search !== location.search || url.hash.length < 2) return;
  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!target) return;
  e.preventDefault();
  history.pushState(null, '', url.hash);
  settleOn(target, !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  // a cancelled native jump no longer moves the sequential focus point: hand focus to the target (skip link, section links)
  if (!target.matches('a[href], button, input, select, textarea, [tabindex]')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
});

if (location.hash.length > 1) {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target) {
    window.addEventListener('load', () => requestAnimationFrame(() => requestAnimationFrame(() => settleOn(target, false))), { once: true });
  }
}
