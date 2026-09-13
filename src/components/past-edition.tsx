import type { Dictionary } from "@/i18n/dictionary";

const buttonClass =
  "inline-flex min-h-13 items-center justify-center bg-sand px-10 text-base font-bold tracking-wider text-ink-950 uppercase";

export function PastEdition({ dict }: { dict: Dictionary }) {
  const { pastEdition, nav } = dict;

  return (
    <section className="bg-ink-950 pb-14 sm:pb-20">
      <div className="px-safe mx-auto flex w-full max-w-5xl justify-center">
        {pastEdition.href ? (
          <a
            href={pastEdition.href}
            className={`${buttonClass} transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-sut-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:outline-none`}
          >
            {pastEdition.label}
          </a>
        ) : (
          /* Sayfa hazırlanana kadar pasif — href eklendiğinde bağlantıya döner. */
          <button
            type="button"
            disabled
            className={`${buttonClass} cursor-not-allowed opacity-45`}
          >
            {pastEdition.label}
            <span className="sr-only"> — {nav.soonBadge}</span>
          </button>
        )}
      </div>
    </section>
  );
}
