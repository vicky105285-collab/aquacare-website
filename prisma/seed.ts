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
  // INSERT for new articles; for articles already in the CMS, only BACKFILL the
  // metadata columns that are still null (category / readTime / authorRole).
  // Never touches title / content / image / keywords on an existing row, so a
  // later Admin edit is safe.
  let created = 0;
  let backfilled = 0;
  let untouched = 0;
  for (const post of BLOG_POSTS) {
    try {
      const meta = {
        category: post.category ?? null,
        readTime: post.readTime ?? null,
        authorRole: post.authorRole ?? null,
      };
      const existing = await prisma.blog.findUnique({
        where: { slug: post.slug },
        select: { id: true, category: true, readTime: true, authorRole: true },
      });
      if (existing) {
        const patch: Record<string, string> = {};
        if (!existing.category && meta.category) patch.category = meta.category;
        if (!existing.readTime && meta.readTime) patch.readTime = meta.readTime;
        if (!existing.authorRole && meta.authorRole) patch.authorRole = meta.authorRole;
        if (Object.keys(patch).length) {
          await prisma.blog.update({ where: { id: existing.id }, data: patch });
          backfilled++;
        } else {
          untouched++;
        }
        continue;
      }
      await prisma.blog.create({
        data: {
          slug: post.slug,
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
          ...meta,
          publishDate: post.publishedAt ? new Date(post.publishedAt) : new Date(),
          isPublished: true,
        },
      });
      created++;
    } catch (e) {
      console.warn(`  ! blog "${post.slug}" skipped:`, (e as Error).message);
    }
  }
  console.log(
    `Blogs: ${created} created, ${backfilled} metadata-backfilled, ${untouched} unchanged (${BLOG_POSTS.length} total)`
  );
}

async function seedBootstrapAdmin() {
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;
  if (!email || !password) {
    console.log("Admin bootstrap: skipped (ADMIN_BOOTSTRAP_EMAIL / ADMIN_BOOTSTRAP_PASSWORD not set)");
    return;
  }
  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (existing) {
    console.log(`Admin bootstrap: ${email} already exists — left unchanged.`);
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { email, name: "Yuvanthika Super Admin", password: passwordHash, role: "SUPER_ADMIN" },
  });
  console.log(`Admin bootstrap: created ${email} (SUPER_ADMIN).`);
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
