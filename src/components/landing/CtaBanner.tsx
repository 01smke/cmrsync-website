import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section
      id="cta"
      className="px-6 py-20 md:py-24"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(223,255,0,0.08) 0%, #0B0D11 60%, #06080C 100%)",
        borderTop: "1px solid #2D3038",
      }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="reveal h-section">Ready to eliminate manual data entry?</h2>
        <p className="reveal body-copy mx-auto mt-5 max-w-xl">
          Join the early access programme and get 30 days free — no credit card required.
        </p>
        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#" className="btn-primary">
            Start Free Trial <ArrowRight size={16} />
          </a>
          <a href="#how" className="btn-ghost">
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
