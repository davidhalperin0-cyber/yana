import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Calendar, Globe, Palette } from "lucide-react";
import serviceImage1 from "@/assets/service1.jpeg";
import serviceImage2 from "@/assets/service2.jpeg";
import serviceImage3 from "@/assets/service3.jpeg";
import serviceImage4 from "@/assets/service4.jpeg";

const services = [
  {
    icon: Palette,
    title: "עיצוב ובינוי מתכנון סקיצה ועד הקמת מתחם מלא",
    description: "מהרעיון הקריאטיבי ועד הביצוע בפועל, עיצוב, בינוי ועיצוב חללים שמשאירים רושם.",
    image: serviceImage1,
  },
  {
    icon: Calendar,
    title: "הפקה טכנית וניהול ומדויק מאחורי הקלעים",
    description: "תיאום, ניהול צוותים ותפעול מערכות בשידור חי",
    image: serviceImage2,
  },
  {
    icon: Globe,
    title: "בימוי והפקה לאירועי תוכן ותקשורת",
    description: "שילוב בין עולמות הבמה, הצילום וההפקה",
    image: serviceImage4,
  },
  {
    icon: Sparkles,
    title: "קונסטרוקציה והפקה בשטח",
    description: "בנייה, הקמה ותיאום בין אנשי מקצוע",
    image: serviceImage3,
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-secondary/30 to-background">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            השירותים שלי
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            פתרונות אירועים מקיפים מעוצבים במצוינות ותשומת לב לפרטים
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative p-8 rounded-2xl glass-card border-2 border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                  {/* Service Image */}
                  <div className="mb-6 rounded-xl overflow-hidden bg-background/50">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-64 md:h-80 object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-6 shadow-luxury"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
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
