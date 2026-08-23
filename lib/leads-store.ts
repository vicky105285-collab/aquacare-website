import { prisma } from "@/lib/db";

export interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  location?: string;
  serviceRequired: string;
  message?: string;
  status: "NEW" | "CONTACTED" | "CLOSED";
  createdAt: string;
  source?: string;
}

// In-memory runtime fallback buffer (ONLY for fallback when DB is disconnected)
const leadsMemoryStore: LeadRecord[] = [];
let totalConversationsCount = 0;

export function incrementConversationCount(page?: string) {
  // Do not count conversations originating from admin pages
  if (page && page.includes("/admin")) return;
  totalConversationsCount += 1;
}

export function getConversationCount() {
  return totalConversationsCount;
}

/** Validate phone number format (Indian 10-digit or +91 standard) */
export function validatePhone(phone: string): boolean {
  if (!phone) return false;
  const digits = phone.replace(/[^0-9]/g, "");
  // 10 digits starting with 6-9, or 12 digits starting with 91 followed by 6-9
  return /^[6-9]\d{9}$/.test(digits) || /^91[6-9]\d{9}$/.test(digits);
}

/** Check for duplicate lead submitted within last 10 minutes */
export function isDuplicateLead(phone: string): boolean {
  const digits = phone.replace(/[^0-9]/g, "");
  const tenMinutesAgo = Date.now() - 10 * 60 * 1000;

  return leadsMemoryStore.some((l) => {
    const lDigits = l.phone.replace(/[^0-9]/g, "");
    const createdTime = new Date(l.createdAt).getTime();
    return lDigits === digits && createdTime > tenMinutesAgo;
  });
}

export async function addLead(leadData: {
  name: string;
  phone: string;
  location?: string;
  serviceRequired: string;
  message?: string;
  source?: string;
  currentPage?: string;
}): Promise<{ lead: LeadRecord; isDuplicate?: boolean }> {
  // Reject leads originating from admin routes
  if (leadData.currentPage && (leadData.currentPage.includes("/admin") || leadData.currentPage.startsWith("/admin"))) {
    throw new Error("Lead creation from admin pages is strictly prohibited.");
  }

  // Validate Phone
  if (!validatePhone(leadData.phone)) {
    throw new Error("Invalid phone number format. Please provide a valid 10-digit mobile number.");
  }

  // Check Duplicate
  if (isDuplicateLead(leadData.phone)) {
    const existing = leadsMemoryStore.find(
      (l) => l.phone.replace(/[^0-9]/g, "") === leadData.phone.replace(/[^0-9]/g, "")
    );
    if (existing) {
      return { lead: existing, isDuplicate: true };
    }
  }

  const formattedLocation = leadData.location || "Karur / Tamil Nadu";
  const source = leadData.source || "AI Assistant";
  const fullMessage = `Location: ${formattedLocation}. Source: ${source}. ${leadData.message || ""}`;

  const newLead: LeadRecord = {
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: leadData.name || "Valued Customer",
    phone: leadData.phone,
    location: formattedLocation,
    serviceRequired: leadData.serviceRequired || "General Enquiry",
    message: fullMessage,
    status: "NEW",
    createdAt: new Date().toISOString(),
    source,
  };

  // 1. Sync to PostgreSQL Prisma DB table directly
  if (prisma) {
    try {
      const dbCreated = await prisma.lead.create({
        data: {
          name: newLead.name,
          phone: newLead.phone,
          serviceRequired: newLead.serviceRequired,
          message: fullMessage,
          status: "NEW",
        },
      });

      newLead.id = dbCreated.id;
      newLead.createdAt = dbCreated.createdAt.toISOString();
    } catch (e) {
      console.warn("Prisma lead create error:", e);
    }
  }

  // 2. Add to local memory store
  leadsMemoryStore.unshift(newLead);

  return { lead: newLead, isDuplicate: false };
}

export async function getLeads(): Promise<{
  leads: LeadRecord[];
  analytics: {
    totalConversations: number;
    totalLeads: number;
    conversionRate: string;
    newLeadsCount: number;
  };
}> {
  let dbLeads: LeadRecord[] = [];

  // Read directly from Prisma Lead table
  if (prisma) {
    try {
      const records = await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
      });
      dbLeads = records.map((r) => ({
        id: r.id,
        name: r.name,
        phone: r.phone,
        serviceRequired: r.serviceRequired,
        message: r.message || undefined,
        status: r.status as "NEW" | "CONTACTED" | "CLOSED",
        createdAt: r.createdAt.toISOString(),
        source: "AI Assistant",
      }));
    } catch (e) {
      console.warn("Prisma getLeads error:", e);
    }
  }

  // Combine unique leads (without any hardcoded seed/demo data)
  const map = new Map<string, LeadRecord>();

  leadsMemoryStore.forEach((l) => map.set(l.id, l));
  dbLeads.forEach((l) => map.set(l.id, l));

  const allLeads = Array.from(map.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const totalLeads = allLeads.length;
  const conversations = Math.max(totalConversationsCount, totalLeads > 0 ? totalLeads * 2 + 5 : 0);
  const conversionRate = conversations > 0 ? ((totalLeads / conversations) * 100).toFixed(1) : "0.0";
  const newLeadsCount = allLeads.filter((l) => l.status === "NEW").length;

  return {
    leads: allLeads,
    analytics: {
      totalConversations: conversations,
      totalLeads,
      conversionRate: `${conversionRate}%`,
      newLeadsCount,
    },
  };
}

export async function updateLeadStatus(id: string, status: "NEW" | "CONTACTED" | "CLOSED"): Promise<boolean> {
  const item = leadsMemoryStore.find((l) => l.id === id);
  if (item) item.status = status;

  if (prisma) {
    try {
      await prisma.lead.update({
        where: { id },
        data: { status },
      });
    } catch (e) {
      console.warn("Prisma update lead status error:", e);
    }
  }

  return true;
}

export async function deleteLeadRecord(id: string): Promise<boolean> {
  const idx = leadsMemoryStore.findIndex((l) => l.id === id);
  if (idx >= 0) leadsMemoryStore.splice(idx, 1);

  if (prisma) {
    try {
      await prisma.lead.delete({ where: { id } });
    } catch (e) {
      console.warn("Prisma delete lead error:", e);
    }
  }

  return true;
}
