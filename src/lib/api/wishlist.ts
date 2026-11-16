import type { WishlistResponse } from "@/types/wishlist";
import { apiClient } from "./client";

export async function addProductToWishlist(
  productId: string,
  tkn: string,
): Promise<WishlistResponse> {
  const data = await apiClient<WishlistResponse>("/wishlist", {
    method: "POST",
    headers: { "Content-Type": "application/json", token: tkn },
    cache: "no-store",
    body: JSON.stringify({ productId }),
  });
  return data;
}

export async function removeProductFromWishlist(
  productId: string,
  tkn: string,
): Promise<WishlistResponse> {
  const data = await apiClient<WishlistResponse>(
    `/wishlist/${encodeURIComponent(productId)}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json", token: tkn },
      cache: "no-store",
    },
  );
  return data;
}
export async function getLoggedUserWishlist(
  tkn: string,
): Promise<WishlistResponse> {
  const data = await apiClient<WishlistResponse>("/wishlist", {
    headers: { "Content-Type": "application/json", token: tkn },
    cache: "no-store",
  });
  return data;
}
