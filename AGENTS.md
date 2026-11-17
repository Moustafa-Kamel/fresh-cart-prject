# AGENTS.md
# Note
All code paths are under src/ (e.g. src/lib/api/client.ts). The docs/ folder is at the project root.
## Project
E-commerce storefront built with **Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui**.
Backend: the Route Academy public e-commerce REST API (`API_BASE_URL=https://ecommerce.routemisr.com/api/v1`).
Design source: Figma -> Google Stitch (screens + DESIGN.md). Local copies live in docs/design/.
For a task, read only the images for the section I name. Do not load the whole folder.
The owner is a junior developer who is learning Next.js (see "Working with the owner").

Read first: `docs/PROJECT_STRUCTURE.md` (routes, folders, build phases) and the skills in `.agents/skills/`.

## Commands
- `npm run dev` - dev server
- `npm run lint` - Biome
- `npx tsc --noEmit` - type check
- `npm run build` - production build (must pass before a phase is "done")

## Stack and decisions
- **Next.js App Router.** Check the installed version in `package.json` and the official docs before using version-sensitive APIs (`params`, `searchParams`, `cookies()`, caching options, `proxy.ts` vs `middleware.ts`). Do not rely on memory.
- **UI:** shadcn/ui + Tailwind + lucide-react. The theme comes from the Stitch design
- **Data:** Server Components fetch through `lib/api/*`. Mutations are Server Actions in `actions/*`. No client-side fetching for initial data, and no React Query, unless the owner asks for it.
- **Forms:** React Hook Form + Zod. The same Zod schema validates on the client and again inside the Server Action.
- **Auth:** Auth.js (next-auth) with the Credentials provider and JWT sessions. The owner writes the config, the SessionProvider and the first login flow. The API expects the token in a request header named `token`.
- **Toasts:** sonner (shadcn).
- **Cart:** prefer the "Cart (v2)" endpoints. Confirm with a real request first and record the decision in `docs/api-notes.md`.

## Code rules
- TypeScript strict. No `any`. Use `unknown` and narrow it.
- Server Component by default. Add `"use client"` only for state, effects, event handlers, or browser APIs, and put it on the smallest leaf component.
- Every API call goes through `lib/api/client.ts`. Never call `fetch` on the API directly from a component.
- Every route that loads data has `loading.tsx` and `error.tsx` (`error.tsx` must be a Client Component). Use `notFound()` for unknown ids.
- Use `next/image` (add the API image host to `images.remotePatterns`), `next/link`, and `next/font`. Internal links start with `/`.
- Use semantic Tailwind tokens (`bg-background`, `text-muted-foreground`), never hard-coded hex colors.
- Mobile-first. Check 375px, 768px and 1280px.
- Files: components `PascalCase.tsx`, other files `camelCase.ts`. Route-private components live in the route's `_components/` folder; shared ones in `components/`.
- No dead code, no commented-out code, no leftover `console.log`.

## API layer
- The owner writes src/lib/api/client.ts, the first API module, and all types in src/types/.
- Do not create or edit files in src/types/. If a type is missing, tell me.
- New API modules must copy the exact pattern of the existing one (same function style,
  error handling, naming, same use of client.ts).
- Verify every endpoint with curl first and save the real response in docs/api-samples/.

## Security
- Never commit secrets. `.env*` is git-ignored. The Stitch key lives only in the `STITCH_API_KEY` environment variable.
- The token must never be exposed to client components or logs.
- Validate all input again on the server. Show API error messages to the user, never raw stack traces.

## Working with the owner (learning mode)
- Work in the phases defined in `docs/PROJECT_STRUCTURE.md`. One phase per session. Stop at the end of a phase.
- Keep diffs small and focused. Ask before adding a dependency or changing the folder structure.
- Never invent API behavior. Verify an endpoint with a real request first (skill: `route-ecommerce-api`). If you could not verify something, say so plainly.
- Never use fake or mock data to make a page look finished unless the owner asks.
- At the end of every task report: files changed, how to test it by hand, results of lint/tsc/build, and 2-3 concepts the owner should understand from this change.

## Definition of done
At the end of each phase (not after every small change), `npm run lint`, `npx tsc --noEmit`
and `npm run build` all pass, and the feature works by hand on mobile and desktop.

## Current status
Done: Phase 1 (shell), Phase 2 (API layer), Phase 3 (catalog pages), All Phase is Done.
Guest cart and wishlist use localStorage and merge once after login. Only /checkout, /orders and /account require login (plus /allorders, the payment-return alias for /orders).
Now: matching the new Stitch design section by section (Home, then Product details, then Products).
Auth: Auth.js Credentials + JWT session. The API token stays inside the JWT and is read on the server only; it is never copied into the session.

## Skills
- `route-ecommerce-api` - any work that touches the backend API.
- `nextjs-feature-workflow` - building or changing pages, forms, actions, layouts.

## MCP servers (configured in `.codex/config.toml`)
- `stitch` - screens and design tokens from Google Stitch.
- `shadcn` - search and add shadcn/ui components.
Setup steps: `docs/SETUP.md`.

## UI style rules
- Source of truth: docs/design/DESIGN.md (tokens) and the Stitch screens I name in the prompt.
  Local copies: docs/design/<page-or-layout>/<section>-<desktop|mobile>.jpg.
  If the local image for the named screen is missing, fetch that one screen from Stitch once,
  save it there, then work from the local file. Never fetch screens I did not name.
- For each UI task: compare section by section, list the differences, then fix them.
- UI tasks touch only the files I name. Never touch src/lib, src/types or API code in a UI task.
  Use those local files.
- Use design tokens only (semantic classes). No hard-coded colors or magic pixel values.
- For a small UI tweak: edit only the file I name, and do not run build.
  Run lint on the changed file only.
- Full lint, tsc and build run once at the end of a phase, not after every tweak.


<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

