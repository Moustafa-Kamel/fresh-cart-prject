import { z } from "zod";

export const reviewIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid ID");
export const reviewSchema = z.object({
  review: z
    .string()
    .trim()
    .min(1, "Write your review")
    .max(2000, "Use 2,000 characters or fewer"),
  rating: z.number().min(1, "Choose a rating").max(5),
});
export type ReviewValues = z.infer<typeof reviewSchema>;
