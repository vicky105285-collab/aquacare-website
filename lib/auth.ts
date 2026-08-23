import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export type UserRole = "SUPER_ADMIN" | "ADMIN";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

const SESSION_COOKIE_NAME = "yuvanthika_admin_session";
const SECRET = process.env.ADMIN_JWT_SECRET || "yuvanthika-super-secret-key-2026-karur-tamil-nadu";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Simple tamper-proof session token serializer for serverless environments
export function createSessionToken(user: SessionUser): string {
  const payload = JSON.stringify({
    ...user,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  const encoded = Buffer.from(payload).toString("base64url");
  const signature = Buffer.from(`${encoded}.${SECRET}`).toString("hex").slice(0, 16);
  return `${encoded}.${signature}`;
}

export function parseSessionToken(token: string): SessionUser | null {
  try {
    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) return null;
    const expectedSig = Buffer.from(`${encoded}.${SECRET}`).toString("hex").slice(0, 16);
    if (signature !== expectedSig) return null;

    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    if (payload.exp && Date.now() > payload.exp) return null;

    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return parseSessionToken(token);
  } catch {
    return null;
  }
}

export function getSessionCookieOptions() {
  return {
    name: SESSION_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  };
}
