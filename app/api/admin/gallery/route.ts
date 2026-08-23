import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { GALLERY_ITEMS } from "@/lib/site/gallery";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (prisma) {
    try {
      const items = await prisma.gallery.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (items.length > 0) return NextResponse.json(items);
    } catch (e) {
      console.warn("DB query fallback:", e);
    }
  }

  return NextResponse.json(
    GALLERY_ITEMS.map((item, idx) => ({
      id: `gal-${idx}`,
      title: item.alt,
      category: "RO Installations",
      mediaType: "IMAGE",
      mediaUrl: item.src,
      caption: item.caption,
      album: "Featured Installations",
    }))
  );
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, category, mediaUrl, caption, album, mediaType } = body;

    if (!title || !mediaUrl) {
      return NextResponse.json({ error: "Title and media URL are required" }, { status: 400 });
    }

    if (prisma) {
      const item = await prisma.gallery.create({
        data: {
          title,
          category: category || "RO Installations",
          mediaType: mediaType === "VIDEO" ? "VIDEO" : "IMAGE",
          mediaUrl,
          caption: caption || null,
          album: album || null,
        },
      });
      return NextResponse.json({ success: true, item });
    }

    return NextResponse.json({
      success: true,
      message: "Gallery item added (Fallback mode)",
      item: { title, mediaUrl, category },
    });
  } catch (error) {
    console.error("Gallery creation error:", error);
    return NextResponse.json({ error: "Failed to add gallery item" }, { status: 500 });
  }
}
