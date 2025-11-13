import { authRouter } from "./router/auth.ts";
import { postRouter } from "./router/post.ts";
import { createTRPCRouter } from "./trpc.ts";

export const appRouter = createTRPCRouter({
	auth: authRouter,
	post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
