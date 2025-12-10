import { cn } from "@asap/ui";
import { ThemeProvider } from "@asap/ui/theme";
import { Toaster } from "@asap/ui/toast";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { env } from "~/env.ts";
import { TRPCReactProvider } from "~/trpc/react.tsx";

import "~/app/styles.css";
import { LinguiClientProvider } from "~/components/lingui-client-provider";
import { getLocale, getMessages } from "~/lib/i18n";

export const metadata: Metadata = {
	metadataBase: new URL(
		env.NODE_ENV === "production"
			? (process.env.BASE_URL as string)
			: "http://localhost:3000",
	),
	title: "Template",
	description: "Describe your app here",
	icons: {
		icon: "/whoroscope-icon-192x.png",
	},
	openGraph: {
		title: "Template",
		description: "Describe your app here",
		url: "http://localhost:3000",
		siteName: "Template",
	},
	twitter: {
		card: "summary_large_image",
		site: "@template",
		creator: "@template",
	},
};

export const viewport: Viewport = {
	themeColor: "#2e1065",
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

const geistSans = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
});

export default async function RootLayout(props: { children: React.ReactNode }) {
	const locale = await getLocale();
	const messages = await getMessages(locale);

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-background font-sans text-foreground antialiased",
					geistSans.variable,
					geistMono.variable,
				)}
			>
				<LinguiClientProvider locale={locale} messages={messages}>
					<ThemeProvider>
						<TRPCReactProvider>
							{props.children}
							<Toaster />
						</TRPCReactProvider>
					</ThemeProvider>
				</LinguiClientProvider>
			</body>
		</html>
	);
}
