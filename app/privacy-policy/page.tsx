import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { pageMetadata } from "@/lib/site/page-metadata";
import { COMPANY_NAME, EMAIL, PHONE_DISPLAY, ADDRESS_FULL } from "@/lib/site/constants";

const UPDATED = "August 2026";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Yuvanthika Aquacare & Solar Care Systems collects, uses, stores and protects personal data submitted through this website, in line with India's Digital Personal Data Protection Act, 2023.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="How we handle the personal information you share with us through this website."
      updated={UPDATED}
    >
      <p>
        This Privacy Policy explains how <strong>{COMPANY_NAME}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
        &ldquo;our&rdquo;) collects and uses personal data when you use this website or contact us through it.
        We aim to handle personal data in accordance with the Information Technology Act, 2000 and India&rsquo;s
        Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025, as they
        apply to us.
      </p>

      <h2>Who we are</h2>
      <p>
        {COMPANY_NAME} is a water-treatment and solar-care business based at {ADDRESS_FULL}. For any
        privacy-related request you can reach us by email at{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or by phone at {PHONE_DISPLAY}.
      </p>

      <h2>What personal data we collect</h2>
      <p>We only collect what we need to respond to you and provide our services:</p>
      <ul>
        <li>
          <strong>Enquiry and lead forms</strong> (including the &ldquo;free water testing&rdquo; request and the
          AI assistant): your name, phone number, location/area, the service or product you are interested in, and
          any message you type.
        </li>
        <li>
          <strong>Direct contact</strong>: if you call, send a WhatsApp message or email us, we receive the
          contact details and message content you provide.
        </li>
        <li>
          <strong>Site visits and service</strong>: if you request a site visit, water test or service call, we
          record the address and technical details needed to carry out the work.
        </li>
        <li>
          <strong>Website analytics</strong>: if you consent, Google Analytics collects standard usage
          information such as pages viewed, approximate location (city level), device and browser type, and
          referring source. See our <Link href="/cookie-policy">Cookie Policy</Link>.
        </li>
        <li>
          <strong>Server logs</strong>: our hosting provider records standard technical logs (IP address,
          timestamp, requested URL) for security and to keep the site running.
        </li>
      </ul>
      <p>
        We do not ask for financial account details, government identity numbers, or sensitive personal data
        through this website. Please do not send such information through the forms.
      </p>

      <h2>Why we use your data</h2>
      <ul>
        <li>To respond to your enquiry and give you a quote or advice.</li>
        <li>To schedule and carry out site visits, water tests, installation, service and AMC work.</li>
        <li>To contact you about your enquiry or an ongoing job, including by phone, WhatsApp or email.</li>
        <li>To keep records of work done and warranties or AMC arrangements.</li>
        <li>With your consent, to understand how the website is used so we can improve it.</li>
        <li>To meet legal, accounting and regulatory obligations, and to protect against fraud or misuse.</li>
      </ul>

      <h2>Consent and your choices</h2>
      <p>
        When you submit an enquiry form, you are asking us to contact you about your request, and we process
        your data for that purpose. Non-essential analytics cookies are only set if you accept them in the
        cookie banner; you can decline or change your choice at any time (see the{" "}
        <Link href="/cookie-policy">Cookie Policy</Link>). You can ask us to stop contacting you for marketing at any
        time.
      </p>

      <h2>Who we share data with</h2>
      <p>We do not sell your personal data. We share it only with:</p>
      <ul>
        <li>
          <strong>Service providers who help run this website and business</strong>, such as our website hosting
          provider, our database provider, our media/image hosting provider and (with your consent) Google
          Analytics. These providers process data on our instructions.
        </li>
        <li>
          <strong>Our own technicians and staff</strong>, so they can carry out the work you have requested.
        </li>
        <li>
          <strong>Authorities or advisors</strong> where we are required to do so by law, or to establish,
          exercise or defend legal claims.
        </li>
      </ul>
      <p>
        Some of these providers may process or store data on servers located outside India. Where that happens,
        we rely on the provider&rsquo;s contractual commitments to protect the data.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry and customer records for as long as needed to serve you and to meet legal, tax and
        warranty/AMC requirements, after which they are deleted or anonymised. Analytics data is retained
        according to the settings in our analytics account. If you ask us to delete your data and we are not
        required to keep it, we will do so.
      </p>

      <h2>How we protect it</h2>
      <p>
        Access to customer records is limited to people who need it. Our website is served over HTTPS, admin
        access is protected by authentication, and we use reputable hosting and database providers. No system is
        perfectly secure, but we take reasonable technical and organisational measures to protect your data.
      </p>

      <h2>Your rights</h2>
      <p>Subject to applicable law, you can ask us to:</p>
      <ul>
        <li>tell you what personal data of yours we hold and how we use it;</li>
        <li>correct data that is inaccurate or incomplete;</li>
        <li>delete data we no longer need to keep;</li>
        <li>stop using your data for marketing contact.</li>
      </ul>
      <p>
        To make a request, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> with enough detail for us to identify
        your records. We may need to verify your identity before acting. If you are not satisfied with our
        response, you may raise the matter with the Data Protection Board of India.
      </p>

      <h2>Children</h2>
      <p>
        This website and our services are intended for adults arranging water or solar equipment. We do not
        knowingly collect personal data of children through this site.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy as our practices or the law change. The &ldquo;last updated&rdquo; date at the
        top shows when it was last revised. Significant changes will be reflected on this page.
      </p>
    </LegalPageLayout>
  );
}
