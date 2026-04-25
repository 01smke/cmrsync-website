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
    Icon: IconAIVision,
    title: "No more manual entry",
    body: "Stop paying someone to type CMR data into spreadsheets. CMRSync does it in seconds, at 95% accuracy, round the clock.",
  },
  {
    Icon: IconTelegram,
    title: "Works with any CMR",
    body: "Printed, handwritten, smudged, crumpled. If your driver can photograph it, CMRSync can read it.",
  },
  {
    Icon: IconShield,
    title: "Smart flagging",
    body: "Every field CMRSync isn't certain about gets flagged for a one-click human review. You catch errors before they become disputes.",
  },
  {
    Icon: IconInvoice,
    title: "Bulk invoicing",
    body: "Run 50 loads in a week? Select them all, generate one invoice per client. Done in the time it used to take to open Excel.",
  },
  {
    Icon: IconExport,
    title: "Full document archive",
    body: "Every CMR stored, searchable, and exportable. Audit-ready at any time.",
  },
  {
    Icon: IconDashboard,
    title: "Works for carriers and forwarders",
    body: "Whether you're billing direct to the shipper or managing client accounts as a forwarder — CMRSync handles both invoice structures.",
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
