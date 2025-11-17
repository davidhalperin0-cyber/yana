import { motion } from "framer-motion";
import { Button } from "./ui/button";

export const FloatingContactButton = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-40"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={scrollToContact}
          size="lg"
          className="rounded-full px-6 py-6 md:px-8 md:py-6 bg-primary hover:bg-primary/90 text-white shadow-luxury text-base md:text-lg font-semibold"
          aria-label="לקבלת המדריך"
        >
          לקבלת המדריך
        </Button>
      </motion.div>
    </motion.div>
  );
};

