import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { useReveal } from "@/hooks/use-reveal";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  useReveal();
  return (
    <main style={{ background: "#0F1115", minHeight: "100vh" }}>
      <Navbar />
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <span className="ui-label">Legal</span>
        <h1
          className="font-display mt-3"
          style={{
            fontSize: "44px",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            color: "#fff",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        <p className="mt-3 text-sm" style={{ color: "#6B7280" }}>
          Last updated: {updated}
        </p>
        <div className="legal-prose mt-10">{children}</div>
      </article>
      <Footer />

      <style>{`
        .legal-prose { color: #D1D5DB; font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.75; }
        .legal-prose h2 { font-family: 'Space Grotesk', sans-serif; color: #fff; font-size: 22px; font-weight: 700; letter-spacing: -0.025em; margin-top: 36px; margin-bottom: 12px; }
        .legal-prose h3 { font-family: 'Space Grotesk', sans-serif; color: #fff; font-size: 17px; font-weight: 600; letter-spacing: -0.02em; margin-top: 24px; margin-bottom: 8px; }
        .legal-prose p { margin-bottom: 14px; color: #9CA3AF; }
        .legal-prose ul { list-style: disc; padding-left: 22px; margin-bottom: 16px; color: #9CA3AF; }
        .legal-prose li { margin-bottom: 6px; }
        .legal-prose strong { color: #fff; font-weight: 600; }
        .legal-prose a { color: #DFFF00; text-decoration: underline; text-underline-offset: 3px; }
        .legal-prose a:hover { color: #AADD00; }
      `}</style>
    </main>
  );
}
