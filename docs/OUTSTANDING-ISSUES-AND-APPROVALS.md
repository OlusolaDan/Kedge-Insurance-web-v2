# Outstanding Issues and Approvals

## Release blockers

| Item | Status | Missing evidence | Required owner/action |
|---|---|---|---|
| PHP runtime and mail delivery | **BLOCKED** | PHP 8.1+, handler, `mail()`/SMTP and mailbox delivery have not been exercised. | Hosting provider and mailbox owner provide a controlled test. |
| Fresh Lighthouse run | **BLOCKED** | Lighthouse 11.19.0-compatible CLI/browser was unavailable locally. | Engineering runs the specified audit against the final build or staging host. |
| Apex-to-www redirect | **NOT IMPLEMENTED** | DNS, SSL termination and existing redirect ownership are unknown. | Hosting provider confirms and applies one tested rule before route rewrites. |
| Backup and rollback archive | **NOT IMPLEMENTED** | No production backup is accessible from this worktree. | Release manager creates and verifies the cPanel backup. |
| Form abuse controls | **NOT IMPLEMENTED** | No rate limit, CAPTCHA, honeypot or WAF rule exists in the PHP package. | Hosting/security owner selects an approved anti-abuse control. |

## Business and regulatory approvals

- **PARTIALLY VERIFIED:** Confirm legal company name and CAC registration number.
- **PARTIALLY VERIFIED:** Confirm current NAICOM broker licence/status and NCRIB membership.
- **PARTIALLY VERIFIED:** Confirm address, telephone numbers, email accounts, office hours and any branches.
- **PARTIALLY VERIFIED:** Approve proposed vision, mission and values.
- **PARTIALLY VERIFIED:** Have Nigerian insurance/legal reviewers approve compulsory insurance summaries, statutory references, limits and effective dates.
- **PARTIALLY VERIFIED:** Confirm privacy-notice controller identity, lawful basis, retention, recipients, security measures and data-subject contact process.
- **CONFIRMED OBSOLETE:** No separate KEDGE Insurance Management System database or client portal is part of this public static deployment package.

## Performance and security follow-up

- **PARTIALLY VERIFIED:** Initial JavaScript is approximately 331.56 kB / 103.61 kB gzip; Lighthouse attribution and improvement remain unverified.
- **PARTIALLY VERIFIED:** Security headers are guarded in `.htaccess`; HSTS and CSP require host/resource review before activation.
- **PARTIALLY VERIFIED:** Dependency audit reported zero known vulnerabilities, but that does not replace host, PHP or penetration testing.
- **NOT IMPLEMENTED:** Formal WCAG conformance assessment and penetration test.

No item in this document authorises deployment, DNS changes, cPanel changes, mailbox changes or production enquiries.
