# Lighthouse Retest Results

Audit date: 2026-10-31  
Status: **PARTIALLY VERIFIED**

## Checks completed

| Check | Result |
|---|---|
| Installed CLI identified | VERIFIED — Lighthouse 13.6.0 |
| Chrome identified | VERIFIED — Chrome 156.0.8078.79 |
| Production reachable | VERIFIED — homepage and sitemap returned HTTP 200 |
| Live homepage mobile audit | VERIFIED — report saved; P35/A91/BP100/SEO92, LCP 10.1 s, TBT 2,310 ms, CLS 0, FCP 2.6 s, Speed Index 7.6 s |
| Production route batch | PARTIALLY VERIFIED — reports saved for completed runs; `NO_FCP` and renderer failures remain |
| Local preview reachable | VERIFIED — `vite preview` responded on port 4173 |
| Local Lighthouse retest | BLOCKED — Chrome launcher could not obtain a dynamic debugging port |
| `npm run build` | VERIFIED — succeeded; only Vite `__dirname` future-loader warning |
| `npm run lint` | VERIFIED — succeeded |
| `npm run test:seo` | VERIFIED — 21 canonical URLs and prerendered routes validated |
| `git diff --check` | VERIFIED — no whitespace errors; existing line-ending warnings only |
| Real form submission | NOT IMPLEMENTED — intentionally not attempted |

## Artifact inventory

Production HTML/JSON reports are stored in [lighthouse-reports/](../lighthouse-reports/), with filenames identifying route, device, and date. The directory contains paired artifacts for completed audits, including homepage, About, Services, service categories, Industries, Insights, Risk Management, Contact, Quote, Claims Assistance, and Renewal.

## Required follow-up

1. Obtain a stable Chrome/Lighthouse execution environment for the local build.
2. Audit every sitemap route in both device modes.
3. Deploy only through the separately approved cPanel runbook; do not use this report as deployment authorization.
4. Re-audit the deployed generated HTML, nested assets, forms, sitemap, and robots file.

