import type { Metadata } from "next";
import { CALL, COMPANY_NAME, FORMER_COMPANY_NAME, PHONE_DISPLAY, SITE_URL, WHATSAPP } from "@/lib/site/constants";
import { CTASection } from "@/components/CTASection";
import { ShieldCheck, Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `Sewage Treatment Plant (STP) Manufacturers Tamil Nadu | ${COMPANY_NAME}`,
  description:
    `Compact MBBR, SBR & MBR Sewage Treatment Plants for apartments, hospitals & commercial complexes in Karur & Tamil Nadu by ${COMPANY_NAME} (Formerly ${FORMER_COMPANY_NAME}).`,
  alternates: {
    canonical: `${SITE_URL}/services/stp-plant-tamil-nadu`,
  },
  keywords: [
    "STP Plant Tamil Nadu",
    "Sewage Treatment Plant Karur",
    "MBBR STP Plant",
    "Apartment Sewage Plant",
  ],
};

export default function STPPlantTamilNaduPage() {
  return (
    <article className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-emerald-950 via-slate-900 to-cyan-950 text-white py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center pt-8">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-1.5 text-emerald-300 text-xs font-semibold mb-6">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Wastewater Recycling Engineering Since 2014 (Formerly {FORMER_COMPANY_NAME})</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            Sewage Treatment Plants (STP) in Tamil Nadu
          </h1>

          <p className="text-base md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto text-emerald-100">
            Convert domestic sewage into clear, odor-free non-potable water for landscape irrigation and toilet flushing. Modern MBBR, SBR, and MBR technologies for apartments, hospitals, and commercial campuses.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={CALL}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition text-base"
            >
              <Phone className="w-5 h-5" /> Call {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition text-base"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp STP Audit Request
            </a>
          </div>
        </div>
      </section>

      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Upgrade Your Apartment or Commercial STP"
        subheadline="Consult with Yuvanthika Aquacare sanitary engineers for audit, revamp, and AMC."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
