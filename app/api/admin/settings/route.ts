import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SITE_NAME, PHONE_DISPLAY, WHATSAPP, ADDRESS_LINES } from "@/lib/site/constants";

const DEFAULT_SETTINGS: Record<string, string> = {
  companyName: SITE_NAME,
  legalName: "Yuvanthika Aquacare & Solar Care Systems",
  trustPhrase: "Formerly known as Aqua Care & Solar Care Systems, serving customers since 2014.",
  phone: PHONE_DISPLAY,
  whatsapp: WHATSAPP,
  email: "aquacareindia1@gmail.com",
  address: ADDRESS_LINES.join(", "),
  googleMapsUrl: "https://maps.google.com/?q=Yuvanthika+Aquacare+Karur",
  heroHeadline: "Tamil Nadu's Trusted Water & Solar Care Experts",
  heroSubtitle: "ISO Certified Residential, Commercial & Industrial Water Treatment & Solar Solutions Since 2014.",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
};

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (prisma) {
    try {
      const records = await prisma.siteSetting.findMany();
      const settingsMap = { ...DEFAULT_SETTINGS };
      records.forEach((r) => {
        settingsMap[r.key] = r.value;
      });
      return NextResponse.json(settingsMap);
    } catch (e) {
      console.warn("DB settings fallback:", e);
    }
  }

  return NextResponse.json(DEFAULT_SETTINGS);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: Record<string, string> = await request.json();

    const db = prisma;
    if (db) {
      const promises = Object.entries(body).map(([key, value]) =>
        db.siteSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        })
      );
      await Promise.all(promises);
    }

    return NextResponse.json({ success: true, message: "Site settings updated successfully", settings: body });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
