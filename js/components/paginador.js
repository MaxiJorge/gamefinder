export function crearPaginador({ paginaActual, totalPaginas, onAnterior, onSiguiente }) {
  const contenedor = document.createElement('div');
  contenedor.className = 'paginador';

  const btnAnterior = document.createElement('button');
  btnAnterior.type = 'button';
  btnAnterior.className = 'paginador__btn btn-secundario';
  btnAnterior.innerHTML = '←';
  btnAnterior.disabled = paginaActual <= 1;
  btnAnterior.addEventListener('click', onAnterior);

  const indicador = document.createElement('span');
  indicador.className = 'paginador__indicador';
  indicador.textContent = `Página ${paginaActual} de ${totalPaginas}`;

  const btnSiguiente = document.createElement('button');
  btnSiguiente.type = 'button';
  btnSiguiente.className = 'paginador__btn btn-secundario';
  btnSiguiente.innerHTML = '→';
  btnSiguiente.disabled = paginaActual >= totalPaginas;
  btnSiguiente.addEventListener('click', onSiguiente);

  contenedor.append(btnAnterior, indicador, btnSiguiente);
  return contenedor;
}
