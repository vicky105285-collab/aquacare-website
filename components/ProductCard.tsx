"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight, Phone, MessageCircle } from "lucide-react";
import type { ProductItem } from "@/lib/site/types";
import { slugify } from "@/lib/utils";
import { CALL, WHATSAPP } from "@/lib/site/constants";

export type ProductCardProps = {
  product: ProductItem;
  enquiryWhatsappHref?: string;
  priority?: boolean;
};

export function ProductCard({ product, enquiryWhatsappHref, priority }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(product.img);
  const productSlug = product.slug || slugify(product.name);
  const href = `/products/item/${productSlug}`;

  const encodedMsg = encodeURIComponent(`Hi, I'm interested in ${product.name} (${product.brand}). Please share the latest price & quote.`);
  const waUrl = enquiryWhatsappHref
    ? `${enquiryWhatsappHref.split("?")[0]}?text=${encodedMsg}`
    : `${WHATSAPP}?text=${encodedMsg}`;

  return (
    <article className="group bg-white rounded-2xl border border-slate-100 hover:border-cyan-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)] overflow-hidden transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <Link href={href} className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/60 aspect-[4/3] block flex-shrink-0">
        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-bold rounded-full shadow-md tracking-wide">
          {product.tag}
        </span>
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          priority={priority}
          onError={() => setImgSrc("/products/aqua_shark.webp")}
        />
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

        {/* Features — max 3 */}
        <ul className="space-y-1.5 mb-5 flex-1">
          {product.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-500 text-[13px] leading-snug">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0 mt-0.5" aria-hidden />
              <span className="line-clamp-1">{f}</span>
            </li>
          ))}
        </ul>

        {/* Footer: Price Badge & Direct Action Buttons */}
        <div className="pt-4 border-t border-slate-100 mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-800 bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded-full">
              Price: Contact Us
            </span>
            <Link
              href={href}
              className="text-xs font-bold text-cyan-600 hover:text-cyan-800 flex items-center gap-1 transition-colors"
            >
              View Specs <ArrowRight className="w-3.5 h-3.5" aria-hidden />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={CALL}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" /> Call Now
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
