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
   INIT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initLeverAnimation();
});
