import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCatalog } from "@/components/ProductCatalog";
import { PageHero } from "@/components/PageHero";
import { SITE_URL, WHATSAPP } from "@/lib/site/constants";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/site/data";
import { pageMetadata } from "@/lib/site/page-metadata";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryData = PRODUCT_CATEGORIES.find((c) => c.slug === category);

  if (!categoryData) {
    return { title: "Product Category" };
  }

  return pageMetadata({
    title: categoryData.title,
    description: categoryData.description,
    path: `/products/${category}`,
    keywords: [categoryData.title, "water purifiers Karur", "RO systems Tamil Nadu"],
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

  const categoryUrl = `${SITE_URL}/products/${category}`;

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": `${SITE_URL}/products`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryData.title,
        "item": categoryUrl
      }
    ]
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
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
