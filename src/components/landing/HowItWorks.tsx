import { IconTelegram, IconBolt, IconDashboard } from "./icons";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    Icon: IconTelegram,
    title: "Driver Snaps a Photo",
    body: "The driver photographs the CMR waybill and sends it to our Telegram bot. No app installs required.",
  },
  {
    Icon: IconBolt,
    title: "AI Extracts Every Field",
    body: "Claude Vision reads shipper, consignee, cargo, weights, dates and route — in under 3 seconds.",
  },
  {
    Icon: IconDashboard,
    title: "Data Hits Your Dashboard",
    body: "Structured records appear instantly. Export CSV, generate PDF invoices, build bundles.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="px-6 py-20 md:py-24"
      style={{ background: "#0B0D11", borderTop: "1px solid #2D3038", borderBottom: "1px solid #2D3038" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-12 max-w-2xl">
          <span className="ui-label">How it works</span>
          <h2 className="h-section mt-3">Three steps. Zero paperwork.</h2>
          <p className="body-copy mt-4">
            From a photo on a phone to clean structured data in your dashboard — automated end to end.
          </p>
        </div>

        <div className="flex flex-col items-stretch gap-4 lg:flex-row">
          {steps.map((s, i) => (
            <div key={s.title} className="contents lg:flex lg:flex-1 lg:items-stretch">
              <div
                className="reveal feature-card flex-1"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-lg"
                    style={{
                      background: "rgba(223,255,0,0.08)",
                      border: "1px solid rgba(223,255,0,0.18)",
                    }}
                  >
                    <s.Icon size={22} />
                  </div>
                  <span className="ui-label" style={{ color: "#6B7280" }}>
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className="font-display text-lg"
                  style={{ color: "#fff", fontWeight: 600, letterSpacing: "-0.02em" }}
                >
                  {s.title}
                </h3>
                <p className="body-copy mt-2 text-sm">{s.body}</p>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden items-center justify-center px-1 lg:flex">
                  <ArrowRight size={18} style={{ color: "#DFFF00", opacity: 0.6 }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
