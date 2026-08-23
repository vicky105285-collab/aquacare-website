import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANDING_PAGES } from "@/lib/site/landing-pages";
import { IndustrialLandingPage } from "@/components/IndustrialLandingPage";
import { COMPANY_NAME, SITE_URL } from "@/lib/site/constants";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = LANDING_PAGES.find((p) => p.slug === slug);
  if (!page) return { title: "Industrial Water Treatment" };

  const url = `${SITE_URL}/${page.slug}`;

  return {
    title: `${page.metaTitle} | ${COMPANY_NAME}`,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${page.metaTitle} | ${COMPANY_NAME}`,
      description: page.metaDescription,
      siteName: COMPANY_NAME,
      images: [
        {
          url: `${SITE_URL}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${page.title} | ${COMPANY_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.metaTitle} | ${COMPANY_NAME}`,
      description: page.metaDescription,
      images: [`${SITE_URL}/images/og-image.png`],
    },
  };
}

export default async function LandingPageRoute({ params }: Props) {
  const { slug } = await params;
  const page = LANDING_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  return <IndustrialLandingPage page={page} />;
}
