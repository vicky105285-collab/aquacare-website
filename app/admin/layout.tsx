import type { Metadata } from "next";

/**
 * Keeps the entire /admin/* subtree out of search indexes (belt-and-braces with
 * the `Disallow: /admin/` rule in app/robots.ts). Pure passthrough — the admin
 * pages render their own <AdminLayout> shell.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
