import type { Dictionary } from "@/i18n/dictionary";

/**
 * Geçmiş yıl sayfası butonu. `pastEdition.href` boşken bölüm hiç basılmıyor —
 * adres eklendiği an kendiliğinden görünür hâle gelir.
 */
export function PastEdition({ dict }: { dict: Dictionary }) {
  const { pastEdition } = dict;

  if (!pastEdition.href) return null;

  return (
    <section className="bg-ink-950 pb-14 sm:pb-20">
      <div className="px-safe mx-auto flex w-full max-w-5xl justify-center">
        <a
          href={pastEdition.href}
          className="inline-flex min-h-13 items-center justify-center bg-sand px-10 text-base font-bold tracking-wider text-ink-950 uppercase transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-sut-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:outline-none"
        >
          {pastEdition.label}
        </a>
      </div>
    </section>
  );
}
