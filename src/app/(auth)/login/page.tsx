import { Clock, LockKeyhole, ShieldCheck, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginForm from "./_components/LoginForm";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <section className="container grid gap-10 px-4 py-8 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-6 lg:py-12">
      <div className="hidden text-center lg:block">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted shadow-card">
          <Image
            src="/login.webp"
            alt="A selection of fresh vegetables in a grocery store"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <h2 className="mt-6 text-2xl font-bold leading-8 text-foreground">
          FreshCart - Your One-Stop Shop for Fresh Products
        </h2>
        <p className="mt-5 text-base leading-7 text-muted-foreground">
          Join thousands of happy customers who trust FreshCart for their daily
          grocery needs
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Truck className="size-4 text-primary" aria-hidden="true" />
            Free Delivery
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
            Secure Payment
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="size-4 text-primary" aria-hidden="true" />
            24/7 Support
          </span>
        </div>
      </div>

      <div className="rounded-xl bg-card px-4 py-8 shadow-card sm:px-8 lg:px-12 lg:py-10">
        <div className="text-center">
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight text-foreground"
          >
            <span className="text-primary">Fresh</span>Cart
          </Link>
          <h1 className="mt-5 text-2xl font-bold leading-8">Welcome Back!</h1>
          <p className="mt-3 text-sm leading-5 text-muted-foreground">
            Sign in to continue your fresh shopping experience
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <Button
            unstyled
            type="button"
            disabled
            title="Social sign-in is not available"
            className="flex h-12 w-full cursor-not-allowed items-center justify-center rounded-md border bg-background text-sm font-medium text-muted-foreground"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="mr-3 size-5 fill-current text-destructive"
            >
              <path d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02 6 6 0 1 1-3.38-10.99c1.43 0 2.71.49 3.72 1.46l2.79-2.79A10 10 0 1 0 12 22c5.8 0 9.6-4.08 9.6-9.77Z" />
            </svg>
            Continue with Google
          </Button>
          <Button
            unstyled
            type="button"
            disabled
            title="Social sign-in is not available"
            className="flex h-12 w-full cursor-not-allowed items-center justify-center rounded-md border bg-background text-sm font-medium text-muted-foreground"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="mr-3 size-5 fill-current text-info"
            >
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.095 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.026 1.792-4.698 4.533-4.698 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.49 0-1.956.932-1.956 1.888v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.095 24 18.1 24 12.073Z" />
            </svg>
            Continue with Facebook
          </Button>
        </div>

        <div className="my-6 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          <span>OR CONTINUE WITH EMAIL</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <LoginForm />

        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            New to FreshCart?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:text-primary-hover"
            >
              Create an account
            </Link>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <LockKeyhole className="size-3.5" aria-hidden="true" />
              SSL Secured
            </span>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              50K+ Users
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5 fill-current" aria-hidden="true" />
              4.9 Rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
