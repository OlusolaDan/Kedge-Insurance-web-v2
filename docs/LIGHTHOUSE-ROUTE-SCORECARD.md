# Lighthouse Route Scorecard

Scores are recorded only when Lighthouse produced a valid category result. A dash is not an estimate.

| Route | Mobile | Desktop | Status |
|---|---|---|---|
| `/` | P35, A91, BP100, SEO92; FCP 2.6 s; LCP 10.1 s; TBT 2,310 ms; CLS 0; SI 7.6 s | Report generated | VERIFIED |
| `/about` | Report generated | Report generated | VERIFIED |
| `/services` | Report generated | Report generated | VERIFIED |
| `/insurance-directory` | NO_FCP | — | BLOCKED |
| `/services/motor` | NO_FCP | — | BLOCKED |
| `/services/marine-aviation` | NO_FCP | — | BLOCKED |
| `/services/property-engineering` | NO_FCP | — | BLOCKED |
| `/services/liability` | NO_FCP | — | BLOCKED |
| `/services/life-personal` | Report generated | — | VERIFIED for completion |
| `/services/commercial-specialist` | Report generated | — | VERIFIED for completion |
| `/industries` | Report generated | — | VERIFIED for completion |
| `/risk-management` | Report generated | — | VERIFIED for completion |
| `/insights` | Report generated | — | VERIFIED for completion |
| `/contact` | Report generated | — | VERIFIED; no form submission |
| `/quote` | Report generated | — | VERIFIED; no form submission |
| `/claims-assistance` | Report generated | — | VERIFIED |
| `/renewal-enquiry` | Report generated | — | VERIFIED; no form submission |
| `/faq` | — | — | BLOCKED; Chrome renderer exited |

The report artifacts are in [lighthouse-reports/](../lighthouse-reports/). The complete 21-route mobile/desktop matrix is BLOCKED because the production shell is stale and the Chrome launcher failed during the local retest.

## Baseline comparison

| Metric | Previous desktop | Previous mobile | Fresh live homepage mobile | Status |
|---|---:|---:|---:|---|
| Performance | 62 | 20 | 35 | PARTIALLY VERIFIED |
| Accessibility | 93 | 93 | 91 | PARTIALLY VERIFIED |
| Best Practices | 100 | 100 | 100 | PARTIALLY VERIFIED |
| SEO | 100 | 100 | 92 | PARTIALLY VERIFIED |
| LCP | 1.5 s | 6.3 s | 10.1 s | PARTIALLY VERIFIED |
| TBT | 200 ms | 2,140 ms | 2,310 ms | PARTIALLY VERIFIED |
| CLS | 0.54 | 0.51 | 0 | PARTIALLY VERIFIED |

The historical baseline used Lighthouse 11.19.0; the fresh run used 13.6.0, so scores are directional and not a controlled version-to-version comparison.
