import type { LucideIcon } from "lucide-react";

export type ServiceSlug =
  | "ro-water-purifier"
  | "ro-service"
  | "amc"
  | "solar-water-heater"
  | "solar-panel"
  | "water-softener"
  | "fridge-repair"
  | "washing-machine-repair";

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
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroTitle: string;
  heroSubtitle: string;
  tamilLine: string;
  benefits: { title: string; body: string }[];
  process: { step: string; title: string; desc: string }[];
  faqs: ServiceFaq[];
};
