import Link from "next/link";
import { SignUpForm } from "~/components/auth/sign-up-form";

export default function SignUpPage() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-md space-y-6 p-8">
				<div className="space-y-2 text-center">
					<h1 className="text-3xl font-bold">Sign Up</h1>
					<p className="text-muted-foreground">
						Create a new account to get started
					</p>
				</div>
				<SignUpForm />
				<p className="text-center text-sm text-muted-foreground">
					Already have an account?{" "}
					<Link href="/sign-in" className="text-primary hover:underline">
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}
