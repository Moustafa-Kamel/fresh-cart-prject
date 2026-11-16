import { PackageOpen } from "lucide-react";
import Link from "next/link";

type ProductEmptyStateProps = {
  title?: string;
  description?: string;
  href?: string;
  linkText?: string;
};

export function ProductEmptyState({
  title = "No products found",
  description = "Try another brand or category, or explore our product collection.",
  href = "/products",
  linkText = "Explore Products",
}: ProductEmptyStateProps) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border bg-card px-6 py-12 text-center">
      <span className="mb-5 flex size-20 items-center justify-center rounded-full bg-primary/5 text-primary">
        <PackageOpen aria-hidden="true" className="size-10" />
      </span>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <Link
        href={href}
        className="mt-6 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        {linkText}
      </Link>
    </div>
  );
}
