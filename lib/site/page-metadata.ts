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

  return {
    title: `${opts.title} | ${SITE_NAME}`,
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
      title: `${opts.title} | ${SITE_NAME}`,
      description: opts.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${opts.title} | ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${opts.title} | ${SITE_NAME}`,
      description: opts.description,
      images: [imageUrl],
    },
  };
}
