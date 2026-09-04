const ENLACES = [
  { ruta: '#/', texto: 'Inicio' },
  { ruta: '#/busqueda', texto: 'Búsqueda' },
  { ruta: '#/favoritos', texto: 'Favoritos' },
  { ruta: '#/historial', texto: 'Historial' },
];

export function crearNavbar() {
  const nav = document.createElement('nav');
  const lista = document.createElement('ul');

  ENLACES.forEach(({ ruta, texto }) => {
    const item = document.createElement('li');
    const enlace = document.createElement('a');
    enlace.href = ruta;
    enlace.textContent = texto;
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
