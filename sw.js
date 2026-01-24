// FIXED: Incremented version to v1.0.1.0 to force update and updated naming to MyAudioEqApp
const CACHE_NAME = 'myaudioeqapp-v1.0.1.0'; 
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png'
];

// Install Event - Old files are cleared and new ones cached
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // UPDATED: Logging for MyAudioEqApp to confirm asset caching
      console.log('MyAudioEqApp: Caching assets for version v1.0.1.0');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => {
                console.log('MyAudioEqApp: Clearing old cache:', key);
                return caches.delete(key);
            })
      );
    })
  );
});

// Fetch Event - Serve files from cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});