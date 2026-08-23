import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "General";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create destination directory
    const cleanFolder = folder.replace(/[^a-zA-Z0-9_-]/g, "");
    const uploadDir = path.join(process.cwd(), "public", "uploads", cleanFolder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const timestamp = Date.now();
    const safeName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const filePath = path.join(uploadDir, safeName);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${cleanFolder}/${safeName}`;

    // Store in Prisma if available
    let mediaRecord = null;
    if (prisma) {
      try {
        mediaRecord = await prisma.mediaLibrary.create({
          data: {
            name: file.name,
            folder: `/${cleanFolder}`,
            fileUrl: publicUrl,
            mimeType: file.type || "application/octet-stream",
            sizeBytes: file.size,
          },
        });
      } catch (err) {
        console.warn("Prisma media creation skipped:", err);
      }
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      name: file.name,
      size: file.size,
      record: mediaRecord,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
