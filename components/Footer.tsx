import Link from "next/link";
import { Droplets, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ADDRESS_FULL, CALL, COMPANY_NAME, EMAIL, INSTAGRAM, MAILTO_EMAIL, PHONE_DISPLAY, WHATSAPP } from "@/lib/site/constants";
import { InstagramSvg } from "@/components/InstagramSvg";
import type { FooterServiceLink } from "@/lib/site/types";

export type FooterProps = {
  serviceLinks: FooterServiceLink[];
  copyrightYear: number;
};

export function Footer({ serviceLinks, copyrightYear }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" aria-hidden />
              </div>
              <div>
                <p className="font-black text-white text-sm">{COMPANY_NAME}</p>
                <p className="text-cyan-400 text-xs">Karur, Tamil Nadu</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Your trusted partner for pure water, clean energy, and reliable home appliance services across Karur and
              surrounding districts since 2012.
            </p>
            <p className="mt-3 text-cyan-500 text-xs">தூய்மையான நீர் · சுத்தமான ஆற்றல் · நம்பகமான சேவை</p>
            <div className="flex gap-3 mt-5">
              <a
                href={CALL}
                className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-4 h-4 text-white" />
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center hover:bg-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-white" />
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Instagram"
              >
                <InstagramSvg className="w-4 h-4 text-white" />
              </a>
              <a
                href={MAILTO_EMAIL}
                className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center hover:bg-slate-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          <nav aria-label="Services">
            <h2 className="text-white font-bold mb-4">Services</h2>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="hover:text-cyan-400 transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-white font-bold mb-4">Contact</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <Phone className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" aria-hidden />
                {PHONE_DISPLAY}
              </li>
              <li className="flex gap-2">
                <MessageCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" aria-hidden />
                WhatsApp: {PHONE_DISPLAY}
              </li>
              <li className="flex gap-2">
                <InstagramSvg className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                @ananthaquacareindia
              </li>
              <li className="flex gap-2">
                <Mail className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" aria-hidden />
                {EMAIL}
              </li>
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" aria-hidden />
                {ADDRESS_FULL}
              </li>
            </ul>
            <div className="mt-6 p-4 bg-slate-800 rounded-2xl">
              <p className="text-white font-bold text-sm">Service Areas</p>
              <p className="text-xs mt-1 leading-relaxed">
                Karur · Kulithalai · Aravakurichi · Krishnarayapuram · Pugalur · Tiruchirappalli
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>
            © {copyrightYear} {COMPANY_NAME}, Karur. All rights reserved.
          </p>
          <p className="text-slate-600">Made with care in Tamil Nadu, India</p>
        </div>
      </div>
    </footer>
  );
}
