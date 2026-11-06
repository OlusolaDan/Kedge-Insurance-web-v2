# Production Smoke-Test Checklist

Status: **NOT IMPLEMENTED** for live production; this is the controlled post-deployment checklist.

## Host and routing

- [ ] `https://www.kedgeinsure.com.ng/` returns the homepage over HTTPS.
- [ ] Apex HTTP/HTTPS requests redirect once to the approved `https://www` URL.
- [ ] Direct requests succeed for `/about`, `/services`, every service category, `/industries`, `/risk-management`, `/insights`, `/contact`, `/quote`, `/claims-assistance`, `/renewal-enquiry`, `/faq`, legal pages and `/coverage-matrix`.
- [ ] An unknown path shows the 404 experience without a server error.
- [ ] Browser refresh and back/forward navigation work.

## SEO and assets

- [ ] Each tested page has the expected title, description, canonical, robots and H1.
- [ ] `/robots.txt` is plain text and points to the `www` sitemap.
- [ ] `/sitemap.xml` is valid XML with 21 `www` URLs.
- [ ] Hero, CSS, JavaScript, fonts and nested-route images load without 404s.
- [ ] No source code, `.env`, PHP source or debug output is publicly exposed.

## Forms

- [ ] Contact empty/invalid fields show accessible errors and do not send a request.
- [ ] Quote step validation, invalid email/phone, consent and loading state work.
- [ ] Renewal validation and consent work.
- [ ] One controlled valid test per form returns the expected reference or safe configuration error.
- [ ] The controlled test reaches the approved staging mailbox; no production enquiry is used for testing.
- [ ] Repeated clicks do not create duplicate requests.

## Responsive/accessibility

- [ ] Mobile navigation opens/closes and all links are reachable by keyboard.
- [ ] Representative 390px, tablet and desktop widths have no horizontal overflow.
- [ ] Form labels, focus indicators, error announcements and button names are usable with keyboard and screen-reader inspection.
- [ ] Reduced-motion preference remains respected.

## Observability and closeout

- [ ] cPanel/PHP logs show no new warnings or fatal errors.
- [ ] Mail delivery and bounce handling are confirmed by the mailbox owner.
- [ ] Smoke-test evidence, release identifier and backup location are recorded.
