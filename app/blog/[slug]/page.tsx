import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/site/blog";
import { SITE_NAME, SITE_URL } from "@/lib/site/constants";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article" };
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: post.title, description: post.description },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="bg-white">
      <header className="bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900 text-white">
        <div className="max-w-3xl mx-auto px-4 pt-28 pb-16">
          <nav aria-label="Breadcrumb" className="text-sm text-blue-200/90 mb-6">
            <Link href="/blog" className="hover:text-cyan-300">
              Blog
            </Link>
            <span className="mx-2 opacity-60">/</span>
            <span className="text-white">{post.title}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-black leading-tight">{post.title}</h1>
          <p className="mt-4 text-blue-100/90">{post.description}</p>
          <p className="mt-4 text-sm text-cyan-300/80">
            {post.date} · {post.readMinutes} min read
          </p>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-4 py-12 text-slate-600 leading-relaxed">
        <p>
          Editorial body for this article has not been published yet. Connect with our team on WhatsApp if you need
          the information urgently.
        </p>
        <Link href="/blog" className="mt-8 inline-block font-semibold text-blue-700 hover:underline">
          ← Back to blog
        </Link>
      </div>
    </article>
  );
}
