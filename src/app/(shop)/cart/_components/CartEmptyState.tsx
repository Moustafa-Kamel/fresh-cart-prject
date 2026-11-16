import { ShoppingCart } from "lucide-react";
import Link from "next/link";

type CartEmptyStateProps = { title?: string; description?: string };

export function CartEmptyState({
  title = "Your cart is empty",
  description = "Explore our products and find something you love.",
}: CartEmptyStateProps) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-border/60 bg-card px-6 py-12 text-center shadow-card">
      <span className="mb-5 flex size-20 items-center justify-center rounded-full bg-accent text-primary">
        <ShoppingCart aria-hidden="true" className="size-10" />
      </span>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <Link
        href="/products"
        className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-hover"
      >
        Start Shopping
      </Link>
    </div>
  );
}
