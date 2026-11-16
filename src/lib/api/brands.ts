import type { AllBrandsResponse, Brand, BrandResponse } from "@/types/brands";
import { apiClient } from "./client";

export async function getAllBrands(page = 1): Promise<Brand[]> {
  const data = await getBrandsPage(page);
  return data.data;
}

export async function getBrandsPage(page = 1): Promise<AllBrandsResponse> {
  if (!Number.isInteger(page) || page < 1) {
    throw new Error("Page must be a positive integer.");
  }
  const data = await apiClient<AllBrandsResponse>(`/brands?page=${page}`, {
    next: { revalidate: 3600 },
  });
  return data;
}

export async function getCatalogBrands(): Promise<Brand[]> {
  const first = await getBrandsPage();
  const remaining = await Promise.all(
    Array.from(
      { length: Math.max(0, first.metadata.numberOfPages - 1) },
      (_, i) => getBrandsPage(i + 2),
    ),
  );
  return [...first.data, ...remaining.flatMap((response) => response.data)];
}

export async function getBrand(id: string): Promise<Brand> {
  const data = await apiClient<BrandResponse>(
    `/brands/${encodeURIComponent(id)}`,
    {
      next: { revalidate: 3600 },
    },
  );
  return data.data;
}
