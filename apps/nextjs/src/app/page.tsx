import { Trans } from "@lingui/react/macro";
// import { authClient } from "~/auth/client";
import { HydrateClient } from "~/trpc/server.tsx";

export default function HomePage() {
	// const handleOAuthLogin = async (provider: "google" | "apple") => {
	// 	await authClient.signIn.social({
	// 		provider,
	// 		callbackURL: "/loading",
	// 	});
	// };

	return (
		<HydrateClient>
			<main className="container h-screen py-16">
				<div className="flex flex-col items-center justify-center gap-4">
					<h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
						<Trans>
							Create the App <span className="text-primary">ASAP</span>
						</Trans>
					</h1>

					<div className="text-center text-2xl"></div>
				</div>
			</main>
		</HydrateClient>
	);
}
