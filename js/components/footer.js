export function crearFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  const contenido = document.createElement('div');
  contenido.className = 'footer__contenido';

  const logo = document.createElement('div');
  logo.className = 'footer__logo';
  logo.textContent = 'GameFinder';

  const texto = document.createElement('p');
  texto.className = 'footer__texto';
  texto.innerHTML = '&copy; ' + new Date().getFullYear() + ' GameFinder. Todos los derechos reservados.<br>Desarrollado para encontrar tu próximo juego favorito.';

  const links = document.createElement('div');
  links.className = 'footer__links';
  const linkContacto = document.createElement('a');
  linkContacto.href = '#/contacto';
  linkContacto.className = 'footer__link';
  linkContacto.textContent = 'Contactanos';
  links.appendChild(linkContacto);

  contenido.appendChild(logo);
  contenido.appendChild(texto);
  contenido.appendChild(links);
  footer.appendChild(contenido);

  return footer;
}
