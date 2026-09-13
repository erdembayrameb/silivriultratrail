import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/i18n/dictionary";

export function Registration({ dict }: { dict: Dictionary }) {
  const { registration } = dict;

  return (
    <section id="kayit" className="bg-ink-900 py-14 sm:py-20">
      <div className="px-safe mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <SectionHeading>{registration.title}</SectionHeading>

        <p className="mt-8 font-display text-2xl tracking-wide text-sut-cyan uppercase sm:text-3xl">
          {registration.status}
        </p>

        <p className="mt-4 max-w-prose text-sm leading-relaxed text-white/70 sm:text-base">
          {registration.note}
        </p>

        {registration.open && registration.href ? (
          <a
            href={registration.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-13 items-center justify-center bg-sand px-10 text-base font-bold tracking-wider text-ink-950 uppercase transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-sut-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 focus-visible:outline-none"
          >
            {registration.ctaLabel}
          </a>
        ) : null}
      </div>
    </section>
  );
}
