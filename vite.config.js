import { resolve } from "node:path";
import terser from "@rollup/plugin-terser";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "index.js"),
      fileName: "x",
      formats: ["cjs", "es", "iife"],
      name: "x",
    },
    minify: false,
    outDir: "dist",
    rollupOptions: {
      plugins: [
        terser({
          format: {
            comments: false,
          },
        }),
      ],
    },
    sourcemap: true,
  },
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
});
