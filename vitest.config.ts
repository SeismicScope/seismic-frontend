/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
   coverage: {
    provider: "v8",
    reporter: ["text", "html"],
    include: ['src/**/*'],
    exclude: [
      '**/*.stories.*', 
      '**/*.d.ts', 
      'node_modules/**',
      '**/*.mdx',      
      'src/docs/**',    
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