import { Check } from "lucide-react";

const features = [
  "Unlimited CMRs per truck",
  "WhatsApp, Viber or Telegram driver intake",
  "Live dashboard & search",
  "PDF invoice generator (branded)",
  "CSV / TMS / accounting export",
  "EU-hosted & GDPR-compliant",
  "24/7 support",
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="px-6 py-20 backdrop-blur-md md:py-24"
      style={{ background: "rgba(15, 17, 21, 0.78)", borderTop: "1px solid #2D3038", borderBottom: "1px solid #2D3038" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal mx-auto mb-12 max-w-2xl text-center">
          <span className="ui-label">Pricing</span>
          <h2 className="h-section mt-3">One simple price.</h2>
          <p className="body-copy mx-auto mt-4 max-w-lg">
            No setup fees. No per-document charges. Scale with your fleet — pay only for the trucks you run.
          </p>
        </div>

        <div className="reveal mx-auto max-w-md">
          <div className="card-featured" style={{ padding: "32px" }}>
            <div className="flex items-center justify-between">
              <h3
                className="font-display text-2xl"
                style={{ color: "#fff", fontWeight: 700, letterSpacing: "-0.03em" }}
              >
                CMRsync
              </h3>
              <span
                className="rounded-full px-3 py-1 text-[10px]"
                style={{
                  background: "#DFFF00",
                  color: "#0a0a0a",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                All-in-one
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="stat-num" style={{ fontSize: "56px", color: "#ffffff" }}>
                €30
              </span>
              <span className="text-sm" style={{ color: "#9CA3AF" }}>
                / truck / month
              </span>
            </div>
            <p className="mt-2 text-xs" style={{ color: "#6B7280" }}>
              Billed monthly. Cancel anytime. VAT excluded.
            </p>

            <div
              className="my-7"
              style={{ height: 1, background: "#2D3038" }}
            />

            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ background: "rgba(223,255,0,0.15)", border: "1px solid rgba(223,255,0,0.3)" }}
                  >
                    <Check size={12} style={{ color: "#DFFF00" }} strokeWidth={3} />
                  </span>
                  <span className="text-sm" style={{ color: "#E5E7EB" }}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <a href="#cta" className="btn-primary mt-8 w-full">
              Start Free Trial
            </a>
            <p className="mt-3 text-center text-xs" style={{ color: "#6B7280" }}>
              14-day free trial · No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
