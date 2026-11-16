import { Suspense } from "react";
import { getProductReviews } from "@/lib/api/reviews";
import { getReviewIdentity } from "@/lib/auth/reviewIdentity";
import type { DataItem } from "@/types/review";
import { ReviewsClient } from "./ReviewsClient";

async function ReviewControls({
  productId,
  reviews,
}: {
  productId: string;
  reviews: DataItem[];
}) {
  const identity = await getReviewIdentity();
  return (
    <ReviewsClient
      productId={productId}
      reviews={reviews}
      userId={identity?.userId ?? null}
    />
  );
}

export async function ReviewsSection({ productId }: { productId: string }) {
  const response = await getProductReviews(productId);
  const reviews = [...response.data];
  for (let page = 2; page <= response.metadata.numberOfPages; page++) {
    reviews.push(...(await getProductReviews(productId, page)).data);
  }
  return (
    <section aria-labelledby="reviews-heading" className="space-y-6">
      <h2 id="reviews-heading" className="text-lg font-semibold">
        Customer reviews ({reviews.length})
      </h2>
      <Suspense
        fallback={
          <ReviewsClient
            productId={productId}
            reviews={reviews}
            userId={null}
            loadingIdentity
          />
        }
      >
        <ReviewControls productId={productId} reviews={reviews} />
      </Suspense>
    </section>
  );
}
