import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { BlogListClient } from "@/components/BlogListClient";
import { CALL, COMPANY_NAME, FORMER_COMPANY_NAME, PHONE_DISPLAY, WHATSAPP } from "@/lib/site/constants";
import { getDynamicBlogPosts } from "@/lib/site/blog";
import { pageMetadata } from "@/lib/site/page-metadata";

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

      <Suspense fallback={<div className="py-20 text-center text-slate-400 text-sm">Loading articles...</div>}>
        <BlogListClient posts={posts} companyName={COMPANY_NAME} />
      </Suspense>

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
