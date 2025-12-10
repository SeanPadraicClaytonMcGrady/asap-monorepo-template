# ASAP Monorepo

## About

This is a WIP template for the ASAP team. The idea is to house all, or most, pieces of an application in one repo for ultimate developer experience & versatility.

It uses [Turborepo](https://turborepo.com) and contains:

```text
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ expo
  │   ├─ Expo SDK 54
  │   ├─ React Native 0.81 using React 19
  │   ├─ Navigation using Expo Router
  │   ├─ Tailwind CSS v4 using NativeWind v5
  │   └─ Typesafe API calls using tRPC
  ├─ nextjs
  │   ├─ Next.js 15
  │   ├─ React 19
  │   ├─ Tailwind CSS v4
  │   └─ E2E Typesafe API Server & Client
  └─ tanstack-start
      ├─ Tanstack Start v1 (rc)
      ├─ React 19
      ├─ Tailwind CSS v4
      └─ E2E Typesafe API Server & Client
packages
  ├─ api
  │   └─ tRPC v11 router definition
  ├─ auth
  │   └─ Authentication using better-auth.
  ├─ db
  │   └─ Typesafe db calls using Drizzle
  ├─ server
  │   └─ Business logic & mock db testing
  └─ ui
      └─ Start of a UI package for the webapp using shadcn-ui
tooling
  ├─ biome
      └─ for formatting & linting
  ├─ tailwind
  │   └─ shared tailwind theme and configuration
  └─ typescript
      └─ shared tsconfig you can extend from
```

> In this template, we use `@asap` as a placeholder for package names.

## Quick Start

> **Note**
> The [db](./packages/db) package is preconfigured to use Supabase and is **edge-bound** with the [Vercel Postgres](https://github.com/vercel/storage/tree/main/packages/postgres) driver. If you're using something else, make the necessary modifications to the [schema](./packages/db/src/schema.ts) as well as the [client](./packages/db/src/index.ts) and the [drizzle config](./packages/db/drizzle.config.ts). If you want to switch to non-edge database driver, remove `export const runtime = "edge";` [from all pages and api routes](https://github.com/t3-oss/create-t3-turbo/issues/634#issuecomment-1730240214).

> Webpack is the module bundler (instead of Turbopack) for the Next.js app because Serwist doesn't support Turbopack yet. It uses "--webpack" flag in the `pnpm dev` and `pnpm build` scripts in `apps/nextjs/package.json`, because Next.js 16 defaults to Turbopack.

To get it running, follow the steps below:

### 1. Setup dependencies

> [!NOTE]
>
> While the repo does contain both a Next.js and Tanstack Start version of a web app, you can pick which one you like to use and delete the other folder before starting the setup.

```bash
# Install dependencies
pnpm i

# Configure environment variables
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Drizzle schema to the database
pnpm db:push
```

### 2. Generate Better Auth Schema

This project uses [Better Auth](https://www.better-auth.com) for authentication. The auth schema needs to be generated using the Better Auth CLI before you can use the authentication features.

```bash
# Generate the Better Auth schema
pnpm --filter @asap/auth generate
```

This command runs the Better Auth CLI with the following configuration:

- **Config file**: `packages/auth/script/auth-cli.ts` - A CLI-only configuration file (isolated from src to prevent imports)
- **Output**: `packages/db/src/auth-schema.ts` - Generated Drizzle schema for authentication tables

The generation process:

1. Reads the Better Auth configuration from `packages/auth/script/auth-cli.ts`
2. Generates the appropriate database schema based on your auth setup
3. Outputs a Drizzle-compatible schema file to the `@asap/db` package

> **Note**: The `auth-cli.ts` file is placed in the `script/` directory (instead of `src/`) to prevent accidental imports from other parts of the codebase. This file is exclusively for CLI schema generation and should **not** be used directly in your application. For runtime authentication, use the configuration from `packages/auth/src/index.ts`.

For more information about the Better Auth CLI, see the [official documentation](https://www.better-auth.com/docs/concepts/cli#generate).

### 3. Configure Expo `dev`-script

#### Use iOS Simulator

1. Make sure you have XCode and XCommand Line Tools installed [as shown on expo docs](https://docs.expo.dev/workflow/ios-simulator).

   > **NOTE:** If you just installed XCode, or if you have updated it, you need to open the simulator manually once. Run `npx expo start` from `apps/expo`, and then enter `I` to launch Expo Go. After the manual launch, you can run `pnpm dev` in the root directory.

   ```diff
   +  "dev": "expo start --ios",
   ```

2. Run `pnpm dev` at the project root folder.

#### Use Android Emulator

1. Install Android Studio tools [as shown on expo docs](https://docs.expo.dev/workflow/android-studio-emulator).

2. Change the `dev` script at `apps/expo/package.json` to open the Android emulator.

   ```diff
   +  "dev": "expo start --android",
   ```

3. Run `pnpm dev` at the project root folder.

### 4. Configuring Better-Auth to work with Expo

In order to get Better-Auth to work with Expo, you must either:

#### Deploy the Auth Proxy (RECOMMENDED)

Better-auth comes with an [auth proxy plugin](https://www.better-auth.com/docs/plugins/oauth-proxy). By deploying the Next.js app, you can get OAuth working in preview deployments and development for Expo apps.

By using the proxy plugin, the Next.js apps will forward any auth requests to the proxy server, which will handle the OAuth flow and then redirect back to the Next.js app. This makes it easy to get OAuth working since you'll have a stable URL that is publicly accessible and doesn't change for every deployment and doesn't rely on what port the app is running on. So if port 3000 is taken and your Next.js app starts at port 3001 instead, your auth should still work without having to reconfigure the OAuth provider.

#### Add your local IP to your OAuth provider

You can alternatively add your local IP (e.g. `192.168.x.y:$PORT`) to your OAuth provider. This may not be as reliable as your local IP may change when you change networks. Some OAuth providers may also only support a single callback URL for each app making this approach unviable for some providers (e.g. GitHub).

### 5a. When it's time to add a new UI component

Run the `ui-add` script to add a new UI component using the interactive `shadcn/ui` CLI:

```bash
pnpm ui-add
```

When the component(s) has been installed, you should be good to go and start using it in your app.

### 5b. When it's time to add a new package

To add a new package, simply run `pnpm turbo gen init` in the monorepo root. This will prompt you for a package name as well as if you want to install any dependencies to the new package (of course you can also do this yourself later).

The generator sets up the `package.json`, `tsconfig.json` and a `index.ts`, as well as configures all the necessary configurations for tooling around your package such as formatting, linting and typechecking. When the package is created, you're ready to go build out the package.

## FAQ

### Does the starter include Solito?

No. Solito will not be included in this repo. It is a great tool if you want to share code between your Next.js and Expo app. However, the main purpose of this repo is not the integration between Next.js and Expo — it's the code splitting of your T3 App into a monorepo. The Expo app is just a bonus example of how you can utilize the monorepo with multiple apps but can just as well be any app such as Vite, Electron, etc.

Integrating Solito into this repo isn't hard, and there are a few [official templates](https://github.com/nandorojo/solito/tree/master/example-monorepos) by the creators of Solito that you can use as a reference.

### Does this pattern leak backend code to my client applications?

No, it does not. The `api` package should only be a production dependency in the Next.js application where it's served. The Expo app, and all other apps you may add in the future, should only add the `api` package as a dev dependency. This lets you have full typesafety in your client applications, while keeping your backend code safe.

If you need to share runtime code between the client and server, such as input validation schemas, you can create a separate `shared` package for this and import it on both sides.

## Deployment

### Next.js

#### Prerequisites

> **Note**
> Please note that the Next.js application with tRPC must be deployed in order for the Expo app to communicate with the server in a production environment.

#### Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com). If you've never deployed a Turborepo app there, don't worry, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory. Vercel's zero-config system should handle all configurations for you.

2. Add your `POSTGRES_URL` environment variable.

3. Done! Your app should successfully deploy. Assign your domain and use that instead of `localhost` for the `url` in the Expo app so that your Expo app can communicate with your backend when you are not in development.

### Auth Proxy

The auth proxy comes as a better-auth plugin. This is required for the Next.js app to be able to authenticate users in preview deployments. The auth proxy is not used for OAuth request in production deployments. The easiest way to get it running is to deploy the Next.js app to vercel.

### Expo

Deploying your Expo application works slightly differently compared to Next.js on the web. Instead of "deploying" your app online, you need to submit production builds of your app to app stores, like [Apple App Store](https://www.apple.com/app-store) and [Google Play](https://play.google.com/store/apps). You can read the full [guide to distributing your app](https://docs.expo.dev/distribution/introduction), including best practices, in the Expo docs.

1. Make sure to modify the `getBaseUrl` function to point to your backend's production URL:

   <https://github.com/t3-oss/create-t3-turbo/blob/656965aff7db271e5e080242c4a3ce4dad5d25f8/apps/expo/src/utils/api.tsx#L20-L37>

(WIP)
2. Go through the process of adding an app to Google Play

3. Go through the process of adding an app to Apple Store
(WIP)

## References

The stack originates from [create-t3-app](https://github.com/t3-oss/create-t3-app).

A [blog post](https://jumr.dev/blog/t3-turbo) where the original creator of the repo discusses how he combined t3 into turbo repo.

## How can I start everything?

For development, we need a local database first.

1. Run "docker compose up -d" in your terminal to turn on a database, viewable in Docker Desktop.
(use "docker compose down -v" to turn it off)
2. pnpm install
3. pnpm dev

This will run the dev environment.

pnpm is non-negotiable. It allows us to use workspaces, which is a way of organizing packages per declared workspace, and operates quickly with monorepos.

## Git Workflow

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our workflow.

## Branch Naming

- `feat/addTelemetry`
- `chore/updateVersion`
- `fix/addBracket`

---

## Merge Request Description Standard

```
title: type(optional scope): description

body:
<extended description of the changes>
<bullet points and/or checklist of key points of interest>

footer
```

**title** should be a conventional commit tag. It may have a scope. It should have a description. Note: This is the name of your branch.

**body** should contain an extended summary, and a bullet list of items of interest. It always starts with the header "Description", and gives a small summary of the goal & code. The bullets should cover relevant details. Note: if the branch touches on security, mention it.

**footer** It should include a checklist for anything necessary outside of the code, such as documentation, env vars, etc. This should be actionable. It may or may not be here depending on the requirements for the branch.

<details>
<summary><strong>Example Merge Request Description</strong></summary>

### feat(auth): add user verification

#### Description

This merge request adds user verification via credentials and fingerprints to the application. It utilizes pre-existing routes for credentials, and a new 3rd party route for the fingerprints. The 3rd party stores & compares fingerprints, so our data print is minimal to manage here.

- Added a new HoC for auth, including both credentials & the 3rd party fingerprinter.
- Updated user-related schemas.
- Added 2 new fetches.
  - One fetch goes to our old backend.
  - The other fetch goes to the 3rd party service. More below.
- Integrated 3rd party service for fingerprint scanning.
    - After initialization in the new HoC, we use a special hook to make a fetch with fingerprint data optimized by the 3rd party library.
    - SECURITY: The library handles the hashing.

#### Pre-merge checklist

- [ ] Fingerprint 3rd party url env var
- [ ] Fingerprint 3rd party key env var
- [ ] Fingerprint 3rd party documentation link here

</details>

---

## Flow

`yourBranch` + review → `development` + testing → `main`

### Before Starting Work

```bash
git checkout development
git pull origin development
git checkout -b feature/your-feature-name
```

### While Working & Before Pushes to Dev

```bash
# Regularly sync with development
git checkout development
git pull origin development
git checkout feature/your-feature-name
git merge development
```

---

## Translation (LinguiJS)

### 1. Architecture & Data Flow
The system uses **LinguiJS**. The flow moves from **Source Code** ➡️ **Extraction** ➡️ **Translation** ➡️ **Compilation** ➡️ **Runtime**.

1.  **Source (`.tsx`)**: You write text using the `<Trans>` macro.
2.  **Extraction (`.po`)**: The `extract` script scans code, finds `<Trans>` tags, and updates messages.po files.
3.  **Compilation (`.ts`)**: The `compile` script converts human-readable `.po` files into optimized TypeScript (`.ts`) files.
4.  **Runtime**: The app imports these `.ts` files to display text.

### 2. Key Concepts

*   **`<Trans>` Macro**:
    *   **How it works**: It marks text for translation. At build time, Babel/SWC replaces `<Trans>Hello</Trans>` with a function call looking up the ID "Hello".
    *   **Variables**: `<Trans>Hello {name}</Trans>` becomes `Hello {name}` in the PO file. The variable is interpolated at runtime.
    *   **Plurals**: Uses ICU MessageFormat. Example: `count, plural, one {# book} other {# books}`.
*   **`.po` vs `.ts`**:
    *   **messages.po**: The **Source of Truth** for translators. Human-readable. You edit this.
    *   **messages.ts**: The **Artifact** for the code. Machine-readable, optimized, and typed. **Do not edit this.** We switched to `.ts` (from `.js`) to fix ESM/CJS import errors in Next.js.

### 3. Developer Workflow

#### How to Add/Edit Translations
1.  **Write Code**: Add `<Trans>New Text</Trans>` in your React component.
2.  **Extract**: Run `pnpm extract` (in nextjs). This adds "New Text" to messages.po.
3.  **Translate**: Open messages.po. Find the new `msgid`. Write the translation in `msgstr`.
    *   *Rule*: **NEVER** edit `msgid` manually. Only edit `msgstr`. If you change the text in the code, run extract again to update the `msgid`.
4.  **Compile**: Run `pnpm compile`. This updates messages.ts.
5.  **Clean**: pnpm extract --clean (removes obsolete translations from PO files (e.g., deleted Trans tag in the code))

#### Automated Commands
*   **`pnpm dev`**: Uses `concurrently` to run Next.js **AND** `lingui compile --watch`. If you edit a `.po` file and save, the app updates immediately.
*   **Pre-commit Hook**: We installed `simple-git-hooks` and `lint-staged`. When you commit:
    1.  It runs `extract` (captures new strings).
    2.  It runs `compile` (ensures `.ts` files are valid).
    3.  It adds these changes to your commit automatically.

### 4. Configuration & Dependencies

*   **`@lingui/macro`**: Allows the `<Trans>` syntax.
*   **`@lingui/cli`**: Provides `extract` and `compile` commands.
*   **lingui.config.ts**: Configures where locales live (`src/locales/{locale}`) and the output format (`po` input, `ts` output).
*   **i18n.ts**: A helper that dynamically imports the *compiled* messages.ts file based on the user's locale cookie.

### Summary of Relations
`Component.tsx` (uses `<Trans>`)
⬇️  
*(pnpm extract)*
messages.po (Human edits `msgstr` here)
⬇️  
*(pnpm compile)*
`messages.ts` (Optimized JS object)
⬇️  
*(import)*
`LinguiClientProvider` (Feeds data to App)

---

Feel free to reach out to **Sean Padraic Clayton McGrady** and **Alexis Michaud** (project authors) for additional questions.
