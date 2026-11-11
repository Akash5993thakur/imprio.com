import { siteConfig } from '../config/site.config';

/** wa.me deep link with an optional pre-filled message. */
export function whatsappLink(message = siteConfig.contact.whatsappMessage): string {
  const number = siteConfig.contact.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

/** tel: link from any display-formatted phone number. */
export function telLink(phone = siteConfig.contact.phone): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

/** "07:00" -> "7:00 AM" (locale-aware via Intl). */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const date = new Date(Date.UTC(2000, 0, 1, h, m));
  return new Intl.DateTimeFormat(siteConfig.language, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }).format(date);
}

export function formatAddress(): string[] {
  const a = siteConfig.contact.address;
  return [a.street, [a.city, a.region, a.postalCode].filter(Boolean).join(', ')];
}

/** Absolute URL for a path, based on the configured site URL. */
export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).href;
}

/** Normalise "/about" and "/about/" for nav active-state comparison. */
export function samePath(a: string, b: string): boolean {
  const norm = (p: string) => (p.replace(/\/+$/, '') || '/');
  return norm(a) === norm(b);
}
