import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PROJECTS_DATA } from "@/lib/site/projects";
import { slugify } from "@/lib/utils";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (prisma) {
    try {
      const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (projects.length > 0) return NextResponse.json(projects);
    } catch (e) {
      console.warn("DB query fallback:", e);
    }
  }

  return NextResponse.json(PROJECTS_DATA);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      projectTitle,
      projectType,
      location,
      district,
      customerCategory,
      industryType,
      capacity,
      installationDate,
      problemFaced,
      solutionProvided,
      productsUsed,
      projectDescription,
      benefitsAchieved,
      testimonialQuote,
      clientName,
      projectImages,
      videoUrl,
      featured,
    } = body;

    if (!projectTitle || !location) {
      return NextResponse.json({ error: "Project title and location are required" }, { status: 400 });
    }

    const slug = slugify(`${projectTitle}-${district || location}`);

    if (prisma) {
      const created = await prisma.project.create({
        data: {
          slug,
          projectTitle,
          projectType: projectType || "Water Treatment System",
          location,
          district: district || "Karur",
          customerCategory: customerCategory || "commercial",
          industryType: industryType || "General",
          capacity: capacity || "10,000 LPH",
          installationDate: installationDate || new Date().toISOString().slice(0, 7),
          problemFaced: problemFaced || "",
          solutionProvided: solutionProvided || "",
          productsUsed: Array.isArray(productsUsed) ? productsUsed : [],
          projectDescription: projectDescription || "",
          benefitsAchieved: Array.isArray(benefitsAchieved) ? benefitsAchieved : [],
          testimonialQuote: testimonialQuote || null,
          clientName: clientName || null,
          projectImages: Array.isArray(projectImages) ? projectImages : [],
          videoUrl: videoUrl || null,
          featured: Boolean(featured),
        },
      });
      return NextResponse.json({ success: true, project: created });
    }

    return NextResponse.json({
      success: true,
      message: "Project case study created (Fallback mode)",
      project: { slug, projectTitle, location, featured },
    });
  } catch (error) {
    console.error("Project creation error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
