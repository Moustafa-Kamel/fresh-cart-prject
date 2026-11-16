import "server-only";
import { headers } from "next/headers";
import { getToken } from "next-auth/jwt";

export async function getStoreToken(owner: string) {
  const cookie = (await headers()).get("cookie") ?? "";
  const token = await getToken({
    req: { headers: { cookie } },
    secret: process.env.AUTH_SECRET,
    secureCookie: cookie
      .split(";")
      .some((part) => part.trim().startsWith("__Secure-authjs.session-token")),
  });
  if (
    token?.email !== owner ||
    typeof token.credentialToken !== "string" ||
    !token.credentialToken
  ) {
    throw new Error("Please sign in again to access your saved items.");
  }
  return token.credentialToken;
}
