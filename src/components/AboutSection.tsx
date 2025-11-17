import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import yanaPhoto from "@/assets/WhatsApp Image 2025-11-13 at 10.50.22.jpeg";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-1 bg-gradient-primary mx-auto rounded-full" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-primary">
            הסיפור שלי
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-sm mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-luxury">
              <img
                src={yanaPhoto}
                alt="יאנה גולן"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>

          {/* Text Content - All text on the left */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed space-y-6"
          >
            <div>
              <p className="mb-2">
                נעים מאוד, אני <span className="text-primary font-semibold">יאנה גולן</span>, מפיקת אירועים עסקיים ופרטיים.
              </p>
            </div>

            <div>
              <p className="mb-2">
                אני חיה ונושמת את עולם האירועים כבר שנים, והאהבה הכי גדולה שלי נמצאת דווקא שאני נמצאת בשטח.
              </p>
              <p>
                באוויר הפתוח, בנוף שמספר סיפור, ובחיבור הפשוט בין אנשים לטבע — שם אני מרגישה שהקסם קורה באמת, כשכל רגע הופך לחוויה אמיתית, בלי מסכות, רק אהבה.
              </p>
            </div>

            <div>
              <p className="mb-2">
                מאחוריי ניסיון עשיר בעבודה עם חברות גדולות, מותגים מובילים וארגונים מכל הסוגים, לצד מאות זוגות שהגשמתי איתם את היום הכי מיוחד שלהם.
              </p>
              <p>
                ההפקה בשבילי היא הדרך לחבר בין דיוק מקצועי לרגש אמיתי, לשלב בין הניסיון של הפקות ענק לבין החלום הקטן והאישי של כל זוג, ולהפוך אותו למציאות עם רוגע, מקצועיות וסטייל.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
            {[
              { number: "100+", label: "אירועים שנוצרו" },
              { number: "רמת הגולן - אילת", label: "לוקיישן בפריסה ארצית" },
              { number: "6+", label: "שנות ניסיון" },
              { number: "100%", label: "שביעות רצון" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className="text-center flex flex-col h-full"
              >
                <div className={`${stat.number === "רמת הגולן - אילת" ? "text-lg md:text-xl" : "text-3xl md:text-4xl"} font-bold text-gradient mb-2 min-h-[3rem] md:min-h-[4rem] flex items-center justify-center`}>
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
};
