"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { ServiceCard } from "@/components/ServiceCard";
import type { ServiceItem } from "@/lib/site/types";

export type ServicesProps = {
  items: ServiceItem[];
};

export function Services({ items }: ServicesProps) {
  return (
    <section id="services" className="py-20 lg:py-28 bg-gradient-to-b from-white to-slate-50" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-cyan-600 font-semibold text-sm tracking-widest uppercase mb-3">What We Offer</p>
          <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800">
            Complete Home{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Care Solutions</span>
          </h2>
          <p className="text-slate-500 text-lg mt-4 max-w-2xl mx-auto">
            From pure drinking water to clean energy — we cover everything your home needs.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((s, i) => (
            <AnimatedSection key={s.slug} delay={i * 60}>
              <ServiceCard service={s} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
