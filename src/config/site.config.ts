/**
 * ============================================================================
 *  SITE CONFIG — all website content lives in this one file.
 * ============================================================================
 *  Components only read from this object; no business content is hardcoded
 *  in them. Search this file for "TODO" to find everything that must be
 *  replaced before launch.
 *
 *  Images: put files in `public/images/` and reference them with a path
 *  starting at `/images/...`.
 *
 *  Links: any `href` can be a normal path ("/work/"), a full URL, or the
 *  special value "whatsapp", which opens a WhatsApp chat with
 *  `contact.whatsappMessage` pre-filled.
 * ============================================================================
 */

import type { IconName } from '../lib/icons';

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
  /** Path inside /public, e.g. "/images/work/clinic.jpg" */
  src: string;
  /** Describe the image for screen readers. Required for accessibility. */
  alt: string;
  /** Intrinsic size — prevents layout shift. Use the real file dimensions. */
  width?: number;
  height?: number;
}

export interface ThemeColors {
  /** Main brand colour: buttons, links, highlights. Any CSS hex colour. */
  primary: string;
  /** Dark brand colour: hero, page headers, footer, headings. */
  secondary: string;
  /** Light highlight colour, used on dark backgrounds. */
  accent: string;
}

/** A button or link. `href: "whatsapp"` opens a WhatsApp chat. */
export interface CtaLink {
  label: string;
  href: string;
}

/** Eyebrow + heading + intro used at the top of most sections. */
export interface SectionCopy {
  /** Small label above the heading. Optional. */
  eyebrow?: string;
  heading: string;
  intro?: string;
}

export interface Address {
  street?: string;
  city: string;
  region?: string;
  postalCode?: string;
  /** ISO 3166-1 alpha-2 country code, e.g. "IN". */
  country: string;
}

export interface OpeningHours {
  /** Text shown on the site, e.g. "Monday – Saturday". */
  label: string;
  /** Days covered by this row (used for the JSON-LD schema). */
  days: DayOfWeek[];
  /** 24h "HH:MM". Set `closed: true` instead for closed days. */
  opens?: string;
  closes?: string;
  closed?: boolean;
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'x' | 'linkedin' | 'youtube' | 'tiktok' | 'google';
  url: string;
}

/** A titled item with an icon (feature lists, values, etc.). */
export interface FeatureItem {
  icon: IconName;
  title: string;
  description: string;
}

export interface Service {
  icon: IconName;
  title: string;
  /** One short line. */
  description: string;
  /** What's included, shown as a checklist on the Services page. */
  features?: string[];
  /** Free text, e.g. "Contact for pricing" or "From ₹9,999". Omit to hide. */
  price?: string;
  /** Optional photo; services show an icon when no image is given. */
  image?: ImageAsset;
}

export interface Project {
  name: string;
  /** e.g. "Dental clinic", "Restaurant". */
  businessType: string;
  description: string;
  image: ImageAsset;
  /** Optional link to the live site. */
  url?: string;
}

export interface Testimonial {
  name: string;
  quote: string;
  /** e.g. "Owner, Sharma Dental Clinic". */
  role?: string;
  /** 1–5. Omit to hide stars. */
  rating?: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageSeo {
  title: string;
  description: string;
}

export interface SeoConfig {
  /** Home page <title>. */
  title: string;
  /** Default meta description (≈150–160 characters). */
  description: string;
  keywords: string[];
  /** Social share image (1200×630 JPG/PNG). */
  ogImage: string;
  /** e.g. "en_IN". */
  locale: string;
  /** Per-page overrides. Titles get " | Business name" appended. */
  pages: {
    services: PageSeo;
    work: PageSeo;
    about: PageSeo;
    contact: PageSeo;
  };
}

export interface SiteConfig {
  /** Production URL, no trailing slash. Used for canonical links + sitemap. */
  url: string;
  /** HTML lang attribute, e.g. "en" or "en-IN". */
  language: string;

  businessName: string;
  tagline: string;
  description: string;
  /** schema.org type, e.g. "ProfessionalService", "Dentist", "Restaurant". */
  businessType: string;
  /** Regions served, used in the JSON-LD schema. */
  areaServed?: string[];
  /** Topics for the JSON-LD schema (what the business is expert in). */
  knowsAbout?: string[];

  /** Logo for light backgrounds (header). */
  logo: ImageAsset;
  /** Logo for dark backgrounds (footer). Falls back to `logo`. */
  logoLight?: ImageAsset;
  /** Show the business name as text next to the logo. Off for wordmark logos. */
  showNameWithLogo: boolean;
  favicon: string;

  theme: ThemeColors;

