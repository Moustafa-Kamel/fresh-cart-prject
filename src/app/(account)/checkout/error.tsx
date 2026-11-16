"use client";

import { CatalogError } from "@/components/shared/CatalogError";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <CatalogError reset={reset} />;
}
