/**
 * ============================================================================
 *  SITE CONFIG — the ONLY file you need to edit for a new client.
 * ============================================================================
 *  Everything client-specific (name, colours, contact details, services,
 *  images, testimonials, SEO…) lives here. Components read from this object
 *  and never hardcode business content.
 *
 *  Images: put files in `public/images/` and reference them here with a path
 *  starting at `/images/...` (e.g. `/images/services/cakes.jpg`).
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Days as used by schema.org opening hours. */
export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface ImageAsset {
  /** Path inside /public, e.g. "/images/gallery/1.jpg" */
  src: string;
  /** Describe the image for screen readers. Required for accessibility. */
  alt: string;
  /** Intrinsic size — prevents layout shift. Use the real file dimensions. */
  width?: number;
  height?: number;
}

export interface ThemeColors {
  /** Main brand colour: buttons, links, header accents. Any CSS hex colour. */
  primary: string;
  /** Supporting colour: dark sections, footer. */
  secondary: string;
  /** Highlight colour: badges, stars, small details. */
  accent: string;
}

export interface Address {
  street: string;
  city: string;
  region?: string;
  postalCode: string;
  /** ISO 3166-1 alpha-2 country code, e.g. "US", "GB", "IN". */
  country: string;
}

export interface OpeningHours {
  /** Text shown on the site, e.g. "Monday – Friday". */
  label: string;
  /** Days covered by this row (used for the JSON-LD schema). */
  days: DayOfWeek[];
  /** 24h "HH:MM". Omit both opens/closes and set `closed: true` for closed days. */
  opens?: string;
  closes?: string;
  closed?: boolean;
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'x' | 'linkedin' | 'youtube' | 'tiktok' | 'google';
  url: string;
}

export interface Service {
  title: string;
  description: string;
  /** Free text so it can be "From $45", "₹1,200", "On request"… Omit to hide. */
  price?: string;
  image: ImageAsset;
}

export interface Testimonial {
  name: string;
  quote: string;
  /** e.g. "Wedding client" or "Regular since 2019". */
  role?: string;
  /** 1–5. Omit to hide stars. */
  rating?: number;
}

export interface PageSeo {
  title: string;
  description: string;
}

export interface SeoConfig {
  /** Default/home page <title>. */
  title: string;
  /** Default meta description (≈150–160 characters). */
  description: string;
  keywords: string[];
  /** Social share image (1200×630 recommended). */
  ogImage: string;
  /** e.g. "en_US", "en_GB", "en_IN". */
  locale: string;
  /** Per-page title/description overrides. Titles get " | Business name" appended. */
  pages: {
    about: PageSeo;
    services: PageSeo;
    gallery: PageSeo;
    contact: PageSeo;
  };
}

export interface SiteConfig {
  /** Production URL, no trailing slash. Used for canonical links + sitemap. */
  url: string;
  /** HTML lang attribute, e.g. "en". */
  language: string;

  businessName: string;
  tagline: string;
  description: string;
  /** schema.org LocalBusiness subtype, e.g. "Bakery", "Plumber", "HairSalon", "Dentist". */
  businessType: string;
  /** Optional price indicator for search engines, e.g. "$$". */
  priceRange?: string;
  logo: ImageAsset;
  favicon: string;

  theme: ThemeColors;

  contact: {
    /** Display format, e.g. "+1 (555) 014-2297". */
    phone: string;
    /** International format, digits only with country code — no "+", spaces or dashes. */
    whatsapp: string;
    /** Pre-filled message for the floating WhatsApp button. */
    whatsappMessage: string;
    email: string;
    address: Address;
    /** Google Maps → Share → Embed a map → copy the `src` URL from the iframe. */
    mapEmbedUrl: string;
    /** Optional link for "Get directions". */
    mapLink?: string;
  };

  hours: OpeningHours[];
  social: SocialLink[];

  navigation: { label: string; href: string }[];

  home: {
    hero: {
      heading: string;
      subheading: string;
      image: ImageAsset;
      primaryCta: { label: string; href: string };
      secondaryCta?: { label: string; href: string };
    };
    servicesHeading: string;
    servicesIntro: string;
    /** How many services to preview on the home page. */
    servicesPreviewCount: number;
    testimonialsHeading: string;
  };

  /** Call-to-action banner shown on several pages. */
  cta: {
    heading: string;
    text: string;
    buttonLabel: string;
    buttonHref: string;
  };

  about: {
    heading: string;
    intro: string;
    /** Each string is a paragraph. */
    story: string[];
    image: ImageAsset;
    highlights: { value: string; label: string }[];
    values: { title: string; description: string }[];
  };

  servicesPage: { heading: string; intro: string };
  galleryPage: { heading: string; intro: string };
  contactPage: { heading: string; intro: string; formHeading: string; successMessage: string };

