import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		alias: {
		  "@component": resolve(__dirname, "packages/component"),
			"@directive": resolve(__dirname, "packages/directive"),
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
				statements: 80,
				branches: 80,
				functions: 80,
				lines: 80,
			},
		},
		environment: "happy-dom",
		setupFiles: resolve(__dirname, 'happydom.js')
	},
});
