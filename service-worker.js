self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('chatbot-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/offline.html',  // Dodajte offline.html za keširanje
                '/style.css',
                '/app.js',
                '/manifest.json',
                '/icon-192x192.png',
                '/icon-512x512.png',
                '/favicon.ico',
                '/apple-touch-icon.png',
                '/apple-touch-icon-precomposed.png',
                '/apple-touch-icon-120x120.png'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Pokušaj da dohvatimo iz cache-a ili iz mreže
            return response || fetch(event.request).catch(() => {
                // Ako nije moguće preuzeti resurs, vratimo offline.html
                if (event.request.url.includes('.html')) {
                    return caches.match('/offline.html');
                }
                return caches.match(event.request);  // Ostale vrste resursa vraćaju cache ako postoji
            });
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['chatbot-cache'];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
