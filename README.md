# Small-Business Website Template (Astro)

A fast, accessible, SEO-ready static site for local businesses. **Every client-specific detail lives in one file:** `src/config/site.config.ts`. To make a new client site you edit that file and swap the images in `public/images/`. You don't touch any components.

- Pages: Home, About, Services, Gallery, Contact (+ 404 and a form "thanks" page)
- Floating WhatsApp button on every page
- Contact form via [Web3Forms](https://web3forms.com) (works with or without JavaScript)
- Theme colours from config, with automatic contrast-safe text colours
- Per-page meta, Open Graph/Twitter tags, LocalBusiness JSON-LD, `sitemap.xml`, `robots.txt`
- Static output for Cloudflare Pages. The only runtime dependency is `astro`.

## Quick start

```bash
npm install
```

```bash
cp .env.example .env
```

```bash
npm run dev
```

Open http://localhost:4321. `npm run build` type-checks and builds to `dist/`, and `npm run preview` serves that build.

Requires Node 22+ (see `.nvmrc`).

---

## Creating a new client site

### 1. Copy the template

```bash
cp -r small-business-site acme-plumbing && cd acme-plumbing && rm -rf node_modules dist .astro .env
```

### 2. Edit `src/config/site.config.ts`

The file is fully typed (`SiteConfig` interface), so your editor autocompletes every field and `npm run build` fails if something is missing or mistyped.

| Section | What to change |
| --- | --- |
| `url` | The production URL, without a trailing slash (e.g. `https://acmeplumbing.com`). Used for canonical URLs, OG tags and the sitemap. |
| `businessName`, `tagline`, `description` | Core identity, used in the header, footer, SEO and schema. |
| `businessType` | A [schema.org LocalBusiness subtype](https://schema.org/LocalBusiness#subtypes), e.g. `Plumber`, `HairSalon`, `Dentist`, `Restaurant`. |
| `logo`, `favicon` | Paths to files in `public/images/`. |
| `theme` | `primary`, `secondary`, `accent` as hex colours. That's the whole re-theme. |
| `contact` | Phone (display format), WhatsApp number (digits with country code, no `+`), the pre-filled WhatsApp message, email, address, map embed URL, and an optional directions link. |
| `hours` | One row per group of days. Times are 24h `"HH:MM"`. Use `closed: true` for closed days. |
| `social` | Any of `facebook`, `instagram`, `x`, `linkedin`, `youtube`, `tiktok`, `google`. Empty array hides the icons. |
| `navigation` | Menu labels and links. |
| `home`, `about`, `cta`, `servicesPage`, `galleryPage`, `contactPage` | Page copy: headings, intros, story paragraphs, highlights, values, button labels. |
| `services` | Title, description, optional `price` (free text, e.g. `"From ₹1,500"`), and image. |
| `gallery` | Images with `alt` text and an optional caption. |
| `testimonials` | Name, quote, optional role and 1–5 rating. |
| `seo` | Default title, description, keywords, OG image, locale, and title/description for each inner page. |

**Google Maps embed URL:** in Google Maps, find the business, then go to **Share → Embed a map**. Copy only the `src="…"` value from the iframe code.

### 3. Replace images in `public/images/`

The template ships with labelled SVG placeholders. Replace them with real photos:

| File | Recommended size |
| --- | --- |
| `logo.svg` (or `.png`) | Square, at least 96×96 |
| `hero.*` | 1200×900 (4:3) |
| `about.*` | 1200×900 (4:3) |
| `services/*` | 800×600 (4:3) |
| `gallery/*` | 800×800 (square; images are cropped to squares in the grid) |
| `og-image.jpg` | **1200×630** JPG or PNG. Social networks don't support SVG here. |

If a file name or extension changes (e.g. `hero.svg` becomes `hero.jpg`), update the path in the config. Also set `width`/`height` to the real dimensions to avoid layout shift, and write meaningful `alt` text.

**Keep the site fast:** export photos as WebP or JPG at roughly 80% quality, and keep each one under about 200 KB. [Squoosh](https://squoosh.app) is a free tool that does this.

### 4. Connect the contact form

1. Go to [web3forms.com](https://web3forms.com) and enter the **client's** email address. They'll receive an access key.
2. Put the key in `.env` for local testing:
   ```
   PUBLIC_WEB3FORMS_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```
3. Add the same variable in Cloudflare Pages (see below).

The key is meant to be public. It's embedded in the HTML and can only send mail to the address it was created for. If the key isn't set, the form shows a "Form not connected" notice so you notice before launch.

Without JavaScript, the form posts directly to Web3Forms and redirects to `/thanks/`. With JavaScript, it submits in the background and shows the result inline. It includes a honeypot field to catch spam bots.

### 5. Deploy to Cloudflare Pages

1. Push the project to a GitHub or GitLab repository.
2. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, then pick the repository.
3. Use these build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Under **Settings → Variables and Secrets**, add `PUBLIC_WEB3FORMS_ACCESS_KEY`. Also add `NODE_VERSION` = `22` if the build uses an older Node.
5. Deploy, then add the client's custom domain under **Custom domains**. Make sure `url` in the config matches that domain.

The form key is read at **build time**, so redeploy after adding or changing it.

`public/_headers` sets long-lived caching for hashed assets and a few security headers. Cloudflare Pages applies it automatically.

#### Alternative: deploy from your machine

```bash
npm run build
```

```bash
npx wrangler pages deploy dist
```

---

## Launch checklist

- [ ] `url` set to the real domain
- [ ] All placeholder images replaced, with `alt` text written
- [ ] `og-image.jpg` replaced (1200×630)
- [ ] Map embed URL and directions link point to the client
- [ ] WhatsApp number tested by tapping the button on a phone
- [ ] Web3Forms key added in Cloudflare and a test message received
- [ ] JSON-LD checked with Google's [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Sitemap submitted in Google Search Console (`https://<domain>/sitemap.xml`)

---

## How it works

```
src/
  config/site.config.ts   ← all client content and the SiteConfig interface
  lib/theme.ts            ← config colours → CSS variables (+ contrast-safe variants)
  lib/schema.ts           ← LocalBusiness JSON-LD from config
  lib/utils.ts            ← wa.me / tel links, time + address formatting
  layouts/BaseLayout.astro← <head>, theme vars, header, footer, WhatsApp button
  components/             ← presentational components that only read from config
  pages/                  ← routes + sitemap.xml.ts + robots.txt.ts
  styles/global.css       ← mobile-first base styles using the CSS variables
public/
  images/                 ← client images (replace these)
  _headers                ← Cloudflare Pages caching/security headers
```

**Theming.** `themeToCss()` turns `theme.primary`, `theme.secondary` and `theme.accent` into CSS custom properties, which are inlined in every page's `<head>`. It also works out:

- `--color-*-contrast`: black or white, whichever is more readable on that colour. Used for button text.
- `--color-primary-text`: the primary colour, darkened if needed so it reaches WCAG AA (4.5:1) on white. Used for links and coloured text.

As a result, even a pale brand colour like `#ffd54f` stays readable. Fonts and spacing are in `:root` in `src/styles/global.css`, if a client needs a different look.

**Sitemap.** `src/pages/sitemap.xml.ts` finds every `.astro` page automatically. To keep a page out of it, add the page's name to `EXCLUDE`.

**Adding a page.** Create `src/pages/new-page.astro` using `BaseLayout`, then add it to `navigation` in the config. It's added to the sitemap automatically.

**Accessibility.** The site uses semantic landmarks, a skip link, visible focus styles, labelled form fields, alt text required by the type, an accessible name for the WhatsApp button, a mobile menu that closes with Escape, and support for `prefers-reduced-motion`.
