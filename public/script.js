/**
 * ==========================================================================
 * STRICT ARCHITECTURAL INTERACTION LOGIC - ABDU BRAND DESIGNER
 * Language: Vanilla JavaScript (ES6+)
 * Zero dependencies, zero frameworks
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll-triggered Intersection Observer Animation
  const cards = document.querySelectorAll('.card-link');

  if (!('IntersectionObserver' in window)) {
    // Graceful fallback for older browsers without IntersectionObserver
    cards.forEach((card) => card.classList.add('is-revealed'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    cards.forEach((card, index) => {
      // Stagger entry animation in gentle waves
      card.style.transitionDelay = (index % 5) * 50 + 'ms';
      observer.observe(card);
    });
  }

  // 2. Avatar Fallback Protection
  const avatarImg = document.querySelector('.avatar img');
  if (avatarImg) {
    avatarImg.addEventListener('error', () => {
      avatarImg.style.display = 'none';
      const fallback = avatarImg.nextElementSibling;
      if (fallback) {
        fallback.style.display = 'flex';
      }
    });
  }

  // 3. Subtle micro-interaction keyboard accessibility
  cards.forEach((card) => {
    card.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        card.click();
      }
    });
  });
});
