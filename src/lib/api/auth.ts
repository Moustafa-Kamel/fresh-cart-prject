import type { LoginValues, RegisterValues } from "@/lib/validations/auth";
import type { ForgotPasswordResponse, RegisterResponse } from "@/types/user";
import { apiClient } from "./client";

export async function signUp(
  registerData: RegisterValues,
): Promise<RegisterResponse> {
  const data = await apiClient<RegisterResponse>("/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(registerData),
  });
  return data;
}
export async function signIn(
  loginData: LoginValues,
): Promise<RegisterResponse> {
  const data = await apiClient<RegisterResponse>("/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(loginData),
  });
  return data;
}

export async function forgotPassword(
  email: string,
): Promise<ForgotPasswordResponse> {
  const data = await apiClient<ForgotPasswordResponse>(
    "/auth/forgotPasswords",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ email }),
    },
  );
  return data;
}

export async function verifyResetCode(resetCode: string): Promise<void> {
  await apiClient<void>("/auth/verifyResetCode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ resetCode }),
  });
}

export async function resetPassword(
  email: string,
  newPassword: string,
): Promise<void> {
  await apiClient<void>("/auth/resetPassword", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ email, newPassword }),
  });
}
