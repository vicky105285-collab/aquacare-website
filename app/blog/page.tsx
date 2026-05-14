import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { CALL, PHONE_DISPLAY, WHATSAPP } from "@/lib/site/constants";
import { BLOG_POSTS } from "@/lib/site/blog";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Expert articles on RO maintenance, solar adoption, water quality, and appliance care from Aqua Care & Solar Care Systems, Karur.",
  path: "/blog",
  keywords: ["RO maintenance tips", "solar water heater guide", "hard water Tamil Nadu"],
});

export default function BlogIndexPage() {
  return (
    <article>
      <PageHero
        title="Knowledge hub"
        subtitle="Practical guidance for Tamil Nadu homes — written by our service team from real field experience."
        tamilLine="கட்டுரைகள் விரைவில் — தற்போது தயாராக உள்ளது."
      />
      <section className="py-16 lg:py-20 bg-white" aria-labelledby="posts-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="posts-heading" className="text-2xl font-black text-slate-800">
            Articles
          </h2>
          {BLOG_POSTS.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-8 text-slate-600 leading-relaxed">
              <p>
                We are preparing SEO-first guides on RO care, solar savings, and appliance safety. If you have a topic
                you would like us to cover, message us on WhatsApp with{" "}
                <span className="font-semibold text-blue-700">“Blog idea”</span> in the first line.
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Technical editors: when articles are ready, add entries to <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs">lib/site/blog.ts</code>{" "}
                and ship the matching route under <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs">app/blog/[slug]</code>.
              </p>
            </div>
          ) : (
            <ul className="mt-8 space-y-4 list-none p-0 m-0">
              {BLOG_POSTS.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-cyan-200 hover:shadow-md"
                  >
                    <h3 className="text-lg font-bold text-slate-800">{post.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{post.description}</p>
                    <p className="mt-3 text-xs text-slate-400">
                      {post.date} · {post.readMinutes} min read
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Need advice now?"
        subheadline="Our desk answers practical questions even before an article goes live."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
