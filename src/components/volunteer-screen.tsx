import { PageIntro } from "@/components/page-intro";
import { PageShell } from "@/components/page-shell";
import { ProseSections } from "@/components/prose-sections";
import { VolunteerForm } from "@/components/volunteer-form";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export function VolunteerScreen({ locale }: { locale: Locale }) {
  const { volunteer, contact } = getDictionary(locale);

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

            <VolunteerForm volunteer={volunteer} email={contact.email} />
          </article>

          <p className="border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45">
            {volunteer.kvkkNote}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
