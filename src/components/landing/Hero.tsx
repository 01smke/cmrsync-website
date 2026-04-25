import { ArrowRight } from "lucide-react";

export function Hero() {
  const rows = [
    { id: "CMR-2847", route: "Rotterdam → Berlin", consignee: "Mueller GmbH", status: "Extracted", date: "24 Apr" },
    { id: "CMR-2846", route: "Antwerp → Lyon", consignee: "Logistique Sud", status: "Extracted", date: "24 Apr" },
    { id: "CMR-2845", route: "Hamburg → Praha", consignee: "ČD Cargo", status: "Pending", date: "23 Apr" },
    { id: "CMR-2844", route: "Warsaw → Madrid", consignee: "Iberia Trans", status: "Extracted", date: "23 Apr" },
  ];

  return (
    <section className="relative overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:pb-32 md:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{
                border: "0.5px solid rgba(0,0,0,0.08)",
                background: "#ffffff",
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "#C4F542" }}
              />
              <span className="ui-label" style={{ opacity: 1 }}>
                Powered by Claude AI Vision
              </span>
            </div>

            <h1 className="h-hero mt-7">
              Your CMR docs,<br />
              digitised in<br />
              seconds.
            </h1>

            <p className="body-copy mt-7 max-w-[520px]">
              Drivers photograph CMR waybills on Telegram. Claude AI extracts every field instantly.
              Clean data lands in your dashboard — no manual entry, no errors.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#cta" className="btn-primary">
                Start Free Trial
                <ArrowRight size={16} />
              </a>
              <a href="#how" className="btn-ghost">
                See Demo
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-12">
              <div>
                <div className="stat-num text-4xl">3s</div>
                <div className="ui-label mt-1.5">Avg extraction</div>
              </div>
              <div>
                <div className="stat-num text-4xl">99.4%</div>
                <div className="ui-label mt-1.5">Field accuracy</div>
              </div>
              <div>
                <div className="stat-num text-4xl">1,284</div>
                <div className="ui-label mt-1.5">CMRs this month</div>
              </div>
            </div>
          </div>

          {/* Mockup card */}
          <div className="relative">
            <div className="surface-card relative" style={{ padding: "24px" }}>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="card-title text-sm">Recent CMR Extractions</div>
                  <div className="ui-label mt-1">Live from Telegram bot</div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: "#C4F542" }}
                  />
                  <span className="ui-label" style={{ opacity: 1 }}>Live</span>
                </div>
              </div>

              <div
                className="overflow-hidden rounded-lg"
                style={{ border: "0.5px solid rgba(0,0,0,0.08)" }}
              >
                <table className="w-full text-left">
                  <thead>
                    <tr style={{ background: "#fafafa" }}>
                      <th className="px-3 py-2.5"><span className="ui-label">CMR #</span></th>
                      <th className="px-3 py-2.5"><span className="ui-label">Route</span></th>
                      <th className="hidden px-3 py-2.5 sm:table-cell"><span className="ui-label">Consignee</span></th>
                      <th className="px-3 py-2.5"><span className="ui-label">Status</span></th>
                      <th className="hidden px-3 py-2.5 sm:table-cell"><span className="ui-label">Date</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr
                        key={r.id}
                        style={{
                          borderTop: i === 0 ? "none" : "0.5px solid rgba(0,0,0,0.08)",
                        }}
                      >
                        <td
                          className="px-3 py-3 text-xs"
                          style={{ color: "#0a0a0a", fontWeight: 700, letterSpacing: "-0.01em" }}
                        >
                          {r.id}
                        </td>
                        <td className="px-3 py-3 text-xs" style={{ color: "#0a0a0a", opacity: 0.7 }}>
                          {r.route}
                        </td>
                        <td
                          className="hidden px-3 py-3 text-xs sm:table-cell"
                          style={{ color: "#0a0a0a", opacity: 0.7 }}
                        >
                          {r.consignee}
                        </td>
                        <td className="px-3 py-3">
                          {r.status === "Extracted" ? (
                            <span
                              className="inline-block rounded-md px-2 py-0.5 text-[10px]"
                              style={{
                                background: "#C4F542",
                                color: "#0a0a0a",
                                fontWeight: 700,
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                              }}
                            >
                              Extracted
                            </span>
                          ) : (
                            <span
                              className="inline-block rounded-md px-2 py-0.5 text-[10px]"
                              style={{
                                background: "#f4f4f4",
                                color: "#0a0a0a",
                                fontWeight: 700,
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                                opacity: 0.7,
                              }}
                            >
                              Pending
                            </span>
                          )}
                        </td>
                        <td
                          className="hidden px-3 py-3 text-xs sm:table-cell"
                          style={{ color: "#0a0a0a", opacity: 0.7 }}
                        >
                          {r.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="ui-label">Showing 4 of 1,284 records</span>
                <span
                  className="text-xs"
                  style={{ color: "#0a0a0a", fontWeight: 700, letterSpacing: "-0.01em" }}
                >
                  ↗ +127 today
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
