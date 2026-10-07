var CACHE = 'zhurnal-v1';
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){
    return c.addAll(['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png']);
  }).then(function(){ self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(clients.claim());
});
self.addEventListener('fetch', function(e){
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function(hit){
      return hit || fetch(e.request).then(function(resp){
        var copy = resp.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
        return resp;
      });
    })
  );
});
