"use client";

import { CheckCircle, MessageCircle } from "lucide-react";
import { AnimatedSection } from "./animated-section";
import type { ProductItem } from "./types";

export type ProductsProps = {
  items: ProductItem[];
  enquiryWhatsappHref: string;
};

export function Products({ items, enquiryWhatsappHref }: ProductsProps) {
  return (
    <section id="products" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-cyan-600 font-semibold text-sm tracking-widest uppercase mb-3">Our Products</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800">
            Premium{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-slate-500 text-lg mt-4">Industry-leading technology at competitive prices. EMI available.</p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <AnimatedSection key={p.name} delay={i * 80}>
              <div className="group bg-white rounded-3xl border border-slate-100 hover:border-cyan-200 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden transition-all duration-300 flex flex-col">
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 h-[220px]">
                  <span className="absolute top-3 left-3 z-10 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold rounded-full shadow">
                    {p.tag}
                  </span>
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-cyan-600 text-xs font-bold tracking-widest uppercase mb-1">{p.brand}</p>
                  <h3 className="font-black text-slate-800 text-xl leading-tight">{p.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-3 mb-4">
                    {[p.stages, p.tank, p.liters].map((spec) => (
                      <span
                        key={spec}
                        className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-1.5 mb-5 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-slate-600 text-sm">
                        <CheckCircle className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <span className="text-2xl font-black text-blue-700">{p.price}</span>
                    <a
                      href={enquiryWhatsappHref}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-sm font-bold hover:scale-105 transition-transform shadow-lg shadow-blue-500/20"
                    >
                      <MessageCircle className="w-4 h-4" /> Enquire
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
