# HTTP 404 Test Results

## Local evidence

| Test | Result |
|---|---|
| Existing `NotFoundPage` located | VERIFIED |
| `NotFoundPage` registered in React app | VERIFIED |
| `dist/404.html` generated | VERIFIED |
| 404 document has branded heading and links | VERIFIED |
| 404 document uses `noindex,follow` | VERIFIED |
| 404 document excluded from sitemap | VERIFIED — sitemap remains 21 URLs |
| Missing 404 asset references | VERIFIED — generated references are root-relative |
| Generated `.htaccess` has `ErrorDocument 404 /404.html` | VERIFIED |
| Generated `.htaccess` has no homepage catch-all | VERIFIED |
| Build/lint/SEO checks | VERIFIED |
| Actual Apache HTTP 404 for invalid URLs | BLOCKED |

## Required Apache-compatible smoke tests

Run these against a staging cPanel document root before release:

```text
/this-page-does-not-exist
/services/unknown-insurance
/about/invalid-section
/random123
/assets/nonexistent-image-test.jpg
```

Expected results:

- Invalid page requests: HTTP 404, branded KEDGE 404 body, no homepage body, no redirect loop.
- Missing asset: HTTP 404 and not an HTML homepage response.
- `/`, `/about`, `/services`, `/services/motor`, `/contact`, `/renewal-enquiry`: HTTP 200 with the intended prerendered document.
- Existing `/assets/...`, `/robots.txt`, `/sitemap.xml`: HTTP 200 with the correct content type.
- `/api/submit.php`: handled by PHP; do not submit real production data.

Apache/cPanel verification is **BLOCKED** because no local Apache-compatible server or authorized staging host is available. Vite preview does not execute `.htaccess` and is not evidence of server-level status behavior.

