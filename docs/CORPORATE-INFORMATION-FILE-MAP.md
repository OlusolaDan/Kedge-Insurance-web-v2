# Corporate Information File Map

| Purpose | File | Key symbols/sections |
|---|---|---|
| Single-source corporate configuration | [src/data/companyConfig.ts](../src/data/companyConfig.ts) | `COMPANY_CONFIG` |
| Browser JSON-LD and page SEO | [src/data/seo.ts](../src/data/seo.ts) | `createStructuredData`, `applyPageSeo` |
| Shared visual identity | [src/components/common/BrandLogo.tsx](../src/components/common/BrandLogo.tsx) | `BrandLogo` |
| Header identity/contact | [src/components/layout/Header.tsx](../src/components/layout/Header.tsx) | `COMPANY_CONFIG.phoneNumbers.primary` |
| Footer regulatory/contact display | [src/components/layout/Footer.tsx](../src/components/layout/Footer.tsx) | regulatory block, office contact block |
| Homepage corporate summary | [src/pages/HomePage.tsx](../src/pages/HomePage.tsx) | vision, mission, office contact summary |
| About profile and philosophy | [src/pages/AboutPage.tsx](../src/pages/AboutPage.tsx) | company profile, identifiers, vision, mission, values |
| Contact channels | [src/pages/ContactPage.tsx](../src/pages/ContactPage.tsx) | address, phone, email, office hours |
| Claims support contact | [src/pages/ClaimsAssistancePage.tsx](../src/pages/ClaimsAssistancePage.tsx) | `claimsSupport` |
| Legal notices | [src/pages/PrivacyPolicyPage.tsx](../src/pages/PrivacyPolicyPage.tsx), [src/pages/TermsPage.tsx](../src/pages/TermsPage.tsx) | contact/legal disclosures |
| Static prerender content | [scripts/prerender-content.mjs](../scripts/prerender-content.mjs) | `COMPANY_DETAILS`, route body/footer |
| Static metadata | [src/data/pageSeo.json](../src/data/pageSeo.json) | title, description, heading, noindex |
| Canonical route list | [scripts/sitemap-routes.mjs](../scripts/sitemap-routes.mjs) | `PUBLIC_ROUTES`, `SITE_ORIGIN` |
| Generated output | [dist/](../dist/) | prerendered HTML, assets, PHP, `.htaccess` |

## Correction path

Change approved identity/contact values in [src/data/companyConfig.ts](../src/data/companyConfig.ts) first, then update the build-time `COMPANY_DETAILS` mapping if the static prerender needs the same field. Run `npm run build`, `npm run lint`, and `npm run test:seo`; inspect both React-rendered and prerendered output.

