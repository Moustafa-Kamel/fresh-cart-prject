import "server-only";

import type { CartResponse } from "@/types/cart";
import { apiClient } from "../client";

// The shared client appends paths to /api/v1; URL normalization selects /api/v2.
const CART_PATH = "/../v2/cart";

export async function addProductToCart(
  productId: string,
  tkn: string,
): Promise<CartResponse> {
  const data = await apiClient<CartResponse>(CART_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json", token: tkn },
    cache: "no-store",
    body: JSON.stringify({ productId }),
  });
  return data;
}
export async function getLoggedUserCart(tkn: string): Promise<CartResponse> {
  const data = await apiClient<CartResponse>(CART_PATH, {
    headers: { "Content-Type": "application/json", token: tkn },
    cache: "no-store",
  });
  return data;
}

export async function updateCartProductQuantity(
  productId: string,
  tkn: string,
  count: number,
): Promise<CartResponse> {
  if (!Number.isSafeInteger(count) || count < 1) {
    throw new Error("Quantity must be a positive integer.");
  }
  const data = await apiClient<CartResponse>(
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
): Promise<CartResponse> {
  const data = await apiClient<CartResponse>(
    `${CART_PATH}/${encodeURIComponent(productId)}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json", token: tkn },
      cache: "no-store",
    },
  );
  return data;
}

export async function clearUserCart(tkn: string): Promise<CartResponse> {
  const data = await apiClient<CartResponse>(CART_PATH, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", token: tkn },
    cache: "no-store",
  });
  return data;
}

export async function applyCouponToCart(
  couponName: string,
  tkn: string,
): Promise<CartResponse> {
  const data = await apiClient<CartResponse>(`${CART_PATH}/applyCoupon`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", token: tkn },
    cache: "no-store",
    body: JSON.stringify({ couponName }),
  });
  return data;
}
