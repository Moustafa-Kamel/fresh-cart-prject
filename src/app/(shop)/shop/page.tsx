import { Filter, FolderOpen, PackageOpen, X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CatalogImage } from "@/components/shared/CatalogImage";
import { PageHero } from "@/components/shared/PageHero";
import { ProductEmptyState } from "@/components/shared/ProductEmptyState";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { getBrand } from "@/lib/api/brands";
import { getCategory } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import { getSubcategory } from "@/lib/api/subcategories";
import { parseProductSearchParams } from "@/lib/catalogQuery";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse 40 products from the FreshCart catalog.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const { brand } = parseProductSearchParams(params);
  const subcategory =
    typeof params.subcategory === "string" &&
    /^[a-f\d]{24}$/i.test(params.subcategory)
      ? params.subcategory
      : "";
  const query = new URLSearchParams({ limit: "40", page: "1" });
  if (brand) query.set("brand", brand);
  if (subcategory) query.set("subcategory", subcategory);
  const [response, activeBrand, activeSubcategory] = await Promise.all([
    getProducts(query),
    brand ? getBrand(brand) : Promise.resolve(null),
    subcategory ? getSubcategory(subcategory) : Promise.resolve(null),
  ]);
  const category = activeSubcategory
    ? await getCategory(activeSubcategory.category)
    : null;
  const activeName = activeSubcategory?.name ?? activeBrand?.name;
  const image = category?.image ?? activeBrand?.image;
  const products = response.data.slice(0, 40);

  return (
    <>
      <PageHero
        title={activeName ?? "All Products"}
        subtitle={
          activeName
            ? `Explore our ${activeName} product collection`
            : "Explore our complete product collection"
        }
        breadcrumbItems={
          activeName
            ? [
                {
                  label: activeSubcategory ? "Categories" : "Brands",
                  href: activeSubcategory ? "/categories" : "/brands",
                },
                { label: activeName },
              ]
            : [{ label: "All Products" }]
        }
        icon={
          image ? (
            <div className="relative size-full overflow-hidden rounded-xl bg-background">
              <CatalogImage
                src={image}
                alt=""
                fill
                sizes="(min-width: 640px) 64px, 48px"
                className="object-contain"
              />
            </div>
          ) : (
            <PackageOpen />
          )
        }
      />
      <div className="container space-y-6 px-4 py-8 lg:px-8">
        {activeName && (
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-2 text-sm text-gray-600">
              <Filter size={14} className="fill-current" />
              Active Filters:
            </span>
            <Link
              href="/shop"
              aria-label={`Remove ${activeName} filter`}
              className="rounded-full flex flex-wrap items-center gap-3  bg-accent px-3 py-1 font-medium text-accent-foreground hover:bg-accent/70"
            >
              <FolderOpen size={14} className="fill-current" />
              {activeName}
              <X size={14} className="fill-current" />
            </Link>
            <Link href="/shop" className="text-primary hover:underline">
              Clear all
            </Link>
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          Showing {products.length} products
        </p>
        {products.length ? (
          <ProductGrid products={products} />
        ) : (
          <ProductEmptyState href="/shop" />
        )}
      </div>
    </>
  );
}
