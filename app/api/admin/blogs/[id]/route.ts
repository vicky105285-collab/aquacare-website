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
    const {
      slug, title, title_ta, excerpt_ta, content, content_ta,
      featuredImage, metaTitle, metaDescription, keywords, author, isPublished,
    } = body;

    // The edit form also edits articles that only exist as static content (their
    // list id is their slug, not a cuid). Upsert on the slug so the first save
    // creates the real DB row and later saves update it.
    const targetSlug = (slug || (id?.includes("-") ? id : "") || slugify(title || "")).trim();
    if (!targetSlug) {
      return NextResponse.json({ error: "A slug or title is required" }, { status: 400 });
    }
    const kw = keywords === undefined
      ? undefined
      : Array.isArray(keywords)
        ? keywords
        : String(keywords).split(",").map((k: string) => k.trim()).filter(Boolean);

    if (prisma) {
      const fields = {
        ...(title !== undefined && { title }),
        ...(title_ta !== undefined && { title_ta: title_ta || null }),
        ...(excerpt_ta !== undefined && { excerpt_ta: excerpt_ta || null }),
        ...(content !== undefined && { content }),
        ...(content_ta !== undefined && { content_ta: content_ta || null }),
        ...(featuredImage !== undefined && { featuredImage }),
        ...(metaTitle !== undefined && { metaTitle }),
        ...(metaDescription !== undefined && { metaDescription }),
        ...(kw !== undefined && { keywords: kw }),
        ...(author !== undefined && { author }),
        ...(typeof isPublished === "boolean" && { isPublished }),
      };
      const post = await prisma.blog.upsert({
        where: { slug: targetSlug },
        update: fields,
        create: {
          slug: targetSlug,
          title: title || targetSlug,
          content: content ?? "",
          keywords: kw ?? [],
          ...fields,
        },
      });
      revalidatePath("/blog");
      revalidatePath(`/blog/${post.slug}`);
      revalidatePath(`/ta/blog/${post.slug}`);
      return NextResponse.json({ success: true, post });
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
