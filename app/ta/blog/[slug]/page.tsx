import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { COMPANY_NAME, SITE_URL } from "@/lib/site/constants";
import { BLOG_POSTS, getDynamicBlogPostBySlug } from "@/lib/site/blog";
import { BlogPostDetailClient } from "@/components/BlogPostDetailClient";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug_ta || post.slug }));
}

export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getDynamicBlogPostBySlug(slug);
  if (!post) return { title: "தமிழ் கட்டுரை" };

  const taTitle = post.title_ta || post.titleTa || post.title;
  const taDesc = post.excerpt_ta || post.descriptionTa || post.description;
  const taSlug = post.slug_ta || post.slug;
  const enSlug = post.slug_en || post.slug;

  const url = `${SITE_URL}/ta/blog/${taSlug}`;
  const enUrl = `${SITE_URL}/blog/${enSlug}`;
  const ogImage = post.image || `${SITE_URL}/images/og-image.png`;

  return {
    title: `${taTitle} | ${COMPANY_NAME}`,
    description: taDesc,
    keywords: post.keywords,
    alternates: {
      canonical: url,
      languages: {
        "en-IN": enUrl,
        "ta-IN": url,
        "x-default": enUrl,
      },
    },
    openGraph: {
      type: "article",
      url,
      title: taTitle,
      description: taDesc,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      siteName: COMPANY_NAME,
      images: [{ url: ogImage, alt: taTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: taTitle,
      description: taDesc,
      images: [ogImage],
    },
  };
}

export default async function TamilBlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getDynamicBlogPostBySlug(slug);
  if (!post) notFound();

  const taTitle = post.title_ta || post.titleTa || post.title;
  const taDesc = post.excerpt_ta || post.descriptionTa || post.description;
  const taSlug = post.slug_ta || post.slug;
  const articleUrl = `${SITE_URL}/ta/blog/${taSlug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": taTitle,
    "description": taDesc,
    "image": post.image || `${SITE_URL}/images/og-image.png`,
    "inLanguage": "ta-IN",
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

      <Suspense fallback={<div className="py-24 text-center text-slate-400 text-sm">தமிழ் கட்டுரை ஏற்றப்படுகிறது...</div>}>
        <BlogPostDetailClient post={post} initialLang="ta" />
      </Suspense>
    </>
  );
}
