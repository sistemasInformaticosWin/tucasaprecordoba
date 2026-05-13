/* ═══════════════════════════════════════════════════════════
   Service Worker — Tu Casa Córdoba PWA
   Cachea las páginas y recursos estáticos para uso offline
   ═══════════════════════════════════════════════════════════ */

var CACHE_NAME = 'tucasa-v1';
var STATIC_ASSETS = [
  '/',
  '/index.html',
  '/comprar.html',
  '/exclusivas.html',
  '/lofts.html',
  '/vender.html',
  '/tour-virtual.html',
  '/contacto.html',
  '/sobre-nosotros.html',
  '/blog.html',
  '/zonas.html',
  '/css/styles.css',
  '/js/components.js',
  '/js/main.js',
  '/js/hero.js',
  '/js/inmovilla.js',
  '/favicon.ico'
];

/* Instalación — cachear recursos estáticos */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

/* Activación — limpiar caches viejas */
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; })
            .map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

/* Fetch — Network first, cache fallback */
self.addEventListener('fetch', function (e) {
  /* Solo interceptar GET */
  if (e.request.method !== 'GET') return;
  /* No interceptar peticiones a API externa */
  if (e.request.url.includes('api.inmovilla.com') || e.request.url.includes('matterport')) return;

  e.respondWith(
    fetch(e.request)
      .then(function (response) {
        /* Guardar copia en caché */
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(e.request, clone); });
        return response;
      })
      .catch(function () {
        /* Sin red → devolver desde caché */
        return caches.match(e.request).then(function (cached) {
          return cached || caches.match('/index.html');
        });
      })
  );
});
