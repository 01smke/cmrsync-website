import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "No manual entry",
    body: "Stop paying someone to type CMR data into spreadsheets. CMRSync does it in seconds, 24/7.",
  },
  {
    title: "Works on any CMR",
    body: "Printed, handwritten, smudged, crumpled. If your driver can photograph it, CMRSync can read it.",
  },
  {
    title: "Smart flagging",
    body: "Every uncertain field gets flagged for one-click human review. Catch errors before they become disputes.",
  },
  {
    title: "Bulk invoicing",
    body: "50 loads this week? Select them all, generate per client. Done before you'd finish opening Excel.",
  },
  {
    title: "Full document archive",
    body: "Every CMR stored, searchable, exportable. Audit-ready at any time.",
  },
  {
    title: "Carriers & forwarders",
    body: "Whether billing direct to the shipper or managing client accounts — CMRSync handles both invoice structures.",
  },
];

function FeatureCard({
  title,
  body,
  index,
  visible,
  featured,
}: {
  title: string;
  body: string;
  index: number;
  visible: boolean;
  featured: boolean;
}) {
  const [hover, setHover] = useState(false);

  const titleColor = featured ? "#C8FF00" : "#ffffff";

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="px-4 py-4 sm:px-[22px] sm:py-6"
      style={{
        background: hover ? "#161616" : "#111111",
        border: "none",
        borderTop: `2px solid ${featured ? "#C8FF00" : "rgba(255,255,255,0.12)"}`,
        borderRadius: 14,
        boxShadow: hover
          ? featured
            ? "0 0 0 1px rgba(200,255,0,0.2), 0 8px 24px rgba(0,0,0,0.4)"
            : "0 0 0 1px rgba(255,255,255,0.12), 0 8px 24px rgba(0,0,0,0.4)"
          : "0 0 0 1px rgba(255,255,255,0.07)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hover
            ? "translateY(-3px)"
            : "translateY(0)"
          : "translateY(20px)",
        transition: visible
          ? "all 0.2s ease"
          : `all 0.5s ease ${index * 80}ms`,
      }}
    >
      <h3
        className="font-display text-[15px] sm:text-base"
        style={{
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: titleColor,
          margin: 0,
          marginBottom: 6,
        }}
      >
        {title}
      </h3>
      <p
        className="text-[12.5px] sm:text-[13px]"
        style={{
          lineHeight: 1.55,
          color: "rgba(255,255,255,0.45)",
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

export function Features() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      className="px-4 py-8 sm:px-6 sm:py-16 md:py-20"
      style={{ background: "transparent" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal mx-auto mb-5 max-w-2xl text-center sm:mb-10">
          <h2 className="h-section">Built for how freight actually works.</h2>
        </div>

        <div
          ref={gridRef}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {features.map((f, i) => (
            <FeatureCard
              key={f.title}
              title={f.title}
              body={f.body}
              index={i}
              visible={visible}
              featured={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
