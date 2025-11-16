import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // For GitHub Pages, use /yana/ base path
  // For Vercel, use / (root)
  const isGitHubPages = process.env.GITHUB_PAGES === 'true';
  const isProduction = process.env.NODE_ENV === 'production' || mode === 'production';
  return {
  base: (isProduction && isGitHubPages) ? '/yana/' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
