import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	root: "./",
	publicDir: "./public",
	base: "/",
	server: {
		host: true,
		watch: true,
		open: !(
			"SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env
		),
	},
	build: {
		outDir: "./dist",
		emptyOutDir: true,
		sourcemap: true,
	},
});
