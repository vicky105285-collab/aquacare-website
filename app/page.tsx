import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site/constants";
import { HomePageClient } from "@/components/HomePageClient";

const title = `${SITE_NAME} | RO, Solar & Home Services in Karur`;
const description = `${SITE_TAGLINE} Multi-stage RO purifiers, solar water heaters & panels, AMC plans, water softeners, and appliance repair with same-day service across Karur district.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "RO water purifier Karur",
    "solar water heater Karur",
    "solar panel installation",
    "water softener",
    "RO AMC",
    "fridge repair Karur",
    "washing machine repair",
    "Aqua Care",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
