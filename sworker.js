self.addEventListener("install",e=>{

    e.waitUntil(
        caches.open("static").then(Cache=>{
            return cache.addAll["./","./style.css","./img/logo64.png","./img/logo64.png"]
        })
    )
})

self.addEventListener("fetch",e=>{
    e.respondWith(
        caches.match(e.request).then(response=>{
            return response || fetch(e.request)
        })
    )
})