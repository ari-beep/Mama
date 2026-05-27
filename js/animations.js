/* ============================================================
   animations.js — Animaciones con GSAP + ScrollTrigger
   ============================================================ */

const AnimationsModule = (() => {

  /* Registrar plugins GSAP */
  function init() {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP no disponible');
      return;
    }
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    setupScrollReveal();
    setupParallax();
    setupTimelineAnimations();
    setupCartaAnimations();
    setupGalleryAnimations();
    setupFinalSection();
  }

  /* ---------- Scroll Reveal genérico ---------- */
  function setupScrollReveal() {
    // Hero principal
    gsap.fromTo('.hero-tag',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '#hero', start: 'top 75%', once: true }
      }
    );

    gsap.fromTo('.hero-heading',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: '#hero', start: 'top 75%', once: true }
      }
    );

    gsap.fromTo('.hero-desc',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.3,
        scrollTrigger: { trigger: '#hero', start: 'top 75%', once: true }
      }
    );

    gsap.fromTo(['.hero-divider', '.hero-sign'],
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.5, stagger: 0.15,
        scrollTrigger: { trigger: '#hero', start: 'top 75%', once: true }
      }
    );

    // Foto hero con morfeo suave
    gsap.fromTo('.hero-photo-frame',
      { opacity: 0, scale: 0.92, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'power3.out',
        scrollTrigger: { trigger: '#hero', start: 'top 70%', once: true }
      }
    );

    // Section headers
    gsap.utils.toArray('.section-tag').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        }
      );
    });

    gsap.utils.toArray('.section-title').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        }
      );
    });

    gsap.utils.toArray('.section-subtitle').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
    });
  }

  /* ---------- Parallax suave ---------- */
  function setupParallax() {
    gsap.to('.hero-bg-blur', {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to('.carta-deco-flower', {
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: '#carta',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  }

  /* ---------- Timeline animaciones ---------- */
  function setupTimelineAnimations() {
    const items = document.querySelectorAll('.timeline-item');

    items.forEach((item, i) => {
      const isLeft = item.classList.contains('tl-left');
      gsap.fromTo(item,
        { opacity: 0, x: isLeft ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.1 * i,
          scrollTrigger: {
            trigger: item,
            start: 'top 82%',
            once: true
          }
        }
      );
    });

    // Línea del tiempo que crece
    gsap.fromTo('.timeline-line',
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 70%',
          once: true
        }
      }
    );

    // Dots que aparecen
    gsap.utils.toArray('.tl-dot').forEach((dot, i) => {
      gsap.fromTo(dot,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(2)',
          delay: 0.3 + i * 0.2,
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 70%',
            once: true
          }
        }
      );
    });
  }

  /* ---------- Carta animaciones ---------- */
  function setupCartaAnimations() {
    const paper = document.querySelector('.carta-paper');
    if (!paper) return;

    gsap.fromTo(paper,
      { opacity: 0, y: 40, rotateX: 5 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#carta',
          start: 'top 70%',
          once: true
        }
      }
    );

    const cartaElements = document.querySelectorAll(
      '.carta-saludo, .carta-parrafo, .carta-destacado, .carta-firma'
    );

    cartaElements.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          delay: 0.15 * i,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          }
        }
      );
    });
  }

  /* ---------- Galería animaciones ---------- */
  function setupGalleryAnimations() {
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.1 * i,
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            once: true
          }
        }
      );
    });
  }

  /* ---------- Sección final ---------- */
  function setupFinalSection() {
    const finalElements = document.querySelectorAll(
      '.final-roses, .final-tag, .final-title, .final-hearts, .final-message, .final-date, .btn-restart'
    );

    finalElements.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.12 * i,
          scrollTrigger: {
            trigger: '#final',
            start: 'top 70%',
            once: true
          }
        }
      );
    });
  }

  return { init };
})();

/* ---------- Partículas en canvas ---------- */
const ParticlesModule = (() => {
  function create(canvasId, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const config = {
      count: options.count || 70,
      color: options.color || 'rgba(201,169,110,',
      minSize: options.minSize || 1,
      maxSize: options.maxSize || 3,
      speed: options.speed || 0.4,
      ...options
    };

    let particles = [];
    let animId;

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function spawnParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: config.minSize + Math.random() * (config.maxSize - config.minSize),
        speedX: (Math.random() - 0.5) * config.speed,
        speedY: (Math.random() - 0.5) * config.speed - 0.1,
        opacity: Math.random() * 0.6 + 0.1,
        life: Math.random() * 200 + 100,
        age: 0
      };
    }

    function init() {
      particles = Array.from({ length: config.count }, spawnParticle);
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.age++;
        p.x += p.speedX;
        p.y += p.speedY;

        const lifeRatio = p.age / p.life;
        const alpha = p.opacity * Math.sin(lifeRatio * Math.PI);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${config.color}${alpha.toFixed(2)})`;
        ctx.fill();

        if (p.age >= p.life) {
          particles[i] = spawnParticle();
        }
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    window.addEventListener('resize', () => {
      resize();
      init();
    });

    return { stop: () => cancelAnimationFrame(animId) };
  }

  return { create };
})();

/* Init al cargar */
document.addEventListener('DOMContentLoaded', () => {
  AnimationsModule.init();
  ParticlesModule.create('particles-canvas', { count: 80, color: 'rgba(201,169,110,', minSize: 0.8, maxSize: 2.5, speed: 0.3 });
  ParticlesModule.create('final-particles', { count: 60, color: 'rgba(244,194,194,', minSize: 1, maxSize: 3, speed: 0.25 });
});
