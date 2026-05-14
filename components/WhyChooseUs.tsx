"use client";

import { MessageCircle, Phone } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import type { BookingStep, WhyChoosePoint } from "@/lib/site/types";

export type WhyChooseUsProps = {
  points: WhyChoosePoint[];
  bookingSteps: BookingStep[];
  callHref: string;
  whatsappHref: string;
};

export function WhyChooseUs({ points, bookingSteps, callHref, whatsappHref }: WhyChooseUsProps) {
  return (
    <section className="py-20 lg:py-28 bg-slate-50" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <p className="text-cyan-600 font-semibold text-sm tracking-widest uppercase mb-3">Why Aqua Care</p>
            <h2 id="why-heading" className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight">
              Karur&apos;s #1 Choice for
              <br />
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Water & Solar Care
              </span>
            </h2>
            <p className="text-slate-500 text-lg mt-4 leading-relaxed">
              Over 12 years of trust, backed by certified technicians, genuine spare parts, and a service promise that
              puts your satisfaction first.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {points.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:border-cyan-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-white" aria-hidden />
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 text-sm">{item.title}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-950 to-cyan-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden />
                <h3 className="text-2xl font-black mb-6 relative z-10">Quick Service Booking</h3>
                <p className="text-blue-200/70 mb-6 relative z-10">Get expert help in 3 simple steps</p>
                <ol className="space-y-4 relative z-10 list-none p-0 m-0">
                  {bookingSteps.map((item) => (
                    <li key={item.step} className="flex gap-4 bg-white/10 rounded-2xl p-4">
                      <span className="text-2xl font-black text-cyan-400 w-10 flex-shrink-0">{item.step}</span>
                      <div>
                        <p className="font-bold">{item.title}</p>
                        <p className="text-blue-200/60 text-sm">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="grid grid-cols-2 gap-3 mt-6 relative z-10">
                  <a
                    href={callHref}
                    className="flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg"
                  >
                    <Phone className="w-4 h-4" aria-hidden /> Call Now
                  </a>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3.5 bg-green-500/90 rounded-xl font-bold text-sm hover:bg-green-500 transition-colors shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
