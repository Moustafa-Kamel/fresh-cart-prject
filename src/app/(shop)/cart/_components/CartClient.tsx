"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { useStore } from "@/components/providers/StoreProvider";
import { StoreStatus } from "@/components/shared/StoreStatus";
import { CartContents } from "./CartContents";

const money = (value: number) =>
  value.toLocaleString("en-EG", { maximumFractionDigits: 2 });

export function CartClient() {
  const store = useStore();
  const queue = useRef(Promise.resolve());
  const pending = useRef(new Set<string>());
  const [pendingIds, setPendingIds] = useState<ReadonlySet<string>>(new Set());

  function enqueue(id: string, action: () => Promise<void>) {
    if (pending.current.has(id) || pending.current.has("clear")) return;
    pending.current.add(id);
    setPendingIds(new Set(pending.current));
    queue.current = queue.current
      .then(action)
      .catch(() => {
        toast.error("Unable to update your cart. Please try again.");
      })
      .finally(() => {
        pending.current.delete(id);
        setPendingIds(new Set(pending.current));
      });
  }
  return (
    <>
      <StoreStatus />
      {store.ready && (
        <CartContents
          items={store.cart.map(({ productId, count, product }) => ({
            id: productId,
            title: product.title,
            image: product.imageCover,
            category: product.category.name,
            sku: productId.slice(-6).toUpperCase(),
            unitPrice: money(product.price),
            quantity: count,
            lineTotal: money(product.price * count),
            stockLabel: store.isGuest ? "Saved item" : "In Cart",
          }))}
          summary={{
            itemCount: store.cartCount,
            subtotal: money(store.total),
            total: money(store.total),
            shipping: "At checkout",
            deliveryTitle: store.isGuest ? "Estimated total" : "Delivery",
            deliveryDescription: store.isGuest
              ? "Saved prices are for display. Sign in to confirm current prices."
              : "Shipping is calculated at checkout.",
          }}
          pendingIds={pendingIds}
          onQuantityChange={(id, count) =>
            enqueue(id, () => store.setQuantity(id, count))
          }
          onRemove={(id) => enqueue(id, () => store.removeFromCart(id))}
          onClear={() => enqueue("clear", () => store.clearCart())}
        />
      )}
    </>
  );
}
