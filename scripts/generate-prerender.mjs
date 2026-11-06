import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PUBLIC_ROUTES, SITE_ORIGIN } from './sitemap-routes.mjs';
import { COMPANY_DETAILS, buildPrerenderBody } from './prerender-content.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(projectRoot, 'dist');
const pageSeo = JSON.parse(fs.readFileSync(path.join(projectRoot, 'src', 'data', 'pageSeo.json'), 'utf8'));

const escapeHtml = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const escapeAttribute = escapeHtml;

const createStructuredData = (canonicalOrigin) => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: COMPANY_DETAILS.legalName,
        url: canonicalOrigin,
        telephone: COMPANY_DETAILS.primaryPhone,
        email: COMPANY_DETAILS.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '20, Oshidehin Street, off Akilo Road, Ogba-Ikeja',
          addressLocality: COMPANY_DETAILS.addressLocality,
          addressRegion: COMPANY_DETAILS.addressRegion,
          addressCountry: COMPANY_DETAILS.addressCountry,
        },
      },
      {
        '@type': 'WebSite',
        name: COMPANY_DETAILS.legalName,
        url: canonicalOrigin,
      },
    ],
  };
  return `<script type="application/ld+json" data-kedge-structured-data="true">${JSON.stringify(schema)}</script>`;
};

const createShell = (template, route, heroImageSrc = '', heroMobileSrc = '') => {
  const page = pageSeo[route];
  if (!page) throw new Error(`Cannot prerender missing route metadata: ${route}`);
  const canonical = new URL(route, `${SITE_ORIGIN}/`).toString();
  const structuredData = createStructuredData(SITE_ORIGIN);
  const routeBody = buildPrerenderBody(route, heroImageSrc, heroMobileSrc);

  let html = template;

  // Title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);

  // Meta Description
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeAttribute(page.description)}" />`
  );

  // Robots
  html = html.replace(
    /<meta name="robots" content="[^"]*" \/>/,
    `<meta name="robots" content="${page.noindex ? 'noindex,follow' : 'index,follow'}" />`
  );

  // Canonical
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, page.noindex ? '' : `<link rel="canonical" href="${canonical}" />`);

  // Open Graph
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeAttribute(page.title)}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeAttribute(page.description)}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonical}" />`
  );
  html = html.replace(
    /<meta property="og:site_name" content="[^"]*" \/>/,
    `<meta property="og:site_name" content="${escapeAttribute(COMPANY_DETAILS.legalName)}" />`
  );

  // Twitter
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeAttribute(page.title)}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escapeAttribute(page.description)}" />`
  );

  // Inject Structured Data into <head>
  if (!html.includes('data-kedge-structured-data')) {
    html = html.replace('</head>', `    ${structuredData}\n  </head>`);
  }

  // Inject responsive high-priority LCP image preloads for the homepage
  if (route === '/') {
    let preloadTags = '';
    if (heroMobileSrc) {
      preloadTags += `    <link rel="preload" as="image" href="${heroMobileSrc}" media="(max-width: 768px)" fetchpriority="high" />\n`;
    }
    if (heroImageSrc) {
      preloadTags += `    <link rel="preload" as="image" href="${heroImageSrc}" media="(min-width: 769px)" fetchpriority="high" />\n`;
    }
    if (preloadTags) {
      html = html.replace('</head>', `${preloadTags}  </head>`);
    }
  }

  // Inject prerendered body inside <div id="root">
  html = html.replace('<div id="root"></div>', `<div id="root">${routeBody}</div>`);

  return html;
};

if (!fs.existsSync(distRoot)) {
  throw new Error(`dist directory not found at ${distRoot}. Run vite build first.`);
}

const template = fs.readFileSync(path.join(distRoot, 'index.html'), 'utf8');

const imagesDir = path.join(distRoot, 'images');
let heroDesktopFile = '';
let heroMobileFile = '';
if (fs.existsSync(imagesDir)) {
  const allImages = fs.readdirSync(imagesDir);
  heroDesktopFile = allImages.find(f => f.startsWith('hero_commercial_port_1792794885795-optimized') && f.endsWith('.jpg')) || '';
  heroMobileFile = allImages.find(f => f.startsWith('hero_commercial_port_mobile') && f.endsWith('.jpg')) || '';
}
const heroDesktopSrc = heroDesktopFile ? `/images/${heroDesktopFile}` : '';
const heroMobileSrc = heroMobileFile ? `/images/${heroMobileFile}` : '';

for (const route of PUBLIC_ROUTES) {
  const shell = createShell(template, route, route === '/' ? heroDesktopSrc : '', route === '/' ? heroMobileSrc : '');

  if (route === '/') {
    fs.writeFileSync(path.join(distRoot, 'index.html'), shell, 'utf8');
  } else {
    // Generate clean .html file: e.g. /about -> dist/about.html, /services/motor -> dist/services/motor.html
    const outputFile = path.join(distRoot, `${route.slice(1)}.html`);
    const outputDirectory = path.dirname(outputFile);
    fs.mkdirSync(outputDirectory, { recursive: true });
    fs.writeFileSync(outputFile, shell, 'utf8');

    // For directory-like routes like /services, also generate dist/services/index.html so that
    // requests hitting the physical directory on cPanel Apache resolve DirectoryIndex cleanly.
    if (route === '/services') {
      const servicesDir = path.join(distRoot, 'services');
      fs.mkdirSync(servicesDir, { recursive: true });
      fs.writeFileSync(path.join(servicesDir, 'index.html'), shell, 'utf8');
    }
  }
}

// Generate the branded server error document from the same prerender content
// used by the existing React NotFoundPage. It is intentionally not in the
// public sitemap and is served only by Apache after a genuine 404.
fs.writeFileSync(path.join(distRoot, '404.html'), createShell(template, '/404'), 'utf8');

// Generate .htaccess with explicit rewrite rules for each route and a genuine
// Apache 404 document. Unknown paths must not receive the homepage with 200.
const routeRules = PUBLIC_ROUTES
  .filter((route) => route !== '/')
  .map((route) => `RewriteRule ^${route.slice(1).replaceAll('/', '\\/')}/?$ ${route.slice(1)}.html [L]`)
  .join('\n');

const staticHostingRules = `# KEDGE Insurance Brokers Ltd — Production cPanel Hosting Rules
Options -Indexes
DirectoryIndex index.html

<IfModule mod_env.c>
  SetEnv KEDGE_ENQUIRY_EMAIL "info@kedgeinsure.com.ng"
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"

  # Vite asset filenames contain content hashes, so immutable caching is safe.
  # HTML remains short-lived so route and asset references can update promptly.
  <FilesMatch "\\.(?:css|js|mjs|json|map|jpg|jpeg|png|gif|svg|webp|avif|ico|woff2?)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "^(?:index|404)\\.html$">
    Header set Cache-Control "public, max-age=300, must-revalidate"
  </FilesMatch>
</IfModule>

ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^api/ - [L]
  # Prerendered static public routes
${routeRules}
  # Existing files and directories
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
</IfModule>
`;

fs.writeFileSync(path.join(distRoot, '.htaccess'), staticHostingRules, 'utf8');
console.log(`Generated prerendered HTML and .htaccess for ${PUBLIC_ROUTES.length} public routes.`);
