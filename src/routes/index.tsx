import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
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
      { title: "CMRsync — AI-Powered CMR Digitisation for Trucking" },
      {
        name: "description",
        content:
          "Drivers photograph CMR waybills on Telegram. Claude AI extracts every field instantly. Clean structured data in your dashboard — no manual entry.",
      },
      { property: "og:title", content: "CMRsync — AI-Powered CMR Digitisation" },
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
    <main style={{ background: "#ffffff" }}>
      <Navbar />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Features />
      <Pricing />
      <CtaBanner />
      <Footer />
    </main>
  );
}
