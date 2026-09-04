export function crearPaginador({ paginaActual, totalPaginas, onAnterior, onSiguiente }) {
  const contenedor = document.createElement('div');

  const btnAnterior = document.createElement('button');
  btnAnterior.type = 'button';
  btnAnterior.textContent = 'Anterior';
  btnAnterior.disabled = paginaActual <= 1;
  btnAnterior.addEventListener('click', onAnterior);

  const indicador = document.createElement('span');
  indicador.textContent = ` Página ${paginaActual} de ${totalPaginas} `;

  const btnSiguiente = document.createElement('button');
  btnSiguiente.type = 'button';
  btnSiguiente.textContent = 'Siguiente';
  btnSiguiente.disabled = paginaActual >= totalPaginas;
  btnSiguiente.addEventListener('click', onSiguiente);

  contenedor.append(btnAnterior, indicador, btnSiguiente);
  return contenedor;
}
