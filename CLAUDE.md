# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `pnpm dev` - Start all apps in watch mode via Turbo
- `pnpm dev:next` - Start only Next.js app
- `pnpm build` - Build all packages
- `pnpm typecheck` - Typecheck all packages

### Database
- `pnpm db:push` - Push Drizzle schema to database
- `pnpm db:studio` - Open Drizzle Studio (via server package)
- `pnpm generate` - Generate Drizzle client

### Authentication
- `pnpm auth:generate` - Generate Better Auth schema (updates `packages/db/src/auth-schema.ts`)

### Use Case Generation
- `pnpm --filter @asap/server usecase:add` - Run plop generator to create new use case

### Testing (Server Package)
- `pnpm --filter @asap/server test` - Run tests
- `pnpm --filter @asap/server test:coverage` - Run tests with coverage

### i18n (Next.js)
- `pnpm --filter @asap/nextjs extract` - Extract translatable strings
- `pnpm --filter @asap/nextjs compile` - Compile message catalogs

## Architecture

This is a Turborepo monorepo with:
- **Apps**: `apps/nextjs` (Next.js 16, React 19), `apps/expo` (Expo SDK 54), `apps/landing-page`
- **Packages**: `api` (tRPC), `auth` (Better Auth), `db` (Drizzle), `server` (business logic), `ui` (shadcn), `validators` (Zod)

### Better Auth Setup (Important)

Better Auth v1.4 beta is used. The server-side API uses the following pattern:

```typescript
// Server-side (in tRPC procedures)
ctx.authApi.signUpEmail({ body: { email, password, name } })
ctx.authApi.signInEmail({ body: { email, password } })
ctx.authApi.signOut({ headers })

// Client-side (in React components)
authClient.signIn.email({ email, password })
authClient.signOut()
```

Note: `ctx.authApi` is the Better Auth instance (from `@asap/auth`), not the tRPC router.

### Use Case Pattern

Complex business logic goes in `packages/server/src/use-cases/`. Each use case has:
1. **Use case file** (`*.usecase.ts`): Class with `validate()` (Zod parse) and `execute()` methods. validation for return is only necessary for situations where there would otherwise be an any (example: data from a request)
2. **Schema file** (`../validators/src/use-cases/*/*.schema.ts`): Input/output Zod schemas
3. **Test file** (`*.test.ts`): Vitest tests

Generate new use cases with `pnpm --filter @asap/server usecase:add`.

```typescript
// Example: AddUserUseCase
class AddUserUseCase {
  constructor(private input, private dbClient, private schema) {}
  validate() { return AddUserInputSchema.parse(this.input); }
  async execute() { /* business logic */ }
}
```

### tRPC Context

The tRPC context (`createTRPCContext`) provides:
- `authApi` - Better Auth instance (use for credential auth operations)
- `session` - Current user session (null if unauthenticated)
- `db` - Drizzle database client

Procedures use `publicProcedure` (anyone) or `protectedProcedure` (requires auth).

### Database Schema

- Tables defined in `packages/db/src/schema.ts`
- Auth tables generated in `packages/db/src/auth-schema.ts` by Better Auth CLI
- Columns use `snake_case` (configured in `drizzle.config.ts`)
- Drizzle client supports edge runtimes

### Package Imports

Use workspace references:
- `@asap/api` - tRPC router
- `@asap/auth` - Auth server config
- `@asap/db` - Database client and schemas
- `@asap/server` - Business logic use cases
- `@asap/ui` - UI components (shadcn)
- `@asap/validators` - Zod schemas

### Next.js tRPC Usage

Client components use the `useTRPC` hook:

```typescript
import { useTRPC } from "~/trpc/react";

function MyComponent() {
  const api = useTRPC();
  const { data } = api.auth.getSession.useQuery();
  // ...
}
```

### Environment Variables

- Root `.env` file contains all environment variables
- Apps use `pnpm with-env` prefix to load variables (e.g., `pnpm with-env next dev`)
- Required: `POSTGRES_URL`, `AUTH_SECRET`, OAuth provider credentials

### UI Components

- Location: `packages/ui/src/`
- Based on shadcn/ui with Tailwind CSS v4
- Use `cn()` from `@asap/ui` for class merging
- Import pattern: `import { Button } from "@asap/ui/button"`

////

### Tanstack React Query usage in the Next.js app

Always use Tanstack React Query to make fetches. It's easy to centralize handling all logic related to a fetch with their onSuccess, onError methods.

In the Next.js app, this is the correct syntax to use a method from the authClient.

const result = await authClient.signUp.email({
	email,
	password,
	name,
  });

- The following is the correct syntax to use Tanstack React Query & tRPC together.
- For mutations, it's possible to avoid try catch blocks by using onError, onSuccess, and other methods. Centralize all handling this way.
- For queries, use the same pattern but leave the queryOptions() without parameters.

	const api = useTRPC();
	const submitToAI = useMutation(
		api.ai.submitToAI.mutationOptions({
			onError: (error) => {
				console.error("AI submission failed:", error);
				alert("Something went wrong. Please try again.");
			},
		}),
	);

### Drizzle Usage

For Drizzle, this is the correct way to use eq

	await this.dbClient
		.update(this.schema.user)
		.set({ name: fullName })
		.where(eq(this.schema.user.id, userId));

### tRPC Router Creation

Here is an example of what a router should look like on the tRPC side in the api package. There should be an input included in the procedure for type validation. 

- If needed, you can obtain userId from the ctx in tRPC, and you must make & use a preinput schema in the input parameter instead of the use case's input schema. 
- All inputs and types should be in the validators package in the respective use case's validator folder.

import { MigrateLocalStorageUseCase } from "@asap/server";
import { MigrateLocalStoragePreInputSchema } from "@asap/validators";
import type { TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure } from "../trpc.ts";

export const storageRouter = {
	migrateLocalStorage: protectedProcedure
		.input(MigrateLocalStoragePreInputSchema)
		.mutation(async ({ input, ctx }) => {
			const userId = ctx.session.user.id;
			const useCase = new MigrateLocalStorageUseCase(
				{
					userId: userId,
					...input,
				},
				ctx.db,
				ctx.schema,
			);
			return useCase.execute();
		}),
} satisfies TRPCRouterRecord;