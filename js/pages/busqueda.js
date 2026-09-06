import { obtenerJuegos } from '../api/freetogameapi.js';
import { renderizarListaJuegos } from '../components/listajuegos.js';
import { crearPaginador } from '../components/paginador.js';
import { paginar } from '../utils/paginacion.js';

const GENEROS = [
  ['all', 'Todos'],
  ['mmorpg', 'MMORPG'],
  ['shooter', 'Shooter'],
  ['strategy', 'Estrategia'],
  ['moba', 'MOBA'],
  ['racing', 'Carreras'],
  ['sports', 'Deportes'],
  ['social', 'Social'],
  ['card', 'Cartas'],
  ['battle-royale', 'Battle Royale'],
  ['fighting', 'Lucha'],
  ['anime', 'Anime'],
  ['pvp', 'PvP'],
  ['mmofps', 'MMOFPS'],
  ['mmotps', 'MMOTPS'],
  ['3d', '3D'],
  ['2d', '2D'],
  ['survival', 'Supervivencia'],
  ['mmo', 'MMO'],
  ['mmorts', 'MMORTS'],
];

export async function renderBusqueda(contenedor) {
  const main = document.createElement('main');
  main.className = 'pagina-general';

  main.innerHTML = `

    <form class="form-filtros" id="form-filtros">
      <div class="form-grupo">
        <label for="filtro-genero">Género</label>
        <select id="filtro-genero" name="genero">
          ${GENEROS.map(([valor, etiqueta]) => `<option value="${valor}">${etiqueta}</option>`).join('')}
        </select>
      </div>

      <div class="form-grupo">
        <label for="filtro-plataforma">Plataforma</label>
        <select id="filtro-plataforma" name="plataforma">
          <option value="all">Todas</option>
          <option value="pc">PC</option>
          <option value="browser">Navegador</option>
        </select>
      </div>

      <div class="form-grupo">
        <label for="filtro-orden">Ordenar por</label>
        <select id="filtro-orden" name="orden">
          <option value="relevance">Relevancia</option>
          <option value="popularity">Popularidad</option>
          <option value="release-date">Fecha de lanzamiento</option>
          <option value="alphabetical">Alfabético</option>
        </select>
      </div>

      <button type="submit" class="btn-primario">Buscar</button>
    </form>
    
    <div class="resultados-info">
      <p id="contador-resultados" class="contador-resultados"></p>
    </div>
    
    <div id="grid-resultados" class="grid-resultados-contenedor"></div>
    <div id="controles-paginacion" class="controles-paginacion-contenedor"></div>
  `;
  contenedor.appendChild(main);

  const formulario = main.querySelector('#form-filtros');
  const grid = main.querySelector('#grid-resultados');
  const contador = main.querySelector('#contador-resultados');
  const controlesPaginacion = main.querySelector('#controles-paginacion');

  let resultadosCompletos = [];
  let paginaActual = 1;

  function leerFiltros() {
    return {
      genero: formulario.genero.value,
      plataforma: formulario.plataforma.value,
      orden: formulario.orden.value,
    };
  }

  async function buscar() {
    grid.innerHTML = '<p>Buscando...</p>';
    contador.textContent = '';
    controlesPaginacion.innerHTML = '';

    try {
      resultadosCompletos = await obtenerJuegos(leerFiltros());
      paginaActual = 1;
      renderizarPagina();
    } catch (error) {
      console.error('Error al buscar juegos:', error);
      grid.innerHTML = '';
      const mensaje = document.createElement('p');
      mensaje.textContent = 'Ocurrió un error al consultar la API. Probá de nuevo en unos segundos.';
      grid.appendChild(mensaje);
    }
  }

  function renderizarPagina() {
    const { items, paginaActual: pagina, totalPaginas, totalResultados } = paginar(
      resultadosCompletos,
      paginaActual
    );
    paginaActual = pagina;

    contador.textContent = `${totalResultados} resultado(s) encontrado(s)`;
    renderizarListaJuegos(grid, items, 'No hay juegos que coincidan con esos filtros.');

    controlesPaginacion.innerHTML = '';
    controlesPaginacion.appendChild(
      crearPaginador({
        paginaActual,
        totalPaginas,
        onAnterior: () => {
          paginaActual--;
          renderizarPagina();
        },
        onSiguiente: () => {
          paginaActual++;
          renderizarPagina();
        },
      })
    );
  }

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    buscar();
  });

  // Pre-llenar filtros si vienen en la URL (ej: #/busqueda?plataforma=pc)
  const hashUrl = window.location.hash;
  if (hashUrl.includes('?')) {
    const searchParams = new URLSearchParams(hashUrl.split('?')[1]);
    const pGenero = searchParams.get('genero');
    const pPlataforma = searchParams.get('plataforma');
    const pOrden = searchParams.get('orden');

    if (pGenero) formulario.genero.value = pGenero;
    if (pPlataforma) formulario.plataforma.value = pPlataforma;
    if (pOrden) formulario.orden.value = pOrden;
  }

  // Primera carga: todos los juegos, o filtrados si vinieron parámetros
  buscar();
}
