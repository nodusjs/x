import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.js"),
			fileName: "std",
			formats: ["cjs", "es"],
			name: "std",
		},
		outDir: "dist",
	},

	resolve: {
		alias: {
			"@directive": resolve(__dirname, "packages/directive"),
		},
	},
});
