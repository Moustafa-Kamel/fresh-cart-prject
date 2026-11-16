import { ShieldCheck, Star, Truck, UserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RegisterForm from "./_components/RegisterForm";

export const metadata = { title: "Create an account" };

export default function RegisterPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-8 md:px-6 lg:grid-cols-2 lg:gap-12 lg:py-12">
      <section aria-labelledby="welcome-heading">
        <h1
          id="welcome-heading"
          className="text-display-mobile font-extrabold tracking-tight lg:text-display"
        >
          Welcome to <span className="text-primary">FreshCart</span>
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground lg:text-xl">
          Join thousands of happy customers who enjoy fresh groceries delivered
          right to their doorstep.
        </p>

        <ul className="mt-8 space-y-6">
          <li className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
              <Star aria-hidden="true" className="size-6 fill-current" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Premium Quality</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Premium quality products sourced from trusted suppliers.
              </p>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
              <Truck aria-hidden="true" className="size-6" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Fast Delivery</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Same-day delivery available in most areas
              </p>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
              <ShieldCheck aria-hidden="true" className="size-6" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Secure Shopping</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your data and payments are completely secure
              </p>
            </div>
          </li>
        </ul>

        <figure className="mt-8 rounded-md bg-card p-4 shadow-card">
          <figcaption className="flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <UserRound aria-hidden="true" className="size-6" />
            </span>
            <div>
              <p className="text-sm font-medium">Sarah Johnson</p>
              <p
                role="img"
                aria-label="5 out of 5 stars"
                className="mt-1 flex text-rating"
              >
                <Star aria-hidden="true" className="size-4 fill-current" />
                <Star aria-hidden="true" className="size-4 fill-current" />
                <Star aria-hidden="true" className="size-4 fill-current" />
                <Star aria-hidden="true" className="size-4 fill-current" />
                <Star aria-hidden="true" className="size-4 fill-current" />
              </p>
            </div>
          </figcaption>
          <blockquote className="mt-4 text-sm italic leading-relaxed text-muted-foreground">
            &quot;FreshCart has transformed my shopping experience. The quality
            of the products is outstanding, and the delivery is always on time.
            Highly recommend!&quot;
          </blockquote>
        </figure>
      </section>

      <section
        aria-labelledby="register-heading"
        className="rounded-xl bg-card p-4 shadow-card-hover sm:p-6"
      >
        <header className="text-center">
          <h2 id="register-heading" className="text-2xl font-bold">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Start your fresh journey with us today
          </p>
        </header>
        <div className="mt-10 grid grid-cols-2 gap-2">
          <Button
            unstyled
            type="button"
            disabled
            title="Social sign-in is not available"
            className="flex h-11 items-center justify-center gap-2 rounded-md border border-border text-sm font-semibold"
          >
            <span aria-hidden="true" className="text-destructive">
              G
            </span>
            Google
          </Button>
          <Button
            unstyled
            type="button"
            disabled
            title="Social sign-in is not available"
            className="flex h-11 items-center justify-center gap-2 rounded-md border border-border text-sm font-semibold"
          >
            <span aria-hidden="true" className="text-info">
              f
            </span>
            Facebook
          </Button>
        </div>
        <div className="my-6 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>
        <RegisterForm />
        <p className="mt-4 border-t border-border pt-10 pb-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </section>
    </div>
  );
}
