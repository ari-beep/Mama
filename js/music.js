/* ============================================================
   music.js — Música de fondo vía YouTube IFrame API
   Canción: "A Thousand Years" - Christina Perri (instrumental)
   El iframe queda oculto; solo se controla play/pause/volumen
   ============================================================ */

const MusicModule = (() => {
  /* ── Cambia este ID por cualquier video de YouTube que prefieras ── */
  const YOUTUBE_ID = 'oygrmJFkg68'; // Christina Perri - A Thousand Years (piano)

  let player = null;
  let isReady = false;
  let isPlaying = false;
  let apiLoaded = false;

  /* Crea el contenedor oculto del iframe */
  function createPlayerContainer() {
    const wrap = document.createElement('div');
    wrap.id = 'yt-player-wrap';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.style.cssText = `
      position: fixed;
      width: 1px;
      height: 1px;
      opacity: 0;
      pointer-events: none;
      bottom: 0;
      left: 0;
      z-index: -1;
    `;
    const div = document.createElement('div');
    div.id = 'yt-player';
    wrap.appendChild(div);
    document.body.appendChild(wrap);
  }

  /* Carga la YouTube IFrame API una sola vez */
  function loadYouTubeAPI() {
    if (apiLoaded) return;
    apiLoaded = true;

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  }

  /* Callback global que llama YouTube cuando su API está lista */
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('yt-player', {
      videoId: YOUTUBE_ID,
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: YOUTUBE_ID, // necesario para que loop funcione
        controls: 0,
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3,
        fs: 0,
      },
      events: {
        onReady: (e) => {
          isReady = true;
          e.target.setVolume(30); // volumen suave (0–100)
        },
        onError: (e) => {
          console.warn('YouTube player error:', e.data);
        }
      }
    });
  };

  /* Fade in de volumen (0 → 30 en 3 s) */
  function fadeIn() {
    if (!player || !isReady) return;
    let vol = 0;
    player.setVolume(0);
    const interval = setInterval(() => {
      vol += 2;
      player.setVolume(vol);
      if (vol >= 30) clearInterval(interval);
    }, 200);
  }

  /* Fade out de volumen (actual → 0 en 2 s) */
  function fadeOut(callback) {
    if (!player || !isReady) { if (callback) callback(); return; }
    let vol = player.getVolume();
    const interval = setInterval(() => {
      vol -= 3;
      if (vol <= 0) {
        player.setVolume(0);
        player.pauseVideo();
        clearInterval(interval);
        if (callback) callback();
      } else {
        player.setVolume(vol);
      }
    }, 120);
  }

  /* Toggle play / pause */
  function toggle() {
    if (!player || !isReady) {
      console.warn('Player aún no está listo');
      return isPlaying;
    }

    if (isPlaying) {
      fadeOut(() => { isPlaying = false; });
    } else {
      player.playVideo();
      fadeIn();
      isPlaying = true;
    }

    return isPlaying;
  }

  /* Inicializa todo (se llama al primer clic o al cargar) */
  function init() {
    createPlayerContainer();
    loadYouTubeAPI();
  }

  return { init, toggle, isPlaying: () => isPlaying };
})();

/* ── UI del botón ── */
document.addEventListener('DOMContentLoaded', () => {
  const btn     = document.getElementById('music-btn');
  const control = document.getElementById('music-control');
  let   initialized = false;

  if (!btn) return;

  btn.addEventListener('click', () => {
    /* Inicializar solo la primera vez (requiere gesto del usuario) */
    if (!initialized) {
      MusicModule.init();
      initialized = true;

      /* Pequeño delay para que la API cargue antes de dar play */
      setTimeout(() => {
        const playing = MusicModule.toggle();
        btn.classList.toggle('playing', playing);
        btn.setAttribute('aria-label', playing ? 'Pausar música' : 'Reproducir música');
      }, 1800);
      return;
    }

    const playing = MusicModule.toggle();
    btn.classList.toggle('playing', playing);
    btn.setAttribute('aria-label', playing ? 'Pausar música' : 'Reproducir música');
  });

  /* Mostrar el control tras cargar la página */
  setTimeout(() => control?.classList.add('visible'), 2500);
});
