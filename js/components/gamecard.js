export function crearTarjetaJuego(juego) {
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

  acciones.append(enlaceDetalle);
  cuerpo.append(titulo, descripcion, tags);

  if (juego.categoria) {
    const favoritoInfo = document.createElement('div');
    favoritoInfo.className = 'card__favorito-info';

    if (juego.prioridad) {
      const prioridad = document.createElement('span');
      prioridad.className = 'card__favorito-dato';
      prioridad.textContent = `Prioridad: ${juego.prioridad}`;
      favoritoInfo.appendChild(prioridad);
    }

    const categoria = document.createElement('span');
    categoria.className = 'card__favorito-dato';
    categoria.textContent = `Categoría: ${juego.categoria}`;
    favoritoInfo.appendChild(categoria);

    if (juego.nota) {
      const nota = document.createElement('p');
      nota.className = 'card__favorito-nota';
      nota.textContent = juego.nota;
      favoritoInfo.appendChild(nota);
    }

    cuerpo.appendChild(favoritoInfo);
  }

  cuerpo.appendChild(acciones);
  contenedor.append(imagen, cuerpo);

  return contenedor;
}
