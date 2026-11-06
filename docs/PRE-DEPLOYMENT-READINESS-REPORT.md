# KEDGE Insurance Brokers Ltd — Pre-Deployment Readiness Report

Audit date: 2026-10-31  
Target: `https://www.kedgeinsure.com.ng`  
Environment: Windows local worktree, Node/npm, Vite production build, integrated Chromium browser. No live or cPanel access was used.

## Executive decision

**NOT READY FOR DEPLOYMENT**

The repository builds and the static package is structurally sound, but release sign-off is blocked by unverified PHP/mail delivery, unavailable fresh Lighthouse measurements, unconfirmed corporate/regulatory content, and the absence of a host-confirmed apex-to-www redirect and rollback backup. No deployment was performed.

## Findings by severity

### HIGH

1. **Production enquiry delivery is not runtime verified — PARTIALLY VERIFIED.** [public/api/submit.php](../public/api/submit.php) exists, validates JSON and calls `mail()`, but PHP is not installed locally and no staging mailbox was available. A hosting provider must confirm PHP 8.1+, `mail()` or approved SMTP, sender policy, and actual inbox delivery.
2. **Fresh Lighthouse evidence is unavailable — BLOCKED.** Lighthouse 11.19.0, a local Edge/Chrome executable, and a DevTools Lighthouse interface were not available. The supplied baseline is retained, but no after-score or Core Web Vitals sign-off is claimed.
3. **Public form abuse controls are not implemented — NOT IMPLEMENTED.** The endpoint has validation and a 20,000-byte body limit but no CAPTCHA, honeypot, IP throttling, or host-level rate limit. cPanel/WAF/mail abuse controls must be selected before launch.

### MEDIUM

1. **Canonical apex redirect is not implemented — NOT IMPLEMENTED.** The site emits `www` canonicals, but DNS/SSL/proxy ownership is unknown. The host must confirm that an HTTPS apex-to-www rule can be placed before route rewrites without a loop.
2. **Corporate and regulatory facts require approval — PARTIALLY VERIFIED.** CAC, NAICOM, NCRIB, address, phone, email, branches, licensing and regulatory summaries are present in content/configuration but were not independently authenticated in this audit.
3. **Font/layout and startup performance remain unmeasured — PARTIALLY VERIFIED.** Image dimensions, hero priority, lazy loading, reduced font weights and stable Suspense fallback are implemented. The initial JavaScript entry is approximately 331.56 kB / 103.61 kB gzip and the hero JPEG is approximately 258.83 kB; exact LCP/TBT/CLS attribution requires Lighthouse.
4. **No production backup exists in this worktree — NOT IMPLEMENTED.** A cPanel backup must be created and independently verified before upload.

### LOW

1. Vite warns that `__dirname` in [vite.config.ts](../vite.config.ts) will not be supported by a future native config loader. The current build succeeds; migrate to `import.meta.dirname` when the project’s supported Vite/Node baseline permits.
2. [server.ts](../server.ts) contains a development-only in-memory `/api/submissions` inspection endpoint and `Record<string, any>`. It is not part of the static cPanel manifest and must remain local-only.
3. Structured data currently provides Organization and WebSite graphs. BreadcrumbList/Service schema is not required for the current validation, but may be added only when the visible content and canonical page model justify it.

## Audit coverage and evidence

| Area | Status | Evidence |
|---|---|---|
| Repository, scripts, routes and build | **VERIFIED** | [package.json](../package.json), [src/App.tsx](../src/App.tsx), Vite config, scripts and generated output inspected. |
| React/prerender architecture | **VERIFIED** | [src/main.tsx](../src/main.tsx) uses `createRoot`; generated semantic HTML is a fallback and is intentionally not hydrated. |
| 21 public routes and SEO | **VERIFIED** | `npm run test:seo`: 21 canonical URLs and 21 prerendered routes with metadata, JSON-LD and semantic content. |
| Forms and validation | **PARTIALLY VERIFIED** | Contact, Quote and Renewal payloads agree with PHP field contracts; empty Contact validation was exercised. Valid delivery was not sent. |
| PHP execution and email delivery | **BLOCKED** | `php` executable is unavailable locally; cPanel/PHP/mail configuration was not supplied. |
| Security static review | **PARTIALLY VERIFIED** | No credentials found in the generated package; guarded security headers added. Spam controls, host isolation, HTTPS and mail reputation remain external. |
| Lighthouse/CWV | **BLOCKED** | Required runner unavailable. |
| Browser route/regression checks | **VERIFIED** | Local production preview covered Homepage, About, Motor, Contact, Renewal, unknown route, navigation/back, mobile menu and invalid form validation. |
| Live production verification | **NOT IMPLEMENTED** | Explicitly outside scope; no live requests or deployment performed. |

## Safe corrections made

- Limited homepage hero preloading in [src/main.tsx](../src/main.tsx) to `/` so other routes do not download an unused LCP resource.
- Added typed response shapes and accessible labels, descriptions, `aria-invalid`, and alert/status semantics to [ContactPage.tsx](../src/pages/ContactPage.tsx) and [RenewalEnquiryPage.tsx](../src/pages/RenewalEnquiryPage.tsx).
- Added guarded `nosniff`, `SAMEORIGIN`, Referrer-Policy and Permissions-Policy headers to [public/.htaccess](../public/.htaccess) and generated [dist/.htaccess](../dist/.htaccess). CSP and HSTS were deliberately not added without host/proxy confirmation.
- Preserved existing prerendering, routes, design, content, form endpoints and integrations.

## Automated checks

- **VERIFIED:** `npm run lint` — TypeScript completed successfully.
- **VERIFIED:** `npm run build` — Vite build and prerender generation completed successfully.
- **VERIFIED:** `npm run test:seo` — sitemap and prerender validation completed successfully.
- **VERIFIED:** `git diff --check` — no whitespace errors; Git emitted existing line-ending warnings.
- **VERIFIED:** `npm audit --omit=dev --json` — zero reported vulnerabilities in the audited dependency set.
- **BLOCKED:** PHP syntax/runtime test — PHP executable unavailable.
- **BLOCKED:** Lighthouse — required CLI/browser unavailable.

## Required release prerequisites

1. Management verifies all company, contact, CAC, NAICOM, NCRIB and legal/regulatory statements.
2. Hosting provider confirms Apache `mod_rewrite`, `mod_headers`, HTTPS certificate, PHP 8.1+, required extensions, environment-variable support and `mail()`/SMTP behaviour.
3. A staging or controlled mailbox test confirms Contact, Quote and Renewal responses, error handling and actual delivery.
4. A fresh Lighthouse run is captured against the final local build or staging deployment.
5. The current cPanel document root and email configuration are backed up.
6. The host confirms and implements the approved apex-to-www redirect.

See [DEPLOYMENT-MANIFEST.md](./DEPLOYMENT-MANIFEST.md), [CPANEL-DEPLOYMENT-RUNBOOK.md](./CPANEL-DEPLOYMENT-RUNBOOK.md), [ROLLBACK-AND-RECOVERY-PLAN.md](./ROLLBACK-AND-RECOVERY-PLAN.md), [PRODUCTION-SMOKE-TEST-CHECKLIST.md](./PRODUCTION-SMOKE-TEST-CHECKLIST.md), and [OUTSTANDING-ISSUES-AND-APPROVALS.md](./OUTSTANDING-ISSUES-AND-APPROVALS.md).
