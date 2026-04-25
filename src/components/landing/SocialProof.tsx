const companies = ["NordTrans", "EuroFreight", "VialinkLogistics", "CargoOne", "RouteStar"];

export function SocialProof() {
  return (
    <section className="border-y" style={{ borderColor: "#2D3038", background: "#0F1115" }}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-6 py-10 md:justify-between">
        <span className="font-body text-xs uppercase tracking-[0.2em]" style={{ color: "#6B7280" }}>
          Used by teams at
        </span>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {companies.map((c) => (
            <span
              key={c}
              className="font-display text-sm font-semibold"
              style={{
                background: "#1C1E24",
                border: "1px solid #2D3038",
                color: "#9CA3AF",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
