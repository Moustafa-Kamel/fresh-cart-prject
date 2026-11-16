import { z } from "zod";

export const cashOrderResponseSchema = z.object({
  status: z.literal("success"),
  data: z.object({ _id: z.string() }),
});

export const checkoutSessionResponseSchema = z.object({
  session: z.object({ url: z.url() }),
});

export const orderTokenVerificationSchema = z.object({
  decoded: z.object({ id: z.string().regex(/^[a-f\d]{24}$/i) }),
});

export const checkoutSchema = z.object({
  city: z.string().trim().min(2, "Enter your city.").max(100),
  details: z
    .string()
    .trim()
    .min(10, "Enter a complete street address (at least 10 characters).")
    .max(500),
  phone: z
    .string()
    .trim()
    .regex(/^01[0125]\d{8}$/, "Enter a valid 11-digit Egyptian mobile number."),
  payment: z.enum(["cash", "online"]),
});
