"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container space-y-4 px-4 py-12" role="alert">
      <p>Unable to load password recovery. Please try again.</p>
      <Button
        unstyled
        type="button"
        onClick={reset}
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >
        Try again
      </Button>
    </div>
  );
}
