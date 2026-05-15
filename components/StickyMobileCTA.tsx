"use client";

import { Phone, MessageCircle, ClipboardList } from "lucide-react";
import Link from "next/link";

export type StickyMobileCTAProps = {
  callHref: string;
  whatsappHref: string;
};

export function StickyMobileCTA({ callHref, whatsappHref }: StickyMobileCTAProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.12)] pb-safe">
      {/* Cyan accent line at top */}
      <div className="h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500" />
      <div className="flex items-stretch h-[68px]">
        <a
          href={callHref}
          className="flex-1 flex flex-col items-center justify-center gap-1 text-slate-600 hover:bg-slate-50 active:bg-slate-100 active:scale-95 transition-all border-r border-slate-100"
        >
          <Phone className="w-5 h-5 text-blue-600" />
          <span className="text-[10px] font-bold uppercase tracking-wide">Call Now</span>
        </a>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.2] flex flex-col items-center justify-center gap-1 bg-green-500 text-white hover:bg-green-600 active:scale-95 transition-all shadow-inner"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-[11px] font-bold uppercase tracking-wide">WhatsApp</span>
        </a>

        <Link
          href="/contact"
          className="flex-1 flex flex-col items-center justify-center gap-1 text-slate-600 hover:bg-slate-50 active:bg-slate-100 active:scale-95 transition-all border-l border-slate-100"
        >
          <ClipboardList className="w-5 h-5 text-amber-500" />
          <span className="text-[10px] font-bold uppercase tracking-wide">Get Quote</span>
        </Link>
      </div>
    </div>
  );
}

