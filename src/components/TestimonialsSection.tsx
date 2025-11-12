import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Bride",
    text: "Our wedding was beyond our wildest dreams. Every detail was perfection, from the stunning floral arrangements to the magical lighting. The team truly created an unforgettable experience.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "CEO, Tech Corp",
    text: "The corporate gala they produced was exceptional. The creativity, professionalism, and execution were world-class. Our guests are still talking about it months later.",
    rating: 5,
  },
  {
    name: "Isabella Rodriguez",
    role: "Event Planner",
    text: "Working with this team elevated my client's celebration to new heights. Their artistic vision and meticulous attention to detail are unmatched in the industry.",
    rating: 5,
  },
  {
    name: "Michael Thompson",
    role: "Groom",
    text: "From our first meeting to the last dance, everything was seamless. They transformed our venue into a fairy tale and made our destination wedding stress-free and magical.",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
            Client Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from those who've experienced our luxury event creation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-card p-8 md:p-12 rounded-3xl border-2 border-border/50 shadow-luxury">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex gap-1 mb-6 justify-center">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl text-center font-serif italic mb-8 text-foreground leading-relaxed">
                "{testimonials[currentIndex].text}"
              </blockquote>

              <div className="text-center">
                <p className="font-semibold text-lg text-foreground">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-muted-foreground">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-primary w-8"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
