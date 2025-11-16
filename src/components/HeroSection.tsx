import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import heroBackground from "@/assets/Gemini_Generated_Image_ajl9nlajl9nlajl9.png";

interface HeroSectionProps {
  onGoToCourse?: () => void;
}

export const HeroSection = ({ onGoToCourse }: HeroSectionProps) => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroBackground})`,
            backgroundPosition: 'center top',
            backgroundSize: 'cover'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background" />
      </motion.div>

      {/* Floating mist particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-primary/20 rounded-full blur-md"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * -150],
              x: [null, Math.random() * 50 - 25],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-background letter-glow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            מדריך לזוגות
            <br />
            <span className="text-primary drop-shadow-glow">שלא רוצים אולם</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-background/90 mb-4 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <span className="font-bold">אירועי שטח בטבע תחת כיפת השמיים</span>
          </motion.p>
          
          <motion.p
            className="text-lg md:text-xl text-background/80 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <span className="font-bold">גלו את הקסם של אירועים בטבע - מדבר, יער, ים, נהר, או כל מקום אחר. כל מה שצריך לדעת כדי להפוך שטח פתוח לחתונה הכי מיוחדת שראיתם.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {onGoToCourse ? (
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-luxury text-lg px-8 py-6"
                onClick={onGoToCourse}
              >
                חזרה למדריך
              </Button>
            ) : (
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-luxury text-lg px-8 py-6"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                לקבלת המדריך
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              className="bg-background/10 backdrop-blur-md border-background/30 text-background hover:bg-background/20 text-lg px-8 py-6"
              onClick={scrollToNext}
            >
              גלו עוד
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToNext}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-8 h-8 text-background/70" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
