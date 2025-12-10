# GitHub Copilot Instructions for ASAP Monorepo

## Architecture Overview

This is a Turborepo-based monorepo containing full-stack applications (Next.js, Expo) and shared packages.

- **Apps**:
  - `apps/nextjs`: Next.js 15+ application (React 19).
  - `apps/expo`: React Native (Expo SDK 54) mobile app.
- **Packages**:
  - `packages/api`: tRPC v11 router definitions.
  - `packages/auth`: Authentication logic using Better Auth.
  - `packages/db`: Drizzle ORM setup and schema definitions.
  - `packages/server`: Core business logic implementing the "Use Case" pattern.
  - `packages/ui`: Shared UI components (shadcn/ui) and Tailwind configuration.

## Core Patterns & Conventions

### Business Logic (Use Cases)
All complex business logic resides in `packages/server/src/use-cases`.
- **Structure**: Each use case has its own directory (e.g., `user/add-user/`) containing:
  - `*.use-case.ts`: The class implementing the logic.
  - `*.schema.ts`: Zod schemas for input/output.
  - `*.test.ts`: Tests for the use case.
- **Implementation**:
  - Must implement `validate()` (parses input with Zod) and `execute()` (performs logic).
  - Constructor typically injects `dbClient` and `schema`.
  - **Example**: See `packages/server/src/use-cases/user/add-user/add-user.use-case.ts`.

### Database (Drizzle ORM)
- **Location**: `packages/db`.
- **Schema**: Defined in `src/schema.ts`. Auth schema is generated in `src/auth-schema.ts`.
- **Casing**: Database columns use `snake_case` (configured in `drizzle.config.ts`).
- **Edge Compatibility**: The DB client is configured for edge runtimes (Supabase/Vercel Postgres).

### API (tRPC)
- **Location**: `packages/api`.
- **Routers**: Defined in `src/router/`.
- **Pattern**: Routers should ideally call "Use Cases" from `@asap/server` for complex logic, rather than implementing logic directly.
- **Root**: `src/root.ts` combines routers into `appRouter`.

### UI Components
- **Location**: `packages/ui`.
- **Library**: shadcn/ui based.
- **Styling**: Tailwind CSS v4.
- **Utils**: Use `cn` from `@asap/ui` for class merging.

## Developer Workflow

### Package Management
- Use `pnpm` for all package operations.
- Install dependencies: `pnpm i`.

### Database & Auth
- **Push Schema**: `pnpm db:push` (pushes Drizzle schema to DB).
- **Generate Auth Schema**: `pnpm --filter @asap/auth generate` (runs Better Auth CLI).
  - **Note**: This updates `packages/db/src/auth-schema.ts`.

### Running Apps
- **Dev**: `pnpm dev` (runs all apps via Turbo).
- **Build**: `pnpm build`.

### Environment Variables
- stored in `.env` at the root.
- Apps load env vars using `dotenv -e ../../.env` (see `apps/nextjs/package.json`).

## Tech Stack Details
- **Frameworks**: Next.js 15, React 19, Expo SDK 54.
- **Styling**: Tailwind CSS v4, NativeWind v5 (for Expo).
- **State/Data**: TanStack Query, tRPC.
- **Validation**: Zod.

## Product: Spicy / Hot Horoscope App (MVP)

>Note: ADD YOUR PRODUCT DESCRIPTION HERE * 

## Implementation Mandates (copy of your constraints)

1. Target app: `apps/nextjs` only. Do not add Expo changes for this flow.
2. Styling: Use Tailwind CSS v4 through the shared `@asap/tailwind-config`. Implement the cosmic palette using that config (CSS variables or utility classes).
3. Components: Use and extend components from `@asap/ui` (shadcn/ui-based). Keep component props compatible with shadcn patterns.
4. Data: Use the `@asap/api` tRPC client for all data access in the UI.
5. Motion: Framer Motion in `apps/nextjs` and use it for parallax, tilt, and micro-interactions.

## UI/UX Flow — Where to add files (suggested)
- Authentication page: `apps/nextjs/src/app/page.tsx` (animated cosmic background, sign-in buttons)
- Onboarding: `apps/nextjs/src/app/onboarding/page.tsx` (3 steps: date, hour, city)
- Dashboard: `apps/nextjs/src/app/dashboard/page.tsx` with `Tabs` for Daily / Weekly / Custom
- Individual components: `apps/nextjs/src/components/horoscope/Hero.tsx`, `ReadingCard.tsx`, `AdUnlockDialog.tsx`, `ProductRecommendationCard.tsx`

Keep components small and add design-only variants in `@asap/ui` only when they will be reused across apps.

## Key files & patterns to reference
- Use Case pattern: `packages/server/src/use-cases/*` (validate/execute pattern).
- Drizzle schema: `packages/db/src/schema.ts` and `drizzle.config.ts` (snake_case casing).
- tRPC root: `packages/api/src/root.ts` and `packages/api/src/trpc.ts` (router composition pattern).
- Next.js `with-env` script: see `apps/nextjs/package.json` for `pnpm with-env` usage.