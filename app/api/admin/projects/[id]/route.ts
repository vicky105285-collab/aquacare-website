import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    if (prisma) {
      const updated = await prisma.project.update({
        where: { id },
        data: {
          ...(body.projectTitle && {
            projectTitle: body.projectTitle,
            slug: slugify(`${body.projectTitle}-${body.district || body.location || "Karur"}`),
          }),
          ...(body.projectType && { projectType: body.projectType }),
          ...(body.location && { location: body.location }),
          ...(body.district && { district: body.district }),
          ...(body.customerCategory && { customerCategory: body.customerCategory }),
          ...(body.industryType && { industryType: body.industryType }),
          ...(body.capacity && { capacity: body.capacity }),
          ...(body.problemFaced && { problemFaced: body.problemFaced }),
          ...(body.solutionProvided && { solutionProvided: body.solutionProvided }),
          ...(body.productsUsed && { productsUsed: body.productsUsed }),
          ...(body.projectDescription && { projectDescription: body.projectDescription }),
          ...(body.benefitsAchieved && { benefitsAchieved: body.benefitsAchieved }),
          ...(body.testimonialQuote && { testimonialQuote: body.testimonialQuote }),
          ...(body.clientName && { clientName: body.clientName }),
          ...(body.projectImages && { projectImages: body.projectImages }),
          ...(body.videoUrl && { videoUrl: body.videoUrl }),
          ...(typeof body.featured === "boolean" && { featured: body.featured }),
        },
      });
      return NextResponse.json({ success: true, project: updated });
    }

    return NextResponse.json({ success: true, message: "Project updated (Fallback mode)" });
  } catch (error) {
    console.error("Project update error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    if (prisma) {
      await prisma.project.delete({ where: { id } });
    }
    return NextResponse.json({ success: true, message: "Project case study deleted" });
  } catch (error) {
    console.error("Project delete error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
