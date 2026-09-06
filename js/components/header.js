export function crearHeader() {
  const header = document.createElement('header');
  header.className = 'header';

  const enlace = document.createElement('a');
  enlace.className = 'header__logo';
  enlace.href = '#/';
  enlace.innerHTML = '<span class="header__logo-icono"><img src="/image/logo.svg" alt="Nombre de la página"></span> GameFinder';

  header.appendChild(enlace);
  return header;
}
