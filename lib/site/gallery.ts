/** Curated gallery items — product photography doubles as installation showcase until a dedicated media library is added. */
export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  { src: "/products/7-wave-krystal.webp", alt: "Aqua Shark RO purifier installation", caption: "Residential RO — compact alkaline system" },
  { src: "/products/86-aqua-pearl.webp", alt: "Blue Rock RO purifier", caption: "TDS-controlled multi-stage RO" },
  { src: "/products/11-water-lilly-blue.webp", alt: "Aqua Angel water purifier", caption: "Premium 7-stage alkaline RO" },
  { src: "/products/12-water-lilly-skyblue.webp", alt: "Aqua Zebra RO system", caption: "Designer cabinet RO with LED panel" },
  { src: "/products/134-blue-mount-crown-star.webp", alt: "Crown Star advanced RO", caption: "12-stage flagship purification" },
  { src: "/products/143-blue-life-tulips-plus.webp", alt: "Waternet Tulips stainless RO", caption: "304 stainless body — commercial-grade finish" },
  { src: "/products/157-25-lph-whale.webp", alt: "Whale high-capacity RO", caption: "Large-family RO + UF storage solution" },
];
