"use client";

import { useStore } from "@/components/providers/StoreProvider";

export function StoreBadge({ kind }: { kind: "cart" | "wishlist" }) {
  const store = useStore();
  if (!store.ready) return null;
  const count = kind === "cart" ? store.cartCount : store.wishlistCount;
  return (
    <output
      aria-label={`${count} ${kind === "cart" ? "cart" : "wishlist"} items`}
      className="absolute -top-1 -right-1 flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs leading-5 font-semibold text-primary-foreground"
    >
      {count}
    </output>
  );
}
