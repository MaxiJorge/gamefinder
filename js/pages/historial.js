//El historial registra items visitados
import { obtenerHistorial, vaciarHistorial } from '../utils/localstorage.js';

export function renderHistorial(contenedor) {
  pintar(contenedor);
}

function pintar(contenedor) {
  contenedor.innerHTML = '';

  const main = document.createElement('main');
  main.className = 'pagina-general';

  main.innerHTML = `
    <div class="seccion-header">
    </div>
  `;

  const historial = obtenerHistorial();

  if (historial.length === 0) {
    const mensaje = document.createElement('p');
    mensaje.className = 'mensaje-vacio';
    mensaje.textContent = 'Todavía no visitaste el detalle de ningún juego.';
    main.appendChild(mensaje);
    contenedor.appendChild(main);
    return;
  }

  const contenedorBtn = document.createElement('div');
  contenedorBtn.className = 'acciones-historial';

  const btnBorrar = document.createElement('button');
  btnBorrar.type = 'button';
  btnBorrar.className = 'btn-secundario btn-borrar-historial';
  btnBorrar.textContent = '🗑️ Borrar historial';
  btnBorrar.addEventListener('click', () => {
    vaciarHistorial();
    pintar(contenedor);
  });

  contenedorBtn.appendChild(btnBorrar);
  main.appendChild(contenedorBtn);

  const listaHistorial = document.createElement('div');
  listaHistorial.className = 'lista-historial';

  historial.forEach((juego) => {
    const bloque = document.createElement('div');
    bloque.className = 'historial-item card';

    const subtitulo = document.createElement('h3');
    subtitulo.className = 'historial-item__titulo card__titulo';
    subtitulo.textContent = juego.title;

    const meta = document.createElement('p');
    meta.className = 'historial-item__meta card__descripcion';
    meta.textContent = `Género: ${juego.genre || '-'} | Plataforma: ${juego.platform || '-'}`;

    const enlace = document.createElement('a');
    enlace.className = 'historial-item__enlace card__boton';
    enlace.href = `#/detalle/${juego.id}`;
    enlace.textContent = 'Ver detalle';

    bloque.append(subtitulo, meta, enlace);
    listaHistorial.appendChild(bloque);
  });

  main.appendChild(listaHistorial);

  contenedor.appendChild(main);
}
