import { ArrowRight, Play } from "lucide-react";

const trustItems = [
  "GDPR Compliant",
  "Printed & handwritten",
  "Any EU language",
  "No setup required",
];

const stats = [
  { v: "9s", l: "Avg extraction" },
  { v: "95%", l: "Accuracy" },
  { v: "Unlimited", l: "CMRs / month" },
  { v: "1-click", l: "Invoice generation" },
];

export function Hero() {
  return (
    <section className="hero relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-12 md:pb-16 md:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          {/* LEFT */}
          <div className="page-body max-w-2xl">
            <h1 className="h-hero">
              From CMR photo
              <br />
              to invoice,
              <br />
              <span style={{ color: "#C8FF00" }}>instantly.</span>
            </h1>

            <p className="body-copy mt-3" style={{ maxWidth: 480 }}>
              CMRSync reads your paper CMRs the moment your driver snaps a photo. Data extracted, fields organized, invoice ready — no typing, no chasing documents, no delays.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a href="#cta" className="btn-primary">
                Upload your first CMR free <ArrowRight size={16} />
              </a>
              <a href="#how" className="btn-ghost">
                See how it works →
              </a>
            </div>

            {/* Trust line — plain text */}
            <p
              className="mt-3"
              style={{
                fontSize: 12,
                color: "#C8FF00",
                letterSpacing: "0.01em",
                fontWeight: 600,
              }}
            >
              {trustItems.join(" · ")}
            </p>
          </div>

          {/* RIGHT — VIDEO */}
          <div className="w-full">
            <div
              className="card relative w-full overflow-hidden"
              style={{
                aspectRatio: "16 / 9",
                background: "#141414",
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "#ffffff",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  <Play size={24} fill="#000000" color="#000000" style={{ marginLeft: 3 }} />
                </div>
                <div className="text-center">
                  <div
                    className="font-display text-lg"
                    style={{ color: "#ffffff", fontWeight: 600, letterSpacing: "-0.02em" }}
                  >
                    Product demo coming soon
                  </div>
                  <div className="ui-label mt-2">Video placeholder</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS BAR — slim single bar */}
        <div
          className="reveal mt-12 flex flex-wrap items-center"
          style={{
            background: "#141414",
            border: "1px solid rgba(255,255,255,0.08)",
            borderLeft: "3px solid #C8FF00",
            borderRadius: 12,
            padding: "20px 40px",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.l}
              className="flex flex-1 items-baseline gap-3"
              style={{
                minWidth: 180,
                paddingLeft: i === 0 ? 0 : 24,
                borderLeft:
                  i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span
                className="font-display"
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {s.v}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
