# Route e-commerce API - endpoint reference

Base: `https://ecommerce.routemisr.com/api/v1`
Auth header for protected endpoints: `token: <jwt>` (not `Authorization: Bearer`).

**Status column**
- `confirmed` = path verified with a real request for catalog endpoints; auth paths remain based on public documentation.
- `verify` = path comes from general knowledge of this API. Check it with curl first (see SKILL.md).
- `unknown` = path not known. Find it in the official docs (ask the user for the link or a Postman export).

Request bodies below are the usual shapes. Confirm them while verifying.

Catalog endpoints were verified with curl on 2026-10-28; real responses are saved in `docs/api-samples/`. Brand pagination (`page=1`, `page=2`) and missing brand/subcategory IDs (404) were also checked. Verification does not imply that optional product filters have been tested.

## Categories
| Method | Path | Purpose | Auth | Status |
| --- | --- | --- | --- | --- |
| GET | `/categories` | all categories | no | confirmed |
| GET | `/categories/:id` | one category | no | confirmed |

## SubCategories
| Method | Path | Purpose | Auth | Status |
| --- | --- | --- | --- | --- |
| GET | `/subcategories` | all subcategories | no | confirmed |
| GET | `/subcategories/:id` | one subcategory | no | confirmed |
| GET | `/categories/:id/subcategories` | subcategories of a category | no | confirmed |

## Brands
| Method | Path | Purpose | Auth | Status |
| --- | --- | --- | --- | --- |
| GET | `/brands` | all brands | no | confirmed |
| GET | `/brands/:id` | one brand | no | confirmed |

## Products
| Method | Path | Purpose | Auth | Status |
| --- | --- | --- | --- | --- |
| GET | `/products` | list. Verified: page, limit, sort, category[in], brand, price[gte], price[lte]. See query notes below; backend keyword search is not used. | no | confirmed |
| GET | `/products/:id` | one product | no | confirmed |

## Product query verification (Phase 3)

Verified with curl on 2026-10-28; samples are in docs/api-samples/products-*.json.

| Query | Status | Observed behavior |
| --- | --- | --- |
| page, limit | confirmed | 12-item pages and page 2 work; an out-of-range page returns an empty array. Requested limit=100 is capped to 50. |
| category[in], brand | confirmed | Returned items match the supplied category/brand IDs. |
| price[gte], price[lte] | confirmed | Returned prices fall within the requested inclusive range. |
| sort=price, -price, -createdAt, -ratingsAverage | confirmed | Price and rating samples are ordered as requested; newest-first request succeeds. |
| Combined category, brand, price, sort, pagination | confirmed | The combined request returns the matching six products. |
| keyword and search | verified limitation | Both return no results for known matching titles. The storefront searches all cached backend-filtered catalog pages on the server instead. |

## Authentication
| Method | Path | Purpose | Auth | Status |
| --- | --- | --- | --- | --- |
| POST | `/auth/signup` | body `name, email, password, rePassword, phone`. Returns user + token | no | confirmed |
| POST | `/auth/signin` | body `email, password`. Returns user + token | no | confirmed |
| POST | `/auth/forgotPasswords` | body `email`. Sends a reset code | no | confirmed |
| POST | `/auth/verifyResetCode` | body `resetCode` | no | confirmed |
| PUT | `/auth/resetPassword` | body `email, newPassword` | no | confirmed |
| GET | `/auth/verifyToken` | validates the token, returns `decoded.id` | yes | confirmed |
| PUT | `/users/changeMyPassword` | body `currentPassword, password, rePassword` | yes | verify |
| PUT | `/users/updateMe/` | body `name, email, phone` | yes | verify |
| GET | `/users` | all users (admin-style list). Not needed by the storefront | yes | verify |

## Wishlist
| Method | Path | Purpose | Auth | Status |
| --- | --- | --- | --- | --- |
| POST | `/wishlist` | body `productId` | yes | verify |
| DELETE | `/wishlist/:productId` | remove | yes | verify |
| GET | `/wishlist` | logged user's wishlist | yes | verify |

## User addresses
| Method | Path | Purpose | Auth | Status |
| --- | --- | --- | --- | --- |
| POST | `/addresses` | body `name, details, phone, city` | yes | confirmed |
| DELETE | `/addresses/:id` | remove | yes | confirmed |
| GET | `/addresses/:id` | one address | yes | confirmed |
| GET | `/addresses` | logged user's addresses | yes | confirmed |

## Cart (v2) - preferred
Add product, get cart, update quantity, remove product, clear cart, apply coupon.
Paths: `unknown`. Look them up in the official docs, then record them here. Decide v1 vs v2 after testing both and write the decision in `docs/api-notes.md`.

## Cart (v1) - fallback
| Method | Path | Purpose | Auth | Status |
| --- | --- | --- | --- | --- |
| POST | `/cart` | body `productId` | yes | verify |
| GET | `/cart` | logged user's cart | yes | verify |
| PUT | `/cart/:itemId` | body `count` | yes | verify |
| DELETE | `/cart/:itemId` | remove one item | yes | verify |
| DELETE | `/cart` | clear cart | yes | verify |

## Reviews
Create (nested under a product), list for a product, list all, get by id, update (owner only), delete (owner or admin).
Official source: https://documenter.getpostman.com/view/5709532/2s93JqTRWN.
Verified with curl on 2026-11-13 using a disposable account. Samples: docs/api-samples/phase8-review-*.

| Method | Path | Purpose | Auth | Status |
| --- | --- | --- | --- | --- |
| GET | `/products/:productId/reviews` | Paginated product reviews | no | confirmed |
| POST | `/products/:productId/reviews` | Create with review, rating | yes | confirmed |
| PUT | `/reviews/:reviewId` | Update own review | yes | confirmed |
| DELETE | `/reviews/:reviewId` | Delete own review | yes | confirmed |

List-all and get-one are documented but unused and unverified.

## Orders
| Method | Path | Purpose | Auth | Status |
| --- | --- | --- | --- | --- |
| POST | `/orders/:cartId` | cash order, body `shippingAddress { details, phone, city }` | yes | verify |
| POST | `/api/v2/orders/:cartId` | cash order with `shippingAddress`; consumes cart, returns populated `data` and `pricing` | yes | confirmed |
| GET | `/orders` | all orders | yes | verify |
| GET | `/orders/user/:userId` | bare array of orders; derive user ID server-side | yes | confirmed |
| POST | `/orders/checkout-session/:cartId?url=<site-origin>` | returns `session.url`; success `/allorders`, cancel `/cart` | yes | confirmed |

Phase 7 endpoints confirmed with curl on 2026-11-13. See `docs/api-samples/phase7-*.json` and `docs/api-notes.md`. The v1 cash happy path remains unverified.
