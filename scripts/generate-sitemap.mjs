import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PUBLIC_ROUTES, SITE_ORIGIN } from './sitemap-routes.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...PUBLIC_ROUTES.map((route) => `  <url><loc>${escapeXml(new URL(route, `${SITE_ORIGIN}/`).toString())}</loc></url>`),
  '</urlset>',
  '',
].join('\n');

fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log(`Generated ${path.relative(projectRoot, sitemapPath)} with ${PUBLIC_ROUTES.length} public routes.`);
