(() => {
  const video = document.querySelector('.what-is-hero__video');
  if (!video || !window.matchMedia) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const syncPlayback = () => {
    if (reducedMotion.matches) {
      video.pause();
      return;
    }
    video.muted = true;
    const playback = video.play();
    if (playback && typeof playback.catch === 'function') playback.catch(() => {});
  };

  syncPlayback();
  if (typeof reducedMotion.addEventListener === 'function') reducedMotion.addEventListener('change', syncPlayback);
  else if (typeof reducedMotion.addListener === 'function') reducedMotion.addListener(syncPlayback);
})();
