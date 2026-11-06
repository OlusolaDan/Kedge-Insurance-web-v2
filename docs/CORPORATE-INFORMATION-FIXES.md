# Corporate Information Fixes

## Implemented

1. Updated the React footer regulatory block to use the configured status note and display the approved NAICOM licence, NCRIB membership, and CAC registration identifiers.
2. Updated the About page company profile to use `COMPANY_CONFIG.legalName` and `COMPANY_CONFIG.regulatory.cacRegistrationNumber` instead of a separately typed legal-name/registration variant.
3. Added the approved regulatory identifiers to the About governance disclosure panel.

Changed files:

- [src/components/layout/Footer.tsx](../src/components/layout/Footer.tsx)
- [src/pages/AboutPage.tsx](../src/pages/AboutPage.tsx)

## Not changed deliberately

- `COMPANY_CONFIG.emails.renewals` remains `Verified` because the repository contains no actual renewal mailbox. No replacement was invented.
- The philosophy status note remains visible because the configuration explicitly says the statements await final executive-board ratification.
- The parallel build-time [scripts/prerender-content.mjs](../scripts/prerender-content.mjs) data was not silently rewritten; its existing approved identifiers remain aligned with the configuration for the fields currently prerendered.

## Verification

`npm run lint`, `npm run build`, and `npm run test:seo` passed after the corrections. The generated output was inspected for the approved identifiers and the 21-route SEO validator remained green.

