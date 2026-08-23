"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import {
  CALL,
  FORMER_COMPANY_NAME,
  PHONE_DISPLAY,
  WHATSAPP,
  buildWhatsAppUrl,
} from "@/lib/site/constants";
import { generateSocialPostPack } from "@/lib/site/projects";
import type { ProjectItem } from "@/lib/site/types";
import {
  MapPin,
  Calendar,
  Layers,
  CheckCircle2,
  Quote,
  ShieldCheck,
  Phone,
  MessageCircle,
  Share2,
  Copy,
  Check,
  Video,
  Wrench,
  Building2,
  ArrowRight,
} from "lucide-react";

export function ProjectDetailPageView({ project }: { project: ProjectItem }) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const socialPack = generateSocialPostPack(project);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const images = project.projectImages || project.gallery || [];
  const title = project.projectTitle || project.projectName || "Project Case Study";
  const problem = project.problemFaced || project.problem || "";
  const solution = project.solutionProvided || project.solution || "";

  return (
    <article className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 text-white py-16 px-4 md:px-8 relative">
        <div className="max-w-6xl mx-auto pt-4">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/projects", label: "Projects" },
              { href: `/projects/${project.slug}`, label: project.district },
            ]}
          />

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {project.customerCategory || project.category} Category
            </span>
            <span className="bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold px-3 py-1 rounded-full">
              {project.projectType}
            </span>
            {project.featured && (
              <span className="bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                ⭐ Featured Case Study
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-8">
            {project.projectDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={CALL}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition text-sm sm:text-base"
            >
              <Phone className="w-5 h-5" /> Call {PHONE_DISPLAY}
            </a>
            <a
              href={buildWhatsAppUrl(`Hello, I read about the project "${title}" in ${project.district}. I need a similar solution.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition text-sm sm:text-base"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Project Enquiry
            </a>
          </div>
        </div>
      </section>

      <section className="py-4 bg-cyan-900/90 text-white text-center text-xs sm:text-sm font-medium border-b border-cyan-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Formerly known as <strong>{FORMER_COMPANY_NAME}</strong> — 10+ Years of Engineering Trust in Karur & Tamil Nadu</span>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto py-12 px-4 md:px-8 space-y-12">
        {/* Quick Specs Grid */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Location & District</span>
              <span className="text-sm font-bold text-slate-800">{project.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Capacity / Sizing</span>
              <span className="text-sm font-bold text-slate-800">{project.capacity}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Industry</span>
              <span className="text-sm font-bold text-slate-800">{project.industryType || project.industry}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Execution Date</span>
              <span className="text-sm font-bold text-slate-800">{project.installationDate || project.completionYear}</span>
            </div>
          </div>
        </div>

        {/* Problem vs Solution Split */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-50/60 p-8 rounded-2xl border border-red-100 shadow-sm">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              The Challenge / Problem Faced
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Customer Requirement & Water Diagnostic</h2>
            <p className="text-slate-700 leading-relaxed text-sm">{problem}</p>
          </div>

          <div className="bg-emerald-50/60 p-8 rounded-2xl border border-emerald-100 shadow-sm">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Engineered Solution Implemented
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Turnkey Technology Deployment</h2>
            <p className="text-slate-700 leading-relaxed text-sm">{solution}</p>
          </div>
        </div>

        {/* Technical Specs & Products Used */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <Wrench className="w-6 h-6 text-blue-600" /> Key Technical Components & Equipment Used
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {project.productsUsed.map((prod, i) => (
              <span
                key={i}
                className="bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-800 text-xs font-semibold px-4 py-2 rounded-xl transition"
              >
                ⚙️ {prod}
              </span>
            ))}
          </div>
        </section>

        {/* Benefits Achieved */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Quantifiable Benefits & Client Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.benefitsAchieved.map((b, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm font-medium">{b}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Image Gallery Section */}
        {images.length > 0 && (
          <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Installation Photo Gallery</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {images.map((img, idx) => (
                <div key={idx} className="group relative bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                  <div className="relative h-64 w-full">
                    <Image
                      src={img.url}
                      alt={img.caption || title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  {img.caption && (
                    <div className="p-3 bg-slate-900/90 text-white text-xs font-medium">
                      📸 {img.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Video Showcase Section */}
        {project.videoUrl && (
          <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <Video className="w-6 h-6 text-red-600" /> Project Demonstration Video
            </h2>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
              <iframe
                src={project.videoUrl}
                title={`${title} Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </section>
        )}

        {/* Testimonial Quote Card */}
        {project.testimonial && (
          <section className="bg-gradient-to-br from-blue-900 to-cyan-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
            <Quote className="w-16 h-16 text-white/10 absolute top-4 right-4" />
            <span className="bg-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-4">
              Client Testimonial
            </span>
            <blockquote className="text-lg sm:text-xl font-medium leading-relaxed italic mb-6 relative z-10">
              &ldquo;{project.testimonial.quote}&rdquo;
            </blockquote>
            <div className="relative z-10">
              <p className="font-bold text-white text-base">{project.testimonial.clientName}</p>
              <p className="text-cyan-200 text-xs mt-0.5">
                {project.testimonial.designation} {project.testimonial.company ? `• ${project.testimonial.company}` : ""}
              </p>
            </div>
          </section>
        )}

        {/* Social Media & GBP Content Export Tool */}
        <section className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-cyan-400" /> Social Media & Google Business Profile Content Generator
              </h2>
              <p className="text-slate-400 text-xs mt-1">Copy ready-to-post templates tailored for Google Business Profile, Facebook & Instagram.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* GBP Post */}
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">Google Business Profile</span>
                <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900 p-3 rounded-lg border border-slate-700 whitespace-pre-wrap">
                  {socialPack.gbpDescription}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(socialPack.gbpDescription, "gbp")}
                className="mt-4 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 px-4 rounded-lg text-xs transition"
              >
                {copiedKey === "gbp" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedKey === "gbp" ? "Copied GBP Text!" : "Copy GBP Post"}
              </button>
            </div>

            {/* FB Post */}
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-2">Facebook Update</span>
                <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900 p-3 rounded-lg border border-slate-700 whitespace-pre-wrap">
                  {socialPack.facebookPost}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(socialPack.facebookPost, "fb")}
                className="mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-xs transition"
              >
                {copiedKey === "fb" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedKey === "fb" ? "Copied Facebook Text!" : "Copy Facebook Post"}
              </button>
            </div>

            {/* IG Post */}
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider block mb-2">Instagram Caption</span>
                <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900 p-3 rounded-lg border border-slate-700 whitespace-pre-wrap">
                  {socialPack.instagramCaption}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(socialPack.instagramCaption, "ig")}
                className="mt-4 flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg text-xs transition"
              >
                {copiedKey === "ig" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedKey === "ig" ? "Copied IG Caption!" : "Copy IG Caption"}
              </button>
            </div>
          </div>
        </section>

        {/* Interlinked Related Services */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Explore Related Water & Solar Services</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "Industrial RO Plants", href: "/services/industrial-ro-plant" },
              { title: "Water Softeners", href: "/services/water-softener" },
              { title: "Solar Water Heaters", href: "/services/solar-water-heater" },
            ].map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="group flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <span className="font-bold text-slate-800 text-sm group-hover:text-blue-700">{link.title}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition" />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline={`Need a Similar ${project.projectType} in ${project.district}?`}
        subheadline="Consult with Yuvanthika Aquacare & Solar Care Systems chief water treatment engineers for a free site audit."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
