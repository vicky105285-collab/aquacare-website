import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseSessionToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Intercept /admin UI routes
  if (pathname.startsWith("/admin")) {
    const isPublicAdminRoute =
      pathname === "/admin/login" ||
      pathname === "/admin/forgot-password" ||
      pathname === "/admin/reset-password";

    const sessionCookie = request.cookies.get("yuvanthika_admin_session")?.value;
    const user = sessionCookie ? parseSessionToken(sessionCookie) : null;

    if (!user && !isPublicAdminRoute) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (user && isPublicAdminRoute) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // Intercept /api/admin routes for API protection
  if (pathname.startsWith("/api/admin")) {
    const isPublicApi =
      pathname === "/api/admin/auth/login" ||
      (pathname === "/api/admin/leads" && request.method === "POST");

    if (!isPublicApi) {
      const sessionCookie = request.cookies.get("yuvanthika_admin_session")?.value;
      const user = sessionCookie ? parseSessionToken(sessionCookie) : null;

      if (!user) {
        return NextResponse.json({ error: "Unauthorized: Invalid or missing admin session" }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
