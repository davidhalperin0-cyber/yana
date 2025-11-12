import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Heart, Globe2, Sparkles } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Award-Winning Excellence",
    description: "Recognized globally for our innovative designs and flawless execution. Our portfolio speaks for itself.",
  },
  {
    icon: Heart,
    title: "Personalized Approach",
    description: "Every event is unique. We listen, understand your vision, and bring it to life with meticulous attention to detail.",
  },
  {
    icon: Globe2,
    title: "Worldwide Network",
    description: "Access to exclusive venues, top vendors, and luxury resources across the globe for truly unforgettable experiences.",
  },
  {
    icon: Sparkles,
    title: "Seamless Experience",
    description: "From concept to celebration, we handle every detail so you can relax and enjoy your special moment.",
  },
];

export const WhyChooseUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four compelling reasons to trust us with your most important moments
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative p-6 rounded-2xl glass-card border-2 border-border/50 hover:border-primary/50 transition-all duration-300 text-center"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mb-6 shadow-luxury mx-auto"
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {reason.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {reason.description}
                  </p>

                  {/* Shimmer effect */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
