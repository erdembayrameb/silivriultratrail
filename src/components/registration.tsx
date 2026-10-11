"use client";

import { SectionHeading } from "@/components/section-heading";
import { useRegistrationOpen } from "@/components/use-registration-open";
import type { Dictionary } from "@/i18n/dictionary";

/**
 * Ana sayfadaki kayıt bölümü. Açılış anından önce ne zaman açılacağını,
 * sonra "açık" durumunu ve kayıt butonunu gösterir; anahtar tarayıcı
 * saatiyle çevriliyor.
 */
export function Registration({
  registration,
  defaultOpen,
}: {
  registration: Dictionary["registration"];
  defaultOpen: boolean;
}) {
  const isOpen = useRegistrationOpen(registration.opensAt, defaultOpen);
  const showButton = isOpen && registration.open && registration.href;

  return (
    <section id="kayit" className="bg-ink-900 py-14 sm:py-20">
      <div className="px-safe mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <SectionHeading>{registration.title}</SectionHeading>

        <p className="mt-8 font-display text-2xl tracking-wide text-accent uppercase sm:text-3xl">
          {isOpen ? registration.statusOpen : registration.statusBefore}
        </p>

        {registration.note ? (
          <p className="mt-6 max-w-prose text-sm leading-relaxed text-white/70 sm:text-base">
            {registration.note}
          </p>
        ) : null}

        {showButton ? (
          <a
            href={registration.href!}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-13 items-center justify-center bg-sand px-10 text-base font-bold tracking-wider text-ink-950 uppercase transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 focus-visible:outline-none"
          >
            {registration.ctaLabel}
          </a>
        ) : null}
      </div>
    </section>
  );
}
