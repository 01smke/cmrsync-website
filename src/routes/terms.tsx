import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service — CMRsync" },
      {
        name: "description",
        content:
          "Terms governing use of the CMRsync AI logistics platform: subscription, fees, data, liability and termination.",
      },
    ],
  }),
});

function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="1 January 2026">
      <p>
        These Terms of Service ("Terms") govern your use of the <strong>CMRsync</strong>
        {" "}service (the "Service") provided by CMRsync ("we", "us", "our"). By creating an
        account or using the Service you agree to these Terms. If you do not agree, do not use
        the Service.
      </p>

      <h2>1. The Service</h2>
      <p>
        CMRsync is a software-as-a-service platform that lets logistics teams collect CMR
        consignment notes via a Telegram bot, automatically extract structured data using AI
        vision models, and manage the resulting records through a web dashboard, including
        invoice generation and CSV/TMS exports.
      </p>

      <h2>2. Eligibility & accounts</h2>
      <ul>
        <li>You must be acting on behalf of a business and be at least 18 years old.</li>
        <li>You are responsible for the accuracy of account information and for all activity under your account.</li>
        <li>You must keep credentials secret and notify us promptly of any suspected compromise.</li>
      </ul>

      <h2>3. Subscription & fees</h2>
      <ul>
        <li>The price is <strong>€30 per truck per month</strong>, billed monthly in advance, VAT excluded.</li>
        <li>You may add or remove trucks at any time. Changes are prorated to the current billing cycle.</li>
        <li>A 30-day free trial is available for new customers. No credit card is required to start the trial.</li>
        <li>Late payments may result in suspension after a 14-day grace period and written notice.</li>
        <li>You can cancel at any time from the dashboard. Cancellation takes effect at the end of the current billing period; pre-paid fees are non-refundable except where required by law.</li>
      </ul>

      <h2>4. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Submit content that is unlawful, infringing, defamatory, or that you do not have the right to process.</li>
        <li>Attempt to reverse-engineer, probe, or interfere with the Service.</li>
        <li>Use the Service to build a competing product or to train competing AI models.</li>
        <li>Resell, sublicense or share access outside your organisation without our written consent.</li>
        <li>Submit malware or content that could damage the Service or other users.</li>
      </ul>
      <p>We may suspend the account immediately for serious or repeated violations.</p>

      <h2>5. Your data</h2>
      <p>
        You retain all rights in the CMR images and data you submit ("Customer Data"). You
        grant us a limited, worldwide, non-exclusive licence to host, process, transmit and
        display Customer Data <strong>solely for the purpose of providing the Service to you</strong>,
        including running AI extraction, generating invoices and producing exports.
      </p>
      <p>
        We do not sell Customer Data, do not use it for advertising, and do not use it to
        train AI models for any purpose other than providing the Service to you. Our handling
        of personal data is described in the <a href="/privacy">Privacy Policy</a>, which is
        incorporated by reference. A Data Processing Agreement (DPA) is available on request.
      </p>

      <h2>6. Confidentiality</h2>
      <p>
        Each party will protect the other's confidential information with the same care it
        uses for its own (and at least reasonable care). CMR content, business volumes and
        operational details are deemed confidential.
      </p>

      <h2>7. Service availability</h2>
      <p>
        We aim for 99.5% monthly uptime, excluding scheduled maintenance announced in advance
        and incidents caused by third-party providers (e.g. Telegram). The Service is provided
        "as is"; we do not warrant that AI extraction will be 100% accurate. You must verify
        critical fields before relying on extracted data for legal or financial decisions.
      </p>

      <h2>8. Intellectual property</h2>
      <p>
        The Service, including software, models, designs, and trademarks, is owned by CMRsync
        or its licensors. We grant you a limited, non-exclusive, non-transferable right to use
        the Service during the subscription term in accordance with these Terms.
      </p>

      <h2>9. Third-party services</h2>
      <p>
        The Service relies on third parties (Telegram, AI providers, payment processors,
        cloud hosting). Their availability and terms are outside our control. We are not
        liable for outages, changes or actions of third parties, but we will use reasonable
        efforts to mitigate impact.
      </p>

      <h2>10. Liability</h2>
      <p>
        To the maximum extent permitted by law, our total aggregate liability arising out of
        or in connection with the Service in any 12-month period is limited to the fees you
        paid us during that period. We are not liable for indirect, incidental, consequential,
        or punitive damages, including lost profits, lost business or lost data, even if
        advised of the possibility.
      </p>
      <p>
        Nothing in these Terms excludes liability that cannot be excluded by law (e.g. for
        gross negligence, wilful misconduct, or personal injury).
      </p>

      <h2>11. Indemnity</h2>
      <p>
        You agree to indemnify and hold us harmless from third-party claims arising out of
        Customer Data you submit or your violation of these Terms, including reasonable legal
        fees.
      </p>

      <h2>12. Termination</h2>
      <ul>
        <li>You may terminate at any time by cancelling in the dashboard.</li>
        <li>We may terminate or suspend with 30 days' written notice for convenience, or immediately for material breach.</li>
        <li>On termination, your access ends. You can export Customer Data for up to 30 days after termination, after which it is deleted in line with the Privacy Policy.</li>
      </ul>

      <h2>13. Changes</h2>
      <p>
        We may change these Terms. Material changes will be notified by email or in the
        dashboard at least 30 days before they take effect. Continued use after the effective
        date means acceptance.
      </p>

      <h2>14. Governing law</h2>
      <p>
        These Terms are governed by the laws of the European Union member state where CMRsync
        is established, without regard to conflict-of-law principles. Disputes will be
        submitted to the exclusive jurisdiction of the competent courts of that state, unless
        mandatory consumer protection law provides otherwise.
      </p>

      <h2>15. Contact</h2>
      <p>
        For questions about these Terms, please use the contact form on our website.
      </p>
    </LegalPage>
  );
}
