let contenedorToasts = null;

function obtenerContenedor() {
  if (!contenedorToasts) {
    contenedorToasts = document.createElement('div');
    contenedorToasts.className = 'toast-contenedor';
    document.body.appendChild(contenedorToasts);
  }
  return contenedorToasts;
}

export function mostrarToast(mensaje, tipo = 'info') {
  const contenedor = obtenerContenedor();

  const toast = document.createElement('div');
  toast.className = `toast toast--${tipo}`;
  toast.textContent = mensaje;
  contenedor.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('toast--visible');
  });

  const ocultarYQuitar = () => {
    toast.classList.remove('toast--visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  };

  setTimeout(ocultarYQuitar, 2500);
}
