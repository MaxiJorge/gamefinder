export function renderContacto(contenedor) {
  const main = document.createElement('main');
  main.className = 'pagina-general';

  main.innerHTML = `
    <div class="seccion-header">
      <h1 class="seccion__titulo">
        <span class="seccion__icono"></span> Contacto
      </h1>

      <p class="seccion__subtitulo">
        ¿Tenés alguna duda o sugerencia? ¡Escribinos!
      </p>
    </div>

    <form class="form-contacto" id="form-contacto">
      <div class="form-grupo">
        <label for="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Tu nombre"
          required
        >
      </div>

      <div class="form-grupo">
        <label for="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="tu@email.com"
          required
        >
      </div>

      <div class="form-grupo">
        <label for="asunto">Asunto</label>
        <input
          type="text"
          id="asunto"
          name="asunto"
          placeholder="¿De qué trata tu mensaje?"
          required
        >
      </div>

      <div class="form-grupo">
        <label for="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          placeholder="Escribí tu mensaje acá..."
          required
        ></textarea>
      </div>

      <button type="submit" class="btn-primario">
        Enviar mensaje
      </button>
    </form>

    <div id="mensaje-feedback" class="mensaje-feedback oculto">
      ¡Gracias por tu mensaje! Nos pondremos en contacto pronto.
    </div>

    <div class="seccion-footer">
      <h1 class="seccion__titulo">
        <span class="seccion__icono">📍</span> Encontranos en:
      </h1>

      <div
        id="mapa"
        class="mapa-contenedor"
        style="width: 100%; height: 300px; border-radius: 8px;"
      ></div>
    </div>
  `;

  contenedor.appendChild(main);

  emailjs.init('M_kRsVRJOYhYmkytf');

  // Formulario
  const form = main.querySelector('#form-contacto');
  const feedback = main.querySelector('#mensaje-feedback');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    try {
      await emailjs.send('service_bxdyg77', 'template_n5pbtzn', {
        from_name: form.nombre.value,
        from_email: form.email.value,
        subject: form.asunto.value,
        message: form.mensaje.value,
        to_email: 'unajaxel@gmail.com'
      });

      form.style.display = 'none';
      feedback.classList.remove('oculto');
      feedback.classList.add('exito');
    } catch (err) {
      console.error('Error enviando email:', err);
      feedback.textContent = 'Error al enviar. Intentá nuevamente.';
      feedback.classList.remove('oculto', 'exito');
      feedback.classList.add('error');
      btn.disabled = false;
      btn.textContent = 'Enviar mensaje';
    }
  });

  // Mapa
  const mapa = L.map(main.querySelector('#mapa')).setView(
    [-34.9215, -57.9536],
    17
  );

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapa);

  L.marker([-34.9215, -57.9536])
    .addTo(mapa)
    .bindPopup('<b>Catedral de La Plata</b>')
    .openPopup();
}