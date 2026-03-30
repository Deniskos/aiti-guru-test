import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		modules: {
			localsConvention: "camelCase", // или 'dashes'
			scopeBehaviour: "local",
			generateScopedName: "[name]__[local]___[hash:base64:5]",
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
