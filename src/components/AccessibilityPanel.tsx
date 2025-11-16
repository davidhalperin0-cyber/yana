import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Type, Contrast, Accessibility, X } from "lucide-react";
import { Button } from "./ui/button";

export const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    const savedFontSize = parseFloat(localStorage.getItem("fontSize") || "1");
    const savedHighContrast = localStorage.getItem("highContrast") === "true";

    setIsDarkMode(savedDarkMode);
    setFontSize(savedFontSize);
    setHighContrast(savedHighContrast);

    // Apply dark mode
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }

    // Apply font size
    document.documentElement.style.fontSize = `${savedFontSize * 16}px`;

    // Apply high contrast
    if (savedHighContrast) {
      document.documentElement.classList.add("high-contrast");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 0.1, 1.5);
    setFontSize(newSize);
    localStorage.setItem("fontSize", String(newSize));
    document.documentElement.style.fontSize = `${newSize * 16}px`;
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 0.1, 0.8);
    setFontSize(newSize);
    localStorage.setItem("fontSize", String(newSize));
    document.documentElement.style.fontSize = `${newSize * 16}px`;
  };

  const resetFontSize = () => {
    setFontSize(1);
    localStorage.setItem("fontSize", "1");
    document.documentElement.style.fontSize = "16px";
  };

  const toggleHighContrast = () => {
    const newContrast = !highContrast;
    setHighContrast(newContrast);
    localStorage.setItem("highContrast", String(newContrast));

    if (newContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 md:bottom-6 left-4 md:left-6 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary text-white shadow-luxury flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="פתח תפריט נגישות"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Accessibility className="w-6 h-6" />}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed bottom-24 left-4 md:left-6 z-50 bg-background border-2 border-primary rounded-2xl shadow-luxury p-4 md:p-6 w-[calc(100vw-2rem)] max-w-80 md:w-80"
          >
            <h3 className="text-xl font-bold mb-4 text-center">נגישות</h3>

            <div className="space-y-4">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-primary" />
                  ) : (
                    <Moon className="w-5 h-5 text-primary" />
                  )}
                  <span className="text-sm font-medium">מצב לילה</span>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    isDarkMode ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      isDarkMode ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Font Size Controls */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Type className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">גודל טקסט</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={decreaseFontSize}
                    className="flex-1"
                  >
                    קטן
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={resetFontSize}
                    className="flex-1"
                  >
                    רגיל
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={increaseFontSize}
                    className="flex-1"
                  >
                    גדול
                  </Button>
                </div>
              </div>

              {/* High Contrast Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Contrast className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">ניגודיות גבוהה</span>
                </div>
                <button
                  onClick={toggleHighContrast}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    highContrast ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      highContrast ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

