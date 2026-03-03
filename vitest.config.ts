/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// vitest.config.ts
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"], 
      include: ['src/**/*'],
      exclude: [
        '**/*.stories.*',
        '**/*.d.ts',
        'node_modules/**',
        'src/assets/**',     
        'src/messages/**',   
        'src/types/**',      
        'src/i18n/**',       
        'src/app/**',        
        '**/*.test.{ts,tsx}',
        'src/shared/ui/**',  
      ],
    },

    include: ['src/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src")
    }
  }
});