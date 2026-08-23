import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site/constants";
import { HomePageClient } from "@/components/HomePageClient";

const title = `${SITE_NAME} | RO Water Purifier, Solar Heater & STP Plant in Karur`;
const description = `${SITE_TAGLINE} Multi-stage RO purifiers, industrial ETP/STP plants, solar water heaters & panels, AMC plans, and water softeners with same-day service across Karur, Namakkal, and Erode.`;

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
