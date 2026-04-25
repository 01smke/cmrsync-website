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
    <section id="pricing" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-16 text-center">
          <span className="font-body text-xs uppercase tracking-[0.2em]" style={{ color: "#DFFF00" }}>
            Pricing
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
            Simple, honest pricing.
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl font-body"
            style={{ color: "#9CA3AF", lineHeight: 1.65 }}
          >
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
                  border: "2px solid #DFFF00",
                  boxShadow: "0 0 32px rgba(223,255,0,0.12)",
                }),
              }}
            >
              {t.highlight && (
                <span
                  className="absolute -top-3 right-6 rounded-full px-3 py-1 font-body text-[0.7rem] font-bold"
                  style={{
                    background: "#DFFF00",
                    color: "#000",
                    boxShadow: "0 0 20px rgba(223,255,0,0.4)",
                  }}
                >
                  MOST POPULAR
                </span>
              )}

              <h3 className="font-display text-xl font-bold text-white">{t.name}</h3>
              <p className="mt-1 font-body text-sm" style={{ color: "#9CA3AF" }}>
                {t.desc}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold text-white">{t.price}</span>
                {t.period && (
                  <span className="font-body text-sm" style={{ color: "#9CA3AF" }}>
                    {t.period}
                  </span>
                )}
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check size={18} style={{ color: "#DFFF00", flexShrink: 0, marginTop: 2 }} />
                    <span className="font-body text-sm text-white">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`mt-8 w-full text-center ${t.highlight ? "btn-primary" : "btn-ghost"}`}
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
