import type { Metadata } from "next";
import { z } from "zod";
import { auth } from "@/auth";
import { getStoreToken } from "@/lib/auth/storeToken";
import { SettingsForms } from "../_components/SettingsForms";

export const metadata: Metadata = { title: "Account Settings | FreshCart" };

export default async function SettingsPage() {
  const session = await auth();
  let userId = "—";
  let role = "—";
  if (session?.user?.email) {
    const token = await getStoreToken(session.user.email);
    const payload = token.split(".")[1];
    if (payload) {
      try {
        const claims = z
          .object({ id: z.string().min(1), role: z.string().min(1) })
          .safeParse(JSON.parse(Buffer.from(payload, "base64url").toString()));
        if (claims.success) {
          userId = claims.data.id;
          role = claims.data.role;
        }
      } catch {
        // Keep unavailable account information as a placeholder.
      }
    }
  }
  return (
    <SettingsForms
      name={session?.user?.name ?? ""}
      email={session?.user?.email ?? ""}
      userId={userId}
      role={role}
    />
  );
}
