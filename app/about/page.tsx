import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { BUSINESS_HISTORY_NOTE, CALL, COMPANY_NAME, FORMER_COMPANY_NAME, PHONE_DISPLAY, WHATSAPP } from "@/lib/site/constants";
import { pageMetadata } from "@/lib/site/page-metadata";
import { ShieldCheck, Award } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    `Yuvanthika Aquacare & Solar Care Systems (Formerly known as ${FORMER_COMPANY_NAME}) has delivered residential, commercial & industrial water treatment & solar solutions across Tamil Nadu since 2014.`,
  path: "/about",
  keywords: [
    "Yuvanthika Aquacare Karur",
    "Aqua Care Karur",
    "Water Treatment Company Karur",
    "Solar Company Tamil Nadu",
    "Industrial RO Manufacturer Karur",
  ],
});

export default function AboutPage() {
  return (
    <article>
      <PageHero
        title={`About ${COMPANY_NAME}`}
        subtitle="A Karur-rooted engineering & service enterprise dedicated to pure drinking water, sustainable solar energy, and industrial wastewater treatment across Tamil Nadu."
        tamilLine="2014 முதல் தமிழாகம் முழுவதும் நம்பிக்கையுடன் சேவை."
      />

      <section className="py-6 bg-cyan-50 border-b border-cyan-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-cyan-200 text-blue-900 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-cyan-600 shrink-0" />
            <span>{BUSINESS_HISTORY_NOTE}</span>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-base text-slate-700 leading-relaxed">
          <h2 className="text-3xl font-black text-slate-900 text-center mb-6">
            A Decade of Engineering Trust & Local Expertise
          </h2>
          
          <p className="text-slate-600 leading-relaxed text-lg">
            Established in 2014 in Karur, <strong>{COMPANY_NAME}</strong> (formerly known as <em>{FORMER_COMPANY_NAME}</em>) started with a clear mission: to resolve the tough water quality and energy challenges faced by households, commercial establishments, and industries across Tamil Nadu.
          </p>

          <p className="text-slate-600 leading-relaxed">
            Over the past decade, we have expanded from residential RO water purifiers into heavy-duty <strong>Industrial RO Plants (5 KLD to 500 KLD)</strong>, <strong>Effluent Treatment Plants (ETP)</strong> with Zero Liquid Discharge (ZLD), <strong>Sewage Treatment Plants (STP)</strong>, <strong>Demineralization (DM) Plants</strong>, and commercial <strong>Solar Water Heating Systems</strong>.
          </p>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 my-8">
            <h3 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" /> Our Core Operating Philosophy
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 list-disc pl-5">
              <li><strong>Honest Diagnostics:</strong> Water quality testing (TDS, hardness, pH) before recommending any equipment.</li>
              <li><strong>Custom Engineering:</strong> Right-sizing equipment to match local borewell chemistry and volume demands.</li>
              <li><strong>Certified Spares & Warranty:</strong> Food-grade membranes, high-exchange resins, and genuine electrical components.</li>
              <li><strong>Prompt Field Support:</strong> Dedicated field service engineers dispatched across 10+ main districts in Tamil Nadu.</li>
            </ul>
          </div>

          <p className="text-slate-600 leading-relaxed" lang="ta">
            கரூர், நாமக்கல், ஈரோடு, சேலம், திருச்சி மற்றும் தமிழ்நாடு முழுவதிலும் உள்ள ஆயிரக்கணக்கான வாடிக்கையாளர்களின் நம்பிக்கையே எங்கள் மிகப்பெரிய பலம்.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-16 grid sm:grid-cols-4 gap-6 px-4">
          {[
            { k: "10+", l: "Years of Trust (Since 2014)" },
            { k: "10,000+", l: "Satisfied Customers" },
            { k: "500+", l: "Commercial & Industrial Plants" },
            { k: "10 Main", l: "Tamil Nadu Districts Covered" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <p className="text-3xl font-black text-blue-700">{s.k}</p>
              <p className="mt-2 text-xs font-medium text-slate-600">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-12 text-center px-4">
          <Link href="/services" className="inline-flex items-center text-blue-700 font-bold hover:underline underline-offset-4">
            Explore All 18 Water & Solar Services →
          </Link>
        </div>
      </section>

      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline={`Talk to ${COMPANY_NAME} Engineers`}
        subheadline="Whether you need a home RO purifier or a 100 KLD Industrial ETP plant, we provide honest technical advice without pressure."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}

