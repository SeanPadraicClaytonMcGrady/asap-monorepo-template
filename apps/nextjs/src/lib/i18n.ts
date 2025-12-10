import { cookies } from "next/headers";

export const SUPPORTED_LOCALES = ["en", "fr", "es"];
export const DEFAULT_LOCALE = "en";

export async function getLocale() {
	const cookieStore = await cookies();
	const locale = cookieStore.get("NEXT_LOCALE")?.value;
	if (locale && SUPPORTED_LOCALES.includes(locale)) {
		return locale;
	}
	return DEFAULT_LOCALE;
}

export async function getMessages(locale: string) {
	// We will import the compiled messages
	const { messages } = await import(`../locales/${locale}/messages.ts`);
	return messages;
}
