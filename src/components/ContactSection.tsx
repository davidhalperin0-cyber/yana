import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactSectionProps {
  onFormSubmit?: (email?: string) => void;
  hasCourseAccess?: boolean;
  onGoToCourse?: () => void;
}

export const ContactSection = ({ onFormSubmit, hasCourseAccess, onGoToCourse }: ContactSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using Web3Forms - simple email service
      // Get your access key from https://web3forms.com (free, no signup needed)
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY";

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `פנייה חדשה מאתר - ${formData.name}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        console.error("Web3Forms API error:", errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Web3Forms response:", result);

      if (result.success) {
        toast.success("תודה! אהיה בקשר בקרוב כדי ליצור קסם יחד.");
        // Save email before clearing form
        const userEmail = formData.email;
        setFormData({ name: "", email: "", phone: "", message: "" });
        // Trigger course page display with email
        if (onFormSubmit) {
          onFormSubmit(userEmail);
        }
      } else {
        console.error("Web3Forms error:", result);
        throw new Error(result.message || "Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("אירעה שגיאה בשליחת ההודעה. נסי שוב מאוחר יותר.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 px-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {hasCourseAccess ? "למדריך המלא" : "לקבלת המדריך"}
          </h2>
          {hasCourseAccess && onGoToCourse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <p className="text-lg text-muted-foreground mb-4">
                יש לך כבר גישה למדריך המלא!
              </p>
              <Button
                size="lg"
                onClick={onGoToCourse}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-luxury text-lg px-8 py-6"
              >
                צפייה במדריך
              </Button>
            </motion.div>
          )}
        </motion.div>

        <div className="flex flex-col items-center">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-2xl mb-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  name="name"
                  placeholder="השם שלך"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-12 bg-background/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>

              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="האימייל שלך"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 bg-background/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>

              <div>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="מספר הטלפון שלך"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  dir="rtl"
                  className="h-12 bg-background/50 border-border/50 focus:border-primary transition-colors text-right"
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="ספרי לי על החזון שלך לאירוע..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors resize-none"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary hover:opacity-90 text-white shadow-luxury text-lg py-6 letter-glow disabled:opacity-50"
                >
                  {isSubmitting ? "שולח..." : "לקבלת המדריך"}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-5xl"
          >
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">ליצירת קשר</h3>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-12">
                <div className="flex items-start gap-3 md:gap-4 w-full md:w-auto">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm md:text-base">אימייל</p>
                    <a 
                      href="mailto:yanchigolan@gmail.com?subject=פנייה מאתר" 
                      className="text-muted-foreground hover:text-primary transition-colors cursor-pointer underline-offset-2 hover:underline text-sm md:text-base break-all"
                    >
                      yanchigolan@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4 w-full md:w-auto">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm md:text-base">טלפון</p>
                    <a 
                      href="tel:+972546480748" 
                      className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm md:text-lg font-medium tracking-wide"
                      dir="ltr"
                    >
                      +972 54-648-0748
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4 w-full md:w-auto">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm md:text-base">מיקום</p>
                    <p className="text-muted-foreground text-sm md:text-base">ראשון לציון</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};



