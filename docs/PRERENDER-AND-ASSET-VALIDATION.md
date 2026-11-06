# Prerender and Asset Validation

Date: 2026-10-31  
Status: **VERIFIED** for the generated local package; **PARTIALLY VERIFIED** for cPanel behavior.

## All 21 sitemap routes

Each route below has a corresponding HTML file, one H1, non-empty root content, a title, description, canonical URL matching the sitemap hostname/path, root-relative asset references, and no accidental `noindex` directive.

| Route | Generated file | Result |
|---|---|---|
| `/` | `dist/index.html` | VERIFIED |
| `/about` | `dist/about.html` | VERIFIED |
| `/services` | `dist/services.html` and `dist/services/index.html` | VERIFIED |
| `/insurance-directory` | `dist/insurance-directory.html` | VERIFIED |
| `/services/motor` | `dist/services/motor.html` | VERIFIED |
| `/services/marine-aviation` | `dist/services/marine-aviation.html` | VERIFIED |
| `/services/property-engineering` | `dist/services/property-engineering.html` | VERIFIED |
| `/services/liability` | `dist/services/liability.html` | VERIFIED |
| `/services/life-personal` | `dist/services/life-personal.html` | VERIFIED |
| `/services/commercial-specialist` | `dist/services/commercial-specialist.html` | VERIFIED |
| `/industries` | `dist/industries.html` | VERIFIED |
| `/risk-management` | `dist/risk-management.html` | VERIFIED |
| `/insights` | `dist/insights.html` | VERIFIED |
| `/contact` | `dist/contact.html` | VERIFIED |
| `/quote` | `dist/quote.html` | VERIFIED |
| `/claims-assistance` | `dist/claims-assistance.html` | VERIFIED |
| `/renewal-enquiry` | `dist/renewal-enquiry.html` | VERIFIED |
| `/faq` | `dist/faq.html` | VERIFIED |
| `/privacy-policy` | `dist/privacy-policy.html` | VERIFIED |
| `/terms` | `dist/terms.html` | VERIFIED |
| `/coverage-matrix` | `dist/coverage-matrix.html` | VERIFIED |

The automated inspection found `h1=1`, non-empty prerender root, canonical route URL, title, description, and `noindex=False` for every row. Structured data was present in generated HTML. Open Graph and Twitter title/description tags were present.

## Asset resolution

Generated root and nested HTML both use `/assets/...`, `/favicon.svg`, and the Google Fonts stylesheet. No `./assets/...` reference was found in the inspected generated pages. The local preview returned HTTP 200 for JavaScript, CSS, favicon, sitemap, and robots requests. Vite preview returned 404 for clean nested paths because it does not execute Apache `.htaccess` rules; route files and rewrite rules were therefore validated from the filesystem, not by claiming Vite preview emulates cPanel.

## Remaining limitation

Vite preview does not execute PHP. The local `/api/submit.php` request therefore cannot establish PHP execution, `mail()` support, or mailbox delivery. cPanel/PHP verification remains **BLOCKED** until the hosting provider confirms PHP behavior and a safe staging mailbox is available.

