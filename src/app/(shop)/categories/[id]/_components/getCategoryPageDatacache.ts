import { notFound } from "next/navigation";
import { cache } from "react";
import { getCategory } from "@/lib/api/categories";
import { getCategorySubcategories } from "@/lib/api/subcategories";

export const getCategoryPageDatacache = cache(async (id: string) => {
  if (!/^[a-f\d]{24}$/i.test(id)) notFound();
  try {
    const [subcategories, category] = await Promise.all([
      getCategorySubcategories(id),
      getCategory(id),
    ]);
    return { subcategories, category };
  } catch (error) {
    if (error instanceof Error && error.cause === 404) notFound();
    throw error;
  }
});
