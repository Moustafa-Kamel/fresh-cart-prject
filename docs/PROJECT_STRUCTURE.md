# Project structure and build plan

Next.js (App Router) storefront on the Route Academy e-commerce API. Design from Google Stitch, UI built with shadcn/ui. Built with Codex in phases.

## 1. Folder structure

```text
storefront/
├── AGENTS.md
├── .agents/skills/
│   ├── route-ecommerce-api/        (SKILL.md + references/endpoints.md)
│   ├── nextjs-feature-workflow/
│   └── stitch-to-shadcn/
├── .codex/config.toml              (MCP servers: stitch, shadcn)
├── docs/
│   ├── PROJECT_STRUCTURE.md
│   ├── SETUP.md
│   ├── api-notes.md                (decisions and API surprises)
│   ├── api-samples/                (real JSON responses, source of the types)
│   └── design/                     (DESIGN.md, screens.md from Stitch)
├── app/
│   ├── layout.tsx                  (fonts, Navbar, Footer, Toaster, metadata)
│   ├── globals.css                 (theme tokens from the design)
│   ├── page.tsx                    (Home)
│   ├── not-found.tsx
│   ├── (shop)/
│   │   ├── products/
│   │   │   ├── page.tsx            (list + search, filter, sort, pagination)
│   │   │   ├── loading.tsx
│   │   │   ├── error.tsx
│   │   │   ├── _components/        (ProductGrid, ProductFilters, ProductCard)
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       ├── loading.tsx
│   │   │       └── _components/    (Gallery, AddToCartButton, ReviewsSection)
│   │   ├── categories/             (page.tsx, [id]/page.tsx)
│   │   └── brands/                 (page.tsx, [id]/page.tsx)
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── verify-code/page.tsx
│   │   └── reset-password/page.tsx
│   └── (account)/                  (protected by proxy.ts)
│       ├── cart/page.tsx
│       ├── wishlist/page.tsx
│       ├── checkout/page.tsx
│       ├── orders/page.tsx
│       └── account/
│           ├── page.tsx            (profile data + change password)
│           └── addresses/page.tsx
├── actions/                        (Server Actions: auth, cart, wishlist, addresses, orders, reviews, account)
├── components/
│   ├── ui/                         (shadcn, generated)
│   ├── layout/                     (Navbar, Footer, MobileNav, CartBadge)
│   └── shared/                     (Price, Rating, EmptyState, PageHeader, Pagination)
├── lib/
│   ├── api/                        (client.ts, products.ts, categories.ts, subcategories.ts, brands.ts,
│   │                                auth.ts, wishlist.ts, addresses.ts, cart.ts, orders.ts, reviews.ts)
│   ├── auth/session.ts             (getToken, setToken, clearToken, getCurrentUser)
│   ├── validations/                (Zod schemas: auth, address, checkout, review, account)
│   └── utils.ts
├── types/                          (api.ts, product.ts, category.ts, brand.ts, user.ts, cart.ts, order.ts, address.ts, review.ts)
├── proxy.ts                        (route protection; named middleware.ts in older Next versions)
├── next.config.ts                  (images.remotePatterns for the API image host)
└── .env.local                      (NEXT_PUBLIC_BASE_URL - not committed)
```

Placement rule: used by one route -> that route's `_components/`. Used by several -> `components/`.

## 2. Routes and rendering strategy

| Route | Data | Strategy | Client parts |
| --- | --- | --- | --- |
| `/` | categories, brands, featured products | ISR | carousel |
| `/products` | products (page, sort, filters from `searchParams`) | dynamic page, cached fetch (revalidate 60) | filters, search box |
| `/products/[id]` | product, reviews | ISR | add to cart, wishlist toggle, review form |
| `/categories`, `/categories/[id]` | categories, subcategories, products | ISR | none |
| `/brands`, `/brands/[id]` | brands, products | ISR | none |
| `/login`, `/register`, `/forgot-password`, `/verify-code`, `/reset-password` | none | static shell | forms |
| `/cart`, `/wishlist`, `/checkout`, `/orders`, `/account`, `/account/addresses` | user data | dynamic, `no-store`, protected | quantity controls, forms |

Note: pages that read `cookies()` are dynamic. Public ISR pages stay cookie-free, so user-specific bits (wishlist hearts, cart badge) live in small Client Components or Suspense-wrapped dynamic components. Decide the exact approach in Phase 5 and write it in `docs/api-notes.md`.

## 3. API -> feature map

