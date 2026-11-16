import "server-only";

import type { z } from "zod";
import {
  cashOrderResponseSchema,
  checkoutSessionResponseSchema,
  orderTokenVerificationSchema,
} from "@/lib/validations/checkout";
import type { Root, ShippingAddress } from "@/types/orders";
import { apiClient } from "./client";

export async function createCashOrderFromCartV2(
  cartId: string,
  tkn: string,
  shippingAddress: ShippingAddress,
): Promise<string> {
  const data = await apiClient<z.infer<typeof cashOrderResponseSchema>>(
    `/../v2/orders/${encodeURIComponent(cartId)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", token: tkn },
      cache: "no-store",
      body: JSON.stringify({ shippingAddress }),
    },
  );
  return cashOrderResponseSchema.parse(data).data._id;
}

export async function createCheckoutSession(
  cartId: string,
  tkn: string,
  shippingAddress: ShippingAddress,
  siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
): Promise<string> {
  const data = await apiClient<z.infer<typeof checkoutSessionResponseSchema>>(
    `/orders/checkout-session/${encodeURIComponent(cartId)}?url=${encodeURIComponent(siteUrl)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", token: tkn },
      cache: "no-store",
      body: JSON.stringify({ shippingAddress }),
    },
  );
  const { session } = checkoutSessionResponseSchema.parse(data);
  const url = new URL(session.url);
  if (url.protocol !== "https:" || url.hostname !== "checkout.stripe.com") {
    throw new Error("The payment provider returned an invalid checkout URL.");
  }
  return url.href;
}

export async function getUserOrders(tkn: string): Promise<Root> {
  const verification = await apiClient<
    z.infer<typeof orderTokenVerificationSchema>
  >("/auth/verifyToken", {
    headers: { token: tkn },
    cache: "no-store",
  });
  const { decoded } = orderTokenVerificationSchema.parse(verification);
  const data = await apiClient<Root>(
    `/orders/user/${encodeURIComponent(decoded.id)}`,
    {
      headers: { "Content-Type": "application/json", token: tkn },
      cache: "no-store",
    },
  );
  return data;
}
