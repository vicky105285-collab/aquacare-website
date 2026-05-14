"use client";

import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import type { ContactChannelCard, ContactIconKey } from "@/lib/site/types";

const CONTACT_ICONS: Record<ContactIconKey, typeof Phone> = {
  phone: Phone,
  message: MessageCircle,
  map: MapPin,
};

export type ContactProps = {
  cards: ContactChannelCard[];
};

export function Contact({ cards }: ContactProps) {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-50" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-cyan-600 font-semibold text-sm tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-black text-slate-800">
            Contact{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Us</span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8">
          {cards.map((item, i) => {
            const Icon = CONTACT_ICONS[item.icon];
            return (
              <AnimatedSection key={item.title} delay={i * 100}>
                <div className="bg-white rounded-3xl p-8 border border-slate-100 hover:border-cyan-200 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all text-center group h-full flex flex-col">
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8 text-white" aria-hidden />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">{item.title}</h3>
                  {item.lines.map((line) => (
                    <p key={line} className="text-slate-500 text-sm">
                      {line}
                    </p>
                  ))}
                  <a
                    href={item.link}
                    target={item.link.startsWith("http") ? "_blank" : undefined}
                    rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${item.color} text-white rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg`}
                  >
                    {item.label} <ArrowRight className="w-4 h-4" aria-hidden />
                  </a>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="mt-10" delay={200}>
          <div className="bg-gradient-to-br from-blue-950 to-cyan-900 rounded-3xl p-8 text-white text-center">
            <Clock className="w-8 h-8 text-cyan-400 mx-auto mb-3" aria-hidden />
            <h3 className="text-xl font-black mb-4">
              Service Hours · <span lang="ta">சேவை நேரம்</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div>
                <p className="text-white/50">Monday – Saturday</p>
                <p className="font-bold text-lg">8:00 AM – 8:00 PM</p>
              </div>
              <div className="w-px bg-white/10 hidden sm:block" aria-hidden />
              <div>
                <p className="text-white/50">Sunday</p>
                <p className="font-bold text-lg">9:00 AM – 5:00 PM</p>
              </div>
              <div className="w-px bg-white/10 hidden sm:block" aria-hidden />
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
