import { NextResponse } from "next/server";
import { verifyPassword, createSessionToken, getSessionCookieOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  isMasterPasswordDisabled,
  verifyCustomUserLogin,
} from "@/lib/users-store";

// Primary Master Admin Emails
const MASTER_ADMIN_EMAILS = [
  "admin@yuvanthikaaquasolar.in",
  "aquacareindia1@gmail.com",
];

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Please provide both email and password" }, { status: 400 });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPassword = String(password).trim();

    let sessionUser: { id: string; email: string; name: string; role: "SUPER_ADMIN" | "ADMIN" } | null = null;

    // 1. Check Custom Added Users first
    const customUser = await verifyCustomUserLogin(cleanEmail, cleanPassword);
    if (customUser) {
      sessionUser = {
        id: customUser.id,
        email: customUser.email,
        name: customUser.name,
        role: customUser.role,
      };
    }

    // 2. Check Prisma Database if connected
    if (!sessionUser && prisma) {
      try {
        const dbUser = await prisma.user.findUnique({ where: { email: cleanEmail } });
        if (dbUser && dbUser.password) {
          const isValid = await verifyPassword(cleanPassword, dbUser.password);
          if (isValid) {
            sessionUser = {
              id: dbUser.id,
              email: dbUser.email,
              name: dbUser.name,
              role: dbUser.role as "SUPER_ADMIN" | "ADMIN",
            };
          }
        }
      } catch (dbErr) {
        console.warn("Prisma user lookup skipped:", dbErr);
      }
    }

    // 3. Check Default Master Password Fallback (Only if master password is NOT disabled)
    if (!sessionUser && !isMasterPasswordDisabled()) {
      const isMasterEmail = MASTER_ADMIN_EMAILS.includes(cleanEmail) || cleanEmail.includes("admin");
      const isMasterPassword =
        cleanPassword === "admin123" ||
        cleanPassword === "Admin@Yuvanthika2026!" ||
        cleanPassword === "admin" ||
        cleanPassword === "123456";

      if (isMasterEmail && isMasterPassword) {
        sessionUser = {
          id: "super-admin-master-01",
          email: cleanEmail,
          name: "Yuvanthika Super Admin",
          role: "SUPER_ADMIN",
        };
      }
    }

    if (!sessionUser) {
      if (isMasterPasswordDisabled()) {
        return NextResponse.json(
          { error: "Invalid email or password. Default master passwords (admin123) have been disabled for security." },
          { status: 401 }
        );
      }
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = createSessionToken(sessionUser);
    const cookieOpts = getSessionCookieOptions();

    const response = NextResponse.json({ success: true, user: sessionUser });
    response.cookies.set(cookieOpts.name, token, cookieOpts);

    return response;
  } catch (error) {
    console.error("Login route exception:", error);
    const errMessage = error instanceof Error ? error.message : "Authentication error";
    return NextResponse.json({ error: `Login error: ${errMessage}` }, { status: 500 });
  }
}
