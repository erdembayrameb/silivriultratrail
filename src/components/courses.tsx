import { Clock, MapPin, Triangle } from "lucide-react";
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

export function Courses({ dict }: { dict: Dictionary }) {
  const { courses } = dict;

  return (
    <section id="parkurlar" className="bg-ink-900 py-14 sm:py-20">
      <div className="px-safe mx-auto w-full max-w-5xl">
        <SectionHeading>{courses.title}</SectionHeading>

        <ul className="mt-10 grid grid-cols-3 divide-x divide-white/12">
          {courses.items.map((course) => (
            <li
              key={course.id}
              className="flex flex-col items-center px-1.5 text-center sm:px-4"
            >
              <p
                className={`font-brush text-4xl leading-none sm:text-6xl ${accentText[course.accent]}`}
              >
                {course.distance}
              </p>

              <h3 className="mt-3 text-[13px] leading-tight font-bold tracking-wide text-balance text-white uppercase sm:text-lg">
                {course.name}
              </h3>

              <span
                className={`mt-3 h-0.5 w-8 sm:w-12 ${accentRule[course.accent]}`}
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
