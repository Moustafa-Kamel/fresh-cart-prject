# API notes

Record decisions and surprises here while you verify the API (see the `route-ecommerce-api` skill).

## Decisions
- Phase 2 implementation (2026-10-28) is authorized by the owner's explicit request to build the client, modules, and response types.
- `src/lib/api/client.ts` is the server-only request boundary. It uses server-only `NEXT_PUBLIC_BASE_URL` when configured, otherwise the public canonical base `https://ecommerce.routemisr.com/api/v1`. The old `NEXT_PUBLIC_API_URL` variable is no longer used.
- The owner's products/categories modules remain at `src/lib/products.ts` and `src/lib/categories.ts` to preserve their import paths and `getAll…(): Promise<Item[]>` signatures. Their requests now use the shared client; lowercase `/categories` is verified. Single-item helpers were added so all nine catalog endpoints have typed callers.
- New modules are `src/lib/api/brands.ts` and `src/lib/api/subcategories.ts`. Brand/subcategory/category requests explicitly revalidate after 3600 seconds; products after 60 seconds. No UI or catalog routes were added in this phase.
 cookie with an `ApiError` (401). Any request carrying that header is forced to `cache: "no-store"` with revalidation options removed. Phase 4 must use the same cookie name; real authenticated endpoints were not exercised in Phase 2.
- API HTTP failures throw `ApiError` with the HTTP status and the JSON `message` only. Network failures, malformed JSON, and messages with unexpected types have safe fallback messages. Upstream bodies/stacks and tokens are not attached to errors or logged. Successful responses are typed from verified samples; generic TypeScript types do not provide runtime schema validation.
- `getAllBrands(page = 1)` returns one page of brands, following the existing array-returning convention. The default page contains 40 brands and page 2 contains 14; callers must request page 2 explicitly. Invalid page numbers are rejected locally. The existing `getAllProducts()` also returns the default first page, not every page.
- Cart: use `/api/v2/cart`; both versions passed live lifecycle checks on 2026-11-08, but v2 consistently returns populated products. See Phase 6 verification below.
- How public pages show user-specific state (wishlist hearts, cart badge): (decide in Phase 5)

## Verified differences from `references/endpoints.md`
| Date | Endpoint | What differed | What we did |
| --- | --- | --- | --- |
| 2026-10-28 | `/subcategories` and `/categories/6439d58a0049ad0b52b9003f/subcategories` | Both returned HTTP 200 with `results: 0`, `numberOfPages: 0`, and `data: []`. | Saved real empty responses; do not fill these lists with fabricated data. |
| 2026-10-28 | `/subcategories/6407f1bcb575d3b90bf95797` | Returned a real subcategory despite the empty list endpoints. The ID came from a product's nested subcategory. | Saved the detail response as the source for the missing subcategory type. |
| 2026-10-28 | Catalog pagination | Products and brands have two pages; `nextPage` exists on page 1. Brand page 2 has `prevPage` and no `nextPage`. Category and subcategory list samples omit both. | Shared pagination makes both fields optional. Brand pages 1 and 2 were verified separately. Product filter/query behavior is deferred to Phase 3. |
| 2026-10-28 | Unknown brand/subcategory IDs | A well-formed but nonexistent ID returns HTTP 404 and a JSON `message`. | Saved real error responses. Helpers preserve status/message via `ApiError`; Phase 3 routes can translate 404 into `notFound()`. |

## Phase 2 catalog verification

All successful requests below used curl without authentication and returned HTTP 200 on 2026-10-28. Samples are in `docs/api-samples/`. The matching catalog rows in `.agents/skills/route-ecommerce-api/references/endpoints.md` are confirmed. The error samples listed separately returned HTTP 404.

