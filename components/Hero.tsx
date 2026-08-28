import Image from "next/image";
import { ChevronRight, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { FORMER_COMPANY_NAME } from "@/lib/site/constants";
import type { HeroFeatureCard, StatItem, TrustItem } from "@/lib/site/types";

export type HeroProps = {
  callHref: string;
  whatsappHref: string;
  stats: StatItem[];
  featureCards: HeroFeatureCard[];
  trustItems: TrustItem[];
};

export function Hero({ callHref, whatsappHref, stats, featureCards, trustItems }: HeroProps) {
  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 40%), radial-gradient(circle at 60% 80%, #0ea5e9 0%, transparent 40%)",
          }}
        />

        <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-cyan-500/10 animate-pulse motion-reduce:animate-none" />
        <div
          className="absolute bottom-20 left-10 w-60 h-60 rounded-full bg-blue-400/10 animate-pulse motion-reduce:animate-none"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-2">
                <p className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-cyan-300 text-xs sm:text-sm font-medium">
                  <MapPin className="w-4 h-4 shrink-0 text-cyan-400" aria-hidden />
                  Karur & Entire Tamil Nadu · Established 2014
                </p>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-white text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" /> Formerly {FORMER_COMPANY_NAME}
                </span>
              </div>

              <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white">
                Pure Water.
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">
                  Clean Energy.
                </span>
                <br />
                Turnkey Care.
              </h1>

              <p className="text-blue-100/90 text-base sm:text-lg leading-relaxed max-w-lg">
                Tamil Nadu&apos;s premier specialist for residential RO purifiers, commercial & industrial RO/ETP/STP plants, water softeners, and solar water heaters.
              </p>
              <p className="text-cyan-300/80 text-sm font-medium" lang="ta">
                தூய்மையான தண்ணீர் · சுத்தமான ஆற்றல் · சிறப்பான சேவை
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={callHref}
                  className="group flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl font-bold text-sm shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <Phone className="w-5 h-5" aria-hidden />
                  Call Now (Free Advice)
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden />
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-7 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-all duration-200"
                >
                  <MessageCircle className="w-5 h-5 text-green-400" aria-hidden />
                  WhatsApp Us
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {stats.map((s) => (
                  <div key={s.label} className="text-center rounded-2xl bg-white/5 border border-white/10 py-3">
                    <p className="text-2xl font-black text-white">{s.val}</p>
                    <p className="text-xs text-blue-300/70 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block space-y-4">
              <figure className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl shadow-blue-500/20 overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/products/industrial-ss-ro-water-plant.jpg"
                    alt="Stainless-steel industrial RO water plant built and installed by Yuvanthika Aquacare"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-4 py-3 text-xs font-medium text-cyan-100/80 border-t border-white/10">
                  Industrial RO plant — designed, built &amp; commissioned in-house
                </figcaption>
              </figure>

              <div className="grid grid-cols-2 gap-4">
                {featureCards.map((item, i) => (
                  <div
                    key={item.title}
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:-translate-y-0.5 transition-all duration-300"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <item.icon className="w-6 h-6 text-white" aria-hidden />
                    </div>
                    <p className="text-white font-bold">{item.title}</p>
                    <p className="text-cyan-300/70 text-sm mt-1">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 leading-[0]">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" aria-hidden>
            <path
              d="M0 80L60 72C120 64 240 48 360 42.7C480 37 600 43 720 53.3C840 64 960 80 1080 74.7C1200 69 1320 43 1380 29.3L1440 16V80H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-slate-100" aria-label="Trust badges">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 text-slate-500 text-sm font-medium">
            {trustItems.map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-blue-700">
                <item.icon className="w-5 h-5 text-cyan-500 shrink-0" aria-hidden />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

