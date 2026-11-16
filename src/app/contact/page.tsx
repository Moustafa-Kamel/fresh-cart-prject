import { CircleHelp, Clock3, Headset, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the FreshCart support team.",
};

const contacts = [
  {
    title: "Phone",
    icon: Phone,
    lines: ["Mon-Fri from 8am to 6pm"],
    label: "+1 (800) 123-4567",
    href: "tel:+18001234567",
  },
  {
    title: "Email",
    icon: Mail,
    lines: ["We'll respond within 24 hours"],
    label: "support@freshcart.com",
    href: "mailto:support@freshcart.com",
  },
  {
    title: "Office",
    icon: MapPin,
    lines: ["123 Commerce Street", "New York, NY 10001", "United States"],
  },
  {
    title: "Business Hours",
    icon: Clock3,
    lines: [
      "Monday - Friday: 8am - 6pm",
      "Saturday: 9am - 4pm",
      "Sunday: Closed",
    ],
  },
];

export default function ContactPage() {
  return (
    <div className="bg-muted/50">
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Get in touch with our team."
        breadcrumbItems={[{ label: "Contact Us" }]}
        icon={<Headset />}
      />
      <div className="container grid gap-8 px-4 py-8 lg:grid-cols-3 lg:px-8 lg:py-12">
        <aside aria-label="Contact information" className="space-y-6">
          {contacts.map(({ title, icon: Icon, lines, label, href }) => (
            <section
              key={title}
              className="flex gap-4 rounded-xl border border-border/60 bg-card p-6 shadow-card"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-accent/60 text-primary">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div className="min-w-0 text-sm">
                <h2 className="mb-1 font-semibold text-foreground">{title}</h2>
                <div className="text-muted-foreground">
                  {lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                {href && (
                  <a
                    href={href}
                    className="mt-2 inline-block break-all text-base font-medium text-primary hover:underline"
                  >
                    {label}
                  </a>
                )}
              </div>
            </section>
          ))}
          <section className="rounded-xl border border-border/60 bg-card p-6 shadow-card">
            <h2 className="mb-4 text-sm font-semibold">Follow Us</h2>
            <ul className="flex gap-3" aria-label="Social networks">
              {[
                { name: "Facebook", mark: "f" },
                { name: "Twitter", mark: "𝕏" },
                { name: "Instagram", mark: "◎" },
                { name: "LinkedIn", mark: "in" },
              ].map(({ name, mark }) => (
                <li
                  key={name}
                  className="flex size-10 items-center justify-center rounded-full bg-muted text-footer-subtle"
                >
                  <span aria-hidden="true" className="font-bold">
                    {mark}
                  </span>
                  <span className="sr-only">{name}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <section className="rounded-xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-accent/60 text-primary">
                <Headset aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold">Send us a Message</h2>
                <p className="text-sm text-muted-foreground">
                  Fill out the form and we&apos;ll get back to you
                </p>
              </div>
            </div>
            <ContactForm />
          </section>
          <section className="flex items-start gap-4 rounded-xl border border-primary/10 bg-accent/50 p-6">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-card text-primary shadow-card">
              <CircleHelp aria-hidden="true" className="size-5" />
            </span>
            <div className="text-sm">
              <h2 className="font-semibold">Looking for quick answers?</h2>
              <p className="mt-1 text-muted-foreground">
                Contact our support team for help with orders, shipping,
                returns, and more.
              </p>
              <a
                href="mailto:support@freshcart.com"
                className="mt-4 inline-block text-primary hover:underline"
              >
                Contact Support &rarr;
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
