import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section
      id="cta"
      className="px-6 py-24 md:py-32"
      style={{
        background: "#ffffff",
        borderTop: "0.5px solid rgba(0,0,0,0.08)",
      }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="reveal h-section">
          Ready to eliminate manual data entry?
        </h2>
        <p className="reveal body-copy mx-auto mt-6 max-w-xl">
          Join the early access programme and get 30 days free.
        </p>
        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#" className="btn-primary">
            Request Early Access
            <ArrowRight size={16} />
          </a>
          <a href="#how" className="btn-ghost">
            See How It Works
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
