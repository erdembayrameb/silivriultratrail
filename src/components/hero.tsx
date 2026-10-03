import { CalendarDays, MapPin } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { RegisterButton } from "@/components/register-button";
import type { Dictionary } from "@/i18n/dictionary";

export function Hero({ dict }: { dict: Dictionary }) {
  const { hero, registration } = dict;

  return (
    <section
      id="ust"
      className="relative isolate flex min-h-[calc(100dvh-4rem)] flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <HeroBackdrop src={heroImage} />
      </div>

      <div className="px-safe mx-auto flex w-full max-w-2xl flex-col items-center py-16 text-center">
        <h1 className="flex flex-col items-center">
          <span className="font-brush text-5xl leading-[0.95] text-white uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] sm:text-7xl">
            {hero.titleTop}
          </span>{" "}
          <span
            lang="en"
            className="font-brush mt-1 text-6xl leading-[0.95] text-accent drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] sm:text-8xl"
          >
            {hero.titleBottom}
          </span>
        </h1>

        <p className="rule-heading mt-5 w-full text-[13px] font-semibold tracking-[0.12em] text-white uppercase sm:text-sm">
          <span className="h-px w-8 shrink-0 bg-white/50 sm:w-12" />
          <span className="text-balance">{hero.tagline}</span>
          <span className="h-px w-8 shrink-0 bg-white/50 sm:w-12" />
        </p>

        <div className="mt-10 flex flex-col items-center gap-7">
          <p className="flex flex-col items-center">
            <CalendarDays
              className="h-6 w-6 text-accent"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="mt-3 text-lg font-bold tracking-wide text-white uppercase sm:text-xl">
              {hero.date}
            </span>
            <span className="mt-1 text-base font-semibold text-accent-soft">
              {hero.weekday}
            </span>
          </p>

          <p className="flex flex-col items-center">
            <MapPin
              className="h-6 w-6 text-accent"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="mt-3 text-base font-bold tracking-wide text-balance text-white uppercase sm:text-lg">
              {hero.venue}
            </span>
            <span className="mt-1 text-base font-semibold text-accent-soft">
              {hero.city}
            </span>
          </p>
        </div>

        <RegisterButton registration={registration} className="mt-10" />
      </div>

      {/* Fotoğraf telifi gerekiyorsa içerik dosyasına yazılması yeterli. */}
      {hero.imageCredit ? (
        <p className="px-safe absolute bottom-2 left-0 text-[10px] tracking-wide text-white/45">
          {hero.imageCredit}
        </p>
      ) : null}
    </section>
  );
}
