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
      const updated = await prisma.service.update({
        where: { id },
        data: {
          ...(body.name && { name: body.name, slug: slugify(body.name) }),
          ...(body.category && { category: body.category }),
          ...(body.metaTitle && { metaTitle: body.metaTitle }),
          ...(body.metaDescription && { metaDescription: body.metaDescription }),
          ...(body.heroTitle && { heroTitle: body.heroTitle }),
          ...(body.heroSubtitle && { heroSubtitle: body.heroSubtitle }),
          ...(body.content && { content: body.content }),
        },
      });
      return NextResponse.json({ success: true, service: updated });
    }

    return NextResponse.json({ success: true, message: "Service page updated (Fallback mode)" });
  } catch (error) {
    console.error("Service update error:", error);
    return NextResponse.json({ error: "Failed to update service page" }, { status: 500 });
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
      await prisma.service.delete({ where: { id } });
    }
    return NextResponse.json({ success: true, message: "Service page deleted" });
  } catch (error) {
    console.error("Service delete error:", error);
    return NextResponse.json({ error: "Failed to delete service page" }, { status: 500 });
  }
}
