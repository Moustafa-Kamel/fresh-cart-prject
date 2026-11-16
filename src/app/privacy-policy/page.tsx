import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Cookie,
  Database,
  LockKeyhole,
  Mail,
  Share2,
  ShieldHalf,
  UserRound,
  UserRoundCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How FreshCart collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
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
              <li aria-current="page">Privacy Policy</li>
            </ol>
          </nav>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-3xl bg-primary-foreground/20 sm:size-20">
              <ShieldHalf aria-hidden="true" className="size-8 sm:size-10" />
            </span>
            <div>
              <h1 className="text-display-mobile sm:text-5xl sm:font-extrabold">
                Privacy Policy
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
          aria-label="Your Privacy Matters"
          className="mb-8 flex items-start gap-4 rounded-3xl border p-6 shadow-card sm:mb-12 sm:p-8 border-primary/20 bg-accent/50 text-accent-foreground"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-card">
            <ShieldHalf aria-hidden="true" className="size-6" />
          </span>
          <div>
            <h2 className="text-lg font-bold">Your Privacy Matters</h2>
            <p className="mt-2 leading-relaxed">
              This Privacy Policy describes how FreshCart collects, uses, and
              protects your personal information when you use our services. We
              are committed to ensuring that your privacy is protected.
            </p>
          </div>
        </section>
        <div className="grid gap-6 md:grid-cols-2 sm:gap-8">
          <section className="scroll-mt-28 rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                <Database aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-primary">
                  Article 1
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  Information We Collect
                </h2>
              </div>
            </div>
            <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  1.1
                </span>
                <span>
                  <strong className="font-semibold text-foreground">
                    Personal Data:
                  </strong>{" "}
                  Name, email address, phone number, and shipping address.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  1.2
                </span>
                <span>
                  <strong className="font-semibold text-foreground">
                    Payment Data:
                  </strong>{" "}
                  Credit card information processed securely through our payment
                  providers.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  1.3
                </span>
                <span>
                  <strong className="font-semibold text-foreground">
                    Technical Data:
                  </strong>{" "}
                  IP address, browser type, device information, and access
                  times.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  1.4
                </span>
                <span>
                  <strong className="font-semibold text-foreground">
                    Usage Data:
                  </strong>{" "}
                  Pages viewed, products browsed, and actions taken within our
                  platform.
                </span>
              </li>
            </ol>
          </section>
          <section className="scroll-mt-28 rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                <UserRound aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-primary">
                  Article 2
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  How We Use Your Information
                </h2>
              </div>
            </div>
            <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  2.1
                </span>
                <span>To process and fulfill your orders.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  2.2
                </span>
                <span>To send order confirmations and shipping updates.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  2.3
                </span>
                <span>
                  To provide customer support and respond to inquiries.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  2.4
                </span>
                <span>
                  To improve our products, services, and user experience.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  2.5
                </span>
                <span>
                  To send promotional communications (with your consent).
                </span>
              </li>
            </ol>
          </section>
          <section className="scroll-mt-28 rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                <LockKeyhole aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-primary">
                  Article 3
                </p>
                <h2 className="mt-1 text-xl font-bold">Data Protection</h2>
              </div>
            </div>
            <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  3.1
                </span>
                <span>
                  We implement industry-standard encryption (SSL/TLS) for all
                  data transfers.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  3.2
                </span>
                <span>
                  Payment information is processed by PCI-compliant payment
                  providers.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  3.3
                </span>
                <span>
                  We conduct regular security audits and vulnerability
                  assessments.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  3.4
                </span>
                <span>
                  Access to personal data is restricted to authorized personnel
                  only.
                </span>
              </li>
            </ol>
          </section>
          <section className="scroll-mt-28 rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                <Share2 aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-primary">
                  Article 4
                </p>
                <h2 className="mt-1 text-xl font-bold">Information Sharing</h2>
              </div>
            </div>
            <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  4.1
                </span>
                <span>
                  We do not sell, trade, or rent your personal information to
                  third parties.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  4.2
                </span>
                <span>
                  We may share data with trusted service providers who assist in
                  our operations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  4.3
                </span>
                <span>
                  We may disclose information when required by law or to protect
                  our rights.
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
                  Article 5
                </p>
                <h2 className="mt-1 text-xl font-bold">Your Rights</h2>
              </div>
            </div>
            <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  5.1
                </span>
                <span>
                  <strong className="font-semibold text-foreground">
                    Access:
                  </strong>{" "}
                  Request a copy of your personal data.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  5.2
                </span>
                <span>
                  <strong className="font-semibold text-foreground">
                    Rectification:
                  </strong>{" "}
                  Request correction of inaccurate data.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  5.3
                </span>
                <span>
                  <strong className="font-semibold text-foreground">
                    Erasure:
                  </strong>{" "}
                  Request deletion of your personal data.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  5.4
                </span>
                <span>
                  <strong className="font-semibold text-foreground">
                    Portability:
                  </strong>{" "}
                  Request your data in a portable format.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  5.5
                </span>
                <span>
                  <strong className="font-semibold text-foreground">
                    Opt-out:
                  </strong>{" "}
                  Unsubscribe from marketing communications at any time.
                </span>
              </li>
            </ol>
          </section>
          <section
            id="cookies"
            className="scroll-mt-28 rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                <Cookie aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-primary">
                  Article 6
                </p>
                <h2 className="mt-1 text-xl font-bold">Cookies</h2>
              </div>
            </div>
            <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  6.1
                </span>
                <span>
                  We use cookies to enhance your browsing experience and
                  remember preferences.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  6.2
                </span>
                <span>
                  You can control cookie settings through your browser
                  preferences.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-accent/60 px-2 text-xs font-medium text-primary">
                  6.3
                </span>
                <span>
                  Disabling cookies may affect the functionality of certain
                  features.
                </span>
              </li>
            </ol>
          </section>
          <section className="scroll-mt-28 rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                <Clock3 aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-primary">
                  Article 7
                </p>
                <h2 className="mt-1 text-xl font-bold">Data Retention</h2>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We retain your personal information only for as long as necessary
              to fulfill the purposes outlined in this policy, or as required by
              law. Account data is deleted within 30 days of account closure
              upon request.
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
              For questions about this Privacy Policy or to exercise your
              rights, contact our Data Protection Officer at{" "}
              <a
                href="mailto:privacy@freshcart.com"
                className="break-all font-medium text-primary hover:underline"
              >
                privacy@freshcart.com
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
            href="/terms-of-service"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card hover:bg-primary-hover"
          >
            View Terms of Service
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </nav>
      </div>
    </div>
  );
}
