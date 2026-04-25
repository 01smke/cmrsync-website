import {
  IconTelegram,
  IconAIVision,
  IconDashboard,
  IconInvoice,
  IconExport,
  IconShield,
} from "./icons";

const features = [
  {
    Icon: IconTelegram,
    title: "Telegram Bot Intake",
    body: "Drivers need zero training. One chat message is all it takes.",
  },
  {
    Icon: IconAIVision,
    title: "Claude AI Vision",
    body: "State-of-the-art accuracy on messy, handwritten and multilingual CMRs.",
  },
  {
    Icon: IconDashboard,
    title: "Live Dashboard",
    body: "Filter, search, sort and stage every shipment in a clean interface.",
  },
  {
    Icon: IconInvoice,
    title: "PDF Invoice Generator",
    body: "Generate branded invoices per CMR or as a bundle with one click.",
  },
  {
    Icon: IconExport,
    title: "CSV & TMS Export",
    body: "Push data to Excel, your TMS or accounting software instantly.",
  },
  {
    Icon: IconShield,
    title: "EU-Hosted & Encrypted",
    body: "Your CMR data is encrypted at rest, GDPR-compliant and stored in the EU.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="px-6 py-20 md:py-24"
      style={{ background: "#0F1115" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-12 max-w-2xl">
          <span className="ui-label">Features</span>
          <h2 className="h-section mt-3">Everything a logistics team needs.</h2>
          <p className="body-copy mt-4">
            Replace the inbox, the spreadsheet and the manual rekeying — with one streamlined workflow.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="reveal feature-card"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div
                className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg"
                style={{
                  background: "rgba(223,255,0,0.08)",
                  border: "1px solid rgba(223,255,0,0.18)",
                }}
              >
                <f.Icon size={22} />
              </div>
              <h3
                className="font-display text-[17px]"
                style={{ color: "#fff", fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                {f.title}
              </h3>
              <p className="body-copy mt-2 text-sm">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
