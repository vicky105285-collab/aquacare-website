import { NextResponse } from "next/server";
import { getSession, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden: Super Admin access required" }, { status: 403 });
  }

  if (prisma) {
    try {
      const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, createdAt: true },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(users);
    } catch (e) {
      console.warn("DB user query error:", e);
    }
  }

  return NextResponse.json([
    {
      id: "admin-super-01",
      name: "Yuvanthika Super Admin",
      email: "admin@yuvanthikaaquasolar.in",
      role: "SUPER_ADMIN",
      createdAt: new Date().toISOString(),
    },
    {
      id: "admin-02",
      name: "Karur Store Manager",
      email: "aquacareindia1@gmail.com",
      role: "ADMIN",
      createdAt: new Date().toISOString(),
    },
  ]);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden: Only Super Admin can create users" }, { status: 403 });
  }

  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    if (prisma) {
      const created = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: role === "SUPER_ADMIN" ? "SUPER_ADMIN" : "ADMIN",
        },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      });
      return NextResponse.json({ success: true, user: created });
    }

    return NextResponse.json({
      success: true,
      message: "User created (Fallback mode)",
      user: { name, email, role: role || "ADMIN" },
    });
  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
