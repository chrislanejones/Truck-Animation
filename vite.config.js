import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Split React separately
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            // Split Three.js core
            if (id.includes('three/build/three.module')) {
              return 'three-core';
            }
            // Split React Three Fiber
            if (id.includes('@react-three/fiber')) {
              return 'r3f';
            }
            // Split React Three Drei
            if (id.includes('@react-three/drei')) {
              return 'drei';
            }
            // Split Theatre.js
            if (id.includes('@theatre')) {
              return 'theatre';
            }
            // Split UI libraries
            if (id.includes('leva') || id.includes('framer-motion')) {
              return 'ui';
            }
            // Other Three.js related dependencies
            if (id.includes('three')) {
              return 'three-extras';
            }
          }
        }
      }
    },
    chunkSizeWarningLimit: 650
  }
});
