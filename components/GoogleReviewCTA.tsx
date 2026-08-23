import React from "react";
import { Star, ExternalLink, MessageSquareHeart } from "lucide-react";
import { COMPANY_NAME, GOOGLE_REVIEW_URL, MAPS_DIRECTIONS_URL } from "@/lib/site/constants";

export type GoogleReviewCTAProps = {
  variant?: "full" | "compact" | "card";
  className?: string;
};

export function GoogleReviewCTA({ variant = "full", className = "" }: GoogleReviewCTAProps) {
  if (variant === "compact") {
    return (
      <div className={`p-4 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-slate-900 border border-amber-500/30 rounded-2xl ${className}`}>
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-white">4.9 / 5.0 Star Rating</span>
          </div>

          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md"
          >
            <Star className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
            <span>Review Us On Google</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className={`py-12 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-y border-slate-800 text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-900/80 p-8 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-md">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <MessageSquareHeart className="w-4 h-4 text-amber-400" /> Customer Satisfaction Focus
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Had a Great Experience with {COMPANY_NAME}?
            </h3>
            
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Your feedback helps families and commercial facilities across Karur, Namakkal, and Tamil Nadu choose reliable water & solar systems.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white text-sm">4.9 / 5.0 Star Rated on Google Business</span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-xs text-slate-400 font-medium">Over 340+ Verified Reviews</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm shadow-xl hover:from-amber-400 hover:to-orange-400 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Star className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>Leave a Review</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all"
            >
              <span>Read Customer Reviews</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
