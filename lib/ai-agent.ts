import { addLead, incrementConversationCount } from "./leads-store";
import { COMPANY_NAME, FORMER_COMPANY_NAME, PHONE_DISPLAY, WHATSAPP_PHONE_DIGITS } from "./site/constants";

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  options?: { label: string; action: string }[];
  whatsappLink?: string;
  leadCaptured?: boolean;
}

export function formatWhatsAppLeadMessage(data: {
  name: string;
  phone: string;
  location?: string;
  requirement?: string;
  currentPage?: string;
  dateTime?: string;
}): string {
  const name = data.name || "Valued Customer";
  const phone = data.phone || "N/A";
  const location = data.location || "Karur / Tamil Nadu";
  const requirement = data.requirement || "General RO / Solar Quote";
  const currentPage = data.currentPage || "Homepage";
  const time = data.dateTime || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const messageText = `👋 Hello Yuvanthika Aquacare & Solar Care Systems,

I visited your website and would like a quotation.

👤 Name: ${name}
📞 Phone: ${phone}
📍 Location: ${location}
📝 Requirement: ${requirement}

Source: Website AI Assistant
Page: ${currentPage}
Time: ${time}

Please contact me with pricing and installation details.

Thank you.`;

  return `https://wa.me/${WHATSAPP_PHONE_DIGITS}?text=${encodeURIComponent(messageText)}`;
}

export async function processAIChatMessage(
  userText: string,
  history: ChatMessage[],
  collectedLeadData?: { name?: string; phone?: string; location?: string; requirement?: string; currentPage?: string }
): Promise<{
  reply: string;
  nextStep?: "ask_name" | "ask_phone" | "ask_location" | "lead_complete";
  whatsappLink?: string;
  leadCaptured?: boolean;
  options?: { label: string; action: string }[];
}> {
  incrementConversationCount();
  const text = userText.toLowerCase().trim();

  // Extract phone number if present in text
  const phoneMatch = text.match(/(?:\+91|0)?[6-9]\d{9}/);
  const extractedPhone = phoneMatch ? phoneMatch[0] : collectedLeadData?.phone;

  // 1. If user is providing phone / lead info directly
  if (extractedPhone && (!collectedLeadData?.name || !collectedLeadData?.phone)) {
    const phone = extractedPhone;
    const name = collectedLeadData?.name || "Website Customer";
    const location = collectedLeadData?.location || "Karur / Tamil Nadu";
    const req = collectedLeadData?.requirement || userText || "General RO / Solar Quote";
    const page = collectedLeadData?.currentPage || "/";

    // Save lead into database
    await addLead({
      name,
      phone,
      location,
      serviceRequired: req,
      message: `Enquiry submitted via AI Assistant on website (${page}). Customer text: "${userText}"`,
      source: "AI Lead Agent",
    });

    const waUrl = formatWhatsAppLeadMessage({
      name,
      phone,
      location,
      requirement: req,
      currentPage: page,
    });

    return {
      reply: `Thank you, ${name}! Your request for "${req}" has been registered in our system. Our chief engineer in Karur will call you shortly on ${phone}. Click below to continue on WhatsApp!`,
      leadCaptured: true,
      whatsappLink: waUrl,
      options: [
        { label: "💬 Continue on WhatsApp", action: "whatsapp" },
        { label: "📞 Call Engineer Directly", action: "call" },
        { label: "❓ Ask Another Question", action: "reset" },
      ],
    };
  }

  // 2. Intent Matching & Training Knowledge Base

  // RO Service / Repair / Installation
  if (text.includes("ro service") || text.includes("repair") || text.includes("installation") || text.includes("filter change")) {
    return {
      reply: `${COMPANY_NAME} provides doorstep RO water purifier service, membrane cleaning, filter replacement, and installation across Karur, Namakkal, Erode, and Trichy. Same-day service available!`,
      options: [
        { label: "Book RO Service Visit", action: "book_service" },
        { label: "View RO Models", action: "view_products" },
        { label: "AMC Maintenance Plans", action: "amc" },
      ],
    };
  }

  // Water Softener / Hard Water
  if (text.includes("softener") || text.includes("hard water") || text.includes("limescale") || text.includes("tds")) {
    return {
      reply: `Groundwater in Karur & inland Tamil Nadu often has TDS over 1200 PPM. Our automated cation-exchange water softeners eliminate limescale, protect solar water heaters, and prevent skin dryness.`,
      options: [
        { label: "Get Free Hardness Test", action: "book_softener" },
        { label: "Commercial Softeners", action: "industrial" },
      ],
    };
  }

  // Solar Water Heater / Solar Panels
  if (text.includes("solar") || text.includes("heater") || text.includes("etc") || text.includes("eb bill")) {
    return {
      reply: `We engineer 100 LPD to 5,000+ LPD Evacuated Tube Collector (ETC) Solar Water Heaters for homes, apartments, and hospitals. Cuts monthly water heating electricity bills by up to 80%!`,
      options: [
        { label: "Get Solar Heater Quote", action: "book_solar" },
        { label: "View Solar Projects", action: "projects" },
      ],
    };
  }

  // Commercial & Industrial Plants (ETP, STP, DM, Industrial RO)
  if (text.includes("industrial") || text.includes("commercial") || text.includes("etp") || text.includes("stp") || text.includes("dm plant") || text.includes("plant")) {
    return {
      reply: `We design turnkey Industrial RO Plants (1,000 LPH to 100,000 LPH), Effluent Treatment Plants (ETP), Sewage Treatment Plants (STP), and Demineralization (DM) plants for textile mills, hospitals, and power facilities across Tamil Nadu.`,
      options: [
        { label: "Request Turnkey Proposal", action: "book_industrial" },
        { label: "View Industrial Case Studies", action: "projects" },
      ],
    };
  }

  // Price / Cost / Quote
  if (text.includes("price") || text.includes("cost") || text.includes("quote") || text.includes("rate") || text.includes("offer")) {
    return {
      reply: `All our RO purifiers, softeners, and solar systems come with doorstep installation, genuine brand warranty, and custom quote options. Please share your phone number or click below to get instant quotes on WhatsApp!`,
      options: [
        { label: "Get Instant Quote on WhatsApp", action: "whatsapp_quote" },
        { label: "Call Customer Care", action: "call" },
      ],
    };
  }

  // Location / Contact / Hours
  if (text.includes("location") || text.includes("address") || text.includes("where") || text.includes("contact") || text.includes("phone")) {
    return {
      reply: `Our main showroom and technical center is located at: Andankoil East, Karur, Tamil Nadu (Plus Code: X29X+3QR).\nPhone: ${PHONE_DISPLAY}\nServing Karur, Namakkal, Erode, Trichy & Salem.`,
      options: [
        { label: "Open Google Maps", action: "maps" },
        { label: "Call Store Now", action: "call" },
      ],
    };
  }

  // Default Conversational Fallback & Lead Request
  return {
    reply: `Welcome to ${COMPANY_NAME} (formerly ${FORMER_COMPANY_NAME})! We specialize in RO Purifiers, Solar Water Heaters, Water Softeners, and Turnkey Industrial Water Plants in Karur & Tamil Nadu. How can we assist you today?`,
    options: [
      { label: "💧 Domestic RO Purifiers", action: "view_products" },
      { label: "🛠️ Book Doorstep RO Service", action: "book_service" },
      { label: "☀️ Solar Water Heaters", action: "book_solar" },
      { label: "🏭 Industrial ETP / STP / RO", action: "industrial" },
    ],
  };
}
