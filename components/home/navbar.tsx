"use client";

import { useEffect, useState } from "react";
import { Droplets, Menu, MessageCircle, Phone, X } from "lucide-react";
import type { NavSection } from "./types";

export type NavbarProps = {
  sections: NavSection[];
  callHref: string;
  whatsappHref: string;
};

export function Navbar({ sections, callHref, whatsappHref }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-blue-900/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className={`font-bold text-sm leading-tight ${scrolled ? "text-slate-800" : "text-white"}`}>
                Aqua Care &
              </p>
              <p className={`font-bold text-sm leading-tight ${scrolled ? "text-blue-600" : "text-cyan-300"}`}>
                Solar Care Systems
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollTo(s.id)}
                className={`text-sm font-medium capitalize tracking-wide transition-colors ${
                  scrolled ? "text-slate-600 hover:text-blue-600" : "text-white/80 hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
            <a
              href={callHref}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition-all duration-200"
            >
              Call Now
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 rounded-lg ${scrolled ? "text-slate-700" : "text-white"}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-slate-100 px-4 py-4 space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              className="block w-full text-left px-4 py-3 rounded-xl text-slate-700 font-medium capitalize hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {s.label}
            </button>
          ))}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={callHref}
              className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-sm"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <a
              href={whatsappHref}
              className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-sm"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
