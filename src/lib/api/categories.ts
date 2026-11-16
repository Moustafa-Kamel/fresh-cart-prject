import type { SingleResource } from "@/types/api";
import type { AllCategoriesResponse, Daum } from "@/types/categories";
import { apiClient } from "./client";

export async function getAllCategories(): Promise<Daum[]> {
  const data = await apiClient<AllCategoriesResponse>("/categories", {
    next: { revalidate: 3600 },
  });
  return data.data;
}

export async function getCategory(id: string): Promise<Daum> {
  const data = await apiClient<SingleResource<Daum>>(
    `/categories/${encodeURIComponent(id)}`,
    { next: { revalidate: 3600 } },
  );
  return data.data;
}
