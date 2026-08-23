import type { Metadata } from "next";
import { getDynamicProjects } from "@/lib/site/projects";
import { COMPANY_NAME, FORMER_COMPANY_NAME, SITE_URL } from "@/lib/site/constants";
import { ProjectsIndexView } from "@/components/ProjectsIndexView";

export const metadata: Metadata = {
  title: `Our Turnkey Projects Portfolio & Case Studies | ${COMPANY_NAME}`,
  description:
    `Explore successful Industrial RO Plants, ETP, STP, DM Plants, Solar Water Heaters & Water Softener case studies by ${COMPANY_NAME} (${FORMER_COMPANY_NAME}) in Karur, Namakkal, Erode, Trichy, Salem & Tamil Nadu.`,
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  keywords: [
    "Industrial RO Plant Projects Karur",
    "Water Softener Projects Namakkal",
    "Solar Water Heater Projects Erode",
    "ETP Plant Case Studies Tamil Nadu",
    "STP Plant Case Studies Trichy",
    "DM Plant Salem",
  ],
  openGraph: {
    type: "website",
    url: `${SITE_URL}/projects`,
    title: `Our Turnkey Projects Portfolio & Case Studies | ${COMPANY_NAME}`,
    description: `Explore successful Industrial RO Plants, ETP, STP, DM Plants, Solar Water Heaters & Water Softener case studies by ${COMPANY_NAME} in Karur & Tamil Nadu.`,
    siteName: COMPANY_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `Our Turnkey Projects Portfolio & Case Studies | ${COMPANY_NAME}`,
    description: `Explore successful Industrial RO Plants, ETP, STP, DM Plants, Solar Water Heaters & Water Softeners in Karur & Tamil Nadu.`,
  },
};

export default async function ProjectsPortfolioPage() {
  const projects = await getDynamicProjects();
  return <ProjectsIndexView projects={projects} />;
}
