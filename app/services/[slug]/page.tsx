import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/ServicePageView";
import { COMPANY_NAME, FORMER_COMPANY_NAME, PHONE_E164, SITE_URL } from "@/lib/site/constants";
import { getServiceDetail, SERVICE_SLUGS } from "@/lib/site/service-details";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = getServiceDetail(slug);
  if (!d) return { title: "Service | Yuvanthika Aquacare & Solar Care Systems" };
  const url = `${SITE_URL}/services/${d.slug}`;

  const localKeywords = [
    ...d.keywords,
    `${d.heroTitle} Karur`,
    `${d.heroTitle} Tamil Nadu`,
    "Yuvanthika Aquacare & Solar Care Systems",
    "Aqua Care Karur",
    "Water Treatment Services Karur",
    "Solar Systems Karur",
  ];

  return {
    title: d.metaTitle,
    description: `${d.metaDescription} Formerly known as ${FORMER_COMPANY_NAME}.`,
    keywords: localKeywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: d.metaTitle,
      description: d.metaDescription,
      siteName: COMPANY_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: d.metaTitle,
      description: d.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const d = getServiceDetail(slug);
  if (!d) notFound();

  // Generate Service JSON-LD for Local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": d.heroTitle,
    "provider": {
      "@type": "LocalBusiness",
      "name": COMPANY_NAME,
      "alternateName": FORMER_COMPANY_NAME,
      "url": SITE_URL,
      "telephone": PHONE_E164,
    },
    "areaServed": [
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
    "description": d.heroSubtitle,
    "serviceType": d.heroTitle,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageView detail={d} />
    </>
  );
}

