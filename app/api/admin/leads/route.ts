import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getLeads, addLead } from "@/lib/leads-store";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");

  const { leads, analytics } = await getLeads();

  // Export CSV functionality
  if (format === "csv") {
    const headers = ["ID", "Name", "Phone", "Location", "Service Required", "Message", "Status", "Date"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${(l.location || "Karur").replace(/"/g, '""')}"`,
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

  return NextResponse.json({
    analytics,
    leads,
  });
}

// Public or Admin Lead creation with Spam Protection
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, location, serviceRequired, message } = body;

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const { lead, isDuplicate } = await addLead({
      name: name || "Website Visitor",
      phone,
      location: location || "Karur / Tamil Nadu",
      serviceRequired: serviceRequired || "General Enquiry",
      message,
    });

    return NextResponse.json({
      success: true,
      lead,
      isDuplicate: !!isDuplicate,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to record lead";
    console.error("Lead submission error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
