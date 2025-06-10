import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@component": resolve(__dirname, "packages/component"),
      "@data": resolve(__dirname, "packages/data"),
      "@directive": resolve(__dirname, "packages/directive"),
      "@form": resolve(__dirname, "packages/form"),
      "@interface": resolve(__dirname, "packages/interface"),
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
        statements: 10,
        branches: 10,
        functions: 10,
        lines: 10,
      },
    },
    environment: "happy-dom",
    setupFiles: resolve(__dirname, "happydom.js"),
  },
});
