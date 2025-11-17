import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Custom icon component for numbers
const NumberIcon = ({ number }: { number: string }) => (
  <span className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
    {number}
  </span>
);

const reasons = [
  {
    icon: () => <NumberIcon number="04" />,
    title: "תצאו עם ביטחון לתהליך!",
    description: "",
  },
  {
    icon: () => <NumberIcon number="03" />,
    title: "טיפים לבחירת ספקים מותאמים",
    description: "",
  },
  {
    icon: () => <NumberIcon number="02" />,
    title: "כל הדברים שאף אחד לא יגיד לכם לפני שאתם מתחילים לתכנן את החתונה!",
    description: "",
  },
  {
    icon: () => <NumberIcon number="01" />,
    title: "איך תדעו האם חתונת שטח מתאימה לכם?",
    description: "",
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            מה אני מקבל במדריך
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row md:flex-wrap gap-8">
          {(() => {
            // Mobile order: 01, 02, 03, 04
            // Desktop order: 04, 03, 02, 01 (original)
            const mobileOrder = [3, 2, 1, 0]; // 01, 02, 03, 04
            const desktopOrderMap: { [key: number]: string } = {
              0: 'md:order-1', // 04
              1: 'md:order-2', // 03
              2: 'md:order-3', // 02
              3: 'md:order-4', // 01
            };
            
            return (mobileOrder.map((originalIndex, displayIndex) => {
              const reason = reasons[originalIndex];
              const IconComponent = reason.icon;
              return (
                <motion.div
                  key={originalIndex}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: displayIndex * 0.15 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className={`group relative p-6 rounded-2xl glass-card border-2 border-border/50 hover:border-primary/50 transition-all duration-300 text-center w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] ${desktopOrderMap[originalIndex]}`}
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
                    <IconComponent />
                  </motion.div>

                  <h3 className={`${reason.title === "איך תדעו האם חתונת שטח מתאימה לכם" || reason.title === "כל הדברים שאף אחד לא יגיד לכם לפני שאתם מתחילים לתכנן את החתונה" ? "text-xl md:text-2xl leading-tight break-words" : "text-xl"} font-bold mb-3 group-hover:text-primary transition-colors duration-300`}>
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
            }));
          })()}
        </div>
      </div>
    </section>
  );
};
