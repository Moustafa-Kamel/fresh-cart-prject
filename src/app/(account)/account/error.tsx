"use client";

import { Button } from "@/components/ui/button";

export default function AccountError({ reset }: { reset: () => void }) {
  return (
    <div role="alert" className="space-y-4 rounded-2xl border p-6">
      <h2 className="text-xl font-semibold">Unable to load your account</h2>
      <p className="text-sm text-muted-foreground">
        Please try again. If the problem continues, sign in again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
