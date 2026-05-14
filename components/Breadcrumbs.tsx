import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = { href: string; label: string };

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-blue-200/90">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1">
            {i > 0 ? <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" aria-hidden /> : null}
            {i === items.length - 1 ? (
              <span className="font-medium text-white">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-cyan-300 transition-colors">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
