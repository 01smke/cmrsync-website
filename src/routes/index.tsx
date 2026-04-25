import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { Footer } from "@/components/landing/Footer";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "CMRsync — AI-Powered Logistics for Trucking" },
      {
        name: "description",
        content:
          "Drivers photograph CMR waybills on Telegram. AI extracts every field instantly. Clean structured data in your dashboard. €30 per truck / month.",
      },
      { property: "og:title", content: "CMRsync — AI-Powered Logistics for Trucking" },
      {
        property: "og:description",
        content:
          "From a photo to structured logistics data in under 3 seconds. Built for European trucking teams.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Index() {
  useReveal();
  return (
    <main style={{ background: "#0a0a0a" }}>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <CtaBanner />
      <Footer />
    </main>
  );
}
