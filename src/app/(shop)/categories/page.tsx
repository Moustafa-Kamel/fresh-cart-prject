import { LayoutGrid } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CatalogError } from "@/components/shared/CatalogError";
import { CategoryGrid } from "@/components/shared/CategoryGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { getAllCategories } from "@/lib/api/categories";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Shop by Category",
  description: "Explore all FreshCart categories and browse their products.",
};

export default async function Categories() {
  try {
    const categories = await getAllCategories();
    return (
      <>
        <section className="bg-linear-to-r from-primary to-primary-hover text-primary-foreground">
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
                  <span aria-current="page">Categories</span>
                </li>
              </ol>
            </nav>
            <div className="flex items-start gap-5 sm:items-center">
              <div
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-primary-foreground/15 bg-primary-foreground/20 shadow-card sm:size-16"
              >
                <LayoutGrid className="size-6 sm:size-8" />
              </div>
              <div>
                <h1 className="text-display-mobile sm:text-display">
                  Shop by Category
                </h1>
                <p className="mt-2 text-sm text-primary-foreground/90 sm:text-base">
                  Browse our wide range of product categories
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="container px-4 py-10 lg:px-8">
          {categories.length ? (
            <CategoryGrid categories={categories} />
          ) : (
            <EmptyState
              title="No categories available"
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
