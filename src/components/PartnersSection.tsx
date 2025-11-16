import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import misradLogo from "@/assets/misrad.png";
import hozaLogo from "@/assets/hoza.png";
import ikeaLogo from "@/assets/ikea.webp";
import ayalonLogo from "@/assets/ayalon.png";
import bitahonLogo from "@/assets/bitahon.jpg";
import discontLogo from "@/assets/discont.jpg";

const partners = [
  { name: "משרד ההסברה", logo: misradLogo },
  { name: "חוצה ישראל", logo: hozaLogo },
  { name: "IKEA", logo: ikeaLogo },
  { name: "איילון", logo: ayalonLogo },
  { name: "משרד הביטחון", logo: bitahonLogo },
  { name: "דיסקונט", logo: discontLogo },
];

export const PartnersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-secondary/20 via-background to-secondary/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            שיתופי פעולה עם ארגונים<br />ולקוחות מובילים
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mt-16"
        >
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 lg:gap-4">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-center"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 md:h-20 lg:h-24 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

