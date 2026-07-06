(function initGlobalNav() {
  const mark     = document.getElementById('tariq-mark');
  const hairline = document.getElementById('scroll-hairline');

  /* Wordmark: fade in once hero leaves viewport */
  if (mark) {
    const hero = document.getElementById('s-hero');
    if (hero) {
      const obs = new IntersectionObserver(entries => {
        mark.classList.toggle('visible', !entries[0].isIntersecting);
      }, { threshold: 0.08 });
      obs.observe(hero);
    }

    /* Ink swap while the light cities section sits under the mark:
       intersect against a thin strip at the mark's height. */
    const cities = document.getElementById('s-cities');
    if (cities) {
      const lightObs = new IntersectionObserver(entries => {
        mark.classList.toggle('on-light', entries[0].isIntersecting);
      }, { rootMargin: '-16px 0px -94% 0px' });
      lightObs.observe(cities);
    }
  }

  /* Scroll hairline: width = scroll progress × 100% */
  if (hairline) {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      hairline.style.width = ((window.scrollY / total) * 100).toFixed(2) + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }
})();
