"use client";

import { Button } from "@asap/ui/button";
import { Input } from "@asap/ui/input";
import { Label } from "@asap/ui/label";
import { toast } from "@asap/ui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "~/auth/client";
import type { SignInInput } from "~/types/schemas";
import { signInSchema } from "~/types/schemas";
import type { FormErrors } from "~/types/types";

export function SignInForm() {
	const router = useRouter();
	const [formData, setFormData] = useState<SignInInput>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<FormErrors<SignInInput>>({});
	const [isPending, setIsPending] = useState<boolean>(false);

	const validateField = (field: keyof SignInInput, value: string) => {
		const result = signInSchema.shape[field].safeParse(value);
		if (result.success) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		} else {
			setErrors((prev) => ({
				...prev,
				[field]: result.error.issues[0]?.message || "Invalid value",
			}));
		}
	};

	const handleChange = (field: keyof SignInInput, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		validateField(field, value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate all fields
		const result = signInSchema.safeParse(formData);
		if (!result.success) {
			const newErrors: FormErrors<SignInInput> = {};
			result.error.issues.forEach((err) => {
				if (err.path[0]) {
					newErrors[err.path[0] as keyof SignInInput] = err.message;
				}
			});
			setErrors(newErrors);
			return;
		}

		setIsPending(true);
		try {
			await authClient.signIn.email(formData);
			toast.success("Signed in successfully");
			router.push("/");
			router.refresh();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Failed to sign in");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					type="email"
					value={formData.email}
					onChange={(e) => handleChange("email", e.target.value)}
					required
				/>
				{errors.email && (
					<p className="text-sm text-destructive">{errors.email}</p>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>
				<Input
					id="password"
					type="password"
					value={formData.password}
					onChange={(e) => handleChange("password", e.target.value)}
					required
				/>
				{errors.password && (
					<p className="text-sm text-destructive">{errors.password}</p>
				)}
			</div>
			<Button type="submit" className="w-full" disabled={isPending}>
				{isPending ? "Signing in..." : "Sign In"}
			</Button>
		</form>
	);
}
