import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="hero relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-14 pt-12 md:pb-16 md:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* HEADLINE */}
        <div className="page-body max-w-2xl text-center lg:text-left">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ border: "1px solid #2D3038", background: "rgba(28,30,36,0.6)" }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "#DFFF00", boxShadow: "0 0 10px #DFFF00" }}
            />
            <span className="ui-label" style={{ color: "#DFFF00" }}>
              From photo to invoice — in seconds
            </span>
          </div>

          <h1 className="h-hero mt-6">
            Your CMR paperwork, done before the truck leaves the yard.
          </h1>

          <p className="body-copy mx-auto mt-5 max-w-xl text-base">
            CMRSync reads your paper CMRs the moment your driver snaps a photo. Data extracted, fields organized, invoice ready — no typing, no chasing documents, no delays.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a href="#cta" className="btn-primary">
              Upload your first CMR free <ArrowRight size={16} />
            </a>
            <a href="#how" className="btn-ghost">
              See how it works →
            </a>
          </div>

          <p className="mt-5 text-xs" style={{ color: "#9CA3AF" }}>
            Used by carriers and freight forwarders across Europe · 95% extraction accuracy
          </p>
        </div>

        {/* VIDEO SHOWCASE */}
        <div className="max-w-3xl">
          <div
            className="card relative aspect-video w-full overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #14171E 0%, #0A0C10 100%)",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(223,255,0,0.06), 0 0 0 1px rgba(255,255,255,0.04) inset",
            }}
          >
            {/* Replace this block with your <video> tag when ready */}
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
        </div>
        </div>

        {/* KPI ROW */}
        <div className="reveal mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4">
          {[
            { v: "9s", l: "Avg extraction" },
            { v: "Unlimited", l: "CMRs / month" },
          ].map((s) => (
            <div key={s.l} className="kpi-card">
              <div className="stat-num text-3xl">{s.v}</div>
              <div className="ui-label mt-2" style={{ color: "#9CA3AF" }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
