"use client";

import { cn } from "cn";
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CartEmptyState } from "./CartEmptyState";
import { OrderSummary } from "./OrderSummary";

type CartItem = {
  id: string;
  title: string;
  image: string;
  category: string;
  sku: string;
  unitPrice: string;
  quantity: number;
  lineTotal: string;
  stockLabel: string;
};

type CartContentsProps = {
  items: readonly CartItem[];
  summary: Parameters<typeof OrderSummary>[0];
  pendingIds?: ReadonlySet<string>;
  onQuantityChange?: (id: string, count: number) => void;
  onRemove?: (id: string) => void;
  onClear?: () => void;
};

export function CartContents({
  items,
  summary,
  pendingIds = new Set<string>(),
  onQuantityChange,
  onRemove,
  onClear,
}: CartContentsProps) {
  const [removeId, setRemoveId] = useState<string | null>(null);

  return (
    <div className="container px-4 py-8 lg:px-8 lg:py-10">
      <header className="mb-8">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm">
          <ol className="flex items-center gap-3">
            <li>
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-muted-foreground">
              /
            </li>
            <li aria-current="page">Shopping Cart</li>
          </ol>
        </nav>
        <div className="flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-hover text-primary-foreground">
            <ShoppingCart aria-hidden="true" className="size-8" />
          </span>
          <h1 className="text-display-mobile sm:text-display">Shopping Cart</h1>
        </div>
        <p className="mt-3 text-muted-foreground">
          You have{" "}
          <span className="font-semibold text-primary">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>{" "}
          in your cart
        </p>
      </header>
      <div className="grid items-start gap-6 lg:grid-cols-5 lg:gap-8">
        <section
          aria-label="Cart items"
          className={cn(
            "min-w-0",
            items.length > 0 ? "lg:col-span-3" : "lg:col-span-5",
          )}
        >
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="grid grid-cols-3 gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-card sm:gap-6 sm:p-6 lg:flex"
              >
                <div className="row-span-2 flex flex-col justify-between gap-4 lg:w-32 lg:shrink-0">
                  <Link
                    href={`/products/${item.id}`}
                    className="relative block aspect-square overflow-hidden rounded-xl border border-border/50 bg-linear-to-br from-background to-muted"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 640px) 128px, 96px"
                      className="object-contain p-3"
                    />
                  </Link>
                  <p className="mt-4 inline-flex self-end items-center justify-center gap-1 rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                    <Check aria-hidden="true" className="size-3" />
                    {item.stockLabel}
                  </p>
                </div>
                <div className="col-span-2 min-w-0 lg:flex-1">
                  <h2 className="text-base font-bold sm:text-xl">
                    <Link
                      href={`/products/${item.id}`}
                      className="hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </h2>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-linear-to-r from-accent/60 to-muted px-3 py-1 text-accent-foreground">
                      {item.category}
                    </span>
                    <span className="text-subtle-foreground">·</span>
                    <span className="text-muted-foreground">
                      SKU: {item.sku}
                    </span>
                  </div>
                  <p className="mt-4">
                    <span className="text-xl font-bold text-primary">
                      {item.unitPrice} EGP
                    </span>
                    <span className="ml-2 text-sm text-subtle-foreground">
                      per unit
                    </span>
                  </p>
                  <div className="mt-5 inline-flex items-center gap-4 rounded-xl border bg-muted p-1">
                    <Button
                      unstyled
                      type="button"
                      disabled={
                        pendingIds.has("clear") ||
                        pendingIds.has(item.id) ||
                        item.quantity <= 1
                      }
                      onClick={() =>
                        onQuantityChange?.(item.id, item.quantity - 1)
                      }
                      aria-label={`Decrease quantity of ${item.title}`}
                      className="disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer flex size-9 items-center justify-center rounded-lg bg-card text-muted-foreground"
                    >
                      <Minus aria-hidden="true" className="size-4 " />
                    </Button>
                    <span className="min-w-4 text-center font-bold">
                      {item.quantity}
                    </span>
                    <Button
                      unstyled
                      type="button"
                      disabled={
                        pendingIds.has("clear") ||
                        pendingIds.has(item.id) ||
                        item.quantity >= 999
                      }
                      onClick={() =>
                        onQuantityChange?.(item.id, item.quantity + 1)
                      }
                      aria-label={`Increase quantity of ${item.title}`}
                      className="disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                    >
                      <Plus aria-hidden="true" className="size-5 " />
                    </Button>
                  </div>
                </div>
                <div className="col-span-2 col-start-2 flex items-end gap-4 lg:ml-auto">
                  <div className="text-right">
                    <p className="mb-1 text-sm text-subtle-foreground">Total</p>
                    <p>
                      <strong className="text-2xl">{item.lineTotal}</strong>
                      <span className="text-sm text-subtle-foreground">
                        {" "}
                        EGP
                      </span>
                    </p>
                  </div>
                  <AlertDialog
                    open={removeId === item.id}
                    onOpenChange={(open) => setRemoveId(open ? item.id : null)}
                  >
                    <AlertDialogTrigger
                      render={
                        <Button
                          unstyled
                          type="button"
                          disabled={
                            pendingIds.has("clear") || pendingIds.has(item.id)
                          }
                          aria-label={`Remove ${item.title}`}
                          className="flex cursor-pointer  hover:bg-red-500 hover:text-white hover:border-red-500 size-12 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 text-destructive"
                        >
                          <Trash2 aria-hidden="true" className="size-5 " />
                        </Button>
                      }
                    />
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove Item?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Remove {item.title} from your cart?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          disabled={
                            pendingIds.has("clear") || pendingIds.has(item.id)
                          }
                          onClick={() => {
                            setRemoveId(null);
                            onRemove?.(item.id);
                          }}
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </article>
            ))}
            {items.length === 0 && <CartEmptyState />}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-sm">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-hover"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Continue Shopping
            </Link>
            {items.length > 0 && (
              <Button
                unstyled
                type="button"
                disabled={pendingIds.has("clear") || items.length === 0}
                onClick={onClear}
                className="inline-flex cursor-pointer items-center gap-2 text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 aria-hidden="true" className="size-4" />
                Clear all items
              </Button>
            )}
          </div>
        </section>
        {items.length > 0 && <OrderSummary {...summary} />}
      </div>
    </div>
  );
}
