const V = 'haru-v41';

const PRECACHE = [
  './g-guardian-live.html',
  './g02-ai-guide.html',
  './g02-ai-report.html',
  './g03-chat.html',
  './g03-sotong.html',
  './g05-mypage.html',
  './g05-records.html',
  './g06-alert.html',
  './g07-settings.html',
  './g08-billing.html',
  './g09-prescription.html',
  './g10-timeline.html',
  './g03-chat-ai.html',
  './g03-chat-family.html',
  './g03-chat-nurse.html',
  './g03-chat-patient.html',
  './manifest.json',
  './common.css',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './image (16).png',
  './img/간호사.png',
  './img/보호자.png',
  './img/보호자2.png',
  './img/보호자3.png',
  './img/요양보호사.png',
  './img/의사.png',
  './img/환자.png',
  './img/환자2.png',
  './img/환자3.png',
  './img/환자4.png',
  './img/하루안부캐릭터.png',
];

// Install: pre-cache shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(V)
      .then(c => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate: remove old caches, claim clients immediately
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);

  // Cross-origin CDN (fonts, iconify): cache-first, network fallback
  if (url.hostname !== self.location.hostname) {
    e.respondWith(
      caches.match(req).then(hit => {
        if (hit) return hit;
        return fetch(req).then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(V).then(c => c.put(req, clone));
          }
          return res;
        }).catch(() => new Response('', { status: 408 }));
      })
    );
    return;
  }

  // Local images & css: cache-first
  if (/\.(png|jpg|jpeg|webp|svg|css|woff2?)$/i.test(url.pathname)) {
    e.respondWith(
      caches.match(req).then(hit => {
        if (hit) return hit;
        return fetch(req).then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(V).then(c => c.put(req, clone));
          }
          return res;
        });
      })
    );
    return;
  }

  // HTML pages: stale-while-revalidate (show instantly from cache, refresh in background)
  if (req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/') {
    e.respondWith(
      caches.open(V).then(cache =>
        cache.match(req).then(cached => {
          const fetchPromise = fetch(req).then(res => {
            if (res.ok) cache.put(req, res.clone());
            return res;
          }).catch(() => cached);
          return cached || fetchPromise;
        })
      )
    );
  }
});
