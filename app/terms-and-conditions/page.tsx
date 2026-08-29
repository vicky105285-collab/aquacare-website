import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { pageMetadata } from "@/lib/site/page-metadata";
import { COMPANY_NAME, EMAIL, PHONE_DISPLAY, ADDRESS_FULL } from "@/lib/site/constants";

const UPDATED = "August 2026";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms for using the Yuvanthika Aquacare & Solar Care Systems website and for enquiries, quotations, installation, service and AMC arrangements.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      subtitle="The basis on which we provide this website and respond to your enquiries."
      updated={UPDATED}
    >
      <p>
        These Terms &amp; Conditions govern your use of this website, operated by <strong>{COMPANY_NAME}</strong>,
        {ADDRESS_FULL}. By using the site you accept these terms. If you do not agree, please do not use the site.
      </p>

      <h2>Use of the website</h2>
      <ul>
        <li>You may use the site to learn about our products and services and to send us enquiries.</li>
        <li>
          You agree not to misuse the site, attempt to gain unauthorised access to any part of it, submit false
          information, or use it in a way that could damage or disrupt it.
        </li>
        <li>
          The content of the site (text, images, layout and design) belongs to {COMPANY_NAME} or its licensors
          and is provided for your information. You may not copy or reuse it for commercial purposes without our
          permission.
        </li>
      </ul>

      <h2>Information on the website</h2>
      <p>
        We try to keep product descriptions, service information and technical explanations accurate and current.
        However, the site is provided for general information. Specifications, capacities, model availability and
        suitability for your water can change, and the correct system for you depends on your actual water quality
        and requirement. Nothing on the site is a binding offer or a guarantee of a particular result. See our{" "}
        <Link href="/disclaimer">Disclaimer</Link>.
      </p>

      <h2>Enquiries, quotations and orders</h2>
      <ul>
        <li>
          Submitting an enquiry form or contacting us does not create a contract. It is a request for us to get
          in touch.
        </li>
        <li>
          Any quotation we give is based on the information available at the time and, where relevant, on a site
          visit or water test. Prices, scope and timelines are confirmed in a written quotation or work order.
        </li>
        <li>
          A contract for supply, installation, service or an AMC is formed only when we and you agree the scope
          and price in writing (including by WhatsApp or email) or when work is accepted and begun.
        </li>
      </ul>

      <h2>Installation, service and site conditions</h2>
      <ul>
        <li>
          You are responsible for providing safe site access, a suitable water inlet, a drainage point, and
          power where required, and for any permissions needed at the premises.
        </li>
        <li>
          Treatment performance depends on the input water quality, water pressure, correct usage and timely
          maintenance. We will advise on the pre-treatment and maintenance your water needs.
        </li>
        <li>
          Additional work discovered during a job (for example unexpected plumbing changes or civil work) may be
          quoted separately before it is carried out.
        </li>
      </ul>

      <h2>Warranty, AMC and service terms</h2>
      <p>
        Manufacturer warranties, where applicable, are passed through on the terms set by the manufacturer.
        Our own workmanship and any AMC coverage are set out in the relevant quotation, invoice or AMC document,
        including what is included, what is chargeable, and what is excluded (for example damage from misuse,
        untreated hard water where treatment was recommended, power surges, or tampering by third parties).
      </p>

      <h2>Payments</h2>
      <p>
        Payment terms are stated in the quotation or invoice. Work may be scheduled or completed subject to
        agreed advance or milestone payments.
      </p>

      <h2>Cancellation</h2>
      <p>
        If you need to cancel or reschedule a booked site visit, installation or service, please tell us as early
        as possible. Amounts already incurred for materials ordered specifically for your job, or for a visit
        already made, may be chargeable. Cancellation terms for a specific order or AMC are as stated in its
        written quotation or agreement.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, {COMPANY_NAME} is not liable for indirect or consequential loss arising
        from use of this website or reliance on general information on it. This does not limit any liability that
        cannot be excluded under applicable law, or our responsibilities under a signed contract for supply or
        service.
      </p>

      <h2>Third-party links</h2>
      <p>
        The site may link to external websites (for example maps, social media or manufacturer pages). We are not
        responsible for the content or practices of those sites.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India, and the courts at Karur, Tamil Nadu have jurisdiction over
        any dispute relating to the website, subject to any different jurisdiction agreed in a signed contract.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or {PHONE_DISPLAY}.
      </p>
    </LegalPageLayout>
  );
}
