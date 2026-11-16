"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import {
  forgotPassword,
  resetPassword,
  signUp,
  verifyResetCode,
} from "@/lib/api/auth";
import { clearRecovery, getRecovery, setRecovery } from "@/lib/auth/recovery";
import {
  type ForgotPasswordValues,
  forgotPasswordSchema,
  type LoginValues,
  loginSchema,
  type RegisterValues,
  type ResetPasswordValues,
  registerSchema,
  resetPasswordSchema,
  type VerifyCodeValues,
  verifyCodeSchema,
} from "@/lib/validations/auth";

function safeAuthError(message: string) {
  const messages = [
    "Account Already Exists",
    "Incorrect email or password",
    "Unable to reach the store. Please try again.",
  ];
  return messages.includes(message)
    ? message
    : "Unable to complete your request. Please try again.";
}

export async function registerAction(input: RegisterValues) {
  const result = registerSchema.safeParse(input);
  if (!result.success) return { error: result.error.issues[0].message };

  try {
    const response = await signUp(result.data);
    if (response?.message !== "success")
      return { error: "Unable to create your account. Please try again." };

    return {
      success: "Account created. You can now sign in.",
    };
  } catch (error) {
    return {
      error: safeAuthError(error instanceof Error ? error.message : ""),
    };
  }
}

export async function loginAction(input: LoginValues) {
  const result = loginSchema.safeParse(input);
  if (!result.success) return { error: result.error.issues[0].message };
  try {
    await signIn("credentials", { ...result.data, redirect: false });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Incorrect email or password. Please try again." };
    }
    throw error;
  }
}

function recoveryError(error: Error | null) {
  const message = error?.message ?? "";
  if (
    /^(There is no user|Reset code is invalid|Unable to reach the store|The request could not be completed)/.test(
      message,
    )
  ) {
    return { ok: false as const, message };
  }
  return {
    ok: false as const,
    message: "Unable to complete password recovery. Please try again.",
  };
}

export async function forgotPasswordAction(input: ForgotPasswordValues) {
  const result = forgotPasswordSchema.safeParse(input);
  if (!result.success)
    return { ok: false as const, message: result.error.issues[0].message };
  await clearRecovery();
  try {
    await forgotPassword(result.data.email);
    await setRecovery(result.data.email, false);
    return { ok: true as const };
  } catch (error) {
    return recoveryError(error instanceof Error ? error : null);
  }
}

export async function verifyCodeAction(input: VerifyCodeValues) {
  const result = verifyCodeSchema.safeParse(input);
  if (!result.success)
    return { ok: false as const, message: result.error.issues[0].message };
  const recovery = await getRecovery();
  if (!recovery)
    return {
      ok: false as const,
      message: "Your recovery session expired. Request a new code.",
    };
  try {
    await verifyResetCode(result.data.resetCode);
    await setRecovery(recovery.email, true);
    return { ok: true as const };
  } catch (error) {
    return recoveryError(error instanceof Error ? error : null);
  }
}

export async function resendCodeAction() {
  const recovery = await getRecovery();
  if (!recovery)
    return {
      ok: false as const,
      message: "Your recovery session expired. Request a new code.",
    };
  return forgotPasswordAction({ email: recovery.email });
}

export async function resetPasswordAction(input: ResetPasswordValues) {
  const result = resetPasswordSchema.safeParse(input);
  if (!result.success)
    return { ok: false as const, message: result.error.issues[0].message };
  const recovery = await getRecovery();
  if (!recovery?.verified)
    return {
      ok: false as const,
      message: "Verify your email code before resetting your password.",
    };
  try {
    await resetPassword(recovery.email, result.data.newPassword);
    await clearRecovery();
    return { ok: true as const };
  } catch (error) {
    return recoveryError(error instanceof Error ? error : null);
  }
}
