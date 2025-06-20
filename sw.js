const CACHE_NAME = "jul-sch";
const urlsToCache = [
  "/",
  "/style.css",
  "/manifest.json",
  // Ajoutez ici tous vos fichiers CSS, JS, images, etc.
];

// Installation du service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

// Activation du service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

// Interception des requêtes
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retourne la version en cache ou fait la requête réseau
      return response || fetch(event.request);
    }),
  );
});
