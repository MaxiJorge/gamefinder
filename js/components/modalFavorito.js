import { agregarAFavoritos } from '../utils/localstorage.js';
import { mostrarToast } from './toast.js';

const LIMITE_NOTA = 200;

export function abrirModalAgregarFavorito(juego, onGuardado) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const dialogo = document.createElement('form');
  dialogo.className = 'modal-dialogo';
  dialogo.noValidate = true;

  dialogo.innerHTML = `
    <h2 class="modal-titulo">Agregar a favoritos</h2>
    <p class="modal-subtitulo">${juego.title}</p>

    <div class="modal-campo">
      <label for="modal-prioridad">Prioridad</label>
      <select id="modal-prioridad" name="prioridad">
        <option value="" disabled selected>Seleccioná una prioridad</option>
        ${Array.from({ length: 10 }, (_, i) => i + 1)
          .map((numero) => `<option value="${numero}">${numero}</option>`)
          .join('')}
      </select>
      <span class="modal-error" data-error-para="prioridad"></span>
    </div>

    <div class="modal-campo">
      <label for="modal-categoria">Categoría</label>
      <input type="text" id="modal-categoria" name="categoria" maxlength="40" />
      <span class="modal-error" data-error-para="categoria"></span>
    </div>

    <div class="modal-campo">
      <label for="modal-nota">Nota personal</label>
      <textarea id="modal-nota" name="nota" maxlength="${LIMITE_NOTA}" rows="3"></textarea>
      <span class="modal-contador">0/${LIMITE_NOTA}</span>
    </div>

    <div class="modal-acciones">
      <button type="button" class="btn-secundario" data-accion="cancelar">Cancelar</button>
      <button type="submit" class="btn-primario">Confirmar</button>
    </div>
  `;

  overlay.appendChild(dialogo);
  document.body.appendChild(overlay);
  document.body.classList.add('modal-abierto');

  const inputPrioridad = dialogo.querySelector('#modal-prioridad');
  const inputCategoria = dialogo.querySelector('#modal-categoria');
  const inputNota = dialogo.querySelector('#modal-nota');
  const contadorNota = dialogo.querySelector('.modal-contador');
  const errorPrioridad = dialogo.querySelector('[data-error-para="prioridad"]');
  const errorCategoria = dialogo.querySelector('[data-error-para="categoria"]');

  inputPrioridad.focus();

  inputNota.addEventListener('input', () => {
    contadorNota.textContent = `${inputNota.value.length}/${LIMITE_NOTA}`;
  });

  function cerrar() {
    document.body.classList.remove('modal-abierto');
    document.removeEventListener('keydown', onKeydown);
    overlay.remove();
  }

  function onKeydown(evento) {
    if (evento.key === 'Escape') cerrar();
  }
  document.addEventListener('keydown', onKeydown);

  overlay.addEventListener('click', (evento) => {
    if (evento.target === overlay) cerrar();
  });

  dialogo.querySelector('[data-accion="cancelar"]').addEventListener('click', cerrar);

  dialogo.addEventListener('submit', (evento) => {
    evento.preventDefault();
    errorPrioridad.textContent = '';
    errorCategoria.textContent = '';

    const prioridadValor = Number(inputPrioridad.value);
    const categoriaValor = inputCategoria.value.trim();
    const notaValor = inputNota.value.trim().slice(0, LIMITE_NOTA);

    let valido = true;

    if (!inputPrioridad.value || Number.isNaN(prioridadValor)) {
      errorPrioridad.textContent = 'Seleccioná una prioridad.';
      valido = false;
    }

    if (!categoriaValor) {
      errorCategoria.textContent = 'La categoría es obligatoria.';
      valido = false;
    }

    if (!valido) return;

    agregarAFavoritos(juego, {
      prioridad: prioridadValor,
      categoria: categoriaValor,
      nota: notaValor,
    });

    mostrarToast(`"${juego.title}" agregado a favoritos`, 'favorito-agregado');
    cerrar();
    if (onGuardado) onGuardado();
  });
}
