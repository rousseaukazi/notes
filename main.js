/* ========================================
   SCROLL REVEAL
   ======================================== */

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

/* ========================================
   LEVER ANIMATION
   ======================================== */

function initLeverAnimation() {
  const scene = document.querySelector('.lever-scene');
  if (!scene) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          scene.classList.remove('lever-animated');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              scene.classList.add('lever-animated');
            });
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(scene);
}

/* ========================================
   HERO PARTICLES
   ======================================== */

function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  const count = 52;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.classList.add('particle');

    const size     = 1 + Math.random() * 1.5;           // 1–2.5px
    const x        = Math.random() * 100;                // % left
    const opacity  = 0.06 + Math.random() * 0.18;       // 0.06–0.24
    const duration = 18 + Math.random() * 20;           // 18–38s
    const delay    = -(Math.random() * 35);             // already in-flight on load
    const drift    = (Math.random() - 0.5) * 48;        // ±24px horizontal wander

    el.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      bottom: -4%;
      opacity: ${opacity};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      --drift: ${drift}px;
    `;

    container.appendChild(el);
  }
}

/* ========================================
   INIT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initLeverAnimation();
  initParticles();
});
