"use client";

import { LogOut, UserPlus, UserRound } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function TopbarAccount() {
  const { data: session, status } = useSession();
  if (status === "loading")
    return (
      <span className="ml-2 h-4 w-32 animate-pulse rounded bg-muted-foreground/10" />
    );
  return (
    <>
      {session ? (
        <>
          <Link
            href="/account"
            className="ml-2 inline-flex items-center gap-2 border-l pl-6 hover:text-primary"
          >
            <UserRound className="size-3.5" aria-hidden="true" />
            {session.user?.name}
          </Link>
          <Button
            unstyled
            type="button"
            onClick={() => void signOut({ redirectTo: "/login" })}
            className="inline-flex cursor-pointer items-center gap-2 hover:text-primary"
          >
            <LogOut className="size-3.5" aria-hidden="true" />
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="ml-2 inline-flex items-center gap-2 border-l pl-6 hover:text-primary"
          >
            <UserRound className="size-3.5" aria-hidden="true" />
            Sign In
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 hover:text-primary"
          >
            <UserPlus className="size-3.5" aria-hidden="true" />
            Sign Up
          </Link>
        </>
      )}
    </>
  );
}
