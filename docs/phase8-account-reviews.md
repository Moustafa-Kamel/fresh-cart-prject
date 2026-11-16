# Phase 8 — Account and reviews

Implementation is complete. The phase's full-lint gate remains blocked by 12 formatting errors in files outside this implementation (including owner-maintained types).

## Files changed in this phase

- `src/actions/account.ts`: sign out after successful profile/password changes; invalidate account.
- `src/app/(account)/account/page.tsx`: show existing settings at `/account`.
- `src/app/(account)/account/_components/{AccountNav,SettingsForms}.tsx`: correct navigation highlighting and return to login after changes.
- `src/lib/api/client.ts`: accept empty HTTP 204 responses for deletion.
- `src/lib/api/reviews.ts`: typed reads and mutations through the existing API client.
- `src/lib/auth/reviewIdentity.ts`: resolve identity and token on the server.
- `src/lib/validations/review.ts`: shared rating, text, and ID validation.
- `src/actions/reviews.ts`: validate, authenticate, check ownership, mutate, and invalidate cached pages.
- `src/app/(shop)/products/[id]/page.tsx`: replace review placeholder with real data.
- `src/app/(shop)/products/[id]/_components/{ReviewsSection,ReviewsClient}.tsx`: server-loaded list, interactive forms and delete confirmation.
- `docs/api-samples/phase8-review-*`, `docs/api-notes.md`, and the endpoint reference: live verification evidence and decisions.
- `src/types/review.ts` was added by the owner and left unchanged.

## Verification

- Changed implementation files: Biome passes.
- `npx tsc --noEmit`: passes.
- `npm run build`: passes.
- Full lint: 12 formatting errors remain in `docs/api-samples/{phase8-product-reviews,wishlist-add}.json`, `src/app/(account)/account/layout.tsx`, `src/app/contact/page.tsx`, `src/app/layout.tsx`, `src/components/shared/ProductStoreButton.tsx`, `src/components/ui/button.tsx`, and `src/types/{cart,orders,review,user,wishlist}.ts`.
- Curl: list/create/update/delete verified using the official Postman paths and a disposable account. Temporary reviews removed.
- Browser: all 54 existing reviews loaded across API pages; create, edit, and confirmed delete passed. Only the signed-in owner's review displayed Edit/Delete; deletion restored the create form.
- Browser: account rejects empty password input; profile and password updates redirect to login; signing in with the new password succeeds.
- Browser: signed-out visitors see the public review list and Sign in link, with no review forms or edit/delete buttons.
- Empty-list UI is implemented; a product with zero reviews was not separately exercised in the browser.
- Product reviews and account forms: no horizontal overflow at 375, 768, and 1280 pixels.

## Manual testing

1. Sign in, open `/account`, change profile details and supply a valid Egyptian phone number. Save, then sign in again and verify the updated name/email.
2. Change your password. Confirm you return to login, and authenticate with the new password.
3. Open a product and select Customer Reviews. Submit an empty review to see validation, then save a rating and review.
4. Edit your review, cancel a deletion, then confirm deletion. Verify other users' reviews have no edit/delete controls.
5. Sign out and revisit the product. Reviews remain readable with a sign-in link in place of the form.
6. Check at 375, 768, and 1280 pixels. Repeat full lint after formatting the listed files.

## What to learn

- Server Components load initial reviews; only the interactive forms and buttons need a client boundary (`ReviewsSection.tsx` and `ReviewsClient.tsx`).
- Shared Zod validation improves form feedback, but the Server Action must still authenticate and check ownership because browser inputs cannot be trusted (`src/actions/reviews.ts`).
- API changes and cached UI are separate: `revalidatePath` refreshes rendered product data, while credential changes clear the old session (`src/actions/{reviews,account}.ts`).

All user-specific credentials remain server-only. Public review reads are cached for 60 seconds; the identity boundary reads the session and can make product requests dynamic. Full-list rendering currently loads every review page, so very large review counts may warrant pagination in a later phase.
