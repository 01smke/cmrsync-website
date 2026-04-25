import { IconTelegram, IconBolt, IconDashboard } from "./icons";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    Icon: IconTelegram,
    title: "Driver takes a photo",
    body: "After every load, your driver photographs the signed CMR — from their phone, in under 10 seconds. No scanner. No app training. Just a photo.",
  },
  {
    Icon: IconBolt,
    title: "CMRSync reads it",
    body: "Our AI extracts every field automatically. Consignor, consignee, goods, weight, route, dates — all organized and ready to review in under 8 seconds. Low-confidence fields are flagged so nothing slips through.",
  },
  {
    Icon: IconDashboard,
    title: "One button to invoice",
    body: "Select one or more CMRs, hit generate. CMRSync bundles the shipment data and produces a ready-to-send invoice. Whether you're a carrier billing a shipper or a freight forwarder invoicing your client — it works the same way.",
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
          <h2 className="h-section mt-3">Three steps from paper to paid.</h2>
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
