import type { Metadata } from "next";
import { ProductCatalog } from "@/components/ProductCatalog";
import { PageHero } from "@/components/PageHero";
import { WHATSAPP } from "@/lib/site/constants";
import { getDynamicProducts, PRODUCT_CATEGORIES } from "@/lib/site/data";
import { pageMetadata } from "@/lib/site/page-metadata";

export const revalidate = 0;

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "Premium RO purifiers and water systems from leading brands — transparent pricing, EMI options, and expert installation in Karur.",
  path: "/products",
  keywords: ["RO purifier price Karur", "Yuvanthika Aquacare RO", "alkaline water purifier"],
});

export default async function ProductsPage() {
  const products = await getDynamicProducts();
  return (
    <article>
      <PageHero
        title="Products"
        subtitle="Curated models chosen for Tamil Nadu water conditions — with genuine spares and professional commissioning."
        tamilLine="தரமான RO மற்றும் நீர் அமைப்புகள்."
      />
      <ProductCatalog items={products} categories={PRODUCT_CATEGORIES} enquiryWhatsappHref={WHATSAPP} />
    </article>
  );
}
