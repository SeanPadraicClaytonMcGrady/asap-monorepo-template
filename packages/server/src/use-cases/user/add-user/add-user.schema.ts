import { z } from "zod";

export const AddUserInputSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.email(),
	emailVerified: z.boolean().optional(),
	image: z.string().optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const AddUserOutputSchema = z.object({
	// Define your output schema fields here
});

export type AddUserInput = z.infer<typeof AddUserInputSchema>;
export type AddUserOutput = z.infer<typeof AddUserOutputSchema>;
