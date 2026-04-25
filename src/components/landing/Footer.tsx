import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer
      id="contact"
      style={{ background: "#ffffff", borderTop: "0.5px solid rgba(0,0,0,0.08)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3 md:items-center">
        <div>
          <Logo />
          <p
            className="mt-3 text-sm"
            style={{ color: "#0a0a0a", opacity: 0.5, letterSpacing: "-0.01em" }}
          >
            AI logistics, zero paperwork.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-7 md:justify-center">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm transition-opacity"
              style={{ color: "#0a0a0a", opacity: 0.5, fontWeight: 500 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
            >
              {l}
            </a>
          ))}
        </div>

        <div
          className="text-sm md:text-right"
          style={{ color: "#0a0a0a", opacity: 0.5 }}
        >
          © 2025 CMRsync. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
