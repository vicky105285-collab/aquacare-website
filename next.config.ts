import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only the CMS media host (Cloudinary uploads). Stock / external image hosts
    // are intentionally NOT allowed — genuine photos are uploaded via the admin
    // media library; a missing photo falls back to a clean placeholder (SmartImage),
    // never a stock image.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
