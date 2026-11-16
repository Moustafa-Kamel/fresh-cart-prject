import { Check, KeyRound, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export default function RecoveryLayout({
  children,
  step,
  title,
  description,
}: {
  children: ReactNode;
  step: 1 | 2 | 3;
  title: string;
  description: ReactNode;
}) {
  const icons = [Mail, KeyRound, LockKeyhole];
  const labels = ["Email address", "Verify reset code", "Create new password"];
  return (
    <section className="container grid gap-10 px-4 py-8 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-6 lg:py-12">
      <div className="hidden text-center lg:block">
        <div
          aria-hidden="true"
          className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-accent/60 to-muted shadow-card"
        >
          <span className="absolute left-6 top-6 size-24 rounded-full bg-accent" />
          <span className="absolute right-16 top-16 size-16 rounded-full bg-accent" />
          <span className="absolute bottom-8 right-8 size-32 rounded-full bg-accent" />
          <div className="relative flex items-center gap-3">
            <span className="flex size-14 -rotate-12 items-center justify-center rounded-lg bg-card text-primary shadow-card-hover">
              <Mail className="size-6" />
            </span>
            <span className="flex size-28 rotate-3 items-center justify-center rounded-3xl bg-card p-4 shadow-card-hover">
              <span className="flex size-full items-center justify-center rounded-xl bg-accent text-primary">
                <LockKeyhole className="size-12" />
              </span>
            </span>
            <span className="flex size-14 rotate-12 items-center justify-center rounded-lg bg-card text-primary shadow-card-hover">
              <ShieldCheck className="size-6" />
            </span>
          </div>
          <div className="absolute bottom-1/4 flex gap-3">
            <span className="size-3 rounded-full bg-primary/50" />
            <span className="size-3 rounded-full bg-primary/75" />
            <span className="size-3 rounded-full bg-primary" />
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-bold">Reset Your Password</h2>
        <p className="mt-5 text-base leading-7 text-muted-foreground">
          Don&apos;t worry, it happens to the best of us. We&apos;ll help you
          get back into your account in no time.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Mail className="size-4 text-primary" aria-hidden="true" />
            Email Verification
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
            Secure Reset
          </span>
          <span className="inline-flex items-center gap-2">
            <LockKeyhole className="size-4 text-primary" aria-hidden="true" />
            Encrypted
          </span>
        </div>
      </div>
      <div className="mx-auto w-full max-w-lg rounded-2xl bg-card px-6 py-10 shadow-card-hover sm:p-12 lg:max-w-none">
        <header className="text-center">
          <Link
            href="/"
            className="inline-block text-4xl font-bold tracking-tight"
          >
            <span className="text-primary">Fresh</span>Cart
          </Link>
          <h1 className="mt-6 text-2xl font-bold">{title}</h1>
          <p className="mt-3 break-words text-sm leading-6 text-muted-foreground sm:text-base">
            {description}
          </p>
        </header>
        <ol
          aria-label="Password recovery progress"
          className="mx-auto my-10 flex max-w-xs items-center"
        >
          {icons.map((Icon, index) => (
            <li
              key={labels[index]}
              aria-current={step === index + 1 ? "step" : undefined}
              className="flex items-center last:flex-none flex-1"
            >
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-full ${index < step ? "bg-primary text-primary-foreground" : "bg-muted text-subtle-foreground"} ${step === index + 1 ? "ring-4 ring-accent" : ""}`}
              >
                {index + 1 < step ? (
                  <Check className="size-5" aria-hidden="true" />
                ) : (
                  <Icon className="size-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                  Step {index + 1}: {labels[index]}
                  {index + 1 < step ? " (completed)" : ""}
                </span>
              </span>
              {index < 2 && (
                <span
                  aria-hidden="true"
                  className={`mx-3 h-0.5 flex-1 ${index + 1 < step ? "bg-primary" : "bg-border"}`}
                />
              )}
            </li>
          ))}
        </ol>
        {children}
      </div>
    </section>
  );
}
