/** Curated gallery items — product photography doubles as installation showcase until a dedicated media library is added. */
export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  { src: "/products/aqua_shark.jpeg", alt: "Aqua Shark RO purifier installation", caption: "Residential RO — compact alkaline system" },
  { src: "/products/blue_rock.jpeg", alt: "Blue Rock RO purifier", caption: "TDS-controlled multi-stage RO" },
  { src: "/products/AQUA_ANGEL.jpeg", alt: "Aqua Angel water purifier", caption: "Premium 7-stage alkaline RO" },
  { src: "/products/AQUA_ZEBRA.jpeg", alt: "Aqua Zebra RO system", caption: "Designer cabinet RO with LED panel" },
  { src: "/products/CROWN_STAR.jpeg", alt: "Crown Star advanced RO", caption: "12-stage flagship purification" },
  { src: "/products/WATERNET_TULIPS.jpeg", alt: "Waternet Tulips stainless RO", caption: "304 stainless body — commercial-grade finish" },
  { src: "/products/waternet_whale_25L.jpeg", alt: "Whale high-capacity RO", caption: "Large-family RO + UF storage solution" },
];
