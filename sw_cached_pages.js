const cacheName = 'v1.0.1';
const cacheAssets = [
    'index.html',
    'about.html',
    '/assets/css/style.css',
    '/assets/js/main.js',
    '/assets/default-avatar.png'
];

//Call Install Event
self.addEventListener('install', function(event) {
    console.log('Serive Worker Installed');
    event.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log("Serive Worker Caching Files");
            cache.addAll(cacheAssets);
        })
        .then(function(){
            self.skipWaiting();
        })
    )
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
        fetch(event.request).catch(function(){caches.match(event.request)})
    )
});