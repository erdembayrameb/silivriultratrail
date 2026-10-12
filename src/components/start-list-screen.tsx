import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { PageShell } from "@/components/page-shell";
import type { Locale } from "@/i18n/config";
import type { Course, CourseAccent, Dictionary } from "@/i18n/dictionary";
import { getDictionary } from "@/i18n/dictionary";
import { fetchParticipants, type Participant } from "@/lib/participants";

// Tailwind sınıfları derleme sırasında taranabilmesi için tam yazılıyor.
const accentText: Record<CourseAccent, string> = {
  cyan: "text-sut-cyan",
  green: "text-sut-green",
  orange: "text-sut-orange",
};

const accentFill: Record<CourseAccent, string> = {
  cyan: "bg-sut-cyan",
  green: "bg-sut-green",
  orange: "bg-sut-orange",
};

function CourseGroup({
  course,
  participants,
  startList,
}: {
  course: Course;
  participants: Participant[];
  startList: Dictionary["startList"];
}) {
  const { columns } = startList;

  return (
    <article>
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <Link
          href={course.href}
          className={`font-brush text-3xl leading-none sm:text-4xl ${accentText[course.accent]} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
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
          {participants.length} {startList.countLabel}
        </p>
      </header>

      {participants.length === 0 ? (
        <p className="mt-4 rounded-lg border border-ink-700 bg-ink-900 px-4 py-4 text-sm leading-relaxed text-white/60">
          {startList.emptyNote}
        </p>
      ) : (
        // Dar ekranda tablo kendi içinde kaysın; sayfa yatayda kaymasın.
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <thead>
              <tr className={`${accentFill[course.accent]} text-ink-950`}>
                {[
                  columns.no,
                  columns.name,
                  columns.team,
                  columns.city,
                  columns.category,
                ].map((header) => (
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
              {participants.map((entry, index) => (
                <tr
                  key={`${entry.name}-${index}`}
                  className="border-b border-white/10"
                >
                  <th
                    scope="row"
                    className="px-3 py-3 font-bold text-white/45 tabular-nums"
                  >
                    {index + 1}
                  </th>
                  <td className="px-3 py-3 font-semibold text-white/90">
                    {entry.name}
                  </td>
                  <td className="px-3 py-3 text-white/70">
                    {entry.team || "—"}
                  </td>
                  <td className="px-3 py-3 text-white/70">
                    {entry.city || "—"}
                  </td>
                  <td className="px-3 py-3 text-white/70">
                    {entry.category || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}

/**
 * Parkur başına yarışmacı listesi. Veriler kayıt platformundan derleme
 * anında çekiliyor; sayfa statik kalıyor, ziyaretçiye istek attırmıyoruz.
 */
export async function StartListScreen({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { startList, courses } = dict;

  // Üç parkur aynı anda çekiliyor; derleme süresini uzatmaya gerek yok.
  const groups = await Promise.all(
    courses.items.map(async (course) => ({
      course,
      participants: await fetchParticipants(course.participantsId),
    })),
  );

  return (
    <PageShell locale={locale} page="startList">
      <PageIntro title={startList.title} intro={startList.intro} />

      <section className="bg-ink-950 py-12 sm:py-16">
        <div className="px-safe mx-auto flex w-full max-w-5xl flex-col gap-12">
          {groups.map(({ course, participants }) => (
            <CourseGroup
              key={course.id}
              course={course}
              participants={participants}
              startList={startList}
            />
          ))}

          <p className="border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45">
            {startList.footnote}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
