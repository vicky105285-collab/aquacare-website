/**
 * Future SEO articles: add entries here and implement `app/blog/[slug]/page.tsx` body.
 * Listing page reads this array.
 */
export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMinutes: number;
};

/** Empty until editorial content is published — structure is production-ready. */
export const BLOG_POSTS: BlogPostMeta[] = [];
