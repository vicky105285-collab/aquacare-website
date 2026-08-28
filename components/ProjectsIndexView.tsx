"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { FORMER_COMPANY_NAME, CALL, WHATSAPP, PHONE_DISPLAY } from "@/lib/site/constants";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import type { ProjectItem } from "@/lib/site/types";
import { MapPin, ShieldCheck, ArrowRight, Filter, Search } from "lucide-react";

const CATEGORIES = ["All", "Residential", "Commercial", "Industrial"];
const SYSTEM_TYPES = ["All", "RO Plants", "Water Softeners", "Solar Systems", "ETP", "STP", "DM Plants"];

export function ProjectsIndexView({ projects }: { projects: ProjectItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Category filter
      const catMatch =
        selectedCategory === "All" ||
        p.customerCategory?.toLowerCase() === selectedCategory.toLowerCase() ||
        p.category?.toLowerCase() === selectedCategory.toLowerCase();

      // System type filter
      let typeMatch = true;
      if (selectedType !== "All") {
        const pType = p.projectType.toLowerCase();
        if (selectedType === "RO Plants") typeMatch = pType.includes("ro");
        else if (selectedType === "Water Softeners") typeMatch = pType.includes("softener");
        else if (selectedType === "Solar Systems") typeMatch = pType.includes("solar");
        else if (selectedType === "ETP") typeMatch = pType.includes("etp");
        else if (selectedType === "STP") typeMatch = pType.includes("stp");
        else if (selectedType === "DM Plants") typeMatch = pType.includes("dm") || pType.includes("demineralization");
      }

      // Search query
      const queryMatch =
        !searchQuery ||
        p.projectTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.projectName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.industryType?.toLowerCase().includes(searchQuery.toLowerCase());

      return catMatch && typeMatch && queryMatch;
    });
  }, [projects, selectedCategory, selectedType, searchQuery]);

  return (
    <article className="bg-slate-50 min-h-screen">
      <div className="relative">
        <PageHero
          title="Turnkey Engineering Projects & Case Studies"
          subtitle="Explore high-recovery RO plants, ZLD ETPs, STPs, DM plants, water softeners, and solar water heating installations across Karur & Tamil Nadu."
          tamilLine="நம்பகமான நீர் மற்றும் சூரிய சக்தி திட்டங்களின் தொகுப்பு."
        />
        <div className="absolute top-0 left-0 right-0">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/projects", label: "Projects" },
            ]}
          />
        </div>
      </div>

      <section className="py-5 bg-blue-900 text-white text-center text-xs sm:text-sm font-medium">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>
            Formerly known as <strong>{FORMER_COMPANY_NAME}</strong> — 10+ Years of Engineering Excellence in Tamil Nadu
          </span>
        </div>
      </section>

      {/* Interactive Filters Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
              <Filter className="w-5 h-5 text-blue-600" />
              <span>Filter Projects Portfolio</span>
            </div>

            {/* Search Box */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by District, Industry or City..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-blue-500 text-slate-800"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Customer Category:
              </span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* System Type Pills */}
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                System Technology / Plant Type:
              </span>
              <div className="flex flex-wrap gap-2">
                {SYSTEM_TYPES.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedType(st)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                      selectedType === st
                        ? "bg-cyan-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs sm:text-sm font-bold text-slate-500">
            Showing <span className="text-blue-600 font-extrabold">{filteredProjects.length}</span> verified project case studies
          </p>
          {(selectedCategory !== "All" || selectedType !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedType("All");
                setSearchQuery("");
              }}
              className="text-xs font-bold text-red-600 hover:underline"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
            <p className="text-slate-500 font-medium text-base mb-4">No project case studies matched your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedType("All");
                setSearchQuery("");
              }}
              className="bg-blue-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const pTitle = project.projectTitle || project.projectName || "Project Case Study";
              const pProblem = project.problemFaced || project.problem;
              const pSolution = project.solutionProvided || project.solution;
              const pImages = project.projectImages || project.gallery || [];

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Image Display */}
                  <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
                    {pImages[0]?.url ? (
                      <Image
                        src={pImages[0].url}
                        alt={pTitle}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <ImagePlaceholder />
                    )}
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {project.industryType || project.industry}
                    </div>
                    <div className="absolute top-3 right-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {project.district}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <Link href={`/projects/${project.slug}`}>
                        <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                          {pTitle}
                        </h3>
                      </Link>

                      <div className="flex items-center text-slate-500 text-xs font-semibold mt-2 mb-4">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-red-500 shrink-0" />
                        {project.location}
                      </div>

                      <div className="space-y-3 text-xs mb-6">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="font-bold text-cyan-700 block uppercase tracking-wider text-[10px]">
                            Capacity / Sizing
                          </span>
                          <p className="text-slate-800 font-semibold text-xs mt-0.5">{project.capacity}</p>
                        </div>

                        <div>
                          <span className="font-bold text-red-600 block uppercase tracking-wider text-[10px]">
                            Problem (Diagnostic)
                          </span>
                          <p className="text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">{pProblem}</p>
                        </div>

                        <div>
                          <span className="font-bold text-emerald-700 block uppercase tracking-wider text-[10px]">
                            Solution Implemented
                          </span>
                          <p className="text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">{pSolution}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-cyan-600 transition"
                      >
                        Read Full Case Study <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Ready to start your next water or solar project?"
        subheadline="Consult with Yuvanthika Aquacare & Solar Care Systems engineers for turnkey EPC design, installation, and AMC."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
