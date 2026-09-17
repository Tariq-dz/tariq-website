/* Global nav — the persistent wordmark fades in once the hero leaves.
   (The scroll hairline is driven by the scene controller in js/scene.js.) */
(function initGlobalNav() {
  const mark = document.getElementById('tariq-mark');
  const hero = document.getElementById('s-hero');
  if (!mark || !hero) return;
  const obs = new IntersectionObserver((entries) => {
    mark.classList.toggle('visible', !entries[0].isIntersecting);
  }, { threshold: 0.08 });
  obs.observe(hero);
})();
