import { z } from "zod";

const productIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid product ID.");
const countSchema = z.number().int().positive().max(Number.MAX_SAFE_INTEGER);

export const ownerSchema = z.string().min(1).max(320);
export const storeMutationSchema = z
  .object({
    owner: ownerSchema,
    kind: z.enum([
      "cart-add",
      "cart-set",
      "cart-remove",
      "cart-clear",
      "wishlist-add",
      "wishlist-remove",
    ]),
    productId: productIdSchema.optional(),
    count: countSchema.optional(),
  })
  .superRefine((value, ctx) => {
    if (value.kind !== "cart-clear" && !value.productId)
      ctx.addIssue({ code: "custom", message: "A product is required." });
    if (value.kind === "cart-set" && !value.count)
      ctx.addIssue({ code: "custom", message: "A quantity is required." });
  });

export const mergeCartSchema = z.object({
  owner: ownerSchema,
  items: z
    .array(z.object({ productId: productIdSchema, count: countSchema }))
    .max(100),
});
export const mergeItemSchema = z.object({
  owner: ownerSchema,
  kind: z.enum(["cart", "wishlist"]),
  productId: productIdSchema,
  count: countSchema.optional(),
});

// GET wishlist returns products; mutation responses return ID arrays instead.
export const wishlistReadSchema = z.object({
  data: z.array(
    z.object({
      _id: productIdSchema,
      title: z.string(),
      imageCover: z.string(),
      price: z.number().finite().nonnegative(),
      priceAfterDiscount: z.number().finite().nonnegative().optional(),
      category: z.object({ name: z.string() }),
      quantity: z.number(),
    }),
  ),
});
