import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, Building2, Factory, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/site/page-metadata";
import { COMPANY_NAME, FORMER_COMPANY_NAME } from "@/lib/site/constants";

export const revalidate = 0;

export const metadata: Metadata = pageMetadata({
  title: "Residential, Commercial & Industrial Water & Solar Services",
  description:
    `Comprehensive RO purifiers, water softeners, solar heaters, commercial & industrial RO plants, ETP, STP, DM plants in Karur & Tamil Nadu by ${COMPANY_NAME} (${FORMER_COMPANY_NAME}).`,
  path: "/services",
  keywords: [
    "RO service Karur",
    "Industrial RO plant Tamil Nadu",
    "ETP plant Karur",
    "STP plant Tamil Nadu",
    "DM plant Tamil Nadu",
    "Water Softener Karur",
    "Solar Water Heater Karur",
  ],
});

const RESIDENTIAL_SERVICES = [
  { slug: "ro-water-purifier", title: "RO Water Purifier", desc: "Multi-stage RO, UV, Alkaline & Copper purifiers tailored for high TDS borewell water." },
  { slug: "ro-installation", title: "RO Installation & Fitting", desc: "Precision wall mounting, pressure testing, and leak-proof tubing installation." },
  { slug: "ro-service", title: "RO Service & Urgent Repair", desc: "Same-day doorstep repair, pump replacement, membrane change, and leak fix." },
  { slug: "ro-amc", title: "RO AMC Maintenance Plans", desc: "Worry-free annual contracts with free filter replacements & unlimited service calls." },
  { slug: "water-softener", title: "Whole House Water Softener", desc: "Eliminate limescale, protect geysers & taps, stop skin dryness & hair breakage." },
  { slug: "solar-water-heater", title: "Solar Water Heater (ETC/FPC)", desc: "24/7 steaming hot water powered by sun radiation. Slash electric power bills." },
  { slug: "solar-system-maintenance", title: "Solar Heater Service & Descaling", desc: "Glass tube replacement, tank descaling, sacrificial anode fitting, and pipe repair." },
  { slug: "ups-battery-replacement", title: "UPS & Inverter Battery Service", desc: "Home power backup, tubular battery sales, acid topping, and voltage check." },
  { slug: "washing-machine-service", title: "Washing Machine Service", desc: "Doorstep repair for front load, top load, and semi-automatic models." },
  { slug: "refrigerator-service", title: "Refrigerator Repair & Gas Refill", desc: "Thermostat fix, frost build-up repair, eco-gas charging, compressor replacement." },
];

const COMMERCIAL_SERVICES = [
  { slug: "commercial-ro-plant", title: "Commercial RO Water Plant", desc: "250 LPH to 5000 LPH plants for schools, colleges, hospitals, hostels & restaurants." },
  { slug: "commercial-water-treatment-plant", title: "Commercial Water Treatment Plant", desc: "Raw water filtration, iron removal, and central softeners for commercial complexes." },
];

const INDUSTRIAL_SERVICES = [
  { slug: "industrial-ro-plant", title: "Industrial RO Plant (5-500 KLD)", desc: "High-recovery process water plants for textile dyeing, pharma, chemical & food industries." },
  { slug: "dm-plant", title: "Demineralization (DM) Plant", desc: "Produces ultra-pure water (<1 µS/cm conductivity) for high-pressure boilers & electronics." },
  { slug: "etp-plant", title: "Effluent Treatment Plant (ETP & ZLD)", desc: "TNPCB-compliant chemical/biological wastewater plants with Zero Liquid Discharge." },
  { slug: "stp-plant", title: "Sewage Treatment Plant (STP)", desc: "Compact MBBR/SBR/MBR plants recycling domestic sewage for landscape irrigation." },
  { slug: "industrial-water-treatment-plant", title: "Industrial Water Treatment Plant", desc: "Turnkey intake clarification, sand filtration, activated carbon & heavy softeners." },
  { slug: "operation-and-maintenance-services", title: "Plant Operation & Maintenance (O&M)", desc: "24/7 skilled operator deployment, chemical supply, and guaranteed TNPCB compliance." },
];

export default function ServicesIndexPage() {
  return (
    <article className="bg-slate-50 min-h-screen">
      <PageHero
        title="Water & Solar Services"
        subtitle="Turnkey water treatment, renewable energy, and facility maintenance engineering for homes, commercial complexes, and manufacturing plants."
        tamilLine="வீட்டு, வணிக மற்றும் தொழில்துறை நீர் சுத்திகரிப்பு தீர்வுகள்."
      />

      <section className="py-6 bg-cyan-50 border-b border-cyan-100 text-center text-xs sm:text-sm text-cyan-900 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
          <span>Formerly known as <strong>{FORMER_COMPANY_NAME}</strong> — 10+ Years Serving Karur & Tamil Nadu</span>
        </div>
      </section>

      {/* Residential Services */}
      <section className="py-16 bg-white" aria-labelledby="res-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h2 id="res-heading" className="text-2xl font-black text-slate-900">
                Residential Water & Home Appliance Services
              </h2>
              <p className="text-slate-500 text-sm">Doorstep visits across Karur, Namakkal, Erode, and central Tamil Nadu.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESIDENTIAL_SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-cyan-600 transition-colors">
                  View Service Details <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Services */}
      <section className="py-16 bg-slate-50 border-t border-slate-200" aria-labelledby="comm-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 id="comm-heading" className="text-2xl font-black text-slate-900">
                Commercial Water Treatment Systems
              </h2>
              <p className="text-slate-500 text-sm">Engineered for schools, colleges, hospitals, hostels, and hotels.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {COMMERCIAL_SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                  View Plant Specifications <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial Services */}
      <section className="py-16 bg-white border-t border-slate-200" aria-labelledby="ind-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <h2 id="ind-heading" className="text-2xl font-black text-slate-900">
                Industrial RO, ETP, STP & DM Solutions (Turnkey & AMC)
              </h2>
              <p className="text-slate-500 text-sm">Textile dyeing mills, chemical, paper, power plants & manufacturing units.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIAL_SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm transition-all duration-300 hover:bg-white hover:border-blue-500 hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-700 group-hover:text-blue-900 transition-colors">
                  View Industrial Solutions <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
