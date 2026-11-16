# Vercel deployment

Status: pending Vercel connection and a successful production smoke test. No live URL has been verified.

Use the Next.js framework preset, repository root as the root directory, `npm ci` to install and `npm run build` to build. Keep the default output directory; this app needs a server for Auth.js, Server Actions and checkout.

Set these in Vercel Project Settings → Environment Variables before deployment:

| Name | Value | Environments |
| --- | --- | --- |
| `API_BASE_URL` | `https://ecommerce.routemisr.com/api/v1` | Production, Preview |
| `AUTH_SECRET` | Generate a private random value with `openssl rand -base64 32` | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | Exact HTTPS deployment origin, without a trailing slash | Production; set the preview origin separately when testing payments |

Do not paste secret values into README, screenshots or git. The existing API client already reads `API_BASE_URL`; no public API environment variable is needed. Auth.js uses the deployment host; do not hard-code localhost as its production origin.

## Publish

1. Connect the Vercel account and select/create the intended project. This checkout currently has no Git remote and no `.vercel/project.json` link.
2. Import the repository through Vercel, or use an authenticated Vercel CLI to link and deploy this working tree. Review the source first: it includes substantial work from earlier phases.
3. Add the environment variables above and deploy. If the production origin was not known beforehand, set `NEXT_PUBLIC_SITE_URL` to the assigned production URL and redeploy.
4. Open the production URL and verify the checklist below. Add the verified link to README only after it works.

## Production smoke test

- Home, products, search/filter/pagination, category, brands and a product detail load real catalog data.
- Share metadata resolves to HTTPS image URLs on the deployed host.
- Unknown product/category ids show not-found; disconnecting the backend shows an understandable error with retry.
- At 375, 768 and 1280 pixels: menu, filters, gallery, forms, cart and checkout have no horizontal overflow.
- Register/sign in, refresh, sign out; anonymous account/checkout/orders requests redirect to login.
- Add/remove wishlist and cart products; change quantities and reload.
- With a test account, manage an address and place a cash order. Exercise hosted online payment and its return to `/allorders` (which redirects to `/orders`).
- Confirm password reset and review ownership with your own test account.

Official references: [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs), [environment variables](https://vercel.com/docs/environment-variables).
