"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export function CatalogError({
  retry,
  reset,
  message = "We couldn’t load this page. Please try again.",
}: {
  retry?: () => void;
  reset?: () => void;
  message?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <div role="alert" className="container px-4 py-16 text-center lg:px-8">
      <h2 className="text-2xl font-bold">Unable to load the catalog</h2>
      <p className="mt-3 text-muted-foreground">{message}</p>
      <div className="mt-6 flex items-center justify-center gap-4">
        <Button
          disabled={pending}
          className="rounded-md"
          onClick={() =>
            startTransition(() => {
              if (retry) retry();
              else if (reset) {
                router.refresh();
                reset();
              } else router.refresh();
            })
          }
        >
          {pending ? "Retrying…" : "Try again"}
        </Button>
        <Link href="/products" className="text-sm text-primary hover:underline">
          Browse products
        </Link>
      </div>
    </div>
  );
}
