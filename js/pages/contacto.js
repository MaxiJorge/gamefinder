export function renderContacto(contenedor) {
  const main = document.createElement('main');
  main.className = 'pagina-general';

  main.innerHTML = `
    <div class="seccion-header">
      <h1 class="seccion__titulo"><span class="seccion__icono">✉️</span> Contacto</h1>
      <p class="seccion__subtitulo">¿Tenés alguna duda o sugerencia? ¡Escribinos!</p>
    </div>

    <form class="form-contacto" id="form-contacto">
      <div class="form-grupo">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required>
      </div>

      <div class="form-grupo">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" name="email" placeholder="tu@email.com" required>
      </div>

      <div class="form-grupo">
        <label for="asunto">Asunto</label>
        <input type="text" id="asunto" name="asunto" placeholder="¿De qué trata tu mensaje?" required>
      </div>

      <div class="form-grupo">
        <label for="mensaje">Mensaje</label>
        <textarea id="mensaje" name="mensaje" rows="5" placeholder="Escribí tu mensaje acá..." required></textarea>
      </div>

      <button type="submit" class="btn-primario">Enviar mensaje</button>
    </form>
    
    <div id="mensaje-feedback" class="mensaje-feedback oculto">
      ¡Gracias por tu mensaje! Nos pondremos en contacto pronto.
    </div>

    <div class="seccion-footer">
      <h1 class="seccion__titulo"><span class="seccion__icono">📍</span> Encontranos en:</h1>
    </div>
  `;

  contenedor.appendChild(main);

  const form = main.querySelector('#form-contacto');
  const feedback = main.querySelector('#mensaje-feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    feedback.classList.remove('oculto');
    feedback.classList.add('exito');
  });
}
