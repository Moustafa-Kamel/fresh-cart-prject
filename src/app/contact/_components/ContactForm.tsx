"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const subjects = [
  "General Inquiry",
  "Order Support",
  "Shipping Question",
  "Returns & Refunds",
  "Product Information",
  "Feedback & Suggestions",
  "Other",
] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Enter your full name."),
  email: z.email("Enter a valid email address."),
  subject: z
    .string()
    .refine(
      (value) => subjects.some((subject) => subject === value),
      "Select a subject.",
    ),
  message: z.string().trim().min(1, "Enter a message."),
});

type ContactFields = z.infer<typeof schema>;

const inputClass =
  "mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-base placeholder:text-subtle-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFields>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  function submitMessage() {
    toast.error("Contact form delivery is not available yet.", {
      description:
        "Your message has not been sent. Please use the contact details on this page.",
    });
  }

  return (
    <>
      <Toaster richColors />
      <form
        onSubmit={handleSubmit(submitMessage)}
        noValidate
        className="space-y-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="text-sm font-medium">
              Full Name
            </label>
            <input
              id="contact-name"
              required
              autoComplete="name"
              placeholder="John Doe"
              className={inputClass}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
            />
            {errors.name && (
              <p
                id="name-error"
                role="alert"
                className="mt-1 text-sm text-destructive"
              >
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="contact-email" className="text-sm font-medium">
              Email Address
            </label>
            <input
              id="contact-email"
              required
              type="email"
              autoComplete="email"
              placeholder="john@example.com"
              className={inputClass}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="mt-1 text-sm text-destructive"
              >
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="contact-subject" className="text-sm font-medium">
            Subject
          </label>
          <select
            id="contact-subject"
            required
            className={inputClass}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            {...register("subject")}
          >
            <option value="" disabled>
              Select a subject
            </option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p
              id="subject-error"
              role="alert"
              className="mt-1 text-sm text-destructive"
            >
              {errors.subject.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="contact-message"
            required
            rows={6}
            placeholder="How can we help you?"
            className={`${inputClass} resize-y`}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
          />
          {errors.message && (
            <p
              id="message-error"
              role="alert"
              className="mt-1 text-sm text-destructive"
            >
              {errors.message.message}
            </p>
          )}
        </div>
        <Button
          unstyled
          type="submit"
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-card transition-colors hover:bg-primary-hover"
        >
          <Send aria-hidden="true" className="size-4" /> Send Message
        </Button>
      </form>
    </>
  );
}
