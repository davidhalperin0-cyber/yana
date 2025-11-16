import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { PartnersSection } from "@/components/PartnersSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { SocialSection } from "@/components/SocialSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";
import { CoursePage } from "@/components/CoursePage";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showCourse, setShowCourse] = useState(false);

  useEffect(() => {
    // Check if form was submitted (stored in localStorage)
    const formSubmitted = localStorage.getItem("formSubmitted") === "true";
    if (formSubmitted) {
      setShowCourse(true);
    }
    // Ensure smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  const handleFormSubmit = () => {
    localStorage.setItem("formSubmitted", "true");
    setShowCourse(true);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    localStorage.removeItem("formSubmitted");
    setShowCourse(false);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingAnimation onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <main className="overflow-hidden">
          <AccessibilityPanel />
          {showCourse ? (
            <>
              <CoursePage onBackToHome={handleBackToHome} />
              <Footer />
            </>
          ) : (
            <>
              <HeroSection />
              <AboutSection />
              <WhyChooseUsSection />
              <PartnersSection />
              <ServicesSection />
              <TestimonialsSection />
              <SocialSection />
              <ContactSection onFormSubmit={handleFormSubmit} />
              <Footer />
            </>
          )}
        </main>
      )}
    </>
  );
};

export default Index;
