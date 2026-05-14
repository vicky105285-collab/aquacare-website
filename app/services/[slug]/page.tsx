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
  return {
    title: `${d.metaTitle} | ${SITE_NAME}`,
    description: d.metaDescription,
    keywords: d.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: d.metaTitle,
      description: d.metaDescription,
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
  return <ServicePageView detail={d} />;
}
