# FreshCart

A responsive e-commerce storefront built with Next.js App Router and the Route Academy e-commerce API.

**Live site:** [FreshCart](https://fresh-cart-prject.vercel.app)

## Features

- Product catalog with search, category/brand filters, sorting and pagination.
- Product images, related products and customer reviews.
- Registration, sign-in, password recovery and protected account pages.
- Guest cart/wishlist with signed-in synchronization, quantity controls and coupon feedback.
- Address management, cash orders, hosted online checkout and order history.
- Profile/password settings, responsive navigation and loading/error/empty states.
- Automated accessibility checks via axe (8 pages audited).
This is a learning project backed by a public course API. Payment completion and transactional features depend on that backend. Social sign-in, product comparison and promotional content are not evidence of supported backend features.

## Stack

Next.js 16.4.2, React 19, strict TypeScript, Tailwind CSS 4, shadcn/ui with Base UI, lucide-react, Auth.js Credentials/JWT, React Hook Form, Zod and Sonner. Biome provides formatting and linting.

Public catalog reads run in Server Components through `src/lib/api/client.ts`, with revalidation. Mutations use validated Server Actions. The API token stays in the encrypted Auth.js JWT and is read only on the server; it is not copied into the public session.

## Local setup

Use a Node.js release supported by the installed Next.js version (Node 22 LTS is suitable).

```bash
npm ci
```

Create `.env.local` (git-ignored):

```dotenv
API_BASE_URL=https://ecommerce.routemisr.com/api/v1
AUTH_SECRET=replace-with-a-private-random-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Generate your own secret with `openssl rand -base64 32`. Never commit it.

```bash
npm run dev
```

Open http://localhost:3000. Use your own test account for protected features. No seeded account or mock catalog is included.

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

## Project guide

- `src/app`: routes, layouts and route-private components.
- `src/components`: shared UI, providers and navigation.
- `src/actions`: validated server mutations.
- `src/lib/api`: backend access; `src/types`: owner-managed response types.
- [Build phases and architecture](docs/PROJECT_STRUCTURE.md).
- [Backend decisions](docs/api-notes.md).
- [Phase 9 audit and limitations](docs/phase9-audit.md).
- [Deployment configuration and smoke tests](docs/deployment.md).
