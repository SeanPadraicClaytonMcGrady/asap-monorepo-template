import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { NetworkOnly, Serwist } from "serwist";

declare global {
	interface WorkerGlobalScope extends SerwistGlobalConfig {
		__SW_MANIFEST: (PrecacheEntry | string)[];
	}
}

declare const self: WorkerGlobalScope;

const serwist = new Serwist({
	precacheEntries: self.__SW_MANIFEST,
	skipWaiting: true,
	clientsClaim: true,
	navigationPreload: false,
	runtimeCaching: [
		{
			matcher: ({ url }) => {
				if (
					url.pathname.includes("/api/auth/") ||
					url.pathname.includes("/api/trpc") ||
					url.pathname.includes("/loading")
				) {
					return false;
				}
				return true;
			},
			handler: new NetworkOnly({}),
		},
	],
});

serwist.addEventListeners();
