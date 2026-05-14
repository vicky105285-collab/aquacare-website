import type { LucideIcon } from "lucide-react";

export type NavSection = {
  id: string;
  label: string;
};

export type StatItem = {
  val: string;
  label: string;
};

export type ServiceItem = {
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

export type ContactChannelCard = {
  icon: LucideIcon;
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
