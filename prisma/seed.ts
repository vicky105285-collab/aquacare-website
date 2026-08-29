/**
 * Idempotent production seed for Yuvanthika Aquacare CMS.
 *
 * Safe to run repeatedly: every write is an upsert keyed on a unique column,
 * so it never duplicates rows and never deletes anything.
 *
 * Run once, after `prisma migrate deploy`, with DATABASE_URL pointing at the
 * target database:
 *
 *   npx prisma db seed
 *
 * What it does:
 *  1. Blog  — upserts ALL static articles from lib/site/blog.ts by slug.
 *     (The public /blog list is all-or-nothing: it shows DB posts only when
 *     the Blog table is non-empty, otherwise the static list. Seeding every
 *     post keeps /blog identical while making each one editable in Admin.)
 *  2. User  — OPTIONAL first admin. Only runs when BOTH env vars are present:
 *       ADMIN_BOOTSTRAP_EMAIL      e.g. admin@yuvanthikaaquasolar.in
 *       ADMIN_BOOTSTRAP_PASSWORD   (used once to create the hash, never stored)
 *     The password is bcrypt-hashed before storage and never printed.
 *
 * Products / Projects / Gallery / Services / Testimonials are intentionally
 * NOT seeded: their readers already fall back to vetted static data when the
 * table is empty, so the live site is unchanged. Add those via Admin as needed.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { BLOG_POSTS } from "../lib/site/blog";

const prisma = new PrismaClient();

async function seedBlogs() {
  let ok = 0;
  for (const post of BLOG_POSTS) {
    try {
      const data = {
        title: post.title,
        title_ta: post.title_ta ?? post.titleTa ?? null,
        featuredImage: post.image || null,
        content: post.content ?? "",
        content_ta: post.content_ta ?? post.contentTa ?? null,
        excerpt_ta: post.excerpt_ta ?? post.descriptionTa ?? null,
        metaTitle: post.title,
        metaDescription: post.description ?? null,
        keywords: Array.isArray(post.keywords) ? post.keywords : [],
        author: post.author || "Yuvanthika Water Expert",
        publishDate: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        isPublished: true,
      };
      await prisma.blog.upsert({
        where: { slug: post.slug },
        update: data,
        create: { slug: post.slug, ...data },
      });
      ok++;
    } catch (e) {
      console.warn(`  ! blog "${post.slug}" skipped:`, (e as Error).message);
    }
  }
  console.log(`Blogs upserted: ${ok}/${BLOG_POSTS.length}`);
}

async function seedBootstrapAdmin() {
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;
  if (!email || !password) {
    console.log("Admin bootstrap: skipped (ADMIN_BOOTSTRAP_EMAIL / ADMIN_BOOTSTRAP_PASSWORD not set)");
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: { password: passwordHash, role: "SUPER_ADMIN" },
    create: { email, name: "Yuvanthika Super Admin", password: passwordHash, role: "SUPER_ADMIN" },
  });
  console.log(`Admin bootstrap: user ${email} is ready (SUPER_ADMIN).`);
}

async function main() {
  await seedBlogs();
  await seedBootstrapAdmin();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
