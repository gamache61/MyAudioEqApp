// FIXED: Updated version to 1.0.1.1 to force cache refresh
const CACHE_NAME = 'myaudioeqapp-v1.0.1.1'; 
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // UPDATED: Version log to v1.0.1.1
      console.log('MyAudioEqApp: Caching version 1.0.1.1');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => {
                console.log('MyAudioEqApp: Deleting old cache:', key);
                return caches.delete(key);
            })
      );
    })
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});