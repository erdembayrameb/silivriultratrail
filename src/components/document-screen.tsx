import { Download } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { PageShell } from "@/components/page-shell";
import { ProseSections } from "@/components/prose-sections";
import type { Locale } from "@/i18n/config";
import type { PageKey } from "@/i18n/dictionary";
import { getDictionary, getLegalDoc } from "@/i18n/dictionary";
import { assetPath } from "@/lib/asset-path";

/** Resmi belgelerin ortak sayfası — kurallar, taahhütname, KVKK, açık rıza. */
export function DocumentScreen({
  locale,
  page,
}: {
  locale: Locale;
  page: PageKey;
}) {
  const dict = getDictionary(locale);
  const doc = getLegalDoc(dict, page);

  return (
    <PageShell locale={locale} page={page}>
      <PageIntro title={doc.title} intro={doc.intro} />

      <section className="bg-ink-950 py-12 sm:py-16">
        <div className="px-safe mx-auto flex w-full max-w-3xl flex-col gap-10">
          {doc.pdf ? (
            <a
              href={assetPath(doc.pdf)}
              download
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-ink-700 bg-ink-900 px-5 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:border-sut-cyan hover:text-sut-cyan focus-visible:ring-2 focus-visible:ring-sut-cyan focus-visible:outline-none sm:w-auto sm:self-start"
            >
              <Download className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              {dict.documents.downloadLabel}
            </a>
          ) : null}

          <ProseSections sections={doc.sections} />

          {doc.footnote ? (
            <p className="border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45">
              {doc.footnote}
            </p>
          ) : null}
        </div>
      </section>
    </PageShell>
  );
}
