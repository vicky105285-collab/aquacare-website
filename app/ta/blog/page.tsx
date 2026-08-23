import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { BlogListClient } from "@/components/BlogListClient";
import { CALL, COMPANY_NAME, PHONE_DISPLAY, WHATSAPP, SITE_URL } from "@/lib/site/constants";
import { getDynamicBlogPosts } from "@/lib/site/blog";

export const revalidate = 0;

export const metadata: Metadata = {
  title: `தமிழ் நீர் சுத்திகரிப்பு & சோலார் வழிகாட்டிகள் | ${COMPANY_NAME}`,
  description: `ஆர்.ஓ பராமரிப்பு, வாட்டர் சாப்ட்னர், சோலார் வாட்டர் ஹீட்டர் மற்றும் தொழில்முறை நீர் சுத்திகரிப்பு பற்றிய தமிழ் வழிகாட்டிகள் - ${COMPANY_NAME}.`,
  alternates: {
    canonical: `${SITE_URL}/ta/blog`,
    languages: {
      "en-IN": `${SITE_URL}/blog`,
      "ta-IN": `${SITE_URL}/ta/blog`,
      "x-default": `${SITE_URL}/blog`,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/ta/blog`,
    title: `தமிழ் நீர் சுத்திகரிப்பு & சோலார் வழிகாட்டிகள் | ${COMPANY_NAME}`,
    description: `ஆர்.ஓ பராமரிப்பு மற்றும் தொழில்முறை நீர் சுத்திகரிப்பு பற்றிய தமிழ் வழிகாட்டிகள்.`,
    siteName: COMPANY_NAME,
  },
};

export default async function TamilBlogIndexPage() {
  const posts = await getDynamicBlogPosts();
  return (
    <article>
      <PageHero
        title="நீர் மற்றும் சோலார் தொழில்நுட்ப தமிழ் வழிகாட்டிகள்"
        subtitle="கரூர் மற்றும் தமிழ்நாடு வீடுகள், தொழிற்சாலைகளுக்கான செயல்முறை நீர் சுத்திகரிப்பு மற்றும் பராமரிப்பு குறிப்புகள்."
        tamilLine="யுவந்திகா பொறியாளர்களின் தொழில்முறை தமிழ் கட்டுரைகள்."
      />

      <Suspense fallback={<div className="py-20 text-center text-slate-400 text-sm">கட்டுரைகள் ஏற்றப்படுகின்றன...</div>}>
        <BlogListClient posts={posts} companyName={COMPANY_NAME} initialLang="ta" />
      </Suspense>

      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="உங்கள் நீர் சுத்திகரிப்பு அமைப்பில் சந்தேகம் உள்ளதா?"
        subheadline="கரூரில் உள்ள எங்கள் தலைமை பொறியாளரிடம் இலவச ஆலோசனை பெற இன்றே அழைக்கவும்."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
