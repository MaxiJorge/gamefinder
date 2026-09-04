const CLAVE_FAVORITOS = 'favoritos';
const CLAVE_HISTORIAL = 'historial';
const TAMANIO_HISTORIAL = 20;

function leer(clave) {
  return JSON.parse(localStorage.getItem(clave) || '[]');
}

function escribir(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

export function obtenerFavoritos() {
  return leer(CLAVE_FAVORITOS);
}

export function esFavorito(id) {
  return obtenerFavoritos().some((juego) => juego.id === id);
}

export function agregarAFavoritos(juego) {
  const favoritos = obtenerFavoritos();
  if (!favoritos.some((j) => j.id === juego.id)) {
    escribir(CLAVE_FAVORITOS, [...favoritos, juego]);
  }
}

export function eliminarDeFavoritos(id) {
  escribir(CLAVE_FAVORITOS, obtenerFavoritos().filter((j) => j.id !== id));
}

export function alternarFavorito(juego) {
  if (esFavorito(juego.id)) {
    eliminarDeFavoritos(juego.id);
    return false;
  }
  agregarAFavoritos(juego);
  return true;
}


export function obtenerHistorial() {
  return leer(CLAVE_HISTORIAL);
}

export function agregarAlHistorial(item) {
  const historial = obtenerHistorial().filter((i) => i.id !== item.id);
  historial.unshift(item);
  escribir(CLAVE_HISTORIAL, historial.slice(0, TAMANIO_HISTORIAL));
}

export function vaciarHistorial() {
  localStorage.removeItem(CLAVE_HISTORIAL);
}
