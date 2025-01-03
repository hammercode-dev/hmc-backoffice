import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.baparkir.com',
        changeOrigin: true,
      }
    }
  },
  preview: {
    port: 3000
  },
  base: '/'
});
