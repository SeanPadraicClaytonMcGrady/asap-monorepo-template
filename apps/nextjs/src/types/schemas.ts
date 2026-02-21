import * as z from "zod";

export const signInSchema = z.object({
	email: z.email("Invalid email address").min(1, "Email is required"),
	password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.min(2, "Name must be at least 2 characters"),
	email: z.email("Invalid email address").min(1, "Email is required"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters"),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
