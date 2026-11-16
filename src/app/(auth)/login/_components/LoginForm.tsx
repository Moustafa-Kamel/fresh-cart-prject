"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { type LoginValues, loginSchema } from "@/lib/validations/auth";
export default function LoginForm() {
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting: isValidating },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const isSubmitting = isValidating || isPending;

  function onSubmit(values: LoginValues) {
    clearErrors("root");
    setSuccess("");
    startTransition(async () => {
      try {
        const result = await loginAction(values);
        if ("error" in result) {
          setError("root", { message: result.error });
          return;
        }
        setSuccess("Logged in successfully.");
        const requested = new URLSearchParams(window.location.search).get(
          "callbackUrl",
        );
        const destination = new URL(requested ?? "/", window.location.origin);
        window.location.assign(
          destination.origin === window.location.origin
            ? destination.pathname + destination.search + destination.hash
            : "/",
        );
      } catch {
        setError("root", { message: "Unable to submit. Please try again." });
      }
    });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="login-email"
          className="mb-2 block text-sm font-medium text-muted-foreground"
        >
          Email Address
        </label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute top-3 left-4 size-5 text-subtle-foreground"
            aria-hidden="true"
          />
          <input
            id="login-email"
            {...register("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby="login-email-error"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            className="h-11 w-full rounded-md border bg-background pr-4 pl-12 text-sm text-foreground placeholder:text-subtle-foreground focus-visible:border-primary"
          />
        </div>
        {errors.email && (
          <p
            id="login-email-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between gap-2">
          <label
            htmlFor="login-password"
            className="text-sm font-medium text-muted-foreground"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="relative">
          <LockKeyhole
            className="pointer-events-none absolute top-3 left-4 size-5 text-subtle-foreground"
            aria-hidden="true"
          />
          <input
            id="login-password"
            {...register("password")}
            aria-invalid={Boolean(errors.password)}
            aria-describedby="login-password-error"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            className="h-11 w-full rounded-md border bg-background pr-4 pl-12 text-sm text-foreground placeholder:text-subtle-foreground focus-visible:border-primary"
          />
        </div>
        {errors.password && (
          <p
            id="login-password-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.password.message}
          </p>
        )}
      </div>
      {(errors.root || success) && (
        <div
          role={errors.root ? "alert" : "status"}
          className={`fixed top-4 right-4 z-50 max-w-[calc(100vw-2rem)] rounded-lg border bg-background px-4 py-3 text-sm shadow-lg ${
            errors.root ? "text-destructive" : "text-primary"
          }`}
        >
          {errors.root?.message || success}
        </div>
      )}
      <Button
        unstyled
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full disabled:cursor-not-allowed disabled:opacity-60 rounded-md bg-primary text-base font-semibold text-primary-foreground shadow-card"
      >
        {isSubmitting ? "Checking credentials…" : "Sign In"}
      </Button>
    </form>
  );
}
