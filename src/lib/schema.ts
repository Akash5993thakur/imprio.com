import { siteConfig } from '../config/site.config';
import { absoluteUrl } from './utils';

/** schema.org LocalBusiness JSON-LD, generated entirely from the site config. */
export function localBusinessSchema(): Record<string, unknown> {
  const c = siteConfig;
  const a = c.contact.address;

  return {
    '@context': 'https://schema.org',
    '@type': c.businessType || 'LocalBusiness',
    '@id': `${absoluteUrl('/')}#business`,
    name: c.businessName,
    description: c.description,
    slogan: c.tagline,
    url: absoluteUrl('/'),
    logo: absoluteUrl(c.logo.src),
    image: [absoluteUrl(c.seo.ogImage), absoluteUrl(c.home.hero.image.src)],
    telephone: c.contact.phone,
    email: c.contact.email,
    ...(c.priceRange && { priceRange: c.priceRange }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      ...(a.region && { addressRegion: a.region }),
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    ...(c.contact.mapLink && { hasMap: c.contact.mapLink }),
    openingHoursSpecification: c.hours
      .filter((h) => !h.closed && h.opens && h.closes)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    sameAs: c.social.map((s) => s.url),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: c.services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.description },
      })),
    },
  };
}
