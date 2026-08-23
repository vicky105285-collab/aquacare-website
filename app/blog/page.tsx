import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { CALL, COMPANY_NAME, FORMER_COMPANY_NAME, PHONE_DISPLAY, WHATSAPP } from "@/lib/site/constants";
import { getDynamicBlogPosts } from "@/lib/site/blog";
import { pageMetadata } from "@/lib/site/page-metadata";
import { ArrowRight, BookOpen, Clock, User } from "lucide-react";

export const revalidate = 0;

export const metadata: Metadata = pageMetadata({
  title: "SEO Water Treatment & Solar Blog | Tamil Nadu Knowledge Hub",
  description:
    `Expert articles on RO maintenance, industrial RO design, ETP, STP, DM plants, water softeners & solar water heaters by ${COMPANY_NAME} (${FORMER_COMPANY_NAME}).`,
  path: "/blog",
  keywords: [
    "RO maintenance guide Tamil Nadu",
    "Industrial RO plant design",
    "ETP plant guide Karur",
    "STP plant maintenance Tamil Nadu",
    "Water softener benefits Karur",
    "Solar water heater savings Tamil Nadu",
  ],
});

export default async function BlogIndexPage() {
  const posts = await getDynamicBlogPosts();
  return (
    <article>
      <PageHero
        title="Water & Solar Knowledge Hub"
        subtitle="Practical engineering guides, maintenance checklists, and local water treatment insights for Karur & Tamil Nadu."
        tamilLine="நீர் மற்றும் சூரிய சக்தி தொழில்நுட்ப வழிகாட்டி."
      />

      <section className="py-16 lg:py-20 bg-slate-50" aria-labelledby="posts-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            <div>
              <h2 id="posts-heading" className="text-3xl font-black text-slate-800 flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-blue-600" /> Featured SEO Guides & Technical Articles
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Written by field engineers at {COMPANY_NAME} with 10+ years of operational experience.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-cyan-300 transition-all duration-300 group"
              >
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {post.category}
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
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="mt-3 text-slate-600 text-sm line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                      <User className="w-3.5 h-3.5 text-cyan-600" /> {post.author.split(" ")[0]} Team
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-xs font-bold text-blue-600 group-hover:text-cyan-600 transition-colors"
                    >
                      Read Guide <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Have a specific water treatment query?"
        subheadline="Talk directly with our lead engineers in Karur for a free technical consultation."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
