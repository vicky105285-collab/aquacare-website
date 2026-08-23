import type { Metadata } from "next";
import { CALL, COMPANY_NAME, FORMER_COMPANY_NAME, PHONE_DISPLAY, SITE_URL, WHATSAPP } from "@/lib/site/constants";
import { CTASection } from "@/components/CTASection";
import { ShieldCheck, Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `Effluent Treatment Plant (ETP) & ZLD Tamil Nadu | ${COMPANY_NAME}`,
  description:
    `TNPCB compliant Effluent Treatment Plants (ETP) & Zero Liquid Discharge (ZLD) for textile dyeing, chemical & paper industries in Tamil Nadu by ${COMPANY_NAME} (Formerly ${FORMER_COMPANY_NAME}).`,
  alternates: {
    canonical: `${SITE_URL}/services/etp-plant-tamil-nadu`,
  },
  keywords: [
    "ETP Plant Tamil Nadu",
    "Effluent Treatment Plant Karur",
    "ZLD System Erode",
    "Textile ETP Plant Tiruppur",
  ],
};

export default function ETPPlantTamilNaduPage() {
  return (
    <article className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 text-white py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center pt-8">
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-4 py-1.5 text-cyan-300 text-xs font-semibold mb-6">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>TNPCB Environmental Compliance Experts Since 2014 (Formerly {FORMER_COMPANY_NAME})</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            Effluent Treatment Plants (ETP) & ZLD in Tamil Nadu
          </h1>

          <p className="text-base md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto text-cyan-100">
            Guarantee 100% TNPCB environmental compliance. We engineer physicochemical treatment, biological aeration, ultrafiltration, and Zero Liquid Discharge (ZLD) evaporators for textile processing and chemical industries.
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
              <MessageCircle className="w-5 h-5" /> WhatsApp ETP Audit Request
            </a>
          </div>
        </div>
      </section>

      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Request ETP & ZLD Plant Proposal"
        subheadline="Consult with Yuvanthika Aquacare environmental compliance architects."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
