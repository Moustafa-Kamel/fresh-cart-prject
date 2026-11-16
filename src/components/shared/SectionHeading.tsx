import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function SectionHeading({
  title,
  accent,
  href,
  linkText,
}: {
  title: string;
  accent?: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <h2 className="border-l-4 border-primary pl-3 text-2xl font-bold tracking-tight">
        {title} {accent && <span className="text-primary">{accent}</span>}
      </h2>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          {linkText ?? "View all"}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      )}
    </div>
  );
}
