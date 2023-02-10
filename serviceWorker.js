var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'petstore.webmanifest',
];

self.addEventListener('install', (e)=>{
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((Cache)=>{
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);

        })
    );
});

self.addEventListener('fetch', function (e){
    e.respondWith(
        //check if the cache has the file
        caches.match(e.request).then(function (r){
            console.log('[Service Worker] Fetching resource:' 
            + e.request.url);
            //'r' is the meaning file if it exists in the cache
            return r || fetch(e.request).then(function(response){
                //add the new file to cache 
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response;
                });
            });

        })
    );
});