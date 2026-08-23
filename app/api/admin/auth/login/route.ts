import { NextResponse } from "next/server";
import { verifyPassword, createSessionToken, getSessionCookieOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

// Primary Master Admin Emails
const MASTER_ADMIN_EMAILS = [
  "admin@yuvanthikaaquasolar.in",
  "aquacareindia1@gmail.com",
];

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    let sessionUser: { id: string; email: string; name: string; role: "SUPER_ADMIN" | "ADMIN" } | null = null;

    // 1. Direct Master Admin Login Check (Guarantees access with master passwords)
    if (MASTER_ADMIN_EMAILS.includes(cleanEmail)) {
      const isMasterPassword =
        password === "admin123" ||
        password === "Admin@Yuvanthika2026!" ||
        password === "admin" ||
        password === "123456";

      if (isMasterPassword) {
        sessionUser = {
          id: "super-admin-master-01",
          email: cleanEmail,
          name: "Yuvanthika Super Admin",
          role: "SUPER_ADMIN",
        };
      }
    }

    // 2. Query Prisma Database if Master check did not match
    if (!sessionUser && prisma) {
      try {
        const dbUser = await prisma.user.findUnique({ where: { email: cleanEmail } });
        if (dbUser && dbUser.password) {
          const isValid = await verifyPassword(password, dbUser.password);
          if (isValid) {
            sessionUser = {
              id: dbUser.id,
              email: dbUser.email,
              name: dbUser.name,
              role: dbUser.role as "SUPER_ADMIN" | "ADMIN",
            };
          }
        }
      } catch (err) {
        console.warn("DB Auth lookup error:", err);
      }
    }

    if (!sessionUser) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = createSessionToken(sessionUser);
    const cookieOpts = getSessionCookieOptions();

    const response = NextResponse.json({ success: true, user: sessionUser });
    response.cookies.set(cookieOpts.name, token, cookieOpts);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "An unexpected error occurred during login" }, { status: 500 });
  }
}
