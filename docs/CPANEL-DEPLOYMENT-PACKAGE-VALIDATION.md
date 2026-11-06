# cPanel Deployment Package Validation

Date: 2026-10-31  
Decision: **PACKAGE PARTIALLY VERIFIED — SPECIFIC ISSUES REMAIN**

## Package contents

The generated [dist/](../dist/) contains 21 public route documents plus `services/index.html`, `.htaccess`, `robots.txt`, `sitemap.xml`, `favicon.svg`, `api/submit.php`, JavaScript/CSS chunks, and image/font-supporting assets. No `.env`, credentials, source maps, private keys, SQL dumps, or backup files were found.

### Manifest

The complete generated file manifest, including relative paths and byte sizes, is in [dist-manifest-2026-10-31.txt](./dist-manifest-2026-10-31.txt).

Key files:

| Relative path | Bytes | Status |
|---|---:|---|
| `.htaccess` | 1,817 | VERIFIED |
| `index.html` | 13,996 | VERIFIED |
| `services/motor.html` | 11,285 | VERIFIED |
| `api/submit.php` | 4,403 | VERIFIED |
| `assets/index-CxvPbvRI.js` | 331,562 | VERIFIED |
| `assets/index-DzrPXq7x.css` | 53,205 | VERIFIED |
| `robots.txt` | 92 | VERIFIED |
| `sitemap.xml` | 1,569 | VERIFIED |

## Apache rules

`dist/.htaccess` explicitly maps all generated public routes, preserves `/api/`, serves existing files/directories directly, and falls back to `index.html`. It includes `Options -Indexes`, `DirectoryIndex index.html`, and guarded security headers. `/robots.txt` and `/sitemap.xml` are existing files and therefore bypass fallback. The generated package does not blindly add an apex-to-www redirect.

The direct clean-route behavior remains **PARTIALLY VERIFIED**: Vite preview does not execute `.htaccess` and returned 404 for clean nested paths. The generated Apache rules and route files were inspected, but actual Apache/cPanel behavior was not available. Confirm nested routes and unknown-route behavior on the target host; choose an Apache `ErrorDocument 404` strategy if a true HTTP 404 is required.

## Required hosting confirmation

- Exact cPanel document root.
- Apache `mod_rewrite` and `mod_headers` availability.
- PHP version and JSON/filter/standard mail support.
- Whether `KEDGE_ENQUIRY_EMAIL` can be supplied as a server environment variable.
- Whether `mail()` is enabled and authenticated for the domain.
- SSL/proxy behavior before any apex-to-www rule is introduced.
- Safe staging mailbox and controlled form test authorization.

## Upload safety

Upload only the contents of `dist/` into the confirmed document root, preserving unrelated hosting files. Do not upload the repository, `node_modules`, reports, source files, `.env*`, or development server files. No backup was created by this audit.

