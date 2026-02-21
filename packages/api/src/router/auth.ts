import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";

import { protectedProcedure, publicProcedure } from "../trpc.ts";

export const authRouter = {
	getSession: publicProcedure.query(({ ctx }) => {
		return ctx.session;
	}),

	signUp: publicProcedure
		.input(
			z.object({
				email: z.email(),
				password: z.string().min(8),
				name: z.string().min(1),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const result = await ctx.authApi.signUpEmail({
				body: {
					...input,
				},
			});

			return result;
		}),

	signIn: publicProcedure
		.input(
			z.object({
				email: z.email(),
				password: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const result = await ctx.authApi.signInEmail({
				body: {
					email: input.email,
					password: input.password,
				},
			});

			return result;
		}),

	signOut: protectedProcedure.mutation(async ({ ctx }) => {
		await ctx.authApi.signOut({
			headers: {},
		});
		return { success: true };
	}),

	getSecretMessage: protectedProcedure.query(() => {
		return "you can see this secret message!";
	}),
} satisfies TRPCRouterRecord;
