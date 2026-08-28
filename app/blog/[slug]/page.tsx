import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { COMPANY_NAME, SITE_URL } from "@/lib/site/constants";
import { BLOG_POSTS, getDynamicBlogPostBySlug } from "@/lib/site/blog";
import { BlogPostDetailClient } from "@/components/BlogPostDetailClient";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug_en || post.slug }));
}

export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getDynamicBlogPostBySlug(slug);
  if (!post) return { title: "Blog Article" };

  const enTitle = post.title_en || post.title;
  const enDesc = post.excerpt_en || post.description;
  const enSlug = post.slug_en || post.slug;
  const taSlug = post.slug_ta || post.slug;

  const url = `${SITE_URL}/blog/${enSlug}`;
  const taUrl = `${SITE_URL}/ta/blog/${taSlug}`;

  return {
    // Root layout applies the "%s | SITE_NAME" title template — keep this bare.
    title: enTitle,
    description: enDesc,
    keywords: post.keywords,
    alternates: {
      canonical: url,
      languages: {
        "en-IN": url,
        "ta-IN": taUrl,
        "x-default": url,
      },
    },
    openGraph: {
      type: "article",
      url,
      title: enTitle,
      description: enDesc,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      siteName: COMPANY_NAME,
      images: [{ url: post.image, alt: enTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: enTitle,
      description: enDesc,
      images: [post.image],
    },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getDynamicBlogPostBySlug(slug);
  if (!post) notFound();

  const enSlug = post.slug_en || post.slug;
  const articleUrl = `${SITE_URL}/blog/${enSlug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title_en || post.title,
    "description": post.excerpt_en || post.description,
    "image": post.image,
    "inLanguage": "en-IN",
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
        "url": `${SITE_URL}/images/logo.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Suspense fallback={<div className="py-24 text-center text-slate-400 text-sm">Loading article...</div>}>
        <BlogPostDetailClient post={post} initialLang="en" />
      </Suspense>
    </>
  );
}
