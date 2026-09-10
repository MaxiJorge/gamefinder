import { obtenerFavoritos } from '../utils/localstorage.js';
import { renderizarListaJuegos } from '../components/listajuegos.js';

export function renderFavoritos(contenedor) {
  const main = document.createElement('main');
  main.className = 'pagina-general';

  main.innerHTML = `
    <div class="seccion-header">
    </div>
  `;

  const grid = document.createElement('div');
  main.appendChild(grid);
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
