import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

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
      const updated = await prisma.gallery.update({
        where: { id },
        data: {
          ...(body.title && { title: body.title }),
          ...(body.category && { category: body.category }),
          ...(body.mediaUrl && { mediaUrl: body.mediaUrl }),
          ...(body.caption && { caption: body.caption }),
          ...(body.album && { album: body.album }),
        },
      });
      return NextResponse.json({ success: true, item: updated });
    }

    return NextResponse.json({ success: true, message: "Gallery item updated (Fallback mode)" });
  } catch (error) {
    console.error("Gallery update error:", error);
    return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 });
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
      await prisma.gallery.delete({ where: { id } });
    }
    return NextResponse.json({ success: true, message: "Gallery item deleted" });
  } catch (error) {
    console.error("Gallery delete error:", error);
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
  }
}
