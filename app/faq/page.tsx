import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CTASection } from "@/components/CTASection";
import { pageMetadata } from "@/lib/site/page-metadata";
import { CALL, PHONE_DISPLAY, WHATSAPP } from "@/lib/site/constants";
import { FAQ_CATEGORIES, ALL_FAQS } from "@/lib/site/faqs";

export const metadata: Metadata = pageMetadata({
  title: "FAQ — RO Purifiers, Water Softeners, Water Treatment & Solar",
  description:
    "Answers to common questions about RO water purifiers, RO service & AMC, water softeners, hard borewell water, commercial and industrial water treatment, and solar water heaters in Karur and Tamil Nadu.",
  path: "/faq",
  keywords: [
    "water purifier FAQ Karur",
    "RO service questions Tamil Nadu",
    "water softener FAQ",
    "hard water Karur",
    "borewell water TDS",
  ],
});

// One combined FAQPage schema for every visible question on this page.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ALL_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        title="Frequently Asked Questions"
        subtitle="Practical answers about RO purifiers, water softeners, hard water, commercial and industrial water treatment, solar water heaters, AMC and water testing — for homes and businesses in Karur and across Tamil Nadu."
        tamilLine="RO, நீர் மென்மையாக்கி மற்றும் சூரிய சூடுநீர் குறித்த பொதுவான கேள்விகளுக்கான பதில்கள்."
      />

      <nav
        aria-label="FAQ categories"
        className="bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <ul className="flex flex-wrap gap-2">
            {FAQ_CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`#${cat.id}`}
                  className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-cyan-300 hover:text-cyan-700 transition-colors"
                >
                  {cat.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
          {FAQ_CATEGORIES.map((cat) => (
            <section key={cat.id} id={cat.id} className="scroll-mt-28">
              <h2 className="text-2xl font-black tracking-tight text-slate-800">{cat.title}</h2>
              {cat.intro ? (
                <p className="mt-2 text-slate-600 max-w-3xl leading-relaxed">{cat.intro}</p>
              ) : null}
              <div className="mt-6">
                <FaqAccordion faqs={cat.faqs} emitSchema={false} />
              </div>
            </section>
          ))}

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h2 className="text-xl font-black text-slate-800">Still need help choosing or diagnosing an issue?</h2>
            <p className="mt-2 text-slate-600 max-w-2xl mx-auto leading-relaxed">
              The right system depends on your water. Explore our{" "}
              <Link href="/services" className="font-semibold text-blue-700 hover:underline">
                services
              </Link>{" "}
              and{" "}
              <Link href="/products" className="font-semibold text-blue-700 hover:underline">
                products
              </Link>
              , see{" "}
              <Link href="/amc" className="font-semibold text-blue-700 hover:underline">
                AMC plans
              </Link>
              , or{" "}
              <Link href="/contact" className="font-semibold text-blue-700 hover:underline">
                request an on-site water test
              </Link>
              . For RO service in the Karur area, see{" "}
              <Link href="/services/ro-service-karur" className="font-semibold text-blue-700 hover:underline">
                RO service in Karur
              </Link>
              .
            </p>
          </section>
        </div>
      </div>

      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Ask us your question directly"
        subheadline="Call or message our team in Karur — we assist in Tamil and English, and can arrange a site visit and water test."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
