import type { Dictionary } from "@/i18n/dictionary";

/**
 * Kayıt CTA'sı. Kayıtlar açıldığında içerik dosyasında
 * `registration.open: true` + `registration.href` ayarlanması yeterli;
 * buton kendiliğinden dış bağlantıya döner.
 */
export function RegisterButton({
  registration,
  className = "",
}: {
  registration: Dictionary["registration"];
  className?: string;
}) {
  const isExternal = registration.open && Boolean(registration.href);
  const href = isExternal ? registration.href! : "#kayit";

  return (
    <a
      href={href}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      className={`inline-flex min-h-13 items-center justify-center bg-sand px-10 text-base font-bold tracking-wider text-ink-950 uppercase transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:outline-none ${className}`}
    >
      {registration.ctaLabel}
    </a>
  );
}
