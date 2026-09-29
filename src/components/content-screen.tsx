import { PageIntro } from "@/components/page-intro";
import { PageShell } from "@/components/page-shell";
import { ProseSections } from "@/components/prose-sections";
import type { Locale } from "@/i18n/config";
import type { PageKey } from "@/i18n/dictionary";
import { getContentPage, getDictionary } from "@/i18n/dictionary";

/** Düz metin içerikli tanıtım sayfaları: Neden SUT, Ulaşım, Konaklama. */
export function ContentScreen({
  locale,
  page,
}: {
  locale: Locale;
  page: PageKey;
}) {
  const content = getContentPage(getDictionary(locale), page);

  return (
    <PageShell locale={locale} page={page}>
      <PageIntro title={content.title} intro={content.intro} />

      <section className="bg-ink-950 py-12 sm:py-16">
        <div className="px-safe mx-auto flex w-full max-w-3xl flex-col gap-10">
          {content.body.length > 0 ? (
            <div>
              {content.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 text-sm leading-relaxed text-white/75 first:mt-0 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}

          {content.sections.length > 0 ? (
            <ProseSections sections={content.sections} />
          ) : null}

          {content.footnote ? (
            <p className="border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45">
              {content.footnote}
            </p>
          ) : null}
        </div>
      </section>
    </PageShell>
  );
}