| Endpoint | Sample |
| --- | --- |
| `/products` | `products-list.json` |
| `/products/6428ebc6dc1175abc65ca0b9` | `products-one.json` |
| `/categories` | `categories-list.json` |
| `/categories/6439d61c0049ad0b52b90051` | `categories-one.json` |
| `/brands` | `brands-list.json` |
| `/brands/64089fe824b25627a25315d1` | `brands-one.json` |
| `/subcategories` | `subcategories-list.json` |
| `/subcategories/6407f1bcb575d3b90bf95797` | `subcategories-one.json` |
| `/categories/6439d58a0049ad0b52b9003f/subcategories` | `categories-subcategories.json` |
| `/brands?page=1` | `brands-page1.json` |
| `/brands?page=2` | `brands-page2.json` |

404 samples: `brands-not-found.json` and `subcategories-not-found.json`, requested with `000000000000000000000000` as the ID.

## Response types

- `src/types/brands.ts`: the list sample has `_id`, `name`, `slug`, `image`, `createdAt`, and `updatedAt` strings. The detail response additionally has numeric `__v`, so that property is optional on the shared Brand type.
- `src/types/subcategories.ts`: the detail sample has `_id`, `name`, `slug`, `category`, `createdAt`, and `updatedAt` strings and numeric `__v`. The list samples are empty, so their item fields remain unverified. The core fields are also present in products' nested subcategories; timestamp/version fields are optional on the shared type.
- `src/types/api.ts`: list envelopes contain numeric `results`, pagination `metadata`, and `data` arrays (`Paginated<T>`); detail envelopes contain `data` objects (`SingleResource<T>`).
- The existing product type now uses `availableColors?: unknown[]` instead of `any[]`; its element shape is not established by the samples. Its `nextPage` and `prevPage` are optional. Existing owner-defined names and exports were preserved.

## Manual checks

1. Request `/brands`, `/brands?page=2`, and one brand ID with curl; compare the JSON envelopes with the saved samples. Default brand lists are paginated.
2. Request `/subcategories` and a category's nested subcategories, then the saved subcategory ID. An empty list is a valid success; it does not prove that a detail ID is absent.
3. Request `/brands/000000000000000000000000` and check HTTP 404 plus the JSON message. A future page should handle `ApiError.status === 404` explicitly, rather than rendering a raw stack.

Client behavior checks cover safe error messages, network/JSON failures, cookie isolation, private caching, ID encoding, and invalid brand page inputs. Live function checks use the same exported modules against the real API. Cookie-backed authentication has only been checked with a local test cookie, not a real account; that flow belongs to Phase 4.

## Phase 2 validation results

- `npm run lint`: passed (44 files).
- `npx tsc --noEmit`: passed.
- `npm run build`: passed; the home page remains statically prerendered.
- Direct client behavior checks: passed for safe HTTP/network/JSON errors, cookie isolation, private requests bypassing caches, ID encoding, and invalid page numbers.
- Live exported-function checks: passed for all nine catalog endpoints, brand pages 1 and 2, empty subcategory lists, and missing brand/subcategory IDs returning `ApiError` with status 404.
- All 13 saved JSON samples were parsed successfully. No frontend routes were added, so responsive UI testing is outside this API-only phase.

## Phase 3 catalog pages

