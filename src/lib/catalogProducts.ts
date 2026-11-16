import "server-only";

import type { AllProductsResponse } from "@/types/product";
import { getProducts } from "./api/products";
import {
  type parseProductSearchParams,
  productsApiQuery,
} from "./catalogQuery";

export async function getCatalogProducts(
  filters: ReturnType<typeof parseProductSearchParams>,
): Promise<AllProductsResponse> {
  const pageSize = 40;
  if (filters.invalidPriceRange) {
    return {
      results: 0,
      metadata: {
        currentPage: filters.page,
        numberOfPages: 0,
        limit: pageSize,
      },
      data: [],
    };
  }
  if (!filters.search)
    return getProducts(productsApiQuery(filters, filters.page, pageSize));

  // The live API's keyword/search parameters return no matches for known titles.
  // Search all cached pages of the filtered catalog on the server instead.
  const first = await getProducts(productsApiQuery(filters, 1, 40));
  const remaining = await Promise.all(
    Array.from(
      { length: Math.max(0, first.metadata.numberOfPages - 1) },
      (_, i) => getProducts(productsApiQuery(filters, i + 2, 40)),
    ),
  );
  const term = filters.search.toLocaleLowerCase("en");
  const matches = [
    ...first.data,
    ...remaining.flatMap((response) => response.data),
  ].filter((product) =>
    [
      product.title,
      product.description,
      product.category.name,
      product.brand.name,
    ]
      .join(" ")
      .toLocaleLowerCase("en")
      .includes(term),
  );
  const numberOfPages = Math.ceil(matches.length / pageSize);
  return {
    results: matches.length,
    metadata: {
      currentPage: filters.page,
      numberOfPages,
      limit: pageSize,
      ...(filters.page < numberOfPages ? { nextPage: filters.page + 1 } : {}),
      ...(filters.page > 1 ? { prevPage: filters.page - 1 } : {}),
    },
    data: matches.slice((filters.page - 1) * pageSize, filters.page * pageSize),
  };
}
