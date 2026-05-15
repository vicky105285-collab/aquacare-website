import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/ServicePageView";
import { SITE_NAME, SITE_URL } from "@/lib/site/constants";
import { getServiceDetail, SERVICE_SLUGS } from "@/lib/site/service-details";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = getServiceDetail(slug);
  if (!d) return { title: "Service" };
  const url = `${SITE_URL}/services/${d.slug}`;
  
  // Inject local keywords dynamically
  const localKeywords = [
    ...d.keywords,
    `${d.heroTitle} in Karur`,
    `Best ${d.heroTitle} near me`,
    "Karur district water service"
  ];

  return {
    title: `${d.metaTitle} | Karur & Nearby`,
    description: d.metaDescription,
    keywords: localKeywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${d.metaTitle} in Karur`,
      description: d.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: `${d.metaTitle} in Karur`,
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
      "name": "Aqua Care Systems Karur",
      "image": `${SITE_URL}/logo.png`,
    },
    "areaServed": {
      "@type": "City",
      "name": "Karur"
    },
    "description": d.heroSubtitle,
    "serviceType": d.heroTitle
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
