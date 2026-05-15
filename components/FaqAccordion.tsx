"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ServiceFaq } from "@/lib/site/types";

export type FaqAccordionProps = {
  faqs: ServiceFaq[];
};

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  // Generate FAQPage JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`border border-slate-200 rounded-2xl overflow-hidden transition-colors ${isOpen ? 'bg-white shadow-sm border-cyan-200' : 'bg-slate-50 hover:bg-slate-100'}`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className={`font-semibold ${isOpen ? 'text-cyan-700' : 'text-slate-800'}`}>
                  {faq.q}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-500' : ''}`} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
