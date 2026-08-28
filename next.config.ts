import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Remote hosts already referenced by <Image> in the existing code.
    // Without these, next/image throws "Invalid src prop" and the homepage
    // (BeforeAfterGallerySection) returns 500. Pre-existing issue — B7.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
