import type { Metadata } from "next";
import Image from "next/image";
import { PROJECTS_DATA } from "@/lib/site/projects";
import { COMPANY_NAME, FORMER_COMPANY_NAME, CALL, WHATSAPP, PHONE_DISPLAY, SITE_URL } from "@/lib/site/constants";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { MapPin, ShieldCheck, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: `Our Turnkey Projects Portfolio | ${COMPANY_NAME}`,
  description:
    `Explore successful Industrial RO Plants, ETP, STP, DM Plants, Solar Water Heaters & Water Softener projects by ${COMPANY_NAME} (${FORMER_COMPANY_NAME}) in Karur, Erode, Trichy & Tamil Nadu.`,
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
};

export default function ProjectsPortfolioPage() {
  return (
    <article className="bg-slate-50 min-h-screen">
      <div className="relative">
        <PageHero
          title="Turnkey Engineering Projects Portfolio"
          subtitle="Discover how Yuvanthika Aquacare & Solar Care Systems delivers high-recovery RO plants, ZLD ETPs, STPs, DM plants, and solar installations across Karur & Tamil Nadu."
          tamilLine="நம்பகமான நீர் மற்றும் சூரிய சக்தி திட்டங்கள்."
        />
        <div className="absolute top-0 left-0 right-0">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/projects", label: "Projects" },
            ]}
          />
        </div>
      </div>

      <section className="py-6 bg-blue-900 text-white text-center text-xs sm:text-sm font-medium">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>
            Formerly known as <strong>{FORMER_COMPANY_NAME}</strong> — 10+ Years of Engineering Trust in Tamil Nadu
          </span>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-slate-800">
            Realized Projects Showcase
          </h2>
          <p className="text-slate-600 mt-2 text-sm leading-relaxed">
            Every project follows a strict reusable engineering blueprint: detailed problem diagnostic, tailored equipment sizing, automated execution, and long-term customer testimonials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image / Gallery Display */}
              <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={project.gallery[0]?.url || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"}
                  alt={project.projectName}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {project.industry}
                </div>
                {project.completionYear && (
                  <div className="absolute top-3 right-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {project.completionYear}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {project.projectName}
                  </h3>

                  <div className="flex items-center text-slate-500 text-xs font-semibold mt-2 mb-4">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-red-500 shrink-0" />
                    {project.location}
                  </div>

                  <div className="space-y-3 text-xs mb-6">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="font-bold text-slate-900 block uppercase tracking-wider text-[10px] text-cyan-700">
                        Capacity / Sizing
                      </span>
                      <p className="text-slate-700 font-semibold text-xs mt-0.5">{project.capacity}</p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-900 block uppercase tracking-wider text-[10px] text-red-600">
                        The Challenge (Problem)
                      </span>
                      <p className="text-slate-600 mt-1 leading-relaxed">{project.problem}</p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-900 block uppercase tracking-wider text-[10px] text-green-700">
                        Engineered Solution
                      </span>
                      <p className="text-slate-600 mt-1 leading-relaxed">{project.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial Section */}
                {project.testimonial && (
                  <div className="mt-auto bg-blue-50/80 p-4 rounded-xl border border-blue-100 relative">
                    <Quote className="w-5 h-5 text-blue-300 mb-1" />
                    <p className="text-slate-700 text-xs italic leading-relaxed">
                      &ldquo;{project.testimonial.quote}&rdquo;
                    </p>
                    <p className="text-[11px] font-bold text-blue-900 mt-2">
                      — {project.testimonial.clientName}, <span className="font-normal text-slate-600">{project.testimonial.company}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Ready to start your next water or solar project?"
        subheadline="Consult with Yuvanthika Aquacare & Solar Care Systems engineers for turnkey EPC design, installation, and AMC."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}

