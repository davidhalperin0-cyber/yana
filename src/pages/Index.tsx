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
  const [hasCourseAccess, setHasCourseAccess] = useState(false);

  useEffect(() => {
    // Check if user has access to course (stored in localStorage)
    const access = localStorage.getItem("courseAccess") === "true";
    setHasCourseAccess(access);
    if (access) {
      setShowCourse(true);
    }
    // Ensure smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  const handleFormSubmit = (email?: string) => {
    // Save access permanently - user will always have access
    localStorage.setItem("courseAccess", "true");
    setHasCourseAccess(true);
    if (email) {
      // Also save email for future reference
      localStorage.setItem("userEmail", email);
    }
    setShowCourse(true);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    // Don't remove access - user can always come back
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
              <HeroSection onGoToCourse={hasCourseAccess ? () => setShowCourse(true) : undefined} />
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