- Home uses the existing hero and benefit cards, followed by real categories, the API's first 40 featured products, and six real brand links. `/categories` and `/brands` list all available entries; brand pages are combined using live pagination metadata, not a hard-coded page count.
- Public data remains cookie-free. Home and product details revalidate after 60 seconds; categories and brands after 3600 seconds. `/products` awaits `searchParams` and renders dynamically, while its underlying product requests still revalidate after 60 seconds.
- Product filter URL keys are `search`, `category`, `brand`, `minPrice`, `maxPrice`, `sort`, and `page`. Repeated keys use the first value. IDs must be 24 hexadecimal characters; prices must be finite and nonnegative; sort values are allowlisted; invalid pages default to 1. An inverted price range displays a validation state without querying products.
- Applying filters drops the old page number. Pagination preserves filters and sorting. A page beyond the final nonempty result page redirects to the last valid page. Empty matches show a clear-filter link.
- Verified API query parameters: `category[in]`, `brand`, `price[gte]`, `price[lte]`, `sort`, `page`, and `limit`. Checked ascending/descending price, newest first, top rated, and a combined category/brand/price/sort request. Real query samples are saved in `docs/api-samples/products-*.json`.
- **Search difference:** `keyword=Woman`, `keyword=woman`, `keyword=Shawl`, `keyword=Woman%20Shawl`, and `search=Woman` all returned no results despite existing matching titles. Search therefore runs on the server over all cached pages of the backend-filtered catalog, matching titles, descriptions, category names, and brand names case-insensitively. It preserves backend sort order and paginates the matches locally. This is practical for the current 56-product catalog; a larger catalog should use a working backend search endpoint.
- **Limit difference:** requesting `limit=100` returns `metadata.limit: 50` and only 50 items. The implementation never assumes one request contains the full catalog: search fetches 40-item pages using the returned pagination metadata. All 54 brands are similarly fetched across their actual pages.
- Product IDs are validated before API access. Backend 404s become `notFound()`. Product metadata uses the actual title, description, and cover image for Open Graph. Metadata and page rendering share a request-memoized product lookup.
- Every data-loading route has `loading.tsx` and a client `error.tsx`. Expected API failures show only the safe `ApiError.message`; unexpected failures use a generic error boundary with a retry control. The installed Next.js version provides `retry()` (and the older `reset()`); the shared fallback supports both.
- Product cards link to details. Cart/wishlist mutations remain in their designated later phases; no nonfunctional add-to-cart/wishlist buttons or fabricated reviews were added. Product ratings, stock, prices, discounts, and images come from the API.
- The API image host is allowlisted in `next.config.ts`. Product/category/brand cards use `next/image`; a small client-only gallery handles product image selection. The shared Skeleton follows the shadcn registry example and adds reduced-motion support. No dependency was added and no owner-maintained response type was changed in Phase 3.
- Design references are local Home category/product screenshots. Other catalog routes reuse their tokens and card style because no dedicated local product-list/detail/brand screens are supplied. Containers use `container`, never `shell-container`.
- Local verification found Node's default address-selection timeout failing to connect to one of the API's IPv4 addresses, while curl succeeded after connecting to another address. Both Node requests succeeded with `NODE_OPTIONS='--dns-result-order=ipv4first --network-family-autoselection-attempt-timeout=5000'`. These are local verification settings, not application-level DNS overrides or production dependencies.

### Phase 3 validation results

- `npm run lint`: passed (95 files); `npx tsc --noEmit`: passed; production build: passed. The build output confirms ISR for Home/categories/brands and dynamic rendering for the product list. Prerendered HTML contains the real catalog and no API-error fallback.
- Browser checks passed for all routes at 375, 768, and 1280 pixels with no horizontal overflow or uncaught JavaScript exceptions. Real image requests loaded successfully after the local Node connection workaround. A small `CatalogImage` leaf displays an accessible neutral fallback if an image fails later.
- Verified real counts: Home 40 products, categories 10, brands 54, products 12 per page, five “Woman Shawl” matches, 11 women's-category/DeFacto matches, and six products between 100 and 200 EGP. Page 999 redirects to page 5 with eight products.
- Browser interactions passed for applying filters (resets page), pagination (preserves price/sort), product gallery thumbnails, product title/Open Graph metadata, empty matches, inverted price ranges, malformed IDs, missing IDs, and unknown routes. Missing pages have `noindex` metadata.
- A temporary local fault-injection proxy verified the production build's API-error fallback: it displayed only the safe response message, excluded an upstream stack marker from HTML, and recovered to 12 real products with “Try again.” A delayed real API response verified that the loading skeleton streams before results. The temporary test proxy does not provide fabricated catalog data and is not part of the application.
- Pure query checks passed for repeated parameters, sort allowlisting, invalid/unsafe page numbers, invalid IDs, bounded search text, nonnegative finite prices, zero-price bounds, URL round trips, search matches beyond the first page, empty matches, and invalid ranges. All 30 saved JSON samples parse successfully.
- Restarting `next dev` rewrote its managed agent-rules block and removed the custom UI rules originally inside it. Those rules were restored outside the generated markers and verified to survive Next.js regeneration. Their content is preserved.

