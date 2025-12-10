import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
});

/**
 * Validate environment variables at runtime
 */
export const env = envSchema.parse({
	NODE_ENV: process.env.NODE_ENV,
});
