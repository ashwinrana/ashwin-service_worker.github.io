const cacheName = 'v1.0.3';

//Call Install Event
self.addEventListener('install', function(event) {
    console.log('Serive Worker Installed');
});

//Activate Service Worker
self.addEventListener('activate', function(event) {
    console.log('Serive Worker Activated');
    //Remove unwanted caches
    event.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker clearing old cache');
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

//fetech Event
self.addEventListener('fetch', function(event){
    console.log('Server worker Fetching');
    event.respondWith(
        fetch(event.request)
        .then(response => {
            //make clone of response
            const siteClone = response.clone();
            //open a cache
            caches
            .open(cacheName)
            .then(cache => {
                //Add the response to the cache
                cache.put(event.request, siteClone);
            })
            return response;
        }).catch(error => caches.match(error.request).then(response => request))
    )
});