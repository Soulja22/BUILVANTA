(() => {
  const root = document.querySelector('.home-story');
  if (!root || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const items = [...root.querySelectorAll('[data-story-reveal]')];
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -5% 0px', threshold: 0.08 });

  items.forEach((item, index) => {
    item.style.setProperty('--story-reveal-delay', `${(index % 3) * 65}ms`);
    item.classList.add('story-reveal-ready');
    observer.observe(item);
  });
})();
