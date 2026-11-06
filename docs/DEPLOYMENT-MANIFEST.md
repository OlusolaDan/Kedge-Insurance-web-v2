# cPanel Deployment Manifest

Status: **PARTIALLY VERIFIED** — package contents are verified locally; upload and host behaviour are not verified.

## Upload

Upload the contents of the final `dist/` directory to the cPanel document root, normally `public_html/`:

- Root route HTML: `index.html`, `about.html`, `services.html`, `insurance-directory.html`, `industries.html`, `risk-management.html`, `insights.html`, `contact.html`, `quote.html`, `claims-assistance.html`, `renewal-enquiry.html`, `faq.html`, `privacy-policy.html`, `terms.html`, `coverage-matrix.html`.
- Nested route HTML: `services/index.html`, `services/motor.html`, `services/marine-aviation.html`, `services/property-engineering.html`, `services/liability.html`, `services/life-personal.html`, `services/commercial-specialist.html`.
- `assets/` directory, `favicon.svg`, `.htaccess`, `robots.txt`, `sitemap.xml`.
- `api/submit.php`.

The sitemap contains 21 eligible canonical URLs. `services/index.html` is an additional DirectoryIndex compatibility file and is not a second sitemap URL.

## Preserve, do not overwrite blindly

- Existing cPanel mail/DNS settings, SSL configuration, mailbox settings, backups, and unrelated document-root files.
- Any existing approved PHP endpoints not represented by this package. Compare before upload.
- Host-managed `.htaccess` rules, if present; merge only after review.

## Do not upload

- `src/`, `public/`, `scripts/`, `server.ts`, `node_modules/`, `.git/`, `.env*`, `package*.json`, `vite.config.ts`, `tsconfig.json`, source archives, development fixtures, diagrams, or repository metadata.
- `dist` source maps or debug files if they are introduced by a future build.

## Required cPanel configuration

- Apache `mod_rewrite` for clean routes.
- Apache `mod_headers` for the guarded security headers; the site still functions if the module is unavailable, but headers will be absent.
- PHP 8.1 or later with JSON, filter, random and standard mail support.
- `KEDGE_ENQUIRY_EMAIL` configured using the host-supported PHP environment mechanism.
- Verified mailbox, SPF/DKIM/DMARC policy and an approved sender/reply-to strategy.
- HTTPS certificate for both apex and `www` if the approved redirect covers both hosts.

## Local evidence

- `npm run build`: **VERIFIED**.
- `npm run test:seo`: **VERIFIED**, 21 routes.
- `dist/api/submit.php` byte-matches `public/api/submit.php`: **VERIFIED**.
- No `.env`, credentials, source maps, `node_modules` or source directories found in `dist/`: **VERIFIED**.
- PHP execution and mail delivery: **BLOCKED** locally.
