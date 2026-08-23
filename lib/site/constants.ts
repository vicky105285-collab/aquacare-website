/** Legal / registered business name */
export const COMPANY_NAME = "Yuvanthika Aquacare & Solar Care Systems";

/** Former business name for trust preservation */
export const FORMER_COMPANY_NAME = "Aqua Care & Solar Care Systems";

/** Trust & history badge note */
export const BUSINESS_HISTORY_NOTE =
  "Formerly known as Aqua Care & Solar Care Systems, serving customers since 2014.";

/** Two-line logo lockup in navbar (visual brand split) */
export const BRAND_LOGO_LINE_1 = "Yuvanthika Aquacare &";
export const BRAND_LOGO_LINE_2 = "Solar Care Systems";

export const SITE_NAME = COMPANY_NAME;
export const SITE_TAGLINE =
  "Trusted residential, commercial & industrial water treatment and solar solutions in Karur & across Tamil Nadu since 2014.";
export const SITE_LOCALITY = "Karur, Tamil Nadu, India";

/** Set in production via env for canonical URLs and Open Graph */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://yuvanthikaaquasolar.in";

/** Base phone digits used for tel: and wa.me links. */
export const WHATSAPP_PHONE_DIGITS = "918428888854";

/** Standard click-to-call link */
export const CALL = `tel:+${WHATSAPP_PHONE_DIGITS}`;

/** Human-readable phone */
export const PHONE_DISPLAY = "+91 84288 88854";

/** ITU-T E.164 for JSON-LD `telephone` */
export const PHONE_E164 = `+${WHATSAPP_PHONE_DIGITS}`;

const DEFAULT_WA_MESSAGE =
  "Hi Yuvanthika Aquacare & Solar Care Systems! I am visiting your website and would like to request a free quote/consultation. Please get back to me.";

export const WHATSAPP = `https://wa.me/${WHATSAPP_PHONE_DIGITS}?text=${encodeURIComponent(DEFAULT_WA_MESSAGE)}`;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE_DIGITS}?text=${encodeURIComponent(message)}`;
}

export const INSTAGRAM = "https://www.instagram.com/ananthaquacareindia";

export const EMAIL = "aquacareindia1@gmail.com";

export const MAILTO_EMAIL = `mailto:${EMAIL}`;

/** Structured address (Reddipalayam showroom / office) */
export const ADDRESS_STREET = "SH 84, Erode - Karur Rd, Reddipalayam";
export const ADDRESS_LOCALITY = "Karur";
export const ADDRESS_REGION = "Tamil Nadu";
export const ADDRESS_POSTAL_CODE = "639002";
export const ADDRESS_COUNTRY = "IN";

/** Single line for maps query, schema, and meta */
export const ADDRESS_FULL = `${ADDRESS_STREET}, ${ADDRESS_LOCALITY}, ${ADDRESS_REGION} ${ADDRESS_POSTAL_CODE}`;

/** Two lines for cards and compact UI */
export const ADDRESS_LINES: readonly [string, string] = [
  `${ADDRESS_STREET}, ${ADDRESS_LOCALITY}`,
  `${ADDRESS_REGION} ${ADDRESS_POSTAL_CODE}`,
];

/** Short link — open in Maps app / browser */
export const MAPS_DIRECTIONS_URL = "https://maps.app.goo.gl/ZTdXepPdGCuifZ547";

/**
 * Google Maps embed (no API key). Uses address query; replace with place embed `pb=` if you add one from Maps UI.
 */
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_FULL)}&output=embed`;

