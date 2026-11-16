import type { Metadata } from "next";
import { WishlistClient } from "./_components/WishlistClient";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "My Wishlist",
  description: "Your saved FreshCart products.",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
