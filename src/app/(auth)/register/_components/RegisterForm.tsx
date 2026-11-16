"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { registerAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { getPasswordStrength } from "@/lib/auth/passwordStrength";
import { type RegisterValues, registerSchema } from "@/lib/validations/auth";

export default function RegisterForm() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting: isValidating },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });
  const isSubmitting = isValidating || isPending;
  const strength = getPasswordStrength(watch("password"));

  function onSubmit(values: RegisterValues) {
    clearErrors("root");
    setSuccess(false);
    startTransition(async () => {
      try {
        const result = await registerAction(values);
        if ("error" in result) {
          setError("root", { message: result.error });
        } else {
          setSuccess(true);
          await new Promise((resolve) => setTimeout(resolve, 1500));
          router.push("/login");
        }
      } catch {
        setError("root", { message: "Unable to submit. Please try again." });
      }
    });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="register-name" className="block text-sm font-medium">
          Name*
        </label>
        <input
          id="register-name"
          {...register("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby="register-name-error"
          autoComplete="name"
          placeholder="Ali"
          className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-subtle-foreground"
        />
        {errors.name && (
          <p
            id="register-name-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="register-email" className="block text-sm font-medium">
          Email*
        </label>
        <input
          id="register-email"
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby="register-email-error"
          type="email"
          autoComplete="email"
          placeholder="ali@example.com"
          className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-subtle-foreground"
        />
        {errors.email && (
          <p
            id="register-email-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="register-password"
          className="block text-sm font-medium"
        >
          Password*
        </label>
        <input
          id="register-password"
          {...register("password")}
          aria-invalid={Boolean(errors.password)}
          aria-describedby="register-password-error password-help"
          type="password"
          autoComplete="new-password"
          placeholder="create a strong password"
          className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-subtle-foreground"
        />
        {errors.password && (
          <p
            id="register-password-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.password.message}
          </p>
        )}
        <div>
          <div className="flex gap-1" aria-hidden="true">
            {[1, 2, 3, 4].map((segment) => (
              <span
                key={segment}
                className={`h-1 flex-1 rounded-full ${segment <= strength.score ? (strength.score < 2 ? "bg-destructive" : strength.score < 4 ? "bg-primary/50" : "bg-primary") : "bg-muted"}`}
              />
            ))}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{strength.label}</p>
        </div>
        <p id="password-help" className="text-xs text-muted-foreground">
          Must be at least 6 characters
        </p>
      </div>
      <div className="space-y-2">
        <label htmlFor="register-confirm" className="block text-sm font-medium">
          Confirm Password*
        </label>
        <input
          id="register-confirm"
          {...register("rePassword")}
          aria-invalid={Boolean(errors.rePassword)}
          aria-describedby="register-confirm-error"
          type="password"
          autoComplete="new-password"
          placeholder="confirm your password"
          className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-subtle-foreground"
        />
        {errors.rePassword && (
          <p
            id="register-confirm-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.rePassword.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="register-phone" className="block text-sm font-medium">
          Phone Number*
        </label>
        <input
          id="register-phone"
          {...register("phone")}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby="register-phone-error"
          type="tel"
          autoComplete="tel"
          placeholder="01012345678"
          className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-subtle-foreground"
        />
        {errors.phone && (
          <p
            id="register-phone-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.phone.message}
          </p>
        )}
      </div>
      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          className="mt-0.5 size-4 shrink-0 accent-primary"
        />
        <span>
          I agree to the <span className="text-primary">Terms of Service</span>{" "}
          and <span className="text-primary">Privacy Policy</span> *
        </span>
      </label>
      {errors.root && (
        <p role="alert" className="text-sm text-destructive">
          {errors.root.message}
        </p>
      )}
      {success && (
        <output
          className="fixed top-4 right-4 left-4 z-50 flex items-center gap-3 rounded-md border bg-card p-4 text-sm text-foreground shadow-card sm:left-auto"
          aria-live="polite"
        >
          <CircleCheck
            className="size-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          Account created successfully!
        </output>
      )}
      <Button
        unstyled
        type="submit"
        disabled={isSubmitting}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        <UserPlus aria-hidden="true" className="size-5" />
        {isSubmitting ? "Creating account…" : "Create My Account"}
      </Button>
    </form>
  );
}
