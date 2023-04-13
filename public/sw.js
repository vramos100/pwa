const CACHE_NAME = "pwa";
const urlsToCache = [
  "/",
  // "/index.html",
  "/offline.html",
  "../src/index.tsx",
  "../src/index.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(() => caches.match("/offline.html"));
    })
  );
});

self.addEventListener("active", (event) => {
  event.waitUntil(self.clients.claim());
});
