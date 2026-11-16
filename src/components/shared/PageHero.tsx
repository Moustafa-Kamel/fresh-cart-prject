import Link from "next/link";
import type { ReactNode } from "react";

type PageHeroProps = {
  title: string;
  subtitle: string;
  breadcrumbItems: ReadonlyArray<{ label: string; href?: string }>;
  icon: ReactNode;
};

export function PageHero({
  title,
  subtitle,
  breadcrumbItems,
  icon,
}: PageHeroProps) {
  return (
    <section className="bg-linear-to-r from-primary to-primary-hover text-primary-foreground">
      <div className="container px-4 py-8 lg:px-8 lg:py-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-primary-foreground/80">
            <li>
              <Link
                href="/"
                className="rounded-sm transition-colors hover:text-primary-foreground focus-visible:outline-primary-foreground"
              >
                Home
              </Link>
            </li>
            {breadcrumbItems.map((item, index) => (
              <li
                key={`${item.href ?? item.label}-${index}`}
                className="flex items-center gap-2"
              >
                <span aria-hidden="true">/</span>
                {item.href && index < breadcrumbItems.length - 1 ? (
                  <Link
                    href={item.href}
                    className="rounded-sm transition-colors hover:text-primary-foreground focus-visible:outline-primary-foreground"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-primary-foreground"
                    aria-current={
                      index === breadcrumbItems.length - 1 ? "page" : undefined
                    }
                  >
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="flex items-start gap-4 sm:items-center">
          <div
            aria-hidden="true"
            className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15 text-primary-foreground sm:size-16 [&_svg]:size-6 sm:[&_svg]:size-8"
          >
            {icon}
          </div>
          <div>
            <h1 className="text-display-mobile sm:text-display">{title}</h1>
            <p className="mt-2 text-sm text-primary-foreground/90 sm:text-base">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