Manual walkthrough: open Home; follow a category or brand card; apply a search, price range, and sort on `/products`; open the next page and check the URL; open a product and choose a different thumbnail; search for an impossible phrase; visit `/products/not-valid` and `/products/000000000000000000000000`.

The enabled Next.js feedback reporting command was attempted normally and again with network access. Both attempts failed to check feedback enablement, so no feedback was submitted. The custom-rule preservation fix was verified locally.

## Phase 4 authentication (2026-11-07)

- Auth.js Credentials with an explicit JWT session strategy owns the encrypted, HTTP-only session cookie. The Route API token stays in the JWT's `credentialToken` and is never copied into the client session. This replaces the older standalone token-cookie proposal in PROJECT_STRUCTURE.md.
- Login and registration validate shared Zod schemas in Server Actions. Credentials authorization validates login again and calls the existing auth API module through `apiClient`.
- Proxy performs a local JWT check on account routes and redirects anonymous visitors to login with their requested path and query. The account layout also checks `auth()` on the server. Future account mutations must independently authenticate inside each action.
- Recovery endpoints were checked with curl: POST `/auth/forgotPasswords`, POST `/auth/verifyResetCode`, PUT `/auth/resetPassword`. Real invalid-email and invalid-code responses are saved as `auth-forgot-invalid.json`, `auth-verify-reset-invalid.json`, and `auth-reset-invalid.json`. These requests confirm failure behavior, not a successful email delivery/reset.
- Recovery email and verification state live in a separate encrypted HTTP-only cookie with a ten-minute lifetime. Verify and reset actions read this state on the server; the reset action cannot run before successful verification. Starting another recovery clears previous state. Successful reset clears recovery and returns to login.
- Verify/reset API functions intentionally discard response bodies and return `Promise<void>`; no new response types or `unknown` values are introduced. Forgot-password uses the owner's `ForgotPasswordResponse` type.
- Update (2026-11-16): the owner confirmed successful recovery email delivery and code verification; that issue is resolved. Successful password reset verified by the owner on. The API exposes no refresh-token endpoint in the verified auth flows; an expired session requires login again.

- Next.js 16.4 logs Server Function arguments by default in development. `logging.serverFunctions: false` prevents authentication passwords/code values from appearing in terminal logs.


## Phase 6 cart endpoint verification (2026-11-08)

**Decision: use `/api/v2/cart` for cart operations.** Keep catalog/auth requests on v1. Both cart versions work, but v1 POST returns `products[].product` as an ID string whereas v2 POST returns the populated product object, matching GET and PUT. No automatic v1 fallback is needed; retrying a mutation against another version could add a product twice.

