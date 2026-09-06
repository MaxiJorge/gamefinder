const ENLACES = [
  { ruta: '#/', texto: 'Inicio' },
  { ruta: '#/busqueda', texto: 'Búsqueda' },
  { ruta: '#/favoritos', texto: 'Favoritos' },
  { ruta: '#/historial', texto: 'Historial' },
  { ruta: '#/contacto', texto: 'Contacto' },
];

export function crearNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';

  const lista = document.createElement('ul');
  lista.className = 'navbar__lista';

  ENLACES.forEach(({ ruta, texto, icono }) => {
    const item = document.createElement('li');
    item.className = 'navbar__item';

    const enlace = document.createElement('a');
    enlace.className = 'navbar__enlace';
    enlace.href = ruta;

    const iconSpan = document.createElement('span');
    iconSpan.className = 'navbar__icono';
    iconSpan.textContent = icono;

    const textSpan = document.createElement('span');
    textSpan.className = 'navbar__texto';
    textSpan.textContent = texto;

    enlace.appendChild(iconSpan);
    enlace.appendChild(textSpan);
    item.appendChild(enlace);
    lista.appendChild(item);
  });

  nav.appendChild(lista);

  function marcarActivo() {
    const hashActual = window.location.hash || '#/';
    lista.querySelectorAll('a').forEach((enlace) => {
      enlace.classList.toggle('activo', enlace.getAttribute('href') === hashActual);
    });
  }

  window.addEventListener('hashchange', marcarActivo);
  marcarActivo();

  return nav;
}
