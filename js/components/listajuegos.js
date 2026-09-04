import { crearTarjetaJuego } from './gamecard.js';

export function renderizarListaJuegos(contenedor, juegos, mensajeVacio = 'No se encontraron resultados.', onCambioFavorito) {
  contenedor.innerHTML = '';
  contenedor.classList.add('grid-juegos');

  if (!juegos || juegos.length === 0) {
    const mensaje = document.createElement('p');
    mensaje.textContent = mensajeVacio;
    contenedor.appendChild(mensaje);
    return;
  }

  juegos.forEach((juego) => contenedor.appendChild(crearTarjetaJuego(juego, onCambioFavorito)));
}
