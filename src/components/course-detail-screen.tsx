import { ArrowRight, Clock, Download, MapPin, Timer, Triangle } from "lucide-react";
import Link from "next/link";
import { ElevationProfile } from "@/components/elevation-profile";
import { PageShell } from "@/components/page-shell";
import type { Locale } from "@/i18n/config";
import type { CourseAccent, PageKey } from "@/i18n/dictionary";
import { getCourse, getDictionary } from "@/i18n/dictionary";
import { readCourseProfile } from "@/lib/gpx";

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

export function CourseDetailScreen({
  locale,
  page,
}: {
  locale: Locale;
  page: PageKey;
}) {
  const dict = getDictionary(locale);
  const { courses } = dict;
  const course = getCourse(dict, page);
  // GPX derleme anında okunuyor; tarayıcıya yalnızca çizilmiş profil iniyor.
  const profile = readCourseProfile(course.gpx);

  const stats = [
    { icon: MapPin, label: courses.distanceLabel, value: course.distance },
    { icon: Triangle, label: courses.elevationLabel, value: course.elevation },
    { icon: MapPin, label: courses.trailLabel, value: course.trailShare },
    { icon: Clock, label: courses.startLabel, value: course.start },
    { icon: Timer, label: courses.cutOffLabel, value: course.cutOff },
  ];

  const others = courses.items.filter((item) => item.id !== course.id);

  return (
    <PageShell locale={locale} page={page}>
      <section id="ust" className="bg-ink-900 pt-12 pb-10 sm:pt-16 sm:pb-14">
        <div className="px-safe mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <p
            className={`font-brush text-6xl leading-none sm:text-8xl ${accentText[course.accent]}`}
          >
            {course.distance}
          </p>
          <h1
            lang="en"
            className="mt-3 font-display text-2xl tracking-wide text-white uppercase sm:text-4xl"
          >
            {course.name}
          </h1>
          <span
            className={`mt-4 h-0.5 w-12 ${accentRule[course.accent]}`}
            aria-hidden="true"
          />
          <p className="mt-5 max-w-prose text-sm leading-relaxed text-balance text-white/70 italic sm:text-base">
            “{course.tagline}”
          </p>
        </div>
      </section>

      <section className="bg-ink-950 py-12 sm:py-16">
        <div className="px-safe mx-auto flex w-full max-w-3xl flex-col gap-12">
          {/* Künye: mesafe, tırmanış, patika oranı, start, cut-off */}
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-5">
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 bg-ink-900 px-2 py-4 text-center"
              >
                <Icon
                  className="h-4 w-4 text-white/45"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <dt className="text-[10px] leading-tight font-bold tracking-[0.12em] text-white/45 uppercase">
                  {label}
                </dt>
                <dd className="text-sm font-bold text-white sm:text-base">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <article>
            {course.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-sm leading-relaxed text-white/75 first:mt-0 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </article>

          <article>
            <h2 className="font-display text-2xl tracking-wide text-white uppercase sm:text-3xl">
              {courses.profileTitle}
            </h2>

            <ElevationProfile
              profile={profile}
              accent={course.accent}
              labels={{
                caption: courses.profileHint,
                distance: courses.distanceLabel,
                elevation: courses.elevationLabel,
                highest: courses.highestLabel,
                lowest: courses.lowestLabel,
              }}
            />

            <p className="mt-4 text-xs leading-relaxed text-white/50">
              {courses.profileNote}
            </p>
          </article>

          <article>
            <h2 className="font-display text-2xl tracking-wide text-white uppercase sm:text-3xl">
              {courses.cpTitle}
            </h2>

            {/* Dar ekranda tablo kendi içinde kaysın; sayfa yatayda kaymasın. */}
            <div className="mt-5 -mx-1 overflow-x-auto">
              <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    {[
                      courses.cpHeaders.cp,
                      courses.cpHeaders.station,
                      courses.cpHeaders.total,
                      courses.cpHeaders.next,
                      courses.cpHeaders.services,
                    ].map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="py-3 pr-4 text-[11px] font-bold tracking-[0.14em] text-white/55 uppercase"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {course.checkpoints.map((cp) => (
                    <tr
                      key={`${cp.cp}-${cp.station}`}
                      className="border-b border-white/10"
                    >
                      <th
                        scope="row"
                        className={`py-3 pr-4 font-bold tracking-wide uppercase ${accentText[course.accent]}`}
                      >
                        {cp.cp}
                      </th>
                      <td className="py-3 pr-4 font-semibold text-white/90">
                        {cp.station}
                      </td>
                      <td className="py-3 pr-4 text-white/75 tabular-nums">
                        {cp.totalKm}
                      </td>
                      <td className="py-3 pr-4 text-white/75 tabular-nums">
                        {cp.nextKm}
                      </td>
                      <td className="py-3 pr-4 text-white/75">
                        {cp.services || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-white/50">
              {courses.cpIntro}
            </p>
          </article>

          <article>
            <h2 className="font-display text-2xl tracking-wide text-white uppercase sm:text-3xl">
              {courses.gpxTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {courses.gpxNote}
            </p>
            <a
              href={`/gpx/${course.gpx}`}
              download
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-ink-700 bg-ink-900 px-5 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:border-sut-cyan hover:text-sut-cyan focus-visible:ring-2 focus-visible:ring-sut-cyan focus-visible:outline-none"
            >
              <Download className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              {courses.gpxLabel}
            </a>
          </article>

          <p className="rounded-lg border border-sut-orange/40 bg-sut-orange/10 px-4 py-3 text-sm leading-relaxed text-white/85">
            {course.gearNote}
          </p>

          {/* Diğer parkurlara geçiş */}
          <article>
            <h2 className="font-display text-2xl tracking-wide text-white uppercase sm:text-3xl">
              {courses.othersTitle}
            </h2>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {others.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-3 rounded-lg border border-ink-700 bg-ink-900 px-4 py-4 transition-colors hover:border-white/30 focus-visible:ring-2 focus-visible:ring-sut-cyan focus-visible:outline-none"
                  >
                    <span className="flex items-baseline gap-3">
                      <span
                        className={`font-brush text-2xl leading-none ${accentText[item.accent]}`}
                      >
                        {item.distance}
                      </span>
                      <span
                        lang="en"
                        className="text-sm font-bold tracking-wide text-white uppercase"
                      >
                        {item.name}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-white/40"
                      strokeWidth={2.25}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
