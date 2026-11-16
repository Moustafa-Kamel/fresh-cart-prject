import { Heart } from "lucide-react";
import Link from "next/link";

type WishlistEmptyStateProps = { title?: string; description?: string };

export function WishlistEmptyState({
  title = "Your wishlist is empty",
  description = "Save the products you love and find them here.",
}: WishlistEmptyStateProps) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border bg-card px-6 py-12 text-center">
      <span className="mb-5 flex size-20 items-center justify-center rounded-full bg-destructive/5 text-destructive">
        <Heart aria-hidden="true" className="size-10" />
      </span>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <Link
        href="/products"
        className="mt-6 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-hover"
      >
        Explore Products
      </Link>
    </div>
  );
}
