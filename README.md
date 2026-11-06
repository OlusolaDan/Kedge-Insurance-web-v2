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

### Optional WhatsApp contact

The floating WhatsApp control is intentionally hidden until KEDGE provides an authorised WhatsApp Business number. Set `whatsappBusinessNumber` in `src/data/companyConfig.ts` to the verified international number using digits only (country code included, with no `+`, spaces or punctuation). Confirm that the account is controlled by KEDGE and approved for public enquiries before publishing. The control then opens a WhatsApp conversation with a short general enquiry message; it does not imply that an agent is online.

### Customer logo carousel

The production carousel is intentionally empty until KEDGE confirms both the customer relationship and permission to publish each logo. Follow these steps whenever an approved logo is ready:

1. **Get approval first.** Confirm with KEDGE management that the organisation is a current or approved customer and that KEDGE has permission to display its logo publicly. Do not infer a customer relationship from a publicly available logo.
2. **Prepare the original asset.** Request the approved SVG or transparent PNG from an authorised source. Keep its original colours and proportions; do not crop, recolour, stretch, or add effects. Use a descriptive filename such as `customer-name.svg`.
3. **Add the file to the project.** Create `src/assets/customer-logos/` if it does not exist, then save the approved asset there. The carousel does not link logos to customer websites, so no external URL is needed.
4. **Import the asset.** Open `src/data/customerLogos.ts` and add an import alongside the other asset imports, using the filename you added. For example:

   ```ts
   import customerNameLogo from '../assets/customer-logos/customer-name.svg';
   ```

5. **Add one approved entry.** Add an object to `APPROVED_CUSTOMER_LOGOS` with the organisation's approved display name, imported asset, and meaningful alternative text. For example:

   ```ts
   export const APPROVED_CUSTOMER_LOGOS: CustomerLogo[] = [
     {
       name: 'Approved Customer Name',
       src: customerNameLogo,
       alt: 'Approved Customer Name logo',
     },
   ];
   ```

   Keep one entry per approved customer. The carousel duplicates rendered items internally to create its seamless animation; do not add duplicate records to this array.
6. **Check it locally.** Run `npm run dev`, open the homepage, and confirm the logo is clear, correctly proportioned, and in the expected carousel position. Check a narrow mobile viewport and keyboard/reduced-motion behaviour as well.
7. **Validate the production build.** Run `npm run build` and confirm it completes successfully before deploying. Only approved entries in `APPROVED_CUSTOMER_LOGOS` appear in production; development fixtures are for local visual checks only.

No verified customer-logo assets or display permissions were found in the project when this guide was written, so the production list remains empty. Management must supply and approve each logo before it is added.

#### After approval: promote a development preview to production

If a logo is already being previewed from `src/assets/development-logo-placeholders/` (such as `baba2.png`), approval alone does not publish it. Complete these steps to move it into the production carousel:

1. **Confirm the approved details.** Record the customer’s approved display name and confirm the exact supplied logo file is covered by the permission to publish. Keep that approval with KEDGE’s normal brand or marketing records.
2. **Put the approved asset in the production asset folder.** Create `src/assets/customer-logos/` if needed, then move or copy the approved original logo there. For example, move `baba2.png` from `src/assets/development-logo-placeholders/` to `src/assets/customer-logos/baba2.png`. Use the final approved filename and do not edit the logo artwork.
3. **Register the production asset.** In `src/data/customerLogos.ts`, add an import for the new path:

   ```ts
   import babaLogo from '../assets/customer-logos/baba2.png';
   ```

4. **Add it to the approved list.** Add one object to `APPROVED_CUSTOMER_LOGOS`, preserving any other approved entries. Use the organisation’s approved name and informative alt text:

   ```ts
   {
     name: 'Approved Customer Name',
     src: babaLogo,
     alt: 'Approved Customer Name logo',
   }
   ```

5. **Remove the development preview entry.** Delete the `Baba logo preview` object from `DEVELOPMENT_LOGO_FIXTURES` in the same file. If the asset was moved, its old development-folder path no longer exists. This prevents the preview-only item from appearing alongside the production entry during local development.
6. **Verify locally.** Run `npm run dev`; check the homepage carousel at desktop and mobile widths, and confirm the logo proportions and alt text. The production carousel uses `APPROVED_CUSTOMER_LOGOS`; development placeholders are only shown when that list is empty.
7. **Build and review before deployment.** Run `npm run lint` and `npm run build`. Confirm the build succeeds and the approved logo asset is present in `dist/assets/`. Review the resulting site, then deploy using the project’s normal release process.

Do not treat the logo as approved just because it currently appears in the local development preview. The production list should remain empty until both the customer relationship and permission for the exact logo are confirmed.

Company details are centralized in `src/data/companyConfig.ts`. Do not replace pending fields with assumed or illustrative data.
