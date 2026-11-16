import { Eye, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Daum } from "@/types/product";
import { CatalogImage } from "./CatalogImage";
import { Price } from "./Price";
import { ProductStoreButton } from "./ProductStoreButton";
import { Rating } from "./Rating";

export function ProductCard({
  product,
  eager = false,
}: {
  product: Daum;
  eager?: boolean;
}) {
  const discounted =
    product.priceAfterDiscount !== undefined &&
    product.priceAfterDiscount < product.price;
  return (
    <article className="group relative flex h-full  flex-col overflow-hidden rounded-xl border bg-card p-4 shadow-card transition-all duration-200 ease-out hover:shadow-smooth-hover hover:-translate-y-1.25 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none">
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <ProductStoreButton
          kind="wishlist"
          compact
          product={{
            id: product._id,
            title: product.title,
            imageCover: product.imageCover,
            price: product.priceAfterDiscount ?? product.price,
            category: { name: product.category.name },
          }}
          className="inline-flex size-8 items-center justify-center rounded-full border bg-card text-muted-foreground shadow-floating hover:text-destructive"
        />
        <Button
          unstyled
          type="button"
          disabled
          aria-label={`Compare ${product.title}`}
          className="inline-flex size-8 items-center justify-center cursor-pointer rounded-full border bg-card text-gray-600 shadow-floating hover:text-primary"
        >
          <RefreshCw aria-hidden="true" className="size-4" />
        </Button>
        <Link
          href={`/products/${product._id}`}
          aria-label={`View ${product.title}`}
          className="inline-flex size-8 items-center justify-center rounded-full border bg-card text-gray-600 shadow-floating transition-colors hover:text-primary"
        >
          <Eye aria-hidden="true" className="size-4" />
        </Link>
      </div>
      <Link
        href={`/products/${product._id}`}
        aria-label={`View ${product.title}`}
        className="relative mb-3 block h-60 overflow-hidden bg-background"
      >
        <CatalogImage
          src={product.imageCover}
          alt={product.title}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-2 pr-8"
        />
        {discounted && (
          <span className="absolute top-0 left-0 rounded-xs bg-destructive px-2 py-1 text-badge text-primary-foreground">
            -
            {Math.round(
              (1 -
                (product.priceAfterDiscount ?? product.price) / product.price) *
                100,
            )}
            %
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2">
        <Link
          href={`/products?category=${product.category._id}`}
          className="text-xs text-subtle-foreground hover:text-primary"
        >
          {product.category.name}
        </Link>
        <h3 className="text-sm leading-5 font-semibold">
          <Link
            className="line-clamp-2 hover:text-primary"
            href={`/products/${product._id}`}
          >
            {product.title}
          </Link>
        </h3>
        <div className="mb-3 [&>span>span:last-child]:text-subtle-foreground">
          <Rating
            value={product.ratingsAverage}
            count={product.ratingsQuantity}
          />
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border-subtle/40 pt-2 text-base [&>span>span]:text-primary [&_del]:text-subtle-foreground">
          <Price
            price={
              discounted
                ? (product.priceAfterDiscount ?? product.price)
                : product.price
            }
            originalPrice={discounted ? product.price : undefined}
          />
          <ProductStoreButton
            kind="cart"
            compact
            product={{
              id: product._id,
              title: product.title,
              imageCover: product.imageCover,
              price: product.priceAfterDiscount ?? product.price,
              category: { name: product.category.name },
            }}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary-hover"
          />
        </div>
      </div>
    </article>
  );
}
