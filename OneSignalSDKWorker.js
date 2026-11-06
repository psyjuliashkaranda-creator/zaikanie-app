/* уведомления OneSignal + быстрый запуск: страницы приложения хранятся в памяти телефона и обновляются в фоне */
try { importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js"); } catch (e) {}
const CACHE = "zp-1793995287";
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("zp-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET") return;
  const u = new URL(r.url); if (u.origin !== self.location.origin || /OneSignalSDK/.test(u.pathname)) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(r, { ignoreSearch: true });
    const net = fetch(r).then(res => { if (res && res.ok) c.put(r, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  }));
});
