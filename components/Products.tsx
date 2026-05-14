"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { ProductCard } from "@/components/ProductCard";
import type { ProductItem } from "@/lib/site/types";

export type ProductsProps = {
  items: ProductItem[];
  enquiryWhatsappHref: string;
};

export function Products({ items, enquiryWhatsappHref }: ProductsProps) {
  return (
    <section id="products" className="py-20 lg:py-28 bg-white" aria-labelledby="products-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-cyan-600 font-semibold text-sm tracking-widest uppercase mb-3">Our Products</p>
          <h2 id="products-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800">
            Premium{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-slate-500 text-lg mt-4">Industry-leading technology at competitive prices. EMI available.</p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <AnimatedSection key={p.name} delay={i * 80}>
              <ProductCard product={p} enquiryWhatsappHref={enquiryWhatsappHref} priority={i < 2} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
