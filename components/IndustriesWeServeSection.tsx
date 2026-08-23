import React from "react";
import {
  Shirt,
  Flame,
  Hospital,
  GraduationCap,
  Hotel,
  Utensils,
  Building2,
  Building,
  Factory,
  CheckCircle2,
} from "lucide-react";

export type IndustryItem = {
  icon: React.ElementType;
  name: string;
  desc: string;
  tech: string;
};

export const INDUSTRIES_SERVED: IndustryItem[] = [
  {
    icon: Shirt,
    name: "Textile Mills",
    desc: "Low-TDS soft water for yarn washing & spinning equipment.",
    tech: "Industrial RO & De-mineralization (DM) Plants",
  },
  {
    icon: Flame,
    name: "Dyeing Units",
    desc: "Zero-hardness water preventing fabric shade variation.",
    tech: "High-Recovery Industrial RO & Softeners",
  },
  {
    icon: Hospital,
    name: "Hospitals & Clinics",
    desc: "Medical-grade purified water for dialysis & autoclave sterilizers.",
    tech: "Double Pass RO & UV Sterilization Systems",
  },
  {
    icon: GraduationCap,
    name: "Schools & Colleges",
    desc: "Safe, high-volume drinking water for students & hostels.",
    tech: "Commercial RO Purifiers & UV Coolers",
  },
  {
    icon: Hotel,
    name: "Hotels & Resorts",
    desc: "Soft water for guest showers, boilers & kitchen operations.",
    tech: "Centralized Softeners & Commercial RO Plants",
  },
  {
    icon: Utensils,
    name: "Restaurants & Bakeries",
    desc: "Pure water enhancing food taste & appliance longevity.",
    tech: "Compact Commercial RO Purifiers",
  },
  {
    icon: Building2,
    name: "Apartments & Gated Communities",
    desc: "Borewell water softening for 100+ residential flats.",
    tech: "Automated Centralized Water Softening Plants",
  },
  {
    icon: Building,
    name: "Commercial Buildings",
    desc: "HVAC cooling tower water treatment & drinking water stations.",
    tech: "Softener & RO Systems with Remote Monitoring",
  },
  {
    icon: Factory,
    name: "Factories & Power Plants",
    desc: "Boiler feed water treatment & industrial effluent processing.",
    tech: "Heavy-Duty DM, ETP & STP Treatment Plants",
  },
];

export function IndustriesWeServeSection({ className = "" }: { className?: string }) {
  return (
    <section className={`py-16 bg-slate-900 text-white ${className}`} id="industries-we-serve">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-cyan-400 font-bold text-xs uppercase tracking-widest">Commercial & Industrial Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
            Industries We Serve Across Tamil Nadu
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Engineered water treatment and solar heating solutions tailored for textile, healthcare, hospitality, and residential sectors.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES_SERVED.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 hover:border-cyan-500/50 hover:bg-slate-800 transition-all group flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{ind.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{ind.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-700/60 flex items-center gap-2 text-xs text-cyan-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{ind.tech}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
