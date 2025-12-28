const CACHE_NAME = "myeqapp-v9.9";
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon192.png',
  './icon512.png',
  './screenshot1.png',
  './screenshot2.png',
  './screenshot3.png',
  './screenshot4.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});