import { obtenerJuegos } from '../api/freetogameapi.js';
import { obtenerHistorial, obtenerFavoritos } from '../utils/localstorage.js';
import { crearTarjetaJuego } from '../components/gamecard.js';

// ─────────────────────────────────────────────────────────
// HELPER: Sección con título
// ─────────────────────────────────────────────────────────
function crearSeccion(icono, titulo, subtitulo = '') {
  const section = document.createElement('section');
  section.className = 'seccion';

  const h2 = document.createElement('h2');
  h2.className = 'seccion__titulo';
  h2.innerHTML = `<span class="seccion__icono">${icono}</span>${titulo}`;
  section.appendChild(h2);

  if (subtitulo) {
    const p = document.createElement('p');
    p.className = 'seccion__subtitulo';
    p.textContent = subtitulo;
    section.appendChild(p);
  }

  return section;
}

// ─────────────────────────────────────────────────────────
// 1. HERO – Carrusel de 4 juegos grandes
// ─────────────────────────────────────────────────────────
function renderHero(main, juegos) {
  const slides = juegos.slice(0, 4);
  if (!slides.length) return;

  const section = document.createElement('section');
  section.className = 'hero';
  section.setAttribute('aria-label', 'Juegos destacados');

  const track = document.createElement('div');
  track.className = 'hero__track';

  slides.forEach((juego, i) => {
    const slide = document.createElement('div');
    slide.className = 'hero__slide' + (i === 0 ? ' hero__slide--activo' : '');
    // Se restaura el thumbnail original ya que las alternativas fallaban
    slide.style.backgroundImage = `url(${juego.thumbnail})`;

    const overlay = document.createElement('div');
    overlay.className = 'hero__overlay';

    const contenido = document.createElement('div');
    contenido.className = 'hero__contenido';

    const tags = document.createElement('div');
    tags.className = 'hero__tags';
    [juego.genre, juego.platform].filter(Boolean).forEach((t) => {
      const tag = document.createElement('span');
      tag.className = 'hero__tag';
      tag.textContent = t;
      tags.appendChild(tag);
    });

    const nombre = document.createElement('h2');
    nombre.className = 'hero__titulo';
    nombre.textContent = juego.title;

    const desc = document.createElement('p');
    desc.className = 'hero__descripcion';
    desc.textContent = juego.short_description || '';

    const btn = document.createElement('a');
    btn.className = 'hero__boton';
    btn.href = `#/detalle/${juego.id}`;
    btn.textContent = 'Ver juego →';

    contenido.append(tags, nombre, desc, btn);
    slide.append(overlay, contenido);
    track.appendChild(slide);
  });

  const dots = document.createElement('div');
  dots.className = 'hero__dots';

  const allSlides = Array.from(track.querySelectorAll('.hero__slide'));
  let currentIdx = 0;
  let interval;

  function goTo(idx) {
    allSlides[currentIdx].classList.remove('hero__slide--activo');
    dotsArr[currentIdx].classList.remove('hero__dot--activo');
    currentIdx = ((idx % slides.length) + slides.length) % slides.length;
    allSlides[currentIdx].classList.add('hero__slide--activo');
    dotsArr[currentIdx].classList.add('hero__dot--activo');
  }

  function startAuto() {
    clearInterval(interval);
    interval = setInterval(() => goTo(currentIdx + 1), 5000);
  }

  const dotsArr = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'hero__dot' + (i === 0 ? ' hero__dot--activo' : '');
    dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
    dots.appendChild(dot);
    return dot;
  });

  section.append(track, dots);
  main.appendChild(section);
  startAuto();
}

// ─────────────────────────────────────────────────────────
// 2 & 3. DESTACADOS / NUEVOS – Grid de cards
// ─────────────────────────────────────────────────────────
function renderGrid(main, icono, titulo, juegos) {
  const section = crearSeccion(icono, titulo);
  const grid = document.createElement('div');
  grid.className = 'grid-juegos';
  juegos.forEach((j) => grid.appendChild(crearTarjetaJuego(j)));
  section.appendChild(grid);
  main.appendChild(section);
}

