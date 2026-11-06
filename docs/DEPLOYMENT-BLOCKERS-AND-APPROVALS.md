# Deployment Blockers and Approvals

Decision: **PACKAGE PARTIALLY VERIFIED — SPECIFIC ISSUES REMAIN**

## Blocking items

| Status | Item | Evidence missing | Required action/owner |
|---|---|---|---|
| BLOCKED | Production release parity | Current live site still serves the old SPA shell | Authorized deployer must upload reviewed `dist/` package and record release identifier |
| BLOCKED | PHP execution and mail delivery | Local preview cannot execute PHP; no staging mailbox test | Hosting provider must confirm PHP/mail support; release owner must authorize a safe staging submission |
| PARTIALLY VERIFIED | Unknown-route HTTP behavior | Vite preview returns homepage with 200 for unknown paths | Frontend/hosting owner must choose and test true Apache 404 versus client-side NotFound behavior |
| BLOCKED | Production backup | No archive or checksum was created in this audit | Authorized deployer must create and verify a document-root backup before upload |
| PARTIALLY VERIFIED | cPanel compatibility | Document root, modules, PHP version, environment-variable mechanism, and SSL proxy are unknown | Hosting provider must confirm each item |
| PARTIALLY VERIFIED | Corporate/regulatory data | Local values exist but were not independently verified in this audit | Company management must approve legal identifiers, contact details, and claims |

## Confirmed safe boundaries

- No deployment, DNS change, cPanel change, production file change, or real enquiry was performed.
- Generated route HTML and root-relative assets are complete locally.
- Sitemap contains 21 URLs and robots references the intended sitemap.
- `dist/api/submit.php` is present and contains no detected credential literal.

## Approval gate

Do not release until the blockers above have named owners and evidence. After approval, follow [CPANEL-DEPLOYMENT-RUNBOOK.md](./CPANEL-DEPLOYMENT-RUNBOOK.md), [ROLLBACK-AND-RECOVERY-PLAN.md](./ROLLBACK-AND-RECOVERY-PLAN.md), and [PRODUCTION-SMOKE-TEST-CHECKLIST.md](./PRODUCTION-SMOKE-TEST-CHECKLIST.md).

