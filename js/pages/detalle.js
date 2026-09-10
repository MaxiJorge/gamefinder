import { obtenerJuegoPorId } from '../api/freetogameapi.js';
import { agregarAlHistorial, esFavorito, alternarFavorito } from '../utils/localstorage.js';
import { mostrarToast } from '../components/toast.js';

export async function renderDetalle(contenedor, parametros) {
  const main = document.createElement('main');
  main.className = 'pagina-general detalle-juego';

  main.innerHTML = `
    <div class="seccion-header">
      <h1 class="seccion__titulo"><span class="seccion__icono">⏳</span> Cargando...</h1>
    </div>
  `;
  contenedor.appendChild(main);

  const { id } = parametros;

  try {
    const juego = await obtenerJuegoPorId(id);
    if (!juego || !juego.id) {
      throw new Error('No se encontró el juego pedido.');
    }

    agregarAlHistorial(juego);

    main.innerHTML = `
      <div class="seccion-header">
        <h1 class="seccion__titulo"><span class="seccion__icono">🎮</span> ${juego.title}</h1>
      </div>
    `;

    const detalleContenedor = document.createElement('div');
    detalleContenedor.className = 'detalle-contenedor';

    const imagen = document.createElement('img');
    imagen.className = 'detalle-imagen';
    imagen.src = juego.thumbnail;
    imagen.alt = juego.title;
    imagen.loading = 'lazy';
    imagen.decoding = 'async';

    const infoBloque = document.createElement('div');
    infoBloque.className = 'detalle-info';

    const descripcion = document.createElement('p');
    descripcion.className = 'detalle-descripcion';
    descripcion.textContent = juego.description || juego.short_description || '';

    const metaGrid = document.createElement('div');
    metaGrid.className = 'detalle-meta-grid';
    metaGrid.innerHTML = `
      <div class="meta-item"><span>Género:</span> ${juego.genre || '-'}</div>
      <div class="meta-item"><span>Plataforma:</span> ${juego.platform || '-'}</div>
      <div class="meta-item"><span>Editor:</span> ${juego.publisher || '-'}</div>
      <div class="meta-item"><span>Desarrollador:</span> ${juego.developer || '-'}</div>
      <div class="meta-item"><span>Lanzamiento:</span> ${juego.release_date || '-'}</div>
    `;

    const botonFavorito = document.createElement('button');
    botonFavorito.type = 'button';
    botonFavorito.className = 'btn-primario btn-favorito-detalle';
    botonFavorito.textContent = esFavorito(juego.id) ? '★ Quitar de favoritos' : '☆ Agregar a favoritos';
    botonFavorito.addEventListener('click', () => {
      const quedoFavorito = alternarFavorito(juego);
      botonFavorito.textContent = quedoFavorito ? '★ Quitar de favoritos' : '☆ Agregar a favoritos';
      mostrarToast(
        quedoFavorito ? `"${juego.title}" agregado a favoritos` : `"${juego.title}" quitado de favoritos`,
        quedoFavorito ? 'favorito-agregado' : 'favorito-quitado'
      );
    });

    infoBloque.append(descripcion, metaGrid, botonFavorito);

    if (juego.game_url) {
      const linkOficial = document.createElement('a');
      linkOficial.className = 'btn-secundario btn-oficial';
      linkOficial.href = juego.game_url;
      linkOficial.target = '_blank';
      linkOficial.rel = 'noreferrer';
      linkOficial.textContent = '🌐 Sitio oficial del juego';
      infoBloque.appendChild(linkOficial);
    }

    detalleContenedor.append(imagen, infoBloque);
    main.appendChild(detalleContenedor);

    if (juego.minimum_system_requirements) {
      const requisitos = juego.minimum_system_requirements;
      const seccionReq = document.createElement('div');
      seccionReq.className = 'detalle-requisitos';

      const tituloReq = document.createElement('h2');
      tituloReq.className = 'seccion__titulo';
      tituloReq.innerHTML = '<span class="seccion__icono">💻</span> Requisitos mínimos';

      const lista = document.createElement('ul');
      lista.className = 'requisitos-lista';

      ['os', 'processor', 'memory', 'graphics', 'storage'].forEach((clave) => {
        if (requisitos[clave]) {
          const item = document.createElement('li');
          item.innerHTML = `<strong>${clave.toUpperCase()}:</strong> ${requisitos[clave]}`;
          lista.appendChild(item);
        }
      });

      seccionReq.append(tituloReq, lista);
      main.appendChild(seccionReq);
    }

    if (juego.screenshots && juego.screenshots.length > 0) {
      const seccionCapturas = document.createElement('div');
      seccionCapturas.className = 'detalle-capturas';

      const tituloCapturas = document.createElement('h2');
      tituloCapturas.className = 'seccion__titulo';
      tituloCapturas.innerHTML = '<span class="seccion__icono">📸</span> Capturas';

      const gridCapturas = document.createElement('div');
      gridCapturas.className = 'capturas-grid';

      juego.screenshots.forEach((captura) => {
        const img = document.createElement('img');
        img.className = 'captura-img';
        img.src = captura.image;
        img.alt = `Captura de ${juego.title}`;
        img.loading = 'lazy';
        img.decoding = 'async';
        gridCapturas.appendChild(img);
      });

      seccionCapturas.append(tituloCapturas, gridCapturas);
      main.appendChild(seccionCapturas);
    }

    const volver = document.createElement('div');
    volver.className = 'detalle-volver';
    const enlaceVolver = document.createElement('a');
    enlaceVolver.className = 'enlace-volver';
    enlaceVolver.href = 'javascript:history.back()';
    enlaceVolver.textContent = '← Volver atrás';
    volver.appendChild(enlaceVolver);
    main.appendChild(volver);
  } catch (error) {
    console.error('Error al cargar el detalle:', error);
    main.innerHTML = `
      <div class="seccion-header">
        <h1 class="seccion__titulo"><span class="seccion__icono">⚠️</span> Error</h1>
      </div>
    `;
    const mensaje = document.createElement('p');
    mensaje.className = 'mensaje-error';
    mensaje.textContent = error.message || 'Ocurrió un error al consultar la API.';
    main.appendChild(mensaje);

    const volver = document.createElement('div');
    volver.className = 'detalle-volver';
    const enlaceVolver = document.createElement('a');
    enlaceVolver.className = 'enlace-volver';
    enlaceVolver.href = '#/';
    enlaceVolver.textContent = '← Volver al inicio';
    volver.appendChild(enlaceVolver);
    main.appendChild(volver);
  }
}
