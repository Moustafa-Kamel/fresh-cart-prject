# Phase 9 audit

Date: 2026-11-15. Status: local polish prepared; phase incomplete and not shipped. Vercel account connection is pending.

## Changes

- Root metadata now has a deployment-aware metadata base, Open Graph fallback image and Twitter card. Product pages supply their own image/title/description. Category details have generated titles/descriptions.
- Auth/account/cart/wishlist metadata disables indexing. No global canonical was added that could incorrectly canonicalize every product to Home.
- Product route catches rethrow Next.js control-flow exceptions so malformed IDs render the real not-found page instead of displaying an internal framework error.
- Category details validate malformed IDs and explicitly reuse loading/error states. Existing shared error boundaries provide retry and generic messages.
- Darkened semantic primary/hover/accent text tokens, made subtle text readable and used lighter footer small print after axe identified contrast failures. Recorded the accessibility override in `docs/design/DESIGN.md`.
- Replaced the missing registration portrait with a semantic user icon; disabled unsupported social registration buttons; contact form now honestly reports that delivery is unavailable, retaining the typed message.
- README now covers features, architecture, setup, actual app screenshots and deployment status. Deployment guide documents `API_BASE_URL`, `AUTH_SECRET`, site origin and post-deployment checks.
- Applied safe Biome formatting/import fixes outside owner-managed `src/types`. No dependencies added.

## Browser coverage

Used headless Chrome against `next start` on port 3001, with real API catalog data. First pass: 17 routes × 375/768/1280 widths. Follow-up: Home, real product detail, real category detail, empty search, malformed product/category IDs, registration, contact, recovery routes and protected account subroutes at the same widths.

Across these views: no horizontal overflow, no missing image alt attributes and no buttons without accessible names. Actual Home and Products screenshots are in `docs/screenshots/`. Inspected desktop Home and mobile Products images visually. No Stitch reference images were loaded because this was an app audit rather than a named-screen comparison.

Verified guest cart/wishlist empty states and account/checkout/orders redirects to login. Recovery pages without a recovery cookie redirect to forgot-password. Verified product-specific sharing metadata and malformed-ID 404 content. An empty nonsense search renders no product images.

Automated axe WCAG A/AA checks covered Home, Products, Login, Register, guest Cart/Wishlist, Contact and a real product. Initial failures were contrast and an inline link distinguished only by color; fixes are described above. Automated checks are not equivalent to a full screen-reader audit.

## Performance and images

All inspected product/gallery/category/brand/hero images use `next/image` (through `CatalogImage` where appropriate), with responsive `sizes` for fill images. The hero is preloaded; catalog images are lazy except explicitly eager cards. The original hero PNG is about 2 MB, served through Next image optimization. The fallback share image is the existing local shopping image, not a newly generated asset.

A production build contained 49 JavaScript chunks totaling 1,179,258 bytes raw / 388,079 bytes when individually gzipped. Largest chunk: 229,597 bytes raw / 71,899 gzip. These are all-build totals, not bytes loaded by every page. Browser resource measurements were about 255 KB encoded JS for Home and 303 KB for a product detail (cache state affects measurements). No bundle analyzer dependency was installed; no unused package was removed without permission.

## Remaining limitations / release blockers

- `npm run lint` still reports formatting in `src/types/cart.ts`, `orders.ts`, `review.ts`, `user.ts`, `wishlist.ts`. Those files are explicitly owner-managed and untouched; a formatting-only exception was requested.
- `src/lib/api/client.ts` drops HTTP status when constructing errors. `getProductData` already expects `error.cause === 404`, but it never receives that status. Malformed IDs are fixed; valid-looking nonexistent IDs still need the small owner-approved API client status fix, plus category handling. Do not infer 404 from every API failure.
- Signed-in account settings, address management, order submission, review ownership and hosted payment were not re-exercised in Phase 9. Their responsive private content still requires a test-account pass. No purchases or account changes were performed during this audit.
- API outage/retry and loading skeletons were inspected in code; controlled failure injection and screen-reader testing remain pending.
- Vercel is not connected; no production environment variables have been set and no live URL has been verified. README states this explicitly. Follow `docs/deployment.md` after connecting the intended account/project.

## Hand test

1. Run `npm run dev`; inspect Home, Products, categories, brands and a real product at 375, 768 and 1280 pixels. Use search, filters and pagination; search for nonsense to see the empty state.
2. Visit `/products/invalid` and `/categories/invalid`; check the 404 screen. Tab through navigation, forms and product controls; open/close the mobile menu and check focus return.
3. Inspect share metadata, guest cart/wishlist, recovery redirects and anonymous private-route redirects. Submit contact fields and confirm no false success or lost text.
4. Use your own test account for address/account/review/cart/checkout flows, then repeat the production checklist after deployment.

## Concepts to learn

- Metadata belongs in Server Components; `metadataBase` resolves relative share images against the deployed origin (`src/app/layout.tsx`).
- `notFound()` throws a framework control-flow exception; catching it as an ordinary API error breaks the intended 404 (`src/app/(shop)/products/[id]/page.tsx`).
- Semantic tokens let one contrast correction improve many components; text still needs checking on every surface (`src/app/globals.css`).

## Check results

- `npm run build`: passed with exit code 0, including production compilation, TypeScript and prerendering. A fresh Turbopack cache was needed to discard stale CSS; verified emitted `--primary` is `#087508`.
- `npx tsc --noEmit`: passed.
- `npm run lint`: fails only on formatting in the five protected type files listed above (5 errors, no remaining warnings). The check was not weakened or configured to skip them.
- Focused axe recheck: Products, Login, Register, Cart, Wishlist, Contact and product detail had no WCAG A/AA violations. Home’s mobile-app badge needed light text on its dark card; after that correction the focused Home recheck also returned zero violations. All eight audited views passed the automated WCAG A/AA check.

## Files changed in this phase

Functional changes: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/app/(account)/layout.tsx`, new `src/app/(auth)/layout.tsx`, auth login/register pages, cart/wishlist metadata, category detail page/loading/error, product detail page, contact form, and `src/components/layout/Footer.tsx`. Documentation: README, this audit, deployment guide, design accessibility note and six actual app screenshots. Safe formatting/import cleanup also affected `src/actions/store.ts`, account layout, ReviewsClient, shop page, CategoryGrid, ProductStoreButton, button, authjs, catalogProducts, wishlist API import, and two API sample JSON files.

Existing changes from earlier phases were preserved; the whole working tree was already substantially modified when this phase began. No commit or deployment of those unrelated changes was made.
