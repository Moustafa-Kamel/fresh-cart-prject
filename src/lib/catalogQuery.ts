export const productSortOptions = [
  { value: "-createdAt", label: "Newest first" },
  { value: "price", label: "Price: low to high" },
  { value: "-price", label: "Price: high to low" },
  { value: "-ratingsAverage", label: "Top rated" },
];

export function parseProductSearchParams(
  params: Record<string, string | string[] | undefined>,
) {
  const first = (key: string) => {
    const value = params[key];
    return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
  };
  const id = (key: string) =>
    /^[a-f\d]{24}$/i.test(first(key)) ? first(key) : "";
  const price = (key: string) => {
    const value = first(key);
    return value !== "" && Number.isFinite(Number(value)) && Number(value) >= 0
      ? String(Number(value))
      : "";
  };
  const requestedPage = Number(first("page"));
  const minPrice = price("minPrice");
  const maxPrice = price("maxPrice");
  return {
    search: first("search").slice(0, 120),
    category: id("category"),
    brand: id("brand"),
    sort: productSortOptions.some((option) => option.value === first("sort"))
      ? first("sort")
      : "-createdAt",
    page:
      Number.isSafeInteger(requestedPage) && requestedPage > 0
        ? requestedPage
        : 1,
    minPrice,
    maxPrice,
    invalidPriceRange:
      minPrice !== "" && maxPrice !== "" && Number(minPrice) > Number(maxPrice),
  };
}

export function productsApiQuery(
  filters: ReturnType<typeof parseProductSearchParams>,
  page = filters.page,
  limit = 12,
) {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort: filters.sort,
  });
  if (filters.category) query.set("category[in]", filters.category);
  if (filters.brand) query.set("brand", filters.brand);
  if (filters.minPrice) query.set("price[gte]", filters.minPrice);
  if (filters.maxPrice) query.set("price[lte]", filters.maxPrice);
  return query;
}

export function productsHref(
  filters: ReturnType<typeof parseProductSearchParams>,
  page = filters.page,
) {
  const query = new URLSearchParams();
  for (const key of [
    "search",
    "category",
    "brand",
    "minPrice",
    "maxPrice",
    "sort",
  ] as const) {
    if (filters[key]) query.set(key, filters[key]);
  }
  if (page > 1) query.set("page", String(page));
  return `/products?${query.toString()}`;
}
