import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  ADDRESS_LOCALITY,
  ADDRESS_POSTAL_CODE,
  ADDRESS_REGION,
  ADDRESS_STREET,
  BUSINESS_HISTORY_NOTE,
  BUSINESS_OWNER,
  EMAIL,
  FORMER_COMPANY_NAME,
  GA_MEASUREMENT_ID,
  LATITUDE,
  LONGITUDE,
  MAPS_DIRECTIONS_URL,
  PHONE_E164,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: FORMER_COMPANY_NAME,
      description: `${SITE_TAGLINE} ${BUSINESS_HISTORY_NOTE}`,
      url: SITE_URL,
      telephone: PHONE_E164,
      email: EMAIL,
      foundingDate: "2014",
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS_STREET,
        addressLocality: ADDRESS_LOCALITY,
        addressRegion: ADDRESS_REGION,
        postalCode: ADDRESS_POSTAL_CODE,
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
      areaServed: [
        "Karur",
        "Namakkal",
        "Erode",
        "Tiruchirappalli",
        "Salem",
        "Dindigul",
        "Tiruppur",
        "Coimbatore",
        "Madurai",
        "Thanjavur",
        "Tamil Nadu",
      ],
      founder: {
        "@type": "Person",
        name: BUSINESS_OWNER,
      },
      owner: {
        "@type": "Person",
        name: BUSINESS_OWNER,
      },
      priceRange: "$$",
      hasMap: MAPS_DIRECTIONS_URL,
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#corp`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
      founder: {
        "@type": "Person",
        name: BUSINESS_OWNER,
      },
      sameAs: [
        "https://www.instagram.com/ananthaquacareindia",
        MAPS_DIRECTIONS_URL,
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Water Treatment & Solar Solutions Tamil Nadu`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `${SITE_TAGLINE} ${BUSINESS_HISTORY_NOTE}`,
  keywords: [
    "Yuvanthika Aquacare & Solar Care Systems",
    "Yuvanthika Aquacare Karur",
    "Aqua Care & Solar Care Systems",
    "Aqua Care Karur",
    "RO Service Karur",
    "Water Softener Karur",
    "Solar Water Heater Karur",
    "Industrial RO Plant Tamil Nadu",
    "Commercial RO Plant Tamil Nadu",
    "ETP Plant Tamil Nadu",
    "STP Plant Tamil Nadu",
    "DM Plant Tamil Nadu",
    "Water Treatment Plant Tamil Nadu",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Karur & Tamil Nadu`,
    description: `${SITE_TAGLINE} ${BUSINESS_HISTORY_NOTE}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Karur & Tamil Nadu`,
    description: `${SITE_TAGLINE} ${BUSINESS_HISTORY_NOTE}`,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, email: true, address: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-800 font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-blue-700 focus:shadow-lg"
        >
          Skip to main content
        </a>
        <AppShell>{children}</AppShell>
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}

