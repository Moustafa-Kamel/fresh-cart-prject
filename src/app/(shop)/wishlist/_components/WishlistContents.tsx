import { ArrowLeft, Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WishlistEmptyState } from "./WishlistEmptyState";

type WishlistItem = {
  id: string;
  title: string;
  image: string;
  category: string;
  price: string;
  originalPrice?: string;
  stockLabel: string;
};

type WishlistContentsProps = {
  items: readonly WishlistItem[];
  busy?: boolean;
  onRemove?: (id: string) => void;
  onAddToCart?: (id: string) => void;
};

export function WishlistContents({
  items,
  busy = false,
  onRemove,
  onAddToCart,
}: WishlistContentsProps) {
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
            <li aria-current="page">Wishlist</li>
          </ol>
        </nav>
        <div className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-destructive/5 text-destructive">
            <Heart aria-hidden="true" className="size-6 fill-current" />
          </span>
          <div>
            <h1 className="text-2xl font-bold">My Wishlist</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"} saved
            </p>
          </div>
        </div>
      </header>
      {items.length === 0 ? (
        <WishlistEmptyState />
      ) : (
        <section
          aria-label="Saved products"
          className="overflow-hidden rounded-2xl border bg-card"
        >
          <div
            aria-hidden="true"
            className="hidden grid-cols-12 gap-4 bg-muted/50 px-6 py-4 text-sm text-muted-foreground lg:grid"
          >
            <span className="col-span-6">Product</span>
            <span className="col-span-2 text-center">Price</span>
            <span className="col-span-2 text-center">Status</span>
            <span className="col-span-2 text-center">Actions</span>
          </div>
          <ul className="divide-y">
            {items.map((item) => (
              <li
                key={item.id}
                className="grid gap-5 p-4 sm:p-6 lg:grid-cols-12 lg:items-center lg:gap-4"
              >
                <div className="flex min-w-0 items-center gap-4 lg:col-span-6">
                  <Link
                    href={`/products/${item.id}`}
                    className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-border/40 bg-muted/40"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-contain p-2"
                    />
                  </Link>
                  <div className="min-w-0">
                    <h2 className="line-clamp-2 font-medium">
                      <Link
                        href={`/products/${item.id}`}
                        className="hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm text-subtle-foreground">
                      {item.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 lg:col-span-2 lg:justify-center">
                  <span className="text-muted-foreground lg:sr-only">
                    Price:
                  </span>
                  <div>
                    <p className="font-semibold">{item.price} EGP</p>
                    {item.originalPrice && (
                      <del className="text-sm text-subtle-foreground">
                        {item.originalPrice} EGP
                      </del>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 lg:col-span-2 lg:justify-center">
                  <span className="text-muted-foreground lg:sr-only">
                    Status:
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/50 px-3 py-1 text-xs text-accent-foreground">
                    <span aria-hidden="true">●</span>
                    {item.stockLabel}
                  </span>
                </div>
                <div className="flex gap-2 lg:col-span-2">
                  <Button
                    unstyled
                    type="button"
                    disabled={busy}
                    onClick={() => onAddToCart?.(item.id)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-3 text-sm text-primary-foreground hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    <ShoppingCart
                      aria-hidden="true"
                      className="size-4 shrink-0"
                    />
                    Add to Cart
                  </Button>
                  <Button
                    unstyled
                    type="button"
                    disabled={busy}
                    onClick={() => onRemove?.(item.id)}
                    aria-label={`Remove ${item.title} from wishlist`}
                    className="flex size-11 shrink-0 items-center justify-center rounded-lg border text-subtle-foreground hover:text-destructive focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    <Trash2 aria-hidden="true" className="size-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      <Link
        href="/products"
        className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Continue Shopping
      </Link>
    </div>
  );
}
