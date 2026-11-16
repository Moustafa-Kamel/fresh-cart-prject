"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useId, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutateReview } from "@/actions/reviews";
import { Rating } from "@/components/shared/Rating";
import { Button } from "@/components/ui/button";
import { type ReviewValues, reviewSchema } from "@/lib/validations/review";
import type { DataItem } from "@/types/review";

function ReviewForm({
  productId,
  existing,
  onDone,
}: {
  productId: string;
  existing?: DataItem;
  onDone?: () => void;
}) {
  const id = useId();
  const [pending, startTransition] = useTransition();
  const form = useForm<ReviewValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      review: existing?.review ?? "",
      rating: existing?.rating ?? 5,
    },
  });
  function submit(values: ReviewValues) {
    startTransition(async () => {
      try {
        const result = await mutateReview(
          existing
            ? { operation: "update", productId, reviewId: existing._id, values }
            : { operation: "create", productId, values },
        );
        if (!result.ok) {
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        if (!existing) form.reset();
        onDone?.();
      } catch {
        toast.error("Unable to save your review. Please try again.");
      }
    });
  }
  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(submit)}
      className="space-y-4 rounded-xl border bg-card p-4"
    >
      <h3 className="font-semibold">
        {existing ? "Edit your review" : "Write a review"}
      </h3>
      <div className="space-y-2">
        <label htmlFor={`${id}-rating`} className="block text-sm">
          Rating (1–5)
        </label>
        <input
          id={`${id}-rating`}
          type="number"
          min="1"
          max="5"
          step="0.1"
          {...form.register("rating", { valueAsNumber: true })}
          aria-invalid={Boolean(form.formState.errors.rating)}
          aria-describedby={`${id}-rating-error`}
          className="w-24 rounded-md border bg-background p-2 focus-visible:outline-ring"
        />
        <p
          id={`${id}-rating-error`}
          role="alert"
          className="text-sm text-destructive"
        >
          {form.formState.errors.rating?.message}
        </p>
      </div>
      <div className="space-y-2">
        <label htmlFor={`${id}-review`} className="block text-sm">
          Your review
        </label>
        <textarea
          id={`${id}-review`}
          rows={4}
          maxLength={2000}
          {...form.register("review")}
          aria-invalid={Boolean(form.formState.errors.review)}
          aria-describedby={`${id}-review-error`}
          className="w-full rounded-md border bg-background p-3 focus-visible:outline-ring"
        />
        <p
          id={`${id}-review-error`}
          role="alert"
          className="text-sm text-destructive"
        >
          {form.formState.errors.review?.message}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save review"}
        </Button>
        {onDone && (
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={onDone}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export function ReviewsClient({
  productId,
  reviews,
  userId,
  loadingIdentity = false,
}: {
  productId: string;
  reviews: DataItem[];
  userId: string | null;
  loadingIdentity?: boolean;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  function remove(reviewId: string) {
    startTransition(async () => {
      try {
        const result = await mutateReview({
          operation: "delete",
          productId,
          reviewId,
        });
        if (result.ok) {
          toast.success(result.message);
          setDeleting(null);
        } else toast.error(result.message);
      } catch {
        toast.error("Unable to delete your review. Please try again.");
      }
    });
  }
  return (
    <div className="space-y-6">
      {loadingIdentity ? (
        <output className="text-sm text-muted-foreground">
          Loading review controls…
        </output>
      ) : userId ? (
        !reviews.some((review) => review.user._id === userId) && (
          <ReviewForm productId={productId} />
        )
      ) : (
        <p className="text-sm text-muted-foreground">
          <Link
            className="text-primary underline"
            href={`/login?callbackUrl=${encodeURIComponent(`/products/${productId}`)}`}
          >
            Sign in
          </Link>{" "}
          to write a review.
        </p>
      )}
      {reviews.length === 0 && (
        <p className="py-8 text-center text-muted-foreground">
          No reviews yet. Be the first to share your experience.
        </p>
      )}
      <ul className="divide-y">
        {reviews.map((review) => (
          <li key={review._id} className="space-y-3 py-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-semibold">{review.user.name}</h3>
              <Rating value={review.rating} count={1} />
            </div>
            <p className="whitespace-pre-wrap wrap-break-word text-sm text-muted-foreground">
              {review.review}
            </p>
            {review.user._id === userId && (
              <div className="space-y-3">
                {editing === review._id ? (
                  <ReviewForm
                    productId={productId}
                    existing={review}
                    onDone={() => setEditing(null)}
                  />
                ) : (
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setEditing(review._id)}
                      disabled={pending}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setDeleting(review._id)}
                      disabled={pending}
                    >
                      Delete
                    </Button>
                  </div>
                )}
                {deleting === review._id && (
                  <fieldset
                    aria-label="Confirm review deletion"
                    className="space-y-3 rounded-md border p-4"
                  >
                    <p className="text-sm">Delete your review permanently?</p>
                    <div className="flex gap-3">
                      <Button
                        variant="destructive"
                        disabled={pending}
                        onClick={() => remove(review._id)}
                      >
                        {pending ? "Deleting…" : "Delete review"}
                      </Button>
                      <Button
                        variant="outline"
                        disabled={pending}
                        onClick={() => setDeleting(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </fieldset>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
