const companies = ["NordTrans", "EuroFreight", "VialinkLogistics", "CargoOne", "RouteStar"];

export function SocialProof() {
  return (
    <section
      style={{
        borderTop: "0.5px solid rgba(0,0,0,0.08)",
        borderBottom: "0.5px solid rgba(0,0,0,0.08)",
        background: "#ffffff",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-6 px-6 py-10 md:justify-between">
        <span className="ui-label">Used by teams at</span>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {companies.map((c) => (
            <span
              key={c}
              className="text-sm"
              style={{
                color: "#0a0a0a",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                opacity: 0.5,
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
