import { siteConfig } from '../config/site.config';
import { absoluteUrl } from './utils';

/** schema.org LocalBusiness-family JSON-LD (e.g. ProfessionalService), generated from the site config. */
export function businessSchema(): Record<string, unknown> {
  const c = siteConfig;
  const a = c.contact.address;
  const openHours = c.hours.filter((h) => !h.closed && h.opens && h.closes);

  return {
    '@context': 'https://schema.org',
    '@type': c.businessType || 'LocalBusiness',
    '@id': `${absoluteUrl('/')}#business`,
    name: c.businessName,
    description: c.description,
    slogan: c.tagline,
    url: absoluteUrl('/'),
    logo: absoluteUrl(c.logo.src),
    image: absoluteUrl(c.seo.ogImage),
    telephone: c.contact.phone,
    email: c.contact.email,
    address: {
      '@type': 'PostalAddress',
      ...(a.street && { streetAddress: a.street }),
      addressLocality: a.city,
      ...(a.region && { addressRegion: a.region }),
      ...(a.postalCode && { postalCode: a.postalCode }),
      addressCountry: a.country,
    },
    ...(c.areaServed?.length && {
      areaServed: c.areaServed.map((name) => ({ '@type': 'Country', name })),
    }),
    ...(c.knowsAbout?.length && { knowsAbout: c.knowsAbout }),
    ...(c.contact.mapLink && { hasMap: c.contact.mapLink }),
    ...(openHours.length && {
      openingHoursSpecification: openHours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    }),
    ...(c.social.length && { sameAs: c.social.map((s) => s.url) }),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: c.contact.phone,
      email: c.contact.email,
      areaServed: c.contact.address.country,
      ...(c.contact.languages?.length && { availableLanguage: c.contact.languages }),
    },
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

/** FAQPage JSON-LD for pages that show the FAQ. */
export function faqSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: siteConfig.faq.items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/** Serialise for a <script type="application/ld+json"> block. */
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
