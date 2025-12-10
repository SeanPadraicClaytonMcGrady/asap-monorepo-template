import type { Metadata } from "next";
import "./globals.css";
import "./styles.css";

export const metadata: Metadata = {
	title: "Whoroscope | Your Spicy Destiny",
	description:
		"Get your personalized horoscope reading with AI-powered insights",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="selection:bg-pink-500 selection:text-white">
				{children}
			</body>
		</html>
	);
}
