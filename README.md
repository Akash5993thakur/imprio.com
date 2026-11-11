# Imprio — imprio.com

The website for **Imprio**: websites, web apps and mobile apps for small businesses in India.
It's a static [Astro](https://astro.build) site, deployed to Cloudflare Pages.

**All content lives in one file:** `src/config/site.config.ts`. That includes text, contact details, services, projects, FAQ, colours and SEO. Components only read from it. Search that file for `TODO` to find everything that still needs replacing.

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

Open http://localhost:4321. `npm run build` type-checks and builds to `dist/`, and `npm run preview` serves that build. Requires Node 22+.

## Pages

| Page | What's on it |
| --- | --- |
| `/` Home | Hero, what we build, why Imprio, 4-step process, testimonials (hidden until you add some), FAQ, final call to action |
| `/services/` | Starter Website, Web Apps, Mobile Apps and Care Plan, each with a checklist and an "Ask on WhatsApp" button |
| `/work/` | Portfolio grid (`projects` in the config) |
| `/about/` | Story, highlights, quality-first approach |
| `/contact/` | Web3Forms form, WhatsApp card, email, phone, city |

Every page also has the floating WhatsApp button, per-page meta and Open Graph tags, and ProfessionalService JSON-LD. The home page adds FAQPage JSON-LD. `sitemap.xml` and `robots.txt` are generated automatically.

## Before launch — what to replace

### In `src/config/site.config.ts` (search for `TODO`)

- [ ] `url`: confirm the live domain
- [ ] `contact.phone`: your real phone number
- [ ] `contact.whatsapp`: your WhatsApp number, digits only with country code (e.g. `919876543210`)
- [ ] `contact.email`: your real email address
- [ ] `contact.languages`: the languages you actually speak with clients
- [ ] `social`: add your Instagram, LinkedIn, etc. (icons appear automatically)
- [ ] `projects`: replace the 3 **sample** projects with real client work. Their names, business types, descriptions and images are all placeholders.
- [ ] `faq`: check the timeline ("7 working days") and payment terms ("50% to start…") match how you actually work
- [ ] `testimonials`: add real client reviews when you have them. The section stays hidden while the list is empty.
- [ ] Read all the copy once more, especially the About story and the "100%" and "1" highlights

### In `public/images/`

- [ ] `work/clinic.svg`, `work/restaurant.svg`, `work/gym.svg`: replace with screenshots of real projects. 1200×900 (4:3) works best. If the file names or extensions change, update `projects[].image.src`.
- [ ] `og-image.jpg`: the social sharing preview (1200×630). The current one is fine to keep. Regenerate it only if the tagline changes.
- [ ] Optional: replace `hero.svg` with your own illustration or screenshot.
- `logo.svg` (navy, used in the header), `logo-light.svg` (white, used in the footer) and `favicon.svg` are final. Replace them only if you rebrand.

### Form and deployment

- [ ] Create a Web3Forms key at https://web3forms.com, using the inbox where you want enquiries delivered.
- [ ] Add `PUBLIC_WEB3FORMS_ACCESS_KEY` in Cloudflare Pages, then redeploy. The key is read at build time.
- [ ] Send a test enquiry and check that it arrives.
- [ ] Tap every WhatsApp button on a phone and check that the right number and message open.
- [ ] Check the structured data with Google's [Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Submit `https://imprio.com/sitemap.xml` in Google Search Console.

## Contact form (Web3Forms)

Put the key in `.env` for local testing:

```
PUBLIC_WEB3FORMS_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

The key is meant to be public, and it can only send mail to the address it was created for. Until it's set, the form shows a "Form not connected" notice.

With JavaScript, the form submits in the background and shows the result inline. Without JavaScript, it posts to Web3Forms and redirects to `/thanks/`. A honeypot field catches spam bots.

## Deploy to Cloudflare Pages

1. Push the repository to GitHub.
2. In Cloudflare, go to **Workers & Pages → Create → Pages → Connect to Git** and choose this repository.
3. Use these build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
4. Under **Settings → Variables and Secrets**, add `PUBLIC_WEB3FORMS_ACCESS_KEY`. Add `NODE_VERSION` = `22` if needed.
5. Add `imprio.com` under **Custom domains**.

`public/_headers` sets long-lived caching for hashed assets and a few security headers.

## Editing guide

- **Text:** everything is in `site.config.ts`, grouped by page (`home`, `about`, `servicesPage`, `workPage`, `contactPage`, `cta`, `faq`).
- **Links:** any `href` can be a path (`/work/`), a full URL, or `"whatsapp"`. The last one opens a WhatsApp chat with `contact.whatsappMessage` pre-filled.
- **Services:** each has an `icon`, `title`, `description`, `features` list and a `price` label (currently "Contact for pricing"). Every service's "Ask on WhatsApp" button pre-fills `servicesPage.enquireMessage`.
- **Icons:** use any name from `src/lib/icons.ts`. Add an SVG path there to create a new icon; TypeScript will then accept the name in the config.
- **Colours:** `theme.primary` (electric blue `#2F6BFF`), `theme.secondary` (navy `#0B1530`) and `theme.accent` (light blue, used on navy). `src/lib/theme.ts` turns them into CSS variables. It also works out text colours that pass WCAG AA, darkening the blue very slightly (to `#2b62eb`) where white text sits on it.
- **Hours / map:** both are hidden while `hours` is empty and `contact.mapEmbedUrl` is unset. Fill them in to show them.
- **Font:** Inter, self-hosted through `@fontsource-variable/inter`. There are no requests to Google Fonts.

## Project structure

```
src/
  config/site.config.ts   ← all content + the SiteConfig interface
  lib/theme.ts            ← colours → CSS variables (contrast-safe)
  lib/schema.ts           ← ProfessionalService + FAQPage JSON-LD
  lib/icons.ts            ← inline SVG icon paths
  lib/utils.ts            ← WhatsApp/tel links, link helper, formatting
  layouts/BaseLayout.astro← <head>, header, footer, WhatsApp button, reveal animations
  components/             ← presentational components (read config only)
  pages/                  ← routes + sitemap.xml.ts + robots.txt.ts
  styles/global.css       ← design system (mobile-first)
public/
  images/                 ← logo, favicon, hero, OG image, work screenshots
  _headers                ← Cloudflare Pages headers
```

## Accessibility and performance

- Semantic landmarks, a skip link and visible focus rings
- Labelled form fields, and alt text on every image (required by the config types)
- The mobile menu closes with Escape, and the FAQ uses native `<details>`, so it works without JavaScript
- Animations are subtle (a fade-up on scroll and button lift) and turn off when the visitor prefers reduced motion
- The only runtime dependencies are Astro and the Inter font. There's no client-side framework; the small scripts run inline.
