import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — CMRsync" },
      {
        name: "description",
        content:
          "How CMRsync collects, processes and protects personal and CMR waybill data under the EU GDPR.",
      },
    ],
  }),
});

function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="1 January 2026">
      <p>
        This Privacy Policy explains how <strong>CMRsync</strong> ("we", "us", "our") collects,
        uses, stores and protects personal data and CMR waybill data when you use our service
        (the "Service"). We act as a <strong>data processor</strong> for CMR waybill content
        submitted by your drivers and as a <strong>data controller</strong> for your account
        and billing data.
      </p>
      <p>
        We comply with the EU General Data Protection Regulation (Regulation 2016/679, "GDPR")
        and applicable national data protection laws.
      </p>

      <h2>1. Data Controller</h2>
      <p>
        CMRsync, contactable at <a href="mailto:privacy@cmrsync.com">privacy@cmrsync.com</a>.
        For Data Protection Officer (DPO) requests, write to the same address with the subject
        line "DPO".
      </p>

      <h2>2. What data we process</h2>
      <h3>2.1 Account & billing data (we are the controller)</h3>
      <ul>
        <li>Company name, VAT number, billing address.</li>
        <li>Account user names, work email addresses and hashed passwords.</li>
        <li>Login metadata: timestamps, IP address, user agent.</li>
        <li>Payment metadata returned by our payment processor (we do not store card numbers).</li>
      </ul>

      <h3>2.2 CMR waybill data (we are the processor; you are the controller)</h3>
      <ul>
        <li>Photographs of CMR consignment notes uploaded by drivers via the Telegram bot.</li>
        <li>
          Extracted structured fields, including: shipper, consignee, carrier, places of
          loading and delivery, dates, vehicle registration, cargo description, weights,
          packages, signatures, reference numbers, and any free-text remarks present on the document.
        </li>
        <li>
          Telegram metadata necessary to deliver the bot: Telegram user ID, chat ID, message
          timestamps. We do <strong>not</strong> read messages from chats other than the bot.
        </li>
      </ul>
      <p>
        CMR waybills frequently contain personal data of drivers, dispatchers and recipients
        (names, signatures, ID numbers, license plates). We treat all CMR content as
        confidential business data and apply the safeguards described below.
      </p>

      <h2>3. Legal basis</h2>
      <ul>
        <li>
          <strong>Performance of a contract</strong> (Art. 6(1)(b) GDPR) — to provide the
          Service to you and process the CMRs you submit.
        </li>
        <li>
          <strong>Legal obligation</strong> (Art. 6(1)(c)) — to keep accounting and tax records.
        </li>
        <li>
          <strong>Legitimate interest</strong> (Art. 6(1)(f)) — to secure the Service, prevent
          fraud and abuse, and improve reliability. We balance this against your rights.
        </li>
        <li>
          <strong>Consent</strong> (Art. 6(1)(a)) — for optional analytics and marketing
          communications, where applicable. You can withdraw consent at any time.
        </li>
      </ul>

      <h2>4. How we use the data</h2>
      <ul>
        <li>To extract structured fields from CMR images using AI vision models.</li>
        <li>To make extracted data available in your dashboard and exports.</li>
        <li>To generate PDF invoices and CSV / TMS exports you request.</li>
        <li>To authenticate users, prevent abuse and operate the Service.</li>
        <li>To send service-related notifications (security, billing, downtime).</li>
      </ul>
      <p>
        We do <strong>not</strong> sell personal data. We do not use your CMR data to train
        third-party AI models, and we do not allow our AI subprocessors to do so either.
      </p>

      <h2>5. Subprocessors</h2>
      <p>
        We rely on a limited number of subprocessors to operate the Service. Current
        subprocessors include:
      </p>
      <ul>
        <li>Cloud hosting and database in the European Union.</li>
        <li>Anthropic (Claude) for AI vision extraction, with zero data retention configured.</li>
        <li>Telegram for bot message delivery.</li>
        <li>A PCI-compliant payment processor for billing.</li>
        <li>Transactional email provider for account and billing notifications.</li>
      </ul>
      <p>
        An up-to-date list is available on request at
        {" "}<a href="mailto:privacy@cmrsync.com">privacy@cmrsync.com</a>. We sign a Data
        Processing Agreement (DPA) with each subprocessor and impose equivalent
        confidentiality and security obligations.
      </p>

      <h2>6. International transfers</h2>
      <p>
        Primary processing takes place in the European Union. Where a subprocessor processes
        data outside the EU/EEA (e.g. AI vision inference), the transfer is governed by
        Standard Contractual Clauses (SCCs) approved by the European Commission and
        supplementary technical measures (encryption in transit and at rest, pseudonymisation
        where feasible).
      </p>

      <h2>7. Security</h2>
      <ul>
        <li>TLS 1.2+ for all data in transit.</li>
        <li>AES-256 encryption at rest for stored CMR images and database backups.</li>
        <li>Role-based access control; access to production data limited to need-to-know.</li>
        <li>Secrets stored in a dedicated secrets manager; no plaintext credentials in code.</li>
        <li>Audit logging of administrative access.</li>
        <li>Regular backups with tested restore procedures.</li>
        <li>Vulnerability monitoring and dependency scanning.</li>
      </ul>
      <p>
        No system is fully immune to risk. In the event of a personal data breach, we will
        notify the competent supervisory authority within 72 hours where required and inform
        affected customers without undue delay.
      </p>

      <h2>8. Retention</h2>
      <ul>
        <li>
          <strong>CMR images and extracted data:</strong> retained for the duration of your
          subscription and for up to 12 months after termination so you can export records.
          You can request earlier deletion at any time, subject to legal retention obligations
          (e.g. tax law typically requires transport records to be kept for several years —
          retention periods are governed by your jurisdiction, not by us).
        </li>
        <li><strong>Account data:</strong> retained while your account is active.</li>
        <li>
          <strong>Billing records:</strong> retained for the period required by applicable
          accounting and tax law (typically 7–10 years).
        </li>
        <li><strong>Server logs:</strong> retained for up to 90 days.</li>
      </ul>

      <h2>9. Your rights</h2>
      <p>Under the GDPR you have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Have inaccurate data corrected.</li>
        <li>Have data erased ("right to be forgotten"), within the limits of law.</li>
        <li>Restrict or object to certain processing.</li>
        <li>Data portability — receive your data in a structured, machine-readable format.</li>
        <li>Withdraw consent at any time, where processing is based on consent.</li>
        <li>
          Lodge a complaint with your national supervisory authority. A list is maintained
          by the European Data Protection Board (edpb.europa.eu).
        </li>
      </ul>
      <p>
        To exercise these rights, email{" "}
        <a href="mailto:privacy@cmrsync.com">privacy@cmrsync.com</a>. We respond within 30 days.
      </p>

      <h2>10. Drivers' personal data</h2>
      <p>
        If you ask drivers to submit CMRs through our Telegram bot, you are responsible as the
        controller for informing them about the processing and for having a valid legal basis.
        We will provide a Data Processing Agreement (DPA) on request to formalise this
        relationship.
      </p>

      <h2>11. Cookies</h2>
      <p>
        Our website uses strictly necessary cookies required to operate the dashboard
        (authentication, session). We do not use advertising cookies. If we add analytics
        cookies in the future, we will request your consent first.
      </p>

      <h2>12. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy. Material changes will be notified by email or via
        the dashboard at least 30 days before they take effect.
      </p>

      <h2>13. Contact</h2>
      <p>
        Privacy questions: <a href="mailto:privacy@cmrsync.com">privacy@cmrsync.com</a>.<br />
        General contact: <a href="mailto:hello@cmrsync.com">hello@cmrsync.com</a>.
      </p>
    </LegalPage>
  );
}
