import type { SingleResource } from "@/types/api";
import type { AllProductsResponse, Daum } from "@/types/product";
import { apiClient } from "./client";

export async function getAllProducts(): Promise<Daum[]> {
  const data = await apiClient<AllProductsResponse>("/products", {
    next: { revalidate: 60 },
  });
  return data.data;
}

export async function getProducts(
  query: URLSearchParams = new URLSearchParams(),
): Promise<AllProductsResponse> {
  return apiClient<AllProductsResponse>(`/products?${query.toString()}`, {
    next: { revalidate: 60 },
  });
}

export async function getProduct(id: string): Promise<Daum> {
  const data = await apiClient<SingleResource<Daum>>(
    `/products/${encodeURIComponent(id)}`,
    { next: { revalidate: 60 } },
  );
  return data.data;
}
