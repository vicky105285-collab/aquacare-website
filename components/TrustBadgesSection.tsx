import React from "react";
import {
  Award,
  Calendar,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Factory,
  Droplets,
  Sun,
  HeartHandshake,
  MapPin,
} from "lucide-react";

export type TrustBadgeItem = {
  icon: React.ElementType;
  title: string;
  sub: string;
  color: string;
};

export const TRUST_BADGES: TrustBadgeItem[] = [
  {
    icon: Award,
    title: "12+ Years Experience",
    sub: "Serving Tamil Nadu since 2014",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Calendar,
    title: "Free Site Inspection",
    sub: "Doorstep water testing & survey",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Clock,
    title: "Same Day Service",
    sub: "Rapid response within Karur & 50km",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: ShieldCheck,
    title: "Genuine Spare Parts",
    sub: "100% original RO membranes & filters",
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: CheckCircle2,
    title: "AMC Support Available",
    sub: "Comprehensive annual maintenance",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: Factory,
    title: "Industrial RO Specialists",
    sub: "Up to 100,000 LPH plant engineering",
    color: "from-slate-700 to-slate-900",
  },
  {
    icon: Droplets,
    title: "Water Softener Experts",
    sub: "Automated ion-exchange technology",
    color: "from-cyan-600 to-teal-600",
  },
  {
    icon: Sun,
    title: "Solar Water Heater Specialists",
    sub: "ETC & FPC solar collectors",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: HeartHandshake,
    title: "Customer Satisfaction Focused",
    sub: "4.6★ Google Business rating",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: MapPin,
    title: "Karur Based Service Team",
    sub: "Central office & expert technicians",
    color: "from-cyan-500 to-blue-500",
  },
];

export function TrustBadgesSection({ className = "" }: { className?: string }) {
  return (
    <section className={`py-12 bg-slate-900 border-t border-slate-800 text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-cyan-400 font-bold text-xs uppercase tracking-widest">Why Customers Choose Us</p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
            Certified Quality & Service Guarantees
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {TRUST_BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-cyan-500/50 hover:bg-slate-800 transition-all group flex flex-col items-center text-center shadow-lg"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-white mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xs text-white leading-snug">{badge.title}</h3>
                <p className="text-[10px] text-slate-400 mt-1">{badge.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
