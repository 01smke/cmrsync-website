import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer
      id="contact"
      style={{ background: "#0F1115", borderTop: "1px solid #2D3038" }}
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3 md:items-center">
        <div>
          <Logo />
          <p className="mt-3 font-body text-sm" style={{ color: "#6B7280" }}>
            AI logistics, zero paperwork.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-6 md:justify-center">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a
              key={l}
              href="#"
              className="font-body text-sm transition-colors"
              style={{ color: "#6B7280" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#DFFF00")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >
              {l}
            </a>
          ))}
        </div>

        <div className="font-body text-sm md:text-right" style={{ color: "#6B7280" }}>
          © 2025 CMRsync. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
