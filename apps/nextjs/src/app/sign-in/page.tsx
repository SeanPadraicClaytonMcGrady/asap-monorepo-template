import Link from "next/link";
import { SignInForm } from "~/components/auth/sign-in-form";

export default function SignInPage() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-md space-y-6 p-8">
				<div className="space-y-2 text-center">
					<h1 className="text-3xl font-bold">Sign In</h1>
					<p className="text-muted-foreground">
						Enter your credentials to access your account
					</p>
				</div>
				<SignInForm />
				<p className="text-center text-sm text-muted-foreground">
					Don't have an account?{" "}
					<Link href="/sign-up" className="text-primary hover:underline">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}