  contact: {
    /** Display format, e.g. "+91 98765 43210". */
    phone: string;
    /** International format, digits only with country code — no "+", spaces or dashes. */
    whatsapp: string;
    /** Pre-filled message for WhatsApp buttons. */
    whatsappMessage: string;
    email: string;
    address: Address;
    /** Short location line shown on the site, e.g. "Pune, India". */
    locationLabel?: string;
    /** Google Maps embed `src` URL. Omit to hide the map. */
    mapEmbedUrl?: string;
    mapLink?: string;
    /** e.g. "We reply within a few hours". */
    responseTime?: string;
    /** Languages you can talk to customers in (used in the JSON-LD schema). */
    languages?: string[];
  };

  /** Opening hours. Leave empty to hide them everywhere. */
  hours: OpeningHours[];
  social: SocialLink[];

  navigation: CtaLink[];
  /** Button at the end of the header menu. */
  headerCta?: CtaLink & { icon?: IconName };

  home: {
    hero: {
      eyebrow?: string;
      heading: string;
      subheading: string;
      primaryCta: CtaLink;
      secondaryCta?: CtaLink;
      /** Short reassurance points under the buttons. */
      trustPoints?: string[];
      image?: ImageAsset;
    };
    services: SectionCopy & { linkLabel: string };
    why: SectionCopy & { items: FeatureItem[] };
    process: SectionCopy & { steps: { title: string; description: string }[] };
    testimonials: SectionCopy;
    /** Show the FAQ section on the home page. */
    showFaq: boolean;
  };

  /** Call-to-action banner at the bottom of most pages. */
  cta: {
    heading: string;
    text: string;
    primary: CtaLink;
    secondary?: CtaLink;
  };

  about: {
    page: SectionCopy;
    story: SectionCopy & { paragraphs: string[] };
    image?: ImageAsset;
    highlights: { value: string; label: string }[];
    approach: SectionCopy & { items: FeatureItem[] };
  };

  servicesPage: SectionCopy & {
    /** Label of the WhatsApp enquiry button on each service card. */
    enquireLabel: string;
    /** Pre-filled WhatsApp message; "{service}" is replaced by the service title. */
    enquireMessage: string;
  };
  workPage: SectionCopy & { note?: string };
  contactPage: SectionCopy & {
    formHeading: string;
    successMessage: string;
    /** WhatsApp card beside the form. Its text comes from `contact.responseTime`. */
    whatsappCard: { heading: string; buttonLabel: string };
  };

  services: Service[];
  projects: Project[];
  /** Leave empty to hide the testimonials section. */
  testimonials: Testimonial[];
  faq: SectionCopy & { items: FaqItem[] };

