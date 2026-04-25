import { ArrowRight, Play, Lock, FileText, Globe, Zap } from "lucide-react";

const trustPills = [
  { Icon: Lock, label: "GDPR Compliant" },
  { Icon: FileText, label: "Printed & handwritten" },
  { Icon: Globe, label: "Any EU language" },
  { Icon: Zap, label: "No setup required" },
];

const stats = [
  { v: "9s", l: "Avg extraction" },
  { v: "95%", l: "Accuracy" },
  { v: "∞", l: "CMRs / month" },
  { v: "1-click", l: "Invoice generation" },
];

export function Hero() {
  return (
    <section className="hero relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-14 pt-12 md:pb-16 md:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          {/* LEFT */}
          <div className="page-body max-w-2xl">
            {/* Eyebrow pill */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{
                border: "1px solid rgba(223,255,0,0.3)",
                background: "rgba(223,255,0,0.08)",
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "#DFFF00", boxShadow: "0 0 10px #DFFF00" }}
              />
              <span className="ui-label">From photo to invoice — in seconds</span>
            </div>

            <h1 className="h-hero mt-6">
              From CMR photo
              <br />
              to invoice,
              <br />
              instantly.
            </h1>

            <p className="body-copy mt-5" style={{ maxWidth: 480 }}>
              CMRSync reads your paper CMRs the moment your driver snaps a photo. Data extracted, fields organized, invoice ready — no typing, no chasing documents, no delays.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#cta" className="btn-primary">
                Upload your first CMR free <ArrowRight size={16} />
              </a>
              <a href="#how" className="btn-ghost">
                See how it works →
              </a>
            </div>

            <p className="mt-3 text-xs" style={{ color: "#6B7280" }}>
              No credit card required · Setup in 2 minutes · Cancel anytime
            </p>
          </div>

          {/* RIGHT — VIDEO + TRUST PILLS */}
          <div className="w-full">
            <div
              className="card relative aspect-video w-full overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #14171E 0%, #0A0C10 100%)",
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(223,255,0,0.06), 0 0 0 1px rgba(255,255,255,0.04) inset",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full"
                  style={{
                    background: "#DFFF00",
                    boxShadow: "0 0 40px rgba(223,255,0,0.5), 0 8px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  <Play size={28} fill="#0a0a0a" color="#0a0a0a" style={{ marginLeft: 4 }} />
                </div>
                <div className="text-center">
                  <div
                    className="font-display text-lg"
                    style={{ color: "#ffffff", fontWeight: 600, letterSpacing: "-0.02em" }}
                  >
                    Product demo coming soon
                  </div>
                  <div className="ui-label mt-2" style={{ color: "#6B7280" }}>
                    Video placeholder
                  </div>
                </div>
              </div>
              {/* Subtle grid overlay */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
            </div>

            {/* Trust pills under the video */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
              {trustPills.map(({ Icon, label }) => (
                <span key={label} className="trust-pill">
                  <Icon size={13} strokeWidth={2} style={{ color: "#DFFF00" }} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* STATS BAR — 4 cards */}
        <div className="reveal mt-12 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="kpi-card">
              <div className="stat-num" style={{ fontSize: 42 }}>
                {s.v}
              </div>
              <div className="ui-label mt-1.5" style={{ color: "#9CA3AF" }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
