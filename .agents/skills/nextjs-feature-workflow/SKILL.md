---
name: nextjs-feature-workflow
description: "Use when building or changing any page, route, layout, component, form, or Server Action in this Next.js App Router storefront: new feature, new page, bug in a page, adding loading/error/empty states, choosing Server vs Client Component, or choosing static / ISR / dynamic rendering. Use it even for small UI changes so the project conventions are followed."
---

# Next.js feature workflow

Follow these steps in order for every feature. Project rules are in `AGENTS.md`; the route map and phases are in `docs/PROJECT_STRUCTURE.md`.

## 1. Scope
Find the phase in `docs/PROJECT_STRUCTURE.md`. Restate the scope in 3 lines or fewer, and list the files you expect to create or change. If the request is bigger than one phase, say so and propose the split.

## 2. Pick the rendering strategy
| Situation | Strategy |
| --- | --- |
| Content for everyone that changes slowly (home, categories, brands, product page) | Static / ISR with `revalidate` |
| Depends on `searchParams` (product list with filters) | Dynamic page, but cache the underlying `fetch` with `revalidate` |
| Depends on the user (cart, wishlist, orders, account, checkout) | Dynamic, `cache: "no-store"`, protected by `proxy.ts` |
A page that calls `cookies()` is dynamic. Keep ISR pages cookie-free. User-specific bits inside a public page (a wishlist heart, the cart badge) go in small Client Components or Suspense-wrapped dynamic components. Propose the approach before building it.

## 3. Server vs Client
- Default to Server Components. Fetch with `await` in the component. Never use `useEffect` to load initial data.
- Use `"use client"` only for state, effects, event handlers or browser APIs, on the smallest leaf (a button, a search box), not on the whole page.
- In recent Next versions `params` and `searchParams` are Promises, and `cookies()` is async. Check the installed version and its docs, then `await` accordingly.

## 4. Data and mutations
- Reads: call functions from `lib/api/*` (skill: `route-ecommerce-api`).
- Writes: Server Actions in `actions/<domain>.ts` that start with `"use server"`. Each one validates input with the Zod schema from `lib/validations/`, calls the API, then `revalidatePath` / `revalidateTag`. Return `{ ok: true, ... }` or `{ ok: false, message, fieldErrors? }`. Do not throw for expected failures.
- Forms: React Hook Form + `zodResolver` with the same schema; call the action inside `useTransition` or `useActionState`; show pending state and disable the submit button while pending; toast the result with sonner.

## 5. Route files
Every route that loads data gets:
- `page.tsx`
- `loading.tsx` - a skeleton that matches the final layout (shadcn `Skeleton`)
- `error.tsx` - `"use client"`, with a retry button that calls `reset`
- `not-found.tsx` where an id can be wrong; call `notFound()` when the API returns 404
- `metadata` or `generateMetadata` (title, description; Open Graph image for products)

## 6. UI
Use skill `stitch-to-shadcn` for anything visual. Always implement: loading, empty, error, disabled and focus states. Use `next/image` with `sizes`, meaningful `alt`, and the API image host in `images.remotePatterns`. Use `next/link` for internal navigation. Build mobile-first and check 375, 768 and 1280.

## 7. Verify
Run `npm run lint`, `npx tsc --noEmit`, and `npm run build`. Then run the feature by hand (happy path, an error path, an empty state) and note how you did it. Do not claim something works unless you ran it. If you could not run something, say so.

## 8. Report (learning mode)
End with:
- Files changed (list)
- How to test it by hand (numbered steps)
- Results of lint, tsc, build
- "What to learn": 2-3 concepts from this change, each in one sentence, plus where in the code to look
