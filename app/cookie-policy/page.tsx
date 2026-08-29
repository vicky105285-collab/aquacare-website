import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { pageMetadata } from "@/lib/site/page-metadata";
import { COMPANY_NAME, EMAIL } from "@/lib/site/constants";

const UPDATED = "August 2026";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "What cookies and similar technologies this website uses, why, and how you can control them. Analytics cookies are only set with your consent.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      subtitle="What this website stores in your browser, and how you control it."
      updated={UPDATED}
    >
      <p>
        This Cookie Policy explains how <strong>{COMPANY_NAME}</strong> uses cookies and similar browser storage
        on this website. It should be read together with our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>What cookies are</h2>
      <p>
        Cookies are small text files a website can store in your browser. &ldquo;Similar technologies&rdquo;
        include <code>localStorage</code> and <code>sessionStorage</code>, which work in a comparable way. Some
        are essential for the site to function; others are optional and only used with your permission.
      </p>

      <h2>Cookies this site uses</h2>

      <h3>1. Strictly necessary</h3>
      <ul>
        <li>
          <strong>Cookie-consent preference</strong> — when you accept or decline optional cookies, we store that
          choice in your browser (<code>localStorage</code>, key <code>yuvanthika_cookie_consent</code>) so we do
          not ask again on every page. No personal data is contained in it.
        </li>
        <li>
          <strong>Admin session cookie</strong> — set only for authorised staff who log in to the private admin
          area (<code>yuvanthika_admin_session</code>). It is not set for normal visitors.
        </li>
        <li>
          <strong>Hosting/security</strong> — our hosting platform may set short-lived technical cookies needed to
          route requests and protect the site.
        </li>
      </ul>
      <p>These are required for the site to work and are not controlled by the consent banner.</p>

      <h3>2. Analytics (optional — consent required)</h3>
      <ul>
        <li>
          <strong>Google Analytics 4</strong> — if you click &ldquo;Accept&rdquo; in the cookie banner, Google
          Analytics sets cookies (for example <code>_ga</code>, <code>_ga_&lt;id&gt;</code>) to measure how many
          people visit, which pages they view, and how they arrived. This helps us improve the site. It is used
          for aggregate statistics, not to identify you personally.
        </li>
      </ul>
      <p>
        If you decline, or ignore the banner, Google Analytics is <strong>not loaded</strong> and these cookies
        are not set.
      </p>

      <h2>We do not use</h2>
      <p>
        Advertising or cross-site tracking cookies, social-media tracking pixels, or profiling cookies. We do not
        sell data to third parties.
      </p>

      <h2>Managing your choice</h2>
      <ul>
        <li>Use the &ldquo;Accept&rdquo; or &ldquo;Decline&rdquo; buttons in the cookie banner when it appears.</li>
        <li>
          To change your choice later, clear this site&rsquo;s data in your browser settings and reload the page;
          the banner will appear again.
        </li>
        <li>
          You can also block or delete cookies entirely in your browser settings. The site will still work,
          though your consent choice will need to be made again.
        </li>
      </ul>

      <h2>Contact</h2>
      <p>
        Questions about cookies: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </LegalPageLayout>
  );
}
