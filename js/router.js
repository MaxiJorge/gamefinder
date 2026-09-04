// Router mínimo basado en el hash de la URL (#/ruta).
// 1. Cada vista se registra con un "patrón" de ruta, por ejemplo '/detalle/:id'.
// 2. Cuando cambia el hash de la URL, comparamos esa ruta actual contra cada
//patrón registrado, parte por parte (separando por '/').
// 3. Si todas las partes coinciden (o son un parámetro, como ':id'), esa es
//la vista que hay que mostrar.

const rutasRegistradas = [];

export function definirRuta(patron, render) {
  rutasRegistradas.push({ patron, render });
}

function compararConPatron(patron, rutaActual) {
  const partesPatron = patron.split('/').filter((parte) => parte !== '');
  const partesRuta = rutaActual.split('/').filter((parte) => parte !== '');

  if (partesPatron.length !== partesRuta.length) {
    return null;
  }

  const parametros = {};

  for (let i = 0; i < partesPatron.length; i++) {
    const partePatron = partesPatron[i];
    const parteRuta = partesRuta[i];
    const esParametro = partePatron.startsWith(':');

    if (esParametro) {

      const nombreParametro = partePatron.slice(1);
      parametros[nombreParametro] = parteRuta;
    } else if (partePatron !== parteRuta) {
      return null;
    }
  }

  return parametros;
}

function obtenerRutaActual() {
  const hash = window.location.hash.replace('#', '');
  return hash === '' ? '/' : hash;
}

async function mostrarVistaSegunRuta(contenedor) {
  const rutaActual = obtenerRutaActual();

  for (const rutaRegistrada of rutasRegistradas) {
    const parametros = compararConPatron(rutaRegistrada.patron, rutaActual);

    if (parametros !== null) {
      contenedor.innerHTML = '';
      await rutaRegistrada.render(contenedor, parametros);
      window.scrollTo(0, 0);
      return;
    }
  }

  contenedor.innerHTML = '<main><p>Página no encontrada.</p></main>';
}

export function iniciarRouter(contenedor) {
  window.addEventListener('hashchange', () => mostrarVistaSegunRuta(contenedor));
  mostrarVistaSegunRuta(contenedor);
}