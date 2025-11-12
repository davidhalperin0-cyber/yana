import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-foreground text-background">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-4">
          <h3 className="text-2xl font-serif font-bold mb-2">Luxury Events</h3>
          <p className="text-background/70">Crafting Unforgettable Moments</p>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-sm text-background/60">
          <span>Made with</span>
          <Heart className="w-4 h-4 fill-primary text-primary" />
          <span>© 2024 Luxury Events. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
