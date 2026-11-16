# Phase 7: addresses, checkout, and orders

Implemented and verified with the real backend and a disposable account. No dependencies or files in `src/types/` were changed.

## Changed files

- `src/lib/api/orders.ts`: replaced the unfinished module with verified cash v2, hosted checkout, and authenticated order-history functions.
- `src/lib/validations/checkout.ts`: shared client/server delivery and payment schema.
- `src/actions/orders.ts`: authenticates, retrieves the current cart on the server, validates input, submits orders, and revalidates affected routes.
- `src/actions/account.ts`: address mutations also revalidate checkout.
- `src/app/(account)/checkout/page.tsx`: fetches saved addresses and cart on the server.
- `src/app/(account)/checkout/_components/CheckoutForm.tsx`: saved-address selection, add-address form reuse, real cash/online submission, pending and API-error feedback, subtotal disclosure.
- `src/app/(account)/orders/page.tsx`, `loading.tsx`, `error.tsx`, `_components/RefreshOrdersButton.tsx`: real user history, expandable items/address/charges, payment/delivery status, refresh, loading/error/empty states.
- `src/app/(account)/allorders/page.tsx`: payment success callback redirects to `/orders`.
- `src/app/(account)/account/addresses/loading.tsx`, `error.tsx`: address-route states.
- `src/proxy.ts`: protects the payment callback route.
- `src/lib/authjs/authjs.ts`: removed the existing credential token log.
- `docs/api-samples/phase7-*.json`, `docs/api-notes.md`, and `.agents/skills/route-ecommerce-api/references/endpoints.md`: verified responses and endpoint decisions.

## Manual test

1. Sign in and visit `/account/addresses`. Add an address, confirm it appears, then remove it. Try submitting missing fields.
2. Add a product to your cart and open `/checkout`. Add an address there, then select it from Saved addresses. Confirm city, street and phone populate; select Use a different address to clear them.
3. Choose cash and place the order. Confirm `/orders` shows the new cash order as unpaid and expands to show its items, delivery address and final fees. Return to checkout and confirm the cart is empty.
4. Add another product, choose online payment, and proceed. Confirm the hosted page is a Stripe **sandbox** before using Stripe's standard test card `4242 4242 4242 4242`, future expiry and a test CVC. Submit and confirm the browser returns to `/orders` and the order shows Paid. In a live environment, use the payment provider's appropriate testing process instead.
5. Check `/checkout` and `/orders` at 375, 768 and 1280px. Sign out and confirm protected routes redirect to login.
6. Production configuration: set `NEXT_PUBLIC_SITE_URL` to your deployed origin so payment callbacks return there.

## Observed results

- curl: address add/list/get/delete; token verification; checkout session; v2 cash order; user history passed. Samples include the final paid online order. The hosted URL is redacted.
- Browser: address addition from checkout and selection passed; required-field errors passed; cash order #10418 completed and consumed the cart; Stripe sandbox payment completed as online order #10419 and returned through `/allorders` to `/orders`, showing backend `isPaid: true`.
- Checkout and order history had no horizontal overflow at 375, 768 and 1280px. Checkout mobile screenshot was visually inspected.
- The 149 EGP cart became a 269 EGP cash order (100 shipping + 20 tax); online checkout charged 149 EGP. This backend difference is documented rather than converted into a guessed pricing formula.
- TypeScript passed. All changed application files and Phase 7 samples passed Biome.
- Full lint remains blocked by 11 existing diagnostics in unrelated files: `docs/api-samples/phase8-product-reviews.json`, `docs/api-samples/wishlist-add.json`, `src/app/(account)/account/layout.tsx`, `src/app/contact/page.tsx`, `src/app/layout.tsx`, `src/components/shared/ProductStoreButton.tsx`, `src/components/ui/button.tsx`, and `src/types/{cart,orders,user,wishlist}.ts`. The owner reserves `src/types/`; those files were left untouched.

## What to learn

1. Server Components load private initial data while small Client Components handle input and interaction: compare checkout `page.tsx` with `CheckoutForm.tsx`.
2. A browser form cannot authorize a purchase: `placeOrder` authenticates again and retrieves the current user's cart instead of accepting a cart ID or price from the client.
3. A payment redirect does not prove payment: `/orders` reads the backend's `isPaid` value, while `revalidatePath` and the refresh button fetch current data after mutations or webhook processing.

## Owner follow-up

Dedicated mutation response types are missing from `src/types/orders.ts`; these API responses currently use `unknown` with Zod runtime validation. The existing single-address response type in `src/types/user.ts` also describes an array while the verified endpoint returns an object. Phase 7 does not use that function. See `docs/api-notes.md`.

Production build passed after moving the generated Next cache aside: a sandbox port-binding failure had persisted into the first unrestricted retry. A fresh unrestricted build compiled, type-checked, and generated all routes successfully. No application workaround was needed.
