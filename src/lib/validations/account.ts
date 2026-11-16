import { z } from "zod";
import { registerSchema, resetPasswordSchema } from "./auth";

export const profileSchema = z.object({
  name: registerSchema.shape.name,
  email: registerSchema.shape.email,
  phone: registerSchema.shape.phone,
});
export const changePasswordSchema = resetPasswordSchema.safeExtend({
  currentPassword: z.string().min(1, "Current password is required"),
});

export type ProfileValues = z.infer<typeof profileSchema>;
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export const addressSchema = z.object({
  name: z.string().trim().min(1, "Address name is required"),
  details: z.string().trim().min(1, "Address details are required"),
  phone: registerSchema.shape.phone,
  city: z.string().trim().min(1, "City is required"),
});
export type AddressValues = z.infer<typeof addressSchema>;
