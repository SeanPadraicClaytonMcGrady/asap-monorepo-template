"use client";

import { Button } from "@asap/ui/button";
import { Input } from "@asap/ui/input";
import { Label } from "@asap/ui/label";
import { toast } from "@asap/ui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "~/auth/client";
import type { SignUpInput } from "~/types/schemas";
import { signUpSchema } from "~/types/schemas";
import type { FormErrors } from "~/types/types";

export function SignUpForm() {
	/**
	 * Consts & State
	 */
	const router = useRouter();

	const [formData, setFormData] = useState<SignUpInput>({
		name: "",
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<FormErrors<SignUpInput>>({});
	const [isPending, setIsPending] = useState(false);

	/**
	 * Handlers
	 */
	const validateField = (field: keyof SignUpInput, value: string) => {
		const result = signUpSchema.shape[field].safeParse(value);
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

	const handleChange = (field: keyof SignUpInput, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		validateField(field, value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate all fields
		const result = signUpSchema.safeParse(formData);
		if (!result.success) {
			const newErrors: FormErrors<SignUpInput> = {};
			result.error.issues.forEach((err) => {
				if (err.path[0]) {
					newErrors[err.path[0] as keyof SignUpInput] = err.message;
				}
			});
			setErrors(newErrors);
			return;
		}

		setIsPending(true);
		try {
			await authClient.signUp.email(formData);
			toast.success("Account created! Please sign in.");
			router.push("/sign-in");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Failed to sign up");
		} finally {
			setIsPending(false);
		}
	};

	/**
	 * Renders
	 */
	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="name">Name</Label>
				<Input
					id="name"
					value={formData.name}
					onChange={(e) => handleChange("name", e.target.value)}
					required
				/>
				{errors.name && (
					<p className="text-sm text-destructive">{errors.name}</p>
				)}
			</div>
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
				<Label htmlFor="password">Password (min 8 characters)</Label>
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
				{isPending ? "Creating account..." : "Sign Up"}
			</Button>
		</form>
	);
}