  services: Service[];
  gallery: (ImageAsset & { caption?: string })[];
  testimonials: Testimonial[];

  seo: SeoConfig;
}

// ---------------------------------------------------------------------------
// Client data — placeholder content for a fictional business
// ---------------------------------------------------------------------------

export const siteConfig: SiteConfig = {
  url: 'https://example-bakery.pages.dev',
  language: 'en',

  businessName: 'Golden Crumb Bakery',
  tagline: 'Fresh-baked every morning since 2012',
  description:
    'Golden Crumb is a neighbourhood bakery in Portland baking sourdough, pastries and custom celebration cakes from scratch every day.',
  businessType: 'Bakery',
  priceRange: '$$',
  logo: { src: '/images/logo.svg', alt: 'Golden Crumb Bakery logo', width: 48, height: 48 },
  favicon: '/images/logo.svg',

  theme: {
    primary: '#b4532a',
    secondary: '#2f2a26',
    accent: '#e9b949',
  },

  contact: {
    phone: '+1 (555) 014-2297',
    whatsapp: '15550142297',
    whatsappMessage: "Hi Golden Crumb! I'd like to ask about an order.",
    email: 'hello@example.com',
    address: {
      street: '128 Maple Street',
      city: 'Portland',
      region: 'OR',
      postalCode: '97205',
      country: 'US',
    },
    mapEmbedUrl:
      'https://www.google.com/maps?q=Pioneer+Courthouse+Square,+Portland,+OR&output=embed',
    mapLink: 'https://maps.google.com/?q=Pioneer+Courthouse+Square,+Portland,+OR',
  },

  hours: [
    {
      label: 'Monday – Friday',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
    { label: 'Saturday', days: ['Saturday'], opens: '08:00', closes: '16:00' },
    { label: 'Sunday', days: ['Sunday'], closed: true },
  ],

  social: [
    { platform: 'instagram', url: 'https://instagram.com/example' },
    { platform: 'facebook', url: 'https://facebook.com/example' },
    { platform: 'google', url: 'https://g.page/example' },
  ],

  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about/' },
    { label: 'Services', href: '/services/' },
    { label: 'Gallery', href: '/gallery/' },
    { label: 'Contact', href: '/contact/' },
  ],

  home: {
    hero: {
      heading: 'Real bread, honest pastries, cakes worth celebrating',
      subheading:
        'Everything is made by hand in our Maple Street kitchen with local flour, butter and seasonal fruit.',
      image: {
        src: '/images/hero.svg',
        alt: 'Freshly baked sourdough loaves cooling on a wooden rack',
        width: 1200,
        height: 900,
      },
      primaryCta: { label: 'Order a cake', href: '/contact/' },
      secondaryCta: { label: 'See what we bake', href: '/services/' },
    },
    servicesHeading: 'What we bake',
    servicesIntro: 'From your morning loaf to a three-tier wedding cake.',
    servicesPreviewCount: 3,
    testimonialsHeading: 'What our neighbours say',
  },

  cta: {
    heading: 'Planning a celebration?',
    text: 'Tell us the date, the number of guests and your favourite flavours — we will take it from there.',
    buttonLabel: 'Get a free quote',
    buttonHref: '/contact/',
  },

  about: {
    heading: 'Our story',
    intro: 'A small bakery with a big oven and a simple idea: bake the way it used to be done.',
    story: [
      'Golden Crumb started in 2012 when Maya Ortiz turned her weekend sourdough habit into a six-table café on Maple Street. The first loaves sold out by 9 a.m. — and they still do most days.',
      'Today our team of eight bakes through the night so the shelves are full when the doors open. We still mill part of our grain in-house, ferment every dough for at least 24 hours and never use pre-mixes.',
      'We bake for weddings, offices, cafés and anyone who just needs a really good croissant.',
    ],
    image: {
      src: '/images/about.svg',
      alt: 'Bakers shaping dough at a flour-dusted workbench',
      width: 1200,
      height: 900,
    },
    highlights: [
      { value: '12+', label: 'years baking' },
      { value: '400', label: 'loaves a day' },
      { value: '1,500+', label: 'custom cakes' },
    ],
    values: [
      { title: 'Slow fermentation', description: 'Every dough rests at least 24 hours for flavour and digestibility.' },
      { title: 'Local ingredients', description: 'Flour, dairy and fruit from farms within 100 miles.' },
      { title: 'Zero waste', description: "Yesterday's bread goes to local shelters every evening." },
    ],
  },

  servicesPage: {
    heading: 'Our services',
    intro: 'Order ahead for collection, or let us cater your next event. Prices are a starting guide — ask us for a quote.',
  },
  galleryPage: {
    heading: 'Gallery',
    intro: 'A peek inside the kitchen and a few of our favourite bakes.',
  },
  contactPage: {
    heading: 'Get in touch',
    intro: 'Questions, custom orders or catering enquiries — we usually reply within one working day.',
    formHeading: 'Send us a message',
    successMessage: 'Thank you! Your message has been sent. We will get back to you shortly.',
  },

  services: [
    {
      title: 'Celebration cakes',
      description: 'Custom birthday, anniversary and wedding cakes designed with you, in any flavour you can dream up.',
      price: 'From $65',
      image: { src: '/images/services/cakes.svg', alt: 'Two-tier cake decorated with fresh flowers', width: 800, height: 600 },
    },
    {
      title: 'Artisan sourdough',
      description: 'Naturally leavened loaves baked fresh every morning — country white, rye, seeded and more.',
      price: 'From $8',
      image: { src: '/images/services/bread.svg', alt: 'Crusty sourdough loaves on a linen cloth', width: 800, height: 600 },
    },
    {
      title: 'Event catering',
      description: 'Pastry platters, sandwich boards and dessert tables for offices, parties and weddings.',
      price: 'From $12 per guest',
      image: { src: '/images/services/catering.svg', alt: 'Catering table with pastries and sandwiches', width: 800, height: 600 },
    },
    {
      title: 'Wholesale for cafés',
      description: 'Daily deliveries of bread and pastries for cafés and restaurants across the city.',
      image: { src: '/images/services/wholesale.svg', alt: 'Crates of bread ready for delivery', width: 800, height: 600 },
    },
    {
      title: 'Baking classes',
      description: 'Hands-on weekend workshops covering sourdough, laminated pastry and cake decorating.',
      price: '$90 per person',
      image: { src: '/images/services/classes.svg', alt: 'Students kneading dough in a baking class', width: 800, height: 600 },
    },
    {
      title: 'Gluten-free range',
      description: 'A dedicated range of gluten-free breads and cakes, baked on separate equipment.',
      price: 'From $9',
      image: { src: '/images/services/gluten-free.svg', alt: 'Gluten-free muffins on a cooling rack', width: 800, height: 600 },
    },
  ],

  gallery: [
    { src: '/images/gallery/01.svg', alt: 'Rows of croissants on a baking tray', caption: 'Morning croissants', width: 800, height: 800 },
    { src: '/images/gallery/02.svg', alt: 'Wedding cake with white buttercream and berries', caption: 'Summer wedding cake', width: 800, height: 800 },
    { src: '/images/gallery/03.svg', alt: 'Baker scoring a loaf before baking', caption: 'Scoring the sourdough', width: 800, height: 800 },
    { src: '/images/gallery/04.svg', alt: 'Display counter full of pastries', caption: 'The front counter', width: 800, height: 800 },
    { src: '/images/gallery/05.svg', alt: 'Cinnamon buns glazed with icing', caption: 'Cinnamon buns', width: 800, height: 800 },
    { src: '/images/gallery/06.svg', alt: 'Bakery storefront on Maple Street', caption: 'Our Maple Street shop', width: 800, height: 800 },
  ],

  testimonials: [
    {
      name: 'Priya S.',
      role: 'Wedding client',
      quote: 'Our wedding cake was the talk of the night. Maya took our vague ideas and turned them into something beautiful — and delicious.',
      rating: 5,
    },
    {
      name: 'Tom R.',
      role: 'Regular since 2015',
      quote: 'The best sourdough in Portland, full stop. I plan my Saturday mornings around it.',
      rating: 5,
    },
    {
      name: 'Lena K.',
      role: 'Office manager',
      quote: 'They cater our monthly team breakfast. Always on time, always fresh, and the team loves the variety.',
      rating: 5,
    },
  ],

  seo: {
    title: 'Golden Crumb Bakery — Sourdough, Pastries & Custom Cakes in Portland',
    description:
      'Neighbourhood bakery in Portland, OR. Fresh sourdough, pastries, custom celebration cakes and event catering, baked from scratch every day.',
    keywords: ['bakery Portland', 'sourdough', 'custom cakes', 'wedding cakes', 'pastries', 'catering'],
    ogImage: '/images/og-image.jpg',
    locale: 'en_US',
    pages: {
      about: {
        title: 'About us',
        description: 'Meet the team behind Golden Crumb Bakery and learn how we bake: slow fermentation, local ingredients, zero waste.',
      },
      services: {
        title: 'Cakes, bread & catering',
        description: 'Custom celebration cakes, artisan sourdough, event catering, wholesale and baking classes in Portland, OR.',
      },
      gallery: {
        title: 'Gallery',
        description: 'Photos of our cakes, breads and pastries, and a look inside the Golden Crumb kitchen.',
      },
      contact: {
        title: 'Contact & opening hours',
        description: 'Call, WhatsApp or message Golden Crumb Bakery. Find our address, opening hours and directions.',
      },
    },
  },
};
