import { useState } from "react";
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
        background: "rgba(15, 17, 21, 0.72)",
        borderBottom: "1px solid #2D3038",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center">
          <Logo />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-sm font-medium transition-colors"
              style={{ color: "#9CA3AF" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="#cta" className="btn-primary text-sm">
            Get Early Access
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
          style={{ color: "#fff" }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div
          className="md:hidden"
          style={{ borderTop: "1px solid #2D3038", background: "#0F1115" }}
        >
          <div className="flex flex-col gap-4 px-6 py-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-body text-base"
                style={{ color: "#9CA3AF" }}
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
