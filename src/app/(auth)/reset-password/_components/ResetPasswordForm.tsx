"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { resetPasswordAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  type ResetPasswordValues,
  resetPasswordSchema,
} from "@/lib/validations/auth";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", rePassword: "" },
  });
  function onSubmit(values: ResetPasswordValues) {
    clearErrors("root");
    startTransition(async () => {
      try {
        const result = await resetPasswordAction(values);
        if (!result.ok) {
          setError("root", { message: result.message });
          return;
        }
        router.push("/login?reset=success");
        router.refresh();
      } catch {
        setError("root", { message: "Unable to submit. Please try again." });
      }
    });
  }
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="newPassword" className="block text-sm font-medium">
          New Password
        </label>
        <div className="relative">
          <LockKeyhole
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-subtle-foreground"
          />
          <input
            id="newPassword"
            {...register("newPassword")}
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.newPassword)}
            aria-describedby="newPassword-error"
            className="h-14 w-full rounded-lg border border-input bg-background px-12 text-sm placeholder:text-subtle-foreground focus-visible:outline-primary"
          />
          <Button
            unstyled
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-1 text-subtle-foreground hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="size-5" aria-hidden="true" />
            ) : (
              <Eye className="size-5" aria-hidden="true" />
            )}
          </Button>
        </div>
        {errors.newPassword && (
          <p
            id="newPassword-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.newPassword.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="rePassword" className="block text-sm font-medium">
          Confirm Password
        </label>
        <div className="relative">
          <LockKeyhole
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-subtle-foreground"
          />
          <input
            id="rePassword"
            {...register("rePassword")}
            type={showConfirmation ? "text" : "password"}
            placeholder="Confirm new password"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.rePassword)}
            aria-describedby="rePassword-error"
            className="h-14 w-full rounded-lg border border-input bg-background px-12 text-sm placeholder:text-subtle-foreground focus-visible:outline-primary"
          />
          <Button
            unstyled
            type="button"
            aria-label={
              showConfirmation
                ? "Hide password confirmation"
                : "Show password confirmation"
            }
            aria-pressed={showConfirmation}
            onClick={() => setShowConfirmation(!showConfirmation)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-1 text-subtle-foreground hover:text-foreground"
          >
            {showConfirmation ? (
              <EyeOff className="size-5" aria-hidden="true" />
            ) : (
              <Eye className="size-5" aria-hidden="true" />
            )}
          </Button>
        </div>
        {errors.rePassword && (
          <p
            id="rePassword-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.rePassword.message}
          </p>
        )}
      </div>
      {errors.root && (
        <p role="alert" className="text-sm text-destructive">
          {errors.root.message}
        </p>
      )}
      <Button
        unstyled
        type="submit"
        disabled={pending || isSubmitting}
        className="h-14 w-full rounded-lg bg-primary px-4 font-semibold text-primary-foreground shadow-card-hover hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Please wait…" : "Reset Password"}
      </Button>
    </form>
  );
}
