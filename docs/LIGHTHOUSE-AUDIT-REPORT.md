# KEDGE Lighthouse Audit Report

Audit date: 2026-10-31 (Africa/Lagos)  
Status: **LIGHTHOUSE AUDIT NOT PASSED**

## Executive result

The audit is not passed. The live site is reachable, but it serves an older 1,575-byte SPA shell with an empty `#root` and relative asset URLs. The current repository contains a newer prerendered build, but that build has not been deployed. Lighthouse 13.6.0 measured the live homepage mobile run at Performance 35, LCP 10.1 s, TBT 2,310 ms, FCP 2.6 s, Speed Index 7.6 s, and CLS 0. The mobile result is materially below the stated targets and is not representative of the current local source until the generated output is deployed.

## Environment

- Lighthouse: 13.6.0 (`lighthouse --version`)
- Previous comparison baseline: Lighthouse 11.19.0; scores are not directly comparable across versions.
- Node.js: v24.21.0
- Browser: Google Chrome 156.0.8078.79 (`C:/Program Files/Google/Chrome/Application/chrome.exe`)
- OS: Windows 10, build 10.0.19045.0
- Mobile settings: Lighthouse mobile form factor, simulated throttling, RTT 150 ms, throughput 1,600 Kbps, CPU slowdown 4x.
- Desktop settings: Lighthouse desktop preset.
- Reports: [lighthouse-reports/](../lighthouse-reports/)

## Measured live result

| Route | Device | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS | Speed Index | Status |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| `/` | Mobile | 35 | 91 | 100 | 92 | 2.6 s | 10.1 s | 2,310 ms | 0 | 7.6 s | VERIFIED |

The corresponding HTML and JSON are [homepage-mobile-2026-10-31.report.html](../lighthouse-reports/homepage-mobile-2026-10-31.report.html) and [homepage-mobile-2026-10-31.report.json](../lighthouse-reports/homepage-mobile-2026-10-31.report.json).

## Coverage

Production reports were generated for homepage, About, Services, service-category routes, Industries, Insights, Risk Management, Contact, Quote, Claims Assistance, and Renewal where Chrome completed. The report directory contains paired HTML and JSON files. Some service routes produced `NO_FCP`; the FAQ run caused a Chrome renderer exit. The complete mobile and desktop matrix therefore remains **BLOCKED** by Lighthouse/Chrome execution failures and the stale production shell.

## Root causes

- **LCP:** the live homepage is the old client-only shell; the meaningful hero content is not present in initial HTML and the measured page waits for JavaScript, route rendering, and image discovery. The current source already prioritises the first hero image, but that code is not live.
- **TBT:** the live run performs startup React work against a blank shell and Lighthouse recorded 2,310 ms. The current source has a stable Suspense fallback and reduced font requests, but local retesting was blocked.
- **CLS:** the fresh homepage run recorded CLS 0. The previous repository baseline of 0.51/0.54 is not reproduced by this run; current source includes explicit image dimensions, stable fallback space, and reduced font weights. This is not evidence that live real-user CLS is solved.
- **Production correctness:** `/services/motor` returned HTTP 200 with no H1 and an empty root. Relative `./assets/...` references in nested documents can resolve under the nested path instead of the site asset root.

## Release decision

**LIGHTHOUSE AUDIT NOT PASSED**

Required before reassessment: deploy the reviewed generated output through the approved cPanel process, verify nested-route static HTML and asset resolution, rerun the same Lighthouse version/settings, and complete the missing route matrix. No deployment was performed by this audit.

