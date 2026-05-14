"use client";

import { CheckCircle } from "lucide-react";
import { AnimatedSection } from "./animated-section";
import type { AmcPlanItem } from "./types";

export type AMCPlansProps = {
  plans: AmcPlanItem[];
  callHref: string;
};

export function AMCPlans({ plans, callHref }: AMCPlansProps) {
  return (
    <section id="amc" className="py-20 lg:py-28 bg-gradient-to-b from-blue-950 to-blue-900 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, #06b6d4 0%, transparent 60%), radial-gradient(circle at 70% 30%, #3b82f6 0%, transparent 40%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-cyan-400 font-semibold text-sm tracking-widest uppercase mb-3">Annual Maintenance</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            AMC{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">
              Protection Plans
            </span>
          </h2>
          <p className="text-blue-200/70 text-lg mt-4">
            வருடாந்திர பராமரிப்பு திட்டம் — Keep your purifier running perfectly, year after year.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 100}>
              <div
                className={`relative rounded-3xl overflow-hidden flex flex-col h-full ${
                  plan.highlight ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-blue-900 scale-105" : ""
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold text-center tracking-widest uppercase">
                    Most Popular
                  </div>
                )}
                <div className={`bg-gradient-to-br ${plan.color} p-8 ${plan.highlight ? "pt-12" : ""} text-white`}>
                  <h3 className="text-2xl font-black">{plan.name}</h3>
                  <div className="flex items-end gap-1 mt-4">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className="text-white/70 mb-1">{plan.period}</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm flex-1 p-6 space-y-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-white">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span className="text-sm">{f}</span>
                    </div>
                  ))}
                  <div className="pt-4">
                    <a
                      href={callHref}
                      className="block w-full text-center py-3.5 bg-white text-blue-700 rounded-xl font-bold text-sm hover:bg-cyan-50 transition-colors shadow-lg"
                    >
                      Get This Plan
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
