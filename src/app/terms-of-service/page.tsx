import {
  ArrowLeft,
  ArrowRight,
  ContactRound,
  CreditCard,
  FileText,
  Handshake,
  Mail,
  RotateCcw,
  Scale,
  Truck,
  UserRoundCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms for using FreshCart, including orders, shipping, and returns.",
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-linear-to-b from-muted to-background">
      <section className="bg-linear-to-r from-primary to-primary-hover text-primary-foreground">
        <div className="container px-4 py-10 sm:py-16 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link
                  href="/"
                  className="text-primary-foreground/80 hover:underline"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Terms of Service</li>
            </ol>
          </nav>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-3xl bg-primary-foreground/20 sm:size-20">
              <FileText aria-hidden="true" className="size-8 sm:size-10" />
            </span>
            <div>
              <h1 className="text-display-mobile sm:text-5xl sm:font-extrabold">
                Terms of Service
              </h1>
              <p className="mt-3 text-sm sm:text-lg">
                Last updated: February 2026
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="container px-4 py-8 sm:py-12 lg:px-8">
        <section
          aria-label="Important Notice"
          className="mb-8 flex items-start gap-4 rounded-3xl border p-6 shadow-card sm:mb-12 sm:p-8 border-rating/40 bg-rating/10 text-return"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-return text-primary-foreground shadow-card">
            <FileText aria-hidden="true" className="size-6" />
          </span>
          <div>
            <h2 className="text-lg font-bold">Important Notice</h2>
            <p className="mt-2 leading-relaxed">
              By accessing and using FreshCart, you accept and agree to be bound
              by the terms and provisions of this agreement. Please read these
              terms carefully before using our services.
            </p>
          </div>
        </section>
        <div className="grid gap-6 md:grid-cols-2 sm:gap-8">
          <section className="scroll-mt-28 rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                <Handshake aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-primary">
                  Article 1
                </p>
                <h2 className="mt-1 text-xl font-bold">Acceptance of Terms</h2>
              </div>
            </div>
            <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  1.1
                </span>
                <span>
                  By accessing or using the Service, you acknowledge that you
                  have read, understood, and agree to be bound by these Terms.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  1.2
                </span>
                <span>
                  If you do not agree to these Terms, you must not access or use
                  the Service.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  1.3
                </span>
                <span>
                  We reserve the right to modify these Terms at any time, and
                  such modifications shall be effective immediately upon
                  posting.
                </span>
              </li>
            </ol>
          </section>
          <section className="scroll-mt-28 rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                <UserRoundCheck aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-primary">
                  Article 2
                </p>
                <h2 className="mt-1 text-xl font-bold">User Eligibility</h2>
              </div>
            </div>
            <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  2.1
                </span>
                <span>
                  The Service is intended for users who are at least eighteen
                  (18) years of age.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  2.2
                </span>
                <span>
                  By using the Service, you represent and warrant that you are
                  of legal age to form a binding contract.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  2.3
                </span>
                <span>
                  If you are accessing the Service on behalf of a legal entity,
                  you represent that you have the authority to bind such entity.
                </span>
              </li>
            </ol>
          </section>
          <section className="scroll-mt-28 rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                <ContactRound aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-primary">
                  Article 3
                </p>
                <h2 className="mt-1 text-xl font-bold">Account Registration</h2>
              </div>
            </div>
            <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  3.1
                </span>
                <span>
                  You may be required to create an account to access certain
                  features of the Service.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  3.2
                </span>
                <span>
                  You agree to provide accurate, current, and complete
                  information during registration.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  3.3
                </span>
                <span>
                  You are solely responsible for maintaining the confidentiality
                  of your account credentials.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  3.4
                </span>
                <span>
                  You agree to notify us immediately of any unauthorized use of
                  your account.
                </span>
              </li>
            </ol>
          </section>
          <section className="scroll-mt-28 rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                <CreditCard aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-primary">
                  Article 4
                </p>
                <h2 className="mt-1 text-xl font-bold">Orders and Payments</h2>
              </div>
            </div>
            <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  4.1
                </span>
                <span>
                  All orders placed through the Service are subject to
                  acceptance and availability.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  4.2
                </span>
                <span>
                  Prices are subject to change without notice prior to order
                  confirmation.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  4.3
                </span>
                <span>
                  Payment must be made in full at the time of purchase through
                  approved payment methods.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  4.4
                </span>
                <span>
                  We reserve the right to refuse or cancel any order at our sole
                  discretion.
                </span>
              </li>
            </ol>
          </section>
          <section
            id="shipping"
            className="scroll-mt-28 rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                <Truck aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-primary">
                  Article 5
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  Shipping and Delivery
                </h2>
              </div>
            </div>
            <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  5.1
                </span>
                <span>
                  Shipping times are estimates only and are not guaranteed.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  5.2
                </span>
                <span>
                  Risk of loss and title for items purchased pass to you upon
                  delivery to the carrier.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  5.3
                </span>
                <span>
                  We are not responsible for delays caused by carriers, customs,
                  or other factors beyond our control.
                </span>
              </li>
            </ol>
          </section>
          <section
            id="returns"
            className="scroll-mt-28 rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                <RotateCcw aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-primary">
                  Article 6
                </p>
                <h2 className="mt-1 text-xl font-bold">Returns and Refunds</h2>
              </div>
            </div>
            <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  6.1
                </span>
                <span>
                  Our return policy allows returns within 14 days of delivery
                  for most items.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  6.2
                </span>
                <span>Products must be unused and in original packaging.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  6.3
                </span>
                <span>
                  Refunds will be processed within 5-7 business days after
                  receiving the returned item.
                </span>
              </li>
            </ol>
          </section>
          <section className="scroll-mt-28 rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                <Scale aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-primary">
                  Article 7
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  Limitation of Liability
                </h2>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              To the maximum extent permitted by applicable law, FreshCart shall
              not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or
              revenues, whether incurred directly or indirectly.
            </p>
          </section>
          <section className="scroll-mt-28 rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                <Mail aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-primary">
                  Article 8
                </p>
                <h2 className="mt-1 text-xl font-bold">Contact Us</h2>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              If you have any questions about these Terms, please contact us at{" "}
              <a
                href="mailto:support@freshcart.com"
                className="break-all font-medium text-primary hover:underline"
              >
                support@freshcart.com
              </a>
            </p>
          </section>
        </div>
        <nav
          aria-label="Legal pages"
          className="mt-12 flex flex-wrap justify-between gap-4 border-t pt-8"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-muted px-6 py-3 text-sm font-medium hover:bg-accent"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to Home
          </Link>
          <Link
            href="/privacy-policy"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card hover:bg-primary-hover"
          >
            View Privacy Policy
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </nav>
      </div>
    </div>
  );
}
