import { obtenerJuegos } from '../api/freetogameapi.js';
import { renderizarListaJuegos } from '../components/listajuegos.js';

export async function renderHome(contenedor) {
  const main = document.createElement('main');
  const titulo = document.createElement('h1');
  titulo.textContent = 'Juegos destacados';

  const grid = document.createElement('div');
  grid.textContent = 'Cargando...';

  main.append(titulo, grid);
  contenedor.appendChild(main);

  try {
    const juegos = await obtenerJuegos({ orden: 'popularity' });
    renderizarListaJuegos(grid, juegos.slice(0, 8));
  } catch (error) {
    console.error('Error al cargar destacados:', error);
    grid.innerHTML = '';
    const mensaje = document.createElement('p');
    mensaje.textContent = 'No se pudieron cargar los juegos destacados.';
    grid.appendChild(mensaje);
  }
}
