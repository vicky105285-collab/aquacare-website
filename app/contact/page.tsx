import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Contact } from "@/components/Contact";
import { ContactMapSection } from "@/components/ContactMapSection";
import { CTASection } from "@/components/CTASection";
import { ADDRESS_FULL, BUSINESS_HISTORY_NOTE, CALL, COMPANY_NAME, EMAIL, FORMER_COMPANY_NAME, PHONE_DISPLAY, WHATSAPP } from "@/lib/site/constants";
import { CONTACT_CARDS } from "@/lib/site/data";
import { pageMetadata } from "@/lib/site/page-metadata";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us — Karur & Tamil Nadu",
  description: `Contact ${COMPANY_NAME} (Formerly ${FORMER_COMPANY_NAME}). Phone/WhatsApp ${PHONE_DISPLAY}. Showroom address: ${ADDRESS_FULL}. Email ${EMAIL}. Doorstep water & solar service across Tamil Nadu.`,
  path: "/contact",
  keywords: [
    "Yuvanthika Aquacare Contact Karur",
    "Yuvanthika Aquacare Phone Number",
    "Aqua Care Karur Address",
    "RO service WhatsApp Karur",
    "Andankoil East Karur Office",
  ],
});

export default function ContactPage() {
  return (
    <article>
      <PageHero
        title={`Contact ${COMPANY_NAME}`}
        subtitle="Reach our Karur central desk for bookings, commercial plant consultations, and after-sales support — 8 AM to 8 PM daily."
        tamilLine="எங்களை உடனடியாக அழைக்கவும் அல்லது WhatsApp செய்ய சேவை தயாராக உள்ளது."
      />

      <section className="py-4 bg-cyan-50 border-b border-cyan-100 text-center text-xs sm:text-sm text-cyan-900 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
          <span>{BUSINESS_HISTORY_NOTE}</span>
        </div>
      </section>

      <Contact cards={CONTACT_CARDS} />
      <ContactMapSection />
      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Prefer Instant WhatsApp Chat?"
        subheadline="WhatsApp us your requirement, location, or water issue — our technical team responds immediately."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}

