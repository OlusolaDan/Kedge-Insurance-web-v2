# Lighthouse Issues and Fixes

## Confirmed findings

| Finding | Severity | Affected route | Root cause | Correction/status | Evidence |
|---|---|---|---|---|---|
| Live homepage has very slow mobile LCP | HIGH | `/` | Production serves an old empty SPA shell; meaningful hero content waits for JavaScript | NOT IMPLEMENTED in production; current local source already preloads/prioritises the hero | Lighthouse JSON: LCP 10.1 s; live HTML is 1,575 bytes with empty `#root` |
| Live mobile startup has high blocking time | HIGH | `/` | Old shell requires client startup before meaningful content | PARTIALLY VERIFIED; source optimisations exist but are not live and local retest is blocked | Lighthouse JSON: TBT 2,310 ms |
| Production nested route has no initial semantic content | CRITICAL | `/services/motor` | Current live document is the old shell, not the generated prerender | NOT IMPLEMENTED in production | HTTP 200, no H1, empty `#root` |
| Several Lighthouse runs produced `NO_FCP` | HIGH | service routes | Production shell/asset resolution and unstable Chrome audit runs | BLOCKED; rerun after reviewed output is deployed and Chrome is stable | JSON reports preserve runtime errors |
| FAQ audit crashed the Chrome renderer | MEDIUM | `/faq` | Lighthouse/Chrome execution failure | BLOCKED | No complete FAQ report was produced |
| Full route/device matrix is incomplete | HIGH | sitemap routes | Time-bounded audit batch stopped after renderer failure | BLOCKED | Report directory inventory |

## Existing source corrections verified in the repository

- Homepage hero preloading and first-slide priority are present in [src/main.tsx](../src/main.tsx) and the hero component.
- Subsequent carousel slides and below-the-fold images use lazy loading and explicit dimensions.
- Google Font requests were reduced and use `display=swap` in [index.html](../index.html).
- The React loading fallback is dimensionally stable in [src/App.tsx](../src/App.tsx).
- Contact and Renewal production requests target `/api/submit.php`; form labels and error associations were improved in [src/pages/ContactPage.tsx](../src/pages/ContactPage.tsx) and [src/pages/RenewalEnquiryPage.tsx](../src/pages/RenewalEnquiryPage.tsx).
- Guarded security headers were added to [public/.htaccess](../public/.htaccess) and generated output. CSP and HSTS remain deferred pending hosting and resource confirmation.

## Not demonstrated by this audit

- No real form was submitted.
- No email delivery was tested.
- No production file, DNS record, cPanel setting, or mailbox was changed.
- No INP or real-user field data was available.
- No claim is made that Lighthouse scores predict ranking or field Core Web Vitals.

