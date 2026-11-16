"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { resendCodeAction, verifyCodeAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  type VerifyCodeValues,
  verifyCodeSchema,
} from "@/lib/validations/auth";

export default function VerifyCodeForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [notice, setNotice] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<VerifyCodeValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { resetCode: "" },
  });
  function onSubmit(values: VerifyCodeValues) {
    clearErrors("root");
    setNotice("");
    startTransition(async () => {
      try {
        const result = await verifyCodeAction(values);
        if (!result.ok) {
          setError("root", { message: result.message });
          return;
        }
        router.push("/reset-password");
        router.refresh();
      } catch {
        setError("root", { message: "Unable to submit. Please try again." });
      }
    });
  }
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="resetCode" className="block text-sm font-medium">
          Verification Code
        </label>
        <input
          id="resetCode"
          {...register("resetCode")}
          type="text"
          autoComplete="one-time-code"
          inputMode="numeric"
          maxLength={6}
          placeholder="••••••"
          aria-invalid={Boolean(errors.resetCode)}
          aria-describedby="resetCode-error"
          className="h-14 w-full rounded-lg border border-input bg-background px-4 text-center text-xl tracking-widest placeholder:text-subtle-foreground focus-visible:outline-primary"
        />
        {errors.resetCode && (
          <p
            id="resetCode-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.resetCode.message}
          </p>
        )}
      </div>
      {errors.root && (
        <p role="alert" className="text-sm text-destructive">
          {errors.root.message}
        </p>
      )}
      <p className="text-center text-sm text-muted-foreground">
        Didn&apos;t receive the code?{" "}
        <Button
          unstyled
          type="button"
          disabled={pending || isSubmitting}
          onClick={() => {
            clearErrors("root");
            setNotice("");
            startTransition(async () => {
              try {
                const result = await resendCodeAction();
                if (!result.ok) {
                  setError("root", { message: result.message });
                  return;
                }
                setNotice("A new reset code has been sent to your email.");
              } catch {
                setError("root", {
                  message: "Unable to resend. Please try again.",
                });
              }
            });
          }}
          className="font-semibold text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-60"
        >
          Resend Code
        </Button>
      </p>
      {notice && (
        <output className="block text-center text-sm text-primary">
          {notice}
        </output>
      )}
      <Button
        unstyled
        type="submit"
        disabled={pending || isSubmitting}
        className="h-14 w-full rounded-lg bg-primary px-4 font-semibold text-primary-foreground shadow-card-hover hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Please wait…" : "Verify Code"}
      </Button>
    </form>
  );
}
