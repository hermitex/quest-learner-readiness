/* basic offline-first service worker */
const CACHE_NAME = "quest-pwa-v2";
const OFFLINE_URL = "/offline";
const PRECACHE_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/icon.png",
  "/offline",
  "/services/mocks/readiness.json",
  "/AppIcons/android/mipmap-xxxhdpi/ic_launcher.png",
  "/AppIcons/Assets.xcassets/AppIcon.appiconset/_/512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => (key === CACHE_NAME ? null : caches.delete(key)))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === "navigate") {
          return caches.match(OFFLINE_URL);
        }
        return new Response("", { status: 503, statusText: "Offline" });
      })
  );
});
