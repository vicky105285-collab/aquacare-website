"use client";

import { usePathname } from "next/navigation";
import { CALL, WHATSAPP } from "@/lib/site/constants";
import { FloatingButtons } from "@/components/FloatingButtons";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { AIChatBot } from "@/components/AIChatBot";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const navKey = pathname === "/" ? "home" : "inner";
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <>
      <Navbar key={navKey} />
      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0 outline-none">
        {children}
      </main>
      <Footer copyrightYear={year} />
      
      {/* AI Lead Assistant Floating Bot (Excludes /admin routes) */}
      {!isAdminPage && <AIChatBot />}

      {/* Desktop Floating Buttons */}
      <div className="hidden md:block">
        <FloatingButtons callHref={CALL} whatsappHref={WHATSAPP} />
      </div>

      {/* Mobile Sticky CTA */}
      <StickyMobileCTA callHref={CALL} whatsappHref={WHATSAPP} />
    </>
  );
}

