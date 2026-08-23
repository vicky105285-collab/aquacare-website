/** Legal / registered business name */
export const COMPANY_NAME = "Yuvanthika Aquacare & Solar Care Systems";

/** Former business name for trust preservation */
export const FORMER_COMPANY_NAME = "Aqua Care & Solar Care Systems";

/** Business owner name */
export const BUSINESS_OWNER = "Mr. Ananth";

/** Developer & engineering credit */
export const DEVELOPER_CREDIT = "Dr. Vignesh M.S.";
export const DEVELOPER_WHATSAPP_PHONE = "919543434749";
export const DEVELOPER_WHATSAPP_URL =
  "https://wa.me/919543434749?text=Hi%20Dr.%20Vignesh,%20I%20saw%20the%20Yuvanthika%20Aquacare%20website%20you%20developed%20and%20would%20like%20to%20discuss%20building%20a%20website%20for%20my%20business.";

/** Trust & history badge note */
export const BUSINESS_HISTORY_NOTE =
  "Formerly known as Aqua Care & Solar Care Systems, serving customers since 2014.";

/** Official Google Business Review link */
export const GOOGLE_REVIEW_URL = "https://g.page/r/CdK_0JHo7kH5EAI/review";

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

/** Official Business Location Details */
export const ADDRESS_STREET = "Andankoil East";
export const ADDRESS_LOCALITY = "Karur";
export const ADDRESS_REGION = "Tamil Nadu";
export const ADDRESS_POSTAL_CODE = "639002";
export const ADDRESS_COUNTRY = "IN";
export const PLUS_CODE = "X29X+3QR";

/** Exact Google Business Profile Listing Coordinates */
export const LATITUDE = "10.9677355";
export const LONGITUDE = "78.0493822";

/** Single line for maps query, schema, and meta */
export const ADDRESS_FULL = `${ADDRESS_STREET}, ${ADDRESS_LOCALITY}, ${ADDRESS_REGION} ${ADDRESS_POSTAL_CODE}`;

/** Two lines for cards and compact UI */
export const ADDRESS_LINES: readonly [string, string] = [
  `${ADDRESS_STREET}, ${ADDRESS_LOCALITY}`,
  `${ADDRESS_REGION} ${ADDRESS_POSTAL_CODE}`,
];

/** Exact Google Maps Business Listing URL for directions & external links */
export const MAPS_DIRECTIONS_URL = "https://maps.app.goo.gl/n9AB68PGcExhybM37";

/** Google Analytics 4 Measurement ID */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-1B5XT1GH9C";

/** Exact Google Maps Place Embed URL for Yuvanthika Aqua Care & Solar Care Systems */
export const MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.4728373024846!2d78.0493822!3d10.9677355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa2f1dca0a3871%3A0xf941eee891d0bfd2!2sYuvanthika%20Aqua%20Care%20%26%20Solar%20Care%20Systems!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";
