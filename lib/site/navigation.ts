export type NavItem = {
  href: string;
  label: string;
  /** For active state: match prefix e.g. /services */
  activeMatch?: "exact" | "prefix";
};

export const MAIN_NAV: NavItem[] = [
  { href: "/", label: "Home", activeMatch: "exact" },
  { href: "/about", label: "About", activeMatch: "prefix" },
  { href: "/products", label: "Products", activeMatch: "prefix" },
  { href: "/services", label: "Services", activeMatch: "prefix" },
  { href: "/amc", label: "AMC", activeMatch: "prefix" },
  { href: "/gallery", label: "Gallery", activeMatch: "prefix" },
  { href: "/blog", label: "Blog", activeMatch: "prefix" },
  { href: "/contact", label: "Contact", activeMatch: "prefix" },
];
