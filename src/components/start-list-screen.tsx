import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { PageShell } from "@/components/page-shell";
import type { Locale } from "@/i18n/config";
import type { CourseAccent } from "@/i18n/dictionary";
import { getDictionary } from "@/i18n/dictionary";

// Tailwind sınıfları derleme sırasında taranabilmesi için tam yazılıyor.
const accentText: Record<CourseAccent, string> = {
  cyan: "text-sut-cyan",
  green: "text-sut-green",
  orange: "text-sut-orange",
};

/**
 * Parkur başına yarışmacı listesi. Kayıtlar açılana kadar her bölüm boş
 * görünür; liste geldiğinde içerik dosyasındaki `startList.groups[].entries`
 * doldurulması yeterli, bileşen değişmez.
 */
export function StartListScreen({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { startList, courses } = dict;

  return (
    <PageShell locale={locale} page="startList">
      <PageIntro title={startList.title} intro={startList.intro} />

      <section className="bg-ink-950 py-12 sm:py-16">
        <div className="px-safe mx-auto flex w-full max-w-3xl flex-col gap-12">
          {startList.groups.map((group) => {
            const course = courses.items.find(
              (item) => item.id === group.courseId,
            );
            if (!course) return null;

            return (
              <article key={group.courseId}>
                <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <Link
                    href={course.href}
                    className={`font-brush text-3xl leading-none sm:text-4xl ${accentText[course.accent]} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sut-cyan`}
                  >
                    {course.distance}
                  </Link>
                  <h2
                    lang="en"
                    className="font-display text-xl tracking-wide text-white uppercase sm:text-2xl"
                  >
                    {course.name}
                  </h2>
                  <p className="ml-auto text-xs font-semibold text-white/45">
                    {group.entries.length} {startList.countLabel}
                  </p>
                </header>

                {group.entries.length === 0 ? (
                  <p className="mt-4 rounded-lg border border-ink-700 bg-ink-900 px-4 py-4 text-sm leading-relaxed text-white/60">
                    {startList.emptyNote}
                  </p>
                ) : (
                  // Dar ekranda tablo kendi içinde kaysın; sayfa yatayda kaymasın.
                  <div className="mt-4 -mx-1 overflow-x-auto">
                    <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-white/20">
                          {[
                            startList.columns.no,
                            startList.columns.name,
                            startList.columns.club,
                            startList.columns.city,
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
                        {group.entries.map((entry) => (
                          <tr
                            key={`${group.courseId}-${entry.no}`}
                            className="border-b border-white/10"
                          >
                            <th
                              scope="row"
                              className="py-3 pr-4 font-bold text-white/70 tabular-nums"
                            >
                              {entry.no}
                            </th>
                            <td className="py-3 pr-4 font-semibold text-white/90">
                              {entry.name}
                            </td>
                            <td className="py-3 pr-4 text-white/70">
                              {entry.club || "—"}
                            </td>
                            <td className="py-3 pr-4 text-white/70">
                              {entry.city || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </article>
            );
          })}

          <p className="border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45">
            {startList.footnote}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
