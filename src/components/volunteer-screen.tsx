import { Mail } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { PageShell } from "@/components/page-shell";
import { ProseSections } from "@/components/prose-sections";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export function VolunteerScreen({ locale }: { locale: Locale }) {
  const { volunteer, contact } = getDictionary(locale);

  /*
   * Statik sitede sunucu tarafı form işlenemediği için başvuru, alanları
   * hazır doldurulmuş bir e-posta taslağı olarak açılıyor. Form altyapısı
   * kurulduğunda bu bağlantı gerçek forma çevrilecek.
   */
  const mailBody = volunteer.fields
    .map((field) =>
      field.options.length > 0
        ? `${field.label}:\n  (${field.options.join(" / ")})\n`
        : `${field.label}:\n`,
    )
    .join("\n");

  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(
    `${volunteer.title} — ${volunteer.formTitle}`,
  )}&body=${encodeURIComponent(mailBody)}`;

  return (
    <PageShell locale={locale} page="volunteer">
      <PageIntro title={volunteer.title} intro={volunteer.intro} />

      <section className="bg-ink-950 py-12 sm:py-16">
        <div className="px-safe mx-auto flex w-full max-w-3xl flex-col gap-10">
          <div>
            {volunteer.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-sm leading-relaxed text-white/75 first:mt-0 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ProseSections sections={volunteer.sections} />

          <article>
            <h2 className="font-display text-xl tracking-wide text-white uppercase sm:text-2xl">
              {volunteer.formTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {volunteer.formIntro}
            </p>

            <ul className="mt-5 flex flex-col gap-4">
              {volunteer.fields.map((field) => (
                <li
                  key={field.label}
                  className="rounded-lg border border-ink-700 bg-ink-900 px-4 py-3"
                >
                  <p className="text-sm font-semibold text-white">
                    {field.label}
                  </p>
                  {field.options.length > 0 ? (
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {field.options.map((option) => (
                        <li
                          key={option}
                          className="rounded-full border border-ink-700 px-3 py-1 text-xs text-white/65"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>

            <a
              href={mailto}
              className="mt-6 inline-flex min-h-13 items-center justify-center gap-2 bg-sand px-8 text-sm font-bold tracking-wider text-ink-950 uppercase transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:outline-none"
            >
              <Mail className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              {volunteer.ctaLabel}
            </a>
          </article>

          <p className="border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45">
            {volunteer.kvkkNote}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
