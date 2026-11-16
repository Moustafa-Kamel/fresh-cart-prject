# Phase 5: wishlist proposal

Status: proposed; implementation has not started.

## Rendering and data

Keep public catalog pages and their server-rendered product cards free of `auth()`, `cookies()`, and private fetches. Keep the existing public fetch caching unchanged. Product cards and product details render a small client wishlist button.

A shared client provider uses the existing SessionProvider. After authentication resolves, it loads wishlist IDs once through an authenticated same-origin GET Route Handler. That handler reads the JWT on the server, extracts the API token, and calls a new server-only wishlist API module through apiClient. Return only product IDs, with Cache-Control: private, no-store. Never return the token. Do not issue a request per heart.

This requires an explicit exception to the project's no initial client fetching rule for private heart membership only. Public catalog data still loads in Server Components. Without Cache Components enabled in the current configuration, wrapping a cookie-reading server component in Suspense alone does not preserve a public ISR route.

The /wishlist page lives in the existing protected (account) route group and loads real wishlist products on the server with no-store. Include metadata, loading, error, and empty states. Its server result seeds shared membership state for consistent removal and navigation.

## Interactions

- Anonymous heart clicks navigate to login with a local callback URL; do not silently mutate after login.
- While membership is unknown or a mutation is pending, disable the signed-in heart and expose its loading state. Use aria-pressed for known membership.
- Validate product IDs and the requested add/remove operation with Zod in a Server Action. Authenticate every action independently and read the token only on the server.
- Use explicit add/remove intent, not a server-side read-then-toggle. Update shared membership after success, show API errors, and invalidate /wishlist only. Avoid invalidating public catalog pages for private state changes.
- Clear private state on logout/account change and ignore stale responses from earlier sessions. Synchronize membership after relevant navigation or focus so errors or other tabs cannot leave it permanently stale.

## Expected implementation files

- src/lib/api/wishlist.ts: copy the existing API module conventions.
- src/lib/validations/wishlist.ts and src/actions/wishlist.ts.
- src/app/api/wishlist/route.ts: private ID read for public-page hearts.
- src/components/providers/WishlistProvider.tsx and existing Providers.tsx.
- src/components/shared/WishlistButton.tsx and existing ProductCard.tsx.
- src/app/(shop)/products/[id]/page.tsx: replace the heart placeholder.
- src/app/(account)/wishlist/page.tsx, loading.tsx, error.tsx, and route-private components as needed.
- docs/api-samples/wishlist-*.json and docs/api-notes.md; confirm endpoint reference statuses after real requests.

No new dependencies are expected. Use the wishlist screens only for the wishlist page.

## Prerequisites and validation

Wishlist response types are missing. Project rules reserve src/types/ for the owner. Verify GET, POST, DELETE and error responses with curl and save sanitized samples before requesting owner-written types; do not assume wishlist products exactly match the full catalog product type.

Before implementation, resolve the client-read exception and ownership of the missing types. Existing auth configuration also logs the backend token in the JWT callback; remove that log as part of the security fix before authenticated verification.

At phase completion run lint, tsc and build once. Check public route rendering in build output, inspect public HTML for private data, and test anonymous redirect, persistence after reload, add/remove across cards and details, private-page removal, errors, logout/account switching, and layouts at 375, 768 and 1280 pixels. Do not mark Phase 5 complete before these checks pass.
