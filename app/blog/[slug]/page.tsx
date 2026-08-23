import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { COMPANY_NAME, SITE_URL } from "@/lib/site/constants";
import { BLOG_POSTS, getDynamicBlogPostBySlug } from "@/lib/site/blog";
import { BlogPostDetailClient } from "@/components/BlogPostDetailClient";

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
    alternates: {
      canonical: url,
      languages: {
        en: url,
        ta: `${url}?lang=ta`,
        "x-default": url,
      },
    },
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
        "url": `${SITE_URL}/images/logo.png`,
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <Suspense fallback={<div className="py-24 text-center text-slate-400 text-sm">Loading article...</div>}>
        <BlogPostDetailClient post={post} />
      </Suspense>
    </>
  );
}
