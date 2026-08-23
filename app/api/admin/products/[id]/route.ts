import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    if (prisma) {
      const updated = await prisma.product.update({
        where: { id },
        data: {
          ...(body.name && { name: body.name, slug: slugify(body.name) }),
          ...(body.brand && { brand: body.brand }),
          ...(body.categoryId && { categoryId: body.categoryId }),
          ...(body.image && { image: body.image }),
          ...(body.price && { price: body.price }),
          ...(body.mrp && { mrp: body.mrp }),
          ...(body.liters && { liters: body.liters }),
          ...(body.stages && { stages: body.stages }),
          ...(body.tank && { tank: body.tank }),
          ...(body.features && { features: body.features }),
          ...(body.description && { description: body.description }),
          ...(typeof body.featured === "boolean" && { featured: body.featured }),
        },
      });
      return NextResponse.json({ success: true, product: updated });
    }

    return NextResponse.json({ success: true, message: "Product updated (Fallback mode)" });
  } catch (error) {
    console.error("Product update error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    if (prisma) {
      await prisma.product.delete({ where: { id } });
    }
    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Product delete error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
