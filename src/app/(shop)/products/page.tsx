import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SearchForm } from "@/components/layout/SearchForm";
import { ProductCard } from "@/components/shared/ProductCard";
import { ProductEmptyState } from "@/components/shared/ProductEmptyState";
import { getCatalogBrands } from "@/lib/api/brands";
import { getAllCategories } from "@/lib/api/categories";
import { getCatalogProducts } from "@/lib/catalogProducts";
import { parseProductSearchParams, productsHref } from "@/lib/catalogQuery";
import ShopPage from "../shop/page";
import { ProductFilters } from "./_components/ProductFilters";
import { ProductPagination } from "./_components/ProductPagination";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse FreshCart products. Search and filter by category, brand, and price, and sort to find what you need.",
};

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseProductSearchParams(params);
  if (
    typeof params.subcategory === "string" &&
    /^[a-f\d]{24}$/i.test(params.subcategory)
  ) {
    return (
      <ShopPage
        searchParams={Promise.resolve({ subcategory: params.subcategory })}
      />
    );
  }
  if (
    filters.brand &&
    !filters.search &&
    !filters.category &&
    !filters.minPrice &&
    !filters.maxPrice
  ) {
    return (
      <ShopPage searchParams={Promise.resolve({ brand: filters.brand })} />
    );
  }
  const [response, categories, brands] = await Promise.all([
    getCatalogProducts(filters),
    getAllCategories(),
    getCatalogBrands(),
  ]);
  if (
    response.metadata.numberOfPages > 0 &&
    filters.page > response.metadata.numberOfPages
  ) {
    redirect(productsHref(filters, response.metadata.numberOfPages));
  }
  const active = [
    filters.search && `Search: ${filters.search}`,
    categories.find((category) => category._id === filters.category)?.name,
    brands.find((brand) => brand._id === filters.brand)?.name,
    filters.minPrice && `Min: ${filters.minPrice} EGP`,
    filters.maxPrice && `Max: ${filters.maxPrice} EGP`,
  ].filter(Boolean);

  return (
    <>
      <header className="border-b bg-background">
        <div className="container space-y-5 px-4 py-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex gap-3 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <span aria-hidden="true" className="text-muted-foreground">
              /
            </span>
            <h1 className="font-medium">
              {filters.search ? "Search Results" : "All Products"}
            </h1>
          </nav>
          <SearchForm className="block max-w-xl [&_input]:rounded-lg [&_input]:bg-background" />
        </div>
      </header>
      <div className="bg-muted/30">
        <div className="container grid gap-6 px-4 py-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:px-8">
          <aside aria-label="Product filters">
            <details open className="group">
              <summary className="mb-4 cursor-pointer font-semibold lg:hidden">
                Search filters
              </summary>
              <ProductFilters
                key={productsHref(filters)}
                filters={filters}
                categories={categories}
                brands={brands}
              />
            </details>
          </aside>
          <section aria-label="Product results" className="min-w-0">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
              <output>
                Showing {response.data.length} products · Page{" "}
                {response.metadata.currentPage} of{" "}
                {Math.max(1, response.metadata.numberOfPages)}
              </output>
              {active.length > 0 && (
                <Link href="/products" className="text-primary hover:underline">
                  Clear all
                </Link>
              )}
            </div>
            {active.length > 0 && (
              <ul
                aria-label="Active filters"
                className="mb-6 flex flex-wrap gap-2"
              >
                {active.map((label) => (
                  <li
                    key={String(label)}
                    className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            )}
            {response.data.length ? (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {response.data.map((product, index) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      eager={index === 0}
                    />
                  ))}
                </div>
                <ProductPagination
                  filters={filters}
                  pages={response.metadata.numberOfPages}
                />
              </>
            ) : (
              <ProductEmptyState
                title={
                  filters.invalidPriceRange
                    ? "Check your price range"
                    : undefined
                }
                description={
                  filters.invalidPriceRange
                    ? "Minimum price must not exceed maximum price."
                    : "Try adjusting your search or filters to find what you're looking for."
                }
                linkText="Clear Filters"
              />
            )}
          </section>
        </div>
      </div>
    </>
  );
}
