/* Global gold cursor — single authoritative script shared across all chapters */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const hero = document.getElementById('s-hero');
  if (!cursor) return;
  document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    if (hero) {
      const r = hero.getBoundingClientRect();
      document.body.classList.toggle('cursor-light', e.clientY >= r.top && e.clientY <= r.bottom);
    }
  });
})();
