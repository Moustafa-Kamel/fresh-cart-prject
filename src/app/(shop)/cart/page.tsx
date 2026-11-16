import type { Metadata } from "next";
import { CartClient } from "./_components/CartClient";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Shopping Cart",
  description: "Review your FreshCart shopping bag and order summary.",
};

export default function CartPage() {
  return <CartClient />;
}
