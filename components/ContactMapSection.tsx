import { ArrowRight, MapPin } from "lucide-react";
import { ADDRESS_FULL, COMPANY_NAME, MAPS_DIRECTIONS_URL, MAPS_EMBED_URL } from "@/lib/site/constants";

export function ContactMapSection() {
  return (
    <section className="bg-white py-16 lg:py-20 border-t border-slate-100" aria-labelledby="map-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-cyan-600 font-semibold text-sm tracking-widest uppercase mb-2">Location</p>
          <h2 id="map-heading" className="text-2xl sm:text-3xl font-black text-slate-800">
            Visit our Karur office
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed flex items-start justify-center gap-2 text-left sm:text-center">
            <MapPin className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5 sm:mt-0" aria-hidden />
            <span>{ADDRESS_FULL}</span>
          </p>
        </div>

        <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg aspect-[4/3] sm:aspect-[21/9] min-h-[240px] sm:min-h-[320px]">
          <iframe
            title={`${COMPANY_NAME} on Google Maps`}
            src={MAPS_EMBED_URL}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            Get Directions
            <ArrowRight className="w-4 h-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
