# Lighthouse Performance Optimisation Log

## Changes already present before this audit

| Area | Change | Verification |
|---|---|---|
| LCP image | Homepage hero is preloaded before route loading; first carousel image is eager/high priority | VERIFIED in source/build; production still serves old output |
| Images | Explicit dimensions and lazy loading added to below-fold About, Industries, Footer, and later slides | VERIFIED in source/build |
| Fonts | Google Font weight requests reduced; `display=swap` retained | VERIFIED in source |
| Startup UI | Stable React Suspense fallback | VERIFIED in source/build |
| Forms | Production Contact/Renewal endpoint corrected; accessible labels/errors improved | VERIFIED in source; mail delivery not tested |
| Headers | Guarded `mod_headers` directives in public/generated `.htaccess` | VERIFIED in generated output; host support remains to confirm |

## Fresh evidence

The live homepage mobile Lighthouse 13.6.0 run measured LCP 10.1 s and TBT 2,310 ms. This indicates that the primary remaining production performance problem is release parity: the reviewed source optimisations are not present in the live generated document. The live HTML is 1,575 bytes with an empty root and old asset hashes.

## Local retest limitation

`vite preview` was reachable at `http://127.0.0.1:4173/`. A subsequent Lighthouse launch failed with `waiting for dynamic debugging port in chrome-err.log` after the production batch, so no local Lighthouse scores are recorded. This is **BLOCKED**, not a performance estimate.

## Recommended next measurement

After the reviewed `dist/` package is served cleanly, run Lighthouse 13.6.0 (or pin and use the original 11.19.0 for an exact historical comparison) against the same routes and settings, repeat homepage mobile at least three times, and retain HTML/JSON artifacts. Compare diagnostics, not just category scores.

