import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

function AnimatedStat({ stat, triggered, delay }: { stat: StatDef; triggered: boolean; delay: number }) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!triggered) return;
    const timeout = setTimeout(() => {
      setStarted(true);
      if (stat.kind === "count" && stat.target != null && stat.duration) {
        const startTime = performance.now();
        const duration = stat.duration;
        const target = stat.target;
        let raf = 0;
        const tick = (now: number) => {
          const elapsed = now - startTime;
          const t = Math.min(elapsed / duration, 1);
          setValue(Math.round(easeOutQuart(t) * target));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [triggered, delay, stat]);

  const display =
    stat.kind === "count"
      ? `${value}${stat.suffix ?? ""}`
      : stat.text ?? "";

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
        opacity: started ? 1 : 0,
        transition: "opacity 800ms ease-out",
      }}
    >
      {display}
    </span>
  );
}

export function Hero() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTriggered(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-[45fr_55fr] lg:gap-16">
          {/* LEFT */}
          <div className="page-body" style={{ maxWidth: 560 }}>
            <h1
              className="h-hero"
              style={{
                fontSize: "clamp(48px, 5.2vw, 68px)",
                lineHeight: 1.05,
              }}
            >
              From CMR photo to invoice,
              <br />
              <span style={{ color: "#C8FF00" }}>instantly.</span>
            </h1>

            <p
              className="body-copy mt-7"
              style={{ maxWidth: 520, fontSize: 19, lineHeight: 1.55, color: "rgba(255,255,255,0.6)" }}
            >
              CMRSync reads your paper CMRs the moment your driver snaps a photo. Data extracted, fields organized, invoice ready — no typing, no chasing documents, no delays.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#cta"
                className="btn-primary"
                style={{
                  fontSize: "1.05rem",
                  padding: "14px 32px",
                  background: "#ffffff",
                  color: "#000000",
                  letterSpacing: "-0.02em",
                }}
              >
                Start your free trial <ArrowRight size={18} />
              </a>
            </div>

            {/* Trust line — lime accent */}
            <p
              className="mt-5"
              style={{
                fontSize: 12,
                color: "#C8FF00",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              GDPR compliant · Printed & handwritten · Any language
            </p>
          </div>

          {/* RIGHT — VIDEO */}
          <div className="w-full">
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
          className="mt-16"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        />

        {/* STATS BAR — slim single bar */}
        <div
          ref={statsRef}
          className="reveal mt-10 flex flex-wrap items-center"
          style={{
            background: "#141414",
            border: "1px solid rgba(255,255,255,0.08)",
            borderLeft: "3px solid #C8FF00",
            borderRadius: 14,
            padding: "28px 48px",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.l}
              className="flex flex-1 items-center gap-4"
              style={{
                minWidth: 160,
                whiteSpace: "nowrap",
                paddingLeft: i === 0 ? 0 : 32,
                borderLeft:
                  i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <AnimatedStat stat={s} triggered={triggered} delay={i * 150} />
              <span
                style={{
                  fontSize: 12,
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
