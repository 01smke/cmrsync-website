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
          <span className="ui-label">Features</span>
          <h2 className="h-section mt-3">Built for how freight actually works.</h2>
        </div>

        {/* Featured first card — full width, two-column */}
        <div className="reveal feature-card mb-4">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <h3
              className="font-display"
              style={{
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                lineHeight: 1.1,
              }}
            >
              {features[0].title}
            </h3>
            <p className="body-copy" style={{ fontSize: 14 }}>
              {features[0].body}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.slice(1).map((f, i) => (
            <div
              key={f.title}
              className="reveal feature-card"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <h3
                className="font-display"
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
                {f.title}
              </h3>
              <p className="body-copy mt-2" style={{ fontSize: 13 }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
