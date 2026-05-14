import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { ADDRESS_LINES, EMAIL, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site/constants";

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
  "@type": "LocalBusiness",
  name: SITE_NAME,
  description: SITE_TAGLINE,
  url: SITE_URL,
  telephone: "+918526664424",
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS_LINES[0],
    addressLocality: "Karur",
    addressRegion: "Tamil Nadu",
    postalCode: "639001",
    addressCountry: "IN",
  },
  areaServed: ["Karur", "Kulithalai", "Aravakurichi", "Krishnarayapuram", "Pugalur", "Tiruchirappalli"],
  priceRange: "$$",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | RO, Solar & Home Services`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  keywords: [
    "Aqua Care Karur",
    "RO purifier",
    "solar water heater",
    "solar panels",
    "AMC RO",
    "water softener",
    "appliance repair Karur",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Karur`,
    description: SITE_TAGLINE,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Karur`,
    description: SITE_TAGLINE,
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
      </body>
    </html>
  );
}
