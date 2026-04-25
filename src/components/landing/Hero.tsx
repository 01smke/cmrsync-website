import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  const rows = [
    { id: "CMR-2847", route: "Rotterdam → Berlin", consignee: "Mueller GmbH", status: "Extracted" },
    { id: "CMR-2846", route: "Antwerp → Lyon", consignee: "Logistique Sud", status: "Extracted" },
    { id: "CMR-2845", route: "Hamburg → Praha", consignee: "ČD Cargo", status: "Pending" },
    { id: "CMR-2844", route: "Warsaw → Madrid", consignee: "Iberia Trans", status: "Extracted" },
  ];

  return (
    <section className="hero relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-14 pt-12 md:pb-16 md:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* HEADLINE */}
        <div className="page-body max-w-2xl text-center lg:text-left">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ border: "1px solid #2D3038", background: "rgba(28,30,36,0.6)" }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "#DFFF00", boxShadow: "0 0 10px #DFFF00" }}
            />
            <span className="ui-label" style={{ color: "#DFFF00" }}>
              Powered by Claude AI Vision
            </span>
          </div>

          <h1 className="h-hero mt-6">
            AI-Powered Logistics<br />
            for Trucking Teams.
          </h1>

          <p className="body-copy mx-auto mt-5 max-w-xl text-base">
            Drivers photograph CMR waybills on Telegram. AI extracts every field instantly.
            Clean structured data lands in your dashboard — no manual entry, no errors.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a href="#cta" className="btn-primary">
              Start Free Trial <ArrowRight size={16} />
            </a>
            <a href="#how" className="btn-ghost">
              See How It Works
            </a>
          </div>
        </div>

        {/* VIDEO SHOWCASE */}
        <div className="max-w-3xl">
          <div
            className="card relative aspect-video w-full overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #14171E 0%, #0A0C10 100%)",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(223,255,0,0.06), 0 0 0 1px rgba(255,255,255,0.04) inset",
            }}
          >
            {/* Replace this block with your <video> tag when ready */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{
                  background: "#DFFF00",
                  boxShadow: "0 0 40px rgba(223,255,0,0.5), 0 8px 30px rgba(0,0,0,0.5)",
                }}
              >
                <Play size={28} fill="#0a0a0a" color="#0a0a0a" style={{ marginLeft: 4 }} />
              </div>
              <div className="text-center">
                <div
                  className="font-display text-lg"
                  style={{ color: "#ffffff", fontWeight: 600, letterSpacing: "-0.02em" }}
                >
                  Product demo coming soon
                </div>
                <div className="ui-label mt-2" style={{ color: "#6B7280" }}>
                  Video placeholder
                </div>
              </div>
            </div>
            {/* Subtle grid overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>
        </div>
        </div>

        {/* KPI ROW */}
        <div className="reveal mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { v: "3s", l: "Avg extraction" },
            { v: "99.4%", l: "Field accuracy" },
            { v: "1,284", l: "CMRs / month" },
            { v: "€30", l: "Per truck / month" },
          ].map((s) => (
            <div key={s.l} className="kpi-card">
              <div className="stat-num text-3xl">{s.v}</div>
              <div className="ui-label mt-2" style={{ color: "#9CA3AF" }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* MOCKUP TABLE */}
        <div className="reveal mx-auto mt-10 max-w-5xl">
          <div className="card" style={{ padding: "20px" }}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div
                  className="font-display"
                  style={{ color: "#fff", fontWeight: 600, letterSpacing: "-0.02em", fontSize: 14 }}
                >
                  Recent CMR Extractions
                </div>
                <div className="mt-1 text-xs" style={{ color: "#6B7280" }}>
                  Live from Telegram bot
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: "#DFFF00", boxShadow: "0 0 10px #DFFF00" }}
                />
                <span className="ui-label">Live</span>
              </div>
            </div>

            <div
              className="overflow-hidden rounded-lg"
              style={{ border: "1px solid #2D3038" }}
            >
              <table className="w-full text-left">
                <thead>
                  <tr style={{ background: "#16181E" }}>
                    {["CMR #", "Route", "Consignee", "Status"].map((h, i) => (
                      <th
                        key={h}
                        className={`px-4 py-2.5 ${i === 2 ? "hidden sm:table-cell" : ""}`}
                      >
                        <span
                          className="ui-label"
                          style={{ color: "#6B7280", letterSpacing: "0.1em" }}
                        >
                          {h}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr
                      key={r.id}
                      className="table-row"
                      style={{
                        borderTop: i === 0 ? "none" : "1px solid #2D3038",
                        animationDelay: `${i * 60}ms`,
                      }}
                    >
                      <td
                        className="px-4 py-3 text-xs"
                        style={{ color: "#fff", fontWeight: 600 }}
                      >
                        {r.id}
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "#9CA3AF" }}>
                        {r.route}
                      </td>
                      <td
                        className="hidden px-4 py-3 text-xs sm:table-cell"
                        style={{ color: "#9CA3AF" }}
                      >
                        {r.consignee}
                      </td>
                      <td className="px-4 py-3">
                        <span className={r.status === "Extracted" ? "pill-success" : "pill-pending"}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
