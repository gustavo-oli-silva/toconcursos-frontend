import { AppHeader } from "@/components/project/AppHeader";
import { FaqSection } from "@/components/project/landing_page/Faq";
import { FeaturesSection } from "@/components/project/landing_page/Features";
import { Footer } from "@/components/project/landing_page/Footer";
import { HeroSection } from "@/components/project/landing_page/Hero";
import { PricingSection } from "@/components/project/landing_page/Pricing";

export default function Home() {
  return (
    <main className="min-h-screen">
      <AppHeader />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
