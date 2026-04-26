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

export function Features() {
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

        <div className="mx-auto max-w-5xl">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="reveal flex flex-col gap-4 md:flex-row md:items-start"
              style={{
                padding: "24px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                transitionDelay: `${i * 50}ms`,
              }}
            >
              <h3
                className="font-display"
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                  minWidth: 280,
                  margin: 0,
                  borderLeft: i === 0 ? "2px solid #C8FF00" : undefined,
                  paddingLeft: i === 0 ? 16 : undefined,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.5)",
                  margin: 0,
                }}
              >
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
