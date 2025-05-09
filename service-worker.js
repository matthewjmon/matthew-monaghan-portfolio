const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'styles.css',
    'script.js',
    'Images/CV_pic.jpg',
    'Images/MaTTech.png',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/fonts/bootstrap-icons.woff2?1fa40e8900654d2863d011707b9fb6f2'
];

//Install the service worker and cache assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

//Serve cached assets during the fetch event
self.addEventListener('fetch', (event) => {
    console.log('[Service Worker] Fetching:', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;  // Return cached response if available
                }
                return fetch(event.request).catch((error) => {
                    console.error('Fetch failed:', error);  // Log any fetch error
                    throw error;
                });
            })
    );
});

//Update the service worker and remove old caches
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhiteList.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});