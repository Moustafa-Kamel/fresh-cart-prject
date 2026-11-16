import type { UserAddressResponse } from "@/types/user";
import { apiClient } from "./client";

export async function addAddress(
  tkn: string,
  name: string,
  details: string,
  phone: string,
  city: string,
): Promise<UserAddressResponse> {
  const data = await apiClient<UserAddressResponse>("/addresses", {
    method: "POST",
    headers: { "Content-Type": "application/json", token: tkn },
    body: JSON.stringify({
      name: name,
      details: details,
      phone: phone,
      city: city,
    }),
    cache: "no-store",
  });
  return data;
}

export async function removeAddress(
  addressId: string,
  tkn: string,
): Promise<UserAddressResponse> {
  const data = await apiClient<UserAddressResponse>(
    `/addresses/${encodeURIComponent(addressId)}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json", token: tkn },
      cache: "no-store",
    },
  );
  return data;
}

export async function getSpecificAddress(
  tkn: string,
  addressId: string,
): Promise<UserAddressResponse> {
  const data = await apiClient<UserAddressResponse>(
    `/addresses/${encodeURIComponent(addressId)}`,
    {
      headers: { "Content-Type": "application/json", token: tkn },
      cache: "no-store",
    },
  );
  return data;
}
export async function getLoggedUserAddresses(
  tkn: string,
): Promise<UserAddressResponse> {
  const data = await apiClient<UserAddressResponse>("/addresses", {
    headers: { "Content-Type": "application/json", token: tkn },
    cache: "no-store",
  });
  return data;
}

export async function updateProfile(
  tkn: string,
  profile: { name: string; email?: string; phone: string },
): Promise<void> {
  await apiClient<unknown>("/users/updateMe/", {
    method: "PUT",
    headers: { "Content-Type": "application/json", token: tkn },
    cache: "no-store",
    body: JSON.stringify(profile),
  });
}

export async function updatePassword(
  tkn: string,
  currentPassword: string,
  password: string,
  rePassword: string,
): Promise<void> {
  await apiClient<unknown>("/users/changeMyPassword", {
    method: "PUT",
    headers: { "Content-Type": "application/json", token: tkn },
    cache: "no-store",
    body: JSON.stringify({ currentPassword, password, rePassword }),
  });
}
