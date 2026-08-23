import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { updateLeadStatus, deleteLeadRecord } from "@/lib/leads-store";

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
    const { status } = body;

    if (!status || !["NEW", "CONTACTED", "CLOSED"].includes(status)) {
      return NextResponse.json({ error: "Valid status required (NEW, CONTACTED, CLOSED)" }, { status: 400 });
    }

    await updateLeadStatus(id, status);

    return NextResponse.json({ success: true, message: `Lead status updated to ${status}` });
  } catch (error) {
    console.error("Lead status update error:", error);
    return NextResponse.json({ error: "Failed to update lead status" }, { status: 500 });
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
    await deleteLeadRecord(id);
    return NextResponse.json({ success: true, message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Lead delete error:", error);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
