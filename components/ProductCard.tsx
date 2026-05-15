import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import type { ProductItem } from "@/lib/site/types";
import { slugify } from "@/lib/utils";

export type ProductCardProps = {
  product: ProductItem;
  enquiryWhatsappHref: string;
  priority?: boolean;
};

export function ProductCard({ product, priority }: ProductCardProps) {
  const productSlug = slugify(product.name);
  const href = `/products/item/${productSlug}`;

  return (
    <article className="group bg-white rounded-2xl border border-slate-100 hover:border-cyan-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)] overflow-hidden transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <Link href={href} className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/60 aspect-[4/3] block flex-shrink-0">
        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-bold rounded-full shadow-md tracking-wide">
          {product.tag}
        </span>
        <Image
          src={product.img}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          priority={priority}
        />
        {/* Overlay hint on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-cyan-600 text-[11px] font-bold tracking-[0.12em] uppercase mb-1">{product.brand}</p>
        <Link href={href}>
          <h3 className="font-bold text-slate-800 text-[1.05rem] leading-snug group-hover:text-cyan-700 transition-colors duration-200 line-clamp-2 mb-3">
            {product.name}
          </h3>
        </Link>

        {/* Spec Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {[product.stages, product.tank, product.liters].filter(Boolean).map((spec) => (
            <span key={spec} className="px-2.5 py-0.5 bg-blue-50/80 text-blue-700 text-[11px] font-semibold rounded-full border border-blue-100/80">
              {spec}
            </span>
          ))}
        </div>

        {/* Features — max 3, truncated */}
        <ul className="space-y-1.5 mb-5 flex-1">
          {product.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-500 text-[13px] leading-snug">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0 mt-0.5" aria-hidden />
              <span className="line-clamp-1">{f}</span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-3 mt-auto">
          <span className="text-xl font-black text-blue-700 tracking-tight">{product.price}</span>
          <Link
            href={href}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-[13px] font-semibold hover:from-cyan-600 hover:to-blue-700 hover:shadow-md hover:shadow-blue-500/25 active:scale-[0.97] transition-all duration-200 shrink-0"
          >
            Details <ArrowRight className="w-3.5 h-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

