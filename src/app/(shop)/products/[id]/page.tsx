import {
  Check,
  ChevronRight,
  House,
  RotateCcw,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { unstable_rethrow } from "next/navigation";
import { CatalogError } from "@/components/shared/CatalogError";
import { Price } from "@/components/shared/Price";
import { ProductCard } from "@/components/shared/ProductCard";
import { ProductStoreButton } from "@/components/shared/ProductStoreButton";
import { Rating } from "@/components/shared/Rating";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/api/products";
import { ProductGallery } from "./_components/ProductGallery";
import { ProductQuantity } from "./_components/ProductQuantity";
import { getProductData } from "./_components/productData";
import { ReviewsSection } from "./_components/ReviewsSection";
import { SuggestedProducts } from "./_components/SuggestedProducts";

async function ProductSuggestions({
  categoryId,
  productId,
}: {
  categoryId: string;
  productId: string;
}) {
  try {
    const response = await getProducts(
      new URLSearchParams({ "category[in]": categoryId, limit: "12" }),
    );
    const products = response.data.filter((item) => item._id !== productId);
    if (products.length === 0) return null;

    return (
      <SuggestedProducts>
        {products.map((item) => (
          <div
            key={item._id}
            className="min-w-0 snap-start [&>article]:rounded-md [&>article]:shadow-none [&>article>div:last-child>div:last-child]:border-0 [&>article>div:last-child>div:last-child>span>span]:text-foreground [&>article>div:last-child>div:last-child>span:has(del)>span]:text-primary"
          >
            <ProductCard product={item} />
          </div>
        ))}
      </SuggestedProducts>
    );
  } catch {
    return (
      <section className="mt-12" aria-label="Suggested products">
        <p className="text-sm text-muted-foreground">
          Suggested products are temporarily unavailable.
        </p>
      </section>
    );
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await getProductData(id);
    return {
      title: product.title,
      description: product.description.slice(0, 160),
      twitter: {
        card: "summary_large_image",
        title: product.title,
        description: product.description.slice(0, 160),
        images: [product.imageCover],
      },
      openGraph: {
        title: product.title,
        description: product.description.slice(0, 160),
        images: [{ url: product.imageCover, alt: product.title }],
      },
    };
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof Error)
      return { title: "Product", robots: { index: false } };
    throw error;
  }
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const product = await getProductData(id);
    const images = [...new Set([product.imageCover, ...product.images])].filter(
      Boolean,
    );
    const discounted =
      product.priceAfterDiscount !== undefined &&
      product.priceAfterDiscount < product.price;
    return (
      <div className="container px-4 py-8 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-sm text-footer-subtle"
        >
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <li>
              <Link
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                href="/"
              >
                <House aria-hidden="true" className="size-4 fill-current" />
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-subtle-foreground">
              <ChevronRight className="size-4" />
            </li>
            <li>
              <Link
                className="transition-colors hover:text-primary"
                href="/products"
              >
                Products
              </Link>
            </li>
            <li aria-hidden="true" className="text-subtle-foreground">
              <ChevronRight className="size-4" />
            </li>
            <li>
              <Link
                className="transition-colors hover:text-primary"
                href={`/products?category=${product.category._id}`}
              >
                {product.category.name}
              </Link>
            </li>
            <li aria-hidden="true" className="text-subtle-foreground">
              <ChevronRight className="size-4" />
            </li>
            <li aria-current="page" className="font-medium text-foreground">
              {product.title}
            </li>
          </ol>
        </nav>
        <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-3">
            <ProductGallery
              key={product._id}
              images={images}
              title={product.title}
            />
          </div>
          <div className="min-w-0 space-y-6 rounded-xl border bg-card p-6 shadow-card lg:col-span-9">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/products?category=${product.category._id}`}
                  className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground hover:underline"
                >
                  {product.category.name}
                </Link>
                <Link
                  href={`/products?brand=${product.brand._id}`}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground hover:underline"
                >
                  {product.brand.name}
                </Link>
              </div>
              <h1 className="mt-4 text-2xl leading-8 font-bold tracking-tight">
                {product.title}
              </h1>
            </div>
            <div className="[&_svg]:size-5 [&>span]:gap-3 [&>span]:text-sm">
              <Rating
                value={product.ratingsAverage}
                count={product.ratingsQuantity}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-3xl">
              <Price
                price={
                  discounted
                    ? (product.priceAfterDiscount ?? product.price)
                    : product.price
                }
                originalPrice={discounted ? product.price : undefined}
              />
              {discounted && (
                <span className="rounded-xs bg-destructive px-2 py-1 text-badge text-primary-foreground">
                  {Math.round(
                    (1 -
                      (product.priceAfterDiscount ?? product.price) /
                        product.price) *
                      100,
                  )}
                  % OFF
                </span>
              )}
            </div>
            <p
              className={
                product.quantity > 0
                  ? "inline-flex items-center gap-2 rounded-full bg-accent px-3 py-2 text-sm font-medium text-primary"
                  : "inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive"
              }
            >
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-current"
              />
              {product.quantity > 0 ? "In stock" : "Out of stock"}
            </p>
            <div className="border-t pt-6">
              <h2 className="sr-only">Product description</h2>
              <p className="whitespace-normal text-sm leading-7 text-muted-foreground">
                {product.description}
              </p>
            </div>
            <ProductQuantity
              key={product._id}
              available={product.quantity}
              price={
                discounted
                  ? (product.priceAfterDiscount ?? product.price)
                  : product.price
              }
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <ProductStoreButton
                kind="cart"
                product={{
                  id: product._id,
                  title: product.title,
                  imageCover: product.imageCover,
                  price: product.priceAfterDiscount ?? product.price,
                  category: { name: product.category.name },
                }}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-floating"
              />
              <Button
                unstyled
                type="button"
                disabled
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-footer px-6 text-sm font-semibold text-footer-foreground "
              >
                <Zap aria-hidden="true" className="size-5 fill-current" />
                Buy Now
              </Button>
            </div>
            <div className="flex gap-3">
              <ProductStoreButton
                kind="wishlist"
                product={{
                  id: product._id,
                  title: product.title,
                  imageCover: product.imageCover,
                  price: product.priceAfterDiscount ?? product.price,
                  category: { name: product.category.name },
                }}
                className="inline-flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg border bg-background px-4 text-sm font-medium text-muted-foreground"
              />
              <Button
                unstyled
                type="button"
                disabled
                aria-label="Share product"
                className="flex size-12 shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground "
              >
                <Share2 aria-hidden="true" className="size-5" />
              </Button>
            </div>
            <div className="grid gap-4 border-t pt-6 text-sm sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <Truck aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="font-medium">Free Delivery</p>
                  <p className="text-xs text-footer-subtle">
                    Orders over 500 EGP
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <RotateCcw aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-xs text-footer-subtle">
                    14-day return policy
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <ShieldCheck aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-xs text-footer-subtle">100% Protected</p>
                </div>
              </div>
            </div>
            <Link
              href="/products"
              className="inline-flex text-sm font-medium text-primary hover:underline"
            >
              Continue browsing products →
            </Link>
          </div>
        </div>
        <section
          aria-label="Product information and reviews"
          className="group/details mt-8 overflow-hidden rounded-xl border bg-card shadow-card"
        >
          <fieldset className="flex flex-wrap border-b text-sm font-medium">
            <legend className="sr-only">Choose product information</legend>
            <label className="relative inline-flex cursor-pointer items-center gap-2 border-b-2 border-transparent px-6 py-4 text-muted-foreground has-checked:border-primary has-checked:bg-accent/30 has-checked:text-primary has-focus-visible:outline-2 has-focus-visible:outline-ring">
              <input
                type="radio"
                name="product-information"
                id="product-details-view"
                className="sr-only"
              />
              <ShoppingBag aria-hidden="true" className="size-4" />
              Product Details
            </label>
            <label className="relative inline-flex cursor-pointer items-center gap-2 border-b-2 border-transparent px-6 py-4 text-muted-foreground has-checked:border-primary has-checked:bg-accent/30 has-checked:text-primary has-focus-visible:outline-2 has-focus-visible:outline-ring">
              <input
                type="radio"
                name="product-information"
                id="product-reviews-view"
                className="sr-only"
              />
              <Star aria-hidden="true" className="size-4 fill-current" />
              Reviews ({product.ratingsQuantity})
            </label>
            <label className="relative inline-flex cursor-pointer items-center gap-2 border-b-2 border-transparent px-6 py-4 text-muted-foreground has-checked:border-primary has-checked:bg-accent/30 has-checked:text-primary has-focus-visible:outline-2 has-focus-visible:outline-ring">
              <input
                type="radio"
                name="product-information"
                id="product-shipping-view"
                defaultChecked
                className="sr-only"
              />
              <Truck aria-hidden="true" className="size-4" />
              Shipping &amp; Returns
            </label>
          </fieldset>
          <div className="hidden space-y-6 p-6 group-has-[#product-details-view:checked]/details:block">
            <div>
              <h3 className="text-base font-semibold">About this Product</h3>
              <p className="mt-3 whitespace-normal text-sm leading-6 text-muted-foreground">
                {product.description}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="min-w-0 rounded-md bg-muted p-4">
                <h3 className="mb-4 text-base font-medium">
                  Product Information
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-footer-subtle">Category</dt>
                    <dd className="text-right">{product.category.name}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-footer-subtle">Subcategory</dt>
                    <dd className="flex flex-wrap justify-end gap-x-2 text-right">
                      {product.subcategory.map((subcategory) => (
                        <span key={subcategory._id}>{subcategory.name}</span>
                      ))}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-footer-subtle">Brand</dt>
                    <dd className="text-right">{product.brand.name}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-footer-subtle">Items Sold</dt>
                    <dd className="text-right">{product.sold} sold</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-md bg-muted p-4">
                <h3 className="mb-4 text-base font-medium">Key Features</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                    Premium Quality Product
                  </li>
                  <li className="flex items-center gap-2">
                    <Check
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                    100% Authentic Guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <Check
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                    Fast &amp; Secure Packaging
                  </li>
                  <li className="flex items-center gap-2">
                    <Check
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                    Quality Tested
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="hidden p-6 group-has-[#product-reviews-view:checked]/details:block">
            <ReviewsSection productId={product._id} />
          </div>
          <div className="hidden space-y-6 p-6 group-has-[#product-shipping-view:checked]/details:block">
            <h2 className="sr-only">Shipping &amp; Returns</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-md bg-linear-to-br from-accent/50 to-accent p-6">
                <h3 className="mb-4 flex items-center gap-3 text-base font-semibold">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Truck aria-hidden="true" className="size-6" />
                  </span>
                  Shipping Information
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                    Free shipping on orders over 500 EGP
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                    Standard delivery: 3–5 business days
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                    Express delivery available (1–2 business days)
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                    Track your order in real-time
                  </li>
                </ul>
              </div>
              <div className="rounded-md bg-linear-to-br from-accent/50 to-accent p-6">
                <h3 className="mb-4 flex items-center gap-3 text-base font-semibold">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <RotateCcw aria-hidden="true" className="size-6" />
                  </span>
                  Returns &amp; Refunds
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                    14-day hassle-free returns
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                    Full refund or exchange available
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                    Free return shipping on defective items
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                    Easy online return process
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-md bg-muted p-6 sm:items-center">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-border text-muted-foreground">
                <ShieldCheck aria-hidden="true" className="size-6" />
              </span>
              <div>
                <h3 className="text-base font-semibold">
                  Buyer Protection Guarantee
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Get a full refund if your order doesn’t arrive or isn’t as
                  described. We ensure your shopping experience is safe and
                  secure.
                </p>
              </div>
            </div>
          </div>
        </section>
        <ProductSuggestions
          categoryId={product.category._id}
          productId={product._id}
        />
      </div>
    );
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof Error) return <CatalogError message={error.message} />;
    throw error;
  }
}
