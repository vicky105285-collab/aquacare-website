"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CONSENT_EVENT, CONSENT_KEY } from "@/lib/site/consent";

/**
 * Loads Google Analytics only after the visitor has accepted analytics cookies.
 * The production-only guard stays in the server layout; this component just adds
 * the consent gate on top.
 */
export function ConsentAnalytics({ gaId }: { gaId: string }) {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        setAccepted(window.localStorage.getItem(CONSENT_KEY) === "accepted");
      } catch {
        setAccepted(false);
      }
    };
    read();
    window.addEventListener(CONSENT_EVENT, read);
    return () => window.removeEventListener(CONSENT_EVENT, read);
  }, []);

  if (!accepted || !gaId) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
