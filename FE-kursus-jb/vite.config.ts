import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 5173,
  },
  envPrefix: "JB_ENV_",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
