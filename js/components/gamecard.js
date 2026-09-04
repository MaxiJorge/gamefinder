
import { esFavorito, alternarFavorito } from '../utils/localstorage.js';

export function crearTarjetaJuego(juego, onCambioFavorito) {
  const contenedor = document.createElement('article');
  contenedor.className = 'card';

  const imagen = document.createElement('img');
  imagen.className = 'card__imagen';
  imagen.src = juego.thumbnail;
  imagen.alt = juego.title;
  imagen.loading = 'lazy';
  imagen.decoding = 'async';

  const cuerpo = document.createElement('div');
  cuerpo.className = 'card__cuerpo';

  const titulo = document.createElement('h3');
  titulo.className = 'card__titulo';
  titulo.textContent = juego.title;

  const descripcion = document.createElement('p');
  descripcion.className = 'card__descripcion';
  descripcion.textContent = juego.short_description || '';

  const tags = document.createElement('div');
  tags.className = 'card__tags';
  [juego.genre, juego.platform].filter(Boolean).forEach((valor) => {
    const tag = document.createElement('span');
    tag.className = 'card__tag';
    tag.textContent = valor;
    tags.appendChild(tag);
  });

  const acciones = document.createElement('div');
  acciones.className = 'card__acciones';

  const enlaceDetalle = document.createElement('a');
  enlaceDetalle.className = 'card__boton';
  enlaceDetalle.href = `#/detalle/${juego.id}`;
  enlaceDetalle.textContent = 'Ver detalle';

  const botonFavorito = document.createElement('button');
  botonFavorito.type = 'button';
  botonFavorito.className = 'card__favorito';
  const estaEnFavoritos = esFavorito(juego.id);
  botonFavorito.textContent = estaEnFavoritos ? '★' : '☆';
  botonFavorito.classList.toggle('card__favorito--activo', estaEnFavoritos);
  botonFavorito.setAttribute('aria-label', estaEnFavoritos ? 'Quitar de favoritos' : 'Agregar a favoritos');
  botonFavorito.addEventListener('click', () => {
    const quedoFavorito = alternarFavorito(juego);
    botonFavorito.textContent = quedoFavorito ? '★' : '☆';
    botonFavorito.classList.toggle('card__favorito--activo', quedoFavorito);
    botonFavorito.setAttribute('aria-label', quedoFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos');
    if (typeof onCambioFavorito === 'function') {
      onCambioFavorito(quedoFavorito);
    }
  });

  acciones.append(enlaceDetalle, botonFavorito);
  cuerpo.append(titulo, descripcion, tags, acciones);
  contenedor.append(imagen, cuerpo);

  return contenedor;
}
