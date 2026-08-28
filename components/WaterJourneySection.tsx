"use client";

import React, { useEffect, useRef, useState } from "react";
import { Droplets, Filter, FlaskConical, GlassWater, ArrowDown } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

type Step = {
  icon: React.ElementType;
  label: string;
  caption: string;
};

const STEPS: Step[] = [
  {
    icon: Droplets,
    label: "Raw Water",
    caption: "Borewell or municipal supply — may carry hardness, TDS, sediment or iron.",
  },
  {
    icon: Filter,
    label: "Pre-Treatment",
    caption: "Sediment and carbon filtration plus softening, sized to your water report.",
  },
  {
    icon: FlaskConical,
    label: "RO / Purification",
    caption: "RO / UF membrane stages, with UV disinfection added where it is needed.",
  },
  {
    icon: GlassWater,
    label: "Pure Water",
    caption: "Safe, clear, great-tasting water delivered at the tap.",
  },
];

export function WaterJourneySection({ className = "" }: { className?: string }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      const raf = requestAnimationFrame(() => setActive(STEPS.length - 1));
      return () => cancelAnimationFrame(raf);
    }

    let started = false;
    const timers: number[] = [];
    const run = () => {
      if (started) return;
      started = true;
      STEPS.forEach((_, i) => {
        timers.push(window.setTimeout(() => setActive(i), 220 + i * 300));
      });
    };

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => entries[0]?.isIntersecting && run(),
            { threshold: 0.35 },
          )
        : undefined;
    io?.observe(el);
    timers.push(window.setTimeout(run, 6000));

    return () => {
      io?.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const fillPct = (Math.max(active, 0) / (STEPS.length - 1)) * 100;

  return (
    <section
      className={`py-20 lg:py-28 bg-gradient-to-b from-white to-slate-50 ${className}`}
      id="water-journey"
      aria-labelledby="water-journey-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-cyan-600 font-semibold text-sm tracking-widest uppercase mb-3">
            How It Works
          </p>
          <h2
            id="water-journey-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800"
          >
            From Raw Water to{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Pure Water
            </span>
          </h2>
          <p className="text-slate-500 text-lg mt-4 max-w-2xl mx-auto">
            Every system we build follows the same treatment path — the stages are
            sized to your water and your requirement.
          </p>
        </AnimatedSection>

        <div ref={rowRef} className="relative">
          {/* Flowing connector (desktop) — spans tile 1 centre to tile 4 centre */}
          <div
            className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-9 h-1.5 -translate-y-1/2 rounded-full bg-slate-200 overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="relative h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-[width] duration-700 ease-out"
              style={{ width: `${fillPct}%` }}
            >
              <div className="water-flow absolute inset-0" />
            </div>
          </div>

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const on = i <= active;
              return (
                <li
                  key={step.label}
                  className="relative flex flex-col items-center text-center"
                >
                  <div
                    className={`relative z-10 w-[72px] h-[72px] rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${
                      on
                        ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white"
                        : "bg-white text-slate-300 border border-slate-200"
                    }`}
                  >
                    <Icon className="w-8 h-8" />
                    <span
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-black flex items-center justify-center transition-colors duration-500 ${
                        on ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </div>

                  <h3
                    className={`mt-4 text-lg font-bold transition-colors duration-500 ${
                      on ? "text-slate-800" : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed max-w-[16rem]">
                    {step.caption}
                  </p>

                  {i < STEPS.length - 1 && (
                    <ArrowDown
                      className="lg:hidden w-5 h-5 text-cyan-500 mt-6"
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
