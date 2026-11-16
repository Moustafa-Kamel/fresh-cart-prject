import { Tags } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BrandGrid } from "@/components/shared/BrandGrid";
import { CatalogError } from "@/components/shared/CatalogError";
import { EmptyState } from "@/components/shared/EmptyState";
import { getCatalogBrands } from "@/lib/api/brands";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Shop by Brand",
  description:
    "Discover all FreshCart brands and explore their latest products.",
};

export default async function Brands() {
  try {
    const brands = await getCatalogBrands();
    return (
      <>
        <section className="bg-linear-to-br from-support to-support/70 text-primary-foreground">
          <div className="container px-4 py-8 lg:px-8 lg:py-12">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm">
              <ol className="flex items-center gap-2">
                <li>
                  <Link
                    href="/"
                    className="rounded-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground focus-visible:outline-primary-foreground"
                  >
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="text-primary-foreground/80"
                  >
                    /
                  </span>
                  <span aria-current="page">Brands</span>
                </li>
              </ol>
            </nav>
            <div className="flex items-start gap-5 sm:items-center">
              <div
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-primary-foreground/15 bg-primary-foreground/20 shadow-card sm:size-16"
              >
                <Tags className="size-6 sm:size-8" />
              </div>
              <div>
                <h1 className="text-display-mobile sm:text-display">
                  Top Brands
                </h1>
                <p className="mt-2 text-sm text-primary-foreground/90 sm:text-base">
                  Shop from your favorite brands
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="container px-4 py-10 lg:px-8">
          {brands.length ? (
            <BrandGrid brands={brands} />
          ) : (
            <EmptyState
              title="No brands available"
              description="Please check back soon."
            />
          )}
        </div>
      </>
    );
  } catch (error) {
    if (error instanceof Error) return <CatalogError message={error.message} />;
    throw error;
  }
}
