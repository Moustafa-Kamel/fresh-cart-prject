import * as zod from "zod";
export const loginSchema = zod.object({
  email: zod.string().email("Enter a valid email"),
  password: zod.string().min(1, "Password is required"),
});

export const registerSchema = zod
  .object({
    name: zod.string().min(3, "Name must be at least 3 characters"),
    email: zod.string().email("Enter a valid email"),
    password: zod.string().min(6, "Password must be at least 6 characters"),
    rePassword: zod.string(),
    phone: zod
      .string()
      .regex(/^01[0125]\d{8}$/, "Enter a valid Egyptian phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type LoginValues = zod.infer<typeof loginSchema>;
export type RegisterValues = zod.infer<typeof registerSchema>;

export const forgotPasswordSchema = zod.object({
  email: zod.string().email("Enter a valid email"),
});

export const verifyCodeSchema = zod.object({
  resetCode: zod
    .string()
    .regex(/^\d{6}$/, "Enter the six-digit code from your email"),
});

export const resetPasswordSchema = zod
  .object({
    newPassword: zod.string().min(6, "Password must be at least 6 characters"),
    rePassword: zod.string(),
  })
  .refine((data) => data.newPassword === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type ForgotPasswordValues = zod.infer<typeof forgotPasswordSchema>;
export type VerifyCodeValues = zod.infer<typeof verifyCodeSchema>;
export type ResetPasswordValues = zod.infer<typeof resetPasswordSchema>;
