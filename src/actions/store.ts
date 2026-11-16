"use server";

import { revalidatePath } from "next/cache";
import {
  addProductToCart,
  clearUserCart,
  getLoggedUserCart,
  removeProductFromCart,
  updateCartProductQuantity,
} from "@/lib/api/v2/cart";
import {
  addProductToWishlist,
  getLoggedUserWishlist,
  removeProductFromWishlist,
} from "@/lib/api/wishlist";
import { getStoreToken } from "@/lib/auth/storeToken";
import {
  ownerSchema,
  storeMutationSchema,
  wishlistReadSchema,
} from "@/lib/validations/store";

function failure(error: unknown) {
  return {
    ok: false as const,
    message:
      error instanceof Error
        ? error.message
        : "Unable to update your saved items. Please try again.",
  };
}

export async function getStoreStateAction(input: unknown) {
  try {
    const owner = ownerSchema.parse(input);
    const token = await getStoreToken(owner);
    const [cart, rawWishlist] = await Promise.all([
      getLoggedUserCart(token),
      getLoggedUserWishlist(token),
    ]);
    const wishlist = wishlistReadSchema.parse(rawWishlist);
    return {
      ok: true as const,
      cart: cart.data.products.map(({ product, count, price }) => ({
        productId: product._id,
        count,
        product: {
          id: product._id,
          title: product.title,
          imageCover: product.imageCover,
          price,
          category: { name: product.category.name },
        },
      })),
      total: cart.data.totalCartPrice,
      wishlist: wishlist.data.map((product) => ({
        productId: product._id,
        addedAt: 0,
        product: {
          id: product._id,
          title: product.title,
          imageCover: product.imageCover,
          price: product.priceAfterDiscount ?? product.price,
          category: { name: product.category.name },
        },
      })),
    };
  } catch (error) {
    return failure(error);
  }
}

export async function mutateStoreAction(input: unknown) {
  const parsed = storeMutationSchema.safeParse(input);
  if (!parsed.success)
    return { ok: false as const, message: parsed.error.issues[0].message };
  try {
    const { owner, kind, productId, count } = parsed.data;
    const token = await getStoreToken(owner);
    if (kind === "cart-clear") await clearUserCart(token);
    else if (productId) {
      if (kind === "cart-add") await addProductToCart(productId, token);
      if (kind === "cart-set" && count)
        await updateCartProductQuantity(productId, token, count);
      if (kind === "cart-remove") await removeProductFromCart(productId, token);
      if (kind === "wishlist-add") await addProductToWishlist(productId, token);
      if (kind === "wishlist-remove")
        await removeProductFromWishlist(productId, token);
    }
    revalidatePath(kind.startsWith("cart") ? "/cart" : "/wishlist");
    return { ok: true as const };
  } catch (error) {
    return failure(error);
  }
}
