import "server-only";
import { z } from "zod";
import { auth } from "@/auth";
import { getStoreToken } from "./storeToken";

export async function getReviewIdentity() {
  const session = await auth();
  if (!session?.user?.email) return null;
  const token = await getStoreToken(session.user.email);
  const claims = z
    .object({ id: z.string().regex(/^[a-f\d]{24}$/i) })
    .parse(
      JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString()),
    );
  return { token, userId: claims.id };
}
