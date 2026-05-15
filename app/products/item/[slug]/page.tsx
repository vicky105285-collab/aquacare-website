import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/ProductDetailView";
import { WHATSAPP } from "@/lib/site/constants";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/site/data";
import { slugify } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => slugify(p.name) === slug);

  if (!product) {
    return {};
  }

  const title = `Buy ${product.name} - ${product.brand} | Aqua Care Systems`;
  const description = `Get the best price on ${product.name} ${product.brand}. Features: ${product.features.slice(0, 2).join(", ")}. Free Installation & Warranty in Karur.`;

  return {
    title,
    description,
    keywords: [product.name, product.brand, "RO Water Purifier", "Karur", product.categoryId],
    openGraph: {
      title,
      description,
      images: [product.img],
    },
  };
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: slugify(product.name),
  }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  
  const product = PRODUCTS.find((p) => slugify(p.name) === slug);

  if (!product) {
    notFound();
  }

  // Find category info
  const category = PRODUCT_CATEGORIES.find(c => c.id === product.categoryId);
  const categoryTitle = category?.title || "Products";
  const categorySlug = category?.slug || "";

  // Get up to 3 related products (same category, not this product)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.categoryId === product.categoryId && p.name !== product.name
  ).slice(0, 3);

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.img,
    "description": product.features.join(" "),
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": product.price.replace(/[^0-9]/g, '') || "0",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Aqua Care Systems"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView 
        product={product} 
        relatedProducts={relatedProducts}
        categoryTitle={categoryTitle}
        categorySlug={categorySlug}
        whatsappHref={WHATSAPP}
      />
    </>
  );
}
