import { ArrowRight, Clock, Download, MapPin, Timer, Triangle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { StravaRoute } from "@/components/strava-route";
import type { Locale } from "@/i18n/config";
import type { CourseAccent, PageKey } from "@/i18n/dictionary";
import { getCourse, getDictionary } from "@/i18n/dictionary";
import { assetPath } from "@/lib/asset-path";
import { courseImage } from "@/lib/course-images";

// Tailwind sınıfları derleme sırasında taranabilmesi için tam yazılıyor.
const accentText: Record<CourseAccent, string> = {
  cyan: "text-sut-cyan",
  green: "text-sut-green",
  orange: "text-sut-orange",
};

/** Künye şeridi ve CP tablosu başlığı parkurun rengiyle doluyor. */
const accentFill: Record<CourseAccent, string> = {
  cyan: "bg-sut-cyan",
  green: "bg-sut-green",
  orange: "bg-sut-orange",
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

  const stats = [
    { icon: MapPin, label: courses.distanceLabel, value: course.distance },
    { icon: Triangle, label: courses.elevationLabel, value: course.elevation },
    { icon: MapPin, label: courses.trailLabel, value: course.trailShare },
    { icon: Clock, label: courses.startLabel, value: course.start },
    { icon: Timer, label: courses.cutOffLabel, value: course.cutOff },
  ];

  const others = courses.items.filter((item) => item.id !== course.id);

  const headers = [
    courses.cpHeaders.cp,
    courses.cpHeaders.station,
    courses.cpHeaders.total,
    courses.cpHeaders.next,
    courses.cpHeaders.elevation,
    courses.cpHeaders.cutOff,
    courses.cpHeaders.services,
  ];

  return (
    <PageShell locale={locale} page={page}>
      {/* Başlık: parkurun kendi fotoğrafı üzerinde */}
      <section id="ust" className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={courseImage(course.image)}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink-950/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/40 to-ink-950/95" />
        </div>

        <div className="px-safe mx-auto flex w-full max-w-3xl flex-col items-center py-14 text-center sm:py-20">
          <p
            className={`font-brush text-6xl leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] sm:text-8xl ${accentText[course.accent]}`}
          >
            {course.distance}
          </p>
          <h1
            lang="en"
            className="mt-3 font-display text-2xl tracking-wide text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:text-4xl"
          >
            {course.name}
          </h1>
          <span
            className={`mt-4 h-0.5 w-12 ${accentRule[course.accent]}`}
            aria-hidden="true"
          />
          <p className="mt-5 max-w-prose text-sm leading-relaxed text-balance text-white/85 italic sm:text-base">
            “{course.tagline}”
          </p>
        </div>
      </section>

      <section className="bg-ink-950 pb-12 sm:pb-16">
        {/* Künye şeridi — kenardan kenara, parkurun renginde */}
        <dl
          className={`grid grid-cols-2 gap-px sm:grid-cols-5 ${accentFill[course.accent]}`}
        >
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className={`flex flex-col items-center gap-1.5 px-2 py-4 text-center text-ink-950 ${accentFill[course.accent]}`}
            >
              <Icon className="h-4 w-4 opacity-70" strokeWidth={2} aria-hidden="true" />
              <dt className="text-[10px] leading-tight font-bold tracking-[0.12em] uppercase opacity-80">
                {label}
              </dt>
              <dd className="text-sm font-bold sm:text-base">{value}</dd>
            </div>
          ))}
        </dl>

        {/*
         * Strava haritası ve CP çizelgesi bilinçli olarak geniş: ikisi de
         * sayfanın asıl içeriği, dar bir sütuna sıkıştırılınca okunmuyor.
         */}
        <div className="px-safe mx-auto mt-12 flex w-full max-w-6xl flex-col gap-12">
          <article>
            <h2 className="font-display text-2xl tracking-wide text-white uppercase sm:text-3xl">
              {courses.stravaTitle}
            </h2>
            <StravaRoute strava={course.strava} />
          </article>

          <article>
            <h2 className="font-display text-2xl tracking-wide text-white uppercase sm:text-3xl">
              {courses.cpTitle}
            </h2>

            {/* Dar ekranda tablo kendi içinde kaysın; sayfa yatayda kaymasın. */}
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
                <thead>
                  <tr className={`${accentFill[course.accent]} text-ink-950`}>
                    {headers.map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-3 py-3 text-[11px] leading-tight font-bold tracking-[0.1em] uppercase"
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
                        className={`px-3 py-3 font-bold tracking-wide uppercase ${accentText[course.accent]}`}
                      >
                        {cp.cp}
                      </th>
                      <td className="px-3 py-3 font-semibold text-white/90">
                        {cp.station}
                      </td>
                      <td className="px-3 py-3 text-white/75 tabular-nums">
                        {cp.totalKm}
                      </td>
                      <td className="px-3 py-3 text-white/75 tabular-nums">
                        {cp.nextKm}
                      </td>
                      <td className="px-3 py-3 text-white/75 tabular-nums">
                        {cp.elevation}
                      </td>
                      <td className="px-3 py-3 text-white/75">{cp.cutOff}</td>
                      <td className="px-3 py-3 text-white/75">{cp.services}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article>
            <h2 className="font-display text-2xl tracking-wide text-white uppercase sm:text-3xl">
              {courses.downloadsTitle}
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {[
                { href: `/gpx/${course.gpx}`, label: courses.gpxLabel },
                { href: `/kml/${course.kml}`, label: courses.kmlLabel },
              ].map((file) => (
                <a
                  key={file.href}
                  href={assetPath(file.href)}
                  download
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-ink-700 bg-ink-900 px-5 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  <Download className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
                  {file.label}
                </a>
              ))}
            </div>
          </article>

          <article>
            <h2 className="font-display text-2xl tracking-wide text-white uppercase sm:text-3xl">
              {courses.othersTitle}
            </h2>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {others.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-3 rounded-lg border border-ink-700 bg-ink-900 px-4 py-4 transition-colors hover:border-white/30 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
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
