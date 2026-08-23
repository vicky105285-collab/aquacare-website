import { NextResponse } from "next/server";
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

  // Fallback to static blog data
  return NextResponse.json(
    BLOG_POSTS.map((post) => ({
      id: post.slug,
      title: post.title,
      slug: post.slug,
      featuredImage: post.image,
      content: post.description,
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
    const { title, content, featuredImage, metaTitle, metaDescription, keywords, author, isPublished } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const slug = slugify(title);

    if (prisma) {
      const created = await prisma.blog.create({
        data: {
          title,
          slug,
          content,
          featuredImage: featuredImage || "/products/7-wave-krystal.webp",
          metaTitle: metaTitle || title,
          metaDescription: metaDescription || content.slice(0, 160),
          keywords: Array.isArray(keywords) ? keywords : (keywords || "").split(",").map((k: string) => k.trim()),
          author: author || session.name,
          isPublished: isPublished !== false,
        },
      });
      return NextResponse.json({ success: true, post: created });
    }

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
