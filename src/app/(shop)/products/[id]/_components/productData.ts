import { notFound } from "next/navigation";
import { cache } from "react";
import { getProduct } from "@/lib/api/products";

export const getProductData = cache(async (id: string) => {
  if (!/^[a-f\d]{24}$/i.test(id)) notFound();
  try {
    return await getProduct(id);
  } catch (error) {
    if (error instanceof Error && error.cause === 404) notFound();
    throw error;
  }
});
