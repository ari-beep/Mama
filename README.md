# 💛 Regalo Día de las Madres — Página Web Emocional

Una experiencia web cinematográfica y emotiva para regalar el Día de las Madres.

---

## 🗂️ Estructura del Proyecto

```
/project
│
├── index.html              ← Página principal
│
├── /css
│   ├── styles.css          ← Estilos principales + paleta de colores
│   ├── animations.css      ← Animaciones y transiciones
│   └── responsive.css      ← Diseño adaptativo (móvil, tablet, escritorio)
│
├── /js
│   ├── main.js             ← Orquestación: loader, cursor, pétalos, scroll
│   ├── animations.js       ← Animaciones GSAP + partículas en canvas
│   ├── gallery.js          ← Galería con lightbox
│   └── music.js            ← Música ambient con Web Audio API
│
├── /assets
│   ├── /images             ← Agrega tus fotos aquí
│   ├── /audio              ← Opcional: agrega tu propia canción (music.mp3)
│   ├── /videos             ← Espacio para videos futuros
│   └── /icons              ← Íconos personalizados si los necesitas
│
└── README.md
```

---

## 🖼️ Cómo agregar tus fotos

Coloca tus fotos en `/assets/images/` con estos nombres exactos:

| Archivo              | Sección         | Descripción              |
|----------------------|-----------------|--------------------------|
| `hero-photo.jpg`     | Hero principal  | Foto principal de mamá   |
| `gallery-1.jpg`      | Galería         | Foto grande superior     |
| `gallery-2.jpg`      | Galería         | Foto mediana             |
| `gallery-3.jpg`      | Galería         | Foto mediana             |
| `gallery-4.jpg`      | Galería         | Foto mediana             |
| `gallery-5.jpg`      | Galería         | Foto panorámica inferior |

**Sin fotos:** La página funciona igual y muestra placeholders elegantes con el ícono 📷.

---

## ✏️ Cómo personalizar los textos

Abre `index.html` y edita:

### Mensaje de la carta (sección `#carta`)
Busca las etiquetas `<p class="carta-parrafo">` y escribe tu propio mensaje.

### Línea del tiempo (`#timeline`)
Edita los `.tl-card` con tus fechas y recuerdos:
```html
<span class="tl-year">2010</span>
<h3 class="tl-title">Tu recuerdo</h3>
<p class="tl-desc">Tu descripción personal...</p>
```

### Mensajes del hero y final
Busca `.hero-heading` y `.final-title` para cambiar las frases principales.

---

## 🎵 Música

La música se genera automáticamente con **Web Audio API** (notas suaves y ambientales).

Para usar **tu propia canción**:
1. Coloca el archivo en `/assets/audio/music.mp3`
2. Abre `js/music.js`
3. Descomenta el bloque de `<audio>` al final del archivo y comenta el bloque de osciladores

---

## 🚀 Cómo abrir la página

**Opción 1 — Doble clic:** Abre `index.html` directamente en tu navegador.

**Opción 2 — Servidor local (recomendado para las fotos):**
```bash
# Con Python
python -m http.server 8080

# Con Node.js
npx serve .
```
Luego abre `http://localhost:8080`

---

## 🎨 Paleta de colores

| Variable          | Color          | Uso                   |
|-------------------|----------------|-----------------------|
| `--rosa`          | #f4c2c2        | Acentos suaves        |
| `--crema`         | #fdf6ee        | Fondo principal       |
| `--dorado`        | #c9a96e        | Texto y detalles premium |
| `--dorado-light`  | #e8d5a3        | Bordes y brillos      |
| `--blanco`        | #fffef9        | Fondos de tarjetas    |

---

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge (modernos)
- ✅ iOS Safari (iPhone/iPad)
- ✅ Android Chrome
- ✅ Sin dependencias pesadas — solo GSAP (CDN)

---

## 💡 Consejos

- Las fotos en formato **JPG** y proporción **3:4** (vertical) quedan mejor en el hero
- Para la galería usa fotos **horizontales** o cuadradas
- El cursor personalizado se oculta automáticamente en pantallas táctiles
- La música requiere una **interacción del usuario** antes de reproducirse (limitación del navegador)

---

*Hecho con amor 💛 — Feliz Día de las Madres*
