import "server-only";

import { initAuth } from "@asap/auth";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { cache } from "react";

import { env } from "~/env.ts";

const baseUrl = env.BASE_URL;

export const auth = initAuth({
	baseUrl: `${env.BASE_URL}`,
	productionUrl: `${env.BASE_URL}`,
	secret: env.AUTH_SECRET,
	discordClientId: env.AUTH_DISCORD_ID,
	discordClientSecret: env.AUTH_DISCORD_SECRET,
	googleClientId: env.AUTH_GOOGLE_ID,
	googleClientSecret: env.AUTH_GOOGLE_SECRET,
	appleClientId: env.AUTH_APPLE_ID,
	appleClientSecret: env.AUTH_APPLE_SECRET,
	extraPlugins: [nextCookies()],
});

export const getSession = cache(async () =>
	auth.api.getSession({ headers: await headers() }),
);
