"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { motion, useReducedMotion } from "motion/react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { PROJECTS_DATA } from "@/lib/site/projects";
import { MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export function FeaturedProjectsSection() {
  const [activeTab, setActiveTab] = useState<"featured" | "industrial" | "recent">("featured");
  const reduce = useReducedMotion();

  const displayedProjects = PROJECTS_DATA.filter((p) => {
    if (activeTab === "featured") return p.featured;
    if (activeTab === "industrial") return p.customerCategory === "industrial" || p.category === "industrial";
    return true; // recent
  }).slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden" aria-labelledby="featured-projects-heading">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-4 py-1.5 text-cyan-300 text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Proven Engineering Case Studies</span>
          </div>

          <h2 id="featured-projects-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black">
            Featured <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Installations & Case Studies</span>
          </h2>
          <p className="text-slate-400 text-base mt-4">
            Realized turnkey water treatment, ZLD ETPs, STPs, DM plants, and solar installations across Karur & Tamil Nadu.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "featured"
                  ? "bg-cyan-500 text-slate-950 shadow-lg"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              ⭐ Featured Installations
            </button>
            <button
              onClick={() => setActiveTab("industrial")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "industrial"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              🏭 Recent Industrial Projects
            </button>
            <button
              onClick={() => setActiveTab("recent")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "recent"
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              💧 All Latest Installations
            </button>
          </div>
        </AnimatedSection>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {displayedProjects.map((project, idx) => {
            const title = project.projectTitle || project.projectName || "Project Case Study";
            const images = project.projectImages || project.gallery || [];
            const solution = project.solutionProvided || project.solution;

            return (
              <AnimatedSection key={project.id} delay={idx * 100}>
                <motion.div
                  whileHover={reduce ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 shadow-xl transition-[border-color,box-shadow] duration-300 flex flex-col h-full group"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                    <SmartImage
                      src={images[0]?.url}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-cyan-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {project.projectType}
                    </div>
                    <div className="absolute top-3 right-3 bg-slate-950/80 text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-cyan-500/30">
                      {project.district}
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white leading-snug group-hover:text-cyan-400 transition-colors">
                        {title}
                      </h3>

                      <div className="flex items-center text-slate-400 text-xs font-medium mt-2 mb-4">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-cyan-400 shrink-0" />
                        {project.location}
                      </div>

                      <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/60 mb-4">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Plant Capacity</span>
                        <span className="text-xs font-semibold text-white">{project.capacity}</span>
                      </div>

                      <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed mb-4">
                        {solution}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-700/60">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
                      >
                        View Full Case Study & Results <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl transition shadow-lg text-sm sm:text-base"
          >
            Explore Complete Projects Portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
