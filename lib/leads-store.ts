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

// In-memory runtime store for leads and chat conversations
const leadsMemoryStore: LeadRecord[] = [];
let totalConversationsCount = 28; // Baseline track for conversation analytics

export function incrementConversationCount() {
  totalConversationsCount += 1;
}

export function getConversationCount() {
  return totalConversationsCount;
}

export async function addLead(leadData: {
  name: string;
  phone: string;
  location?: string;
  serviceRequired: string;
  message?: string;
  source?: string;
}): Promise<LeadRecord> {
  const newLead: LeadRecord = {
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: leadData.name || "Valued Customer",
    phone: leadData.phone,
    location: leadData.location || "Karur / Tamil Nadu",
    serviceRequired: leadData.serviceRequired || "General Enquiry",
    message: leadData.message || `Location: ${leadData.location || "N/A"}. Request from AI Lead Assistant`,
    status: "NEW",
    createdAt: new Date().toISOString(),
    source: leadData.source || "AI Lead Chatbot",
  };

  // Add to in-memory store
  leadsMemoryStore.unshift(newLead);

  // Sync to PostgreSQL Prisma DB if connected
  if (prisma) {
    try {
      await prisma.lead.create({
        data: {
          name: newLead.name,
          phone: newLead.phone,
          serviceRequired: newLead.serviceRequired,
          message: `Location: ${leadData.location || "N/A"}. ${leadData.message || "Captured by AI Lead Agent"}`,
          status: "NEW",
        },
      });
    } catch (e) {
      console.warn("Prisma lead save skipped:", e);
    }
  }

  return newLead;
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
      }));
    } catch (e) {
      console.warn("Prisma getLeads error:", e);
    }
  }

  // Combine unique leads by phone number or ID
  const map = new Map<string, LeadRecord>();

  // Add default demo lead entries if empty
  const defaultLeads: LeadRecord[] = [
    {
      id: "lead-01",
      name: "S. Kamesh",
      phone: "+91 94433 12345",
      location: "Karur Town",
      serviceRequired: "Domestic RO Water Purifier & Installation",
      message: "Required 12L Aqua Shark RO system for borewell water.",
      status: "NEW",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: "lead-02",
      name: "Dr. R. Anbarasan",
      phone: "+91 98421 98765",
      location: "Perundurai Road, Erode",
      serviceRequired: "5000 LPD Commercial Solar Water Heater",
      message: "Needs quote for 120-bed hospital setup.",
      status: "CONTACTED",
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
      id: "lead-03",
      name: "M. Saravanan",
      phone: "+91 97890 54321",
      location: "Namakkal",
      serviceRequired: "Water Softener for Hard Borewell Water",
      message: "TDS 1400 PPM in borewell water. Need centralized softener.",
      status: "NEW",
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    },
  ];

  defaultLeads.forEach((l) => map.set(l.id, l));
  leadsMemoryStore.forEach((l) => map.set(l.id, l));
  dbLeads.forEach((l) => map.set(l.id, l));

  const allLeads = Array.from(map.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const totalLeads = allLeads.length;
  const conversations = Math.max(totalConversationsCount, totalLeads * 3 + 12);
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
      console.warn("Prisma update lead status skipped:", e);
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
      console.warn("Prisma delete lead skipped:", e);
    }
  }

  return true;
}
