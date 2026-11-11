import type { APIRoute } from 'astro';
import { absoluteUrl } from '../lib/utils';

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\nDisallow: /thanks/\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
