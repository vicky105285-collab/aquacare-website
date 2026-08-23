import type { Metadata } from "next";
import { CALL, COMPANY_NAME, FORMER_COMPANY_NAME, PHONE_DISPLAY, SITE_URL, WHATSAPP } from "@/lib/site/constants";
import { CTASection } from "@/components/CTASection";
import { ShieldCheck, Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `Demineralization (DM) Water Plant Manufacturers Tamil Nadu | ${COMPANY_NAME}`,
  description:
    `High-purity Demineralization (DM) Water Plants for power boilers, pharma & electronics in Karur, Salem & Tamil Nadu by ${COMPANY_NAME} (Formerly ${FORMER_COMPANY_NAME}). Conductivity <1 µS/cm.`,
  alternates: {
    canonical: `${SITE_URL}/services/dm-plant-tamil-nadu`,
  },
  keywords: [
    "DM Plant Tamil Nadu",
    "Demineralization Plant Karur",
    "Deionizer Plant Salem",
    "Boiler Feed Water Treatment",
  ],
};

export default function DMPlantTamilNaduPage() {
  return (
    <article className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 text-white py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center pt-8">
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-4 py-1.5 text-cyan-300 text-xs font-semibold mb-6">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>High-Purity Deionization Engineering Since 2014 (Formerly {FORMER_COMPANY_NAME})</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            Demineralization (DM) Water Plants in Tamil Nadu
          </h1>

          <p className="text-base md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto text-cyan-100">
            Produce ultra-pure water with near-zero electrical conductivity (&lt;1.0 µS/cm) for high-pressure steam boilers, pharmaceutical formulations, and chemical synthesis. Dual-bed and Mixed-Bed polisher configurations.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={CALL}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition text-base"
            >
              <Phone className="w-5 h-5" /> Call {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition text-base"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp DM Plant Proposal
            </a>
          </div>
        </div>
      </section>

      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Request DM Plant Design & Resin Quote"
        subheadline="Consult with Yuvanthika Aquacare & Solar Care Systems process water engineers."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
