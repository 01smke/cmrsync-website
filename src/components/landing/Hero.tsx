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
                border: "1px solid rgba(200,255,0,0.3)",
                background: "rgba(200,255,0,0.08)",
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "#C8FF00", boxShadow: "0 0 10px #C8FF00" }}
              />
              <span
                style={{
                  color: "#C8FF00",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                From photo to invoice — in seconds
              </span>
            </div>

            {/* Headline split into lines */}
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

            {/* CTAs */}
            <div className="flex flex-wrap items-center" style={{ gap: 12, marginTop: 24 }}>
              <a href="#cta" className="btn-primary">
                Upload your first CMR free <ArrowRight size={16} />
              </a>
              <a href="#how" className="btn-ghost">
                See how it works →
              </a>
            </div>

            <p
              style={{
                fontSize: 12,
                opacity: 0.4,
                marginTop: 10,
                color: "#ffffff",
              }}
            >
              No credit card required · Setup in 2 minutes · Cancel anytime
            </p>
          </div>

          {/* RIGHT — VIDEO + TRUST PILLS */}
          <div className="w-full">
            <div
              className="relative aspect-video w-full overflow-hidden"
              style={{
                background: "#141414",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full"
                  style={{
                    background: "#C8FF00",
                    boxShadow: "0 0 40px rgba(200,255,0,0.5)",
                  }}
                >
                  <Play size={28} fill="#0a0a0a" color="#0a0a0a" style={{ marginLeft: 4 }} />
                </div>
                <div className="text-center">
                  <div
                    style={{
                      color: "#ffffff",
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                  >
                    Product demo coming soon
                  </div>
                  <div className="ui-label mt-2">Video placeholder</div>
                </div>
              </div>
            </div>

            {/* Trust pills under the video */}
            <div
              className="flex flex-wrap justify-center lg:justify-start"
              style={{ gap: 8, marginTop: 16 }}
            >
              {trustPills.map(({ Icon, label }) => (
                <span key={label} className="trust-pill">
                  <Icon size={13} strokeWidth={2} style={{ color: "#C8FF00" }} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* STATS BAR — 4 cards */}
        <div
          className="reveal grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: 8, marginTop: 48 }}
        >
          {stats.map((s) => (
            <div key={s.l} className="kpi-card">
              <div className="stat-num" style={{ fontSize: 42 }}>
                {s.v}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginTop: 6,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
