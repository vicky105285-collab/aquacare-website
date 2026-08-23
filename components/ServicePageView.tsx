import Link from "next/link";
import { CheckCircle, MessageCircle, ArrowRight, ShieldCheck, MapPin, Wrench } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { InstallationGallery } from "@/components/InstallationGallery";
import { buildWhatsAppUrl, CALL, COMPANY_NAME, FORMER_COMPANY_NAME, PHONE_DISPLAY } from "@/lib/site/constants";
import { TRUST_ITEMS } from "@/lib/site/data";
import type { ServiceDetail } from "@/lib/site/types";

function enquiryHref(serviceTitle: string) {
  const text = `Hello, I want to know more about ${serviceTitle} — ${COMPANY_NAME}.`;
  return buildWhatsAppUrl(text);
}

export type ServicePageViewProps = {
  detail: ServiceDetail;
};

export function ServicePageView({ detail }: ServicePageViewProps) {
  const wa = enquiryHref(detail.heroTitle);

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": detail.faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
    })),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="relative">
        <PageHero title={detail.heroTitle} subtitle={detail.heroSubtitle} tamilLine={detail.tamilLine} />
        <div className="absolute top-0 left-0 right-0">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: `/services/${detail.slug}`, label: detail.heroTitle },
            ]}
          />
        </div>
      </div>

      <section className="py-6 bg-blue-50/50 border-b border-slate-100" aria-label="Trust indicators">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-sm text-blue-900 font-medium">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-blue-100">
            <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" aria-hidden />
            <span>Serving since 2014 ({FORMER_COMPANY_NAME})</span>
          </div>
          {TRUST_ITEMS.slice(0, 3).map((t) => (
            <div key={t.text} className="flex items-center gap-2">
              <t.icon className="w-4 h-4 text-cyan-600 shrink-0" aria-hidden />
              <span>{t.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-20 bg-slate-50" aria-labelledby="benefits-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="benefits-heading" className="text-2xl sm:text-3xl font-black text-slate-800 text-center mb-12">
            Why customers across Karur & Tamil Nadu choose this service
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {detail.benefits.map((b) => (
              <div
                key={b.title}
                className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:border-cyan-200/80 transition-all duration-300"
              >
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-cyan-500 shrink-0 mt-0.5" aria-hidden />
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{b.title}</h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">{b.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications / Technical Features */}
      {detail.specifications && detail.specifications.length > 0 && (
        <section className="py-12 bg-white border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 text-center mb-8 flex items-center justify-center gap-2">
              <Wrench className="w-5 h-5 text-blue-600" /> Technical Specifications & Parameters
            </h2>
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="p-4 font-bold border-b border-slate-200">Specification</th>
                    <th className="p-4 font-bold border-b border-slate-200">Technical Details</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.specifications.map((s, idx) => (
                    <tr key={s.key} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      <td className="p-4 font-semibold text-slate-800 border-b border-slate-100">{s.key}</td>
                      <td className="p-4 text-slate-600 border-b border-slate-100">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      <section className="py-16 lg:py-20 bg-slate-50" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="process-heading" className="text-2xl sm:text-3xl font-black text-slate-800 text-center mb-4">
            Our 4-Step Engineering & Service Process
          </h2>
          <p className="text-center text-slate-500 max-w-2xl mx-auto mb-12">
            Transparent steps from initial inquiry to post-service warranty — fast dispatch across Tamil Nadu.
          </p>
          <ol className="grid md:grid-cols-4 gap-6 list-none p-0 m-0">
            {detail.process.map((p) => (
              <li
                key={p.step}
                className="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <span className="text-3xl font-black text-cyan-600">{p.step}</span>
                <h3 className="mt-3 font-bold text-slate-800">{p.title}</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Local SEO Coverage Highlights */}
      {detail.localSeoContent && detail.localSeoContent.length > 0 && (
        <section className="py-12 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" /> Service Coverage Areas for {detail.heroTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {detail.localSeoContent.map((loc) => (
                <div key={loc.district} className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                  <h3 className="font-bold text-cyan-300 text-lg">{loc.district}</h3>
                  <p className="text-slate-300 text-sm mt-2">{loc.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Installation Gallery */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 text-center mb-10">
            Recent Installation & Service Showcase
          </h2>
          <InstallationGallery />
          
          <div className="mt-12 text-center bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Need custom product consultation?</h3>
            <p className="text-blue-700 mb-4">Explore our complete catalog of purifiers, softeners, solar systems, and spares.</p>
            <Link 
              href="/products"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              Browse Catalog <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-slate-50" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="text-2xl sm:text-3xl font-black text-slate-800 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <FaqAccordion faqs={detail.faqs} />
        </div>
      </section>

      <CTASection
        callHref={CALL}
        whatsappHref={wa}
        headline={`Request Free Quote for ${detail.heroTitle}`}
        subheadline="Expert engineering advice, site visits, and instant estimates — Karur & all Tamil Nadu districts."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />

      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/services"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900 underline-offset-4 hover:underline"
          >
            ← View All Services
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-bold text-sm hover:bg-green-400 transition-colors shadow-lg"
          >
            <MessageCircle className="w-4 h-4" aria-hidden />
            WhatsApp Quick Enquiry
          </a>
        </div>
      </section>
    </article>
  );
}

