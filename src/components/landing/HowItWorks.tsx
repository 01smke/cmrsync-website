import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "Driver takes a photo",
    body: "After every load, your driver photographs the signed CMR from their phone. No scanner. No app training. Just a photo.",
  },
  {
    title: "CMRSync reads it",
    body: "Every field extracted automatically in under 9 seconds. Consignor, consignee, goods, weight, route, dates — organized and ready. Low-confidence fields flagged for review.",
  },
  {
    title: "One click to invoice",
    body: "Select one or more CMRs, hit generate. A ready-to-send invoice is built from the shipment data instantly. Works for carriers and freight forwarders.",
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeSteps, setActiveSteps] = useState<boolean[]>(() =>
    steps.map(() => false)
  );
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          setActiveSteps((prev) => {
            if (prev[i] === entry.isIntersecting) return prev;
            const next = [...prev];
            next[i] = entry.isIntersecting;
            return next;
          });
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when container top hits viewport bottom, 1 when container bottom passes viewport mid
      const total = rect.height + vh * 0.5;
      const scrolled = vh - rect.top;
      const pct = Math.max(0, Math.min(1, scrolled / total));
      setFillHeight(pct * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="how"
      className="px-4 py-14 backdrop-blur-md sm:px-6 sm:py-20 md:py-24"
      style={{
        background: "rgba(15, 17, 21, 0.78)",
        borderTop: "1px solid #2D3038",
        borderBottom: "1px solid #2D3038",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal mx-auto mb-8 max-w-2xl text-center sm:mb-12">
          <span className="ui-label">How it works</span>
          <h2 className="h-section mt-3">Three steps from paper to paid.</h2>
        </div>

        <div ref={containerRef} className="relative mx-auto max-w-5xl">
          {/* Base vertical track */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 sm:left-12"
            style={{
              top: 0,
              bottom: 0,
              width: 1,
              background: "rgba(255,255,255,0.08)",
            }}
          />
          {/* Animated lime fill */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 sm:left-12"
            style={{
              top: 0,
              width: 1,
              height: `${fillHeight}%`,
              background: "#C8FF00",
              transition: "height 0.2s linear",
              boxShadow: "0 0 8px rgba(200,255,0,0.5)",
            }}
          />

          {steps.map((s, i) => {
            const active = activeSteps[i];
            return (
              <div
                key={s.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="relative flex flex-col items-start gap-3 pl-12 sm:gap-6 sm:pl-0 md:flex-row md:items-center"
                style={{
                  padding: "24px 0 24px 48px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  opacity: active ? 1 : 0,
                  transform: active ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.5s ease ${i * 150}ms, transform 0.5s ease ${i * 150}ms`,
                }}
              >
                {/* Lime dot on the track */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-6 sm:left-12"
                  style={{
                    marginLeft: -4,
                    top: 36,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#C8FF00",
                    opacity: active ? 1 : 0.2,
                    boxShadow: active ? "0 0 12px rgba(200,255,0,0.6)" : "none",
                    transition: "opacity 0.6s ease, box-shadow 0.6s ease",
                  }}
                />

                <div
                  className="font-display text-5xl md:text-7xl"
                  style={{
                    fontWeight: 900,
                    letterSpacing: "-0.05em",
                    lineHeight: 1,
                    minWidth: 80,
                    color: active
                      ? "rgba(200,255,0,0.3)"
                      : "rgba(255,255,255,0.06)",
                    transition: "color 0.6s ease",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm md:text-[14px]"
                  style={{
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.5)",
                    maxWidth: 420,
                    margin: 0,
                  }}
                >
                  {s.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
