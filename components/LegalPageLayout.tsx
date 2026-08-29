import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export type LegalPageLayoutProps = {
  title: string;
  subtitle: string;
  /** Human-readable "last updated" label, e.g. "August 2026". */
  updated: string;
  children: ReactNode;
};

/**
 * Shared shell for the policy / legal pages. Keeps them visually consistent with
 * the rest of the site (dark PageHero + white readable body) without pulling in
 * a typography plugin.
 */
export function LegalPageLayout({ title, subtitle, updated, children }: LegalPageLayoutProps) {
  return (
    <article>
      <PageHero title={title} subtitle={subtitle} />
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Last updated: {updated}
          </p>
          <div
            className="mt-6 text-[15px] text-slate-600 leading-relaxed
              [&_h2]:text-slate-800 [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-10 [&_h2]:mb-3
              [&_h3]:text-slate-800 [&_h3]:font-semibold [&_h3]:text-base [&_h3]:mt-6 [&_h3]:mb-2
              [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6
              [&_li]:mb-1.5
              [&_a]:font-medium [&_a]:text-blue-700 hover:[&_a]:underline"
          >
            {children}
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            <p className="m-0">
              Questions about this policy? Contact us via the{" "}
              <Link href="/contact" className="font-semibold text-blue-700 hover:underline">
                contact page
              </Link>
              . See also our{" "}
              <Link href="/privacy-policy" className="font-semibold text-blue-700 hover:underline">
                Privacy Policy
              </Link>
              ,{" "}
              <Link href="/terms-and-conditions" className="font-semibold text-blue-700 hover:underline">
                Terms &amp; Conditions
              </Link>
              ,{" "}
              <Link href="/cookie-policy" className="font-semibold text-blue-700 hover:underline">
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link href="/disclaimer" className="font-semibold text-blue-700 hover:underline">
                Disclaimer
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
