"use client";

import React, { useState } from "react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Sparkles, MapPin, CheckCircle } from "lucide-react";

export type BeforeAfterItem = {
  id: string;
  title: string;
  location: string;
  category: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  results: string[];
};

export const SAMPLE_TRANSFORMATIONS: BeforeAfterItem[] = [
  {
    id: "trans-01",
    title: "50,000 LPH Textile Dyeing RO Plant",
    location: "Reddipalayam Textile Park, Karur",
    category: "Industrial RO",
    beforeImg: "",
    afterImg: "",
    description: "Raw borewell water TDS of 2,400 PPM reduced to 45 PPM for high-precision fabric dyeing.",
    results: ["98.1% Salt Rejection", "50,000 Liters/Hour Output", "Zero Fabric Staining"],
  },
  {
    id: "trans-02",
    title: "Centralized Hard Water Softener for Villa",
    location: "Andankoil East, Karur",
    category: "Water Softeners",
    beforeImg: "",
    afterImg: "",
    description: "Severe limescale encrustation on solar heater and bathroom fixtures solved with automated softener.",
    results: ["100% Limescale Elimination", "Water Hardness Reduced from 650 PPM to 20 PPM", "Protected Solar Collector Tubes"],
  },
  {
    id: "trans-03",
    title: "500 LPD ETC Commercial Solar Water Heater",
    location: "Hotel Highway Inn, Namakkal",
    category: "Solar Heaters",
    beforeImg: "",
    afterImg: "",
    description: "Replaced scaling geysers with zero-electricity solar heating system, supplying hot water for 30 hotel rooms.",
    results: ["Saved ₹18,500/Month Electricity", "85°C Hot Water Output", "Same-Day Installation"],
  },
];

export function BeforeAfterGallerySection({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState("ALL");
  const categories = ["ALL", "Industrial RO", "Water Softeners", "Solar Heaters"];

  const filtered = SAMPLE_TRANSFORMATIONS.filter(
    (item) => activeTab === "ALL" || item.category === activeTab
  );

  return (
    <section className={`py-16 bg-slate-950 text-white ${className}`} id="before-after-transformations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" /> Proven Real-World Proof
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Before & After Transformations
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Drag or swipe the image slider to see how Yuvanthika water and solar systems transform hard borewell water into pure, soft water.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === cat
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl hover:border-cyan-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <BeforeAfterSlider
                  beforeImg={item.beforeImg}
                  afterImg={item.afterImg}
                  beforeTitle="Raw Water / Before"
                  afterTitle="Purified / After"
                />

                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-medium text-cyan-400">
                      <MapPin className="w-3.5 h-3.5" /> {item.location}
                    </span>
                    <span className="bg-slate-800 px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] text-slate-300">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-white">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 space-y-1.5">
                {item.results.map((res, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
