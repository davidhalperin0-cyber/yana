import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative py-12 px-4 bg-foreground text-background overflow-hidden">
      {/* Firefly particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary rounded-full blur-sm firefly"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-2">Outdoor Events</h3>
          <p className="text-background/70">Designing experiences that touch the soul</p>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-sm text-background/60">
          <span>© 2024 Outdoor Events by Yana Golan. All rights reserved to David Halperin.</span>
        </div>
      </div>
    </footer>
  );
};
