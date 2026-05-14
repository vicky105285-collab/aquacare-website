import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { CALL, PHONE_DISPLAY, WHATSAPP } from "@/lib/site/constants";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "About us",
  description:
    "Since 2012, Aqua Care & Solar Care Systems has delivered RO, solar, and appliance services across Karur with certified technicians and genuine parts.",
  path: "/about",
  keywords: ["Aqua Care Karur", "solar company Karur", "water purifier dealer"],
});

export default function AboutPage() {
  return (
    <article>
      <PageHero
        title="About Aqua Care & Solar Care Systems"
        subtitle="A Karur-rooted team focused on safe drinking water, efficient solar adoption, and stress-free appliance care."
        tamilLine="2012 முதல் நம்பிக்கையுடன் சேவை."
      />
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-base text-slate-600 leading-relaxed">
          <p className="text-slate-600 leading-relaxed">
            We started as a specialist service desk for residential RO systems and grew alongside our customers into solar
            water heating, rooftop PV, and full-spectrum home appliance support. Our operating philosophy is simple:
            diagnose honestly, quote transparently, and finish jobs to a checklist — not a shortcut.
          </p>
          <p className="text-slate-600 leading-relaxed mt-6">
            Every technician is trained on electrical safety, manufacturer service practices, and respectful on-site
            conduct. Spares are sourced through verified channels so warranties and performance stay intact.
          </p>
          <p className="text-slate-600 leading-relaxed mt-6" lang="ta">
            கரூர் மற்றும் அருகிலுள்ள பகுதிகளில் வாடிக்கையாளர்களின் நம்பிக்கையைப் பெற்றதே எங்கள் முன்னேற்றத்தின் அடித்தளம்.
          </p>
        </div>
        <div className="max-w-5xl mx-auto mt-16 grid sm:grid-cols-3 gap-6 px-4">
          {[
            { k: "12+", l: "Years in operation" },
            { k: "8,500+", l: "Households served" },
            { k: "15,000+", l: "Completed jobs" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center shadow-sm">
              <p className="text-3xl font-black text-blue-700">{s.k}</p>
              <p className="mt-2 text-sm font-medium text-slate-600">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto mt-12 text-center px-4">
          <Link href="/services" className="text-blue-700 font-semibold hover:underline underline-offset-4">
            Explore our services →
          </Link>
        </div>
      </section>
      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Talk to our Karur desk"
        subheadline="Whether you are upgrading an RO, adding solar, or fixing an appliance — we will guide you without pressure."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
