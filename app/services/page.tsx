import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/site/page-metadata";
import { SERVICES } from "@/lib/site/data";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "RO water purifiers, solar systems, AMC, water softeners, and appliance repair — professional installation and service across Karur, Tamil Nadu.",
  path: "/services",
  keywords: ["RO service Karur", "solar installation", "water softener", "AMC plans"],
});

export default function ServicesIndexPage() {
  return (
    <article>
      <PageHero
        title="Our services"
        subtitle="End-to-end solutions for pure drinking water, renewable energy, and dependable home appliances — delivered by trained Karur-based technicians."
        tamilLine="முழுமையான வீட்டு நீர் மற்றும் ஆற்றல் தீர்வுகள்."
      />
      <section className="py-16 lg:py-20 bg-slate-50" aria-labelledby="list-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="list-heading" className="sr-only">
            Service categories
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-cyan-200 hover:shadow-xl hover:-translate-y-0.5"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-lg transition-transform group-hover:scale-110`}
                >
                  <s.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{s.title}</h3>
                <p className="mt-1 text-xs font-medium text-cyan-600" lang="ta">
                  {s.tamil}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                  View details <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
