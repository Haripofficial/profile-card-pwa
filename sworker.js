//Files to save in cache
var files = [
  './',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', //caching 3rd party content
  './styles.css',
  './img/logo64.png',
  './img/logo512.png',
  './manifest.json'
];

//Adding `install` event listener
self.addEventListener('install', (event) => {
  console.info('Event: Install');

  event.waitUntil(
    caches.open(cacheName)
    .then((cache) => {
      //[] of files to cache & if any of the file not present `addAll` will fail
      return cache.addAll(files)
      .then(() => {
        console.info('All files are cached');
        return self.skipWaiting(); //To forces the waiting service worker to become the active service worker
      })
      .catch((error) =>  {
        console.error('Failed to cache', error);
      })
    })
  );
});

/*
  FETCH EVENT: triggered for every request made by index page, after install.
*/

//Adding `fetch` event listener
self.addEventListener('fetch', (event) => {
  console.info('Event: Fetch');

  var request = event.request;
  var url = new URL(request.url);
  if (url.origin === location.origin) {
    // Static files cache
    event.respondWith(cacheFirst(request));
  } else {
    // Dynamic API cache
    event.respondWith(networkFirst(request));
  }

  // // Checking for navigation preload response
  // if (event.preloadResponse) {
  //   console.info('Using navigation preload');
  //   return response;
  // }
});
