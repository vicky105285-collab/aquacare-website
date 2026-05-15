"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { GoogleReviews } from "@/components/GoogleReviews";
import type { TestimonialItem } from "@/lib/site/types";

export type TestimonialsProps = {
  items: TestimonialItem[];
};

export function Testimonials({ items }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-cyan-600 font-semibold text-sm tracking-widest uppercase mb-3">Customer Stories</p>
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800">
            What Our{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Customers Say</span>
          </h2>
          <p className="text-slate-500 text-lg mt-4">
            8,500+ happy families across Karur district.{" "}
            <span lang="ta">எங்கள் வாடிக்கையாளர்கள் சொல்கிறார்கள்.</span>
          </p>
        </AnimatedSection>

        <GoogleReviews reviews={items} />
      </div>
    </section>
  );
}
