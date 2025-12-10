import type { LinguiConfig } from "@lingui/conf";

const config: LinguiConfig = {
	locales: ["en", "fr", "es"],
	sourceLocale: "en",
	catalogs: [
		{
			path: "<rootDir>/src/locales/{locale}/messages",
			include: ["src"],
		},
	],
	format: "po",
	compileNamespace: "ts",
};

export default config;
