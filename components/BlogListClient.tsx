"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { BlogLanguageToggle } from "@/components/BlogLanguageToggle";
import type { BlogPost } from "@/lib/site/types";
import { ArrowRight, BookOpen, Clock, User, Sparkles } from "lucide-react";

export function BlogListClient({ posts, companyName }: { posts: BlogPost[]; companyName: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedLang, setSelectedLang] = useState<"en" | "ta" | null>(null);

  const handleToggleLanguage = (newLang: "en" | "ta") => {
    setSelectedLang(newLang);
    try {
      localStorage.setItem("app_lang", newLang);
      document.cookie = `app_lang=${newLang}; path=/; max-age=31536000`;
    } catch (e) {
      console.error(e);
    }
    const params = new URLSearchParams(searchParams.toString());
    if (newLang === "ta") {
      params.set("lang", "ta");
    } else {
      params.delete("lang");
    }
    const queryStr = params.toString();
    router.replace(queryStr ? `?${queryStr}` : window.location.pathname, { scroll: false });
  };

  const urlLang = searchParams.get("lang");
  const lang: "en" | "ta" =
    selectedLang ?? (urlLang === "ta" ? "ta" : "en");
  const isTamil = lang === "ta";

  return (
    <section className="py-16 lg:py-20 bg-slate-50" aria-labelledby="posts-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h2 id="posts-heading" className="text-2xl sm:text-3xl font-black text-slate-800 flex items-center gap-3">
              <BookOpen className="w-7 h-7 text-blue-600 shrink-0" />
              {isTamil ? "தொழில்நுட்ப கட்டுரைகள் & வழிகாட்டிகள்" : "Featured SEO Guides & Technical Articles"}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              {isTamil
                ? `${companyName} பொறியாளர்களால் எழுதப்பட்ட விரிவான வழிகாட்டிகள்.`
                : `Written by field engineers at ${companyName} with 10+ years of operational experience.`}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <BlogLanguageToggle currentLang={lang} onToggle={handleToggleLanguage} variant="hero" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const title = isTamil && post.titleTa ? post.titleTa : post.title;
            const desc = isTamil && post.descriptionTa ? post.descriptionTa : post.description;
            const linkHref = `/blog/${post.slug}${isTamil ? "?lang=ta" : ""}`;

            return (
              <div
                key={post.slug}
                className="flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-cyan-300 transition-all duration-300 group"
              >
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <span>{post.category}</span>
                    {post.titleTa && (
                      <span title="Tamil translation available">
                        <Sparkles className="w-3 h-3 text-amber-300 ml-1" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                      </span>
                      <span>•</span>
                      <span>{post.publishedAt}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">
                      <Link href={linkHref}>{title}</Link>
                    </h3>

                    <p className="mt-3 text-slate-600 text-sm line-clamp-3 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                      <User className="w-3.5 h-3.5 text-cyan-600" /> {post.author.split(" ")[0]} Team
                    </span>
                    <Link
                      href={linkHref}
                      className="inline-flex items-center text-xs font-bold text-blue-600 group-hover:text-cyan-600 transition-colors"
                    >
                      {isTamil ? "கட்டுரையை படிக்க" : "Read Guide"} <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
