import { ArrowRight } from "lucide-react";
import { CmrScanWidget } from "./CmrScanWidget";


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
      className="font-display text-[20px] sm:text-[28px]"
      style={{
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
    <section id="hero" className="hero relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 pb-4 pt-3 sm:px-6 sm:pb-20 sm:pt-16 md:pb-32 md:pt-28">
        <div className="grid items-center gap-3 sm:gap-6 lg:grid-cols-[45fr_55fr] lg:gap-16">
          {/* LEFT */}
          <div className="page-body" style={{ maxWidth: 560 }}>
            <h1
              className="h-hero hero-in hero-in-1"
              style={{
                fontSize: "clamp(30px, 5.2vw, 68px)",
                lineHeight: 1.05,
              }}
            >
              From CMR photo to invoice,
              <br />
              <span style={{ color: "#C8FF00" }}>instantly.</span>
            </h1>

            <p
              className="body-copy mt-2 hero-in hero-in-2 sm:mt-7"
              style={{ maxWidth: 520, lineHeight: 1.5, color: "rgba(255,255,255,0.6)" }}
            >
              <span className="text-sm sm:text-[19px]">
                CMRSync reads your paper CMRs the moment your driver snaps a photo. Data extracted, fields organized, invoice ready — no typing, no chasing documents, no delays.
              </span>
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4 hero-in hero-in-3 sm:mt-8">
              <button
                className="btn-primary btn-primary-glow"
                data-cal-link="cmrsync/onboarding-call"
                data-cal-namespace="onboarding-call"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              >
                Start your free trial <ArrowRight size={18} />
              </button>
            </div>

            {/* Trust line — lime accent */}
            <p
              className="mt-2 hero-in hero-in-4 sm:mt-5"
              style={{
                fontSize: 11,
                color: "#ffffff",
                fontWeight: 500,
              }}
            >
              GDPR compliant · Printed & handwritten · Any language
            </p>
          </div>

          {/* RIGHT — CMR SCAN WIDGET */}
          <div className="w-full hero-video-in">
            <div
              className="p-4 sm:p-5"
              style={{
                background: "rgba(20,20,20,0.6)",
                border: "1px solid rgba(200,255,0,0.12)",
                borderRadius: 16,
                boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(200,255,0,0.04)",
              }}
            >
              <div className="mb-2 sm:mb-3.5">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    border: "1px solid rgba(223,255,0,0.3)",
                    background: "rgba(223,255,0,0.07)",
                    color: "#DFFF00",
                    borderRadius: 999,
                    padding: "4px 12px",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  Try it for free
                </span>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 4,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Scan your first CMR now
                </h3>
                <p style={{ fontSize: "0.8rem", color: "#9CA3AF", lineHeight: 1.5 }}>
                  Drop any CMR photo — AI reads every field instantly.
                </p>
              </div>
              <CmrScanWidget />
            </div>
          </div>
        </div>

        {/* Divider between hero and stats */}
        <div
          className="hidden sm:block mt-16"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        />

        {/* STATS BAR — hidden on mobile, single row on desktop */}
        <div
          className="hidden sm:grid sm:mt-10 grid-cols-2 items-center gap-x-3 gap-y-4 md:flex md:flex-wrap md:justify-between md:gap-5"
          style={{
            background: "#141414",
            border: "1px solid rgba(255,255,255,0.08)",
            borderLeft: "3px solid #C8FF00",
            borderRadius: 14,
            padding: "16px 16px",
            animation: "statsSlideIn 1800ms cubic-bezier(0.16, 1, 0.3, 1) 300ms both",
            willChange: "transform, opacity",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.l}
              className="flex min-w-0 items-center gap-2 sm:gap-3 md:flex-1 md:gap-4"
            >
              <AnimatedStat stat={s} />
              <span
                className="text-[10px] sm:text-[11px]"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                  lineHeight: 1.2,
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
