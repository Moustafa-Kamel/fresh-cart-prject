"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/auth";
import {
  createCashOrderFromCartV2,
  createCheckoutSession,
} from "@/lib/api/orders";
import { getLoggedUserCart } from "@/lib/api/v2/cart";
import { getStoreToken } from "@/lib/auth/storeToken";
import { checkoutSchema } from "@/lib/validations/checkout";

export async function placeOrder(input: unknown) {
  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success)
    return { ok: false as const, message: parsed.error.issues[0].message };
  const session = await auth();
  if (!session?.user?.email)
    return { ok: false as const, message: "Please sign in again." };
  try {
    const token = await getStoreToken(session.user.email);
    // Never trust a cart ID or prices supplied by the browser.
    const cart = await getLoggedUserCart(token);
    if (!cart.data.products.length)
      return { ok: false as const, message: "Your cart is empty." };
    const { payment, ...address } = parsed.data;
    if (payment === "online") {
      const requestHeaders = await headers();
      const origin = new URL(
        process.env.NEXT_PUBLIC_SITE_URL ??
          requestHeaders.get("origin") ??
          "http://localhost:3000",
      ).origin;
      const url = await createCheckoutSession(
        cart.data._id,
        token,
        address,
        origin,
      );
      return { ok: true as const, url, payment };
    }
    await createCashOrderFromCartV2(cart.data._id, token, address);
    revalidatePath("/cart");
    revalidatePath("/checkout");
    revalidatePath("/orders");
    return { ok: true as const, url: "/orders", payment };
  } catch (error) {
    return {
      ok: false as const,
      message:
        error instanceof Error && error.name !== "ZodError"
          ? error.message
          : "Unable to complete checkout. Check your orders before trying again.",
    };
  }
}
