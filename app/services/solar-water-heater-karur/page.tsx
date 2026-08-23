import type { Metadata } from "next";
import { CALL, COMPANY_NAME, FORMER_COMPANY_NAME, PHONE_DISPLAY, SITE_URL, WHATSAPP } from "@/lib/site/constants";
import { CTASection } from "@/components/CTASection";
import { ShieldCheck, Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `Solar Water Heater Installation & Service Karur | ${COMPANY_NAME}`,
  description:
    `High-efficiency ETC & FPC solar water heater installation, tube replacement & descaling service in Karur, Namakkal, Erode by ${COMPANY_NAME} (Formerly ${FORMER_COMPANY_NAME}).`,
  alternates: {
    canonical: `${SITE_URL}/services/solar-water-heater-karur`,
  },
  keywords: [
    "Solar Water Heater Karur",
    "ETC Solar Heater Karur",
    "Solar Tube Replacement Karur",
    "Solar Heater Service Erode",
  ],
};

export default function SolarWaterHeaterKarurPage() {
  return (
    <article className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-amber-950 via-amber-900 to-slate-900 text-white py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center pt-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 rounded-full px-4 py-1.5 text-amber-300 text-xs font-semibold mb-6">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Formerly {FORMER_COMPANY_NAME} — Serving Karur Since 2014</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            Reliable Solar Water Heater Service & Sales in Karur
          </h1>

          <p className="text-base md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto text-amber-100">
            Enjoy 24/7 hot water naturally, reduce electric power bills by 70%, and protect your investment with expert ETC tube descaling and maintenance from <strong>{COMPANY_NAME}</strong>.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={CALL}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition text-base"
            >
              <Phone className="w-5 h-5" /> Call {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition text-base"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Solar Enquiry
            </a>
          </div>
        </div>
      </section>

      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Upgrade to Solar Water Heating in Karur"
        subheadline="Free roof shadow survey and technical quote by Yuvanthika Aquacare & Solar Care Systems."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
