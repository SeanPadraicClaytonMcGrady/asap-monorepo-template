import withSerwistInit from "@serwist/next";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
await jiti.import("./src/env");

const withSerwist = withSerwistInit({
	// Note: This is where the service worker is generated
	swSrc: "src/app/sw.ts",
	swDest: "public/sw.js",
});

/** @type {import("next").NextConfig} */
const config = {
	/** Enables hot reloading for local packages without a build step */
	transpilePackages: [
		"@asap/api",
		"@asap/auth",
		"@asap/db",
		"@asap/ui",
		"@asap/validators",
	],

	/** We already do linting and typechecking as separate tasks in CI */
	typescript: { ignoreBuildErrors: true },
	experimental: {
		swcPlugins: [["@lingui/swc-plugin", {}]],
	},
	webpack(config) {
		// Fixes npm packages that depend on `fs` module
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false,
		};
		return config;
	},
};

export default withSerwist(config);
