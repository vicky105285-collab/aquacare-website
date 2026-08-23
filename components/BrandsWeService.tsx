"use client";

import React from "react";

const BRANDS = [
  {
    name: "Kent RO Systems",
    shortName: "KENT",
    tagline: "House of Purity",
    color: "from-blue-600 to-cyan-600",
    textColor: "text-blue-600",
    bgLight: "bg-blue-50/80",
    borderColor: "border-blue-200",
  },
  {
    name: "Aquaguard",
    shortName: "Aquaguard",
    tagline: "Eureka Forbes",
    color: "from-cyan-500 to-teal-600",
    textColor: "text-cyan-600",
    bgLight: "bg-cyan-50/80",
    borderColor: "border-cyan-200",
  },
  {
    name: "Havells",
    shortName: "HAVELLS",
    tagline: "Alkaline & UV",
    color: "from-red-600 to-rose-600",
    textColor: "text-red-600",
    bgLight: "bg-red-50/80",
    borderColor: "border-red-200",
  },
  {
    name: "V-Guard",
    shortName: "V-GUARD",
    tagline: "Solar & Water Care",
    color: "from-amber-500 to-orange-600",
    textColor: "text-amber-600",
    bgLight: "bg-amber-50/80",
    borderColor: "border-amber-200",
  },
  {
    name: "Luminous",
    shortName: "LUMINOUS",
    tagline: "Solar & Inverter",
    color: "from-indigo-600 to-blue-700",
    textColor: "text-indigo-600",
    bgLight: "bg-indigo-50/80",
    borderColor: "border-indigo-200",
  },
  {
    name: "Blue Star",
    shortName: "BLUE STAR",
    tagline: "Commercial Coolers",
    color: "from-blue-700 to-sky-500",
    textColor: "text-blue-700",
    bgLight: "bg-sky-50/80",
    borderColor: "border-sky-200",
  },
  {
    name: "AO Smith",
    shortName: "A.O. SMITH",
    tagline: "Hot Water & RO",
    color: "from-emerald-600 to-teal-700",
    textColor: "text-emerald-600",
    bgLight: "bg-emerald-50/80",
    borderColor: "border-emerald-200",
  },
  {
    name: "Livpure",
    shortName: "LIVPURE",
    tagline: "Smart Water Purifiers",
    color: "from-cyan-600 to-blue-600",
    textColor: "text-cyan-700",
    bgLight: "bg-cyan-50/80",
    borderColor: "border-cyan-200",
  },
];

export function BrandsWeService() {
  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200/80" aria-labelledby="brands-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p id="brands-heading" className="text-xs sm:text-sm font-bold text-cyan-700 uppercase tracking-widest mb-2">
            Multi-Brand Engineering Expertise
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Authorized Service & Genuine Spares For Top Brands
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Certified technicians, original membranes, genuine filters, and same-day doorstep service across Karur & Tamil Nadu.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {BRANDS.map((brand) => (
            <div
              key={brand.name}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${brand.borderColor} ${brand.bgLight} shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group`}
            >
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${brand.color} text-white flex items-center justify-center font-black text-xs shadow-md mb-2 group-hover:scale-110 transition-transform`}>
                {brand.shortName.charAt(0)}
              </div>
              <span className={`font-black text-xs tracking-tight ${brand.textColor} text-center`}>
                {brand.shortName}
              </span>
              <span className="text-[10px] text-slate-500 font-medium text-center mt-0.5">
                {brand.tagline}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
