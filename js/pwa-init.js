if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((registro) => console.log('Service Worker registrado:', registro.scope))
      .catch((error) => console.error('Error al registrar el Service Worker:', error));
  });
}
