"use client";

import { useStore } from "@/components/providers/StoreProvider";
import { StoreStatus } from "@/components/shared/StoreStatus";
import { WishlistContents } from "./WishlistContents";

export function WishlistClient() {
  const store = useStore();
  return (
    <>
      <StoreStatus />
      {store.ready && (
        <WishlistContents
          items={store.wishlist.map(({ productId, product }) => ({
            id: productId,
            title: product.title,
            image: product.imageCover,
            category: product.category.name,
            price: product.price.toLocaleString("en-EG", {
              maximumFractionDigits: 2,
            }),
            stockLabel: store.isGuest ? "Saved item" : "Saved",
          }))}
          busy={store.busy}
          onRemove={(id) => {
            const item = store.wishlist.find((entry) => entry.productId === id);
            if (item) void store.toggleWishlist(item.product);
          }}
          onAddToCart={(id) => {
            const item = store.wishlist.find((entry) => entry.productId === id);
            if (item) void store.addToCart(item.product);
          }}
        />
      )}
    </>
  );
}
