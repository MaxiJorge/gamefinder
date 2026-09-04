import { obtenerFavoritos } from '../utils/localstorage.js';
import { renderizarListaJuegos } from '../components/listajuegos.js';

export function renderFavoritos(contenedor) {
  const main = document.createElement('main');
  const titulo = document.createElement('h1');
  titulo.textContent = 'Mis favoritos';

  const grid = document.createElement('div');

  main.append(titulo, grid);
  contenedor.appendChild(main);

  function pintar() {
    renderizarListaJuegos(
      grid,
      obtenerFavoritos(),
      'Todavía no agregaste juegos a favoritos.',
      () => pintar() // al tocar el botón, vuelve a pintar la lista actualizada
    );
  }

  pintar();
}
