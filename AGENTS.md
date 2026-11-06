# KEDGE Insurance Brokers Ltd — Engineering Directive

This is a standing project instruction for all website development, redesign, optimisation, bug fixes, feature additions, and refactoring. Apply it to the existing codebase as well as new code.

## Mission

Treat the KEDGE Insurance Brokers Ltd website as a production-grade corporate website: professional, secure, accessible, performant, maintainable, scalable, and SEO-oriented. Before changing anything, inspect the actual repository, stack, routes, components, styles, metadata, content, integrations, and existing functionality. Do not assume a framework, file structure, dependency, architecture, hosting capability, or business claim without verifying it.

## Engineering standards

- Follow DRY, separation of concerns, SOLID where useful, KISS, YAGNI, single responsibility, and composition over inheritance.
- Apply these principles pragmatically. Prefer simple, understandable code over excessive abstraction or deeply nested component structures.
- Reuse existing components, utilities, design tokens, hooks, services, validation, and conventions when they are appropriate.
- Keep presentation, business logic, content, validation, routing, API communication, and configuration appropriately separated.
- Use descriptive names and focused components, functions, modules, routes, and files.
- With TypeScript, preserve strict typing and avoid `any` unless a documented, justified exception is necessary.
- Centralise shared configuration, design tokens, navigation definitions, metadata patterns, and reusable UI patterns where appropriate.
- Keep repeatable content in structured data instead of duplicating large markup blocks.
- Handle errors explicitly; never silently swallow errors or represent failures as success.
- Document non-obvious business rules and architectural decisions.
- Keep dependencies purposeful, maintained, compatible with the existing stack, and limited to justified needs.
- Do not rewrite working features merely because another implementation is possible.
- Preserve working routes, integrations, approved content, and approved design decisions unless the task explicitly authorises a change.

## Required workflow

For every task:

1. **Inspect:** Examine the real repository, relevant files, architecture, dependencies, routes, functionality, and current instruction files.
2. **Diagnose:** Identify the root cause, affected components, regression risks, SEO implications, and constraints.
3. **Plan:** Select the smallest safe, maintainable implementation that satisfies the request.
4. **Implement:** Modify only the required source files and reuse established patterns.
5. **Review:** Inspect the diff for duplication, complexity, security issues, broken routes, metadata omissions, accessibility defects, and unrelated changes.
6. **Verify:** Run appropriate tests, linting, type checks, builds, rendering checks, responsive checks, and SEO validation.
7. **Report:** State changed files, implemented behaviour, verification evidence, unresolved issues, assumptions, and actions requiring authorisation.

Do not modify production files, DNS, email configuration, databases, hosting, or deployment resources without explicit authorisation. Do not deploy, migrate, delete, or overwrite production resources as part of ordinary development work.

## SEO-first requirements

SEO is a continuous architecture, content, implementation, and verification concern. Technical improvements establish discoverability conditions but do not guarantee indexing, rankings, traffic, enquiries, or sales.

### Crawlability and information architecture

- Use stable, meaningful, human-readable URLs and real discoverable links; do not rely exclusively on JavaScript click handlers.
- Ensure client-side routes work on direct visits, refreshes, and navigation and render meaningful content. Evaluate SSR, static generation, or prerendering according to the verified stack and hosting capability.
- Maintain an accurate XML sitemap containing eligible canonical public URLs only.
- Configure `robots.txt` without blocking important pages or resources; exclude private and administrative routes.
- Use canonical URLs consistently. Use `noindex` only for a clear reason.
- Avoid duplicate routes, crawl traps, unnecessary query-parameter variations, orphan pages, broken links, and redirect chains. Provide appropriate redirects when approved public URLs change.
- Maintain logical internal linking between the homepage, service categories, individual services, Insights, Risk Advisory, FAQs, and contact/enquiry pages. Use descriptive anchor text and breadcrumbs where useful.
- Do not expose credentials, confidential information, internal routes, private dashboards, or sensitive application details through public content, metadata, source maps, structured data, or sitemaps.

### Metadata and structured data

- Every indexable public page needs unique, descriptive title text, a relevant meta description, canonical URL, appropriate robots directive, meaningful primary heading, and suitable Open Graph metadata.
- Include language/charset and mobile viewport metadata as appropriate to the stack. Use `KEDGE Insurance Brokers Ltd` consistently where relevant.
- Use suitable JSON-LD only when accurate and supported by visible content: `Organization`, `WebSite`, `BreadcrumbList`, `Article`/`BlogPosting`, and `Service` are possible types.
- Use only verified company details, official contact information, genuine URLs, and accurate dates. Never invent ratings, reviews, awards, prices, locations, insurer relationships, statistics, testimonials, coverage promises, or regulatory claims.
- Avoid duplicate or contradictory schema and do not add FAQ or other markup solely to pursue rich results. Validate structured data where tooling is available.

