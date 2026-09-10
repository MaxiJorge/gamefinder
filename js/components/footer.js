export function crearFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  const contenido = document.createElement('div');
  contenido.className = 'footer__contenido';

  const marca = document.createElement('div');
  marca.className = 'footer__marca';
  marca.innerHTML = `
    <span class="footer__logo-texto">HispanCollective</span>
  `;

  const descripcion = document.createElement('p');
  descripcion.className = 'footer__descripcion';
  descripcion.textContent = 'Tu comunidad para descubrir, compartir y coleccionar videojuegos.';

  const linksContainer = document.createElement('div');
  linksContainer.className = 'footer__secciones';

  const navSeccion = document.createElement('nav');
  navSeccion.className = 'footer__nav';
  navSeccion.innerHTML = `
    <h4 class="footer__titulo">Navegación</h4>
    <ul class="footer__lista">
      <li><a href="#/" class="footer__link">Inicio</a></li>
      <li><a href="#/busqueda" class="footer__link">Búsqueda</a></li>
      <li><a href="#/favoritos" class="footer__link">Favoritos</a></li>
      <li><a href="#/historial" class="footer__link">Historial</a></li>
      <li><a href="#/contacto" class="footer__link">Contacto</a></li>
    </ul>
  `;

  const legalSeccion = document.createElement('nav');
  legalSeccion.className = 'footer__legal';
  legalSeccion.innerHTML = `
    <h4 class="footer__titulo">Legal</h4>
    <ul class="footer__lista">
      <li><a href="#" class="footer__link">Términos de uso</a></li>
      <li><a href="#" class="footer__link">Política de privacidad</a></li>
      <li><a href="#" class="footer__link">Cookies</a></li>
    </ul>
  `;

  const socialSeccion = document.createElement('div');
  socialSeccion.className = 'footer__social';
  socialSeccion.innerHTML = `
    <h4 class="footer__titulo">Síguenos</h4>
    <div class="footer__redes">
      <a href="#" class="footer__red" aria-label="Twitter/X" target="_blank" rel="noopener">𝕏</a>
      <a href="#" class="footer__red" aria-label="Discord" target="_blank" rel="noopener">💬</a>
      <a href="#" class="footer__red" aria-label="GitHub" target="_blank" rel="noopener">⌘</a>
      <a href="#" class="footer__red" aria-label="Email" target="_blank" rel="noopener">✉️</a>
    </div>
  `;

  linksContainer.appendChild(navSeccion);
  linksContainer.appendChild(legalSeccion);
  linksContainer.appendChild(socialSeccion);

  const copyright = document.createElement('p');
  copyright.className = 'footer__copyright';
  copyright.innerHTML = `&copy; ${new Date().getFullYear()} HispanCollective. Todos los derechos reservados.`;

  contenido.appendChild(marca);
  contenido.appendChild(descripcion);
  contenido.appendChild(linksContainer);
  contenido.appendChild(copyright);
  footer.appendChild(contenido);

  return footer;
}
