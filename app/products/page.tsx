import type { Metadata } from "next";
import { Products } from "@/components/Products";
import { PageHero } from "@/components/PageHero";
import { WHATSAPP } from "@/lib/site/constants";
import { PRODUCTS } from "@/lib/site/data";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "Premium RO purifiers and water systems from leading brands — transparent pricing, EMI options, and expert installation in Karur.",
  path: "/products",
  keywords: ["RO purifier price Karur", "WATERNET RO", "alkaline water purifier"],
});

export default function ProductsPage() {
  return (
    <article>
      <PageHero
        title="Products"
        subtitle="Curated models chosen for Tamil Nadu water conditions — with genuine spares and professional commissioning."
        tamilLine="தரமான RO மற்றும் நீர் அமைப்புகள்."
      />
      <Products items={PRODUCTS} enquiryWhatsappHref={WHATSAPP} />
    </article>
  );
}
