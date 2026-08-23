"use client";

import Image from "next/image";

// Placeholder images for the gallery. In a real scenario, these would come from props or CMS.
const GALLERY_IMAGES = [
  "/products/aqua_shark.webp",
  "/products/blue_rock.webp",
  "/products/2dolphin.webp",
  "/products/91-aqua-grand-new.webp",
];

export function InstallationGallery() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {GALLERY_IMAGES.map((src, idx) => (
        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 group border border-slate-200">
          <Image
            src={src}
            alt={`Installation in Karur ${idx + 1}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white text-xs font-bold tracking-wider uppercase">Karur</span>
          </div>
        </div>
      ))}
    </div>
  );
}
