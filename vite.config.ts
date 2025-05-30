import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRouter()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  build: {
    rollupOptions: {
      // experimental: {
      //   useAdvancedChunks: true,
      // },
      output: {
        advancedChunks: {
          minSize: 10_000,
          minModuleSize: 10_000,
        },
      },
    },
  },
});
