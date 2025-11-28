import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteSourceLocator } from "@metagptx/vite-plugin-source-locator";

export default defineConfig({
  root: ".",              // ✅ FORCE correct project root
  publicDir: "public",    // ✅ FORCE public folder usage

  plugins: [
    viteSourceLocator({
      prefix: "mgx",
    }),
    react(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
