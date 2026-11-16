"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createProductReview,
  deleteProductReview,
  getProductReviews,
  updateProductReview,
} from "@/lib/api/reviews";
import { getReviewIdentity } from "@/lib/auth/reviewIdentity";
import { reviewIdSchema, reviewSchema } from "@/lib/validations/review";

const mutationSchema = z.discriminatedUnion("operation", [
  z.object({
    operation: z.literal("create"),
    productId: reviewIdSchema,
    values: reviewSchema,
  }),
  z.object({
    operation: z.literal("update"),
    productId: reviewIdSchema,
    reviewId: reviewIdSchema,
    values: reviewSchema,
  }),
  z.object({
    operation: z.literal("delete"),
    productId: reviewIdSchema,
    reviewId: reviewIdSchema,
  }),
]);

export async function mutateReview(input: unknown) {
  const parsed = mutationSchema.safeParse(input);
  if (!parsed.success)
    return { ok: false, message: parsed.error.issues[0].message };
  try {
    const identity = await getReviewIdentity();
    if (!identity)
      return { ok: false, message: "Please sign in to review this product." };
    const data = parsed.data;
    if (data.operation === "create") {
      await createProductReview(identity.token, data.productId, data.values);
    } else {
      let owned = false;
      let page = 1;
      while (true) {
        const response = await getProductReviews(data.productId, page, true);
        owned = response.data.some(
          (review) =>
            review._id === data.reviewId && review.user._id === identity.userId,
        );
        if (owned || page >= response.metadata.numberOfPages) break;
        page++;
      }
      if (!owned)
        return { ok: false, message: "You can only change your own reviews." };
      if (data.operation === "delete")
        await deleteProductReview(identity.token, data.reviewId);
      else
        await updateProductReview(identity.token, data.reviewId, data.values);
    }
    revalidatePath(`/products/${data.productId}`);
    revalidatePath("/products");
    revalidatePath("/");
    return {
      ok: true,
      message:
        data.operation === "delete" ? "Review deleted." : "Review saved.",
    };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Unable to save your review.",
    };
  }
}