  seo: SeoConfig;
}

// ---------------------------------------------------------------------------
// Imprio
// ---------------------------------------------------------------------------

export const siteConfig: SiteConfig = {
  url: 'https://imprio.com', // TODO: confirm the live domain (no trailing slash)
  language: 'en-IN',

  businessName: 'Imprio',
  tagline: 'Your business, live online.',
  description:
    'Imprio builds websites, web apps and mobile apps for small businesses in India. We build fast using AI, and test every project to enterprise quality standards before launch.',
  businessType: 'ProfessionalService',
  areaServed: ['India'],
  knowsAbout: ['Website design', 'Web application development', 'Mobile app development', 'Software testing'],

  logo: { src: '/images/logo.svg', alt: 'Imprio', width: 322, height: 102 },
  logoLight: { src: '/images/logo-light.svg', alt: 'Imprio', width: 322, height: 102 },
  showNameWithLogo: false,
  favicon: '/images/favicon.svg',

  theme: {
    primary: '#2F6BFF', // electric blue
    secondary: '#0B1530', // dark navy
    accent: '#8DB2FF', // light blue for use on navy
  },

  contact: {
    phone: '+91 00000 00000', // TODO: replace with your real phone number
    whatsapp: '910000000000', // TODO: replace — country code + number, digits only (e.g. 919876543210)
    whatsappMessage: "Hi Imprio! I'd like to get my business online.",
    email: 'hello@imprio.com', // TODO: replace with your real email address
    address: { city: 'Pune', region: 'Maharashtra', country: 'IN' },
    locationLabel: 'Pune, India',
    responseTime: 'We usually reply within a few hours.',
    languages: ['English', 'Hindi', 'Marathi'], // TODO: confirm
  },

  hours: [],
  social: [
    // TODO: add your profiles, e.g. { platform: 'instagram', url: 'https://instagram.com/imprio' },
  ],

  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services/' },
    { label: 'Work', href: '/work/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],
  headerCta: { label: 'WhatsApp us', href: 'whatsapp', icon: 'whatsapp' },

  home: {
    hero: {
      eyebrow: 'Websites & apps for small businesses',
      heading: 'Your business, live online.',
      subheading:
        'We build websites and apps for clinics, restaurants, gyms, shops and more. Built fast, tested properly, priced for small businesses.',
      primaryCta: { label: 'WhatsApp us', href: 'whatsapp' },
      secondaryCta: { label: 'See our work', href: '/work/' },
      trustPoints: ['Live in days, not months', 'Tested before launch', 'Support after launch'],
      image: {
        src: '/images/hero.svg',
        alt: 'A business website shown on a laptop and a mobile phone',
        width: 1200,
        height: 900,
      },
    },
    services: {
      eyebrow: 'What we build',
      heading: 'Everything you need to get online',
      intro: 'From a simple website to your own app — we handle it all.',
      linkLabel: 'See all services',
    },
    why: {
      eyebrow: 'Why Imprio',
      heading: 'Built fast. Tested properly.',
      intro: 'You get big-company quality at a small-business price.',
      items: [
        {
          icon: 'bolt',
          title: 'Fast delivery',
          description: 'We use AI tools to build faster, so you go live in days, not months.',
        },
        {
          icon: 'shield',
          title: 'Tested before launch',
          description: 'Every page, form and button is checked on real phones and computers before you go live.',
        },
        {
          icon: 'tag',
          title: 'Affordable',
          description: 'Fair pricing with no hidden costs. You know the price before we start.',
        },
        {
          icon: 'headset',
          title: 'Ongoing support',
          description: 'We don’t disappear after launch. Message us any time you need help.',
        },
      ],
    },
    process: {
      eyebrow: 'How it works',
      heading: 'Online in 4 simple steps',
      intro: 'No tech knowledge needed. We do the hard work.',
      steps: [
        { title: 'Share details', description: 'Tell us about your business on WhatsApp or a quick call.' },
        { title: 'We design', description: 'We build your website and send you a preview link.' },
        { title: 'You review', description: 'Ask for changes. We update it until you’re happy.' },
        { title: 'Go live', description: 'We test everything, launch your site and set up Google for you.' },
      ],
    },
    testimonials: {
      eyebrow: 'Happy clients',
      heading: 'What our clients say',
    },
    showFaq: true,
  },

  cta: {
    heading: 'Ready to take your business online?',
    text: 'Send us a message on WhatsApp. We’ll tell you what you need, how long it takes, and what it costs.',
    primary: { label: 'WhatsApp us', href: 'whatsapp' },
    secondary: { label: 'Send an enquiry', href: '/contact/' },
  },

  about: {
    page: {
      eyebrow: 'About Imprio',
      heading: 'Good websites shouldn’t be only for big companies',
      intro: 'We help small businesses in India get online with websites and apps they can trust.',
    },
    story: {
      heading: 'Why Imprio exists',
      paragraphs: [
        'Many small businesses want to be online, but end up with slow, broken websites, or developers who disappear after launch.',
        'Imprio was started to fix that. Our founder spent more than 10 years in software testing and release management at large IT companies, making sure software worked before it reached customers.',
        'We bring that same care to small businesses. We build fast with modern AI tools, then test everything properly before it goes live. You get a website that works, at a price that makes sense.',
      ],
    },
    highlights: [
      { value: '10+', label: 'years in software quality and releases' },
      { value: '100%', label: 'of projects tested before launch' },
      { value: '1', label: 'point of contact, start to finish' },
    ],
    approach: {
      eyebrow: 'Our approach',
      heading: 'Quality first, every time',
      intro: 'Before anything goes live, we check it the way large IT companies do.',
      items: [
        {
          icon: 'checklist',
          title: 'A checklist for every project',
          description: 'We write down everything your site must do, then check each item one by one.',
        },
        {
          icon: 'devices',
          title: 'Tested on real devices',
          description: 'Android phones, iPhones and computers — on fast and slow internet.',
        },
        {
          icon: 'shield',
          title: 'Speed and safety checks',
          description: 'Pages load fast, forms work, and your customers’ details stay safe.',
        },
        {
          icon: 'rocket',
          title: 'A careful launch',
          description: 'Domain, Google listing, WhatsApp and email are all checked on launch day.',
        },
      ],
    },
  },

  servicesPage: {
    eyebrow: 'Services',
    heading: 'What we can build for you',
    intro: 'Pick what fits your business today. You can always add more later.',
    enquireLabel: 'Ask on WhatsApp',
    enquireMessage: "Hi Imprio! I'm interested in: {service}. Can you tell me more?",
  },
  workPage: {
    eyebrow: 'Our work',
    heading: 'Websites and apps we’ve built',
    intro: 'A few recent projects for local businesses.',
  },
  contactPage: {
    eyebrow: 'Contact',
    heading: 'Let’s get your business online',
    intro: 'Tell us a little about your business. We’ll reply with next steps — no pressure, no jargon.',
    formHeading: 'Send us a message',
    successMessage: 'Thank you! Your message has been sent. We’ll get back to you soon.',
    whatsappCard: { heading: 'Prefer WhatsApp?', buttonLabel: 'Chat on WhatsApp' },
  },

  services: [
    {
      icon: 'globe',
      title: 'Starter Website',
      description: 'A professional website that brings you new customers.',
      features: [
        'Business website with your services and photos',
        'WhatsApp enquiry button',
        'Google Maps location',
        'Google Business Profile setup',
        'Works perfectly on mobile',
        'Basic Google search setup (SEO)',
      ],
      price: 'Contact for pricing',
    },
    {
      icon: 'dashboard',
      title: 'Web Apps',
      description: 'Online tools that save you time and bring in money.',
      features: [
        'Online bookings and appointments',
        'Online payments (UPI, cards)',
        'Admin dashboard to manage everything',
      ],
      price: 'Contact for pricing',
    },
    {
      icon: 'smartphone',
      title: 'Mobile Apps',
      description: 'Your own app for your customers’ phones.',
      features: ['Android app', 'iPhone (iOS) app', 'Published on Play Store and App Store'],
      price: 'Contact for pricing',
    },
    {
      icon: 'wrench',
      title: 'Care Plan',
      description: 'We look after your website every month, so you don’t have to.',
      features: ['Hosting', 'Updates and security', 'Fixes when something breaks', 'Small changes every month'],
      price: 'Contact for pricing',
    },
  ],

  // TODO: replace these 3 sample projects with real client work before launch.
  projects: [
    {
      name: 'Clinic website',
      businessType: 'Dental clinic · Sample project',
      description: 'Online appointment requests, treatment list and a WhatsApp button for quick questions.',
      image: { src: '/images/work/clinic.svg', alt: 'Sample dental clinic website on a laptop screen', width: 1200, height: 900 },
    },
    {
      name: 'Restaurant website',
      businessType: 'Restaurant · Sample project',
      description: 'Digital menu, table booking and Google Maps directions, all on one fast page.',
      image: { src: '/images/work/restaurant.svg', alt: 'Sample restaurant website showing a menu', width: 1200, height: 900 },
    },
    {
      name: 'Gym membership app',
      businessType: 'Gym · Sample project',
      description: 'Members book classes and pay fees online; the owner tracks everything from one dashboard.',
      image: { src: '/images/work/gym.svg', alt: 'Sample gym app with a class booking screen', width: 1200, height: 900 },
    },
  ],

  // TODO: add real client reviews here. The section stays hidden while this list is empty.
  testimonials: [],

  // TODO: check timelines and payment terms match how you actually work.
  faq: {
    eyebrow: 'FAQ',
    heading: 'Questions we often get',
    intro: 'Can’t find your answer? Just WhatsApp us.',
    items: [
      {
        question: 'How long does a website take?',
        answer:
          'A starter website is usually live within 7 working days after we get your details. Web and mobile apps take a few weeks — we’ll give you a clear timeline before we start.',
      },
      {
        question: 'What do I need to provide?',
        answer:
          'Your business name, logo (if you have one), photos, services, prices and contact details. Don’t have everything ready? We’ll help you put it together.',
      },
      {
        question: 'Do I own my website and domain?',
        answer:
          'Yes. Your domain is registered in your name and the website belongs to you. No lock-in, ever.',
      },
      {
        question: 'What happens after launch?',
        answer:
          'We stay with you. With our Care Plan we handle hosting, updates, fixes and small changes every month. Without it, you can still message us whenever you need help.',
      },
      {
        question: 'How does payment work?',
        answer:
          'You get a fixed price before we start. You pay 50% to begin and the rest before your site goes live, by UPI or bank transfer. The Care Plan is billed monthly.',
      },
    ],
  },

  seo: {
    title: 'Imprio — Websites & Apps for Small Businesses in India',
    description:
      'Imprio builds fast, fully tested websites, web apps and mobile apps for small businesses in India. Based in Pune. WhatsApp us to get started.',
    keywords: [
      'website for small business',
      'website design Pune',
      'web development India',
      'mobile app development',
      'clinic website',
      'restaurant website',
      'gym website',
    ],
    ogImage: '/images/og-image.jpg',
    locale: 'en_IN',
    pages: {
      services: {
        title: 'Websites, Web Apps & Mobile Apps',
        description:
          'Starter websites, web apps with bookings and payments, Android and iPhone apps, and a monthly Care Plan for small businesses in India.',
      },
      work: {
        title: 'Our Work',
        description: 'Websites and apps Imprio has built for clinics, restaurants, gyms and other local businesses.',
      },
      about: {
        title: 'About Us',
        description:
          'Imprio is a Pune-based web studio founded by a QA and release management expert with 10+ years in large IT companies. Quality first, every time.',
      },
      contact: {
        title: 'Contact',
        description: 'WhatsApp, email or send us a message. Imprio is based in Pune and works with small businesses across India.',
      },
    },
  },
};
