"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONSENT_EVENT, CONSENT_KEY, type ConsentValue } from "@/lib/site/consent";

/**
 * Lightweight cookie banner. Shown only until the visitor makes a choice.
 * "Accept" enables Google Analytics (see ConsentAnalytics); "Decline" keeps the
 * site analytics-free. Essential cookies (consent preference, admin session) are
 * never gated by this.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Read the client-only consent store after mount (server render shows
    // nothing, so this avoids an SSR hydration mismatch).
    let show = false;
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY);
      show = stored !== "accepted" && stored !== "declined";
    } catch {
      show = true; // localStorage blocked (private mode) — ask, without persisting.
    }
    if (show) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time mount sync from localStorage
      setVisible(true);
    }
  }, []);

  const choose = (value: ConsentValue) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* ignore persistence failure */
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      /* Sit above the mobile sticky Call/WhatsApp bar (~4.75rem); flush to the
         bottom from md up, where that bar is hidden. */
      className="fixed inset-x-0 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] md:bottom-0 z-[90] p-3 sm:p-4"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-700 bg-slate-900 text-slate-200 shadow-2xl">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
          <p className="text-xs leading-relaxed sm:text-[13px]">
            We use only essential cookies to run this site. With your consent we also use Google Analytics to
            understand how the site is used. See our{" "}
            <Link href="/cookie-policy" className="font-semibold text-cyan-400 hover:underline">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="font-semibold text-cyan-400 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => choose("declined")}
              className="min-h-[44px] rounded-xl border border-slate-600 px-4 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="min-h-[44px] rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-white hover:from-cyan-400 hover:to-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
