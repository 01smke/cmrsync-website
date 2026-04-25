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
    <section id="how" className="px-6 py-24 md:py-32" style={{ background: "#ffffff" }}>
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-16 max-w-2xl">
          <span className="ui-label">How it works</span>
          <h2 className="h-section mt-4">Three steps. Zero paperwork.</h2>
          <p className="body-copy mt-5">
            From a photo on a phone to clean structured data in your dashboard — automated end to end.
          </p>
        </div>

        <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-stretch">
          {steps.map((s, i) => (
            <div key={s.title} className="contents lg:flex lg:flex-1 lg:items-stretch">
              <div
                className="reveal surface-card flex-1"
                style={{ padding: "28px", transitionDelay: `${i * 80}ms` }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-lg"
                    style={{ background: "#0a0a0a" }}
                  >
                    <s.icon size={20} style={{ color: "#ffffff" }} />
                  </div>
                  <span className="ui-label">Step {String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="card-title text-xl">{s.title}</h3>
                <p className="body-copy mt-3 text-[15px]">{s.body}</p>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden items-center justify-center px-2 lg:flex">
                  <ArrowRight size={18} style={{ color: "#0a0a0a", opacity: 0.3 }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
