import { NextResponse } from "next/server";
import { processAIChatMessage } from "@/lib/ai-agent";

export async function POST(request: Request) {
  try {
    const referer = request.headers.get("referer") || "";
    const body = await request.json();
    const { message, history, collectedLeadData } = body;

    // Backend protection: Reject chat & lead creation from /admin routes
    const currentPage = collectedLeadData?.currentPage || "";
    if (currentPage.includes("/admin") || referer.includes("/admin")) {
      return NextResponse.json(
        { error: "AI Chatbot interactions on admin routes are prohibited." },
        { status: 403 }
      );
    }

    if (!message && !collectedLeadData) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const result = await processAIChatMessage(message || "", history || [], collectedLeadData);

    return NextResponse.json({
      success: true,
      reply: result.reply,
      options: result.options,
      whatsappLink: result.whatsappLink,
      leadCaptured: result.leadCaptured,
    });
  } catch (error) {
    console.error("AI Chat API error:", error);
    return NextResponse.json({ error: "Internal server error in AI Lead Agent" }, { status: 500 });
  }
}
