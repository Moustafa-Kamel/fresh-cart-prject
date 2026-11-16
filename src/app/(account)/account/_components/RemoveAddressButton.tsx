"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { removeAccountAddress } from "@/actions/account";
import { Button } from "@/components/ui/button";

export function RemoveAddressButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={pending}
      aria-label={`Remove ${name}`}
      className="rounded-lg bg-muted text-muted-foreground hover:text-destructive"
      onClick={() => {
        if (!window.confirm(`Remove ${name}?`)) return;
        startTransition(async () => {
          try {
            const result = await removeAccountAddress(id);
            if (result.ok) toast.success(result.message);
            else toast.error(result.message);
          } catch {
            toast.error("Unable to remove address. Please try again.");
          }
        });
      }}
    >
      <Trash2 aria-hidden="true" />
    </Button>
  );
}
