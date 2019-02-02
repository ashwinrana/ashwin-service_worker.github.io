//Check service worker is supported
if('serviceWorker' in navigator){
    console.log('Service Worker is supported')
    //Register Service Worker
    addEventListener('load', function(){
       navigator.serviceWorker
       .register('../sw_cached_site.js')
       .then(reg => console.log('Service Worker is Registered'))
       .catch(error => console.log(`Errors: ${error}`))
    });
}else{
    console.log('Serive Worker is not supported')
}