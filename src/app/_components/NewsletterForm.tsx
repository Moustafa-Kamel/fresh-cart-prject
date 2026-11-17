"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const schema = z.object({ email: z.email("Enter a valid email address.") });
export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });
  return (
    <form
      noValidate
      onSubmit={handleSubmit(() =>
        toast.info("Newsletter signup is not connected yet."),
      )}
      className="mt-8"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "newsletter-error" : undefined}
          placeholder="you@example.com"
          className="h-14 min-w-0 flex-none sm:flex-1 rounded-xl border border-input bg-card px-5 text-base text-foreground shadow-card placeholder:text-subtle-foreground transition-colors hover:border-primary focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-ring"
        />
        <Button
          unstyled
          type="submit"
          className="inline-flex h-14 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-floating transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Subscribe <ArrowRight aria-hidden="true" className="size-5" />
        </Button>
      </div>
      {errors.email && (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-2 text-sm text-destructive"
        >
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
