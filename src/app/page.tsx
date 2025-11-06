import { FaqSection } from "@/components/project/landing_page/Faq";
import { FeaturesSection } from "@/components/project/landing_page/Features";
import { HeroSection } from "@/components/project/landing_page/Hero";
import { PricingSection } from "@/components/project/landing_page/Pricing";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FaqSection />
    </main>
  );
}
