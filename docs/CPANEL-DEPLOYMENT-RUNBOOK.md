# cPanel Deployment Runbook

Status: **NOT IMPLEMENTED** — instructions only; no upload or hosting change was performed.

## Pre-flight

1. Obtain written approval for the content, regulatory identifiers, canonical hostname and release window.
2. Confirm the cPanel account, document root, PHP version, `mod_rewrite`, `mod_headers`, SSL state and mailbox configuration with the hosting provider.
3. Confirm the production build was created from the reviewed worktree and record the release timestamp and local Git status.
4. Run all commands in the readiness report and retain their output.

## Backup

1. In cPanel File Manager or SSH, create a timestamped archive of the complete current document root, including hidden files such as `.htaccess` and every existing `api/` file.
2. Export or record the current `.htaccess`, PHP handler/environment configuration and DNS/SSL redirect settings separately.
3. Store the backup outside the document root and verify that it can be listed and downloaded before changing files.

## Upload

1. Put the existing site into a short maintenance window only if approved; do not delete the old release first.
2. Upload the contents of `dist/` to a new staging/release directory if the host supports it, or upload files carefully into the document root while preserving unrelated files. Preserve the generated `images/` and `assets/` directories and their contents at the document root; do not flatten them or rename files.
3. Merge the approved hostname redirect before the generated route rules. Do not add it until the host confirms HTTPS/proxy behaviour.
4. Confirm `api/submit.php` is executable as PHP and not served as source text.
5. Set `KEDGE_ENQUIRY_EMAIL` through the host-supported mechanism. Never place it in a `VITE_` variable or frontend bundle.

## Verification

Run [PRODUCTION-SMOKE-TEST-CHECKLIST.md](./PRODUCTION-SMOKE-TEST-CHECKLIST.md). In particular, test direct nested routes, assets, `/robots.txt`, `/sitemap.xml`, all three forms with controlled test data, and apex/www/HTTP/HTTPS behaviour.

## Release gate

Proceed only when all critical checks are **VERIFIED** or an explicitly named owner approves a **PARTIALLY VERIFIED** item. A `mail()` accepted response is not proof of inbox delivery.