// ─────────────────────────────────────────────────────────
// 4. TOP – Ranking #1…#10
// ─────────────────────────────────────────────────────────
function renderTop(main, juegos) {
  const section = crearSeccion('🏆', 'Más Populares');
  const lista = document.createElement('ol');
  lista.className = 'ranking-lista';

  const MEDALLAS = ['ranking-item--oro', 'ranking-item--plata', 'ranking-item--bronce'];

  juegos.slice(0, 10).forEach((juego, i) => {
    const item = document.createElement('li');
    item.className = 'ranking-item' + (i < 3 ? ` ${MEDALLAS[i]}` : '');

    const num = document.createElement('span');
    num.className = 'ranking-num';
    num.textContent = `#${i + 1}`;

    const img = document.createElement('img');
    img.className = 'ranking-img';
    img.src = juego.thumbnail;
    img.alt = juego.title;
    img.loading = 'lazy';

    const info = document.createElement('div');
    info.className = 'ranking-info';

    const nombre = document.createElement('span');
    nombre.className = 'ranking-nombre';
    nombre.textContent = juego.title;

    const genero = document.createElement('span');
    genero.className = 'ranking-genero';
    genero.textContent = juego.genre;

    const link = document.createElement('a');
    link.className = 'ranking-link';
    link.href = `#/detalle/${juego.id}`;
    link.textContent = 'Ver';

    info.append(nombre, genero);
    item.append(num, img, info, link);
    lista.appendChild(item);
  });

  section.appendChild(lista);
  main.appendChild(section);
}

// ─────────────────────────────────────────────────────────
// 5. POR GÉNERO – Pills de navegación
// ─────────────────────────────────────────────────────────
const GENEROS_CONFIG = [
  { nombre: 'FPS', color: '#e05252' },
  { nombre: 'MMORPG', color: '#5271e0' },
  { nombre: 'Battle Royale', color: '#e07a52' },
  { nombre: 'MOBA', color: '#52c0e0' },
  { nombre: 'RPG', color: '#9e52e0' },
  { nombre: 'Sports', color: '#52e085' },
  { nombre: 'Racing', color: '#e0c452' },
  { nombre: 'Shooter', color: '#e05290' },
  { nombre: 'Strategy', color: '#52e0c4' },
];

function renderGeneros(main) {
  const section = crearSeccion('🎯', 'Explorar por Género');
  const pills = document.createElement('div');
  pills.className = 'genero-pills';

  GENEROS_CONFIG.forEach(({ nombre, color }) => {
    const pill = document.createElement('a');
    pill.className = 'genero-pill';
    pill.href = `#/busqueda?genero=${encodeURIComponent(nombre.toLowerCase().replace(' ', '-'))}`;
    pill.textContent = nombre;
    pill.style.setProperty('--pill-color', color);
    pills.appendChild(pill);
  });

  section.appendChild(pills);
  main.appendChild(section);
}

// ─────────────────────────────────────────────────────────
// 6. MULTIPLAYER – Cards de género con imagen de fondo
// ─────────────────────────────────────────────────────────
function renderMultiplayer(main, todosLosJuegos) {
  const MULTI = ['MMORPG', 'Battle Royale', 'Shooter', 'MOBA'];
  const section = crearSeccion('👥', 'Multiplayer', '¿Buscás algo para jugar con amigos?');
  const grid = document.createElement('div');
  grid.className = 'multi-grid';

  MULTI.forEach((genero) => {
    const juegosGenero = todosLosJuegos.filter(
      (j) => j.genre?.toLowerCase() === genero.toLowerCase()
    );
    const representante = juegosGenero[0];

    const card = document.createElement('a');
    card.className = 'multi-card';
    card.href = `#/busqueda?genero=${encodeURIComponent(genero.toLowerCase().replace(' ', '-'))}`;
    if (representante) {
      card.style.backgroundImage = `url(${representante.thumbnail})`;
    }

    const overlay = document.createElement('div');
    overlay.className = 'multi-card__overlay';

    const nombre = document.createElement('span');
    nombre.className = 'multi-card__nombre';
    nombre.textContent = genero;

    const count = document.createElement('span');
    count.className = 'multi-card__count';
    count.textContent = `${juegosGenero.length} juegos`;

    overlay.append(nombre, count);
    card.appendChild(overlay);
    grid.appendChild(card);
  });

  section.appendChild(grid);
  main.appendChild(section);
}

// ─────────────────────────────────────────────────────────
// 7. JOYAS OCULTAS – Desde posición 100+
// ─────────────────────────────────────────────────────────
function renderJoyasOcultas(main, todosLosJuegos) {
  const joyas = todosLosJuegos.slice(100, 107);
  if (!joyas.length) return;

  const section = crearSeccion('💎', 'Joyas Ocultas', 'Juegos gratuitos que merecen más atención');
  const grid = document.createElement('div');
  grid.className = 'grid-juegos';
  joyas.forEach((j) => grid.appendChild(crearTarjetaJuego(j)));
  section.appendChild(grid);
  main.appendChild(section);
}

