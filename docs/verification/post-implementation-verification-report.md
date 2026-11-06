# KEDGE Website — Post-Implementation Performance Verification

Audit date: 2 November 2026  
Status: **NOT READY — do not deploy**

## Scope

This was a verification-only pass. No production files, DNS, hosting settings, registrar settings, or deployment resources were changed.

Inspected files:

- `index.html`
- `src/index.css`
- `src/components/common/CustomerLogoCarousel.tsx`
- `src/components/layout/Header.tsx`
- `public/.htaccess`
- `scripts/generate-prerender.mjs`
- `scripts/verify-prerender.mjs`
- `scripts/prerender-content.mjs`

## SEO and generated-output verification

The expected 404 wording, **“Page or Resource Not Found,”** is present in the React 404 component and prerender source. The initial failure came from running the prerender script against an already-prerendered `dist/index.html`, which caused stale homepage content to be reused in `dist/404.html`.

After a clean `npm run build`:

- `npm run test:seo` — **VERIFIED**
- 21 canonical routes validated.
- Prerendered metadata, structured data, canonical URLs, semantic HTML, and 404 output validated.

## Fresh Lighthouse evidence

Lighthouse version: **13.6.0**  
Test URL: `https://kedgeinsure.com.ng/`  
Final URL: unchanged; no redirect observed.

| Form factor | Run | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS | Speed Index |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Desktop | 1 | 4 | 93 | 100 | 100 | 5.6 s | 11.2 s | 7,070 ms | 0.507 | 17.0 s |
| Mobile | 1 | 4 | 93 | 100 | 100 | 5.9 s | 11.1 s | 8,320 ms | 0.507 | 17.9 s |

The requested additional repeated runs were started but interrupted before completion. Therefore, no median is reported. The results above are fresh laboratory measurements, not historical stored reports.

## Core Web Vitals assessment

- CLS target ≤0.1: **FAILED** — fresh desktop and mobile CLS were both 0.507.
- LCP target ≤2.5 s: **FAILED** — 11.2 s desktop and 11.1 s mobile.
- INP: **NOT AVAILABLE** as field data; no real-user Core Web Vitals claim is made.
- TBT is also severely degraded in the live deployment.

The Lighthouse report exposed the CLS value but did not provide usable element-level attribution in the returned `layout-shift-elements` data. Browser inspection confirmed that the live page renders the hero, header, logo marquee, content sections, and footer; the live deployment is not the newly generated build because it still references older asset hashes.

## Hostname and cache verification

Both hostnames resolved successfully:

- `https://kedgeinsure.com.ng/` — HTTP 200, no redirect.
- `https://www.kedgeinsure.com.ng/` — HTTP 200 in browser and direct HTTP checks.

Production response headers currently include the security headers, but do **not** include the new cache policy:

- HTML: no `Cache-Control` header observed.
- Fingerprinted JavaScript: HTTP 200, no `Cache-Control` header observed.
- Fingerprinted CSS: HTTP 200, no `Cache-Control` header observed.
- The tested generated asset hash returned 404 because it is not deployed.

The generated local `dist/.htaccess` contains the intended configuration:

- Fingerprinted static assets: `public, max-age=31536000, immutable`.
- HTML documents: `public, max-age=300, must-revalidate`.

This is configuration evidence only; it is not evidence that production serves those headers.

## Visual and functional smoke checks

Browser inspection of both hostnames confirmed visible and accessible representations of:

- Hero carousel and slide controls.
- Desktop navigation and mobile navigation controls.
- Customer-logo marquee and pause control.
- Corporate philosophy section.
- Service cards.
- Contact information and footer.
- WhatsApp contact control.

A complete route-by-route interactive regression pass, form submission, and three-run Lighthouse matrix were not completed in this verification window. No claim is made that those checks passed.

## Comparison with supplied baseline

The supplied baseline was Performance 76, FCP 0.4 s, LCP 1.0 s, TBT 0 ms, CLS 0.521, and Speed Index 1.4 s. The fresh production run is substantially worse for every performance metric except that CLS is marginally lower. This is not a valid improvement comparison because production is serving a different/older deployment than the locally generated output.

## Deployment decision

**NOT READY.** Do not deploy based on this verification.

Required before approval:

1. Resolve the live-production deployment parity problem.
2. Serve the generated build and verify production cache headers.
3. Investigate the live CLS root cause until CLS is ≤0.1.
4. Repeat Lighthouse 13.6.0 for both hostnames with three desktop and three mobile runs where possible.
5. Complete route, form, responsive, carousel, navigation, console, and network regression checks.

