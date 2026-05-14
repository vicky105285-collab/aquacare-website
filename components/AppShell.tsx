"use client";

import { usePathname } from "next/navigation";
import { CALL, WHATSAPP } from "@/lib/site/constants";
import { FOOTER_SERVICE_LINKS } from "@/lib/site/data";
import { FloatingButtons } from "@/components/FloatingButtons";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const navKey = pathname === "/" ? "home" : "inner";

  return (
    <>
      <Navbar key={navKey} />
      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col min-w-0 pb-28 lg:pb-24 outline-none">
        {children}
      </main>
      <Footer serviceLinks={FOOTER_SERVICE_LINKS} copyrightYear={year} />
      <FloatingButtons callHref={CALL} whatsappHref={WHATSAPP} />
    </>
  );
}
