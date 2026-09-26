import { PageIntro } from "@/components/page-intro";
import { PageShell } from "@/components/page-shell";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export function ScheduleScreen({ locale }: { locale: Locale }) {
  const { schedule } = getDictionary(locale);

  return (
    <PageShell locale={locale} page="schedule">
      <PageIntro title={schedule.title} intro={schedule.intro} />

      <section className="bg-ink-950 py-12 sm:py-16">
        <div className="px-safe mx-auto flex w-full max-w-3xl flex-col gap-12">
          {schedule.days.map((day) => (
            <article key={day.date}>
              <header className="border-b border-white/12 pb-4">
                <p className="text-[11px] font-bold tracking-[0.22em] text-sut-cyan uppercase">
                  {day.label}
                </p>
                <h2 className="mt-2 font-display text-2xl tracking-wide text-white uppercase sm:text-3xl">
                  {day.date}{" "}
                  <span className="text-white/45">· {day.weekday}</span>
                </h2>
              </header>

              <ol className="mt-6 flex flex-col gap-6">
                {day.items.map((item) => (
                  <li
                    key={`${item.time} ${item.title}`}
                    className="flex flex-col gap-1.5 sm:grid sm:grid-cols-[9rem_1fr] sm:gap-4"
                  >
                    <p className="font-display text-base tracking-wide text-sut-cyan-soft sm:text-lg">
                      {item.time}
                    </p>
                    <div>
                      <h3 className="text-sm font-bold tracking-wide text-balance text-white uppercase sm:text-base">
                        {item.title}
                      </h3>
                      {item.detail ? (
                        <p className="mt-2 text-sm leading-relaxed text-white/65">
                          {item.detail}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>

              {day.note ? (
                <p className="mt-6 rounded-lg border border-ink-700 bg-ink-900 px-4 py-3 text-xs leading-relaxed text-white/60">
                  {day.note}
                </p>
              ) : null}
            </article>
          ))}

          <p className="text-xs leading-relaxed text-white/45">
            {schedule.footnote}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
