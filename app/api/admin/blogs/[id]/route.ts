import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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
    const { title, content, featuredImage, metaTitle, metaDescription, keywords, author, isPublished } = body;

    if (prisma) {
      const updated = await prisma.blog.update({
        where: { id },
        data: {
          ...(title && { title, slug: slugify(title) }),
          ...(content && { content }),
          // `!== undefined` so the owner can also CLEAR the featured image ("").
          ...(featuredImage !== undefined && { featuredImage }),
          ...(metaTitle && { metaTitle }),
          ...(metaDescription && { metaDescription }),
          ...(keywords && { keywords: Array.isArray(keywords) ? keywords : keywords.split(",") }),
          ...(author && { author }),
          ...(typeof isPublished === "boolean" && { isPublished }),
        },
      });
      revalidatePath("/blog");
      revalidatePath(`/blog/${updated.slug}`);
      return NextResponse.json({ success: true, post: updated });
    }

    revalidatePath("/blog");
    return NextResponse.json({ success: true, message: "Updated (Fallback mode)" });
  } catch (error) {
    console.error("Blog update error:", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
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
      await prisma.blog.delete({ where: { id } });
    }
    revalidatePath("/blog");
    return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Blog delete error:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
