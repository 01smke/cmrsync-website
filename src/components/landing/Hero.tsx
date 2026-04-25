export function Hero() {
  const rows = [
    { id: "CMR-2847", route: "Rotterdam → Berlin", consignee: "Mueller GmbH", status: "Extracted", date: "24 Apr" },
    { id: "CMR-2846", route: "Antwerp → Lyon", consignee: "Logistique Sud", status: "Extracted", date: "24 Apr" },
    { id: "CMR-2845", route: "Hamburg → Praha", consignee: "ČD Cargo", status: "Pending", date: "23 Apr" },
    { id: "CMR-2844", route: "Warsaw → Madrid", consignee: "Iberia Trans", status: "Extracted", date: "23 Apr" },
  ];

  return (
    <section className="relative overflow-hidden hero-gradient">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.78rem] font-body font-semibold"
              style={{
                border: "1px solid rgba(223,255,0,0.3)",
                background: "rgba(223,255,0,0.07)",
                color: "#DFFF00",
              }}
            >
              ✦ Powered by Claude AI Vision
            </div>

            <h1
              className="mt-6 font-display font-bold text-white"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
              }}
            >
              Your CMR Documents,
              <br />
              <span className="lime-glow" style={{ color: "#fff" }}>
                Digitised in Seconds.
              </span>
            </h1>

            <p
              className="mt-6 font-body"
              style={{
                color: "#9CA3AF",
                maxWidth: "520px",
                lineHeight: 1.65,
                fontWeight: 400,
              }}
            >
              Drivers photograph CMR waybills on Telegram. Claude AI extracts every field instantly.
              Clean data lands in your dashboard — no manual entry, no errors.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#cta" className="btn-primary">Start Free Trial</a>
              <a href="#how" className="btn-ghost">See Demo</a>
            </div>

            <p className="mt-6 font-body text-xs" style={{ color: "#6B7280" }}>
              Trusted by logistics teams across Europe
            </p>
          </div>

          {/* Mockup card */}
          <div className="relative">
            <div
              className="surface-card relative"
              style={{
                padding: "24px",
                borderTop: "2px solid #DFFF00",
                boxShadow:
                  "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 60px rgba(223,255,0,0.08)",
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="font-display text-sm font-semibold text-white">
                    Recent CMR Extractions
                  </div>
                  <div className="font-body text-xs" style={{ color: "#9CA3AF" }}>
                    Live from Telegram bot
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: "#DFFF00",
                      boxShadow: "0 0 12px #DFFF00",
                    }}
                  />
                  <span className="font-body text-xs" style={{ color: "#9CA3AF" }}>
                    Live
                  </span>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg" style={{ border: "1px solid #2D3038" }}>
                <table className="w-full text-left">
                  <thead>
                    <tr
                      className="font-body text-[0.7rem] uppercase tracking-wider"
                      style={{ color: "#6B7280", background: "#15171C" }}
                    >
                      <th className="px-3 py-2.5 font-semibold">CMR #</th>
                      <th className="px-3 py-2.5 font-semibold">Route</th>
                      <th className="hidden px-3 py-2.5 font-semibold sm:table-cell">Consignee</th>
                      <th className="px-3 py-2.5 font-semibold">Status</th>
                      <th className="hidden px-3 py-2.5 font-semibold sm:table-cell">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr
                        key={r.id}
                        style={{
                          borderTop: i === 0 ? "none" : "1px solid #2D3038",
                        }}
                      >
                        <td className="px-3 py-3 font-body text-xs font-medium text-white">{r.id}</td>
                        <td className="px-3 py-3 font-body text-xs" style={{ color: "#9CA3AF" }}>
                          {r.route}
                        </td>
                        <td
                          className="hidden px-3 py-3 font-body text-xs sm:table-cell"
                          style={{ color: "#9CA3AF" }}
                        >
                          {r.consignee}
                        </td>
                        <td className="px-3 py-3">
                          {r.status === "Extracted" ? (
                            <span
                              className="inline-block rounded-md px-2 py-0.5 font-body text-[0.7rem] font-bold"
                              style={{ background: "#DFFF00", color: "#000" }}
                            >
                              Extracted
                            </span>
                          ) : (
                            <span
                              className="inline-block rounded-md px-2 py-0.5 font-body text-[0.7rem] font-bold"
                              style={{ background: "#2D3038", color: "#9CA3AF" }}
                            >
                              Pending
                            </span>
                          )}
                        </td>
                        <td
                          className="hidden px-3 py-3 font-body text-xs sm:table-cell"
                          style={{ color: "#9CA3AF" }}
                        >
                          {r.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-between font-body text-xs" style={{ color: "#6B7280" }}>
                <span>Showing 4 of 1,284 records</span>
                <span style={{ color: "#DFFF00" }}>↗ +127 today</span>
              </div>
            </div>

            {/* floating glow accents */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full"
              style={{ background: "rgba(223,255,0,0.25)", filter: "blur(40px)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
