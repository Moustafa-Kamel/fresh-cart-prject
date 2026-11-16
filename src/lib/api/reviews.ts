import "server-only";

import type { ReviewValues } from "@/lib/validations/review";
import type {
  CreateReviewForProductResponse,
  GetReviewForProductResponse,
} from "@/types/review";
import { apiClient } from "./client";

export async function getProductReviews(
  productId: string,
  page = 1,
  fresh = false,
): Promise<GetReviewForProductResponse> {
  const data = await apiClient<GetReviewForProductResponse>(
    `/products/${encodeURIComponent(productId)}/reviews?page=${page}&limit=40`,
    fresh ? { cache: "no-store" } : { next: { revalidate: 60 } },
  );
  return data;
}

export async function createProductReview(
  token: string,
  productId: string,
  values: ReviewValues,
): Promise<CreateReviewForProductResponse> {
  const data = await apiClient<CreateReviewForProductResponse>(
    `/products/${encodeURIComponent(productId)}/reviews`,
    {
      method: "POST",
      headers: { token, "Content-Type": "application/json" },
      body: JSON.stringify(values),
      cache: "no-store",
    },
  );
  return data;
}

export async function updateProductReview(
  token: string,
  reviewId: string,
  values: ReviewValues,
): Promise<void> {
  await apiClient<unknown>(`/reviews/${encodeURIComponent(reviewId)}`, {
    method: "PUT",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify(values),
    cache: "no-store",
  });
}

export async function deleteProductReview(
  token: string,
  reviewId: string,
): Promise<void> {
  await apiClient<unknown>(`/reviews/${encodeURIComponent(reviewId)}`, {
    method: "DELETE",
    headers: { token },
    cache: "no-store",
  });
}
