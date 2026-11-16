import {
  ArrowRight,
  Headset,
  Leaf,
  Mail,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Tag,
  Truck,
} from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogError } from "@/components/shared/CatalogError";
import { CatalogLoading } from "@/components/shared/CatalogLoading";
import { CategoryGrid } from "@/components/shared/CategoryGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { ProductEmptyState } from "@/components/shared/ProductEmptyState";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/lib/api/categories";
import { getAllProducts } from "@/lib/api/products";
import { cn } from "@/lib/utils";

import { HeroCarousel } from "./_components/HeroCarousel";
import { PromoCards } from "./_components/PromoCards";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Fresh Products & Everyday Essentials",
  description:
    "Explore FreshCart’s latest products, shop by category, and discover your favorite brands.",
};

async function HomeCatalog() {
  try {
    const [categories, products] = await Promise.all([
      getAllCategories(),
      getAllProducts(),
    ]);
    return (
      <div className="container space-y-12 px-4 py-10 lg:px-8">
        <section aria-label="Shop by category">
          <SectionHeading
            title="Shop By"
            accent="Category"
            href="/categories"
            linkText="View All Categories"
          />
          {categories.length ? (
            <CategoryGrid categories={categories} />
          ) : (
            <EmptyState
              title="No categories available"
              description="Please check back soon."
            />
          )}
        </section>
        <PromoCards />
        <section aria-label="Featured products">
          <SectionHeading
            title="Featured"
            accent="Products"
            href="/products"
            linkText="View All Products"
          />
          {products.length ? (
            <ProductGrid products={products} />
          ) : (
            <ProductEmptyState />
          )}
        </section>
      </div>
    );
  } catch (error) {
    if (error instanceof Error) return <CatalogError message={error.message} />;
    throw error;
  }
}

