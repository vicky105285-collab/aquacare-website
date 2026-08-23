import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { buildWhatsAppUrl, CALL, COMPANY_NAME, FORMER_COMPANY_NAME, PHONE_DISPLAY, SITE_URL } from "@/lib/site/constants";
import { BLOG_POSTS, getDynamicBlogPostBySlug } from "@/lib/site/blog";
import { ArrowLeft, Clock, MessageCircle, User } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getDynamicBlogPostBySlug(slug);
  if (!post) return { title: "Blog Article" };
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} | ${COMPANY_NAME}`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      siteName: COMPANY_NAME,
      images: [{ url: post.image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getDynamicBlogPostBySlug(slug);
  if (!post) notFound();

  const articleUrl = `${SITE_URL}/blog/${post.slug}`;
  const wa = buildWhatsAppUrl(`Hi, I read your article "${post.title}" and would like to consult with your team.`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt,
    "author": {
      "@type": "Organization",
      "name": post.author,
      "url": SITE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "name": COMPANY_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/favicon.ico`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${SITE_URL}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": articleUrl
      }
    ]
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <div className="relative">
        <PageHero title={post.title} subtitle={post.description} tamilLine="தொழில்நுட்ப வழிகாட்டி கட்டுரை." />
        <div className="absolute top-0 left-0 right-0">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/blog", label: "Blog" },
              { href: articleUrl, label: post.title },
            ]}
          />
        </div>
      </div>

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
              alt={post.title}
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
              Ask Engineer
            </a>
          </div>

          {/* Article Markdown Content */}
          <div className="prose prose-lg max-w-none text-slate-700 prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-p:leading-relaxed prose-li:my-1">
            {post.content.split("\n\n").map((paragraph, index) => {
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
              href="/blog"
              className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
            </Link>

            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-bold text-sm hover:bg-green-400 transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" /> Discuss Article on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <CTASection
        callHref={CALL}
        whatsappHref={wa}
        headline="Need Expert Help with Your Water & Solar Systems?"
        subheadline="Contact our Karur team today for doorstep service, water testing, and instant estimates."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
