import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PUBLIC_ROUTES, SITE_ORIGIN } from './sitemap-routes.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(projectRoot, 'public');
const distDir = path.join(projectRoot, 'dist');

function validateSitemapContent(sitemapContent, sourceName) {
  assert.match(sitemapContent, /^<\?xml version="1\.0" encoding="UTF-8"\?>/, `${sourceName} missing XML declaration`);
  assert.match(sitemapContent, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/, `${sourceName} missing urlset namespace`);

  const locations = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expectedLocations = PUBLIC_ROUTES.map((route) => new URL(route, `${SITE_ORIGIN}/`).toString());

  // Count matches expected public route count
  assert.equal(locations.length, PUBLIC_ROUTES.length, `${sourceName} route count mismatch`);
  // No duplicates
  assert.equal(new Set(locations).size, locations.length, `${sourceName} contains duplicate locations`);
  // Matches exact expected list
  assert.deepEqual(locations, expectedLocations, `${sourceName} locations do not match expected canonical URLs`);
  // All URLs belong to confirmed canonical origin and have no query params
  assert.ok(
    locations.every((url) => url.startsWith(`${SITE_ORIGIN}/`) && !url.includes('?')),
    `${sourceName} contains invalid origin or query parameters`
  );
  // Excludes private/noindex/api routes
  assert.ok(
    !locations.some((url) => /\/404$|\/api\/|\/news-events\/risk-advisory$/.test(url)),
    `${sourceName} contains disallowed/noindex/private routes`
  );
  return locations.length;
}

function validateRobotsContent(robotsContent, sourceName) {
  assert.match(robotsContent, /User-agent:\s*\*/i, `${sourceName} missing User-agent`);
  assert.match(robotsContent, /Allow:\s*\//i, `${sourceName} missing Allow: /`);
  assert.match(robotsContent, /Disallow:\s*\/api\//i, `${sourceName} missing Disallow: /api/`);
  assert.match(
    robotsContent,
    new RegExp(`Sitemap:\\s*${SITE_ORIGIN.replaceAll('.', '\\.')}/sitemap\\.xml`, 'i'),
    `${sourceName} missing or invalid Sitemap directive referencing production origin`
  );
}

// 1. Validate public/ source files
const publicSitemap = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf8');
const publicRobots = fs.readFileSync(path.join(publicDir, 'robots.txt'), 'utf8');

const publicCount = validateSitemapContent(publicSitemap, 'public/sitemap.xml');
validateRobotsContent(publicRobots, 'public/robots.txt');

// 2. Validate dist/ build output if it exists
if (fs.existsSync(distDir)) {
  const distSitemapPath = path.join(distDir, 'sitemap.xml');
  const distRobotsPath = path.join(distDir, 'robots.txt');

  if (fs.existsSync(distSitemapPath)) {
    validateSitemapContent(fs.readFileSync(distSitemapPath, 'utf8'), 'dist/sitemap.xml');
  }
  if (fs.existsSync(distRobotsPath)) {
    validateRobotsContent(fs.readFileSync(distRobotsPath, 'utf8'), 'dist/robots.txt');
  }
}

// 3. Verify environment files do not leak credentials
for (const envFile of ['.env.production', '.env.development', '.env.example']) {
  const envPath = path.join(projectRoot, envFile);
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    assert.ok(!/SECRET|PASSWORD|PRIVATE_KEY|TOKEN=.{8,}/i.test(content), `Potential secret found in ${envFile}`);
  }
}

console.log(`Validated sitemap XML (${publicCount} canonical URLs), robots.txt reference, dist output, and env safety.`);
