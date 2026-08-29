# Deployment contract

Deployment automation is intentionally excluded. Each product chooses its hosting provider and release strategy.

Deploy the contents of `build/client` to a web server or static host with these rules:

1. Serve existing files normally.
2. Rewrite unknown, extensionless routes to `/index.html` with a successful response.
3. Do not apply long-lived caching to `index.html`, `sw.js`, or `manifest.webmanifest`.
4. Cache fingerprinted JavaScript and CSS assets immutably.
5. Serve the site over HTTPS.
6. Preserve the service-worker scope at the application root.

The included Nginx configuration is an executable example. Adapt its security headers to the external services a real product uses, especially Content Security Policy and connection targets.
