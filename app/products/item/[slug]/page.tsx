import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/ProductDetailView";
import { COMPANY_NAME, SITE_URL, WHATSAPP } from "@/lib/site/constants";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/site/data";
import { slugify } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => slugify(p.name) === slug);

  if (!product) {
    return { title: `Product Details | ${COMPANY_NAME}` };
  }

  const title = `Buy ${product.name} (${product.brand}) | ${COMPANY_NAME}`;
  const description = `Buy ${product.name} by ${product.brand} in Karur & Tamil Nadu. Key features: ${product.features.slice(0, 3).join(", ")}. Doorstep installation, genuine spares & warranty by ${COMPANY_NAME}.`;
  const canonicalUrl = `${SITE_URL}/products/item/${slug}`;

  return {
    title,
    description,
    keywords: [product.name, product.brand, "RO Water Purifier Karur", "Yuvanthika Aquacare", product.categoryId],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      siteName: COMPANY_NAME,
      images: [{ url: `${SITE_URL}${product.img}`, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}${product.img}`],
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
  const canonicalUrl = `${SITE_URL}/products/item/${slug}`;

  // Get up to 3 related products (same category, not this product)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.categoryId === product.categoryId && p.name !== product.name
  ).slice(0, 3);

  // Structured Data (JSON-LD Product & Breadcrumbs)
  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": `${SITE_URL}${product.img}`,
    "description": product.features.join(". "),
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "url": canonicalUrl,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": COMPANY_NAME
      }
    }
  };

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
        "name": product.name,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
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
