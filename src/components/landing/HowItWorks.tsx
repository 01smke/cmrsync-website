import { Send, Sparkles, LayoutDashboard, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Send,
    title: "Driver Snaps a Photo",
    body: "The driver photographs the CMR waybill and sends it to our Telegram bot. No app installs needed.",
  },
  {
    icon: Sparkles,
    title: "AI Extracts Every Field",
    body: "Claude Vision reads shipper, consignee, cargo, weights, dates and route — in under 3 seconds.",
  },
  {
    icon: LayoutDashboard,
    title: "Data Hits Your Dashboard",
    body: "Structured records appear instantly. Export CSV, generate PDF invoices, build bundles — all from one place.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-16 max-w-2xl">
          <span className="font-body text-xs uppercase tracking-[0.2em]" style={{ color: "#DFFF00" }}>
            How it works
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
            Three steps. Zero paperwork.
          </h2>
          <p className="mt-4 font-body" style={{ color: "#9CA3AF", lineHeight: 1.65 }}>
            From a photo on a phone to clean structured data in your dashboard — automated end to end.
          </p>
        </div>

        <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-center">
          {steps.map((s, i) => (
            <div key={s.title} className="contents lg:flex lg:flex-1 lg:items-center">
              <div
                className="reveal surface-card flex-1"
                style={{ padding: "28px", transitionDelay: `${i * 80}ms` }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-lg"
                    style={{
                      background: "rgba(223,255,0,0.1)",
                      border: "1px solid rgba(223,255,0,0.25)",
                    }}
                  >
                    <s.icon size={20} style={{ color: "#DFFF00" }} />
                  </div>
                  <span
                    className="font-display text-xs font-bold"
                    style={{ color: "#6B7280", letterSpacing: "0.1em" }}
                  >
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-3 font-body text-sm" style={{ color: "#9CA3AF", lineHeight: 1.65 }}>
                  {s.body}
                </p>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden items-center px-2 lg:flex">
                  <div className="h-px w-10" style={{ background: "#2D3038" }} />
                  <ArrowRight size={18} style={{ color: "#DFFF00" }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
