"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Droplets, Filter, FlaskConical, GlassWater, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

type Stage = {
  icon: typeof Droplets;
  label: string;
  caption: string;
};

const STAGES: Stage[] = [
  {
    icon: Droplets,
    label: "Raw Water",
    caption:
      "Borewell, municipal or tanker supply — carrying hardness, sediment, TDS or iron.",
  },
  {
    icon: Filter,
    label: "Pre-Treatment",
    caption:
      "Sediment and activated-carbon filtration, plus softening where the water needs it.",
  },
  {
    icon: FlaskConical,
    label: "RO / Purification",
    caption:
      "The RO membrane removes dissolved salts; UV or UF disinfection is added where required.",
  },
  {
    icon: GlassWater,
    label: "Pure Water",
    caption: "Safe, clear, great-tasting water delivered at every tap.",
  },
];

export function WaterJourneySection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(reduce ? STAGES.length - 1 : 0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.55"],
  });

  // Filled portion of the connector, 0 → 100 %.
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduce) return;
    // Light up a stage once the flow front reaches its node.
    const reached = STAGES.reduce(
      (acc, _s, i) => (p >= i / (STAGES.length - 1) - 0.06 ? i : acc),
      0,
    );
    setActive(reached);
  });

  return (
    <section
      id="water-journey"
      className="py-20 lg:py-28 bg-gradient-to-b from-white to-slate-50"
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
            Every system we build follows the same treatment path — each stage is
            sized to your water report and your requirement.
          </p>
        </AnimatedSection>

        <div ref={sectionRef} className="relative">
          {/* ---- Desktop connector: horizontal, fills as you scroll ---- */}
          <div
            className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-[36px] h-1.5 -translate-y-1/2 rounded-full bg-slate-200 overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="relative h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-600"
              style={reduce ? { width: "100%" } : { width: fill }}
            >
              {!reduce && <span className="water-current absolute inset-0" />}
            </motion.div>
          </div>

          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-6">
            {STAGES.map((stage, i) => {
              const Icon = stage.icon;
              const on = i <= active;
              return (
                <li
                  key={stage.label}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Mobile connector segment */}
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className={`lg:hidden absolute -top-6 left-1/2 -translate-x-1/2 w-1 h-6 rounded-full transition-colors duration-500 ${
                        on ? "bg-cyan-400" : "bg-slate-200"
                      }`}
                    />
                  )}

                  <div
                    className={`relative z-10 w-[72px] h-[72px] rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${
                      on
                        ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white scale-100"
                        : "bg-white text-slate-300 border border-slate-200 scale-95"
                    }`}
                  >
                    <Icon className="w-8 h-8" aria-hidden="true" />
                    <span
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-black flex items-center justify-center transition-colors duration-500 ${
                        on ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </div>

                  <h3
                    className={`mt-5 text-lg font-black uppercase tracking-wide transition-colors duration-500 ${
                      on ? "text-slate-800" : "text-slate-400"
                    }`}
                  >
                    {stage.label}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-[17rem]">
                    {stage.caption}
                  </p>

                  {i < STAGES.length - 1 && (
                    <ArrowRight
                      className="hidden lg:block absolute -right-3 top-[24px] w-5 h-5 text-cyan-400"
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
