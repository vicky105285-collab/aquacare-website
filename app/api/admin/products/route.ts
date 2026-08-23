import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PRODUCTS } from "@/lib/site/data";
import { slugify } from "@/lib/utils";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (prisma) {
    try {
      const items = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (items.length > 0) return NextResponse.json(items);
    } catch (e) {
      console.warn("DB query fallback:", e);
    }
  }

  return NextResponse.json(PRODUCTS);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, brand, categoryId, image, price, mrp, liters, stages, tank, features, description, featured } = body;

    if (!name || !categoryId) {
      return NextResponse.json({ error: "Product name and category are required" }, { status: 400 });
    }

    const slug = slugify(name);

    if (prisma) {
      const created = await prisma.product.create({
        data: {
          name,
          slug,
          brand: brand || "YUVANTHIKA AQUACARE",
          categoryId,
          image: image || "/products/7-wave-krystal.webp",
          price: price || "Call for Price",
          mrp: mrp || null,
          liters: liters || null,
          stages: stages || null,
          tank: tank || null,
          features: Array.isArray(features) ? features : [],
          description: description || null,
          featured: Boolean(featured),
        },
      });
      return NextResponse.json({ success: true, product: created });
    }

    return NextResponse.json({
      success: true,
      message: "Product created (Fallback mode)",
      product: { name, slug, brand, categoryId, price, featured },
    });
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
