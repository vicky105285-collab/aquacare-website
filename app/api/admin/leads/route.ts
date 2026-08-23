import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

// In-memory lead buffer for fallback when DB is disconnected
const localLeadsBuffer: Array<{
  id: string;
  name: string;
  phone: string;
  email: string | null;
  serviceRequired: string;
  message: string | null;
  status: "NEW" | "CONTACTED" | "CLOSED";
  createdAt: string;
}> = [
  {
    id: "lead-01",
    name: "Murugan Textiiles Karur",
    phone: "+91 98424 11223",
    email: "murugan@textiles.com",
    serviceRequired: "Industrial RO Plant (50,000 LPH)",
    message: "Need quote for textile dyeing plant effluent & RO filtration.",
    status: "NEW",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "lead-02",
    name: "Dr. S. Karthik",
    phone: "+91 94431 88900",
    email: "dr.karthik@gmail.com",
    serviceRequired: "Water Softener & Domestic RO",
    message: "TDS is 1800 at home in Namakkal. Please schedule site visit.",
    status: "CONTACTED",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");

  let leads = localLeadsBuffer;

  if (prisma) {
    try {
      const dbLeads = await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (dbLeads.length > 0) {
        leads = dbLeads.map((l) => ({
          ...l,
          createdAt: l.createdAt.toISOString(),
        }));
      }
    } catch (e) {
      console.warn("DB lead query fallback:", e);
    }
  }

  // Export CSV functionality
  if (format === "csv") {
    const headers = ["ID", "Name", "Phone", "Email", "Service Required", "Message", "Status", "Date"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ""}"`,
      `"${l.serviceRequired}"`,
      `"${(l.message || "").replace(/"/g, '""')}"`,
      l.status,
      l.createdAt,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="yuvanthika-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  // Calculate Lead Analytics
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const monthStr = now.toISOString().slice(0, 7);

  const totalLeads = leads.length;
  const todayLeads = leads.filter((l) => l.createdAt.startsWith(todayStr)).length;
  const monthlyLeads = leads.filter((l) => l.createdAt.startsWith(monthStr)).length;

  return NextResponse.json({
    analytics: {
      totalLeads,
      todayLeads,
      monthlyLeads,
    },
    leads,
  });
}

// Public or Admin Lead creation
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, serviceRequired, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone number are required" }, { status: 400 });
    }

    if (prisma) {
      const created = await prisma.lead.create({
        data: {
          name,
          phone,
          email: email || null,
          serviceRequired: serviceRequired || "General Enquiry",
          message: message || null,
          status: "NEW",
        },
      });
      return NextResponse.json({ success: true, lead: created });
    }

    const newLead = {
      id: `lead-${Date.now()}`,
      name,
      phone,
      email: email || null,
      serviceRequired: serviceRequired || "General Enquiry",
      message: message || null,
      status: "NEW" as const,
      createdAt: new Date().toISOString(),
    };

    localLeadsBuffer.unshift(newLead);

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ error: "Failed to record lead" }, { status: 500 });
  }
}
