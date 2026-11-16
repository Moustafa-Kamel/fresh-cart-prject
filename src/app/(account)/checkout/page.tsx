import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getLoggedUserAddresses } from "@/lib/api/user";
import { getLoggedUserCart } from "@/lib/api/v2/cart";
import { getStoreToken } from "@/lib/auth/storeToken";
import { CheckoutForm } from "./_components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Review your cart, enter your delivery address and choose how to pay.",
};

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login?callbackUrl=/checkout");
  const token = await getStoreToken(session.user.email);
  const [cart, addresses] = await Promise.all([
    getLoggedUserCart(token),
    getLoggedUserAddresses(token),
  ]);
  return (
    <CheckoutForm
      addresses={addresses.data}
      items={cart.data.products}
      subtotal={cart.data.totalCartPrice}
    />
  );
}
