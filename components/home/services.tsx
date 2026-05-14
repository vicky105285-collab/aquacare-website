"use client";

import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "./animated-section";
import type { ServiceItem } from "./types";

export type ServicesProps = {
  items: ServiceItem[];
};

export function Services({ items }: ServicesProps) {
  return (
    <section id="services" className="py-20 lg:py-28 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-cyan-600 font-semibold text-sm tracking-widest uppercase mb-3">What We Offer</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800">
            Complete Home{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Care Solutions
            </span>
          </h2>
          <p className="text-slate-500 text-lg mt-4 max-w-2xl mx-auto">
            From pure drinking water to clean energy — we cover everything your home needs.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 60}>
              <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 border border-slate-100 hover:border-cyan-200 transition-all duration-300 cursor-default h-full">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <s.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg leading-tight">{s.title}</h3>
                <p className="text-cyan-600 text-xs font-medium mt-0.5 mb-3">{s.tamil}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                <button
                  type="button"
                  className="mt-4 text-blue-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
