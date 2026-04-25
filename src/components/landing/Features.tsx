import {
  MessageSquare,
  Eye,
  LayoutDashboard,
  FileText,
  FileSpreadsheet,
  Settings,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Telegram Bot Intake",
    body: "Drivers need zero training. One chat message is all it takes.",
  },
  {
    icon: Eye,
    title: "Claude AI Vision",
    body: "State-of-the-art extraction accuracy for messy, handwritten, multilingual CMRs.",
  },
  {
    icon: LayoutDashboard,
    title: "Live Dashboard",
    body: "Filter, search, sort, and stage every shipment in a clean interface.",
  },
  {
    icon: FileText,
    title: "PDF Invoice Generator",
    body: "Generate branded invoices per CMR or as a bundle with one click.",
  },
  {
    icon: FileSpreadsheet,
    title: "CSV Export",
    body: "Push data to Excel, your TMS, or accounting software instantly.",
  },
  {
    icon: Settings,
    title: "Settings & Branding",
    body: "Add your logo, bank details, VAT number — invoices look like yours.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="px-6 py-24 md:py-32"
      style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)", background: "#ffffff" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-16 max-w-2xl">
          <span className="ui-label">Features</span>
          <h2 className="h-section mt-4">Everything a logistics team needs.</h2>
          <p className="body-copy mt-5">
            Replace the inbox, the spreadsheet, the manual rekeying — with one streamlined workflow.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="reveal surface-card"
              style={{
                padding: "28px",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <div
                className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: "#0a0a0a" }}
              >
                <f.icon size={18} style={{ color: "#ffffff" }} />
              </div>
              <h3 className="card-title text-lg">{f.title}</h3>
              <p className="body-copy mt-2 text-[15px]">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
