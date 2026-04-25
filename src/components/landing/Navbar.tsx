import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: "rgba(15, 17, 21, 0.78)",
        borderBottom: "1px solid #2D3038",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors"
              style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500, fontSize: "14px" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="#cta" className="btn-primary">
            Get Early Access
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
          style={{ color: "#ffffff" }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div
          className="md:hidden"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "#0a0a0a" }}
        >
          <div className="flex flex-col gap-4 px-6 py-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base"
                style={{ color: "#ffffff", fontWeight: 500 }}
              >
                {l.label}
              </a>
            ))}
            <a href="#cta" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Get Early Access
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
