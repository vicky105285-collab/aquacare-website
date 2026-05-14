export const SITE_NAME = "Aqua Care & Solar Care Systems";
export const SITE_TAGLINE = "Pure water, clean energy, and trusted home services in Karur, Tamil Nadu.";
export const SITE_LOCALITY = "Karur, Tamil Nadu, India";

/** Set in production via env for canonical URLs and Open Graph */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://aquacaresolar.in";

export const CALL = "tel:+918526664424";
export const PHONE_DISPLAY = "+91 85266 64424";

export const WHATSAPP =
  "https://wa.me/918526664424?text=Hello%2C%20I%20need%20a%20service%20from%20Aqua%20Care%20%26%20Solar%20Care%20Systems";

export const INSTAGRAM = "https://www.instagram.com/ananthaquacareindia";

export const EMAIL = "care@aquacaresolar.in";

export const ADDRESS_LINES = ["123, Sakthi Nagar, Karur", "Tamil Nadu – 639 001"] as const;

/** Google Maps search for storefront / area */
export const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=Aqua+Care+Solar+Care+Systems+Karur";
