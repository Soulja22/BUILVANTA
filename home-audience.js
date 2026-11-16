(() => {
  const section = document.querySelector('#who-builvanta-is-for');
  if (!section || !('IntersectionObserver' in window)) return;

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const cards = [...section.querySelectorAll('.who-for-card')];
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

  cards.forEach((card, index) => {
    card.style.setProperty('--who-for-delay', `${index * 85}ms`);
    card.classList.add('is-reveal-ready');
    observer.observe(card);
  });
})();
