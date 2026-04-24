/* Section 4 — CITIES: infinite horizontal marquee with pointer-driven speed */
(function initCities() {
  const track   = document.getElementById('cities-track');
  const wrapper = document.getElementById('marquee-wrapper');
  const originals = Array.from(track.children);
  const count     = originals.length;

  for (let s = 0; s < 3; s++) {
    originals.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }

  let setWidth = 0, mOffset = 0, mSpeed = 0, mTargetSpeed = -1.2;
  let citiesActive = false;

  requestAnimationFrame(() => requestAnimationFrame(() => {
    const r0 = track.children[0].getBoundingClientRect();
    const r1 = track.children[count].getBoundingClientRect();
    setWidth = r1.left - r0.left;
    mOffset  = -setWidth;

    const cObs = new IntersectionObserver(entries => {
      citiesActive = entries[0].isIntersecting;
    }, { threshold: 0.05 });
    cObs.observe(document.getElementById('s-cities'));

    wrapper.addEventListener('mousemove', e => {
      const rect = wrapper.getBoundingClientRect();
      const norm = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      mTargetSpeed = -(Math.abs(norm) < 0.08 ? 0 : norm) * 4;
    });
    wrapper.addEventListener('mouseleave', () => {
      mTargetSpeed = mSpeed > 0 ? 1.2 : -1.2;
    });

    let txLast = 0, txVel = 0, txTime = 0;
    wrapper.addEventListener('touchstart', e => {
      txLast = e.touches[0].clientX; txVel = 0; txTime = Date.now(); mTargetSpeed = 0;
    }, { passive: true });
    wrapper.addEventListener('touchmove', e => {
      e.preventDefault();
      const x = e.touches[0].clientX, now = Date.now(), dt = Math.max(now - txTime, 1);
      txVel = (x - txLast) / dt * 16; txLast = x; txTime = now; mTargetSpeed = txVel;
    }, { passive: false });
    wrapper.addEventListener('touchend', () => {
      const m = Math.sign(txVel) * Math.min(Math.abs(txVel), 4);
      mTargetSpeed = Math.abs(m) > 0.4 ? m : (mSpeed > 0 ? 1.2 : -1.2);
    });

    function tick() {
      requestAnimationFrame(tick);
      if (!citiesActive) return;
      mSpeed  += (mTargetSpeed - mSpeed) * 0.05;
      mOffset += mSpeed;
      if (mOffset <= -setWidth * 2) mOffset += setWidth;
      if (mOffset >  -setWidth)     mOffset -= setWidth;
      track.style.transform = `translateX(${mOffset}px)`;
    }
    tick();
  }));
})();
