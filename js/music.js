/* ============================================================
   music.js — Módulo de música de fondo
   Genera música ambient con Web Audio API (sin archivos externos)
   ============================================================ */

const MusicModule = (() => {
  let audioCtx = null;
  let masterGain = null;
  let isPlaying = false;
  let oscillators = [];
  let fadeInterval = null;
  const TARGET_VOLUME = 0.06;

  /* Crea el contexto de audio (requiere gesto del usuario) */
  function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);
  }

  /* Crea un oscilador suave (onda sinusoidal) */
  function createTone(freq, gainVal, type = 'sine') {
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.setTargetAtTime(freq * 1.002, audioCtx.currentTime, 8);

    filter.type = 'lowpass';
    filter.frequency.value = 600;
    filter.Q.value = 0.8;

    g.gain.setValueAtTime(gainVal, audioCtx.currentTime);

    osc.connect(filter);
    filter.connect(g);
    g.connect(masterGain);
    osc.start();

    return { osc, g };
  }

  /* Genera acordes suaves: Do mayor y La menor alternando */
  function startMusic() {
    initAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    // Notas base (Hz): C3, E3, G3, A2, C3, E3
    const tones = [
      { freq: 130.81, gain: 0.6 }, // C3
      { freq: 164.81, gain: 0.4 }, // E3
      { freq: 196.00, gain: 0.35 }, // G3
      { freq: 110.00, gain: 0.5 }, // A2
      { freq: 174.61, gain: 0.3 }, // F3
      { freq: 261.63, gain: 0.2 }, // C4
    ];

    tones.forEach(({ freq, gain }) => {
      const t = createTone(freq, gain * 0.08, 'sine');
      oscillators.push(t);
    });

    // Sub-bass
    const bass = createTone(65.41, 0.3, 'triangle');
    oscillators.push(bass);

    // Fade in suave
    masterGain.gain.setTargetAtTime(TARGET_VOLUME, audioCtx.currentTime, 2.5);
    isPlaying = true;
  }

  /* Detiene la música con fade out */
  function stopMusic() {
    if (!audioCtx || !isPlaying) return;
    masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 1.2);
    setTimeout(() => {
      oscillators.forEach(({ osc }) => {
        try { osc.stop(); } catch (e) { /* ya detenido */ }
      });
      oscillators = [];
    }, 3500);
    isPlaying = false;
  }

  /* Toggle play/pause */
  function toggle() {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
    return isPlaying;
  }

  /* API pública */
  return { toggle, isPlaying: () => isPlaying };
})();

/* ---------- UI del botón de música ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('music-btn');
  const control = document.getElementById('music-control');

  if (!btn) return;

  btn.addEventListener('click', () => {
    const playing = MusicModule.toggle();
    btn.classList.toggle('playing', playing);
    btn.setAttribute('aria-label', playing ? 'Pausar música' : 'Reproducir música de fondo');
  });

  /* Mostrar control tras cargar */
  setTimeout(() => control?.classList.add('visible'), 2500);
});
