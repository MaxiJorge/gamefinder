import { obtenerJuegoPorId } from '../api/freetogameapi.js';
import { agregarAlHistorial, esFavorito, alternarFavorito } from '../utils/localstorage.js';

export async function renderDetalle(contenedor, parametros) {
  const main = document.createElement('main');
  main.innerHTML = '<p>Cargando...</p>';
  contenedor.appendChild(main);

  const { id } = parametros;

  try {
    const juego = await obtenerJuegoPorId(id);
    if (!juego || !juego.id) {
      throw new Error('No se encontró el juego pedido.');
    }

    agregarAlHistorial(juego);

    main.innerHTML = '';

    const titulo = document.createElement('h1');
    titulo.textContent = juego.title;

    const imagen = document.createElement('img');
    imagen.src = juego.thumbnail;
    imagen.alt = juego.title;
    imagen.width = 400;
    imagen.loading = 'lazy';
    imagen.decoding = 'async';

    const descripcion = document.createElement('p');
    descripcion.textContent = juego.description || juego.short_description || '';

    const meta = document.createElement('p');
    meta.textContent = `Género: ${juego.genre || '-'} | Plataforma: ${juego.platform || '-'} | Editor: ${juego.publisher || '-'} | Desarrollador: ${juego.developer || '-'} | Lanzamiento: ${juego.release_date || '-'}`;

    const botonFavorito = document.createElement('button');
    botonFavorito.type = 'button';
    botonFavorito.textContent = esFavorito(juego.id) ? '★ Quitar de favoritos' : '☆ Agregar a favoritos';
    botonFavorito.addEventListener('click', () => {
      const quedoFavorito = alternarFavorito(juego);
      botonFavorito.textContent = quedoFavorito ? '★ Quitar de favoritos' : '☆ Agregar a favoritos';
    });

    main.append(titulo, imagen, descripcion, meta, botonFavorito);

    if (juego.minimum_system_requirements) {
      const requisitos = juego.minimum_system_requirements;
      const tituloReq = document.createElement('h2');
      tituloReq.textContent = 'Requisitos mínimos';
      const lista = document.createElement('ul');

      ['os', 'processor', 'memory', 'graphics', 'storage'].forEach((clave) => {
        if (requisitos[clave]) {
          const item = document.createElement('li');
          item.textContent = requisitos[clave];
          lista.appendChild(item);
        }
      });

      main.append(tituloReq, lista);
    }

    if (juego.screenshots && juego.screenshots.length > 0) {
      const tituloCapturas = document.createElement('h2');
      tituloCapturas.textContent = 'Capturas';
      main.appendChild(tituloCapturas);

      juego.screenshots.forEach((captura) => {
        const img = document.createElement('img');
        img.src = captura.image;
        img.alt = `Captura de ${juego.title}`;
        img.width = 300;
        img.loading = 'lazy';
        img.decoding = 'async';
        main.appendChild(img);
      });
    }

    if (juego.game_url) {
      const p = document.createElement('p');
      const link = document.createElement('a');
      link.href = juego.game_url;
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.textContent = 'Sitio oficial del juego';
      p.appendChild(link);
      main.appendChild(p);
    }

    const volver = document.createElement('p');
    const enlaceVolver = document.createElement('a');
    enlaceVolver.href = '#/busqueda';
    enlaceVolver.textContent = '← Volver a la búsqueda';
    volver.appendChild(enlaceVolver);
    main.appendChild(volver);
  } catch (error) {
    console.error('Error al cargar el detalle:', error);
    main.innerHTML = '';
    const mensaje = document.createElement('p');
    mensaje.textContent = error.message || 'Ocurrió un error al consultar la API.';
    main.appendChild(mensaje);

    const volver = document.createElement('p');
    const enlaceVolver = document.createElement('a');
    enlaceVolver.href = '#/busqueda';
    enlaceVolver.textContent = '← Volver a la búsqueda';
    volver.appendChild(enlaceVolver);
    main.appendChild(volver);
  }
}
