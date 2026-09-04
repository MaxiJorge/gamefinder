export const TAMANIO_PAGINA = 10;

export function paginar(arrayCompleto, paginaActual, tamanioPagina = TAMANIO_PAGINA) {
  const totalPaginas = Math.max(1, Math.ceil(arrayCompleto.length / tamanioPagina));
  const paginaValida = Math.min(Math.max(1, paginaActual), totalPaginas);
  const inicio = (paginaValida - 1) * tamanioPagina;

  return {
    items: arrayCompleto.slice(inicio, inicio + tamanioPagina),
    paginaActual: paginaValida,
    totalPaginas,
    totalResultados: arrayCompleto.length,
  };
}
