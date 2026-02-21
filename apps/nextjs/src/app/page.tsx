"use client";

import { Button } from "@asap/ui/button";
import { Trans } from "@lingui/react/macro";
import { useQuery } from "@tanstack/react-query";

import { authClient } from "~/auth/client";
import { useTRPC } from "~/trpc/react";

export default function HomePage() {
	const api = useTRPC();
	const { data: session } = useQuery(api.auth.getSession.queryOptions());

	const handleSignOut = async () => {
		await authClient.signOut();
	};

	return (
		<main className="container h-screen py-16">
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
					<Trans>Create the App</Trans>{" "}
					<span className="text-primary">ASAP</span>
				</h1>

				{session?.user ? (
					<div className="flex items-center gap-4">
						<p>Welcome, {session.user.name}!</p>
						<Button onClick={handleSignOut} variant="outline">
							Sign Out
						</Button>
					</div>
				) : (
					<div className="flex gap-4">
						<Button asChild>
							<a href="/sign-in">Sign In</a>
						</Button>
						<Button asChild variant="outline">
							<a href="/sign-up">Sign Up</a>
						</Button>
					</div>
				)}
			</div>
		</main>
	);
}
