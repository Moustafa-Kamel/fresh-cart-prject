import "server-only";

import type { ApiRequestOptions } from "@/types/api";

export async function apiClient<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error("Invalid API path.");
  }

  const baseUrl =
    process.env.API_BASE_URL ?? "https://ecommerce.routemisr.com/api/v1";
  const { next, ...requestOptions } = options;
  const headers = new Headers(requestOptions.headers);
  headers.set("Accept", "application/json");

  const isPrivate = headers.has("token");
  let response: Response;
  try {
    response = await fetch(`${baseUrl.replace(/\/+$/, "")}${path}`, {
      ...requestOptions,
      headers,
      ...(isPrivate ? { cache: "no-store" } : { next }),
    });
  } catch {
    throw new Error("Unable to reach the store. Please try again.");
  }

  if (response.status === 204) return undefined as T;

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new Error(
      "The store returned an unreadable response. Please try again.",
    );
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : "The request could not be completed. Please try again.";
    throw new Error(message, { cause: response.status });
  }

  return data as T;
}
