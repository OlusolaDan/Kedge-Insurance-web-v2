import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PUBLIC_ROUTES, SITE_ORIGIN } from './sitemap-routes.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(projectRoot, 'dist');
const pageSeo = JSON.parse(fs.readFileSync(path.join(projectRoot, 'src', 'data', 'pageSeo.json'), 'utf8'));

assert.ok(fs.existsSync(distRoot), 'dist directory must exist before running prerender verification');

let verifiedCount = 0;

for (const route of PUBLIC_ROUTES) {
  const filePath = route === '/' ? path.join(distRoot, 'index.html') : path.join(distRoot, `${route.slice(1)}.html`);
  assert.ok(fs.existsSync(filePath), `Missing prerendered file for route: ${route} (${filePath})`);

  const html = fs.readFileSync(filePath, 'utf8');
  const seo = pageSeo[route];
  const canonical = new URL(route, `${SITE_ORIGIN}/`).toString();

  // 1. Title verification
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  assert.ok(titleMatch, `Route ${route} is missing <title> tag`);
  assert.equal(titleMatch[1].trim(), seo.title.trim(), `Route ${route} title mismatch`);

  // 2. Meta description verification
  const descMatch = html.match(/<meta name="description" content="([^"]+)" \/>/);
  assert.ok(descMatch, `Route ${route} is missing meta description`);
  assert.equal(descMatch[1].trim(), seo.description.trim(), `Route ${route} meta description mismatch`);

  // 3. Robots directive
  assert.match(html, /<meta name="robots" content="index,follow" \/>/, `Route ${route} missing index,follow robots meta`);

  // 4. Canonical link
  const canonMatch = html.match(/<link rel="canonical" href="([^"]+)" \/>/);
  assert.ok(canonMatch, `Route ${route} is missing canonical link`);
  assert.equal(canonMatch[1], canonical, `Route ${route} canonical mismatch. Expected: ${canonical}, got: ${canonMatch[1]}`);

  // 5. Open Graph tags
  assert.match(html, new RegExp(`<meta property="og:title" content="[^"]+" />`), `Route ${route} missing og:title`);
  assert.match(html, new RegExp(`<meta property="og:description" content="[^"]+" />`), `Route ${route} missing og:description`);
  assert.match(html, new RegExp(`<meta property="og:url" content="${canonical.replaceAll('.', '\\.')}" />`), `Route ${route} missing or invalid og:url`);
  assert.match(html, /<meta property="og:site_name" content="KEDGE Insurance Brokers Ltd" \/>/, `Route ${route} missing og:site_name`);

  // 6. Twitter Card tags
  assert.match(html, new RegExp(`<meta name="twitter:title" content="[^"]+" />`), `Route ${route} missing twitter:title`);
  assert.match(html, new RegExp(`<meta name="twitter:description" content="[^"]+" />`), `Route ${route} missing twitter:description`);

  // 7. Structured Data (JSON-LD)
  const ldMatch = html.match(/<script type="application\/ld\+json" data-kedge-structured-data="true">([\s\S]*?)<\/script>/);
  assert.ok(ldMatch, `Route ${route} is missing structured data JSON-LD`);
  const ldJson = JSON.parse(ldMatch[1]);
  assert.equal(ldJson['@context'], 'https://schema.org');
  assert.ok(Array.isArray(ldJson['@graph']));
  assert.ok(ldJson['@graph'].some((node) => node['@type'] === 'Organization' && node.name === 'KEDGE Insurance Brokers Ltd'));
  assert.ok(ldJson['@graph'].some((node) => node['@type'] === 'WebSite' && node.url === SITE_ORIGIN));

  // 8. Body Content & Heading
  assert.match(html, /<h1[^>]*>[\s\S]*?<\/h1>/, `Route ${route} is missing primary <h1>`);
  assert.match(html, /<div id="root">[\s\S]{300,}<\/div>/, `Route ${route} body inside #root is too short or empty`);

  // 9. Root-relative assets (ensure nested route requests won't 404)
  const relativeAssets = [...html.matchAll(/(?:src|href)="([^"/][^"]*\.(?:js|css|jpg|png|svg))"/g)].map(m => m[1]);
  assert.equal(relativeAssets.length, 0, `Route ${route} contains non-root-relative asset paths: ${relativeAssets.join(', ')}`);

  verifiedCount++;
}

// Check DirectoryIndex for /services
const servicesIndexPath = path.join(distRoot, 'services', 'index.html');
assert.ok(fs.existsSync(servicesIndexPath), 'dist/services/index.html must exist for cPanel DirectoryIndex compatibility');

const notFoundPath = path.join(distRoot, '404.html');
assert.ok(fs.existsSync(notFoundPath), 'dist/404.html must exist for Apache ErrorDocument handling');
const notFoundHtml = fs.readFileSync(notFoundPath, 'utf8');
assert.match(notFoundHtml, /<meta name="robots" content="noindex,follow" \/>/);
assert.match(notFoundHtml, /Page or Resource Not Found/);
assert.match(notFoundHtml, /href="\/assets\//);

// Check .htaccess
const htaccessPath = path.join(distRoot, '.htaccess');
assert.ok(fs.existsSync(htaccessPath), 'dist/.htaccess must exist');
const htaccessContent = fs.readFileSync(htaccessPath, 'utf8');
assert.match(htaccessContent, /RewriteRule \^about\/\?\$ about\.html \[L\]/);
assert.match(htaccessContent, /RewriteRule \^services\/\?\$ services\.html \[L\]/);
assert.match(htaccessContent, /ErrorDocument 404 \/404\.html/);
assert.doesNotMatch(htaccessContent, /RewriteRule \^ index\.html \[L\]/);

console.log(`Verified ${verifiedCount} prerendered public routes with full metadata, structured data, canonical URLs, and semantic HTML.`);
