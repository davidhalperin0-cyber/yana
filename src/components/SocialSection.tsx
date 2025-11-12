import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Linkedin, PinIcon as Pinterest } from "lucide-react";

const socialLinks = [
  {
    icon: Instagram,
    name: "Instagram",
    href: "#",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Pinterest,
    name: "Pinterest",
    href: "#",
    color: "from-red-500 to-red-600",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    href: "#",
    color: "from-blue-500 to-blue-600",
  },
];

export const SocialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-secondary/30 to-background">
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="w-16 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
            Follow Our Journey
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Get inspired by our latest creations and behind-the-scenes moments
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-sm border border-border/50 overflow-hidden">
                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`absolute inset-0 bg-gradient-to-br ${social.color} blur-xl`} />
                    </div>
                    
                    {/* Icon */}
                    <Icon className="w-8 h-8 text-foreground relative z-10 group-hover:text-white transition-colors duration-300" />
                    
                    {/* Sparkle particles on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      initial={false}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          style={{
                            top: `${30 + Math.cos((i * Math.PI) / 2) * 25}%`,
                            left: `${50 + Math.sin((i * Math.PI) / 2) * 25}%`,
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                  
                  {/* Label */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground whitespace-nowrap"
                  >
                    {social.name}
                  </motion.p>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
