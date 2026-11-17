import { z } from "zod";

const productSchema = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i),
  title: z.string().min(1),
  imageCover: z.url().startsWith("https://ecommerce.routemisr.com/"),
  price: z.number().nonnegative(),
  category: z.object({ name: z.string() }),
});
const itemSchema = z
  .object({ productId: productSchema.shape.id, product: productSchema })
  .refine((item) => item.productId === item.product.id);
const cartSchema = z.array(
  itemSchema.safeExtend({ count: z.number().int().min(1).max(999) }),
);
const wishlistSchema = z.array(itemSchema);
export type GuestProduct = z.infer<typeof productSchema>;
export type GuestCartItem = z.infer<typeof cartSchema>[number];
export type GuestWishlistItem = z.infer<typeof wishlistSchema>[number];

function read<T>(key: string, schema: z.ZodType<T[]>): T[] {
  try {
    return schema.parse(JSON.parse(localStorage.getItem(key) ?? "[]"));
  } catch {
    try {
      localStorage.removeItem(key);
    } catch {
      /* Storage may be blocked. */
    }
    return [];
  }
}
function write(key: string, items: unknown[]) {
  try {
    if (items.length) localStorage.setItem(key, JSON.stringify(items));
    else localStorage.removeItem(key);
  } catch {
    /* Keep the in-memory items when storage is unavailable. */
  }
}
export const readGuestCart = () => read("guestCart", cartSchema);
export const readGuestWishlist = () => read("guestWishlist", wishlistSchema);
export const writeGuestCart = (items: GuestCartItem[]) =>
  write("guestCart", cartSchema.parse(items));
export const writeGuestWishlist = (items: GuestWishlistItem[]) =>
  write("guestWishlist", wishlistSchema.parse(items));
