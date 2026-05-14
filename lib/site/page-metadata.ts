import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./constants";

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${opts.path.startsWith("/") ? opts.path : `/${opts.path}`}`;
  return {
    title: `${opts.title} | ${SITE_NAME}`,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: SITE_NAME,
      title: `${opts.title} | ${SITE_NAME}`,
      description: opts.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${opts.title} | ${SITE_NAME}`,
      description: opts.description,
    },
  };
}
