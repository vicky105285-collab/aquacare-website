"use client";

import { MapPin, Star } from "lucide-react";
import { AnimatedSection } from "./animated-section";
import type { TestimonialItem } from "./types";

export type TestimonialsProps = {
  items: TestimonialItem[];
};

export function Testimonials({ items }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-cyan-600 font-semibold text-sm tracking-widest uppercase mb-3">Customer Stories</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800">
            What Our{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-slate-500 text-lg mt-4">
            8,500+ happy families across Karur district. எங்கள் வாடிக்கையாளர்கள் சொல்கிறார்கள்.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 80}>
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-cyan-200 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {t.loc}
                    </p>
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
