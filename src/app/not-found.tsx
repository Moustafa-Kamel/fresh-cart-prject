import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container px-4 py-20 text-center lg:px-8">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-3 text-3xl font-bold">Page not found</h1>
      <p className="mt-4 text-muted-foreground">
        This page or product is no longer available.
      </p>
      <Link
        href="/products"
        className={buttonVariants({ className: "mt-6 rounded-md" })}
      >
        Browse products
      </Link>
    </div>
  );
}