// ─────────────────────────────────────────────────────────
// 8. POR PLATAFORMA – Cards con conteo
// ─────────────────────────────────────────────────────────
function renderPlataformas(main, todosLosJuegos) {
  const PLATAFORMAS = [
    { clave: 'pc', nombre: 'PC / Windows', icono: '🖥️' },
    { clave: 'browser', nombre: 'Navegador', icono: '🌐' },
  ];

  const section = crearSeccion('🎮', 'Por Plataforma');
  const grid = document.createElement('div');
  grid.className = 'plataforma-grid';

  PLATAFORMAS.forEach(({ clave, nombre, icono }) => {
    const count = todosLosJuegos.filter((j) =>
      j.platform?.toLowerCase().includes(clave)
    ).length;

    const card = document.createElement('a');
    card.className = 'plataforma-card';
    card.href = `#/busqueda?plataforma=${clave}`;

    const emojiEl = document.createElement('span');
    emojiEl.className = 'plataforma-card__icono';
    emojiEl.textContent = icono;

    const nombreEl = document.createElement('span');
    nombreEl.className = 'plataforma-card__nombre';
    nombreEl.textContent = nombre;

    const countEl = document.createElement('span');
    countEl.className = 'plataforma-card__count';
    countEl.textContent = `${count} juegos disponibles`;

    card.append(emojiEl, nombreEl, countEl);
    grid.appendChild(card);
  });

  section.appendChild(grid);
  main.appendChild(section);
}

// ─────────────────────────────────────────────────────────
// 9. PORQUE VISTE – Condicional: solo si hay historial
// ─────────────────────────────────────────────────────────
function renderPorqueViste(main, todosLosJuegos) {
  const historial = obtenerHistorial();
  const favoritos = obtenerFavoritos();

  const referencia = historial[0] || favoritos[0];
  if (!referencia) return;

  const similares = todosLosJuegos
    .filter((j) => j.genre === referencia.genre && j.id !== referencia.id)
    .slice(0, 6);

  if (!similares.length) return;

  const section = crearSeccion('🕹️', `Porque jugaste ${referencia.title}`);
  const scroll = document.createElement('div');
  scroll.className = 'scroll-horizontal';
  similares.forEach((j) => scroll.appendChild(crearTarjetaJuego(j)));
  section.appendChild(scroll);
  main.appendChild(section);
}

// ─────────────────────────────────────────────────────────
// CACHÉ – localStorage con TTL de 1 hora
// ─────────────────────────────────────────────────────────
const ONE_HOUR = 60 * 60 * 1000;

function getCached(clave) {
  try {
    const raw = localStorage.getItem(clave);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (Date.now() - cached.timestamp < ONE_HOUR) {
      return cached.data;
    }
    localStorage.removeItem(clave); // expiró, limpiamos
    return null;
  } catch {
    return null;
  }
}

function setCache(clave, data) {
  try {
    // Las URLs de imágenes (thumbnail) se guardan como string, sin conversión
    localStorage.setItem(clave, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // Si el localStorage está lleno u ocurre algún error, no bloqueamos la app
  }
}

async function obtenerJuegosConCache(params, clave) {
  const cached = getCached(clave);
  if (cached) return cached;

  const data = await obtenerJuegos(params);
  setCache(clave, data);
  return data;
}

// ─────────────────────────────────────────────────────────
// RENDER PRINCIPAL
// ─────────────────────────────────────────────────────────
export async function renderHome(contenedor) {
  const main = document.createElement('main');
  contenedor.appendChild(main);

  const [popResult, newResult] = await Promise.allSettled([
    obtenerJuegosConCache({ orden: 'popularity' }, 'games_popularity'),
    obtenerJuegosConCache({ orden: 'release-date' }, 'games_release-date'),
  ]);

  const populares = popResult.status === 'fulfilled' ? popResult.value : [];
  const nuevos = newResult.status === 'fulfilled' ? newResult.value : [];

  renderHero(main, populares);
  renderGrid(main, '🔥', 'Destacados', populares.slice(0, 7));
  renderGrid(main, '🆕', 'Recién Agregados', nuevos.slice(0, 7));
  renderTop(main, populares);
  renderGeneros(main);
  renderMultiplayer(main, populares);
  renderJoyasOcultas(main, populares);
  renderPlataformas(main, populares);
  renderPorqueViste(main, populares);
}
