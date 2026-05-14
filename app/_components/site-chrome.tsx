"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Droplets,
  Phone,
  MessageCircle,
  Menu,
  X,
  Mail,
  MapPin,
} from "lucide-react";
import { CALL, INSTAGRAM, WHATSAPP } from "@/app/_lib/contact";

export function InstagramSVG({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const NAV_MAIN = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/amc", label: "AMC" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

const TESTIMONIALS_HREF = "/#testimonials";

type NavVariant = "hero" | "page";

export function SiteNav({ variant }: { variant: NavVariant }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(variant === "page");

  useEffect(() => {
    if (variant !== "hero") return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const onHero = variant === "hero";
  const solidNav = !onHero || scrolled;
  const navMuted = solidNav ? "text-slate-600 hover:text-blue-600" : "text-white/80 hover:text-white";
  const logoLine1 = solidNav ? "text-slate-800" : "text-white";
  const logoLine2 = solidNav ? "text-blue-600" : "text-cyan-300";
  const menuBtn = solidNav ? "text-slate-700" : "text-white";

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const testimonialsAction =
    pathname === "/" && onHero ? (
      <button
        type="button"
        onClick={() => scrollTo("testimonials")}
        className={`text-sm font-medium tracking-wide transition-colors capitalize ${navMuted}`}
      >
        Testimonials
      </button>
    ) : (
      <Link
        href={TESTIMONIALS_HREF}
        className={`text-sm font-medium tracking-wide transition-colors capitalize ${navMuted}`}
        onClick={() => setMenuOpen(false)}
      >
        Testimonials
      </Link>
    );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solidNav ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-blue-900/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className={`font-bold text-sm leading-tight ${logoLine1}`}>Aqua Care &</p>
              <p className={`font-bold text-sm leading-tight ${logoLine2}`}>Solar Care Systems</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_MAIN.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium capitalize tracking-wide transition-colors ${navMuted}`}
              >
                {item.label}
              </Link>
            ))}
            {testimonialsAction}
            <a
              href={CALL}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition-all duration-200"
            >
              Call Now
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 rounded-lg ${menuBtn}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-slate-100 px-4 py-4 space-y-1">
          {NAV_MAIN.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block w-full text-left px-4 py-3 rounded-xl text-slate-700 font-medium capitalize hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {pathname === "/" && onHero ? (
            <button
              type="button"
              onClick={() => scrollTo("testimonials")}
              className="block w-full text-left px-4 py-3 rounded-xl text-slate-700 font-medium capitalize hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              Testimonials
            </button>
          ) : (
            <Link
              href={TESTIMONIALS_HREF}
              className="block w-full text-left px-4 py-3 rounded-xl text-slate-700 font-medium capitalize hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Testimonials
            </Link>
          )}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={CALL}
              className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-sm"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <a
              href={WHATSAPP}
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

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-black text-white text-sm">Aqua Care & Solar Care Systems</p>
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
              >
                <Phone className="w-4 h-4 text-white" />
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center hover:bg-green-500 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-white" />
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <InstagramSVG className="w-4 h-4 text-white" />
              </a>
              <a
                href="mailto:care@aquacaresolar.in"
                className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center hover:bg-slate-600 transition-colors"
              >
                <Mail className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-cyan-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-cyan-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/amc" className="hover:text-cyan-400 transition-colors">
                  AMC
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-cyan-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-cyan-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <Phone className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                +91 85266 64424
              </li>
              <li className="flex gap-2">
                <MessageCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                WhatsApp: +91 85266 64424
              </li>
              <li className="flex gap-2">
                <InstagramSVG className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                @ananthaquacareindia
              </li>
              <li className="flex gap-2">
                <Mail className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                care@aquacaresolar.in
              </li>
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                123, Sakthi Nagar, Karur – 639 001
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
          <p>© {year} Aqua Care & Solar Care Systems, Karur. All rights reserved.</p>
          <p className="text-slate-600">Made with ❤️ in Tamil Nadu, India</p>
        </div>
      </div>
    </footer>
  );
}

export function StickyContactButtons() {
  return (
    <>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 hover:scale-110 transition-all duration-200 group"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        <span className="absolute right-16 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Chat on WhatsApp
        </span>
      </a>
      <a
        href={CALL}
        className="fixed bottom-6 right-4 z-50 w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40 hover:scale-110 transition-all duration-200 group"
        aria-label="Call"
      >
        <Phone className="w-6 h-6 text-white" />
        <span className="absolute right-16 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Call Now
        </span>
      </a>
    </>
  );
}

export function InnerPageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans antialiased bg-white text-slate-800 overflow-x-hidden min-h-screen flex flex-col">
      <SiteNav variant="page" />
      <main className="flex-1">
        <div className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900 pt-24 pb-14 px-4">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 40%)" }} />
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">{title}</h1>
            {subtitle ? <p className="mt-4 text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed">{subtitle}</p> : null}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">{children}</div>
      </main>
      <SiteFooter />
      <StickyContactButtons />
    </div>
  );
}
