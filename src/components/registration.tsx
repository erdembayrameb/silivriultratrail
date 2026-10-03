import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/i18n/dictionary";

export function Registration({ dict }: { dict: Dictionary }) {
  const { registration, routes } = dict;

  return (
    <section id="kayit" className="bg-ink-900 py-14 sm:py-20">
      <div className="px-safe mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <SectionHeading>{registration.title}</SectionHeading>

        <p className="mt-8 font-display text-2xl tracking-wide text-accent uppercase sm:text-3xl">
          {registration.status}
        </p>

        <dl className="mt-8 grid w-full gap-4 sm:grid-cols-3">
          {registration.highlights.map((highlight) => (
            <div
              key={highlight.label}
              className="rounded-lg border border-ink-700 bg-ink-950/50 px-4 py-4"
            >
              <dt className="text-[11px] font-bold tracking-[0.18em] text-white/50 uppercase">
                {highlight.label}
              </dt>
              <dd className="mt-2 text-sm font-semibold text-balance text-white">
                {highlight.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 max-w-prose text-sm leading-relaxed text-white/70 sm:text-base">
          {registration.note}
        </p>

        {registration.open && registration.href ? (
          <a
            href={registration.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-13 items-center justify-center bg-sand px-10 text-base font-bold tracking-wider text-ink-950 uppercase transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 focus-visible:outline-none"
          >
            {registration.ctaLabel}
          </a>
        ) : null}

        <Link
          href={routes.runnerInfo}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-accent uppercase underline underline-offset-4 hover:text-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {registration.detailsLabel}
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
