import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDynamicProjectBySlug, PROJECTS_DATA } from "@/lib/site/projects";
import { ProjectDetailPageView } from "@/components/ProjectDetailPageView";
import { COMPANY_NAME, FORMER_COMPANY_NAME, SITE_URL, ADDRESS_FULL, PHONE_DISPLAY } from "@/lib/site/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PROJECTS_DATA.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getDynamicProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Yuvanthika Aquacare",
    };
  }

  const title = `${project.projectTitle || project.projectName} | ${COMPANY_NAME}`;
  const desc = `${project.projectType} installed in ${project.location}, ${project.district}. ${project.capacity} capacity solution for ${project.industryType || project.industry}. Delivered by ${COMPANY_NAME} (${FORMER_COMPANY_NAME}).`;
  const canonicalUrl = `${SITE_URL}/projects/${project.slug}`;

  // Automatic Local SEO Keyword Generation
  const localKeywords = [
    `${project.projectType} in ${project.district}`,
    `${project.projectType} Installation ${project.location}`,
    `${project.projectType} service ${project.district}`,
    `Yuvanthika Aquacare ${project.district}`,
    `${project.industryType || project.industry} water plant ${project.district}`,
  ];

  const primaryImage = project.projectImages?.[0]?.url || project.gallery?.[0]?.url || `${SITE_URL}/og-image.jpg`;

  return {
    title,
    description: desc,
    keywords: localKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: desc,
      url: canonicalUrl,
      siteName: COMPANY_NAME,
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [primaryImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getDynamicProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // JSON-LD Case Study & LocalBusiness Schema
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#organization`,
        "name": COMPANY_NAME,
        "alternateName": FORMER_COMPANY_NAME,
        "url": SITE_URL,
        "telephone": PHONE_DISPLAY,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": ADDRESS_FULL,
          "addressLocality": "Karur",
          "addressRegion": "Tamil Nadu",
          "postalCode": "639002",
          "addressCountry": "IN",
        },
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/projects/${project.slug}#service`,
        "name": project.projectType,
        "provider": {
          "@id": `${SITE_URL}/#organization`,
        },
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": project.district,
        },
        "description": project.projectDescription,
      },
      {
        "@type": "CreativeWork",
        "@id": `${SITE_URL}/projects/${project.slug}#casestudy`,
        "headline": project.projectTitle || project.projectName,
        "description": project.projectDescription,
        "image": (project.projectImages || project.gallery || []).map((img) => img.url),
        "author": {
          "@id": `${SITE_URL}/#organization`,
        },
        "publisher": {
          "@id": `${SITE_URL}/#organization`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      <ProjectDetailPageView project={project} />
    </>
  );
}
