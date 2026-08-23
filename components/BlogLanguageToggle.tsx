"use client";

import React from "react";
import { Languages, Check } from "lucide-react";

export type BlogLanguageToggleProps = {
  currentLang: "en" | "ta";
  onToggle: (lang: "en" | "ta") => void;
  variant?: "hero" | "card" | "sticky";
};

export function BlogLanguageToggle({
  currentLang,
  onToggle,
  variant = "hero",
}: BlogLanguageToggleProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 p-1 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-xl ${
      variant === "sticky" ? "scale-95" : ""
    }`}>
      <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-slate-300">
        <Languages className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span className="hidden sm:inline uppercase tracking-wider text-[10px]">Language:</span>
      </div>

      <button
        type="button"
        onClick={() => onToggle("en")}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all duration-200 ${
          currentLang === "en"
            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 scale-[1.02]"
            : "text-slate-400 hover:text-white hover:bg-slate-800/60"
        }`}
        aria-pressed={currentLang === "en"}
      >
        <span>English</span>
        {currentLang === "en" && <Check className="w-3 h-3 text-white" aria-hidden />}
      </button>

      <button
        type="button"
        onClick={() => onToggle("ta")}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all duration-200 ${
          currentLang === "ta"
            ? "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-md shadow-amber-500/20 scale-[1.02]"
            : "text-slate-400 hover:text-amber-400 hover:bg-slate-800/60"
        }`}
        aria-pressed={currentLang === "ta"}
      >
        <span>தமிழ் (Tamil)</span>
        {currentLang === "ta" && <Check className="w-3 h-3 text-white" aria-hidden />}
      </button>
    </div>
  );
}
