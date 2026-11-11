import type { ThemeColors } from '../config/site.config';

/**
 * Turns the three brand colours from the config into CSS custom properties.
 * It also derives accessible companions so any brand colour stays readable:
 *  - `--color-*-contrast`: black or white, whichever reads best ON that colour
 *  - `--color-primary-text`: primary darkened (if needed) to reach 4.5:1 on white,
 *    used for links and coloured text.
 *  - `--color-primary-fill`: primary darkened (if needed) so white button text reaches
 *    4.5:1 — used as the background of primary buttons and badges.
 */

type RGB = [number, number, number];

function hexToRgb(hex: string): RGB {
  let h = hex.trim().replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-f]{6}$/i.test(h)) throw new Error(`Invalid theme colour "${hex}" — use hex like #1a2b3c`);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
}

function rgbToHex([r, g, b]: RGB): string {
  return '#' + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
}

function luminance([r, g, b]: RGB): number {
  const [R, G, B] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function contrastRatio(a: string, b: string): number {
  const la = luminance(hexToRgb(a));
  const lb = luminance(hexToRgb(b));
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const DARK = '#1a1a1a';
const LIGHT = '#ffffff';

/** Best readable text colour on top of `bg`. */
export function contrastText(bg: string): string {
  return contrastRatio(bg, LIGHT) >= contrastRatio(bg, DARK) ? LIGHT : DARK;
}

/** Darken `hex` step by step until it reaches `min` contrast against `bg`. */
function ensureContrast(hex: string, bg = LIGHT, min = 4.5): string {
  let rgb = hexToRgb(hex);
  for (let i = 0; i < 40 && contrastRatio(rgbToHex(rgb), bg) < min; i++) {
    rgb = rgb.map((v) => v * 0.92) as RGB;
  }
  return rgbToHex(rgb);
}

export function themeToCss(theme: ThemeColors): string {
  const primaryContrast = contrastText(theme.primary);
  const vars: Record<string, string> = {
    '--color-primary': theme.primary,
    '--color-primary-contrast': primaryContrast,
    '--color-primary-fill': primaryContrast === LIGHT ? ensureContrast(theme.primary, LIGHT) : theme.primary,
    '--color-primary-text': ensureContrast(theme.primary),
    '--color-secondary': theme.secondary,
    '--color-secondary-contrast': contrastText(theme.secondary),
    '--color-accent': theme.accent,
    '--color-accent-contrast': contrastText(theme.accent),
  };
  return `:root{${Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(';')}}`;
}
