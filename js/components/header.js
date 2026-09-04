export function crearHeader() {
  const header = document.createElement('header');
  const enlace = document.createElement('a');
  enlace.href = '#/';
  enlace.textContent = 'GameFinder';
  header.appendChild(enlace);
  return header;
}
