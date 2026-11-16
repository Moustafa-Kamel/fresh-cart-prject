import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  type parseProductSearchParams,
  productsHref,
} from "@/lib/catalogQuery";
import { cn } from "@/lib/utils";

const pageClass =
  "inline-flex size-10 items-center justify-center rounded-md border text-sm transition-colors hover:border-primary hover:text-primary";

export function ProductPagination({
  filters,
  pages,
}: {
  filters: ReturnType<typeof parseProductSearchParams>;
  pages: number;
}) {
  if (pages < 2) return null;
  const start = Math.max(1, Math.min(filters.page - 2, pages - 4));
  const visible = Array.from(
    { length: Math.min(pages, 5) },
    (_, i) => start + i,
  );
  return (
    <nav
      aria-label="Product pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {filters.page > 1 ? (
        <Link
          className={pageClass}
          href={productsHref(filters, filters.page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </Link>
      ) : (
        <Button
          unstyled
          type="button"
          disabled
          aria-label="Previous page"
          className={cn(pageClass, "text-subtle-foreground")}
        >
          <ChevronLeft className="size-4" />
        </Button>
      )}
      {start > 1 && (
        <>
          <Link
            className={pageClass}
            href={productsHref(filters, 1)}
            aria-label="Page 1"
          >
            1
          </Link>
          <span aria-hidden="true">…</span>
        </>
      )}
      {visible.map((page) => (
        <Link
          key={page}
          href={productsHref(filters, page)}
          aria-label={`Page ${page}`}
          aria-current={page === filters.page ? "page" : undefined}
          className={cn(
            pageClass,
            page === filters.page &&
              "border-primary bg-primary text-primary-foreground hover:text-primary-foreground",
          )}
        >
          {page}
        </Link>
      ))}
      {visible.at(-1) !== pages && (
        <>
          <span aria-hidden="true">…</span>
          <Link
            className={pageClass}
            href={productsHref(filters, pages)}
            aria-label={`Page ${pages}`}
          >
            {pages}
          </Link>
        </>
      )}
      {filters.page < pages ? (
        <Link
          className={pageClass}
          href={productsHref(filters, filters.page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </Link>
      ) : (
        <Button
          unstyled
          type="button"
          disabled
          aria-label="Next page"
          className={cn(pageClass, "text-subtle-foreground")}
        >
          <ChevronRight className="size-4" />
        </Button>
      )}
    </nav>
  );
}
