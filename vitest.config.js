import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@component": resolve(__dirname, "packages/component"),
      "@directive": resolve(__dirname, "packages/directive"),
      "@form": resolve(__dirname, "packages/form"),
      "@interface": resolve(__dirname, "packages/interface"),
      "@layout": resolve(__dirname, "packages/layout"),
      "@middleware": resolve(__dirname, "packages/middleware"),
      "@polyfill": resolve(__dirname, "packages/polyfill"),
      "@spark": resolve(__dirname, "packages/spark"),
      "@token": resolve(__dirname, "packages/token"),
      "@typography": resolve(__dirname, "packages/typography"),
    },
  },
  test: {
    coverage: {
      include: ["packages/**/*.{js,ts}"],
      exclude: ["packages/**/index.{js,ts}"],
      reporter: ["text", "lcov", "html"],
      thresholds: {
        statements: 70,
        branches: 70,
        functions: 70,
        lines: 70,
      },
    },
    environment: "happy-dom",
    setupFiles: resolve(__dirname, "happydom.js"),
  },
});
