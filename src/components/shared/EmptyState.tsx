import { SearchX } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function EmptyState({
  title = "No products found",
  description = "Try a different search or clear your filters.",
  href = "/products",
  linkText = "Browse all products",
}: {
  title?: string;
  description?: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="rounded-xl border border-dashed bg-muted/50 px-6 py-16 text-center">
      <SearchX
        aria-hidden="true"
        className="mx-auto mb-4 size-10 text-muted-foreground"
      />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <Link
        href={href}
        className={buttonVariants({ className: "mt-6 rounded-md" })}
      >
        {linkText}
      </Link>
    </div>
  );
}
