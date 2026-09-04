//El historial registra items visitados
import { obtenerHistorial, vaciarHistorial } from '../utils/localstorage.js';

export function renderHistorial(contenedor) {
  pintar(contenedor);
}

function pintar(contenedor) {
  contenedor.innerHTML = '';

  const main = document.createElement('main');
  const titulo = document.createElement('h1');
  titulo.textContent = 'Historial';
  main.appendChild(titulo);

  const historial = obtenerHistorial();

  if (historial.length === 0) {
    const mensaje = document.createElement('p');
    mensaje.textContent = 'Todavía no visitaste el detalle de ningún juego.';
    main.appendChild(mensaje);
    contenedor.appendChild(main);
    return;
  }

  const btnBorrar = document.createElement('button');
  btnBorrar.type = 'button';
  btnBorrar.textContent = 'Borrar historial';
  btnBorrar.addEventListener('click', () => {
    vaciarHistorial();
    pintar(contenedor); 
  });
  main.appendChild(btnBorrar);

  historial.forEach((juego) => {
    const bloque = document.createElement('div');

    const subtitulo = document.createElement('h3');
    subtitulo.textContent = juego.title;

    const meta = document.createElement('p');
    meta.textContent = `Género: ${juego.genre || '-'} | Plataforma: ${juego.platform || '-'}`;

    const enlace = document.createElement('a');
    enlace.href = `#/detalle/${juego.id}`;
    enlace.textContent = 'Ver detalle';

    bloque.append(subtitulo, meta, enlace, document.createElement('hr'));
    main.appendChild(bloque);
  });

  contenedor.appendChild(main);
}
