import { ArrowLeft, ArrowRight, FolderOpen } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogImage } from "@/components/shared/CatalogImage";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHero } from "@/components/shared/PageHero";
import { getCategory } from "@/lib/api/categories";
import { getCategoryPageDatacache } from "./_components/getCategoryPageDatacache";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  if (!/^[a-f\d]{24}$/i.test(id)) notFound();
  const category = await getCategory(id);
  return {
    title: category.name,
    description: `Browse ${category.name} subcategories at FreshCart.`,
  };
}

export default async function CategorySubcategories({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { subcategories, category } = await getCategoryPageDatacache(id);

  return (
    <>
      <PageHero
        title={category.name}
        subtitle="Choose a subcategory to browse products"
        breadcrumbItems={[
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
        icon={
          <div className="relative size-full overflow-hidden rounded-xl">
            <CatalogImage
              src={category.image}
              alt=""
              fill
              sizes="(min-width: 640px) 64px, 48px"
              className="object-cover"
            />
          </div>
        }
      />
      <section
        aria-labelledby="subcategories-heading"
        className="container px-4 py-10 lg:px-8"
      >
        <Link
          href={"/categories"}
          className="mb-6 inline-flex items-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to Categories
        </Link>
        <h2 id="subcategories-heading" className="mb-6 text-xl font-semibold">
          {subcategories.length} Subcategories in {category.name}
        </h2>
        {subcategories.length ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {subcategories.map((subcategory) => (
              <Link
                key={subcategory._id}
                href={`/products?subcategory=${subcategory._id}`}
                className="group bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl hover:border-primary-hover/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <FolderOpen aria-hidden="true" className="size-7" />
                </div>
                <h3 className="font-bold text-foreground text-lg group-hover:text-primary-hover transition-colors mb-2">
                  {subcategory.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-primary-hover flex items-center gap-1">
                    Browse Products
                    <ArrowRight aria-hidden="true" className="size-3.5 " />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No subcategories available"
            description="Please check back soon."
          />
        )}
      </section>
    </>
  );
}
