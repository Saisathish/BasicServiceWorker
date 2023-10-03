const cacheName = "v1";
const cacheAssets = ["index.html", "about.html", "css/style.css", "js/main.js"];

self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service Worker caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});

self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("service worker: clearing old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  console.log("service worker: fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
