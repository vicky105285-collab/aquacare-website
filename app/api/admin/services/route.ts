import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SERVICES } from "@/lib/site/data";
import { slugify } from "@/lib/utils";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (prisma) {
    try {
      const items = await prisma.service.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (items.length > 0) return NextResponse.json(items);
    } catch (e) {
      console.warn("DB query fallback:", e);
    }
  }

  return NextResponse.json(
    SERVICES.map((s) => ({
      id: s.slug,
      name: s.title,
      slug: s.slug,
      category: "water-treatment",
      metaTitle: `${s.title} Service Karur & Tamil Nadu`,
      metaDescription: s.desc,
      keywords: [s.title, s.tamil, "Karur Service"],
      heroTitle: s.title,
      heroSubtitle: s.desc,
      content: s.desc,
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
    const { name, category, metaTitle, metaDescription, keywords, heroTitle, heroSubtitle, content } = body;

    if (!name) {
      return NextResponse.json({ error: "Service name is required" }, { status: 400 });
    }

    const slug = slugify(name);

    if (prisma) {
      const created = await prisma.service.create({
        data: {
          name,
          slug,
          category: category || "general",
          metaTitle: metaTitle || name,
          metaDescription: metaDescription || content?.slice(0, 160) || null,
          keywords: Array.isArray(keywords) ? keywords : [],
          heroTitle: heroTitle || name,
          heroSubtitle: heroSubtitle || null,
          content: content || null,
        },
      });
      return NextResponse.json({ success: true, service: created });
    }

    return NextResponse.json({
      success: true,
      message: "Service page created (Fallback mode)",
      service: { name, slug },
    });
  } catch (error) {
    console.error("Service creation error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
