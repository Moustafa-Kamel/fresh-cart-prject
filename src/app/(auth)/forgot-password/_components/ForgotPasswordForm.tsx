"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { forgotPasswordAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  type ForgotPasswordValues,
  forgotPasswordSchema,
} from "@/lib/validations/auth";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });
  function onSubmit(values: ForgotPasswordValues) {
    clearErrors("root");
    startTransition(async () => {
      try {
        const result = await forgotPasswordAction(values);
        if (!result.ok) {
          setError("root", { message: result.message });
          return;
        }
        router.push("/verify-code");
        router.refresh();
      } catch {
        setError("root", { message: "Unable to submit. Please try again." });
      }
    });
  }
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email Address
        </label>
        <div className="relative">
          <Mail
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-subtle-foreground"
          />
          <input
            id="email"
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            aria-invalid={Boolean(errors.email)}
            aria-describedby="email-error"
            className="h-14 w-full rounded-lg border border-input bg-background pl-12 pr-4 text-sm placeholder:text-subtle-foreground focus-visible:outline-primary"
          />
        </div>
        {errors.email && (
          <p id="email-error" role="alert" className="text-sm text-destructive">
            {errors.email.message}
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
        {pending ? "Please wait…" : "Send Reset Code"}
      </Button>
    </form>
  );
}
