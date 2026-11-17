(() => {
  const section = document.querySelector('.home-audience-film');
  if (!section) return;

  const video = section.querySelector('.home-audience-film__video');
  const toggle = section.querySelector('[data-video-toggle]');
  const playIcon = section.querySelector('[data-play-icon]');
  const pauseIcon = section.querySelector('[data-pause-icon]');
  const seek = section.querySelector('[data-video-seek]');
  const time = section.querySelector('[data-video-time]');
  const mute = section.querySelector('[data-video-mute]');
  const status = section.querySelector('[data-video-status]');
  if (!video || !toggle || !seek || !time || !mute) return;

  let userSeeking = false;

  const formatTime = (seconds) => {
    const safeSeconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
    const minutes = Math.floor(safeSeconds / 60);
    const remainingSeconds = String(safeSeconds % 60).padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  const showPosition = (seconds) => {
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    const requested = Number.isFinite(seconds) ? seconds : 0;
    const current = Math.max(0, Math.min(duration || requested, requested));
    const percent = duration > 0 ? Math.min(100, (current / duration) * 100) : 0;
    seek.value = String(current);
    seek.style.setProperty('--video-progress', `${percent}%`);
    seek.setAttribute('aria-valuetext', `${formatTime(current)} of ${formatTime(duration)}`);
    time.value = `${formatTime(current)} / ${formatTime(duration)}`;
    time.textContent = time.value;
  };

  const updateProgress = () => showPosition(video.currentTime);

  const updatePlaybackButton = () => {
    const ended = video.ended;
    const playing = !video.paused && !ended;
    const label = playing ? 'Pause video' : ended ? 'Replay video' : 'Play video';
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
    toggle.setAttribute('aria-pressed', String(playing));
    if (playIcon) playIcon.hidden = playing;
    if (pauseIcon) pauseIcon.hidden = !playing;
  };

  const updateMuteButton = () => {
    const muted = video.muted || video.volume === 0;
    const label = muted ? 'Unmute video audio' : 'Mute video audio';
    mute.setAttribute('aria-label', label);
    mute.setAttribute('title', label);
    mute.setAttribute('aria-pressed', String(muted));
  };

  const announce = (message) => {
    if (status) status.textContent = message;
  };

  video.addEventListener('loadedmetadata', () => {
    seek.disabled = false;
    seek.max = String(video.duration || 0);
    updateProgress();
  });
  video.addEventListener('durationchange', () => {
    seek.max = String(Number.isFinite(video.duration) ? video.duration : 0);
    updateProgress();
  });
  video.addEventListener('timeupdate', () => {
    if (!userSeeking) updateProgress();
  });
  video.addEventListener('seeked', () => {
    userSeeking = false;
    updateProgress();
  });
  video.addEventListener('play', () => {
    updatePlaybackButton();
    announce('Video playing.');
  });
  video.addEventListener('pause', () => {
    updatePlaybackButton();
    announce(video.ended ? 'Video finished. Select replay to watch again.' : 'Video paused.');
  });
  video.addEventListener('ended', updatePlaybackButton);
  video.addEventListener('volumechange', updateMuteButton);
  video.addEventListener('error', () => announce('The video could not be loaded. Please try again later.'));

  toggle.addEventListener('click', async () => {
    if (video.paused || video.ended) {
      if (video.ended) video.currentTime = 0;
      try {
        await video.play();
        announce('Video playing.');
      } catch {
        announce('Playback did not start. Please select play again.');
      }
    } else {
      video.pause();
    }
  });

  seek.addEventListener('input', () => {
    userSeeking = true;
    showPosition(Number(seek.value));
  });
  seek.addEventListener('change', () => {
    if (!Number.isFinite(video.duration)) {
      userSeeking = false;
      return;
    }
    const target = Number(seek.value);
    if (Math.abs(video.currentTime - target) < 0.05) {
      userSeeking = false;
      updateProgress();
      return;
    }
    video.currentTime = target;
  });

  mute.addEventListener('click', () => {
    video.muted = !video.muted;
    updateMuteButton();
  });

  section.addEventListener('contextmenu', (event) => event.preventDefault());
  if (video.readyState >= 1) {
    seek.disabled = false;
    seek.max = String(Number.isFinite(video.duration) ? video.duration : 0);
  }
  updateProgress();
  updatePlaybackButton();
  updateMuteButton();
})();
