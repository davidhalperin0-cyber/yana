import { motion, useInView } from "framer-motion";
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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to start auto-rotate
  const startAutoRotate = () => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Start new interval - 1.5 seconds
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 1500); // 1.5 seconds
  };

  // Preload all images to prevent jumping
  useEffect(() => {
    testimonials.forEach((testimonial) => {
      const img = new Image();
      img.src = testimonial.image;
    });
  }, []);

  // Auto-rotate testimonials every 1.5 seconds
  useEffect(() => {
    startAutoRotate();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Function to pause auto-rotate and resume after delay
  const pauseAndResumeAutoRotate = () => {
    // Stop the current interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Resume after 4 seconds (gives user time to view the testimonial + animation time)
    timeoutRef.current = setTimeout(() => {
      startAutoRotate();
      timeoutRef.current = null;
    }, 4000); // 4 seconds pause - enough time to view and for smooth transition
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    pauseAndResumeAutoRotate();
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    pauseAndResumeAutoRotate();
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    pauseAndResumeAutoRotate();
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

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="overflow-hidden relative min-h-[400px] md:min-h-[500px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-300 ease-linear ${
                    index === currentIndex 
                      ? 'opacity-100 z-10' 
                      : 'opacity-0 z-0 pointer-events-none'
                  }`}
                  style={{
                    willChange: 'opacity',
                  }}
                >
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/40 via-background to-secondary/30 flex items-center justify-center p-6 h-full">
                    {/* Background layer that replaces white */}
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-secondary/40 rounded-2xl" />
                    
                    {/* Image with blend mode to remove white background */}
                    <div className="relative z-10" style={{ isolation: 'isolate' }}>
                      <img
                        src={testimonial.image}
                        alt={`המלצה ${index + 1}`}
                        className="max-w-md w-full h-auto object-contain relative z-10"
                        loading="eager"
                        style={{
                          mixBlendMode: 'multiply',
                          filter: 'contrast(1.1) brightness(0.95)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Navigation Buttons - Always visible */}
          <div className="flex items-center justify-center gap-4 mt-6 z-20 relative">
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="lg"
              className="rounded-full w-14 h-14 p-0 bg-background/90 hover:bg-background border-2 border-primary shadow-luxury flex items-center justify-center"
              aria-label="המלצה הקודמת"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </Button>
            
            {/* Dot indicators */}
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted hover:bg-primary/50 w-3"
                  }`}
                  aria-label={`המלצה ${index + 1}`}
                />
              ))}
            </div>

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
        </div>
      </div>
    </section>
  );
};
