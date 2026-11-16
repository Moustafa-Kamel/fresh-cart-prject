"use server";

import { headers } from "next/headers";
import { getToken } from "next-auth/jwt";
import { getLoggedUserCart } from "@/lib/api/v2/cart";

export async function getCartCountAction() {
  const cookie = (await headers()).get("cookie") ?? "";

  try {
    const token = await getToken({
      req: { headers: { cookie } },
      secret: process.env.AUTH_SECRET,
      secureCookie: cookie
        .split(";")
        .some((part) =>
          part.trim().startsWith("__Secure-authjs.session-token"),
        ),
    });

    if (typeof token?.credentialToken !== "string" || !token.credentialToken) {
      return { ok: true as const, count: 0 };
    }

    const cart = await getLoggedUserCart(token.credentialToken);
    if (!Number.isSafeInteger(cart.numOfCartItems) || cart.numOfCartItems < 0) {
      return {
        ok: false as const,
        message: "Unable to load your cart count. Please try again.",
      };
    }

    return { ok: true as const, count: cart.numOfCartItems };
  } catch {
    return {
      ok: false as const,
      message: "Unable to load your cart count. Please try again.",
    };
  }
}
