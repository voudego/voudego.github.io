self.importScripts('data/games.js');

// Files to cache
var cacheName = 'operacional_pwa-v1';
var appShellFiles = [
  '/operacional/',
  '/operacional/index.html',
  '/operacional/app.js',
  '/operacional/style.css',
  '/operacional/fonts/graduate.eot',
  '/operacional/fonts/graduate.ttf',
  '/operacional/fonts/graduate.woff',
  '/operacional/favicon.ico',
  '/operacional/img/js13kgames.png',
  '/operacional/img/bg.png',
  '/operacional/icons/icon-32.png',
  '/operacional/icons/icon-64.png',
  '/operacional/icons/icon-96.png',
  '/operacional/icons/icon-128.png',
  '/operacional/icons/icon-168.png',
  '/operacional/icons/icon-192.png',
  '/operacional/icons/icon-256.png',
  '/operacional/icons/icon-512.png'
];
var gamesImages = [];
for(var i=0; i<games.length; i++) {
  gamesImages.push('data/img/'+games[i].slug+'.jpg');
}
var contentToCache = appShellFiles.concat(gamesImages);

// Installing Service Worker
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

// Fetching content using Service Worker
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: ' + e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
