import { Check } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { PageShell } from "@/components/page-shell";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export function RunnerInfoScreen({ locale }: { locale: Locale }) {
  const { runnerInfo } = getDictionary(locale);
  const { fees, gear } = runnerInfo;

  return (
    <PageShell locale={locale} page="runnerInfo">
      <PageIntro title={runnerInfo.title} intro={runnerInfo.intro} />

      <section className="bg-ink-950 py-12 sm:py-16">
        <div className="px-safe mx-auto flex w-full max-w-3xl flex-col gap-12">
          <article>
            <h2 className="font-display text-2xl tracking-wide text-white uppercase sm:text-3xl">
              {fees.title}
            </h2>

            {/* Dar ekranda tablo kendi içinde kaysın; sayfa yatayda kaymasın. */}
            <div className="mt-5 -mx-1 overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th
                      scope="col"
                      className="py-3 pr-4 text-[11px] font-bold tracking-[0.18em] text-white/60 uppercase"
                    >
                      {fees.courseLabel}
                    </th>
                    {fees.periods.map((period) => (
                      <th
                        key={period}
                        scope="col"
                        className="py-3 pr-4 text-[11px] font-bold tracking-[0.18em] text-white/60 uppercase"
                      >
                        {period}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fees.rows.map((row) => (
                    <tr key={row.course} className="border-b border-white/10">
                      <th
                        scope="row"
                        lang="en"
                        className="py-3 pr-4 font-bold tracking-wide text-sut-cyan uppercase"
                      >
                        {row.course}
                      </th>
                      {row.prices.map((price, index) => (
                        <td
                          key={fees.periods[index]}
                          className="py-3 pr-4 font-semibold text-white/85"
                        >
                          {price}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-white/60">
              {fees.note}
            </p>
          </article>

          <article>
            <h2 className="font-display text-2xl tracking-wide text-white uppercase sm:text-3xl">
              {gear.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {gear.intro}
            </p>

            <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {gear.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-sut-green"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-snug text-white/85">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-6 rounded-lg border border-sut-orange/40 bg-sut-orange/10 px-4 py-3 text-sm leading-relaxed text-white/85">
              {gear.shortCourse}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-white/60">
              {gear.checks}
            </p>
          </article>

          {runnerInfo.sections.map((section) => (
            <article key={section.title}>
              <h2 className="font-display text-2xl tracking-wide text-white uppercase sm:text-3xl">
                {section.title}
              </h2>

              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 text-sm leading-relaxed text-white/70"
                >
                  {paragraph}
                </p>
              ))}

              {section.items.length > 0 ? (
                <ul className="mt-4 flex flex-col gap-2.5">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="border-l-2 border-ink-700 pl-4 text-sm leading-relaxed text-white/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}

          <p className="text-xs leading-relaxed text-white/45">
            {runnerInfo.disclaimer}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
