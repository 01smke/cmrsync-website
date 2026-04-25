export function CtaBanner() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden px-6 py-20 md:py-28"
      style={{
        background: "#1C1E24",
        borderTop: "1px solid #2D3038",
        borderBottom: "1px solid #2D3038",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse at center, rgba(223,255,0,0.15), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="reveal font-display text-3xl font-bold text-white md:text-5xl">
          Ready to eliminate manual data entry?
        </h2>
        <p
          className="reveal mx-auto mt-5 max-w-xl font-body"
          style={{ color: "#9CA3AF", lineHeight: 1.65 }}
        >
          Join the early access programme and get 30 days free.
        </p>
        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#"
            className="btn-primary"
            style={{ padding: "14px 32px", fontSize: "1rem" }}
          >
            Request Early Access
          </a>
          <a href="#how" className="btn-ghost" style={{ padding: "14px 32px", fontSize: "1rem" }}>
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
