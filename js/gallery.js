/* ============================================================
   gallery.js — Galería con lightbox
   ============================================================ */

const GalleryModule = (() => {

  let lightbox = null;
  let lightboxImg = null;
  let lightboxCaption = null;
  let currentSrc = '';

  /* Crea el lightbox en el DOM */
  function createLightbox() {
    const lb = document.createElement('div');
    lb.classList.add('lightbox');
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-label', 'Vista ampliada de foto');
    lb.setAttribute('aria-modal', 'true');

    lb.innerHTML = `
      <button class="lightbox-close" aria-label="Cerrar">✕</button>
      <img class="lightbox-img" src="" alt="" />
      <div class="lightbox-caption"></div>
    `;

    document.body.appendChild(lb);

    lightbox = lb;
    lightboxImg = lb.querySelector('.lightbox-img');
    lightboxCaption = lb.querySelector('.lightbox-caption');

    /* Cerrar al hacer clic fuera de la imagen */
    lb.addEventListener('click', (e) => {
      if (e.target === lb || e.target.classList.contains('lightbox-close')) {
        closeLightbox();
      }
    });

    /* Cerrar con Escape */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  function openLightbox(src, caption) {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption || '';
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lightbox.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* Inicializa la galería */
  function init() {
    createLightbox();

    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
      const img = item.querySelector('.gallery-img');
      const caption = item.dataset.caption || '';

      /* Click para lightbox */
      item.addEventListener('click', () => {
        if (img && img.src && !img.src.includes('undefined')) {
          openLightbox(img.src, caption);
        }
      });

      /* Accesibilidad: teclado */
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', `Ver foto: ${caption}`);

      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (img && img.src) openLightbox(img.src, caption);
        }
      });

      /* Hover cursor */
      item.addEventListener('mouseenter', () => {
        document.getElementById('cursor')?.style.setProperty('transform', 'translate(-50%,-50%) scale(2.5)');
        document.getElementById('cursor-follower')?.style.setProperty('opacity', '0');
      });

      item.addEventListener('mouseleave', () => {
        document.getElementById('cursor')?.style.setProperty('transform', 'translate(-50%,-50%) scale(1)');
        document.getElementById('cursor-follower')?.style.setProperty('opacity', '0.6');
      });
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => GalleryModule.init());