Sources: the [official API site](https://ecommerce.routemisr.com/) identifies v1 as legacy and v2 as providing consistent populated responses. Its linked [official Postman documentation](https://documenter.getpostman.com/view/5709532/2s93JqTRWN) supplied all tested paths and bodies, including v2 coupon application. The published collection was retrieved through Postman's documenter gateway. Paths were not guessed.

Live requests used curl with an isolated test account created for this verification. The API token was supplied through curl's stdin configuration as a `token` header, never printed or saved. Both lifecycles ended with a cleared cart; no existing user's cart was touched. Saved JSON contains real response bodies; stack/token fields are omitted if present. HTTP statuses are recorded in `docs/api-samples/cart-verification-status.json`.

| Operation | v2 path | v1 path | Observed HTTP status |
| --- | --- | --- | --- |
| Anonymous GET | `/api/v2/cart` | `/api/v1/cart` | Both 401 |
| Authenticated GET, initially empty and after clear | `/api/v2/cart` | `/api/v1/cart` | Both 200 |
| POST `{ "productId": "6428ebc6dc1175abc65ca0b9" }` | `/api/v2/cart` | `/api/v1/cart` | Both 200 |
| GET populated cart | `/api/v2/cart` | `/api/v1/cart` | Both 200 |
| PUT `{ "count": 2 }` | `/api/v2/cart/:productId` | `/api/v1/cart/:productId` | Both 200 |
| DELETE one product | `/api/v2/cart/:productId` | `/api/v1/cart/:productId` | Both 200 |
| DELETE whole cart after re-adding | `/api/v2/cart` | `/api/v1/cart` | Both 200 |
| PUT `{ "couponName": "<unique nonexistent code>" }` | `/api/v2/cart/applyCoupon` | Not documented/tested | 400, `Coupon is invalid or has expired` |

Response samples use `cart-v2-*.json` and `cart-v1-*.json` in `docs/api-samples/`.

### Response details for the later cart implementation

- Update/remove paths take the **product ID**, not the cart line's `_id`. The previous reference's `:itemId` label was ambiguous.
- A nonempty response has `status`, `message`, `numOfCartItems`, `cartId`, and `data`; `data` contains `_id`, `cartOwner`, `products`, timestamps, `__v`, and `totalCartPrice`.
- Each line has `count`, `_id`, `product`, and `price`. Populated products include title, cover image, category, brand, available stock (`quantity`), and rating. This is a cart-specific subset of catalog fields.
- Updating the sole line from count 1 to 2 leaves `numOfCartItems` at 1 and changes `totalCartPrice` from 149 to 298. The badge field counts distinct lines, not summed quantities.
- v2 empty and cleared responses are HTTP 200 with `numOfCartItems: 0`, `cartId: null`, and `data: { products: [], totalCartPrice: 0 }`; cart ID, owner, and timestamps are absent from this empty data object.
- v1 empty GET omits `message` and `cartId`; v1 clear returns only `{ "message": "success" }`. This is another reason to use the consistent v2 envelope.
- Coupon failure is verified, but no known valid coupon was available. Successful discount fields, expiration rules, and recalculation after later mutations remain unverified; do not invent them or show fabricated discounts.
- This task verifies endpoints and records the decision only. Existing API/UI/type files were not changed. Full Phase 6 UI implementation and its completion checks remain separate.

### Reproduce by hand

Use a disposable account, sign in through `/api/v1/auth/signin`, then send its token in the `token` header. Run the table's sequence separately for v2 and v1, starting with GET, then POST, GET, PUT, DELETE product, POST again, DELETE cart, and GET. Compare response shapes with the saved samples. Test coupon rejection on a populated v2 cart. Never clear a personal or shared account's cart for this check.

Validation: all 19 cart sample bodies and the status manifest parse as JSON. Live curl checks passed as listed above. Lint, TypeScript, and production build were not run because this task changes documentation/samples only and does not complete the cart UI phase.

The skill endpoint reference under `.agents/` could not be updated because that directory is mounted read-only. The confirmed endpoint table above records the results instead.

### Account forms verification
Profile PUT `/users/updateMe/`, password PUT `/users/changeMyPassword`, and address POST `/addresses` were verified with curl on a disposable account. Profile updates reject an unchanged email as already in use, so omit email when unchanged. Password changes return a replacement token; the account action discards it and signs out, requiring fresh authentication. Samples in `account-*-verified.json` redact identifiers and tokens.

## Phase 7 — addresses, checkout, orders (2026-11-13)

Verified with curl using a disposable account; responses are in `docs/api-samples/phase7-*.json`.

- Address POST/GET/DELETE `/api/v1/addresses` work. A single-address GET returns an object, unlike the list and mutation responses. The existing `getSpecificAddress` response type does not match that endpoint; Phase 7 uses only the list endpoint. Owner follow-up: correct this type in `src/types/user.ts`.
- Cash orders use **POST `/api/v2/orders/:cartId`**, with `{ shippingAddress: { city, details, phone } }`. The response includes `status`, `message`, `user`, `pricing`, and a populated order in `data`. A real cash order completed and appeared in user order history.
- The tested 149 EGP cart produced 100 EGP shipping + 20 EGP tax = 269 EGP. These are observed charges, not a guaranteed pricing formula. Checkout labels its amount as a subtotal and explains final charges are calculated by the backend.
- POST `/api/v1/orders/checkout-session/:cartId?url=<origin>` returns `session.url` on `checkout.stripe.com`, `success_url=<origin>/allorders`, and `cancel_url=<origin>/cart`. The application provides a protected `/allorders` redirect to `/orders`. Set `NEXT_PUBLIC_SITE_URL` to the deployed origin; local browser requests can use their request Origin.
- Session creation does not prove payment succeeded. Orders display the backend `isPaid` value; returning to the site never marks an order paid locally. Use Refresh order status to fetch again after webhook processing.
- GET `/api/v1/auth/verifyToken` returns the authenticated user ID in `decoded.id`. Order history obtains this on the server, then calls GET `/api/v1/orders/user/:userId`, which returns a bare array (existing `Root` type), rather than `{ data: [...] }`.
- Owner follow-up: dedicated cash-order and checkout-session response types are missing from `src/types/orders.ts`. Mutation responses currently enter as `unknown` and are validated with Zod before their IDs/URLs are used. No `src/types/` files were changed.
- A v1 cash request after the v2 cash order correctly failed because the cart had been consumed. This does not verify the v1 happy path; the application uses the verified v2 endpoint.
- Tokens remain server-only. Removed an existing sign-in token log before browser verification. Temporary hosted payment links are redacted from saved samples.
- Browser verification completed: cash order #10418, Stripe sandbox online order #10419, successful hosted payment return through `/allorders` to `/orders`, backend `isPaid: true`, and empty checkout after cash ordering. The online order cost 149 EGP with zero shipping/tax, unlike the 269 EGP v2 cash order. Do not infer a common pricing formula across these endpoints. Final history is saved in `phase7-orders-after-payment.json`.


## Phase 8 — account and reviews (2026-11-13)

- Reviews paths and bodies come from the official Postman collection linked above. Curl verified public product listing, authenticated creation, owner update, and owner deletion. Samples are `phase8-review-*`; deletion returned an empty body, so the shared client now accepts HTTP 204 without parsing JSON.
- Review creation returns `user` as an ID; listing and updating return a populated user object. The owner's new `src/types/review.ts` captures the create and list shapes. Update/delete response bodies are unused.
- Ratings can be fractional (the real listing includes 4.1). The UI accepts tenths between 1 and 5. Review text is trimmed and limited to 2,000 characters by a shared Zod schema.
- Public review reads use 60-second caching. All pages are loaded on the server so owners can find older reviews. A Suspense boundary resolves viewer identity on the server; only the public user ID reaches the client, never the API token. Reading identity can make the rendered product request dynamic; this boundary does not independently guarantee a fully static route.
- Server Actions validate all IDs and form data, authenticate independently, read fresh product reviews to verify ownership before update/delete, and invalidate product details, catalog, and home after mutation. The backend also enforces ownership.
- `/account` now shows settings; addresses remain at `/account/addresses`. Successful profile and password mutations clear the Auth.js session and require a fresh sign-in. This prevents stale email/name and old password tokens from being reused.
- Endpoint status updates are recorded in the skill reference. All mutation verification uses a disposable account and temporary reviews are removed afterward.
