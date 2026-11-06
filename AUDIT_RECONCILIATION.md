# KEDGE Insurance Brokers Ltd — Reconciliation Matrix

Audit date: 2026-10-26. Verification was performed against the local Vite/Express preview on port 3001 after the original port 3000 process became unresponsive.

| Feature or page | Existing source | Expected location | Initial status | Action taken | Final status | Verification evidence | Outstanding issue |
|---|---|---|---|---|---|---|---|
| Home | `src/pages/HomePage.tsx` | `/` | VISIBLE AND FUNCTIONAL | Preserved; product selection now targets the directory | VERIFIED | Route and rendered home actions inspected | None |
| About Us | `src/pages/AboutPage.tsx` | `/about` | VISIBLE AND FUNCTIONAL | Preserved | VERIFIED | Direct route loaded with heading | None |
| Approved primary navigation | `src/components/layout/Header.tsx` | Shared header | VISIBLE AND FUNCTIONAL | Preserved five-item structure and dropdown routes | VERIFIED | Desktop and 390px mobile menu inspected | Vite HMR websocket warning is local-process noise |
| Services landing | `src/pages/CategoryServicesPage.tsx` | `/services` | VISIBLE AND FUNCTIONAL | Preserved category-only landing | VERIFIED | Direct route rendered six category cards | None |
| Motor category | `src/pages/CategoryServicesPage.tsx`, `src/data/categoryProducts.ts` | `/services/motor` | VISIBLE AND FUNCTIONAL | Preserved | VERIFIED | Direct route rendered Motor products | None |
| Marine & Aviation category | Same | `/services/marine-aviation` | VISIBLE AND FUNCTIONAL | Preserved | VERIFIED | Direct route rendered category products | None |
| Property & Engineering category | Same | `/services/property-engineering` | VISIBLE AND FUNCTIONAL | Preserved | VERIFIED | Direct route rendered category products | None |
| Liability category | Same | `/services/liability` | VISIBLE AND FUNCTIONAL | Preserved | VERIFIED | Direct route rendered category products | None |
| Life & Personal category | Same | `/services/life-personal` | VISIBLE AND FUNCTIONAL | Preserved | VERIFIED | Direct route rendered category products | None |
| Commercial & Specialist category | Same | `/services/commercial-specialist` | VISIBLE AND FUNCTIONAL | Preserved | VERIFIED | Direct route rendered category products | None |
| Insurance directory/search/filter | `src/pages/ServicesPage.tsx`, `src/data/servicesData.ts` | `/insurance-directory` | MISSING FROM FRONTEND / DISCONNECTED | Added route and reconnected footer and home product selection | VERIFIED | 25 products rendered; category/search controls and detail dialog exercised | The two catalogue data sources remain intentionally distinct (category pages vs detailed directory) |
| Product detail and enquiry CTA | `src/pages/ServicesPage.tsx`, `src/pages/QuotePage.tsx` | Directory cards → `/quote?service=...` | DISCONNECTED | Restored route/state handoff | VERIFIED | Detail dialog opened; quote showed selected Motor product | None |
| Insights | `src/pages/InsightsPage.tsx`, `src/data/insightsData.ts` | `/insights` | VISIBLE AND FUNCTIONAL | Preserved | VERIFIED | Direct route loaded | Individual article content is client-side modal state, not a separate URL |
| Risk Advisory | `src/pages/RiskManagementPage.tsx` | `/news-events/risk-advisory` | VISIBLE AND FUNCTIONAL | Preserved approved alias | VERIFIED | Direct route loaded | None |
| FAQ/search/accordion | `src/pages/FaqPage.tsx` | `/faq` | VISIBLE AND FUNCTIONAL | Preserved | VERIFIED | Direct route loaded; first accordion was expanded and keyboard-semantic buttons were present | None |
| Contact form | `src/pages/ContactPage.tsx` | `/contact` → `/api/contact` | DISCONNECTED in local preview | Reconnected to running Express handler | VERIFIED | Client validation and successful `KDG-ENQ-2026-####` response path | Production delivery still depends on deployment configuration |
| Quote form | `src/pages/QuotePage.tsx` | `/quote` → `/api/quote` | DISCONNECTED in local preview | Reconnected to running Express handler; direct query preselection fixed | VERIFIED | Invalid submission showed field errors; valid submission returned tracking reference | In-memory storage is development-only |
| Renewal form | `src/pages/RenewalEnquiryPage.tsx` | `/renewal-enquiry` → `/api/renewal` | DISCONNECTED in local preview | Reconnected to running Express handler | PARTIALLY VERIFIED | Route/source and handler inspected; valid browser submission not executed | Requires a configured production persistence/delivery strategy |
| Claims support | `src/pages/ClaimsAssistancePage.tsx` | `/claims-assistance` | VISIBLE AND FUNCTIONAL | Preserved footer/contact access | PARTIALLY VERIFIED | Source and route inspected | No automated browser journey run |
| Legal and coverage pages | `src/pages/PrivacyPolicyPage.tsx`, `TermsPage.tsx`, `CoverageMatrixPage.tsx` | Footer routes | VISIBLE AND FUNCTIONAL | Preserved | PARTIALLY VERIFIED | Routes and source inspected | No content/legal review beyond code audit |
| Express API and health check | `server.ts` | `/api/health`, `/api/*` | BACKGROUND FUNCTIONALITY | Used existing handlers; aligned frontend calls | VERIFIED | Quote API returned a reference; health/handler source inspected | `/api/submissions` is an internal unauthenticated development endpoint and must not be exposed in production |
| PHP submission handler | `public/api/submit.php` | Deployment-specific `/api/submit.php` | BACKGROUND FUNCTIONALITY / BLOCKED OR UNVERIFIED | Preserved; local React preview now uses Express endpoints | PARTIALLY VERIFIED | Source validation inspected | Requires PHP runtime and `KEDGE_ENQUIRY_EMAIL`; mail delivery was not tested |
| Build/type checks | `package.json`, `tsconfig.json` | CI/development | BACKGROUND FUNCTIONALITY | Re-run after changes | VERIFIED | `npm run lint`, `npm run build` passed | Build reports existing large-chunk warning and Vite `__dirname` warning |

## Change log

- Added the `/insurance-directory` route for the existing searchable product catalogue.
- Reconnected Home product selection and Footer “Insurance Directory” to that route.
- Fixed direct `/quote?service=...` preselection and query-state handling.
- Changed Contact, Quote, and Renewal forms to call the Express endpoints used by the running local server.

## Verification limitations

- No production deployment, DNS, email delivery, PHP runtime, external insurer, or NAICOM service was exercised.
- No real customer data was used; the quote test used synthetic data and should be removed from any persistent test environment.
- Browser console showed Vite websocket handshake warnings because another local Vite websocket process occupied port 24678; page rendering and API behaviour remained functional.
