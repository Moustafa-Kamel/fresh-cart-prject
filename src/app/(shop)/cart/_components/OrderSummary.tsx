import {
  ArrowLeft,
  LockKeyhole,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type OrderSummaryProps = {
  itemCount: number;
  subtotal: string;
  shipping: string;
  total: string;
  deliveryTitle: string;
  deliveryDescription: string;
};

export function OrderSummary({
  itemCount,
  subtotal,
  shipping,
  total,
  deliveryTitle,
  deliveryDescription,
}: OrderSummaryProps) {
  return (
    <aside
      aria-labelledby="order-summary"
      className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card lg:col-span-2"
    >
      <div className="bg-linear-to-r from-primary to-primary-hover px-6 py-6 text-primary-foreground">
        <h2
          id="order-summary"
          className="flex items-center gap-3 text-2xl font-bold"
        >
          <ShoppingBag aria-hidden="true" className="size-6" />
          Order Summary
        </h2>
        <p className="mt-2">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>
      <div className="p-6 sm:p-8">
        <div className="mb-7 flex items-center gap-4 rounded-2xl bg-linear-to-r from-accent/60 to-muted p-5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
            <Truck aria-hidden="true" className="size-6" />
          </span>
          <div>
            <h3 className="font-bold text-accent-foreground">
              {deliveryTitle}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {deliveryDescription}
            </p>
          </div>
        </div>
        <dl className="space-y-5">
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd>{subtotal} EGP</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd className="text-primary">{shipping}</dd>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-dashed pt-5">
            <dt className="text-lg font-semibold">Total</dt>
            <dd>
              <strong className="text-3xl">{total}</strong>
              <span className="ml-1 text-muted-foreground">EGP</span>
            </dd>
          </div>
        </dl>
        <Button
          unstyled
          type="button"
          className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl border border-dashed px-4 py-4 text-muted-foreground"
        >
          <Tag aria-hidden="true" className="size-5" />
          Apply Promo Code
        </Button>
        <Link
          href="/checkout"
          className="mt-6 flex cursor-pointer w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-primary to-primary-hover px-4 py-5 text-lg font-bold text-primary-foreground shadow-card"
        >
          <LockKeyhole aria-hidden="true" className="size-5" />
          Secure Checkout
        </Link>
        <div className="mt-7 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground sm:text-sm">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck aria-hidden="true" className="size-4 text-primary" />
            Secure Payment
          </span>
          <span aria-hidden="true" className="text-border">
            |
          </span>
          <span className="inline-flex items-center gap-2">
            <Truck aria-hidden="true" className="size-4 text-info" />
            Fast Delivery
          </span>
        </div>
        <Link
          href="/products"
          className="mt-10 flex items-center justify-center gap-2 text-primary hover:text-primary-hover"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Continue Shopping
        </Link>
      </div>
    </aside>
  );
}
