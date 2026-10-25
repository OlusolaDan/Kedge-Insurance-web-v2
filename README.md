# KEDGE Insurance Brokers website

React and Vite frontend prepared for static cPanel hosting. The production website does not require Node.js. Node.js is still used for local development and building the site on a computer with Node installed.

## Build for cPanel

1. Use Node.js 20+ and npm 10+ on your computer and run `npm install` then `npm run build`.
2. Upload the **contents** of `dist/` to the cPanel document root (usually `public_html/`). The Vite build copies `.htaccess` and `api/submit.php` from `public/`.
3. Select PHP 8.1 or later in cPanel. Set the `KEDGE_ENQUIRY_EMAIL` environment variable to an inbox you control using the hosting provider's supported PHP configuration. Configure and verify PHP `mail()` delivery with the host. If the host disables `mail()`, replace it with authenticated SMTP using a provider-approved PHP mail library before accepting enquiries.
4. Visit the homepage and test each enquiry form using a real inbox before launch. Do not publish until the contact, company and regulatory details below are confirmed.

The Vite build uses relative asset paths, and `.htaccess` routes client-side pages to `index.html`. Apache `mod_rewrite` must be enabled for direct links such as `/services` to load. `api/submit.php` validates submissions server-side and emails them to `KEDGE_ENQUIRY_EMAIL`. It does not keep a database copy. A submission is reported successful only when PHP `mail()` accepts it; configure SPF/DKIM and test actual inbox delivery because acceptance by `mail()` does not guarantee delivery.

## Local development

```sh
npm install
npm run dev
npm run lint
npm run build
```

The local `server.ts` is a development helper and is not part of the cPanel production deployment. Never expose its `/api/submissions` endpoint publicly; it returns submitted personal information and stores data only in memory.

## Pre-publication verification required

The current content includes draft company details and insurance law descriptions. Replace or confirm all of the following with company management and qualified Nigerian insurance/legal reviewers before launch:

- CAC registered name and registration number, NAICOM broker licence and current status, and NCRIB membership.
- Physical office address, telephone numbers, company-domain email accounts, and office hours. Unverified contact values are intentionally suppressed in the site configuration.
- Legal claims and compulsory insurance summaries. Applicability can depend on the specific risk, current legislation, subsidiary regulations and regulator guidance; the website is not legal advice.
- The proposed vision, mission and values, which remain marked as awaiting approval.
- Data controller identity, lawful basis, retention periods, recipient/security details and data-subject contact process in the privacy notice. The form currently emails personal information and does not retain a server-side record.

Company details are centralized in `src/data/companyConfig.ts`. Do not replace pending fields with assumed or illustrative data.
