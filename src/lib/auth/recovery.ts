import "server-only";

import { cookies } from "next/headers";
import { decode, encode } from "next-auth/jwt";

const cookieName = "freshcart-recovery";
const maxAge = 10 * 60;

function secret() {
  if (!process.env.AUTH_SECRET)
    throw new Error("Authentication is not configured.");
  return process.env.AUTH_SECRET;
}

export async function setRecovery(email: string, verified: boolean) {
  const token = await encode({
    secret: secret(),
    salt: cookieName,
    maxAge,
    token: { email, verified },
  });
  (await cookies()).set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export async function getRecovery() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return null;
  try {
    const payload = await decode({ token, secret: secret(), salt: cookieName });
    if (!payload || typeof payload.email !== "string") return null;
    return { email: payload.email, verified: payload.verified === true };
  } catch {
    return null;
  }
}

export async function clearRecovery() {
  (await cookies()).delete(cookieName);
}
