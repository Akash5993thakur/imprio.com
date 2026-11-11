import type { APIRoute } from 'astro';
import { absoluteUrl } from '../lib/utils';

/** Pages that should never appear in the sitemap. */
const EXCLUDE = new Set(['404', 'thanks']);

// Auto-discovers every .astro page, so new pages are added to the sitemap automatically.
const pages = Object.keys(import.meta.glob('./**/*.astro'))
  .map((file) => file.replace(/^\.\//, '').replace(/\.astro$/, ''))
  .filter((name) => !EXCLUDE.has(name) && !name.includes('['))
  .map((name) => (name === 'index' ? '/' : `/${name.replace(/\/index$/, '')}/`))
  .sort();

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().split('T')[0];
  const urls = pages
    .map((p) => `  <url><loc>${absoluteUrl(p)}</loc><lastmod>${lastmod}</lastmod></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
