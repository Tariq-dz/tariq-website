/* Global gold cursor — single authoritative script shared across all sections */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const heroSection = document.getElementById('s-hero');
  document.addEventListener('mousemove', e => {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    if (heroSection) {
      const r = heroSection.getBoundingClientRect();
      const inHero = e.clientY >= r.top && e.clientY <= r.bottom;
      document.body.classList.toggle('cursor-light', inHero);
    }
  });
})();
