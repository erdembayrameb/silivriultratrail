import { ChevronRight, Clock, MapPin, Triangle } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import type { CourseAccent, Dictionary } from "@/i18n/dictionary";

// Tailwind sınıfları derleme sırasında taranabilmesi için tam yazılıyor.
const accentText: Record<CourseAccent, string> = {
  cyan: "text-sut-cyan",
  green: "text-sut-green",
  orange: "text-sut-orange",
};

const accentRule: Record<CourseAccent, string> = {
  cyan: "bg-sut-cyan",
  green: "bg-sut-green",
  orange: "bg-sut-orange",
};

const accentHover: Record<CourseAccent, string> = {
  cyan: "hover:border-sut-cyan/60",
  green: "hover:border-sut-green/60",
  orange: "hover:border-sut-orange/60",
};

export function Courses({ dict }: { dict: Dictionary }) {
  const { courses } = dict;

  return (
    <section id="parkurlar" className="bg-ink-900 py-14 sm:py-20">
      <div className="px-safe mx-auto w-full max-w-5xl">
        <SectionHeading>{courses.title}</SectionHeading>

        {/*
         * Her kart parkur detay sayfasına giden tek bir bağlantı. Dar ekranda
         * üç sütun kalıyor ki taslaktaki karşılaştırma görünümü bozulmasın.
         */}
        <ul className="mt-10 grid grid-cols-3 gap-2 sm:gap-4">
          {courses.items.map((course) => (
            <li key={course.id} className="flex">
              <Link
                href={course.href}
                className={`flex flex-1 flex-col items-center rounded-lg border border-ink-700 bg-ink-850 px-1.5 py-5 text-center transition-colors focus-visible:ring-2 focus-visible:ring-sut-cyan focus-visible:outline-none sm:px-4 ${accentHover[course.accent]}`}
              >
                <p
                  className={`font-brush text-4xl leading-none sm:text-6xl ${accentText[course.accent]}`}
                >
                  {course.distance}
                </p>

                {/* lang="en": Türkçe büyütme kuralı "Trail" → "TRAİL" yapıyor. */}
                <h3
                  lang="en"
                  className="mt-3 text-[13px] leading-tight font-bold tracking-wide text-balance text-white uppercase sm:text-lg"
                >
                  {course.name}
                </h3>

                <span
                  className={`mt-3 h-0.5 w-8 sm:w-12 ${accentRule[course.accent]}`}
                  aria-hidden="true"
                />

                <dl className="mt-5 flex flex-col gap-3 text-left">
                  <div className="flex items-center gap-2">
                    <dt className="shrink-0">
                      <Triangle
                        className="h-4 w-4 text-white/70 sm:h-5 sm:w-5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span className="sr-only">{courses.elevationLabel}</span>
                    </dt>
                    <dd className="text-xs font-semibold text-white/90 sm:text-base">
                      {course.elevation}
                    </dd>
                  </div>

                  <div className="flex items-center gap-2">
                    <dt className="shrink-0">
                      <MapPin
                        className="h-4 w-4 text-white/70 sm:h-5 sm:w-5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span className="sr-only">{courses.trailLabel}</span>
                    </dt>
                    <dd className="text-xs font-semibold text-white/90 sm:text-base">
                      {course.trailShare}
                    </dd>
                  </div>

                  <div className="flex items-center gap-2">
                    <dt className="shrink-0">
                      <Clock
                        className="h-4 w-4 text-white/70 sm:h-5 sm:w-5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span className="sr-only">{courses.startLabel}</span>
                    </dt>
                    <dd className="text-xs font-semibold text-white/90 sm:text-base">
                      {course.start}
                    </dd>
                  </div>
                </dl>

                <span
                  className={`mt-5 inline-flex items-center gap-0.5 text-[10px] font-bold tracking-wider uppercase sm:text-xs ${accentText[course.accent]}`}
                >
                  {courses.detailLabel}
                  <ChevronRight
                    className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
