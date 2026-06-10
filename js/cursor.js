/* Global gold cursor — single authoritative script shared across all sections */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const heroSection = document.getElementById('s-hero');
  const citiesSection = document.getElementById('s-cities');
  document.addEventListener('mousemove', e => {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    if (heroSection) {
      const r = heroSection.getBoundingClientRect();
      const inHero = e.clientY >= r.top && e.clientY <= r.bottom;
      document.body.classList.toggle('cursor-light', inHero);
    }
    /* Cities sits on a light sand canvas — darken the dot for legibility */
    if (citiesSection) {
      const c = citiesSection.getBoundingClientRect();
      const inCities = e.clientY >= c.top && e.clientY <= c.bottom;
      document.body.classList.toggle('cursor-dark', inCities);
    }
  });
})();
