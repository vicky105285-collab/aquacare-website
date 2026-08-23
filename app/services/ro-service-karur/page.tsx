import type { Metadata } from "next";
import { CALL, COMPANY_NAME, FORMER_COMPANY_NAME, PHONE_DISPLAY, SITE_URL, WHATSAPP } from "@/lib/site/constants";
import { CTASection } from "@/components/CTASection";
import { ShieldCheck, MessageCircle, Phone, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `Expert RO Water Purifier Service & Repair in Karur | ${COMPANY_NAME}`,
  description:
    `Same-day RO service in Karur, Namakkal, Erode. We solve hard borewell water & Cauvery water issues. Expert RO installation & repair by ${COMPANY_NAME} (Formerly ${FORMER_COMPANY_NAME}).`,
  alternates: {
    canonical: `${SITE_URL}/services/ro-service-karur`,
  },
  keywords: [
    "RO Service Karur",
    "RO Repair Karur",
    "Water Purifier Service Karur",
    "RO Installation Tiruchengode",
    "Yuvanthika Aquacare RO Service",
  ],
};

export default function ROServiceKarurPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is my RO water purifier not working properly in Karur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Karur's groundwater is known for high TDS (600 to 2500+ PPM) and extreme hardness. Unserviced RO purifiers get choked with mineral scale, lowering water flow. Regular maintenance by Yuvanthika Aquacare ensures optimal filter performance.",
        },
      },
      {
        "@type": "Question",
        "name": "How frequently should I service my RO system for Cauvery water in Karur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cauvery water carries silt and chlorine even though TDS is moderate. We recommend servicing every 6 months to replace pre-filters and carbon cartridges.",
        },
      },
      {
        "@type": "Question",
        "name": "Do you provide RO service in Pugalur, Aravakurichi, and Kulithalai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our certified technicians provide doorstep RO water purifier repair, installation, and AMC across Karur district, Pugalur, Aravakurichi, Kulithalai, Namakkal, and Erode.",
        },
      },
    ],
  };

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
        "name": "RO Service Karur",
        "item": `${SITE_URL}/services/ro-service-karur`
      }
    ]
  };

  return (
    <article className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900 text-white py-20 px-4 md:px-8 relative">
        <div className="max-w-6xl mx-auto text-center pt-8">
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-4 py-1.5 text-cyan-300 text-xs font-semibold mb-6">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Serving Karur District Since 2014 (Formerly {FORMER_COMPANY_NAME})</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            Expert RO Water Purifier Service & Repair in Karur
          </h1>

          <p className="text-base md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto text-blue-100">
            Struggling with hard water or TDS issues in Karur? <strong>{COMPANY_NAME}</strong> is your trusted local partner for fast doorstep RO water purifier installation, repair, and AMC services across Karur, Namakkal, and Erode.
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
              <MessageCircle className="w-5 h-5" /> Book Service on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto py-12 px-4 md:px-8 space-y-16">
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900 border-b-2 border-blue-600 inline-block pb-2">
            Understanding Karur Groundwater Chemistry
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-4">
            <p>
              Residents of Karur and neighboring towns like Namakkal, Erode, Tiruchengode, and Kulithalai face severe groundwater hardness and high TDS (Total Dissolved Solids) often exceeding 1500 PPM. Ground borewell water causes heavy limescale deposits inside water purifier filters and membranes.
            </p>
            <p>
              <strong>{COMPANY_NAME}</strong> (formerly <em>{FORMER_COMPANY_NAME}</em>) brings over 10 years of Karur water purification experience. We customize every RO service visit based on whether your house uses Cauvery municipal water or deep borewell groundwater.
            </p>
          </div>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl md:text-3xl font-black mb-8 text-center text-slate-900">
            Why Karur Residents Trust {COMPANY_NAME}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "10+ Years Local Trust", d: "Serving Karur homes and businesses continuously since 2014." },
              { t: "Same-Day Dispatch", d: "Prompt morning technician visits across Karur, Pugalur, Aravakurichi." },
              { t: "Authentic Consumables", d: "High-rejection RO membranes and food-grade active carbon cartridges." },
              { t: "TDS Demonstration", d: "Digital TDS meter reading verified at your tap before and after service." },
              { t: "Worry-Free AMC Plans", d: "Comprehensive maintenance contracts with free filter replacements." },
              { t: "Transparent Quotes", d: "Upfront pricing with zero hidden component charges." },
            ].map((item) => (
              <div key={item.t} className="p-5 border border-slate-100 rounded-xl bg-slate-50">
                <CheckCircle className="w-6 h-6 text-cyan-600 mb-2" />
                <h3 className="text-lg font-bold text-slate-900">{item.t}</h3>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Book Karur Doorstep RO Service Today"
        subheadline="Fast technician visit, genuine parts, and guaranteed drinking water purity."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
