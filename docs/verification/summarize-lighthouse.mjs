import fs from 'node:fs';

for (const file of fs.readdirSync(new URL('.', import.meta.url)).filter((name) => name.endsWith('.json'))) {
  const report = JSON.parse(fs.readFileSync(new URL(file, import.meta.url), 'utf8'));
  const audits = report.audits ?? {};
  const layoutAudit = audits['layout-shift-elements'] ?? audits['cls-culprits-insight'];
  const items = layoutAudit?.details?.items ?? [];
  console.log(JSON.stringify({
    file,
    lighthouseVersion: report.lighthouseVersion,
    requestedUrl: report.requestedUrl,
    finalUrl: report.finalUrl,
    scores: {
      performance: report.categories?.performance?.score,
      accessibility: report.categories?.accessibility?.score,
      bestPractices: report.categories?.['best-practices']?.score,
      seo: report.categories?.seo?.score,
    },
    metrics: Object.fromEntries([
      'first-contentful-paint',
      'largest-contentful-paint',
      'total-blocking-time',
      'cumulative-layout-shift',
      'speed-index',
    ].map((id) => [id, audits[id]?.displayValue ?? null])),
    layoutShiftItems: items.slice(0, 10).map((item) => ({
      node: item.node?.snippet ?? item.node?.selector ?? item.element?.snippet ?? null,
      score: item.score ?? item.cluster?.score ?? null,
      cause: item.cause ?? item.subItems ?? null,
    })),
  }, null, 2));
}
