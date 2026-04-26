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

  const baseBg = featured ? "rgba(200,255,0,0.05)" : "rgba(255,255,255,0.03)";
  const hoverBg = featured ? "rgba(200,255,0,0.08)" : "rgba(255,255,255,0.05)";
  const baseBorder = featured ? "rgba(200,255,0,0.15)" : "rgba(255,255,255,0.06)";
  const hoverBorder = featured ? "rgba(200,255,0,0.25)" : "rgba(255,255,255,0.12)";

  const titleColor = featured
    ? "#C8FF00"
    : hover
      ? "rgba(255,255,255,0.9)"
      : "#ffffff";
  const titleLetterSpacing = featured
    ? "-0.02em"
    : hover
      ? "-0.025em"
      : "-0.02em";

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? hoverBg : baseBg,
        border: `1px solid ${hover ? hoverBorder : baseBorder}`,
        borderRadius: 16,
        padding: "32px 28px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.5s ease ${index * 80}ms`,
      }}
    >
      <h3
        className="font-display"
        style={{
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: titleLetterSpacing,
          color: titleColor,
          margin: 0,
          marginBottom: 10,
          transition: "color 0.2s ease, letter-spacing 0.2s ease",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.7,
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
      className="px-6 py-20 md:py-24"
      style={{ background: "transparent" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal mx-auto mb-12 max-w-2xl text-center">
          <h2 className="h-section">Built for how freight actually works.</h2>
        </div>

        <div
          ref={gridRef}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
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
