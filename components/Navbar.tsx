"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Droplets, Menu, MessageCircle, Phone, X } from "lucide-react";
import { CALL, WHATSAPP } from "@/lib/site/constants";
import { MAIN_NAV } from "@/lib/site/navigation";

function navLinkActive(pathname: string, href: string, match: "exact" | "prefix" | undefined) {
  if (href === "/") return pathname === "/";
  if (match === "prefix") return pathname === href || pathname.startsWith(`${href}/`);
  return pathname === href;
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    const id = requestAnimationFrame(() => onScroll());
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  const solidNav = !isHome || scrolled;
  const navMuted = solidNav ? "text-slate-600 hover:text-blue-600" : "text-white/80 hover:text-white";
  const logoLine1 = solidNav ? "text-slate-800" : "text-white";
  const logoLine2 = solidNav ? "text-blue-600" : "text-cyan-300";
  const menuBtn = solidNav ? "text-slate-700" : "text-white";

  return (
    <header>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solidNav ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-blue-900/10" : "bg-transparent"
        }`}
        aria-label="Primary"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Droplets className="w-5 h-5 text-white" aria-hidden />
              </div>
              <div>
                <p className={`font-bold text-sm leading-tight ${logoLine1}`}>Aqua Care &</p>
                <p className={`font-bold text-sm leading-tight ${logoLine2}`}>Solar Care Systems</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {MAIN_NAV.map((item) => {
                const active = navLinkActive(pathname, item.href, item.activeMatch);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch
                    className={`relative px-3 py-2 rounded-lg text-sm font-medium tracking-wide transition-colors ${navMuted} ${
                      active ? "text-blue-600" : ""
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    {active ? (
                      <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" />
                    ) : null}
                  </Link>
                );
              })}
              <a
                href={CALL}
                className="ml-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Call Now
              </a>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 rounded-lg ${menuBtn}`}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-slate-100 px-4 py-4 space-y-1 shadow-lg">
            {MAIN_NAV.map((item) => {
              const active = navLinkActive(pathname, item.href, item.activeMatch);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-medium capitalize transition-colors ${
                    active ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={CALL}
                className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-sm"
              >
                <Phone className="w-4 h-4" aria-hidden /> Call Now
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-sm"
              >
                <MessageCircle className="w-4 h-4" aria-hidden /> WhatsApp
              </a>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
