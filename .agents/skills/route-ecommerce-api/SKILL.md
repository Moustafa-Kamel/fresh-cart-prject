---
name: route-ecommerce-api
description: "Use whenever code touches the Route Academy e-commerce backend (ecommerce.routemisr.com): products, categories, subcategories, brands, auth (signup, signin, forgot/verify/reset password), wishlist, addresses, cart, orders, checkout session, reviews. Also use when adding an API function, writing a TypeScript type for an API response, or debugging a 4xx/5xx from this API, even if the user does not name the API."
---

# Route e-commerce API

Base URL (server-only env var): `NEXT_PUBLIC_BASE_URL=https://ecommerce.routemisr.com`.
The endpoint list is in `references/endpoints.md`. Read it before writing any API function.

## Ground rules
1. **Never trust the reference blindly.** Only the five auth paths were confirmed from a public source. Every other path in the reference is marked `verify`. Check it with a real request before building on it.
2. **One client.** All calls go through `lib/api/client.ts` (`import "server-only"`). It reads the token from the httpOnly cookie, sends it in the `token` header, parses JSON, and throws an `ApiError` on a non-2xx response. Components never call `fetch` on the API directly.
3. **One file per domain** in `lib/api/` (`products.ts`, `cart.ts`, ...). Each exports small typed functions. Types live in `types/`.
4. **Mutations** are Server Actions in `actions/`. After a successful mutation call `revalidatePath` or `revalidateTag` for what changed.

## Verify-first workflow (do this for every endpoint you have not used yet)
1. Make a real request with `curl` (add `-H "token: $TOKEN"` for protected endpoints; get a token by signing in with a test account).
2. Save the real JSON response to `docs/api-samples/<domain>-<action>.json`.
3. Write or update the TypeScript types from that sample, not from memory. Mark fields that are sometimes missing as optional.
4. Update the status column in `references/endpoints.md` (`verify` -> `confirmed`) and add anything surprising to `docs/api-notes.md` (different path, different field names, v1 vs v2 behavior).
5. If the real behavior differs from this reference, trust the real response and tell the user what differed.
If you cannot reach the API or the endpoint is undocumented, stop and ask the user for the official docs link or a Postman export. Do not guess paths.

## Caching
- Public catalog data (products, categories, subcategories, brands): `fetch(..., { next: { revalidate: 3600 } })` for categories and brands, `60` for products. Pages that read `cookies()` become dynamic, so keep ISR pages cookie-free.
- User data (cart, wishlist, addresses, orders, profile): `cache: "no-store"`.
- Defaults differ between Next versions. Check the installed version's docs before relying on them.

## Responses and errors
- List endpoints usually return a `results` count, a `metadata` pagination object and a `data` array. Single resources return `{ data: ... }`. Cart responses carry the cart id and totals. Errors return a `message`. Confirm the real shapes with step 2 above and encode them in `types/api.ts` (`Paginated<T>`, `ApiError`).
- Show the API `message` to the user in a toast. Never show raw errors, tokens, or stack traces.
- Sign-in failures and validation errors (`400`, `401`) are expected states, not crashes. Return them from the Server Action as `{ ok: false, message }`.

## Auth specifics
- After `signin` / `signup`, store `token` in an httpOnly, `secure`, `sameSite: "lax"` cookie from a Server Action.
- `getCurrentUser()` in `lib/auth/session.ts` calls the verify-token endpoint and is wrapped in React `cache()` so it runs once per request.
- Sign out = delete the cookie and redirect. There is no server-side logout endpoint in the list.
