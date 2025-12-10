import { randomUUID } from "node:crypto";
import { db } from "@asap/db";
import { expo } from "@better-auth/expo";
import type { BetterAuthOptions, BetterAuthPlugin } from "better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { oAuthProxy } from "better-auth/plugins";

export function initAuth<
	TExtraPlugins extends BetterAuthPlugin[] = [],
>(options: {
	baseUrl: string;
	productionUrl: string;
	secret: string | undefined;

	discordClientId: string;
	discordClientSecret: string;
	googleClientId: string;
	googleClientSecret: string;
	appleClientId?: string;
	appleClientSecret?: string;
	extraPlugins?: TExtraPlugins;
}) {
	const config = {
		database: drizzleAdapter(db, {
			provider: "pg",
		}),
		baseURL: options.baseUrl,
		secret: options.secret,
		plugins: [
			oAuthProxy({
				productionURL: options.productionUrl,
			}),
			expo(),
			...(options.extraPlugins ?? []),
		],
		socialProviders: {
			discord: {
				clientId: options.discordClientId,
				clientSecret: options.discordClientSecret,
				// redirectURI: `${options.productionUrl}/api/auth/callback/discord`, // Will use default base URL
			},
			google: {
				clientId: options.googleClientId,
				clientSecret: options.googleClientSecret,
				redirectURI: `${options.baseUrl}/api/auth/callback/google`,
			},
			...(options.appleClientId && options.appleClientSecret
				? {
						apple: {
							clientId: options.appleClientId,
							clientSecret: options.appleClientSecret,
							// redirectURI: `${options.productionUrl}/api/auth/callback/apple`, // Will use default base URL
						},
					}
				: {}),
		},
		advanced: {
			database: {
				generateId: () => randomUUID(),
			},
		},
		trustedOrigins: ["expo://", options.baseUrl],
		onAPIError: {
			onError(error, ctx) {
				console.error("BETTER AUTH API ERROR", error, ctx);
			},
		},
	} satisfies BetterAuthOptions;

	return betterAuth(config);
}

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];
