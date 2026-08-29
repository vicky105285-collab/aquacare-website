"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ServiceFaq } from "@/lib/site/types";

export type FaqAccordionProps = {
  faqs: ServiceFaq[];
  /**
   * Emit the FAQPage JSON-LD for these questions. Default true (used on service
   * pages). Set false on the main /faq page, which emits ONE combined FAQPage
   * schema for all categories to avoid duplicate FAQPage blocks.
   */
  emitSchema?: boolean;
};

export function FaqAccordion({ faqs, emitSchema = true }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  if (!faqs || faqs.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {emitSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const btnId = `${baseId}-btn-${index}`;
          const panelId = `${baseId}-panel-${index}`;
          return (
            <div
              key={index}
              className={`border rounded-2xl overflow-hidden transition-colors ${
                isOpen ? "bg-white shadow-sm border-cyan-200" : "bg-slate-50 hover:bg-slate-100 border-slate-200"
              }`}
            >
              <h3 className="m-0">
                <button
                  id={btnId}
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 rounded-2xl"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className={`font-semibold ${isOpen ? "text-cyan-700" : "text-slate-800"}`}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-cyan-500" : ""
                    } motion-reduce:transition-none`}
                    aria-hidden="true"
                  />
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                aria-hidden={!isOpen}
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 pt-4 text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
