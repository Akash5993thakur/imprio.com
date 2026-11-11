import { defineConfig } from 'astro/config';
import { siteConfig } from './src/config/site.config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Used for canonical URLs, Open Graph URLs and the sitemap.
  site: siteConfig.url,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // /about/index.html -> served at /about/ (works out of the box on Cloudflare Pages)
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
