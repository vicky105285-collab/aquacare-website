import Link from "next/link";
import { Droplets, Mail, MapPin, MessageCircle, Phone, User, ShieldCheck } from "lucide-react";
import { ADDRESS_FULL, BUSINESS_HISTORY_NOTE, BUSINESS_OWNER, CALL, COMPANY_NAME, DEVELOPER_CREDIT, EMAIL, INSTAGRAM, MAILTO_EMAIL, PHONE_DISPLAY, WHATSAPP } from "@/lib/site/constants";
import { InstagramSvg } from "@/components/InstagramSvg";
import type { FooterServiceLink } from "@/lib/site/types";

export type FooterProps = {
  serviceLinks?: FooterServiceLink[];
  copyrightYear: number;
};

export function Footer({ copyrightYear }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Droplets className="w-5 h-5 text-white" aria-hidden />
              </div>
              <div>
                <p className="font-black text-white text-sm leading-snug">{COMPANY_NAME}</p>
                <p className="text-cyan-400 text-xs">Karur & Entire Tamil Nadu</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Trusted residential, commercial, and industrial water treatment & solar solutions provider.
            </p>
            <div className="mt-3 p-3 bg-slate-800/80 border border-slate-700/60 rounded-xl">
              <p className="text-cyan-300 font-medium text-xs">
                🛡️ {BUSINESS_HISTORY_NOTE}
              </p>
            </div>
            <p className="mt-3 text-cyan-400 text-xs">தூய்மையான நீர் · சுத்தமான ஆற்றல் · நம்பகமான சேவை</p>
            <div className="flex gap-3 mt-5">
              <a
                href={CALL}
                className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-colors shadow-md"
                aria-label="Call us"
              >
                <Phone className="w-4 h-4 text-white" />
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center hover:bg-green-500 transition-colors shadow-md"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-white" />
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center hover:opacity-90 transition-opacity shadow-md"
                aria-label="Instagram"
              >
                <InstagramSvg className="w-4 h-4 text-white" />
              </a>
              <a
                href={MAILTO_EMAIL}
                className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center hover:bg-slate-600 transition-colors shadow-md"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          <nav aria-label="Residential & Commercial Services">
            <h2 className="text-white font-bold mb-4 text-sm tracking-wider uppercase">Residential & Commercial</h2>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services/ro-water-purifier" className="hover:text-cyan-400">RO Water Purifiers</Link></li>
              <li><Link href="/services/ro-service" className="hover:text-cyan-400">RO Service & Repair</Link></li>
              <li><Link href="/services/ro-amc" className="hover:text-cyan-400">RO AMC Maintenance</Link></li>
              <li><Link href="/services/water-softener" className="hover:text-cyan-400">Water Softeners</Link></li>
              <li><Link href="/services/solar-water-heater" className="hover:text-cyan-400">Solar Water Heaters</Link></li>
              <li><Link href="/services/commercial-ro-plant" className="hover:text-cyan-400">Commercial RO Plants</Link></li>
              <li><Link href="/services/ups-battery-replacement" className="hover:text-cyan-400">UPS & Inverter Service</Link></li>
              <li><Link href="/services/washing-machine-service" className="hover:text-cyan-400">Washing Machine Repair</Link></li>
              <li><Link href="/services/refrigerator-service" className="hover:text-cyan-400">Refrigerator Service</Link></li>
            </ul>
          </nav>

          <nav aria-label="Industrial Solutions & Links">
            <h2 className="text-white font-bold mb-4 text-sm tracking-wider uppercase">Industrial & Quick Links</h2>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services/industrial-ro-plant" className="hover:text-cyan-400">Industrial RO Plants</Link></li>
              <li><Link href="/services/etp-plant" className="hover:text-cyan-400">Effluent Treatment (ETP)</Link></li>
              <li><Link href="/services/stp-plant" className="hover:text-cyan-400">Sewage Treatment (STP)</Link></li>
              <li><Link href="/services/dm-plant" className="hover:text-cyan-400">Demineralization (DM)</Link></li>
              <li><Link href="/services/operation-and-maintenance-services" className="hover:text-cyan-400">O&M Operations</Link></li>
              <li><Link href="/projects" className="hover:text-cyan-400">Projects Showcase</Link></li>
              <li><Link href="/blog" className="hover:text-cyan-400">SEO Knowledge Hub / Blog</Link></li>
              <li><Link href="/about" className="hover:text-cyan-400">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-400">Contact Us</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="text-white font-bold mb-4 text-sm tracking-wider uppercase">Headquarters</h2>
            <ul className="space-y-3 text-xs">
              <li className="flex gap-2">
                <Phone className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" aria-hidden />
                {PHONE_DISPLAY}
              </li>
              <li className="flex gap-2">
                <MessageCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" aria-hidden />
                WhatsApp: {PHONE_DISPLAY}
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
            <div className="mt-5 p-3.5 bg-slate-800 rounded-xl border border-slate-700/80">
              <p className="text-white font-bold text-xs">Service Coverage</p>
              <p className="text-[11px] mt-1 leading-normal text-slate-400">
                Karur · Namakkal · Erode · Tiruchirappalli · Salem · Dindigul · Tiruppur · Coimbatore · Madurai · Thanjavur
              </p>
            </div>
          </div>
        </div>

        {/* Ownership & Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center md:text-left font-medium">
            © {copyrightYear} {COMPANY_NAME}. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Owned & Operated by <strong className="text-cyan-400 font-bold">{BUSINESS_OWNER}</strong>
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <User className="w-3.5 h-3.5 text-blue-400" />
              Developed & Engineered by <strong className="text-blue-400 font-bold">{DEVELOPER_CREDIT}</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

