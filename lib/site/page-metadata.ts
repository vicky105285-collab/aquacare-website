import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./constants";

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${opts.path.startsWith("/") ? opts.path : `/${opts.path}`}`;
  const imageUrl = opts.image || `${SITE_URL}/images/og-image.png`;

  // The root layout applies `title.template` = "%s | SITE_NAME" to `title`.
  // Some callers already pass a brand-suffixed title, so strip a trailing
  // " | <brand>" here to avoid "Page | Brand | Brand".
  // OpenGraph / Twitter titles are NOT templated, so they carry the full form.
  const bareTitle = opts.title
    .replace(/\s*\|\s*(Yuvanthika Aquacare[^|]*|Aqua Care[^|]*)\s*$/i, "")
    .trim();
  const fullTitle = `${bareTitle} | ${SITE_NAME}`;

  return {
    title: bareTitle,
    description: opts.description,
    keywords: opts.keywords,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        ta: `${url}?lang=ta`,
        "x-default": url,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description: opts.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: opts.description,
      images: [imageUrl],
    },
  };
}
