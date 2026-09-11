const CACHE_NAME = 'app-shell-v1';

const RECURSOS_SHELL = [
  '/gamefinder/',
  '/gamefinder/index.html',
  '/gamefinder/manifest.json',
  '/gamefinder/image/favicon.png',
  '/gamefinder/image/logo.svg',
  '/gamefinder/icons/icon-192.png',
  '/gamefinder/icons/icon-512.png',

  '/gamefinder/css/styles.css',
  '/gamefinder/css/home.css',
  '/gamefinder/css/base.css',
  '/gamefinder/css/layout/grid.css',
  '/gamefinder/css/components/header.css',
  '/gamefinder/css/components/navbar.css',
  '/gamefinder/css/components/footer.css',
  '/gamefinder/css/components/card.css',
  '/gamefinder/css/components/form.css',
  '/gamefinder/css/components/paginador.css',
  '/gamefinder/css/components/toast.css',
  '/gamefinder/css/components/modal.css',
  '/gamefinder/css/pages/detalle.css',
  '/gamefinder/css/pages/historial.css',

  '/gamefinder/js/main.js',
  '/gamefinder/js/router.js',
  '/gamefinder/js/pwa-init.js',
  '/gamefinder/js/api/freetogameapi.js',
  '/gamefinder/js/utils/localstorage.js',
  '/gamefinder/js/utils/paginacion.js',
  '/gamefinder/js/components/header.js',
  '/gamefinder/js/components/navbar.js',
  '/gamefinder/js/components/footer.js',
  '/gamefinder/js/components/gamecard.js',
  '/gamefinder/js/components/listajuegos.js',
  '/gamefinder/js/components/paginador.js',
  '/gamefinder/js/components/toast.js',
  '/gamefinder/js/components/modalFavorito.js',
  '/gamefinder/js/pages/home.js',
  '/gamefinder/js/pages/busqueda.js',
  '/gamefinder/js/pages/detalle.js',
  '/gamefinder/js/pages/favoritos.js',
  '/gamefinder/js/pages/historial.js',
  '/gamefinder/js/pages/contacto.js',
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(RECURSOS_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys().then((claves) =>
      Promise.all(
        claves.filter((clave) => clave !== CACHE_NAME).map((clave) => caches.delete(clave))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evento) => {
  const url = new URL(evento.request.url);

  // Peticiones a servicios externos siempre a la red.
  if (url.origin !== self.location.origin) {
    return;
  }

  evento.respondWith(
    caches.match(evento.request).then((respuestaCache) => {
      if (respuestaCache) {
        return respuestaCache;
      }

      return fetch(evento.request).then((respuestaRed) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(evento.request, respuestaRed.clone());
          return respuestaRed;
        });
      });
    })
  );
});
