import { ArrowRight, Play } from "lucide-react";


const trustItems = [
  "GDPR COMPLIANT",
  "PRINTED & HANDWRITTEN",
  "ANY LANGUAGE",
];

type StatDef = {
  l: string;
  kind: "count" | "fade";
  target?: number;
  suffix?: string;
  duration?: number;
  text?: string;
};

const stats: StatDef[] = [
  { l: "Avg extraction", kind: "count", target: 9, suffix: "s", duration: 1000 },
  { l: "Accuracy", kind: "count", target: 95, suffix: "%", duration: 1500 },
  { l: "CMRs / month", kind: "fade", text: "Unlimited" },
  { l: "Invoice generation", kind: "fade", text: "1-click" },
];

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

function AnimatedStat({ stat }: { stat: StatDef }) {
  return (
    <span
      className="font-display"
      style={{
        fontSize: 28,
        fontWeight: 900,
        color: "#ffffff",
        letterSpacing: "-0.04em",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {stat.kind === "count" ? `${stat.target}${stat.suffix ?? ""}` : stat.text}
    </span>
  );
}

export function Hero() {
  return (
    <section className="hero relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 md:pb-32 md:pt-28">
        <div className="grid items-center gap-10 lg:grid-cols-[45fr_55fr] lg:gap-16">
          {/* LEFT */}
          <div className="page-body" style={{ maxWidth: 560 }}>
            <h1
              className="h-hero hero-in hero-in-1"
              style={{
                fontSize: "clamp(36px, 5.2vw, 68px)",
                lineHeight: 1.05,
              }}
            >
              From CMR photo to invoice,
              <br />
              <span style={{ color: "#C8FF00" }}>instantly.</span>
            </h1>

            <p
              className="body-copy mt-5 hero-in hero-in-2 sm:mt-7"
              style={{ maxWidth: 520, lineHeight: 1.55, color: "rgba(255,255,255,0.6)" }}
            >
              <span className="text-base sm:text-[19px]">
                CMRSync reads your paper CMRs the moment your driver snaps a photo. Data extracted, fields organized, invoice ready — no typing, no chasing documents, no delays.
              </span>
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 hero-in hero-in-3 sm:mt-8">
              <a href="#cta" className="btn-primary">
                Start your free trial <ArrowRight size={18} />
              </a>
            </div>

            {/* Trust line — lime accent */}
            <p
              className="mt-4 hero-in hero-in-4 sm:mt-5"
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.6)",
                fontWeight: 500,
              }}
            >
              GDPR compliant · Printed & handwritten · Any language
            </p>
          </div>

          {/* RIGHT — VIDEO */}
          <div className="w-full hero-video-in">
            <div
              className="card relative w-full overflow-hidden"
              style={{
                aspectRatio: "16 / 9",
                background: "#141414",
                border: "1px solid rgba(200,255,0,0.15)",
                boxShadow:
                  "inset 0 0 60px rgba(0,0,0,0.4), 0 0 40px rgba(200,255,0,0.04), 0 30px 80px rgba(0,0,0,0.6)",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: "50%",
                    background: "#ffffff",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.55)",
                  }}
                >
                  <Play size={32} fill="#000000" color="#000000" style={{ marginLeft: 4 }} />
                </div>
                <div className="text-center">
                  <div
                    className="font-display"
                    style={{ color: "#ffffff", fontWeight: 600, letterSpacing: "-0.02em", fontSize: 22 }}
                  >
                    Product demo coming soon
                  </div>
                  <div className="ui-label mt-2" style={{ fontSize: 12 }}>Video placeholder</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider between hero and stats */}
        <div
          className="mt-12 sm:mt-16"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        />

        {/* STATS BAR — slim single bar */}
        <div
          className="mt-8 grid grid-cols-2 items-center gap-5 sm:mt-10 md:flex md:flex-wrap md:justify-between md:gap-5"
          style={{
            background: "#141414",
            border: "1px solid rgba(255,255,255,0.08)",
            borderLeft: "3px solid #C8FF00",
            borderRadius: 14,
            padding: "20px 20px",
            animation: "statsSlideIn 1800ms cubic-bezier(0.16, 1, 0.3, 1) 300ms both",
            willChange: "transform, opacity",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.l}
              className="flex items-center gap-3 md:flex-1 md:gap-4"
              style={{
                whiteSpace: "nowrap",
              }}
            >
              <AnimatedStat stat={s} />
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.45)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
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
