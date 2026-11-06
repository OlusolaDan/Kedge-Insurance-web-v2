# Corporate Information Completeness Report

Date: 2026-10-31  
Decision: **CORPORATE INFORMATION COMPLETE WITH APPROVED EXCEPTIONS.**

## Scope and authoritative source

The primary source is [src/data/companyConfig.ts](../src/data/companyConfig.ts). SEO structured data reads that configuration through [src/data/seo.ts](../src/data/seo.ts). The static prerender copy currently has a parallel `COMPANY_DETAILS` object in [scripts/prerender-content.mjs](../scripts/prerender-content.mjs), which is required by the Node build script but is a maintainability duplication to monitor.

## Comparison

| Information | Approved repository value | Authoritative source | Public website location | Status |
|---|---|---|---|---|
| Registered company name | KEDGE Insurance Brokers Ltd | `COMPANY_CONFIG.legalName` | Header, footer, About, metadata | PRESENT AND CORRECT |
| Trading name | KEDGE Insurance Brokers Ltd | `COMPANY_CONFIG.tradingName` | Brand and footer | PRESENT AND CORRECT |
| Slogan | With You From Now, Into The Future | `COMPANY_CONFIG.brandSlogan` | Brand logo and homepage | PRESENT AND CORRECT |
| NAICOM body | National Insurance Commission (NAICOM) | `COMPANY_CONFIG.regulatory.regulatoryBody` | Footer regulatory block and logos | PRESENT AND CORRECT |
| NAICOM licence | RBC-LIC-903 | `COMPANY_CONFIG.regulatory.naicomLicenceNumber` | About and footer after this change; prerendered About content | PRESENT AND CORRECT |
| NCRIB membership | NCRIB/MBR/896 | `COMPANY_CONFIG.regulatory.ncribMembershipNumber` | About and footer after this change; prerendered About content | PRESENT AND CORRECT |
| CAC registration | RC- 476963 | `COMPANY_CONFIG.regulatory.cacRegistrationNumber` | About and footer after this change | PRESENT AND CORRECT |
| Office address | 20, Oshidehin Street, off Akilo Road; Ogba-Ikeja, Lagos State, Nigeria | `COMPANY_CONFIG.headOffice` | Homepage, Contact, Footer, prerendered footer | PRESENT AND CORRECT |
| Primary telephone | +234 814 636 4641 | `COMPANY_CONFIG.phoneNumbers.primary` | Header mobile, homepage, Contact, Footer, claims | PRESENT AND CORRECT |
| Direct desk | +234 706 721 0112 | `COMPANY_CONFIG.phoneNumbers.directDesk` | Footer and prerendered Contact | PRESENT AND CORRECT |
| General/quote email | info@kedgeinsure.com.ng | `COMPANY_CONFIG.emails.generalEnquiry` / `quoteDesk` | Homepage, Contact, Footer, forms | PRESENT AND CORRECT |
| Claims email | kegdeinsurancebrokers@yahoo.com | `COMPANY_CONFIG.emails.claimsSupport` | Claims Assistance page | PRESENT AND CORRECT |
| Renewal email | `Verified` placeholder, not an email address | `COMPANY_CONFIG.emails.renewals` | No dedicated email displayed | APPROVED BUT NOT DISPLAYED |
| WhatsApp number | 2348146364641 | `COMPANY_CONFIG.whatsappBusinessNumber` | QuickContact link | PRESENT AND CORRECT |
| Office hours | Monday to Friday, 8:30 AM to 4:30 PM (WAT) | `COMPANY_CONFIG.officeHours` | Homepage, Contact, Footer | PRESENT AND CORRECT |
| Company profile | Nigerian insurance brokerage and risk advisory firm | About/Homepage content | About, Homepage, Footer | PRESENT AND CORRECT |
| Vision | Full configured vision statement | `COMPANY_CONFIG.philosophy.vision` | Homepage and About | PRESENT AND CORRECT |
| Mission | Full configured mission statement | `COMPANY_CONFIG.philosophy.mission` | Homepage and About | PRESENT AND CORRECT |
| Seven core values | Integrity, Professionalism, Client Focus, Accountability, Excellence, Innovation, Trust | `COMPANY_CONFIG.philosophy.coreValues` | About page | PRESENT AND CORRECT |
| Philosophy approval state | Proposed and awaiting final executive board ratifications | `COMPANY_CONFIG.philosophy.statusNote` | About page note | APPROVED BUT NOT DISPLAYED |
| Canonical website | https://www.kedgeinsure.com.ng | `scripts/sitemap-routes.mjs`, SEO config | Canonicals, sitemap, robots, JSON-LD | PRESENT AND CORRECT |

## Exceptions

The repository does not contain a real renewal-desk email; it contains the literal placeholder `Verified`. No email was invented. A separate renewal mailbox must be supplied before it can be displayed. The philosophy object explicitly says its statements await executive-board ratification; the current website displays them with that note and therefore does not misrepresent them as ratified.

