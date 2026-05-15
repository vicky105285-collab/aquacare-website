import Link from "next/link";
import { CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { InstallationGallery } from "@/components/InstallationGallery";
import { buildWhatsAppUrl, CALL, COMPANY_NAME, PHONE_DISPLAY } from "@/lib/site/constants";
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

  return (
    <article>
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

      <section className="py-6 bg-white border-b border-slate-100" aria-label="Trust indicators">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 sm:gap-10 text-sm text-blue-800 font-medium">
          {TRUST_ITEMS.slice(0, 4).map((t) => (
            <div key={t.text} className="flex items-center gap-2">
              <t.icon className="w-5 h-5 text-cyan-500 shrink-0" aria-hidden />
              <span>{t.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-slate-50" aria-labelledby="benefits-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="benefits-heading" className="text-2xl sm:text-3xl font-black text-slate-800 text-center mb-12">
            Why customers in Karur choose this service
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

      <section className="py-16 lg:py-20 bg-white" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="process-heading" className="text-2xl sm:text-3xl font-black text-slate-800 text-center mb-4">
            Our local service process
          </h2>
          <p className="text-center text-slate-500 max-w-2xl mx-auto mb-12">
            Transparent steps from first call to sign-off — fast dispatch across Karur district.
          </p>
          <ol className="grid md:grid-cols-3 gap-6 list-none p-0 m-0">
            {detail.process.map((p) => (
              <li
                key={p.step}
                className="relative rounded-2xl border border-slate-100 bg-gradient-to-b from-slate-50 to-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <span className="text-3xl font-black text-cyan-600">{p.step}</span>
                <h3 className="mt-3 font-bold text-slate-800">{p.title}</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Installation Gallery */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 text-center mb-10">
            Recent Work in Karur
          </h2>
          <InstallationGallery />
          
          <div className="mt-12 text-center bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Need a new system?</h3>
            <p className="text-blue-700 mb-4">Browse our premium selection of water purifiers and systems.</p>
            <Link 
              href="/products"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              Explore Products <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="text-2xl sm:text-3xl font-black text-slate-800 text-center mb-10">
            Frequently asked questions
          </h2>
          <FaqAccordion faqs={detail.faqs} />
        </div>
      </section>

      <CTASection
        callHref={CALL}
        whatsappHref={wa}
        headline={`Book ${detail.heroTitle}`}
        subheadline="Free consultation and honest recommendations — Karur & nearby areas."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />

      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/services"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900 underline-offset-4 hover:underline"
          >
            ← All services
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-bold text-sm hover:bg-green-400 transition-colors shadow-lg"
          >
            <MessageCircle className="w-4 h-4" aria-hidden />
            WhatsApp enquiry
          </a>
        </div>
      </section>
    </article>
  );
}
