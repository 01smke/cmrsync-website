import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer
      id="contact"
      style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-3 md:items-center">
        <div>
          <Logo />
          <p className="mt-3 text-sm" style={{ color: "#6B7280" }}>
            AI logistics, zero paperwork.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-6 md:justify-center">
          <Link
            to="/privacy"
            className="text-sm transition-colors"
            style={{ color: "#9CA3AF", fontWeight: 500 }}
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            className="text-sm transition-colors"
            style={{ color: "#9CA3AF", fontWeight: 500 }}
          >
            Terms
          </Link>
          <a
            href="mailto:hello@cmrsync.com"
            className="text-sm transition-colors"
            style={{ color: "#9CA3AF", fontWeight: 500 }}
          >
            Contact
          </a>
        </div>

        <div className="text-sm md:text-right" style={{ color: "#6B7280" }}>
          © 2026 CMRsync. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
