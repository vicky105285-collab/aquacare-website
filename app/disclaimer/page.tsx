import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { pageMetadata } from "@/lib/site/page-metadata";
import { COMPANY_NAME, EMAIL } from "@/lib/site/constants";

const UPDATED = "August 2026";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer",
  description:
    "General information disclaimer for the Yuvanthika Aquacare & Solar Care Systems website, including technical content, water-quality guidance and external references.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="Disclaimer"
      subtitle="How to read the information on this website."
      updated={UPDATED}
    >
      <h2>General information only</h2>
      <p>
        The content on this website is published by <strong>{COMPANY_NAME}</strong> for general information about
        water treatment, RO systems, water softeners, solar water heating and related services. It is not
        professional, engineering, medical or legal advice for your specific situation.
      </p>

      <h2>Water quality and product suitability</h2>
      <p>
        Water quality varies significantly from one location, street and borewell to another. Any TDS, hardness,
        capacity or treatment guidance on this site is indicative. The correct system, sizing and pre-treatment
        for your premises should be decided after a water test and, where relevant, a site survey. We reference
        the Bureau of Indian Standards drinking-water specification (IS 10500:2012) for context; we do not certify
        that any particular installation will achieve a specific water-quality figure without a site-specific
        assessment.
      </p>

      <h2>No guaranteed outcomes</h2>
      <p>
        We do not promise specific performance numbers, savings, equipment lifespans or results on this website.
        Actual outcomes depend on input water, water pressure, correct installation, usage patterns and timely
        maintenance. Warranty and service commitments, if any, are those set out in a written quotation, invoice
        or AMC agreement.
      </p>

      <h2>Pricing and availability</h2>
      <p>
        Where prices, models or offers are shown, they are subject to change and to confirmation in a written
        quotation. Product availability and specifications are set by the respective manufacturers.
      </p>

      <h2>External links and references</h2>
      <p>
        This site may link to or mention third-party websites, standards bodies, manufacturers and map services.
        We do not control and are not responsible for their content, accuracy or availability.
      </p>

      <h2>Business identity</h2>
      <p>
        {COMPANY_NAME} was formerly known as Aqua Care &amp; Solar Care Systems. Brand names of manufacturers
        mentioned on the site belong to their respective owners and are referenced only to describe products we
        supply or service.
      </p>

      <h2>Limitation</h2>
      <p>
        To the extent permitted by law, {COMPANY_NAME} accepts no liability for loss arising from reliance on
        general information on this website. Please contact us for advice specific to your requirement. See also
        our <Link href="/terms-and-conditions">Terms &amp; Conditions</Link> and{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>Contact</h2>
      <p>
        Questions: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </LegalPageLayout>
  );
}