### Search-intent content

- Write useful, original, natural-language content for Nigerian individuals, businesses, industries, and organisations seeking insurance brokerage services.
- Create distinct, useful pages for approved service categories and products, with relevant contextual links and enquiry calls to action.
- Use Insights, Risk Advisory, and FAQs to answer genuine customer questions and explain insurance terminology, risk considerations, and current regulatory information.
- Verify insurance and regulatory claims against reliable, current sources before publishing.
- Avoid keyword stuffing, thin or duplicated pages, doorway pages, automated filler, and unnecessary city-specific landing pages.
- Never claim that KEDGE provides a service, product, benefit, relationship, or geographic coverage unless confirmed by reliable company information.

## Accessibility, UX, and brand

- Use semantic HTML (`header`, `nav`, `main`, `section`, `article`, `footer`) and maintain one descriptive primary heading with a logical heading hierarchy.
- Use accessible names, keyboard support, visible focus states, suitable contrast, usable touch targets, labels, validation messages, and reduced-motion support for navigation, menus, accordions, dialogs, buttons, links, and forms.
- Prefer native HTML controls and accessible patterns over unnecessary custom implementations.
- Give informative images accurate alternative text and decorative images empty alternative text. Use descriptive filenames for new assets and only verified/licensed media.
- Preserve the KEDGE visual identity: deep navy blue, white, red accents, restrained neutral surfaces, clear typography, consistent spacing, premium corporate presentation, and restrained motion.
- Keep important content and links available on mobile. Test touch interactions, representative mobile/tablet/desktop widths, orientation changes, overflow, clipping, overlapping sections, and readable sizing.
- Avoid intrusive overlays, arbitrary gradients, excessive decoration, generic template-like layouts, and animations that impair readability or performance.

## Performance

- Treat performance and Core Web Vitals as user-experience and SEO concerns.
- Optimise images and video with appropriate dimensions, compression, modern formats, responsive variants, reserved dimensions, and suitable lazy loading. Do not lazy-load the likely above-the-fold LCP image.
- Prioritise critical above-the-fold content and avoid unnecessary JavaScript, dependencies, render-blocking resources, repeated requests, excessive font variants, and avoidable layout shifts.
- Use caching, compression, code splitting, and other mechanisms only when supported by the actual stack and hosting environment.
- Measure rather than assume. Where possible, record conditions and actual LCP, INP, and CLS results; never invent Lighthouse or performance scores.

## Security, privacy, and data integrity

- Never hardcode or expose API keys, credentials, secrets, private customer data, or environment-specific sensitive configuration.
- Validate and sanitise user input, protect public forms and server integrations against abuse, and apply suitable spam protection.
- Handle errors safely without exposing sensitive technical details.
- Preserve working email, enquiry, and other integrations; never fake successful submissions or actions.
- Respect applicable privacy requirements. Add analytics or tracking only when justified and authorised.
- Do not make external account, business listing, Search Console, DNS, hosting, or production configuration changes without the required access and explicit authorisation.

## Verification and regression prevention

After implementation, run available linting, type checks, tests, and the production build. Test affected routes, direct loads, refreshes, navigation, forms, search, internal links, representative responsive layouts, assets, console errors, and network requests where tooling permits.

For SEO-related work, inspect rendered HTML and page metadata, not only source code. Verify titles, descriptions, canonical tags, robots behaviour, sitemap entries, structured data, internal links, and route rendering. Run available accessibility, link, and performance checks. Record anything that requires hosting, DNS, deployment, external accounts, or unavailable tooling.

Do not claim a test passed unless it was run and its result is available. Clearly separate verified facts from assumptions and unverified items.

## Reporting statuses

Use these statuses in handovers and reports:

- **VERIFIED:** Implemented and supported by actual verification evidence.
- **PARTIALLY VERIFIED:** Implemented, but one or more aspects remain unverified.
- **BLOCKED:** Cannot proceed because of an identified constraint or missing dependency.
- **NOT IMPLEMENTED:** Requirement remains outstanding.
- **CONFIRMED OBSOLETE:** Evidence shows the item is no longer applicable.

## Definition of done

A task is complete only when the requested change exists in the actual codebase, approved functionality is preserved or intentionally changed, maintainability and relevant SEO/accessibility/security/performance requirements are addressed, available checks have been executed and recorded, no known regression remains unresolved, and limitations or external dependencies are disclosed truthfully.
