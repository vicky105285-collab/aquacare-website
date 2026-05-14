import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { AMCPlans } from "@/components/AMCPlans";
import { CTASection } from "@/components/CTASection";
import { CALL, PHONE_DISPLAY, WHATSAPP } from "@/lib/site/constants";
import { AMC_PLANS } from "@/lib/site/data";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "AMC plans",
  description:
    "RO AMC plans in Karur with preventive visits, filter checks, priority support, and parts discounts — Silver, Gold, and Platinum tiers.",
  path: "/amc",
  keywords: ["RO AMC Karur", "water purifier annual maintenance", "AMC Gold plan"],
});

export default function AmcPage() {
  return (
    <article>
      <PageHero
        title="Annual maintenance contracts"
        subtitle="Keep purification performance predictable — scheduled visits, genuine parts policy, and faster response when you need help."
        tamilLine="வருடாந்திர பராமரிப்பு — RO நீர் தரத்தை நிலைநிறுத்த உதவுகிறது."
      />
      <AMCPlans plans={AMC_PLANS} callHref={CALL} />
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 text-center text-slate-600 text-sm leading-relaxed">
          <p>
            Coverage details vary by tier — our desk explains inclusions before activation. For service-specific AMC
            questions, see{" "}
            <Link href="/services/amc" className="font-semibold text-blue-700 hover:underline">
              AMC service detail
            </Link>
            .
          </p>
        </div>
      </section>
      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Activate AMC today"
        subheadline="We will align the plan to your model, usage, and locality."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
