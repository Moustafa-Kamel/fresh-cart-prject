import "server-only";

import type { CartResponse } from "@/types/cart";
import { apiClient } from "../client";

const CART_PATH = "/cart";

// V1 add returns product IDs; empty carts omit their document metadata.
type V1CartResponse = Omit<CartResponse, "message" | "cartId" | "data"> & {
  message?: string;
  cartId?: string;
  data: Partial<Omit<CartResponse["data"], "products" | "totalCartPrice">> & {
    totalCartPrice: number;
    products: Array<
      Omit<CartResponse["data"]["products"][number], "product"> & {
        product: CartResponse["data"]["products"][number]["product"] | string;
      }
    >;
  };
};

export async function addProductToCart(
  productId: string,
  tkn: string,
): Promise<V1CartResponse> {
  const data = await apiClient<V1CartResponse>(CART_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json", token: tkn },
    cache: "no-store",
    body: JSON.stringify({ productId }),
  });
  return data;
}
export async function getLoggedUserCart(tkn: string): Promise<V1CartResponse> {
  const data = await apiClient<V1CartResponse>(CART_PATH, {
    headers: { "Content-Type": "application/json", token: tkn },
    cache: "no-store",
  });
  return data;
}

export async function updateCartProductQuantity(
  productId: string,
  tkn: string,
  count: number,
): Promise<V1CartResponse> {
  if (!Number.isSafeInteger(count) || count < 1) {
    throw new Error("Quantity must be a positive integer.");
  }
  const data = await apiClient<V1CartResponse>(
    `${CART_PATH}/${encodeURIComponent(productId)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json", token: tkn },
      cache: "no-store",
      body: JSON.stringify({ count }),
    },
  );
  return data;
}

export async function removeProductFromCart(
  productId: string,
  tkn: string,
): Promise<V1CartResponse> {
  const data = await apiClient<V1CartResponse>(
    `${CART_PATH}/${encodeURIComponent(productId)}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json", token: tkn },
      cache: "no-store",
    },
  );
  return data;
}

export async function clearUserCart(tkn: string): Promise<{ message: string }> {
  const data = await apiClient<{ message: string }>(CART_PATH, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", token: tkn },
    cache: "no-store",
  });
  return data;
}
