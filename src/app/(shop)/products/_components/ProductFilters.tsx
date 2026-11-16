"use client";

import Form from "next/form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  type parseProductSearchParams,
  productSortOptions,
} from "@/lib/catalogQuery";
import type { Brand } from "@/types/brands";
import type { Daum } from "@/types/categories";

const selectClass =
  "h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function ProductFilters({
  filters,
  categories,
  brands,
}: {
  filters: ReturnType<typeof parseProductSearchParams>;
  categories: Daum[];
  brands: Brand[];
}) {
  return (
    <Form
      action="/products"
      onChange={(event) => {
        const target = event.target;
        if (
          target instanceof HTMLSelectElement ||
          (target instanceof HTMLInputElement && target.type === "radio")
        ) {
          event.currentTarget.requestSubmit();
        }
      }}
      onBlur={(event) => {
        const target = event.target;
        if (
          target instanceof HTMLInputElement &&
          target.type === "number" &&
          target.value !== target.defaultValue
        ) {
          event.currentTarget.requestSubmit();
        }
      }}
      className="space-y-6 rounded-xl border bg-background p-5"
    >
      <input type="hidden" name="search" value={filters.search} />
      <fieldset className="space-y-3 border-b pb-6">
        <legend className="mb-3 font-semibold">Categories</legend>
        <div className="max-h-56 space-y-3 overflow-y-auto">
          {[{ _id: "", name: "All categories" }, ...categories].map(
            (category) => (
              <label
                key={category._id}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <input
                  type="radio"
                  name="category"
                  value={category._id}
                  defaultChecked={filters.category === category._id}
                  className="size-4 accent-primary"
                />
                {category.name}
              </label>
            ),
          )}
        </div>
      </fieldset>
      <h2 className="font-semibold">Price Range</h2>
      <label
        htmlFor="catalog-min-price"
        className="flex flex-col gap-2 text-sm font-medium"
      >
        Minimum price (EGP)
        <Input
          id="catalog-min-price"
          name="minPrice"
          type="number"
          min="0"
          step="any"
          defaultValue={filters.minPrice}
          placeholder="0"
          className="h-10 rounded-md bg-background"
        />
      </label>
      <label
        htmlFor="catalog-max-price"
        className="flex flex-col gap-2 text-sm font-medium"
      >
        Maximum price (EGP)
        <Input
          id="catalog-max-price"
          name="maxPrice"
          type="number"
          min="0"
          step="any"
          defaultValue={filters.maxPrice}
          placeholder="No maximum"
          className="h-10 rounded-md bg-background"
        />
      </label>
      <fieldset className="space-y-3 border-y py-6">
        <legend className="font-semibold">Brands</legend>
        <div className="max-h-56 space-y-3 overflow-y-auto">
          {[{ _id: "", name: "All brands" }, ...brands].map((brand) => (
            <label
              key={brand._id}
              className="flex items-center gap-3 text-sm text-muted-foreground"
            >
              <input
                type="radio"
                name="brand"
                value={brand._id}
                defaultChecked={filters.brand === brand._id}
                className="size-4 accent-primary"
              />
              {brand.name}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="flex flex-col gap-2 text-sm font-medium">
        Sort by
        <select name="sort" defaultValue={filters.sort} className={selectClass}>
          {productSortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/products"
          className="inline-flex h-10 items-center text-sm text-muted-foreground hover:text-primary"
        >
          Clear all
        </Link>
      </div>
    </Form>
  );
}
