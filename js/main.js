/* ============================================================
   main.js — Orquestación principal
   Loader, intro, cursor, pétalos, scroll suave
   ============================================================ */

/* =====================================================
   LOADER
   ===================================================== */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (typeof gsap !== 'undefined') {
        gsap.to(loader, {
          opacity: 0,
          duration: 0.9,
          ease: 'power2.out',
          onComplete: () => {
            loader.style.display = 'none';
            initIntroAnimation();
          }
        });
      } else {
        loader.style.opacity = 0;
        setTimeout(() => {
          loader.style.display = 'none';
          initIntroAnimation();
        }, 900);
      }
    }, 800);
  });
}

/* =====================================================
   INTRO CINEMATOGRÁFICA
   ===================================================== */
function initIntroAnimation() {
  if (typeof gsap === 'undefined') {
    document.querySelectorAll('.intro-line').forEach(el => {
      el.style.opacity = 1;
    });
    return;
  }

  const tl = gsap.timeline();

  tl
    .fromTo('#intro-line1',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '+=0.3'
    )
    .fromTo('#intro-line2',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo('#intro-line3',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo('#intro-line4',
      { opacity: 0 },
      { opacity: 1, duration: 0.9, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo('#intro-cta',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.2'
    );
}

/* =====================================================
   BOTÓN "COMENZAR"
   ===================================================== */
function initBeginButton() {
  const btn = document.getElementById('begin-btn');
  const hero = document.getElementById('hero');
  if (!btn || !hero) return;

  btn.addEventListener('click', () => {
    hero.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (typeof gsap !== 'undefined') {
      gsap.to('#intro', {
        opacity: 0.4,
        duration: 0.6,
        ease: 'power2.in'
      });
    }
  });
}

/* =====================================================
   BOTÓN "REINICIAR"
   ===================================================== */
function initRestartButton() {
  const btn = document.getElementById('restart-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =====================================================
   CURSOR PERSONALIZADO
   ===================================================== */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }

  animateFollower();

  /* Efecto hover en elementos interactivos */
  const interactives = document.querySelectorAll('button, a, .gallery-item, .tl-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      cursor.style.opacity = '0.5';
      follower.style.width = '54px';
      follower.style.height = '54px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursor.style.opacity = '1';
      follower.style.width = '36px';
      follower.style.height = '36px';
    });
  });
}

/* =====================================================
   PÉTALOS FLOTANTES
   ===================================================== */
function initPetals() {
  const symbols = ['✿', '❀', '✾', '♡', '·'];
  const colors  = [
    'rgba(244,194,194,0.7)',
    'rgba(232,213,163,0.6)',
    'rgba(201,169,110,0.5)',
    'rgba(253,240,240,0.8)'
  ];
  const petalCount = 12;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('span');
    petal.classList.add('petal');
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    petal.style.cssText = `
      left: ${Math.random() * 100}vw;
      font-size: ${0.6 + Math.random() * 0.8}rem;
      color: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${8 + Math.random() * 14}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    document.body.appendChild(petal);
  }
}

/* =====================================================
   DESTELLOS BRILLANTES
   ===================================================== */
function initSparkles() {
  const heroWrap = document.querySelector('.hero-photo-wrap');
  if (!heroWrap) return;

  function spawnSparkle() {
    const sparkle = document.createElement('span');
    sparkle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: var(--dorado);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10;
      left: ${10 + Math.random() * 80}%;
      top: ${10 + Math.random() * 80}%;
      opacity: 0;
      box-shadow: 0 0 6px 2px rgba(201,169,110,0.6);
    `;

    heroWrap.appendChild(sparkle);

    if (typeof gsap !== 'undefined') {
      gsap.to(sparkle, {
        opacity: 0.9,
        scale: 1.8,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(sparkle, {
            opacity: 0,
            scale: 0,
            duration: 0.6,
            ease: 'power2.in',
            onComplete: () => sparkle.remove()
          });
        }
      });
    } else {
      sparkle.style.opacity = '0.7';
      setTimeout(() => sparkle.remove(), 1000);
    }
  }

  setInterval(spawnSparkle, 1800);
}

/* =====================================================
   SMOOTH SCROLL (secciones)
   ===================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* =====================================================
   SCROLL PROGRESS (línea dorada superior)
   ===================================================== */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--rosa), var(--dorado), var(--rosa));
    z-index: 9999;
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.1s linear;
    pointer-events: none;
  `;
  bar.setAttribute('role', 'progressbar');
  bar.setAttribute('aria-label', 'Progreso de lectura');
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.body.scrollHeight - window.innerHeight;
    const progress = total > 0 ? scrolled / total : 0;
    bar.style.transform = `scaleX(${progress})`;
  }, { passive: true });
}

/* =====================================================
   OBSERVADOR DE VISIBILIDAD (fallback sin GSAP)
   ===================================================== */
function initIntersectionObserver() {
  if (typeof gsap !== 'undefined') return; // GSAP lo maneja

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(
    '.timeline-item, .gallery-item, .carta-parrafo, .carta-saludo, .carta-destacado, .carta-firma, .reveal-text'
  ).forEach(el => observer.observe(el));
}

/* =====================================================
   EFECTO PARALLAX SUAVE EN MOUSEMOVE (Hero)
   ===================================================== */
function initMouseParallax() {
  const heroFrame = document.querySelector('.hero-photo-frame');
  if (!heroFrame) return;

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    heroFrame.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
  });
}

/* =====================================================
   INIT GLOBAL
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initBeginButton();
  initRestartButton();
  initCursor();
  initPetals();
  initSparkles();
  initSmoothScroll();
  initScrollProgress();
  initIntersectionObserver();
  initMouseParallax();

  /* Estilos CSS variables disponibles para JS */
  document.documentElement.style.setProperty('--vw', `${window.innerWidth * 0.01}px`);
  window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--vw', `${window.innerWidth * 0.01}px`);
  });
});
