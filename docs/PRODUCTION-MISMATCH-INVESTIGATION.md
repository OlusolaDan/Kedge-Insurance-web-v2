# Production Mismatch Investigation

Date: 2026-10-31  
Decision: **PACKAGE PARTIALLY VERIFIED — SPECIFIC ISSUES REMAIN**

## Finding

The live site and the reviewed repository are different releases. `https://www.kedgeinsure.com.ng/` returned HTTP 200 with a 1,575-byte HTML shell containing an empty `<div id="root"></div>` and old asset hashes (`index-CidisyUc.js`, `index-BewrezkH.css`). `/services/motor` returned the same type of shell and no H1. The current local build contains route-specific prerendered HTML, current asset hashes, the PHP endpoint, sitemap, robots file, and generated Apache rules.

This is **VERIFIED** from live HTTP responses and local filesystem inspection. No production files were changed.

## Why the mismatch exists

The live `Last-Modified` value was 2026-10-25, while the current `dist/` was regenerated during this audit from the reviewed worktree. The evidence supports an incomplete or not-yet-performed cPanel upload; it does not identify the person or deployment event responsible. The deployment runbook still describes the release as instructions only and records no production backup.

## Material comparison

| Item | Live production | Current `dist/` | Result |
|---|---|---|---|
| Homepage HTML | 1,575-byte empty root | 13,996 bytes, prerendered H1/content | PARTIALLY VERIFIED |
| `/services/motor` | 1,575-byte empty root, no H1 | 11,285 bytes, route-specific H1/content | PARTIALLY VERIFIED |
| Asset references | `./assets/...` relative | `/assets/...` root-relative | VERIFIED locally; production stale |
| Sitemap | HTTP 200 old shell response observed | 21 valid `<loc>` entries | VERIFIED locally; live content not equivalent |
| PHP endpoint | Not tested on live | `dist/api/submit.php` present | PARTIALLY VERIFIED |

## Important package issue

The Vite preview server returned 404 for clean nested routes because it does not execute the generated Apache `.htaccess`; this is a tooling limitation, not evidence that cPanel behaves identically. The generated package still has a fallback rule whose unknown-route behavior must be tested on Apache. Confirm whether cPanel should use an Apache `ErrorDocument 404` strategy or retain the client-side NotFound behavior before upload.

## Files inspected

- [vite.config.ts](../vite.config.ts)
- [scripts/generate-prerender.mjs](../scripts/generate-prerender.mjs)
- [scripts/prerender-content.mjs](../scripts/prerender-content.mjs)
- [scripts/sitemap-routes.mjs](../scripts/sitemap-routes.mjs)
- [src/main.tsx](../src/main.tsx)
- [src/App.tsx](../src/App.tsx)
- [public/.htaccess](../public/.htaccess)
- [dist/.htaccess](../dist/.htaccess)
- [public/api/submit.php](../public/api/submit.php)

