import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Contact } from "@/components/Contact";
import { ContactMapSection } from "@/components/ContactMapSection";
import { CTASection } from "@/components/CTASection";
import { ADDRESS_FULL, CALL, EMAIL, PHONE_DISPLAY, WHATSAPP } from "@/lib/site/constants";
import { CONTACT_CARDS } from "@/lib/site/data";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Call or WhatsApp ${PHONE_DISPLAY}. Visit us at ${ADDRESS_FULL}. Email ${EMAIL}. RO, solar, AMC & appliance support in Karur.`,
  path: "/contact",
  keywords: [
    "Aqua Care phone number",
    "RO service WhatsApp Karur",
    "Aqua Care address Karur",
    "Reddipalayam Karur",
    EMAIL,
  ],
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
      <ContactMapSection />
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
