"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth, signOut } from "@/auth";
import {
  addAddress,
  getLoggedUserAddresses,
  removeAddress,
  updatePassword,
  updateProfile,
} from "@/lib/api/user";
import { getStoreToken } from "@/lib/auth/storeToken";
import {
  addressSchema,
  changePasswordSchema,
  profileSchema,
} from "@/lib/validations/account";

export async function removeAccountAddress(input: unknown) {
  const parsed = z
    .string()
    .regex(/^[a-f\d]{24}$/i, "Invalid address ID")
    .safeParse(input);
  if (!parsed.success) return { ok: false, message: "Invalid address ID" };
  const session = await auth();
  if (!session?.user?.email)
    return { ok: false, message: "Please sign in again." };
  try {
    const token = await getStoreToken(session.user.email);
    const addresses = await getLoggedUserAddresses(token);
    if (!addresses.data.some((address) => address._id === parsed.data)) {
      return { ok: false, message: "This address is no longer available." };
    }
    await removeAddress(parsed.data, token);
    revalidatePath("/account");
    revalidatePath("/account/addresses");
    revalidatePath("/checkout");
    return { ok: true, message: "Address removed." };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Unable to remove address.",
    };
  }
}

export async function addAccountAddress(input: unknown) {
  const parsed = addressSchema.safeParse(input);
  if (!parsed.success)
    return { ok: false, message: parsed.error.issues[0].message };
  try {
    const session = await auth();
    if (!session?.user?.email)
      return { ok: false, message: "Please sign in again." };
    const token = await getStoreToken(session.user.email);
    const { name, details, phone, city } = parsed.data;
    await addAddress(token, name, details, phone, city);
    revalidatePath("/account");
    revalidatePath("/account/addresses");
    revalidatePath("/checkout");
    return { ok: true, message: "Address added." };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Unable to add address.",
    };
  }
}

export async function saveAccountProfile(input: unknown) {
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success)
    return { ok: false, message: parsed.error.issues[0].message };
  try {
    const session = await auth();
    if (!session?.user?.email)
      return { ok: false, message: "Please sign in again." };
    const { email, ...details } = parsed.data;
    await updateProfile(await getStoreToken(session.user.email), {
      ...details,
      ...(email === session.user.email ? {} : { email }),
    });
    revalidatePath("/account/settings");
    revalidatePath("/account");
    await signOut({ redirect: false });
    return { ok: true, message: "Profile updated. Please sign in again." };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Unable to update profile.",
    };
  }
}

export async function changeAccountPassword(input: unknown) {
  const parsed = changePasswordSchema.safeParse(input);
  if (!parsed.success)
    return { ok: false, message: parsed.error.issues[0].message };
  try {
    const session = await auth();
    if (!session?.user?.email)
      return { ok: false, message: "Please sign in again." };
    const { currentPassword, newPassword, rePassword } = parsed.data;
    await updatePassword(
      await getStoreToken(session.user.email),
      currentPassword,
      newPassword,
      rePassword,
    );
    await signOut({ redirect: false });
    return {
      ok: true,
      message: "Password updated. Please sign in with your new password.",
    };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Unable to update password.",
    };
  }
}
