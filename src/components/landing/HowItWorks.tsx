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
      className="px-6 py-20 md:py-24"
      style={{ background: "#0a0a0a" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal mx-auto mb-12 max-w-2xl text-center">
          <span className="ui-label">How it works</span>
          <h2 className="h-section mt-3">Three steps from paper to paid.</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="reveal feature-card"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#C8FF00",
                  textTransform: "uppercase",
                }}
              >
                Step {String(i + 1).padStart(2, "0")}
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  margin: "10px 0 6px",
                  color: "#ffffff",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.65,
                  opacity: 0.55,
                  color: "#ffffff",
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
