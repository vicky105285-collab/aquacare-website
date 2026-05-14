import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Contact } from "@/components/Contact";
import { CTASection } from "@/components/CTASection";
import { CALL, PHONE_DISPLAY, WHATSAPP } from "@/lib/site/constants";
import { CONTACT_CARDS } from "@/lib/site/data";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Call or WhatsApp Aqua Care & Solar Care Systems in Karur for RO, solar, AMC, and appliance support — same-day slots when available.",
  path: "/contact",
  keywords: ["Aqua Care phone number", "RO service WhatsApp Karur", "solar enquiry Karur"],
});

export default function ContactPage() {
  return (
    <article>
      <PageHero
        title="Contact us"
        subtitle="Reach the Karur service desk for bookings, quotations, and after-sales support — 8 AM to 8 PM, seven days a week."
        tamilLine="எங்களை அழைக்கவும் அல்லது WhatsApp செய்யவும்."
      />
      <Contact cards={CONTACT_CARDS} />
      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Prefer instant chat?"
        subheadline="WhatsApp us your requirement and address — we respond as quickly as we can during business hours."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
