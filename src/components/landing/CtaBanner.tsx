import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section
      id="cta"
      className="px-4 py-10 sm:px-6 sm:py-16 md:py-20"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(223,255,0,0.08) 0%, #0B0D11 60%, #06080C 100%)",
        borderTop: "1px solid #2D3038",
      }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="reveal h-section">Ready to eliminate manual data entry?</h2>
        <p className="reveal body-copy mx-auto mt-3 max-w-xl sm:mt-5">
          Join the early access programme and get 30 days free — no credit card required.
        </p>
        <div className="reveal mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-8">
          <button
            className="btn-primary"
            data-cal-link="cmrsync/onboarding-call"
            data-cal-namespace="onboarding-call"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
          >
            Start your free trial <ArrowRight size={16} />
          </button>
          <a href="#hero" className="btn-ghost">
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
