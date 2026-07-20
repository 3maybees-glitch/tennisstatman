/* TennisStatMan lightweight service worker — app shell + short rankings cache. */
const SHELL_CACHE = "tsm-shell-v2";
const RANKINGS_CACHE = "tsm-rankings-v1";
const RANKINGS_MAX_AGE_MS = 60 * 60 * 1000; // 1 hour

const PRECACHE_URLS = [
  "/offline",
  "/icons/icon-192",
  "/icons/icon-512",
  "/icons/icon-512-maskable",
  "/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) =>
        Promise.all(
          PRECACHE_URLS.map((url) =>
            cache.add(url).catch(() => {
              // One failed asset shouldn't block SW activation.
            }),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== SHELL_CACHE && key !== RANKINGS_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never cache billing / membership — always network.
  if (
    url.pathname.startsWith("/api/stripe") ||
    url.pathname.startsWith("/api/membership")
  ) {
    return;
  }

  // Navigations: network-first, offline fallback.
  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  // Rankings APIs: stale-while-revalidate with a 1h soft TTL.
  if (url.pathname.startsWith("/api/rankings")) {
    event.respondWith(staleWhileRevalidateRankings(request));
    return;
  }

  // Hashed Next static assets: cache-first.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, SHELL_CACHE));
    return;
  }

  // PWA icons / manifest: cache-first.
  if (
    url.pathname.startsWith("/icons/") ||
    url.pathname === "/manifest.webmanifest"
  ) {
    event.respondWith(cacheFirst(request, SHELL_CACHE));
  }
});

async function networkFirstNavigation(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch {
    const cached = await caches.match("/offline");
    return cached ?? Response.error();
  }
}

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
  }
  return response;
}

async function staleWhileRevalidateRankings(request) {
  const cache = await caches.open(RANKINGS_CACHE);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  if (cached && !isCacheExpired(cached)) {
    networkPromise.catch(() => {});
    return cached;
  }

  const network = await networkPromise;
  if (network) return network;
  if (cached) return cached;
  return Response.error();
}

function isCacheExpired(response) {
  const dateHeader = response.headers.get("date");
  if (!dateHeader) return false;
  const age = Date.now() - new Date(dateHeader).getTime();
  return Number.isFinite(age) && age > RANKINGS_MAX_AGE_MS;
}
