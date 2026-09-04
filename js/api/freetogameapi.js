const BASE_URL = 'https://www.freetogame.com/api';

async function _fetch(endpoint, params = {}) {
  const url = new URL(BASE_URL + endpoint);

  Object.entries(params).forEach(([clave, valor]) => {
    if (valor && valor !== 'all') {
      url.searchParams.set(clave, valor);
    }
  });

  let response;
  try {
    response = await fetch(url.toString());
  } catch (error) {
    if (!navigator.onLine) {
      throw new Error('Sin conexión a internet.');
    }
    throw new Error('No se pudo conectar con la API.');
  }

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export function obtenerJuegos({ plataforma, genero, orden } = {}) {
  return _fetch('/games', {
    platform: plataforma,
    category: genero,
    'sort-by': orden,
  });
}

export function obtenerJuegoPorId(id) {
  return _fetch('/game', { id });
}
