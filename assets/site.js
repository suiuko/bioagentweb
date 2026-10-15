'use strict';

const overview = document.getElementById('overview-video');
const chapters = [...document.querySelectorAll('.chapter')];
const videoStatus = document.getElementById('video-status');
let pendingSeek = null;

function syncChapter() {
  let active = chapters[0];
  for (const chapter of chapters) {
    if (overview.currentTime >= Number(chapter.dataset.seek)) active = chapter;
  }
  for (const chapter of chapters) {
    if (chapter === active) chapter.setAttribute('aria-current', 'true');
    else chapter.removeAttribute('aria-current');
  }
}

overview.addEventListener('loadedmetadata', () => {
  if (pendingSeek !== null) {
    overview.currentTime = pendingSeek;
    pendingSeek = null;
  }
});
overview.addEventListener('timeupdate', syncChapter);
overview.addEventListener('seeked', syncChapter);
syncChapter();

document.querySelectorAll('[data-seek]').forEach(button => {
  button.addEventListener('click', () => {
    const target = Number(button.dataset.seek);
    if (overview.readyState >= 1) overview.currentTime = target;
    else {
      pendingSeek = target;
      overview.load();
    }
    overview.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Request playback in the original click event so audio is user-initiated.
    overview.play().then(() => {
      videoStatus.textContent = `Playing ${button.textContent.trim()}`;
    }).catch(() => {
      videoStatus.textContent = 'Chapter selected. Press the video play button to start playback.';
    });
  });
});

// Only the selected, user-controlled player produces audio.
const players = [...document.querySelectorAll('video[controls]')];
players.forEach(player => {
  player.addEventListener('play', () => {
    players.forEach(other => { if (other !== player) other.pause(); });
  });
  player.addEventListener('error', () => {
    let fallback = player.parentElement.querySelector('.video-error');
    if (!fallback) {
      fallback = document.createElement('p');
      fallback.className = 'video-error';
      fallback.setAttribute('role', 'status');
      const download = document.createElement('a');
      download.href = player.querySelector('source').src;
      download.textContent = 'Open or download the video';
      fallback.append('Playback is unavailable. ', download);
      player.parentElement.append(fallback);
    }
  });
});

const background = document.querySelector('[data-background-video]');
const motionControl = document.getElementById('background-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let manuallyPaused = reducedMotion.matches;
let heroVisible = true;

function updateBackground() {
  const play = !manuallyPaused && heroVisible && !document.hidden;
  motionControl.textContent = manuallyPaused ? 'Play background' : 'Pause background';
  motionControl.setAttribute('aria-pressed', String(manuallyPaused));
  if (!play) {
    background.pause();
    return;
  }
  if (!background.getAttribute('src')) background.src = background.dataset.src;
  background.muted = true;
  background.play().catch(error => {
    if (error.name === 'AbortError') return;
    manuallyPaused = true;
    motionControl.textContent = 'Play background';
    motionControl.setAttribute('aria-pressed', 'true');
  });
}

motionControl.addEventListener('click', () => {
  manuallyPaused = !manuallyPaused;
  updateBackground();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) players.forEach(player => player.pause());
  updateBackground();
});
reducedMotion.addEventListener('change', event => {
  manuallyPaused = event.matches;
  updateBackground();
});
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    heroVisible = entries[0].isIntersecting;
    updateBackground();
  }).observe(document.getElementById('top'));
} else updateBackground();
