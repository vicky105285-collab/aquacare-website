import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseSessionToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept /admin routes
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
