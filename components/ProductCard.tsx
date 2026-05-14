import Image from "next/image";
import { CheckCircle, MessageCircle } from "lucide-react";
import type { ProductItem } from "@/lib/site/types";

export type ProductCardProps = {
  product: ProductItem;
  enquiryWhatsappHref: string;
  priority?: boolean;
};

export function ProductCard({ product, enquiryWhatsappHref, priority }: ProductCardProps) {
  return (
    <article className="group bg-white rounded-3xl border border-slate-100 hover:border-cyan-200 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden transition-all duration-300 flex flex-col h-full">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 aspect-[4/3]">
        <span className="absolute top-3 left-3 z-10 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold rounded-full shadow">
          {product.tag}
        </span>
        <Image
          src={product.img}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={priority}
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-cyan-600 text-xs font-bold tracking-widest uppercase mb-1">{product.brand}</p>
        <h3 className="font-black text-slate-800 text-xl leading-tight">{product.name}</h3>
        <div className="flex flex-wrap gap-2 mt-3 mb-4">
          {[product.stages, product.tank, product.liters].map((spec) => (
            <span key={spec} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
              {spec}
            </span>
          ))}
        </div>
        <ul className="space-y-1.5 mb-5 flex-1">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-slate-600 text-sm">
              <CheckCircle className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" aria-hidden />
              {f}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 gap-3">
          <span className="text-2xl font-black text-blue-700">{product.price}</span>
          <a
            href={enquiryWhatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-sm font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-blue-500/20 shrink-0"
          >
            <MessageCircle className="w-4 h-4" aria-hidden /> Enquire
          </a>
        </div>
      </div>
    </article>
  );
}
