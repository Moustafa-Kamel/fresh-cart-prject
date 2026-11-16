import type {
  AllSubcategoriesResponse,
  Subcategory,
  SubcategoryResponse,
} from "@/types/subcategories";
import { apiClient } from "./client";

export async function getAllSubcategories(): Promise<Subcategory[]> {
  const data = await apiClient<AllSubcategoriesResponse>("/subcategories", {
    next: { revalidate: 3600 },
  });
  return data.data;
}

export async function getSubcategory(id: string): Promise<Subcategory> {
  const data = await apiClient<SubcategoryResponse>(
    `/subcategories/${encodeURIComponent(id)}`,
    { next: { revalidate: 3600 } },
  );
  return data.data;
}

export async function getCategorySubcategories(
  categoryId: string,
): Promise<Subcategory[]> {
  const data = await apiClient<AllSubcategoriesResponse>(
    `/categories/${encodeURIComponent(categoryId)}/subcategories`,
    { next: { revalidate: 3600 } },
  );
  return data.data;
}
