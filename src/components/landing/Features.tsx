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
    body: "Filter, search, sort, and stage every shipment in a clean dark interface.",
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
      style={{ borderTop: "1px solid #2D3038", background: "#0B0D11" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-16 max-w-2xl">
          <span className="font-body text-xs uppercase tracking-[0.2em]" style={{ color: "#DFFF00" }}>
            Features
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
            Everything a logistics team needs.
          </h2>
          <p className="mt-4 font-body" style={{ color: "#9CA3AF", lineHeight: 1.65 }}>
            Replace the inbox, the spreadsheet, the manual rekeying — with one streamlined workflow.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="reveal surface-card group transition-all duration-300"
              style={{
                padding: "24px",
                transitionDelay: `${i * 60}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(223,255,0,0.4)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#2D3038";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: "rgba(223,255,0,0.1)" }}
              >
                <f.icon size={20} style={{ color: "#DFFF00" }} />
              </div>
              <h3 className="font-display text-lg font-bold text-white">{f.title}</h3>
              <p className="mt-2 font-body text-sm" style={{ color: "#9CA3AF", lineHeight: 1.6 }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
