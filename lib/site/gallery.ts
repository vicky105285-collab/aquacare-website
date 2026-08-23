/** Curated gallery items — product photography doubles as installation showcase until a dedicated media library is added. */
export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  { src: "/products/aqua_shark.webp", alt: "Aqua Shark RO purifier installation", caption: "Residential RO — compact alkaline system" },
  { src: "/products/blue_rock.webp", alt: "Blue Rock RO purifier", caption: "TDS-controlled multi-stage RO" },
  { src: "/products/AQUA_ANGEL.webp", alt: "Aqua Angel water purifier", caption: "Premium 7-stage alkaline RO" },
  { src: "/products/AQUA_ZEBRA.webp", alt: "Aqua Zebra RO system", caption: "Designer cabinet RO with LED panel" },
  { src: "/products/CROWN_STAR.webp", alt: "Crown Star advanced RO", caption: "12-stage flagship purification" },
  { src: "/products/WATERNET_TULIPS.webp", alt: "Waternet Tulips stainless RO", caption: "304 stainless body — commercial-grade finish" },
  { src: "/products/waternet_whale_25L.webp", alt: "Whale high-capacity RO", caption: "Large-family RO + UF storage solution" },
];
