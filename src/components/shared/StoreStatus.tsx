"use client";

import { useStore } from "@/components/providers/StoreProvider";
import { Button } from "@/components/ui/button";

export function StoreStatus() {
  const store = useStore();
  if (!store.error && store.ready) return null;
  return (
    <div className="container px-4 pt-6 lg:px-8" aria-live="polite">
      {store.error && (
        <p role="alert" className="text-sm text-destructive">
          {store.error}
        </p>
      )}
      {!store.ready && !store.error && (
        <p className="text-sm text-muted-foreground">
          Loading your saved items…
        </p>
      )}
      {store.error && (
        <Button
          unstyled
          type="button"
          disabled={store.busy}
          onClick={() => void store.retry()}
          className="mt-3 rounded-lg border px-4 py-2 text-sm hover:bg-accent disabled:opacity-50"
        >
          {store.busy ? "Please wait…" : "Retry"}
        </Button>
      )}
    </div>
  );
}
