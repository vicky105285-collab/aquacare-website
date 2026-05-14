"use client";

import { ArrowRight, Clock } from "lucide-react";
import { AnimatedSection } from "./animated-section";
import type { ContactChannelCard } from "./types";

export type ContactProps = {
  cards: ContactChannelCard[];
};

export function Contact({ cards }: ContactProps) {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-cyan-600 font-semibold text-sm tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800">
            Contact{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Us</span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8">
          {cards.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 100}>
              <div className="bg-white rounded-3xl p-8 border border-slate-100 hover:border-cyan-200 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all text-center group">
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl mb-6 group-hover:scale-110 transition-transform`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">{item.title}</h3>
                {item.lines.map((line) => (
                  <p key={line} className="text-slate-500 text-sm">
                    {line}
                  </p>
                ))}
                <a
                  href={item.link}
                  className={`mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${item.color} text-white rounded-xl font-bold text-sm hover:scale-105 transition-transform shadow-lg`}
                >
                  {item.label} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-10" delay={200}>
          <div className="bg-gradient-to-br from-blue-950 to-cyan-900 rounded-3xl p-8 text-white text-center">
            <Clock className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <h3 className="text-xl font-black mb-4">Service Hours · சேவை நேரம்</h3>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div>
                <p className="text-white/50">Monday – Saturday</p>
                <p className="font-bold text-lg">8:00 AM – 8:00 PM</p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p className="text-white/50">Sunday</p>
                <p className="font-bold text-lg">9:00 AM – 5:00 PM</p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p className="text-white/50">Emergency</p>
                <p className="font-bold text-lg text-cyan-400">24/7 Available</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
