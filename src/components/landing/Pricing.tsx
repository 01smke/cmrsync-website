import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "€49",
    period: "/mo",
    desc: "For small fleets getting started.",
    features: ["Up to 200 CMRs/month", "1 user", "Telegram bot", "Dashboard"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "€129",
    period: "/mo",
    desc: "For growing logistics teams.",
    features: ["Unlimited CMRs", "5 users", "PDF invoices", "CSV export", "Bundle invoicing"],
    cta: "Get Started",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large operations & integrators.",
    features: ["White-label", "Custom integrations", "Dedicated support", "SLA"],
    cta: "Contact Sales",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="px-6 py-24 md:py-32"
      style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)", background: "#ffffff" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-16 max-w-2xl">
          <span className="ui-label">Pricing</span>
          <h2 className="h-section mt-4">Simple, honest pricing.</h2>
          <p className="body-copy mt-5">
            No setup fees. No per-document charges. Cancel anytime.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              className="reveal surface-card relative flex flex-col"
              style={{
                padding: "32px",
                transitionDelay: `${i * 80}ms`,
                ...(t.highlight && {
                  background: "#0a0a0a",
                }),
              }}
            >
              {t.highlight && (
                <span
                  className="absolute -top-3 left-8 rounded-full px-3 py-1 text-[10px]"
                  style={{
                    background: "#C4F542",
                    color: "#0a0a0a",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Most Popular
                </span>
              )}

              <h3
                className="card-title text-xl"
                style={{ color: t.highlight ? "#ffffff" : "#0a0a0a" }}
              >
                {t.name}
              </h3>
              <p
                className="mt-1.5 text-sm"
                style={{
                  color: t.highlight ? "#ffffff" : "#0a0a0a",
                  opacity: 0.6,
                }}
              >
                {t.desc}
              </p>

              <div className="mt-7 flex items-baseline gap-1">
                <span
                  className="stat-num"
                  style={{
                    fontSize: "44px",
                    color: t.highlight ? "#ffffff" : "#0a0a0a",
                  }}
                >
                  {t.price}
                </span>
                {t.period && (
                  <span
                    className="text-sm"
                    style={{ color: t.highlight ? "#ffffff" : "#0a0a0a", opacity: 0.6 }}
                  >
                    {t.period}
                  </span>
                )}
              </div>

              <ul className="mt-8 flex-1 space-y-3.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      size={16}
                      style={{
                        color: t.highlight ? "#C4F542" : "#0a0a0a",
                        flexShrink: 0,
                        marginTop: 4,
                      }}
                    />
                    <span
                      className="text-[15px]"
                      style={{ color: t.highlight ? "#ffffff" : "#0a0a0a", opacity: 0.85 }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`mt-8 w-full text-center ${t.highlight ? "btn-accent" : "btn-primary"}`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
