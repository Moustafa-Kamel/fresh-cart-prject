"use client";

import { Heart, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/components/providers/StoreProvider";
import { Button } from "@/components/ui/button";

type ProductSnapshot = {
  id: string;
  title: string;
  imageCover: string;
  price: number;
  category: { name: string };
};

type StoreLike = {
  ready: boolean;
  busy: boolean;
  wishlist: Array<{ productId: string; product?: ProductSnapshot }>;
  addToCart: (product: ProductSnapshot) => Promise<void>;
  toggleWishlist: (product: ProductSnapshot) => Promise<void>;
};

type ProductStoreButtonProps = {
  product: ProductSnapshot;
  kind: "cart" | "wishlist";
  compact?: boolean;
  className?: string;
};

export function ProductStoreButton({
  product,
  kind,
  compact = false,
  className,
}: ProductStoreButtonProps) {
  const store: StoreLike = useStore();
  const [pending, setPending] = useState(false);
  const saved =
    kind === "wishlist" &&
    store.wishlist.some((item) => item.productId === product.id);
  const label =
    kind === "cart"
      ? "Add to Cart"
      : saved
        ? "Remove from Wishlist"
        : "Add to Wishlist";
  return (
    <Button
      unstyled
      type="button"
      disabled={!store.ready || store.busy}
      aria-label={`${label}: ${product.title}`}
      aria-pressed={kind === "wishlist" ? saved : undefined}
      aria-busy={pending}
      onClick={async () => {
        if (!store.ready || store.busy || pending) return;
        setPending(true);
        try {
          if (kind === "cart") await store.addToCart(product);
          else await store.toggleWishlist(product);
        } finally {
          setPending(false);
        }
      }}
      className={`${className ?? "inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm"} ${!store.ready || pending ? "opacity-50" : ""} focus-visible:outline-2 focus-visible:outline-ring`}
    >
      {kind === "wishlist" ? (
        <Heart
          aria-hidden="true"
          className={`size-4 cursor-pointer ${saved ? "fill-current text-destructive" : ""}`}
        />
      ) : compact ? (
        <Plus aria-hidden="true" className="size-4 cursor-pointer" />
      ) : (
        <ShoppingCart aria-hidden="true" className="size-5" />
      )}
      {!compact && label}
    </Button>
  );
}
