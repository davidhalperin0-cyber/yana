import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { SocialSection } from "@/components/SocialSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingAnimation onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <main className="overflow-hidden">
          <HeroSection />
          <AboutSection />
          <WhyChooseUsSection />
          <ServicesSection />
          <TestimonialsSection />
          <SocialSection />
          <ContactSection />
          <Footer />
        </main>
      )}
    </>
  );
};

export default Index;
