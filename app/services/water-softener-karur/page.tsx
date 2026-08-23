import type { Metadata } from "next";
import { CALL, COMPANY_NAME, FORMER_COMPANY_NAME, PHONE_DISPLAY, SITE_URL, WHATSAPP } from "@/lib/site/constants";
import { CTASection } from "@/components/CTASection";
import { ShieldCheck, Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `Best Water Softener Systems for Hard Water in Karur | ${COMPANY_NAME}`,
  description:
    `Eliminate limescale, protect solar heaters, geysers & taps in Karur, Namakkal, Erode with custom water softeners from ${COMPANY_NAME} (Formerly ${FORMER_COMPANY_NAME}).`,
  alternates: {
    canonical: `${SITE_URL}/services/water-softener-karur`,
  },
  keywords: [
    "Water Softener Karur",
    "Hard Water Softener Karur",
    "Whole House Softener Tamil Nadu",
    "Ion Exchange Water Softener Karur",
  ],
};

export default function WaterSoftenerKarurPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${SITE_URL}/services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Water Softener Karur",
        "item": `${SITE_URL}/services/water-softener-karur`
      }
    ]
  };

  return (
    <article className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="bg-gradient-to-br from-teal-950 via-teal-900 to-slate-900 text-white py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center pt-8">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 rounded-full px-4 py-1.5 text-teal-300 text-xs font-semibold mb-6">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Formerly {FORMER_COMPANY_NAME} — Serving Karur Since 2014</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            Best Water Softener Systems for Hard Water in Karur
          </h1>

          <p className="text-base md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto text-teal-100">
            Say goodbye to stubborn limescale, ruined solar water heaters, dry skin, and dull hair. <strong>{COMPANY_NAME}</strong> provides food-grade ion-exchange water softeners tailored for Karur borewells.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={CALL}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition text-base"
            >
              <Phone className="w-5 h-5" /> Call {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition text-base"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Hardness Test Request
            </a>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto py-12 px-4 md:px-8 space-y-12">
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Permanent Limescale Protection</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Groundwater in Karur, Pugalur, Aravakurichi, and Namakkal often carries hardness levels over 800 PPM. Our automated cation-exchange water softeners swap hard calcium/magnesium ions with soft sodium ions, keeping your bathroom tiles, chromium taps, washing machines, and solar water heaters spot-free.
          </p>
        </section>
      </main>

      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Get Free Water Hardness Test in Karur"
        subheadline="Contact Yuvanthika Aquacare & Solar Care Systems for custom softener recommendations."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
