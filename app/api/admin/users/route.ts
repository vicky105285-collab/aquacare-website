import { NextResponse } from "next/server";
import { getSession, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  getCustomUsers,
  addCustomUser,
  isMasterPasswordDisabled,
  setMasterPasswordDisabled,
} from "@/lib/users-store";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden: Super Admin access required" }, { status: 403 });
  }

  let dbUsers: Array<{ id: string; name: string; email: string; role: string; createdAt: Date | string }> = [];

  if (prisma) {
    try {
      dbUsers = await prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, createdAt: true },
        orderBy: { createdAt: "desc" },
      });
    } catch (e) {
      console.warn("DB user query error:", e);
    }
  }

  const defaultUsers = [
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
  ];

  const customUsers = getCustomUsers().map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt,
  }));

  // Combine unique users by email
  const allUsersMap = new Map<string, { id: string; name: string; email: string; role: string; createdAt: string }>();

  defaultUsers.forEach((u) => allUsersMap.set(u.email, u));
  dbUsers.forEach((u) =>
    allUsersMap.set(u.email, {
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: typeof u.createdAt === "string" ? u.createdAt : u.createdAt.toISOString(),
    })
  );
  customUsers.forEach((u) => allUsersMap.set(u.email, u));

  return NextResponse.json({
    users: Array.from(allUsersMap.values()),
    masterPasswordDisabled: isMasterPasswordDisabled(),
  });
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
    const body = await request.json();

    // Toggle master password action
    if (typeof body.disableMasterPassword === "boolean") {
      setMasterPasswordDisabled(body.disableMasterPassword);
      return NextResponse.json({
        success: true,
        masterPasswordDisabled: isMasterPasswordDisabled(),
        message: body.disableMasterPassword
          ? "Default master passwords (admin123) have been DISABLED for system security."
          : "Default master passwords have been re-enabled.",
      });
    }

    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const hashedPassword = await hashPassword(password);

    // Save to runtime store so user can log in immediately
    const customRecord = await addCustomUser({
      name,
      email: cleanEmail,
      passwordHash: hashedPassword,
      role: role === "SUPER_ADMIN" ? "SUPER_ADMIN" : "ADMIN",
    });

    let dbRecord = null;
    if (prisma) {
      try {
        dbRecord = await prisma.user.upsert({
          where: { email: cleanEmail },
          update: {
            name,
            password: hashedPassword,
            role: role === "SUPER_ADMIN" ? "SUPER_ADMIN" : "ADMIN",
          },
          create: {
            name,
            email: cleanEmail,
            password: hashedPassword,
            role: role === "SUPER_ADMIN" ? "SUPER_ADMIN" : "ADMIN",
          },
          select: { id: true, name: true, email: true, role: true, createdAt: true },
        });
      } catch (dbErr) {
        console.warn("DB user save skipped:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Admin user '${name}' created successfully. You can now log in with ${cleanEmail}.`,
      user: dbRecord || { id: customRecord.id, name, email: cleanEmail, role: customRecord.role, createdAt: customRecord.createdAt },
    });
  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
