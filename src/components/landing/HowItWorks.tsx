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
  return (
    <section
      id="how"
      className="px-6 py-20 backdrop-blur-md md:py-24"
      style={{ background: "rgba(15, 17, 21, 0.78)", borderTop: "1px solid #2D3038", borderBottom: "1px solid #2D3038" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal mx-auto mb-12 max-w-2xl text-center">
          <span className="ui-label">How it works</span>
          <h2 className="h-section mt-3">Three steps from paper to paid.</h2>
        </div>

        <div className="mx-auto max-w-5xl">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="reveal flex flex-col items-start gap-6 md:flex-row md:items-center"
              style={{
                padding: "32px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: 72,
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  minWidth: 100,
                  color: i === 0 ? "rgba(200,255,0,0.15)" : "rgba(255,255,255,0.06)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3
                className="font-display"
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                  minWidth: 220,
                  margin: 0,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.5)",
                  maxWidth: 420,
                  margin: 0,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
