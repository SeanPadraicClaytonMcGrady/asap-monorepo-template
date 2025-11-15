import { desc, eq } from "@asap/db";
import { CreatePostSchema, post } from "@asap/db/schema";
import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";

import { protectedProcedure, publicProcedure } from "../trpc.ts";

export const postRouter = {
	all: publicProcedure.query(({ ctx }) => {
		return ctx.db.query.post.findMany({
			orderBy: desc(post.id),
			limit: 10,
		});
	}),

	byId: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(({ ctx, input }) => {
			return ctx.db.query.post.findFirst({
				where: eq(post.id, input.id),
			});
		}),

	create: protectedProcedure
		.input(CreatePostSchema)
		.mutation(({ ctx, input }) => {
			return ctx.db.insert(post).values(input);
		}),

	delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
		return ctx.db.delete(post).where(eq(post.id, input));
	}),
} satisfies TRPCRouterRecord;
