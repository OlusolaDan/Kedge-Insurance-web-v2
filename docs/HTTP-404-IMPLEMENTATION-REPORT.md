# HTTP 404 Implementation Report

Date: 2026-10-31  
Decision: **HTTP 404 IMPLEMENTED BUT APACHE VERIFICATION BLOCKED.**

## Existing page reused

The existing branded component is [src/pages/NotFoundPage.tsx](../src/pages/NotFoundPage.tsx), exported as `NotFoundPage` and registered in the application switch in [src/App.tsx](../src/App.tsx) for `/404` and the default client-side route. Its design includes the KEDGE brand, 404 heading, explanation, homepage link, services link, and contact link.

The prerender script now emits `dist/404.html` using the same branded text and visual treatment. It has root-relative CSS/JavaScript/favicon references, `noindex,follow`, and is excluded from [scripts/sitemap-routes.mjs](../scripts/sitemap-routes.mjs).

## Apache behavior implemented

- `ErrorDocument 404 /404.html` added to [public/.htaccess](../public/.htaccess) and generated [dist/.htaccess](../dist/.htaccess).
- Explicit rewrite rules remain for all 21 public routes.
- `/api/` remains excluded from SPA routing.
- Existing files and directories are served directly.
- The previous `RewriteRule ^ index.html [L]` catch-all was removed, so unknown paths are no longer intentionally converted to homepage HTTP 200 responses.
- Missing assets and missing PHP paths are left to Apache's normal 404 handling.

## Generated error document

[dist/404.html](../dist/404.html) was generated successfully. It contains the branded 404 content, `noindex,follow`, no sitemap entry, and root-relative asset references. The original HTTP status is expected to be preserved by Apache `ErrorDocument`; this requires a real Apache/cPanel test.