| API group | Endpoints (from the course list) | Used in | Code |
| --- | --- | --- | --- |
| Categories | get all, get one | Home, `/categories`, filters | `lib/api/categories.ts` |
| SubCategories | get all, get one, all on a category | `/categories/[id]`, filters | `lib/api/subcategories.ts` |
| Brands | get all, get one | Home, `/brands`, filters | `lib/api/brands.ts` |
| Products | get all, get one | Home, `/products`, `/products/[id]` | `lib/api/products.ts` |
| Authentication | signup, signin | `/register`, `/login` | `actions/auth.ts` |
| Authentication | forgot password, verify reset code, reset password | `/forgot-password`, `/verify-code`, `/reset-password` | `actions/auth.ts` |
| Authentication | verify token | `getCurrentUser()` | `lib/auth/session.ts` |
| Authentication | update logged user password, update logged user data | `/account` | `actions/account.ts` |
| Authentication | get all users | not used in the storefront | - |
| Wishlist | add, remove, get | product card, `/wishlist` | `actions/wishlist.ts`, `lib/api/wishlist.ts` |
| User addresses | add, remove, get one, get all | `/account/addresses`, `/checkout` | `actions/addresses.ts`, `lib/api/addresses.ts` |
| Cart (v2) | add, get, update quantity, remove, clear, apply coupon | product page, `/cart` | `actions/cart.ts`, `lib/api/cart.ts` |
| Cart (v1) | same operations | fallback only if v2 does not work | same files |
| Reviews | create, list for product, list all, get one, update, delete | `/products/[id]` | `actions/reviews.ts`, `lib/api/reviews.ts` |
| Orders | cash order (v1 and v2), get all, get user orders, checkout session | `/checkout`, `/orders` | `actions/orders.ts`, `lib/api/orders.ts` |

## 4. Auth flow
1. Registration and login run through Server Actions and validate shared Zod schemas. Registration creates an account, then sends the user to login.
2. Auth.js Credentials signs in against the Route API and stores its token inside an encrypted JWT session cookie. The API token is never copied into the browser-visible session.
3. `proxy.ts` checks the JWT for protected routes and redirects anonymous users to `/login?callbackUrl=...`; signed-in users leave auth pages. The account layout also checks `auth()` on the server.
4. The existing SessionProvider supplies the public user name/email to the Navbar without making catalog pages read cookies. Server Actions for future private features must authenticate independently and send the API token in the `token` header.
5. Forgot-password sends a code, verify-code verifies it, and reset-password changes the password. An encrypted HTTP-only ten-minute recovery cookie keeps the email and completed steps on the server.
6. Auth.js sign-out deletes the session cookie and returns to login.

## 5. Build phases

Run one phase per Codex session. Start every session with: `Read AGENTS.md and docs/PROJECT_STRUCTURE.md, then do Phase N only.` Each phase ends with the report described in `AGENTS.md`. Commit after each phase on its own branch.

### Phase 0 - Setup
Create the Next app, init shadcn, add the kit files, configure MCP, create `.env.local`. Follow `docs/SETUP.md`.
Done when: `npm run dev` shows the starter page, `codex mcp list` shows stitch and shadcn, the repo is on GitHub.

### Phase 1 - Design system and shell
Prompt: `Phase 1. Use the Stitch MCP to read the design for this store. Save docs/design/DESIGN.md and screens.md, map the tokens into app/globals.css and fonts, then build the root layout with Navbar (logo, links, search, cart and wishlist icons, account menu) and Footer using shadcn components. Mobile menu included.`
Done when: the shell matches the design at 375 and 1280, and tokens are semantic variables.

### Phase 2 - API layer and types
Prompt: `Phase 2. Build lib/api/client.ts and the products, categories, subcategories and brands modules. For each endpoint verify with curl first, save samples to docs/api-samples, write types from the samples, and update the status column in references/endpoints.md.`
Done when: every catalog endpoint is verified and typed, and `docs/api-notes.md` records any surprises.

### Phase 3 - Catalog pages
Prompt: `Phase 3. Build Home, /products (search, filters, sort), /products/[id], /categories and /brands pages with loading, error and not-found states and metadata.`
Done when: all pages work with real data on mobile and desktop.

### Phase 4 - Authentication
Prompt: `Phase 4. Build register, login, forgot-password, verify-code and reset-password with React Hook Form + Zod and Server Actions. Auth.js Credentials + JWT and proxy.ts route protection, and update the Navbar for logged-in users.`
Done when: the full flow works, protected routes redirect, and a refresh keeps you signed in.

### Phase 5 - Wishlist
Prompt: `Phase 5. Add wishlist: heart toggle on product cards and the product page, and a /wishlist page. Propose how to keep public ISR pages cookie-free before you build it.`

### Phase 6 - Cart
Prompt: `Phase 6. Verify cart v2 and v1 with curl and record the decision in docs/api-notes.md. Then build add to cart, the cart page (quantity, remove, clear, totals, coupon) and the cart badge in the Navbar.`

### Phase 7 - Addresses, checkout and orders
Prompt: `Phase 7. Build address management, the checkout page (choose or add an address, cash order and online payment via the checkout session), and the /orders page.`
Done when: a cash order completes, and the online payment redirects to the hosted page and back.

### Phase 8 - Account and reviews
Prompt: `Phase 8. Build /account (update profile data, change password) and the product reviews section (list, create, edit and delete your own).`

### Phase 9 - Polish and ship
Prompt: `Phase 9. Audit the whole app: metadata and Open Graph, loading/error/empty states, responsive QA at 375, 768 and 1280, accessibility, image sizes, bundle size. Write the README (features, stack, setup, live link, screenshots) and prepare the Vercel deployment with API_BASE_URL. set.`
Done when: lint, tsc and build pass, the app is on Vercel, and the README is ready.

## 6. Learning checkpoints
After each phase, explain in your own words: what was Server vs Client and why, where the data comes from, and what would break if you removed the key line. If you cannot, ask Codex to explain that file before moving on.
