import { useScrollReveal } from "../../hooks/useScrollReveal";
import { HeroSection } from "./sections/HeroSection";
import { TrustedBySection } from "./sections/TrustedBySection";
import { ServicesPreviewSection } from "./sections/ServicesPreviewSection";
import { CodeShowcaseSection } from "./sections/CodeShowcaseSection";
import { FeaturedWorkSection } from "./sections/FeaturedWorkSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { BlogPreviewSection } from "./sections/BlogPreviewSection";
import { CTASection } from "./sections/CTASection";

export const HomePage = () => {
  useScrollReveal();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TrustedBySection />
      <ServicesPreviewSection />
      <CodeShowcaseSection />
      <FeaturedWorkSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CTASection />
    </div>
  );
};
