import { resolve } from "node:path";
import { defineConfig } from "vite";
import terser from "@rollup/plugin-terser";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.js"),
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
			"@layout": resolve(__dirname, "packages/layout"),
			"@token": resolve(__dirname, "packages/token"),
			"@typography": resolve(__dirname, "packages/typography"),
		},
	},
});