const benefits = [
  {
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    icon: Truck,
    iconClassName: "bg-destructive/5 text-info",
  },
  {
    title: "Secure Payment",
    description: "100% secure transactions",
    icon: ShieldCheck,
    iconClassName: "bg-deal-green/5 text-deal-green",
  },
  {
    title: "Easy Returns",
    description: "14-day return policy",
    icon: RotateCcw,
    iconClassName: "bg-secondary text-return",
  },
  {
    title: "24/7 Support",
    description: "Dedicated support team",
    icon: Headset,
    iconClassName: "bg-muted text-support",
  },
];

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <section aria-label="Shopping benefits" className="bg-muted py-8">
        <ul className="container grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {benefits.map(
            ({ title, description, icon: Icon, iconClassName }, index) => (
              <li key={title}>
                <Reveal
                  direction="up"
                  delay={index * 100}
                  className="flex min-h-20 items-center gap-4 rounded-xl border border-border/40 bg-card p-4 shadow-card"
                >
                  <span
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-full",
                      iconClassName,
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-6"
                      strokeWidth={2.5}
                    />
                  </span>
                  <div>
                    <h2 className="text-sm leading-5 font-semibold text-card-foreground">
                      {title}
                    </h2>
                    <p className="text-xs leading-4 text-footer-subtle">
                      {description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ),
          )}
        </ul>
      </section>
      <Suspense fallback={<CatalogLoading />}>
        <HomeCatalog />
      </Suspense>
      <section
        aria-labelledby="newsletter-heading"
        className="container px-4 pb-16 lg:px-8"
      >
        <div className="grid items-center gap-10 rounded-xl border border-primary/10 bg-linear-to-br from-card to-accent/30 p-6 shadow-card md:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
          <div className="min-w-0 lg:col-span-7">
            <div className="mb-8 flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-floating">
                <Mail aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xs font-bold tracking-wide text-primary uppercase">
                  Newsletter
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  50,000+ subscribers
                </p>
              </div>
            </div>
            <h2
              id="newsletter-heading"
              className="text-display-mobile md:text-display"
            >
              Get the Freshest Updates{" "}
              <span className="text-primary">Delivered Free</span>
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
              Weekly recipes, seasonal offers &amp; exclusive member perks.
            </p>
            <ul className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
              <li className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-card px-3 py-2 shadow-card">
                <span className="flex size-6 items-center justify-center rounded-full bg-accent text-primary">
                  <Leaf aria-hidden="true" className="size-4" />
                </span>
                Fresh Picks Weekly
              </li>
              <li className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-card px-3 py-2 shadow-card">
                <span className="flex size-6 items-center justify-center rounded-full bg-accent text-primary">
                  <Truck aria-hidden="true" className="size-4" />
                </span>
                Free Delivery Codes
              </li>
              <li className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-card px-3 py-2 shadow-card">
                <span className="flex size-6 items-center justify-center rounded-full bg-accent text-primary">
                  <Tag aria-hidden="true" className="size-4" />
                </span>
                Members-Only Deals
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                disabled
                className="h-14 min-w-0 flex-1 rounded-xl border border-input bg-card px-5 text-base text-foreground shadow-card placeholder:text-subtle-foreground"
              />
              <Button
                unstyled
                type="button"
                disabled
                className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-floating disabled:cursor-not-allowed"
              >
                Subscribe
                <ArrowRight aria-hidden="true" className="size-5" />
              </Button>
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-subtle-foreground">
              <Sparkles aria-hidden="true" className="size-4 text-rating" />
              Unsubscribe anytime. No spam, ever.
            </p>
          </div>
          <div className="relative isolate overflow-hidden rounded-xl border border-footer-border bg-footer p-6 text-footer-foreground shadow-card-hover md:p-8 lg:col-span-5">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -right-16 -z-10 size-64 rounded-full bg-accent/30 blur-3xl"
            />
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-footer-foreground uppercase">
              <Smartphone aria-hidden="true" className="size-4" />
              Mobile App
            </p>
            <h3 className="mt-6 text-2xl leading-8 font-bold tracking-tight">
              Shop Faster on Our App
            </h3>
            <p className="mt-2 text-sm leading-6 text-footer-muted md:text-base">
              Get app-exclusive deals &amp; 15% off your first order.
            </p>
            <div className="mt-6 space-y-3">
              <Reveal
                direction="up"
                className="rounded-xl transition-shadow"
                visibleClassName="shadow-card"
              >
                <Button
                  unstyled
                  type="button"
                  disabled
                  className="flex w-full items-center gap-4 rounded-xl border border-footer-border bg-footer-card px-5 py-3 text-left disabled:cursor-not-allowed"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-8 shrink-0"
                  >
                    <path d="M17.1 12.3c0-2.4 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.7-1.9-1.6-.2-3.1 1-3.9 1-.8 0-2-1-3.3-1-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.2 10.2.8 1.2 1.8 2.5 3.1 2.4 1.3 0 1.8-.8 3.4-.8s2 .8 3.4.8c1.4 0 2.3-1.2 3.1-2.4 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.6-1-2.6-4.2ZM14.6 5.1c.7-.9 1.3-2.1 1.2-3.3-1.1 0-2.5.8-3.3 1.7-.7.8-1.3 2-1.2 3.2 1.2.1 2.5-.6 3.3-1.6Z" />
                  </svg>
                  <span>
                    <span className="block text-badge font-medium tracking-wide text-footer-muted uppercase">
                      Download on
                    </span>
                    <span className="block text-base font-semibold">
                      App Store
                    </span>
                  </span>
                </Button>
              </Reveal>
              <Reveal
                direction="up"
                className="rounded-xl transition-shadow"
                visibleClassName="shadow-card"
              >
                <Button
                  unstyled
                  type="button"
                  disabled
                  className="flex w-full items-center gap-4 rounded-xl border border-footer-border bg-footer-card px-5 py-3 text-left disabled:cursor-not-allowed"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-8 shrink-0"
                  >
                    <path d="m3 2 11 10L3 22V2Zm1.5 0L17 9l-2 2L4.5 2Zm13.4 7.5 3.3 1.8c.6.3.6 1.1 0 1.4l-3.3 1.8-2.7-2.5 2.7-2.5ZM17 15 4.5 22 15 13l2 2Z" />
                  </svg>
                  <span>
                    <span className="block text-badge font-medium tracking-wide text-footer-muted uppercase">
                      Get it on
                    </span>
                    <span className="block text-base font-semibold">
                      Google Play
                    </span>
                  </span>
                </Button>
              </Reveal>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-footer-muted">
              <span
                role="img"
                aria-label="5 stars"
                className="flex text-rating"
              >
                <Star aria-hidden="true" className="size-4 fill-current" />
                <Star aria-hidden="true" className="size-4 fill-current" />
                <Star aria-hidden="true" className="size-4 fill-current" />
                <Star aria-hidden="true" className="size-4 fill-current" />
                <Star aria-hidden="true" className="size-4 fill-current" />
              </span>
              <span className="text-footer-foreground">4.9</span>
              <span aria-hidden="true">·</span>
              <span>100K+ downloads</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
