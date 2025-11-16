import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import testimonial1 from "@/assets/WhatsApp Image 2025-11-15 at 17.23.47 (1).jpeg";
import testimonial2 from "@/assets/WhatsApp Image 2025-11-12 at 17.46.04.jpeg";

const testimonials = [
  {
    image: testimonial1,
  },
  {
    image: testimonial2,
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            המלצות
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/40 via-background to-secondary/30 flex items-center justify-center p-6">
                  {/* Background layer that replaces white */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-secondary/40 rounded-2xl" />
                  
                  {/* Image with blend mode to remove white background */}
                  <div className="relative z-10" style={{ isolation: 'isolate' }}>
                    <img
                      src={testimonials[currentIndex].image}
                      alt={`המלצה ${currentIndex + 1}`}
                      className="max-w-md w-full h-auto object-contain relative z-10"
                      style={{
                        mixBlendMode: 'multiply',
                        filter: 'contrast(1.1) brightness(0.95)',
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="lg"
              className="rounded-full w-14 h-14 p-0 bg-background/90 hover:bg-background border-2 border-primary shadow-luxury flex items-center justify-center"
              aria-label="המלצה הקודמת"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </Button>

            <Button
              onClick={goToNext}
              variant="outline"
              size="lg"
              className="rounded-full w-14 h-14 p-0 bg-background/90 hover:bg-background border-2 border-primary shadow-luxury flex items-center justify-center"
              aria-label="המלצה הבאה"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
