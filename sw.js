var fileList=[
 "index.html",
 "assets/css/style.css",
 "assets/js/script.js",
 "assets/images/logo.png",
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('sw-cache').then(function(cache) {
      var files;
      for(i=0;i<=fileList.length;i++){
        files += + cache.add(fileList[i]);
      }
      return files;
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});