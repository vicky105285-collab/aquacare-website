import type { LucideIcon } from "lucide-react";

export type ResidentialServiceSlug =
  | "ro-water-purifier"
  | "ro-installation"
  | "ro-service"
  | "ro-amc"
  | "water-softener"
  | "solar-water-heater"
  | "solar-system-maintenance"
  | "ups-battery-replacement"
  | "washing-machine-service"
  | "refrigerator-service";

export type CommercialServiceSlug =
  | "commercial-ro-plant"
  | "commercial-water-treatment-plant";

export type IndustrialServiceSlug =
  | "industrial-ro-plant"
  | "dm-plant"
  | "etp-plant"
  | "stp-plant"
  | "industrial-water-treatment-plant"
  | "operation-and-maintenance-services";

export type ServiceSlug =
  | ResidentialServiceSlug
  | CommercialServiceSlug
  | IndustrialServiceSlug
  | "amc"
  | "solar-panel"
  | "fridge-repair"
  | "washing-machine-repair";

export type ServiceCategoryType = "residential" | "commercial" | "industrial";

export type StatItem = {
  val: string;
  label: string;
};

export type ServiceItem = {
  slug: ServiceSlug;
  icon: LucideIcon;
  title: string;
  tamil: string;
  desc: string;
  color: string;
  category?: ServiceCategoryType;
};

export type ProductItem = {
  name: string;
  brand: string;
  tag: string;
  price: string;
  mrp: string | null;
  liters: string;
  stages: string;
  tank: string;
  img: string;
  features: string[];
  categoryId: string;
  slug?: string;
  featured?: boolean;
};

export type ProductCategory = {
  id: string;
  title: string;
  slug: string;
  description: string;
};

export type AmcPlanItem = {
  name: string;
  price: string;
  period: string;
  color: string;
  highlight?: boolean;
  features: string[];
};

export type TestimonialItem = {
  name: string;
  loc: string;
  stars: number;
  text: string;
};

export type HeroFeatureCard = {
  icon: LucideIcon;
  title: string;
  sub: string;
  color: string;
};

export type TrustItem = {
  icon: LucideIcon;
  text: string;
};

export type WhyChoosePoint = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type BookingStep = {
  step: string;
  title: string;
  desc: string;
};

export type ContactIconKey = "phone" | "message" | "map";

export type ContactChannelCard = {
  icon: ContactIconKey;
  title: string;
  lines: string[];
  link: string;
  label: string;
  color: string;
};

export type FooterServiceLink = {
  label: string;
  href: string;
};

export type ServiceFaq = {
  q: string;
  a: string;
};

export type ServiceDetail = {
  slug: ServiceSlug;
  category: ServiceCategoryType;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroTitle: string;
  heroSubtitle: string;
  tamilLine: string;
  benefits: { title: string; body: string }[];
  features?: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  faqs: ServiceFaq[];
  specifications?: { key: string; value: string }[];
  localSeoContent?: {
    district: string;
    details: string;
  }[];
};

/** Scalable Project & Case Study Schema */
export type ProjectItem = {
  id: string;
  slug: string;
  projectTitle: string;
  projectName?: string; // alias for backwards compatibility
  projectType: string; // e.g., "Industrial RO Plant", "Water Softener", "Solar Water Heater", "ETP Plant", "STP Plant", "DM Plant"
  location: string; // e.g., "Reddipalayam, Karur"
  district: string; // e.g., "Karur", "Namakkal", "Erode", "Tiruchirappalli", "Salem"
  customerCategory: ServiceCategoryType; // "residential" | "commercial" | "industrial"
  category?: ServiceCategoryType; // alias for backwards compatibility
  industryType: string; // e.g., "Textile & Dyeing", "Hospitality", "Apartments", "Thermal Power"
  industry?: string; // alias
  capacity: string; // e.g., "50,000 LPH", "3,000 LPD", "100 KLD"
  installationDate: string; // e.g., "2024-03"
  completionYear?: string;
  problemFaced: string;
  problem?: string; // alias
  solutionProvided: string;
  solution?: string; // alias
  productsUsed: string[];
  projectDescription: string;
  benefitsAchieved: string[];
  keyHighlights?: string[];
  testimonial?: {
    quote: string;
    clientName: string;
    designation: string;
    company?: string;
  };
  projectImages: { url: string; caption: string }[];
  gallery?: { url: string; caption: string }[]; // alias
  videoUrl?: string;
  featured?: boolean;
};

/** Unlimited SEO Blog Post Infrastructure */
export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  author: string;
  authorRole?: string;
  category: string;
  readTime: string;
  image: string;
  content: string;
  toc?: { id: string; text: string }[];
};

