import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@component": resolve(__dirname, "packages/component"),
      "@data": resolve(__dirname, "packages/data"),
      "@directive": resolve(__dirname, "packages/directive"),
      "@form": resolve(__dirname, "packages/form"),
      "@layout": resolve(__dirname, "packages/layout"),
      "@middleware": resolve(__dirname, "packages/middleware"),
      "@mixin": resolve(__dirname, "packages/mixin"),
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
        statements: 0,
        branches: 0,
        functions: 0,
        lines: 0,
      },
    },
    environment: "happy-dom",
    setupFiles: resolve(__dirname, "happydom.js"),
  },
});
