"use client";

import type { Dictionary } from "@/i18n/dictionary";
import { useRegistrationOpen } from "@/components/use-registration-open";

/**
 * Kayıt CTA'sı. Kayıtlar açılmadan önce sayfadaki kayıt bölümüne kaydırır
 * (orada ne zaman açılacağı yazıyor), açıldıktan sonra kayıt platformuna
 * gider. Anahtar tarayıcı saatiyle çevrildiği için açılış anında sayfanın
 * yeniden yayınlanması gerekmiyor.
 */
export function RegisterButton({
  registration,
  defaultOpen,
  className = "",
}: {
  registration: Dictionary["registration"];
  defaultOpen: boolean;
  className?: string;
}) {
  const isOpen = useRegistrationOpen(registration.opensAt, defaultOpen);
  const external = isOpen && registration.open && Boolean(registration.href);

  return (
    <a
      href={external ? registration.href! : "#kayit"}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      className={`inline-flex min-h-13 items-center justify-center bg-sand px-10 text-base font-bold tracking-wider text-ink-950 uppercase transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:outline-none ${className}`}
    >
      {registration.ctaLabel}
    </a>
  );
}
