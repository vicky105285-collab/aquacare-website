import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FreeWaterTestingSection } from "@/components/FreeWaterTestingSection";
import { GoogleReviewCTA } from "@/components/GoogleReviewCTA";
import { TrustBadgesSection } from "@/components/TrustBadgesSection";
import { CTASection } from "@/components/CTASection";
import type { LandingPageData } from "@/lib/site/landing-pages";
import { buildWhatsAppUrl, CALL, PHONE_DISPLAY, SITE_URL } from "@/lib/site/constants";
import { CheckCircle2, MapPin, MessageCircle, Phone, HelpCircle, ArrowRight, ShieldCheck, Factory } from "lucide-react";

export function IndustrialLandingPage({ page }: { page: LandingPageData }) {
  const pageUrl = `${SITE_URL}/${page.slug}`;
  const wa = buildWhatsAppUrl(`Hi, I am interested in your ${page.title} for my facility.`);

  // FAQ JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  // Breadcrumb JSON-LD Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${SITE_URL}/services`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": page.title,
        "item": pageUrl,
      },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="relative">
        <PageHero
          title={page.heroHeadline}
          subtitle={page.heroSubheadline}
          tamilLine={`${page.city} மற்றும் தமிழ்நாடு தொழில்முறை நீர் சுத்திகரிப்பு தீர்வுகள்.`}
        />
        <div className="absolute top-0 left-0 right-0">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: pageUrl, label: page.title },
            ]}
          />
        </div>
      </div>

      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {page.contentSections.map((sec, idx) => (
                <div key={idx} className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 pb-2 border-b border-slate-200 flex items-center gap-2">
                    <Factory className="w-6 h-6 text-cyan-600 shrink-0" />
                    <span>{sec.heading}</span>
                  </h2>
                  {sec.body.map((p, pIdx) => (
                    <p key={pIdx} className="text-slate-700 text-base leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              ))}

              {/* Technical Specifications Table */}
              {page.specifications && (
                <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" /> Engineering Specifications
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    {page.specifications.map((spec, i) => (
                      <div key={i} className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                        <span className="text-slate-400 block font-medium uppercase tracking-wider">{spec.key}</span>
                        <span className="text-white font-bold text-sm mt-0.5 block">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project References */}
              {page.projectReferences && page.projectReferences.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-slate-900">Proven Field Installations & Results</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {page.projectReferences.map((proj, pIdx) => (
                      <div key={pIdx} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-semibold text-blue-600 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> {proj.location}
                          </span>
                          <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-md text-[10px]">
                            {proj.capacity}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-base">{proj.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{proj.result}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Section */}
              <div className="space-y-6 pt-6">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-cyan-600" /> Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {page.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                      <h4 className="font-bold text-slate-900 text-base flex items-start gap-2">
                        <span className="text-cyan-600">Q:</span> {faq.question}
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="space-y-8">
              <div className="sticky top-24 bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
                <div className="space-y-2">
                  <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider">Fast Response</span>
                  <h3 className="text-xl font-black text-white">Need an Instant Estimate?</h3>
                  <p className="text-xs text-slate-300">
                    Connect with our lead water treatment engineers for a site survey or quotation.
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 bg-green-500 hover:bg-green-400 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp Consultation
                  </a>

                  <a
                    href={CALL}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <Phone className="w-4 h-4" /> Call {PHONE_DISPLAY}
                  </a>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Free Doorstep Water Testing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Same-Day Technician Visit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>100% Genuine Spare Parts</span>
                  </div>
                </div>
              </div>

              {/* Service Areas Box */}
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Target Service Coverage</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Karur · Namakkal · Erode · Tiruchirappalli · Salem · Dindigul · Tiruppur · Coimbatore · Madurai · Thanjavur
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-xs font-bold text-blue-600 hover:underline pt-1"
                >
                  View full location desk <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <TrustBadgesSection />
      <FreeWaterTestingSection />
      <GoogleReviewCTA />
      <CTASection
        callHref={CALL}
        whatsappHref={wa}
        headline={`Ready to Upgrade Your Water Systems in ${page.city}?`}
        subheadline="Talk directly with our lead water engineers for doorstep service and instant estimates."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
