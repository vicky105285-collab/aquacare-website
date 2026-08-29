import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { BLOG_POSTS } from "@/lib/site/blog";
import { slugify } from "@/lib/utils";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (prisma) {
    try {
      const posts = await prisma.blog.findMany({
        orderBy: { publishDate: "desc" },
      });
      if (posts.length > 0) return NextResponse.json(posts);
    } catch (e) {
      console.warn("DB query fallback:", e);
    }
  }

  // Fallback to static blog data (full fields so the Admin edit form can prefill).
  return NextResponse.json(
    BLOG_POSTS.map((post) => ({
      id: post.slug,
      title: post.title,
      title_ta: post.title_ta ?? post.titleTa ?? "",
      slug: post.slug,
      featuredImage: post.image,
      content: post.content ?? post.description ?? "",
      content_ta: post.content_ta ?? post.contentTa ?? "",
      excerpt_ta: post.excerpt_ta ?? post.descriptionTa ?? "",
      metaTitle: post.title,
      metaDescription: post.description,
      keywords: post.keywords,
      author: post.author,
      publishDate: post.publishedAt,
      isPublished: true,
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
    const { title, title_ta, excerpt_ta, content, content_ta, featuredImage, metaTitle, metaDescription, keywords, author, isPublished } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const slug = slugify(title);

    if (prisma) {
      const created = await prisma.blog.create({
        data: {
          title,
          title_ta: title_ta || null,
          excerpt_ta: excerpt_ta || null,
          slug,
          content,
          content_ta: content_ta || null,
          // Empty when the owner supplies no photo — the site shows a clean
          // placeholder (SmartImage), never a stock/irrelevant image.
          featuredImage: featuredImage || "",
          metaTitle: metaTitle || title,
          metaDescription: metaDescription || content.slice(0, 160),
          keywords: Array.isArray(keywords) ? keywords : (keywords || "").split(",").map((k: string) => k.trim()),
          author: author || session.name,
          isPublished: isPublished !== false,
        },
      });
      revalidatePath("/blog");
      revalidatePath(`/blog/${slug}`);
      return NextResponse.json({ success: true, post: created });
    }

    revalidatePath("/blog");
    return NextResponse.json({
      success: true,
      message: "Post created successfully (Fallback mode)",
      post: { title, slug, content, isPublished },
    });
  } catch (error) {
    console.error("Blog creation error:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
