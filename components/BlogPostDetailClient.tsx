"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { BlogLanguageToggle } from "@/components/BlogLanguageToggle";
import { buildWhatsAppUrl, CALL, COMPANY_NAME, FORMER_COMPANY_NAME, PHONE_DISPLAY, SITE_URL } from "@/lib/site/constants";
import type { BlogPost } from "@/lib/site/types";
import { ArrowLeft, Clock, MessageCircle, User, Sparkles } from "lucide-react";

export function BlogPostDetailClient({
  post,
  initialLang = "en",
}: {
  post: BlogPost;
  initialLang?: "en" | "ta";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState<"en" | "ta">(
    pathname.startsWith("/ta/") ? "ta" : initialLang
  );

  const handleLanguageToggle = (newLang: "en" | "ta") => {
    setLang(newLang);
    try {
      localStorage.setItem("app_lang", newLang);
      document.cookie = `app_lang=${newLang}; path=/; max-age=31536000`;
    } catch (e) {
      console.error(e);
    }
    if (newLang === "ta") {
      router.push(`/ta/blog/${post.slug_ta || post.slug}`);
    } else {
      router.push(`/blog/${post.slug_en || post.slug}`);
    }
  };

  const isTamil = lang === "ta";

  // Auto Fallback Logic (Never show blank pages)
  const displayTitle = isTamil
    ? post.title_ta || post.titleTa || post.title_en || post.title
    : post.title_en || post.title;

  const displayDesc = isTamil
    ? post.excerpt_ta || post.descriptionTa || post.excerpt_en || post.description
    : post.excerpt_en || post.description;

  const displayContent = isTamil
    ? post.content_ta || post.contentTa || post.content_en || post.content
    : post.content_en || post.content;

  const articleUrl = isTamil
    ? `${SITE_URL}/ta/blog/${post.slug_ta || post.slug}`
    : `${SITE_URL}/blog/${post.slug_en || post.slug}`;

  const wa = buildWhatsAppUrl(
    `Hi, I read your article "${displayTitle}" (${isTamil ? "Tamil" : "English"}) and would like to consult with your team.`
  );

  return (
    <article>
      <div className="relative">
        <PageHero
          title={displayTitle}
          subtitle={displayDesc}
          tamilLine={isTamil ? "தொழில்நுட்ப வழிகாட்டி கட்டுரை — தமிழ் வடிவம்." : "தொழில்நுட்ப வழிகாட்டி கட்டுரை."}
        />
        <div className="absolute top-0 left-0 right-0">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: isTamil ? "/ta/blog" : "/blog", label: isTamil ? "வலைப்பதிவு (Blog)" : "Blog" },
              { href: articleUrl, label: displayTitle },
            ]}
          />
        </div>
      </div>

      {/* Language Switcher Bar */}
      <section className="bg-slate-900 border-b border-slate-800 py-3 sticky top-16 lg:top-20 z-30 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
            <span>{isTamil ? "தமிழ் மொழியில் படிக்கிறீர்கள்" : "Reading in English"}</span>
          </div>

          <BlogLanguageToggle currentLang={lang} onToggle={handleLanguageToggle} variant="sticky" />
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 text-sm text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <User className="w-4 h-4 text-cyan-600" /> {post.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" /> {post.readTime}
              </span>
            </div>
            <div className="text-xs bg-slate-100 px-3 py-1 rounded-full font-bold text-slate-700 uppercase tracking-wider">
              {post.category}
            </div>
          </div>

          <div className="my-8 relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <Image
              src={post.image}
              alt={displayTitle}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 900px"
              className="object-cover"
            />
          </div>

          {/* Trust Banner inside article */}
          <div className="mb-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-900 flex items-center justify-between">
            <p>
              💡 <strong>Note from {COMPANY_NAME}:</strong> Formerly known as <em>{FORMER_COMPANY_NAME}</em>, serving Karur & Tamil Nadu since 2014.
            </p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700 underline shrink-0 ml-2">
              {isTamil ? "பொறியாளரிடம் கேட்க" : "Ask Engineer"}
            </a>
          </div>

          {/* Article Content Render */}
          <div className="prose prose-lg max-w-none text-slate-700 prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-p:leading-relaxed prose-li:my-1">
            {displayContent.split("\n\n").map((paragraph, index) => {
              const trimmed = paragraph.trim();
              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-black text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-200">
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl font-bold text-slate-800 mt-8 mb-3">
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("#### ")) {
                return (
                  <h4 key={index} className="text-lg font-bold text-slate-800 mt-6 mb-2">
                    {trimmed.replace("#### ", "")}
                  </h4>
                );
              }
              if (trimmed.startsWith("- ")) {
                return (
                  <ul key={index} className="list-disc pl-6 space-y-2 my-4">
                    {trimmed.split("\n").map((line, lIdx) => (
                      <li key={lIdx} className="text-slate-700">
                        {line.replace("- ", "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (trimmed.startsWith("1. ")) {
                return (
                  <ol key={index} className="list-decimal pl-6 space-y-2 my-4">
                    {trimmed.split("\n").map((line, lIdx) => (
                      <li key={lIdx} className="text-slate-700">
                        {line.replace(/^\d+\.\s*/, "")}
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={index} className="my-4 leading-relaxed text-slate-700">
                  {trimmed}
                </p>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={isTamil ? "/ta/blog" : "/blog"}
              className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> {isTamil ? "அனைத்து கட்டுரைகளுக்கும் திரும்புக" : "Back to all articles"}
            </Link>

            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-bold text-sm hover:bg-green-400 transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" /> {isTamil ? "WhatsApp இல் உரையாட" : "Discuss Article on WhatsApp"}
            </a>
          </div>
        </div>
      </section>

      <CTASection
        callHref={CALL}
        whatsappHref={wa}
        headline={isTamil ? "உங்கள் நீர் & சோலார் அமைப்புகளில் உதவி தேவையா?" : "Need Expert Help with Your Water & Solar Systems?"}
        subheadline={isTamil ? "கரூரில் உடனடி சேவை மற்றும் விலைப்புள்ளிக்கு எங்களை தொடர்பு கொள்ளவும்." : "Contact our Karur team today for doorstep service, water testing, and instant estimates."}
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
