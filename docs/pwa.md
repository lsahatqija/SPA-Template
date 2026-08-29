# PWA behavior

The production build generates a web app manifest and a Workbox service worker. The application shell and fingerprinted static assets are cached. Navigations fall back to `index.html`, allowing installed and offline launches to render the SPA shell.

Updates use a prompt strategy. A waiting service worker does not replace the active application until the user accepts the reload. This avoids changing running code underneath an active session.

API responses and mutations are not cached by default. Every product must decide freshness, retention, privacy, retry, synchronization, and conflict rules before enabling data caching.

PWA installation and service workers require HTTPS in production. Localhost is treated as secure by modern browsers. Test a production build because the development service worker is disabled intentionally.

When changing icons, supply at least 192×192 and 512×512 PNGs plus a maskable 512×512 icon. Keep important artwork inside the maskable safe zone.
