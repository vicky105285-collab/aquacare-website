import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { deleteCustomUser } from "@/lib/users-store";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden: Only Super Admin can delete users" }, { status: 403 });
  }

  try {
    const { id } = await params;

    // Delete from runtime store
    deleteCustomUser(id);

    // Delete from Prisma DB if connected
    if (prisma) {
      try {
        await prisma.user.delete({ where: { id } });
      } catch (dbErr) {
        console.warn("DB user delete skipped or not found:", dbErr);
      }
    }

    return NextResponse.json({ success: true, message: "Admin user deleted successfully" });
  } catch (error) {
    console.error("User deletion error:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
