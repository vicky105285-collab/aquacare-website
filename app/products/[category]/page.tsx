import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCatalog } from "@/components/ProductCatalog";
import { PageHero } from "@/components/PageHero";
import { WHATSAPP } from "@/lib/site/constants";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/site/data";
import { pageMetadata } from "@/lib/site/page-metadata";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryData = PRODUCT_CATEGORIES.find((c) => c.slug === category);

  if (!categoryData) {
    return {};
  }

  return pageMetadata({
    title: categoryData.title,
    description: categoryData.description,
    path: `/products/${category}`,
    keywords: [categoryData.title, "water purifiers Karur", "RO systems"],
  });
}

export async function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryData = PRODUCT_CATEGORIES.find((c) => c.slug === category);

  if (!categoryData) {
    notFound();
  }

  return (
    <article>
      <PageHero
        title={categoryData.title}
        subtitle={categoryData.description}
        tamilLine="சிறந்த தயாரிப்புகள்."
      />
      <ProductCatalog 
        items={PRODUCTS} 
        categories={PRODUCT_CATEGORIES} 
        enquiryWhatsappHref={WHATSAPP} 
        initialCategory={categoryData.id}
      />
    </article>
  );
}
