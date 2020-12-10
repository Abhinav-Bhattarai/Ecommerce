// const cache_name = 'cache-v1'
// const self = this

// self.addEventListener('install', (event)=>{
//     event.waitUntil(
//         caches.open(cache_name).then((cache)=>{
//             return cache.addAll([
//                 'index.html',
//                 '/airbnb-bg.jpg',
//                 '/static/js/bundle.js',
//                 '/static/js/3.chunk.js',
//                 '/static/js/2.chunk.js',
//                 '/static/js/1.chunk.js',
//                 '/static/js/0.chunk.js',
//                 '/static/js/4.chunk.js',
//                 '/static/js/main.chunk.js'
//             ])
//         })
//     )
// })

// self.addEventListener('fetch', (event)=>{
//     if(!navigator.onLine){
//         console.log('offline')
//         event.respondWith(
//             caches.match(event.request).then(()=>{
//                 return fetch(event.request).catch(()=>{})
//             })
//         )
//     }
// })